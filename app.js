// Local storage keys. Local (not session) storage so an in-progress quiz is
// shared across tabs — e.g. opening someone's shared result link in a new tab
// won't hide the quiz you have underway.
const LS_ANSWERS = 'hq_answers';
const LS_INDEX = 'hq_index';

// App state
const state = {
  view: null,
  questionIndex: 0,
  answers: {},
  // Per-question shuffled display order (qId → original indices), kept stable for
  // the session so revisiting a question doesn't reshuffle its options.
  orders: {},
  transitioning: false
};

// Hidden audit mode: open any URL with ?reasoning to reveal, under each answer,
// the exact leanings it awards and the rationale behind them. Read once at load.
const REASONING_MODE = new URLSearchParams(window.location.search).has('reasoning');

// Release identity, surfaced on the About page (#about). Single source of truth —
// bump these (and the CACHE name in sw.js) on each release.
const APP_VERSION = '1.0.0';
const RELEASE_DATE = '2026-06-30'; // ISO; rendered in a friendlier form on the page

function formatLeanings(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([h, v]) => `${HOUSES[h].name} +${v}`)
    .join(' · ');
}

// ─── Init ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  generateParticles();
  populateAbout();
  route();
  window.addEventListener('hashchange', route);
  document.getElementById('btn-start').addEventListener('click', startQuiz);
  document.getElementById('btn-error-start').addEventListener('click', startQuiz);
  document.getElementById('btn-home').addEventListener('click', goHome);
  document.getElementById('btn-about-home').addEventListener('click', goHome);
  document.getElementById('btn-prev').addEventListener('click', goPrev);
  document.getElementById('btn-next').addEventListener('click', goNext);
  document.addEventListener('keydown', handleQuizKeys);
  initResumeModal();
  initCrossTabSync();
});

// Register the service worker so the quiz installs and works offline.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// Fill the About page's release line from the constants above. Runs once at load;
// the elements always exist in the markup, so the view is ready before it's shown.
function populateAbout() {
  const vEl = document.getElementById('about-version');
  const dEl = document.getElementById('about-date');
  if (vEl) vEl.textContent = 'v' + APP_VERSION;
  if (dEl) {
    let label = RELEASE_DATE;
    const d = new Date(RELEASE_DATE);
    if (!isNaN(d)) {
      label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    dEl.textContent = 'Released ' + label;
  }
}

function route() {
  const hash = window.location.hash;

  // A result hash that fails to decode (mistyped, truncated, or tampered) gets
  // an explanatory error page rather than silently dropping to the intro.
  if (hash.startsWith(HASH_PREFIX)) {
    const decoded = decodeResults(hash);
    showView(decoded ? 'result' : 'error', decoded);
    return;
  }

  // The About page. Checked before the saved-quiz restore so it's reachable even
  // with a quiz in progress (the quiz stays saved and resumable in the meantime).
  if (hash === '#about') {
    showView('about');
    return;
  }

  // Restore an in-progress quiz from local storage (e.g. on refresh).
  const saved = getSavedQuiz();
  if (saved) {
    state.answers = saved.answers;
    state.questionIndex = saved.idx;
    showView('quiz');
    return;
  }

  showView('intro');
}

// Returns a usable in-progress quiz from local storage, or null. A quiz only
// counts as resumable if at least one answer is saved and the index is valid.
function getSavedQuiz() {
  const saved = localStorage.getItem(LS_ANSWERS);
  const savedIdx = localStorage.getItem(LS_INDEX);
  if (saved === null || savedIdx === null) return null;

  let answers;
  try {
    answers = JSON.parse(saved);
  } catch (e) {
    return null;
  }
  if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) return null;

  const idx = parseInt(savedIdx, 10);
  if (isNaN(idx) || idx < 0 || idx >= QUESTIONS.length) return null;

  return { answers, idx };
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function showView(name, data) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (!el) return;

  // Activate first so the view is visible, then render — programmatic focus
  // (used for accessibility) only works on a displayed element.
  el.classList.add('active');
  state.view = name;

  // Reset scroll to the top so the incoming view animates in from where it's
  // visible — otherwise a result page scrolled to its "Start" button would
  // swap to an intro that's parked below the fold (a blank screen until you
  // scroll up). 'instant' overrides the CSS smooth-scroll so there's no glide.
  window.scrollTo({ top: 0, behavior: 'instant' });

  if (name === 'quiz') renderQuestion();
  if (name === 'result') renderResult(data);
}

// Return to the start page. Any in-progress quiz is left untouched in local
// storage so it can be resumed from the intro's start button.
function goHome() {
  history.pushState(null, '', window.location.pathname);
  showView('intro');
}

// The start button. If a quiz is already underway, ask whether to resume it;
// otherwise begin a fresh one immediately.
function startQuiz() {
  if (getSavedQuiz()) {
    openResumeModal();
    return;
  }
  beginFreshQuiz();
}

function beginFreshQuiz() {
  state.questionIndex = 0;
  state.answers = {};
  state.orders = {};
  localStorage.removeItem(LS_ANSWERS);
  localStorage.removeItem(LS_INDEX);
  broadcastProgress();
  history.pushState(null, '', '#quiz');
  showView('quiz');
}

function resumeSavedQuiz() {
  const saved = getSavedQuiz();
  if (!saved) {
    beginFreshQuiz();
    return;
  }
  state.answers = saved.answers;
  state.questionIndex = saved.idx;
  state.orders = {};
  history.pushState(null, '', '#quiz');
  showView('quiz');
}

// ─── Resume modal ──────────────────────────────────────────────────────────────

function initResumeModal() {
  const modal = document.getElementById('resume-modal');

  document.getElementById('modal-resume').addEventListener('click', () => {
    closeResumeModal();
    resumeSavedQuiz();
  });
  document.getElementById('modal-restart').addEventListener('click', () => {
    closeResumeModal();
    beginFreshQuiz();
  });
  // Click the backdrop (outside the card) to dismiss and stay on the intro.
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeResumeModal();
  });
  // Escape dismisses the modal.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeResumeModal();
  });
}

function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  modal.classList.add('open');
  document.getElementById('modal-resume').focus();
}

function closeResumeModal() {
  document.getElementById('resume-modal').classList.remove('open');
}

// ─── Cross-tab sync ─────────────────────────────────────────────────────────────
// When the quiz advances in one tab, every other tab currently showing the quiz
// is marked stale and reloads the next time it becomes visible/focused — so two
// tabs can never sit on divergent progress. The active tab that made the change
// is never reloaded (BroadcastChannel doesn't echo to the sender; storage events
// don't fire in the originating tab).
let viewStale = false;
const quizChannel = ('BroadcastChannel' in window) ? new BroadcastChannel('hq_quiz') : null;

function broadcastProgress() {
  if (quizChannel) quizChannel.postMessage({ type: 'progress' });
}

function markStaleFromOtherTab() {
  // Only the quiz view can diverge between tabs; leave intro/result/error alone.
  if (state.view === 'quiz') viewStale = true;
}

function reloadIfStale() {
  if (viewStale && document.visibilityState === 'visible') location.reload();
}

function initCrossTabSync() {
  if (quizChannel) {
    quizChannel.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'progress') markStaleFromOtherTab();
    });
  } else {
    // Fallback for browsers without BroadcastChannel: localStorage writes fire a
    // 'storage' event in every other tab on the same origin.
    window.addEventListener('storage', (e) => {
      if (e.key === LS_ANSWERS || e.key === LS_INDEX) markStaleFromOtherTab();
    });
  }
  // Reload a stale tab only once it's actually being looked at again, never out
  // from under the user mid-question.
  document.addEventListener('visibilitychange', reloadIfStale);
  window.addEventListener('focus', reloadIfStale);
}

// ─── Quiz rendering ───────────────────────────────────────────────────────────

function renderQuestion() {
  const q = QUESTIONS[state.questionIndex];
  const total = QUESTIONS.length;
  const num = state.questionIndex + 1;

  // Progress
  const pct = ((num - 1) / total) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('question-counter').textContent = `Question ${num} of ${total}`;
  const track = document.getElementById('progress-track');
  track.setAttribute('aria-valuenow', num);
  track.setAttribute('aria-valuetext', `Question ${num} of ${total}`);

  // Question card content
  const typeEl = document.getElementById('question-type');
  const textEl = document.getElementById('question-text');
  const gridEl = document.getElementById('answers-grid');

  const card = document.getElementById('question-card');
  card.classList.remove('slide-in');
  void card.offsetWidth; // reflow to restart animation
  card.classList.add('slide-in');

  typeEl.textContent = q.type;
  textEl.textContent = q.text;

  // Shuffle display order once per question and remember it (so going back and
  // forth doesn't reshuffle), keeping each answer's ORIGINAL index for scoring.
  let order = state.orders[q.id];
  if (!order) {
    order = q.answers.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    state.orders[q.id] = order;
  }

  const chosen = state.answers[q.id]; // undefined until answered

  gridEl.innerHTML = '';
  order.forEach((origIdx, displayPos) => {
    const answer = q.answers[origIdx];
    const letter = String.fromCharCode(65 + displayPos);

    const item = document.createElement('div');
    item.className = 'answer-item';

    const btn = document.createElement('button');
    btn.className = 'answer-btn' + (origIdx === chosen ? ' selected' : '');
    btn.innerHTML = `<span class="answer-letter">${letter}</span><span class="answer-text">${answer.text}</span>`;
    btn.setAttribute('aria-label', `Answer ${letter}: ${answer.text}`);
    if (origIdx === chosen) btn.setAttribute('aria-pressed', 'true');
    btn.addEventListener('click', () => selectAnswer(origIdx, btn));
    item.appendChild(btn);

    if (REASONING_MODE) {
      const r = document.createElement('div');
      r.className = 'answer-reasoning';
      r.innerHTML =
        `<div class="reasoning-leanings">${formatLeanings(answer.scores)}</div>` +
        `<div class="reasoning-why">${answer.why || ''}</div>`;
      item.appendChild(r);
    }

    gridEl.appendChild(item);
  });

  updateQuizNav();

  // Move focus to the new question so keyboard/screen-reader users land on the
  // content (and the heading text is announced).
  textEl.focus({ preventScroll: true });
}

// Show/hide the Back and Next controls for the current question.
function updateQuizNav() {
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  const answered = state.answers[QUESTIONS[state.questionIndex].id] !== undefined;
  prev.hidden = state.questionIndex === 0;
  next.hidden = !answered;
  next.textContent = state.questionIndex >= QUESTIONS.length - 1 ? 'Reveal ›' : 'Next ›';
}

// Go back to the previous question (answers are preserved so you can change them).
function goPrev() {
  if (state.transitioning || state.questionIndex === 0) return;
  state.questionIndex--;
  localStorage.setItem(LS_INDEX, state.questionIndex);
  broadcastProgress();
  renderQuestion();
}

// Move forward from an already-answered question (keeping the existing answer);
// finishes the quiz from the last question.
function goNext() {
  if (state.transitioning) return;
  const qId = QUESTIONS[state.questionIndex].id;
  if (state.answers[qId] === undefined) return;
  advanceQuestion();
}

// Advance one question, or finish the quiz if we're past the last one.
function advanceQuestion() {
  state.questionIndex++;
  if (state.questionIndex >= QUESTIONS.length) {
    finishQuiz();
  } else {
    localStorage.setItem(LS_INDEX, state.questionIndex);
    broadcastProgress();
    state.transitioning = false;
    renderQuestion();
  }
}

// Number (1–4) and letter (A–D) keys pick the answer in that displayed position,
// matching the letters shown on each option.
function handleQuizKeys(e) {
  if (state.view !== 'quiz' || state.transitioning) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  // Arrow keys navigate between questions.
  if (e.key === 'ArrowLeft' && state.questionIndex > 0) { e.preventDefault(); goPrev(); return; }
  if (e.key === 'ArrowRight' && state.answers[QUESTIONS[state.questionIndex].id] !== undefined) {
    e.preventDefault(); goNext(); return;
  }

  const k = e.key.toLowerCase();
  let idx = -1;
  if (k >= '1' && k <= '4') idx = k.charCodeAt(0) - 49;       // '1'→0 … '4'→3
  else if (k >= 'a' && k <= 'd') idx = k.charCodeAt(0) - 97;  // 'a'→0 … 'd'→3
  if (idx < 0) return;
  const btns = document.querySelectorAll('#answers-grid .answer-btn');
  if (idx < btns.length && !btns[idx].disabled) {
    e.preventDefault();
    btns[idx].click();
  }
}

function selectAnswer(answerIdx, btnEl) {
  if (state.transitioning) return;

  const qId = QUESTIONS[state.questionIndex].id;
  const firstTime = state.answers[qId] === undefined;

  state.answers[qId] = answerIdx;
  localStorage.setItem(LS_ANSWERS, JSON.stringify(state.answers));

  // Highlight the chosen option.
  document.querySelectorAll('.answer-btn').forEach(b => {
    b.classList.remove('selected');
    b.removeAttribute('aria-pressed');
  });
  btnEl.classList.add('selected');
  btnEl.setAttribute('aria-pressed', 'true');

  if (!firstTime) {
    // Revisiting a question to change the answer: stay put so they can review,
    // and surface the Next control instead of jumping ahead.
    updateQuizNav();
    return;
  }

  // First time answering this question: keep the snappy auto-advance.
  state.transitioning = true;
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
  setTimeout(advanceQuestion, 420);
}

function finishQuiz() {
  const pct = calculateScores(state.answers);

  // Clear local storage
  localStorage.removeItem(LS_ANSWERS);
  localStorage.removeItem(LS_INDEX);
  broadcastProgress();
  state.transitioning = false;

  // When houses tie for the top, we don't settle it for you — the Hat tells you
  // they all want you, and you choose where you belong (just as Harry did).
  const max = Math.max(...HOUSE_ORDER.map(h => pct[h]));
  const tied = HOUSE_ORDER.filter(h => pct[h] === max);
  if (tied.length > 1) {
    showSortingChoice(pct, tied);
    return;
  }

  finalizeResult(pct, null);
}

// How long the "Sorting Hat is deciding…" beat lingers before the reveal.
const SUSPENSE_MS = 1700;

// Commit to a result: stamp the URL (recording the player's choice if they made
// one) and show the result view. On a fresh, untied completion we play a short
// suspense beat first; a player-resolved tie (chosen set) goes straight to the
// reveal, since the choice screen was already the dramatic moment.
function finalizeResult(pct, chosen) {
  const result = { G: pct.G, H: pct.H, R: pct.R, S: pct.S };
  if (chosen) result.chosen = chosen;
  history.replaceState(null, '', encodeResults(pct, chosen));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!chosen && !reduceMotion) {
    showView('suspense');
    setTimeout(() => showView('result', result), SUSPENSE_MS);
  } else {
    showView('result', result);
  }
}

// The Sorting Hat's choice screen, shown whenever houses tie for the top. The
// player picks among the tied houses, and that choice is recorded in the result.
// The quality the Hat names for each house, phrased to drop into "There is … here".
const CHOICE_QUALITY = { G: 'courage', H: 'a loyal heart', R: 'a fine mind', S: 'cunning' };

// Build the Hat's line so it praises only the houses actually in this tie — a
// Gryffindor/Slytherin tie hears "courage … and cunning", not "a fine mind" too.
function choiceQuote(tied) {
  const phrases = HOUSE_ORDER.filter(h => tied.includes(h)).map(h => CHOICE_QUALITY[h]);
  const [first, ...rest] = phrases;
  const qualities = rest.length
    ? `There is ${first} here — and ${rest.join(', and ')}.`
    : `There is ${first} here.`;
  const where = tied.length === 2 ? 'either of them' : 'any of them';
  return `“Difficult. Very difficult. ${qualities} More than one house would be ` +
         `proud to claim you, and you would do well in ${where}. So tell me…”`;
}

function showSortingChoice(pct, tied) {
  const container = document.getElementById('choice-options');
  const quote = document.querySelector('#view-choice .choice-text');
  if (quote) quote.textContent = choiceQuote(tied);
  // Drives the layout: 2 → one row, 3 → one row, 4 → 2×2. Never a lone card.
  container.dataset.count = tied.length;
  container.innerHTML = '';
  tied.forEach(h => {
    const house = HOUSES[h];
    const btn = document.createElement('button');
    btn.className = `choice-card house-${h}`;
    btn.setAttribute('aria-label', `Choose ${house.name}`);
    btn.innerHTML =
      `<img src="${house.svg}" alt="" />` +
      `<span class="choice-house-name">${house.name}</span>` +
      `<span class="choice-house-tag">${house.tagline}</span>`;
    btn.addEventListener('click', () => finalizeResult(pct, h));
    container.appendChild(btn);
  });
  showView('choice');
  // Focus the heading, not a card — on a screen meant to feel like every tied
  // house wants you equally, a focus ring on one card reads as a pre-pick.
  // Keyboard users still Tab into the cards from here.
  const heading = document.querySelector('#view-choice .choice-title');
  if (heading) heading.focus();
}

// ─── Score calculation ────────────────────────────────────────────────────────

// Theoretical maximum each house can earn = sum, over every question, of the
// highest score that house appears with on any answer. Each leaning is scored
// against its own ceiling, so 18 of a possible 20 reads as 90% — not as a slice
// of a pie. (With the balanced data this ceiling is 40 for every house.)
const HOUSE_MAX = (() => {
  const max = { G: 0, H: 0, R: 0, S: 0 };
  for (const q of QUESTIONS) {
    for (const h of ['G', 'H', 'R', 'S']) {
      let best = 0;
      for (const a of q.answers) best = Math.max(best, a.scores[h] || 0);
      max[h] += best;
    }
  }
  return max;
})();

function calculateScores(answers) {
  const raw = { G: 0, H: 0, R: 0, S: 0 };

  for (const [qId, ansIdx] of Object.entries(answers)) {
    const q = QUESTIONS.find(q => q.id === Number(qId));
    if (!q || !q.answers[ansIdx]) continue;
    for (const [house, pts] of Object.entries(q.answers[ansIdx].scores)) {
      raw[house] = (raw[house] || 0) + pts;
    }
  }

  const pct = {};
  for (const h of ['G', 'H', 'R', 'S']) {
    pct[h] = HOUSE_MAX[h] ? Math.round((raw[h] / HOUSE_MAX[h]) * 100) : 0;
  }

  return pct;
}

// ─── Result hash encoding ──────────────────────────────────────────────────────
// The four leanings + a checksum are packed into one opaque base64url token, so
// the URL doesn't expose tweakable numbers. Editing the token almost always
// breaks the checksum and the link is rejected. This is light obfuscation to
// discourage casual tampering — not security, since the logic is client-side.
// Tokens are validated by checksum and length; anything else is rejected.

const HASH_PREFIX = '#r/';
const HOUSE_ORDER = ['G', 'H', 'R', 'S'];

function checksumBytes(bytes) {
  let c = 137;
  for (const b of bytes) c = (c * 31 + b) & 0xFF;
  return c;
}

function b64urlEncode(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(token) {
  let b64 = token.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const bin = atob(b64);
  const bytes = [];
  for (let i = 0; i < bin.length; i++) bytes.push(bin.charCodeAt(i));
  return bytes;
}

// The four leanings, an optional chosen-winner byte (only present when the player
// resolved a Gryffindor/Slytherin tie themselves), and a checksum are packed into
// one opaque base64url token.
function encodeResults(pct, chosen) {
  const data = [pct.G, pct.H, pct.R, pct.S];
  if (chosen) data.push(HOUSE_ORDER.indexOf(chosen));
  data.push(checksumBytes(data));
  return HASH_PREFIX + b64urlEncode(data);
}

function decodeResults(hash) {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const token = hash.slice(HASH_PREFIX.length);

  let bytes;
  try {
    bytes = b64urlDecode(token);
  } catch (e) {
    return null;
  }
  if (bytes.length !== 5 && bytes.length !== 6) return null;
  const sum = bytes[bytes.length - 1];
  const data = bytes.slice(0, -1);
  if (checksumBytes(data) !== sum) return null;

  const [G, H, R, S] = data;
  if ([G, H, R, S].some(n => n < 0 || n > 100)) return null;

  const result = { G, H, R, S };
  if (data.length === 5) {
    const idx = data[4];
    if (idx < 0 || idx > 3) return null;
    result.chosen = HOUSE_ORDER[idx];
  }
  return result;
}

// Highest leaning wins. Ties are resolved deterministically from the score
// pattern itself (so a shared link always reproduces the same house) but without
// favouring any fixed house — unlike a fixed alphabetical order, which quietly
// handed every tie to Gryffindor.
function getWinningHouse(pct) {
  const max = Math.max(...HOUSE_ORDER.map(h => pct[h]));
  const tied = HOUSE_ORDER.filter(h => pct[h] === max);
  if (tied.length === 1) return tied[0];
  let s = ((pct.G + 7) * 374761393 + (pct.H + 7) * 668265263 +
           (pct.R + 7) * 2246822519 + (pct.S + 7) * 3266489917) >>> 0;
  s = (s ^ (s >>> 15)) >>> 0;
  return tied[s % tied.length];
}

// ─── Result rendering ─────────────────────────────────────────────────────────

function renderResult(pct) {
  // A player-resolved tie carries its winner explicitly; otherwise derive it.
  const winner = pct.chosen || getWinningHouse(pct);
  const house = HOUSES[winner];

  // If this result came from a tie the player settled, surface that — the tied
  // houses are exactly those sharing the top leaning.
  let tiebreakNote = '';
  if (pct.chosen) {
    const max = Math.max(...['G', 'H', 'R', 'S'].map(h => pct[h]));
    const names = ['G', 'H', 'R', 'S'].filter(h => pct[h] === max).map(h => HOUSES[h].name);
    const list = names.length > 1
      ? names.slice(0, -1).join(', ') + ' & ' + names[names.length - 1]
      : names[0];
    tiebreakNote = `<div class="tiebreak-note fade-in-delayed">The Hat was torn between ${list} — and you chose <strong>${house.name}</strong>.</div>`;
  }
  const container = document.getElementById('view-result');

  // Theme the whole result view with the winning house's colours (CSS .house-*).
  container.classList.remove('house-G', 'house-H', 'house-R', 'house-S');
  container.classList.add('house-' + winner);

  const shareUrl = window.location.origin + window.location.pathname + encodeResults(pct);

  // Sort houses by score descending for the chart
  const sorted = ['G', 'H', 'R', 'S'].sort((a, b) => pct[b] - pct[a]);

  container.innerHTML = `
    <div class="result-inner">
      <div class="sorting-hat-line">The Sorting Hat has considered…</div>

      <div class="house-reveal" id="house-reveal">
        <div class="house-crest">
          <img class="house-crest-svg" src="${house.svg}" alt="${house.name} house crest" />
          <div class="house-name" id="result-house-name" tabindex="-1" role="heading" aria-level="1">${house.name}</div>
          <div class="house-tagline">${house.tagline}</div>
        </div>
      </div>

      ${tiebreakNote}

      <div class="result-desc fade-in-delayed">
        <p class="house-description">${house.description}</p>
        <blockquote class="house-quote">${house.quote}</blockquote>
      </div>

      <div class="traits-row fade-in-delayed">
        ${house.traits.map(t => `<span class="trait-chip">${t}</span>`).join('')}
      </div>

      <div class="leanings-section fade-in-delayed">
        <h3 class="leanings-title">Your House Leanings</h3>
        <div class="bars-container" id="bars-container">
          ${sorted.map(h => `
            <div class="bar-row house-${h} ${h === winner ? 'bar-row--winner' : ''}">
              <div class="bar-label">
                <img class="bar-crest" src="${HOUSES[h].svg}" alt="${HOUSES[h].name}" />
                <span class="bar-name">${HOUSES[h].name}</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" data-pct="${pct[h]}" style="width: 0%;"></div>
              </div>
              <span class="bar-pct">${pct[h]}%</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="notable-section fade-in-delayed">
        <p class="notable-label">Notable ${house.name}s</p>
        <p class="notable-names">${house.notable.join(' · ')}</p>
      </div>

      <div class="share-section fade-in-delayed">
        <h3 class="share-title">Share Your Result</h3>
        <p class="share-subtitle">This link loads your exact result — no re-taking required.</p>
        <div id="share-root"></div>
      </div>

      <div class="retake-section fade-in-delayed">
        <button class="btn-retake" id="btn-retake">Retake the Quiz</button>
        <button class="btn-home result-home" id="btn-result-home" aria-label="Back to the start page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
          <span>Back to start</span>
        </button>
      </div>

      <div class="hr-ornament fade-in-delayed" aria-hidden="true"><span>✦</span></div>

      <div class="sponsor-section fade-in-delayed">
        <p class="sponsor-text">Enjoyed the Sorting?</p>
        <a class="sponsor-link" href="https://github.com/sponsors/Olian04" target="_blank" rel="noopener" aria-label="Sponsor the maker on GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span>Sponsor the maker</span>
        </a>
      </div>
    </div>
  `;

  // Land focus on the house name so keyboard/screen-reader users hear the result.
  const nameEl = document.getElementById('result-house-name');
  if (nameEl) nameEl.focus({ preventScroll: true });

  // Animate the bars once the leanings section has cascaded into view. Users who
  // prefer reduced motion get the filled bars right away.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, reduceMotion ? 0 : 1300);

  // Build the share controls (native share, platform buttons, combined copy).
  renderShareControls(shareUrl, house.name);

  // Retake. startQuiz() honours an in-progress quiz (prompting resume/start over)
  // — important when viewing someone else's shared result mid-quiz. beginFreshQuiz
  // / resumeSavedQuiz set the #quiz hash themselves, so dismissing the modal
  // leaves this result view (and its URL) untouched.
  document.getElementById('btn-retake').addEventListener('click', startQuiz);

  // Back to the start page
  document.getElementById('btn-result-home').addEventListener('click', goHome);
}

// ─── Sharing ────────────────────────────────────────────────────────────────────

const SHARE_TITLE = 'The Hogwarts Sorting Quiz';
const enc = encodeURIComponent;

function shareMessage(houseName) {
  return `I was sorted into ${houseName}! Which house does the Sorting Hat choose for you?`;
}

// Small inline icons. A generic "share/link" mark stands in where a faithful
// brand logo path isn't worth the bytes; the brand colour carries recognition.
const SHARE_ICON = {
  generic: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.751-8.878L2.25 2.25h6.836l4.27 5.641 5.138-5.641ZM17.08 19.77h1.833L7.084 4.126H5.117L17.08 19.77Z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  reddit: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
  tg: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.27 1.37.18 1.09 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>',
  li: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.001-4.121A2.06 2.06 0 015.34 7.43zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  bs: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078 2.67.296 5.568-.628 6.383-3.364C23.622 9.418 24 4.458 24 3.768c0-.69-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z"/></svg>',
  md: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M21.58 13.91c-.32 1.64-2.86 3.44-5.77 3.79-1.51.18-3 .35-4.59.27-2.6-.12-4.65-.62-4.65-.62 0 .25.02.49.05.72.34 2.57 2.55 2.72 4.65 2.79 2.11.07 3.99-.52 3.99-.52l.09 1.91s-1.48.79-4.1.94c-1.45.08-3.25-.04-5.34-.59-4.53-1.2-5.31-6.03-5.43-10.92-.04-1.45-.01-2.81-.01-3.96 0-4.87 3.19-6.3 3.19-6.3C5.26.96 8.03.7 10.91.68h.07c2.88.02 5.65.28 7.27 1.15 0 0 3.19 1.43 3.19 6.3 0 0 .04 3.59-.45 5.78M18.2 8.4c0-1.2-.3-2.15-.92-2.84-.63-.7-1.46-1.05-2.49-1.05-1.2 0-2.1.46-2.69 1.38l-.58.97-.58-.97c-.59-.92-1.49-1.38-2.69-1.38-1.03 0-1.86.35-2.49 1.05-.62.69-.92 1.64-.92 2.84v4.86h1.92V8.55c0-1.2.51-1.81 1.52-1.81 1.12 0 1.68.72 1.68 2.16v3.13h1.91V8.9c0-1.44.56-2.16 1.68-2.16 1.01 0 1.52.61 1.52 1.81v4.71h1.92V8.4z"/></svg>',
};

// Each platform builds a web-share intent URL from (text, url). Facebook and
// LinkedIn only accept a URL; the rest carry the message too.
const SHARE_PLATFORMS = {
  whatsapp: { label: 'WhatsApp', cls: 'wa', icon: SHARE_ICON.wa, url: (t, u) => `https://wa.me/?text=${enc(t + ' ' + u)}` },
  x:        { label: 'X', cls: 'x', icon: SHARE_ICON.x, url: (t, u) => `https://x.com/intent/tweet?text=${enc(t)}&url=${enc(u)}` },
  telegram: { label: 'Telegram', cls: 'tg', icon: SHARE_ICON.tg, url: (t, u) => `https://t.me/share/url?url=${enc(u)}&text=${enc(t)}` },
  facebook: { label: 'Facebook', cls: 'fb', icon: SHARE_ICON.fb, url: (t, u) => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}` },
  reddit:   { label: 'Reddit', cls: 'reddit', icon: SHARE_ICON.reddit, url: (t, u) => `https://reddit.com/submit?url=${enc(u)}&title=${enc(t)}` },
  threads:  { label: 'Threads', cls: 'th', icon: SHARE_ICON.generic, url: (t, u) => `https://www.threads.net/intent/post?text=${enc(t + ' ' + u)}` },
  bluesky:  { label: 'Bluesky', cls: 'bs', icon: SHARE_ICON.bs, url: (t, u) => `https://bsky.app/intent/compose?text=${enc(t + ' ' + u)}` },
  linkedin: { label: 'LinkedIn', cls: 'li', icon: SHARE_ICON.li, url: (t, u) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}` },
  mastodon: { label: 'Mastodon', cls: 'md', icon: SHARE_ICON.md, prompt: true },
  weibo:    { label: 'Weibo', cls: 'wb', icon: SHARE_ICON.generic, url: (t, u) => `https://service.weibo.com/share/share.php?url=${enc(u)}&title=${enc(t)}` },
  qzone:    { label: 'QZone', cls: 'qz', icon: SHARE_ICON.generic, url: (t, u) => `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${enc(u)}&title=${enc(t)}` },
};

// Device + system-language heuristic (no location permission needed).
function shareContext() {
  const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const langs = (navigator.languages && navigator.languages.length)
    ? navigator.languages : [navigator.language || ''];
  // Simplified-Chinese locales (mainland / Singapore) → surface Chinese networks.
  const isChina = langs.some(l => /^zh(-(cn|hans|sg))\b/i.test(l) || /^zh$/i.test(l) || /^zh-hans/i.test(l));
  return { isMobile, isChina };
}

// Which platforms sit up top vs. behind "More options".
function shareLayout({ isMobile, isChina }) {
  if (isChina) {
    return { top: ['weibo', 'qzone', 'x'], more: ['whatsapp', 'telegram', 'facebook', 'reddit', 'threads', 'bluesky', 'linkedin', 'mastodon'] };
  }
  if (isMobile) {
    return { top: ['whatsapp', 'x', 'telegram'], more: ['facebook', 'reddit', 'threads', 'bluesky', 'linkedin', 'mastodon'] };
  }
  return { top: ['x', 'facebook', 'reddit', 'linkedin'], more: ['whatsapp', 'telegram', 'threads', 'bluesky', 'mastodon'] };
}

function makeShareButton(key, text, url) {
  const p = SHARE_PLATFORMS[key];
  if (p.prompt) {
    // Mastodon has no universal web intent; ask for the user's instance.
    const b = document.createElement('button');
    b.className = `share-btn share-btn--${p.cls}`;
    b.innerHTML = `${p.icon}<span>${p.label}</span>`;
    b.addEventListener('click', () => {
      let inst = prompt('Your Mastodon instance:', 'mastodon.social');
      if (!inst) return;
      inst = inst.trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
      if (inst) window.open(`https://${inst}/share?text=${enc(text + ' ' + url)}`, '_blank', 'noopener');
    });
    return b;
  }
  const a = document.createElement('a');
  a.className = `share-btn share-btn--${p.cls}`;
  a.href = p.url(text, url);
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', `Share on ${p.label}`);
  a.innerHTML = `${p.icon}<span>${p.label}</span>`;
  return a;
}

function renderShareControls(shareUrl, houseName) {
  const root = document.getElementById('share-root');
  if (!root) return;
  const text = shareMessage(houseName);
  const { top, more } = shareLayout(shareContext());
  root.innerHTML = '';

  // Native OS share sheet (mobile + some desktops) — the only path to app-only
  // apps like Instagram, TikTok, Snapchat, WeChat. Offered up top when present.
  if (navigator.share) {
    const nb = document.createElement('button');
    nb.className = 'share-btn share-btn--native';
    nb.innerHTML = `${SHARE_ICON.generic}<span>Share…</span>`;
    nb.addEventListener('click', () => {
      navigator.share({ title: SHARE_TITLE, text, url: shareUrl }).catch(() => {});
    });
    root.appendChild(nb);
  }

  const grid = document.createElement('div');
  grid.className = 'share-buttons';
  top.forEach(k => grid.appendChild(makeShareButton(k, text, shareUrl)));
  root.appendChild(grid);

  if (more.length) {
    const moreGrid = document.createElement('div');
    moreGrid.className = 'share-more';
    moreGrid.hidden = true;
    more.forEach(k => moreGrid.appendChild(makeShareButton(k, text, shareUrl)));

    const toggle = document.createElement('button');
    toggle.className = 'share-more-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'More options';
    toggle.addEventListener('click', () => {
      const opening = moreGrid.hidden;
      moreGrid.hidden = !opening;
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.textContent = opening ? 'Fewer options' : 'More options';
    });
    root.appendChild(toggle);
    root.appendChild(moreGrid);
  }

  // Combined copy field: the link and Copy button joined as one pill.
  const copyRow = document.createElement('div');
  copyRow.className = 'copy-row';
  copyRow.innerHTML =
    `<input class="copy-input" id="share-url-input" type="text" readonly aria-label="Share link" />` +
    `<button class="copy-btn" id="btn-copy" type="button" aria-label="Copy share link"><span id="copy-label">Copy</span></button>`;
  root.appendChild(copyRow);

  const input = copyRow.querySelector('#share-url-input');
  input.value = shareUrl;
  input.addEventListener('click', function () { this.select(); });
  copyRow.querySelector('#btn-copy').addEventListener('click', () => {
    const done = () => {
      const l = document.getElementById('copy-label');
      if (!l) return;
      l.textContent = 'Copied!';
      setTimeout(() => { l.textContent = 'Copy'; }, 2000);
    };
    navigator.clipboard.writeText(shareUrl).then(done).catch(() => {
      input.select();
      document.execCommand('copy');
      done();
    });
  });
}

// ─── Particles ────────────────────────────────────────────────────────────────

function generateParticles() {
  const container = document.getElementById('particles');
  const count = 70;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    // ~20% are larger "bright" stars with a glint; the rest are small soft dots.
    const bright = Math.random() < 0.2;
    p.className = bright ? 'particle particle--bright' : 'particle';
    const size = bright ? Math.random() * 1.6 + 2.0 : Math.random() * 1.2 + 1.0;
    // Opacity is driven by the twinkle keyframes (with a visible floor), so it's
    // not set here — every star stays present rather than winking fully out.
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 6 + 5}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}

// Session storage keys
const SS_ANSWERS = 'hq_answers';
const SS_INDEX = 'hq_index';

// App state
const state = {
  view: null,
  questionIndex: 0,
  answers: {},
  transitioning: false
};

// ─── Init ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  generateParticles();
  route();
  window.addEventListener('hashchange', route);
  document.getElementById('btn-start').addEventListener('click', startQuiz);
});

function route() {
  const hash = window.location.hash;

  if (hash.startsWith('#r/')) {
    const parts = hash.slice(3).split('/').map(Number);
    if (parts.length === 4 && parts.every(n => !isNaN(n))) {
      const pct = { G: parts[0], H: parts[1], R: parts[2], S: parts[3] };
      const sum = parts.reduce((a, b) => a + b, 0);
      if (sum >= 96 && sum <= 104) {
        showView('result', pct);
        return;
      }
    }
  }

  // Restore in-progress quiz from session storage
  const saved = sessionStorage.getItem(SS_ANSWERS);
  const savedIdx = sessionStorage.getItem(SS_INDEX);
  if (saved && savedIdx !== null) {
    state.answers = JSON.parse(saved);
    state.questionIndex = parseInt(savedIdx, 10);
    showView('quiz');
    return;
  }

  showView('intro');
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function showView(name, data) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (!el) return;

  if (name === 'quiz') renderQuestion();
  if (name === 'result') renderResult(data);

  el.classList.add('active');
  state.view = name;
}

function startQuiz() {
  state.questionIndex = 0;
  state.answers = {};
  sessionStorage.removeItem(SS_ANSWERS);
  sessionStorage.removeItem(SS_INDEX);
  history.pushState(null, '', '#quiz');
  showView('quiz');
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

  gridEl.innerHTML = '';
  q.answers.forEach((answer, idx) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + idx)}</span><span class="answer-text">${answer.text}</span>`;
    btn.setAttribute('aria-label', `Answer ${String.fromCharCode(65 + idx)}: ${answer.text}`);
    btn.addEventListener('click', () => selectAnswer(idx, btn));
    gridEl.appendChild(btn);
  });
}

function selectAnswer(answerIdx, btnEl) {
  if (state.transitioning) return;
  state.transitioning = true;

  // Visual feedback
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
  btnEl.classList.add('selected');

  // Save answer
  const qId = QUESTIONS[state.questionIndex].id;
  state.answers[qId] = answerIdx;
  sessionStorage.setItem(SS_ANSWERS, JSON.stringify(state.answers));

  setTimeout(() => {
    state.questionIndex++;

    if (state.questionIndex >= QUESTIONS.length) {
      // Quiz complete
      finishQuiz();
    } else {
      sessionStorage.setItem(SS_INDEX, state.questionIndex);
      state.transitioning = false;
      renderQuestion();
    }
  }, 420);
}

function finishQuiz() {
  const pct = calculateScores(state.answers);

  // Clear session storage
  sessionStorage.removeItem(SS_ANSWERS);
  sessionStorage.removeItem(SS_INDEX);

  // Navigate to result with hash encoding
  const hash = encodeResults(pct);
  history.replaceState(null, '', hash);

  showView('result', pct);
  state.transitioning = false;
}

// ─── Score calculation ────────────────────────────────────────────────────────

function calculateScores(answers) {
  const raw = { G: 0, H: 0, R: 0, S: 0 };

  for (const [qId, ansIdx] of Object.entries(answers)) {
    const q = QUESTIONS.find(q => q.id === Number(qId));
    if (!q || !q.answers[ansIdx]) continue;
    for (const [house, pts] of Object.entries(q.answers[ansIdx].scores)) {
      raw[house] = (raw[house] || 0) + pts;
    }
  }

  const total = Object.values(raw).reduce((a, b) => a + b, 0);
  if (total === 0) return { G: 25, H: 25, R: 25, S: 25 };

  const pct = {};
  for (const h of ['G', 'H', 'R', 'S']) {
    pct[h] = Math.round((raw[h] / total) * 100);
  }

  // Fix rounding drift
  const sum = Object.values(pct).reduce((a, b) => a + b, 0);
  if (sum !== 100) {
    const maxH = Object.entries(pct).sort((a, b) => b[1] - a[1])[0][0];
    pct[maxH] += (100 - sum);
  }

  return pct;
}

function encodeResults(pct) {
  return `#r/${pct.G}/${pct.H}/${pct.R}/${pct.S}`;
}

function getWinningHouse(pct) {
  const order = ['G', 'H', 'R', 'S'];
  return order.reduce((best, h) => pct[h] > pct[best] ? h : best, 'G');
}

// ─── Result rendering ─────────────────────────────────────────────────────────

function renderResult(pct) {
  const winner = getWinningHouse(pct);
  const house = HOUSES[winner];
  const container = document.getElementById('view-result');

  // Apply house theme to result view
  container.style.setProperty('--house-primary', house.primary);
  container.style.setProperty('--house-secondary', house.secondary);
  container.style.setProperty('--house-bg', house.bg);
  container.style.setProperty('--house-text', house.textOnDark);

  const shareUrl = window.location.origin + window.location.pathname + encodeResults(pct);

  // Sort houses by score descending for the chart
  const sorted = ['G', 'H', 'R', 'S'].sort((a, b) => pct[b] - pct[a]);

  container.innerHTML = `
    <div class="result-inner">
      <div class="sorting-hat-line">The Sorting Hat has considered…</div>

      <div class="house-reveal" id="house-reveal">
        <div class="house-crest">
          <img class="house-crest-svg" src="${house.svg}" alt="${house.name} house crest" />
          <div class="house-name" style="color: ${house.secondary};">${house.name}</div>
          <div class="house-tagline" style="color: ${house.textOnDark};">${house.tagline}</div>
        </div>
      </div>

      <div class="result-desc fade-in-delayed">
        <p class="house-description">${house.description}</p>
        <blockquote class="house-quote">${house.quote}</blockquote>
      </div>

      <div class="traits-row fade-in-delayed">
        ${house.traits.map(t => `<span class="trait-chip" style="border-color:${house.secondary};color:${house.secondary}">${t}</span>`).join('')}
      </div>

      <div class="leanings-section fade-in-delayed">
        <h3 class="leanings-title">Your House Leanings</h3>
        <div class="bars-container" id="bars-container">
          ${sorted.map(h => `
            <div class="bar-row ${h === winner ? 'bar-row--winner' : ''}">
              <div class="bar-label">
                <img class="bar-crest" src="${HOUSES[h].svg}" alt="${HOUSES[h].name}" />
                <span class="bar-name">${HOUSES[h].name}</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" data-pct="${pct[h]}" style="background: linear-gradient(90deg, ${HOUSES[h].primary}, ${HOUSES[h].secondary}); width: 0%;"></div>
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
        <div class="share-buttons">
          <a class="share-btn share-btn--x" href="${buildShareX(house.name, shareUrl)}" target="_blank" rel="noopener" aria-label="Share on X">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.751-8.878L2.25 2.25h6.836l4.27 5.641 5.138-5.641ZM17.08 19.77h1.833L7.084 4.126H5.117L17.08 19.77Z"/></svg>
            X / Twitter
          </a>
          <a class="share-btn share-btn--fb" href="${buildShareFacebook(shareUrl)}" target="_blank" rel="noopener" aria-label="Share on Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
          <a class="share-btn share-btn--reddit" href="${buildShareReddit(house.name, shareUrl)}" target="_blank" rel="noopener" aria-label="Share on Reddit">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
            Reddit
          </a>
          <a class="share-btn share-btn--wa" href="${buildShareWhatsApp(house.name, shareUrl)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            WhatsApp
          </a>
          <button class="share-btn share-btn--copy" id="btn-copy" aria-label="Copy share link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span id="copy-label">Copy Link</span>
          </button>
        </div>
        <div class="share-url-row">
          <input class="share-url-input" id="share-url-input" type="text" readonly value="${shareUrl}" aria-label="Share URL" />
        </div>
      </div>

      <div class="retake-section fade-in-delayed">
        <button class="btn-retake" id="btn-retake">Retake the Quiz</button>
      </div>
    </div>
  `;

  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, 600);

  // Copy button
  document.getElementById('btn-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      const label = document.getElementById('copy-label');
      label.textContent = 'Copied!';
      setTimeout(() => { label.textContent = 'Copy Link'; }, 2000);
    }).catch(() => {
      const input = document.getElementById('share-url-input');
      input.select();
      document.execCommand('copy');
    });
  });

  // Share URL click to select
  document.getElementById('share-url-input').addEventListener('click', function() {
    this.select();
  });

  // Retake
  document.getElementById('btn-retake').addEventListener('click', () => {
    history.pushState(null, '', window.location.pathname);
    startQuiz();
  });
}

// ─── Share URL builders ───────────────────────────────────────────────────────

function buildShareX(houseName, url) {
  const text = encodeURIComponent(`I was sorted into ${houseName}! Take the Hogwarts Sorting Quiz:`);
  return `https://x.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
}

function buildShareFacebook(url) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

function buildShareReddit(houseName, url) {
  const title = encodeURIComponent(`I was sorted into ${houseName} — take the Hogwarts Sorting Quiz`);
  return `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${title}`;
}

function buildShareWhatsApp(houseName, url) {
  const text = encodeURIComponent(`I was sorted into ${houseName}! Take the Hogwarts Sorting Quiz: ${url}`);
  return `https://wa.me/?text=${text}`;
}

// ─── Particles ────────────────────────────────────────────────────────────────

function generateParticles() {
  const container = document.getElementById('particles');
  const count = 55;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2.5 + 0.8;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${Math.random() * 0.5 + 0.1};
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// Single source of truth for the release version. Bump APP_VERSION on each
// release — it drives BOTH the version shown on the About page (#about) and the
// service-worker cache name (`hq-cache-v<APP_VERSION>` in sw.js). Loaded as a
// plain browser global by index.html and via importScripts() by sw.js, so the
// two can never drift apart.
const APP_VERSION = '12';
const RELEASE_DATE = '2026-06-30'; // ISO; rendered in a friendlier form on the page

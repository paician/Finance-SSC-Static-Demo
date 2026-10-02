import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const localeKey = 'fin-ssc-demo-locale';
const source = Object.fromEntries(
  ['messages.js', 'simplified.js', 'i18n.js', 'app.js'].map(file => [file, readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')])
);

function createRuntime({ languages, language, stored, storage = new Map(), withApp = false } = {}) {
  if (stored !== undefined) storage.set(localeKey, stored);
  const appListeners = new Map();
  const windowListeners = new Map();
  const app = { innerHTML: '', addEventListener: (name, callback) => appListeners.set(name, callback) };
  const location = { href: 'https://example.test/demo/?role=employee&page=home' };
  const description = { content: '' };
  const document = {
    documentElement: { lang: '' }, title: '', activeElement: null,
    querySelector: selector => selector === 'meta[name="description"]' ? description : null,
    getElementById: id => id === 'app' ? app : { scrollTo() {} }
  };
  const window = {
    location, addEventListener: (name, callback) => windowListeners.set(name, callback),
    scrollTo() {}, setTimeout() {}
  };
  const history = {
    pushState(_state, _unused, url) { location.href = String(url); },
    replaceState(_state, _unused, url) { location.href = String(url); }
  };
  const localStorage = {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  };
  const navigator = { language };
  if (languages !== undefined) navigator.languages = languages;
  class MockFormData {
    constructor(form) { this.values = form.values; }
    get(key) { return this.values[key]; }
  }
  const context = { window, document, navigator, history, localStorage, URL, FormData: MockFormData };
  for (const file of ['messages.js', 'simplified.js', 'i18n.js', ...(withApp ? ['app.js'] : [])]) {
    runInNewContext(source[file], context, { filename: file });
  }
  return { i18n: window.FinSscI18n, app, appListeners, windowListeners, location, document, storage };
}

const detectionCases = [
  [['zh-TW'], 'zh-TW'], [['zh-HK'], 'zh-TW'], [['zh-MO'], 'zh-TW'],
  [['zh-Hant-HK'], 'zh-TW'], [['zh-CN'], 'zh-CN'], [['zh-SG'], 'zh-CN'],
  [['zh-MY'], 'zh-CN'], [['zh-Hans-SG'], 'zh-CN'], [['en-US'], 'en'],
  [['ja-JP'], 'en'], [['ja-JP', 'zh-HK'], 'zh-TW'], [['ko-KR', 'en-GB'], 'en']
];
for (const [languages, expected] of detectionCases) {
  const runtime = createRuntime({ languages, language: languages[0] });
  assert.equal(runtime.i18n.resolveLocale(), expected, `navigator.languages=${languages.join(',')}`);
}
assert.equal(createRuntime({ language: 'zh-CN' }).i18n.resolveLocale(), 'zh-CN');
assert.equal(createRuntime({ languages: ['ja-JP'], language: 'ja-JP', stored: 'invalid' }).i18n.resolveLocale(), 'en');
assert.equal(createRuntime({ languages: ['zh-TW'], stored: 'en' }).i18n.resolveLocale(), 'en');
assert.equal(createRuntime({ languages: ['en-US'], stored: 'zh-TW' }).i18n.resolveLocale(), 'zh-TW');

for (const [locale, lang] of [['zh-TW', 'zh-Hant-TW'], ['zh-CN', 'zh-Hans-CN'], ['en', 'en']]) {
  const runtime = createRuntime({ languages: ['en-US'], stored: locale });
  assert.equal(runtime.i18n.resolveLocale(), locale);
  assert.equal(runtime.document.documentElement.lang, lang);
  assert.ok(runtime.document.title);
  assert.equal(runtime.i18n.t('missing.translation.key'), 'missing.translation.key');
}

const storage = new Map();
const runtime = createRuntime({ languages: ['en-US'], language: 'en-US', storage, withApp: true });
assert.equal(runtime.i18n.getLocale(), 'en');
assert.equal(runtime.document.documentElement.lang, 'en');
assert.match(runtime.app.innerHTML, /Application Services/);
assert.doesNotMatch(runtime.app.innerHTML, /undefined/);

runtime.appListeners.get('click')({ target: { closest: () => ({ dataset: { settings: '' } }) } });
assert.match(runtime.app.innerHTML, /Auto — Browser Language/);
for (const value of ['auto', 'zh-TW', 'zh-CN', 'en']) {
  assert.match(runtime.app.innerHTML, new RegExp(`name="locale" value="${value}"`));
}

runtime.appListeners.get('change')({ target: { name: 'locale', value: 'zh-CN' } });
assert.equal(storage.get(localeKey), 'zh-CN');
assert.equal(runtime.document.documentElement.lang, 'zh-Hans-CN');
assert.match(runtime.app.innerHTML, /个人设置/);
assert.doesNotMatch(runtime.app.innerHTML, /undefined/);

runtime.appListeners.get('change')({ target: { id: 'role-switch', value: 'finance' } });
assert.equal(runtime.i18n.getLocale(), 'zh-CN');
assert.match(runtime.app.innerHTML, /财务总览/);
runtime.appListeners.get('change')({ target: { id: 'role-switch', value: 'employee' } });
assert.equal(runtime.i18n.getLocale(), 'zh-CN');
for (const page of ['home', 'policy', 'applications']) {
  runtime.location.href = `https://example.test/demo/?role=employee&page=${page}`;
  runtime.windowListeners.get('popstate')();
  assert.equal(runtime.i18n.getLocale(), 'zh-CN');
  assert.doesNotMatch(runtime.app.innerHTML, /undefined/);
}

const refreshed = createRuntime({ languages: ['en-US'], language: 'en-US', storage, withApp: true });
assert.equal(refreshed.i18n.getLocale(), 'zh-CN');
assert.match(refreshed.app.innerHTML, /申请服务/);
refreshed.appListeners.get('click')({ target: { closest: () => ({ dataset: { settings: '' } }) } });
refreshed.appListeners.get('change')({ target: { name: 'locale', value: 'auto' } });
assert.equal(storage.has(localeKey), false);
assert.equal(refreshed.i18n.getLocale(), 'en');
assert.equal(refreshed.document.documentElement.lang, 'en');
assert.match(refreshed.app.innerHTML, /Personal Settings/);

const pages = {
  employee: ['home', 'service', 'applications', 'policy', 'faq'],
  finance: ['home', 'reports', 'revenue', 'cash', 'pnl', 'budget', 'bu', 'alerts', 'review', 'policy']
};
for (const [locale, sample] of [['zh-TW', '申請服務'], ['zh-CN', '申请服务'], ['en', 'Application Services']]) {
  const current = createRuntime({ languages: ['en-US'], stored: locale, withApp: true });
  for (const [role, rolePages] of Object.entries(pages)) {
    for (const page of rolePages) {
      current.location.href = `https://example.test/demo/?role=${role}&page=${page}`;
      current.windowListeners.get('popstate')();
      assert.equal(current.i18n.getLocale(), locale);
      assert.match(current.app.innerHTML, /Finance SSC/);
      assert.doesNotMatch(current.app.innerHTML, /undefined/);
      assert.match(current.app.innerHTML, new RegExp(`data-page="${page}"[^>]*aria-current="page"`));
    }
  }
  current.location.href = 'https://example.test/demo/?role=employee&page=home';
  current.windowListeners.get('popstate')();
  assert.match(current.app.innerHTML, new RegExp(sample));
}

console.log('i18n: browser mapping, override, Auto, persistence, settings, role/page independence, lang, and 45 page renders PASS');

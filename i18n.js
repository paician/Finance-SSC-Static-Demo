(() => {
  'use strict';
  const KEY = 'fin-ssc-demo-locale';
  const supported = new Set(['zh-TW', 'zh-CN', 'en']);
  const documentLang = { 'zh-TW': 'zh-Hant-TW', 'zh-CN': 'zh-Hans-CN', en: 'en' };
  const messages = window.FinSscMessages;
  let locale;

  function mapLanguage(tag) {
    if (typeof tag !== 'string') return null;
    const parts = tag.trim().replaceAll('_', '-').toLowerCase().split('-');
    if (parts[0] === 'en') return 'en';
    if (parts[0] !== 'zh') return null;
    if (parts.includes('hant') || ['tw', 'hk', 'mo'].some(part => parts.includes(part))) return 'zh-TW';
    if (parts.includes('hans') || ['cn', 'sg', 'my'].some(part => parts.includes(part))) return 'zh-CN';
    return null;
  }
  function browserLocale() {
    const languages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const language of languages) {
      const mapped = mapLanguage(language);
      if (mapped) return mapped;
    }
    return 'en';
  }
  function resolveLocale() {
    let stored;
    try { stored = localStorage.getItem(KEY); } catch { /* storage unavailable */ }
    locale = supported.has(stored) ? stored : browserLocale();
    applyDocumentLocale();
    return locale;
  }
  function applyDocumentLocale() {
    document.documentElement.lang = documentLang[locale];
    document.title = messages[locale]['meta.title'];
    const description = document.querySelector?.('meta[name="description"]');
    if (description) description.content = messages[locale]['meta.description'];
  }
  function setLocale(value) {
    if (value !== 'auto' && !supported.has(value)) return locale;
    try {
      if (value === 'auto') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, value);
    } catch { /* storage unavailable: apply for this session */ }
    locale = value === 'auto' ? browserLocale() : value;
    applyDocumentLocale();
    return locale;
  }
  function t(key) {
    return messages[locale]?.[key] ?? messages.en[key] ?? key;
  }
  // Templates are localized synchronously before insertion into the document.
  // The keys are the existing Traditional Chinese product copy, which keeps the
  // current visual baseline and makes all synthetic content use one dictionary.
  const keys = Object.keys(messages.en).filter(key => /[\u3400-\u9fff]/u.test(key)).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gu');
  const simplifiedKeys = Object.keys(messages['zh-CN']).filter(key => /[\u3400-\u9fff]/u.test(key)).sort((a, b) => b.length - a.length);
  const simplifiedPattern = new RegExp(simplifiedKeys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gu');
  function translateMarkup(markup) {
    if (locale === 'zh-TW') return markup;
    const protectedNames = ['林怡君', '陳志明', '張雅婷', '繁體中文', '简体中文'];
    let localized = locale === 'en' ? markup : markup.replace(simplifiedPattern, match => messages['zh-CN'][match]);
    protectedNames.forEach((name, index) => { localized = localized.replaceAll(name, `__PERSON_${index}__`); });
    if (locale === 'en') localized = localized.replace(pattern, match => t(match));
    else localized = localized.replace(/[\u3400-\u9fff]/gu, character => window.FinSscSimplified[character] || character);
    protectedNames.forEach((name, index) => { localized = localized.replaceAll(`__PERSON_${index}__`, name); });
    return localized;
  }
  window.FinSscI18n = { mapLanguage, browserLocale, resolveLocale, setLocale, getLocale: () => locale, t, translateMarkup };
})();

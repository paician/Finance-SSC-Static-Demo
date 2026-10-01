import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const storage = new Map();
const appListeners = new Map();
const windowListeners = new Map();
const app = { innerHTML: '', addEventListener: (name, callback) => appListeners.set(name, callback) };
const location = { href: 'https://example.test/demo/?role=employee' };
const document = {
  activeElement: null,
  getElementById: id => id === 'app' ? app : { scrollTo() {} }
};
const window = {
  location,
  addEventListener: (name, callback) => windowListeners.set(name, callback),
  scrollTo() {},
  setTimeout() {}
};
const history = {
  pushState(_state, _unused, url) { location.href = String(url); },
  replaceState(_state, _unused, url) { location.href = String(url); }
};
const localStorage = {
  getItem: key => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value))
};
class MockFormData {
  constructor(form) { this.values = form.values; }
  get(key) { return this.values[key]; }
}
runInNewContext(readFileSync(new URL('../app.js', import.meta.url), 'utf8'), {
  document, window, history, localStorage, URL, Date, Number, String, Array, JSON, MockFormData,
  FormData: MockFormData
});

function visit(role, page = 'home') {
  location.href = `https://example.test/demo/?role=${role}&page=${page}`;
  windowListeners.get('popstate')();
  assert.match(app.innerHTML, /Finance SSC/);
  assert.doesNotMatch(app.innerHTML, /undefined<\/svg>/);
  assert.match(app.innerHTML, new RegExp(`data-page="${page}"[^>]*aria-current="page"`));
}
for (const page of ['home', 'service', 'applications', 'policy', 'faq']) visit('employee', page);
for (const page of ['home', 'reports', 'revenue', 'cash', 'pnl', 'budget', 'bu', 'alerts', 'review', 'policy']) visit('finance', page);

visit('employee');
assert.match(app.innerHTML, /早安，Evren/);
appListeners.get('change')({ target: { id: 'role-switch', value: 'finance' } });
assert.match(location.href, /role=finance/);
assert.equal(storage.get('fin-ssc-demo-role'), 'finance');
assert.match(app.innerHTML, /財務總覽/);
location.href = 'https://example.test/demo/?page=home';
windowListeners.get('popstate')();
assert.match(app.innerHTML, /財務總覽/);
location.href = 'https://example.test/demo/?role=employee&page=revenue';
windowListeners.get('popstate')();
assert.match(app.innerHTML, /早安，Evren/);
assert.doesNotMatch(app.innerHTML, /data-page="revenue"/);

visit('employee', 'service');
appListeners.get('click')({ target: { closest: () => ({ dataset: { service: 'expense' } }) } });
assert.match(app.innerHTML, /id="application-form"/);
appListeners.get('submit')({
  target: { id: 'application-form', values: { service: 'expense', title: '<示範費用>', amount: '1200', description: '' } },
  preventDefault() {}
});
assert.match(location.href, /page=applications/);
assert.match(app.innerHTML, /&lt;示範費用&gt;/);
assert.doesNotMatch(app.innerHTML, /<示範費用>/);
console.log('已驗證 15 個角色頁面、角色切換、示範申請及文字跳脫。');

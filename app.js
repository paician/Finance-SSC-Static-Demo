(() => {
  'use strict';

  const ROLE_KEY = 'fin-ssc-demo-role';
  const APPLICATIONS_KEY = 'fin-ssc-demo-applications';
  const { t, translateMarkup, resolveLocale, setLocale, getLocale } = window.FinSscI18n;
  resolveLocale();
  const app = document.getElementById('app');
  const icons = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
    policy: '<path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14 3v5h5M8 12h8M8 16h8"/>',
    service: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 15h8M12 13v4"/>',
    track: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 3v3h6V3M8 11h8M8 15h5"/>',
    ask: '<path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-4.5a8.5 8.5 0 1 1 15.1-5z"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 16h.01"/>',
    review: '<path d="M5 3h14v18H5zM8 8h8M8 12h8M8 16h4"/><path d="m14 16 2 2 4-4"/>',
    report: '<path d="M4 20h16M6 17v-6M11 17V5M16 17v-9M21 17v-4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M5 5 19 19M19 5 5 19"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    upload: '<path d="M12 16V3m-5 5 5-5 5 5M4 16v4h16v-4"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19 13.5a1.5 1.5 0 0 0 .3 1.7l.1.1-2 2-.1-.1a1.5 1.5 0 0 0-1.7-.3 1.5 1.5 0 0 0-1 1.4V19h-3v-.2a1.5 1.5 0 0 0-1-1.4 1.5 1.5 0 0 0-1.7.3l-.1.1-2-2 .1-.1a1.5 1.5 0 0 0 .3-1.7 1.5 1.5 0 0 0-1.4-1H5v-3h.2a1.5 1.5 0 0 0 1.4-1 1.5 1.5 0 0 0-.3-1.7l-.1-.1 2-2 .1.1a1.5 1.5 0 0 0 1.7.3 1.5 1.5 0 0 0 1-1.4V5h3v.2a1.5 1.5 0 0 0 1 1.4 1.5 1.5 0 0 0 1.7-.3l.1-.1 2 2-.1.1a1.5 1.5 0 0 0-.3 1.7 1.5 1.5 0 0 0 1.4 1h.2v3z"/>'
    ,plane: '<path d="m21 3-7.5 8.5 2 7-2.5 2-4-6-5 2-2-2.5 6-4L5.5 6l2-2.5 7 2L21 3z"/>',
    receipt: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2zM9 8h6M9 12h6M9 16h3"/>',
    credit: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
    book: '<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1zM12 6v14"/>',
    building: '<path d="M4 21V6l8-3 8 3v15M8 9h2M14 9h2M8 13h2M14 13h2M8 17h2M14 17h2M2 21h20"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  const icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const nav = {
    employee: [
      ['home', '首頁', 'Home', '尋找服務'],
      ['service', '申請服務', 'Application Service', '開始申請'],
      ['applications', '我的申請', 'My Applications', '追蹤進度'],
      ['policy', '財務政策', 'Finance Policy', '理解規範'],
      ['faq', 'FAQ', 'FAQ', '取得解答']
    ],
    finance: [
      ['home', '首頁', 'Home', '掌握工作'],
      ['reports', '財務總覽', 'Finance Overview', '檢視數據'],
      ['revenue', '本月營收', 'Revenue Overview', '營收趨勢'],
      ['cash', '可用現金', 'Cash Overview', '現金部位'],
      ['pnl', '本月損益', 'P&L Overview', '損益表現'],
      ['budget', '年度預算', 'Budget Execution', '預算執行'],
      ['bu', 'BU 表現分析', 'BU Performance', '營運分析'],
      ['alerts', '重大異常', 'Major Exceptions', '風險預警'],
      ['review', '申請審核', 'Application Review', '處理案件'],
      ['policy', '資料中心', 'Data Center', '檢視資料']
    ]
  };
  const employeeContext = Object.freeze({ company: 'Malaysia Entity A', country: 'Malaysia', department: 'Sales' });
  const services = [
    { id: 'expense', title: '費用報銷', description: '提交差旅、交通及其他業務相關費用。', category: '費用與報銷', time: '約 3 個工作天', icon: 'service' },
    { id: 'travel', title: '出差申請', description: '辦理國內或國外出差申請。', category: '差旅服務', time: '約 3 個工作天', icon: 'arrow' },
    { id: 'payment', title: '付款申請', description: '提出供應商付款與非採購付款需求。', category: '付款與採購', time: '約 5 個工作天', icon: 'track' },
    { id: 'invoice', title: '發票查詢', description: '查詢發票開立、寄送及處理方式。', category: '發票與稅務', time: '即時查詢', icon: 'policy' },
    { id: 'advance', title: '預支款申請', description: '業務活動前提出預支款項申請。', category: '費用與報銷', time: '約 3 個工作天', icon: 'upload' }
  ];
  const policies = [
    { title: '差旅與交通費用規範', tag: '費用與報銷', updated: '2026 / 09 / 15', text: '差旅申請、交通工具、住宿與可報銷費用的示範規範。' },
    { title: '費用報銷作業指引', tag: '費用與報銷', updated: '2026 / 09 / 08', text: '憑證、申請期限、核准流程與常見退件原因。' },
    { title: '付款申請作業指引', tag: '付款與採購', updated: '2026 / 08 / 28', text: '付款資料、附件與處理時程的示範說明。' },
    { title: '發票與稅務常見規範', tag: '發票與稅務', updated: '2026 / 08 / 18', text: '發票抬頭、統編與憑證處理的示範說明。' }
  ];
  const faqs = [
    { q: '費用報銷需要準備哪些附件？', a: '請備妥收據或發票、費用明細，以及與業務目的相關的說明。本頁僅供靜態展示，實際規範請以企業公告為準。', tag: '費用報銷' },
    { q: '送出申請後，如何查看處理進度？', a: '請至「我的申請」查看各筆申請的狀態與更新時間。示範資料會保存在此瀏覽器中。', tag: '申請進度' },
    { q: '付款申請通常需要多久？', a: '此展示以約 5 個工作天作為示意時程，實際處理時間依案件資料與審核流程而定。', tag: '付款申請' },
    { q: '申請被退回時該怎麼辦？', a: '請查看退回原因、補齊資料後重新提交。本靜態展示不連接任何真實審核系統。', tag: '申請進度' }
  ];
  const initialApplications = [
    ['FSSC-20261004-001', '機票費', '台北－新加坡 業務出差', '2026/10/04', 'NT$ 12,500', '進行中'],
    ['FSSC-20261002-003', '住宿費', '新加坡出差 4 晚', '2026/10/02', 'NT$ 18,800', '進行中'],
    ['FSSC-20261001-002', '交通費', '機場往返及當地交通', '2026/10/01', 'NT$ 3,280', '需補件'],
    ['FSSC-20260928-001', '業務招待費', '客戶會議餐費', '2026/09/28', 'NT$ 6,500', '已完成'],
    ['FSSC-20260920-004', '其他費用', '電話／網路費', '2026/09/20', 'NT$ 1,980', '已完成'],
    ['FSSC-20260915-002', '機票費', '台北－東京 業務出差', '2026/09/15', 'NT$ 21,300', '已完成'],
    ['FSSC-20260910-001', '廠商付款', '系統維護費用', '2026/09/10', 'NT$ 150,000', '已取消'],
    ['FSSC-20260905-003', '住宿費', '台北出差住宿費', '2026/09/05', 'NT$ 4,200', '已完成'],
    ['FSSC-20260828-001', '業務招待費', '部門聚餐費用', '2026/08/28', 'NT$ 8,600', '已取消'],
    ['FSSC-20260820-002', '機票費', '台北－大阪 業務出差', '2026/08/20', 'NT$ 16,500', '已完成'],
    ['FSSC-20260815-001', '交通費', '客戶拜訪計程車費', '2026/08/15', 'NT$ 1,680', '已完成'],
    ['FSSC-20260812-002', '住宿費', '高雄出差住宿費', '2026/08/12', 'NT$ 3,600', '已完成'],
    ['FSSC-20260808-001', '廠商付款', '軟體授權費', '2026/08/08', 'NT$ 42,000', '進行中'],
    ['FSSC-20260803-001', '交通費', '外部會議交通費', '2026/08/03', 'NT$ 980', '已完成'],
    ['FSSC-20260728-002', '其他費用', '辦公用品', '2026/07/28', 'NT$ 2,450', '已完成'],
    ['FSSC-20260720-001', '機票費', '台北－香港 業務出差', '2026/07/20', 'NT$ 10,800', '已完成'],
    ['FSSC-20260712-003', '住宿費', '香港出差住宿費', '2026/07/12', 'NT$ 6,800', '已完成'],
    ['FSSC-20260705-001', '交通費', '機場接駁費', '2026/07/05', 'NT$ 1,200', '已完成']
  ].map(([id, type, title, date, amount, status]) => ({ id, type, title, date, amount, status }));
  const financeCases = [
    { id: 'SSC-2026-0930', person: '林怡君', type: '費用報銷', title: '專案交通費', amount: 'NT$ 1,860', date: '2026 / 09 / 30', status: '待審核' },
    { id: 'SSC-2026-0929', person: '陳志明', type: '付款申請', title: '供應商服務費', amount: 'NT$ 24,500', date: '2026 / 09 / 29', status: '待審核' },
    { id: 'SSC-2026-0927', person: '張雅婷', type: '預支款申請', title: '活動預支款', amount: 'NT$ 8,000', date: '2026 / 09 / 27', status: '處理中' }
  ];
  const statusCodes = { '進行中': 'in_progress', '處理中': 'in_progress', '已完成': 'completed', '需補件': 'needs_info', '已取消': 'cancelled', '待審核': 'pending' };
  const normalizeStatus = value => statusCodes[value] || value;
  const typeCodes = { '機票費': 'airfare', '住宿費': 'lodging', '交通費': 'transportation', '業務招待費': 'entertainment', '其他費用': 'other_expense', '廠商付款': 'vendor_payment', '費用報銷': 'expense', '出差申請': 'travel', '付款申請': 'payment', '預支款申請': 'advance' };
  const normalizeType = value => typeCodes[value] || value;
  initialApplications.forEach(item => { item.status = normalizeStatus(item.status); item.type = normalizeType(item.type); });
  financeCases.forEach(item => { item.status = normalizeStatus(item.status); item.type = normalizeType(item.type); });
  const state = { role: 'employee', page: 'home', mobileOpen: false, search: '', filter: 'all', listPage: 0, policyTab: 'policy', selectedService: null, faqOpen: 0, assistant: [], notificationOpen: false, toast: '', settingsOpen: false, financeCases: financeCases.map(item => ({ ...item })) };

  function loadApplications() {
    try {
      const saved = JSON.parse(localStorage.getItem(APPLICATIONS_KEY));
      return Array.isArray(saved) ? [...saved.map(item => ({ ...item, status: normalizeStatus(item.status), type: normalizeType(item.type) })), ...initialApplications] : initialApplications;
    } catch { return initialApplications; }
  }
  function getStoredRole() {
    try { return localStorage.getItem(ROLE_KEY); } catch { return null; }
  }
  function setStoredRole(role) {
    try { localStorage.setItem(ROLE_KEY, role); } catch { /* private browsing */ }
  }
  function routeFromUrl() {
    const url = new URL(window.location.href);
    state.settingsOpen = false;
    const role = url.searchParams.get('role');
    state.role = role === 'employee' || role === 'finance' ? role : (getStoredRole() === 'finance' ? 'finance' : 'employee');
    state.page = nav[state.role].some(item => item[0] === url.searchParams.get('page')) ? url.searchParams.get('page') : 'home';
    setStoredRole(state.role);
  }
  function setRoute(role, page, push = true) {
    state.role = role;
    state.page = nav[role].some(item => item[0] === page) ? page : 'home';
    state.settingsOpen = false;
    state.mobileOpen = false;
    state.search = '';
    state.filter = 'all';
    state.listPage = 0;
    state.selectedService = null;
    setStoredRole(role);
    const url = new URL(window.location.href);
    url.searchParams.set('role', role);
    if (state.page === 'home') url.searchParams.delete('page');
    else url.searchParams.set('page', state.page);
    history[push ? 'pushState' : 'replaceState']({}, '', url);
    render();
    window.scrollTo(0, 0);
  }
  const card = (content, className = '') => `<section class="card ${className}">${content}</section>`;
  const matchesSearch = value => !state.search || translateMarkup(String(value)).toLocaleLowerCase(getLocale()).includes(state.search.toLocaleLowerCase(getLocale()));
  const badge = status => `<span class="status status-${status === 'completed' ? 'done' : status === 'needs_info' ? 'attention' : status === 'cancelled' ? 'cancelled' : status === 'pending' ? 'pending' : 'progress'}">${escapeHtml(t(`status.${status}`))}</span>`;
  const pageTitle = (eyebrow, title, subtitle, extra = '') => `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${subtitle}</p></div>${extra}</div>`;
  const action = (label, page, variant = 'primary') => `<button class="button button-${variant}" type="button" data-page="${page}">${label}${icon('arrow')}</button>`;
  function shell(content) {
    const current = nav[state.role].find(item => item[0] === state.page);
    const name = 'Evren';
    const initials = 'E';
    const roleLabel = state.role === 'finance' ? '財務人員 Finance' : '一般員工 Employee';
    return `<div class="app-shell ${state.mobileOpen ? 'nav-open' : ''}">
      <aside class="sidebar" aria-label="主要導覽">
        <div class="brand"><span class="brand-mark"><i></i><i></i><i></i><i></i></span><strong>Finance SSC</strong></div>
        <nav class="side-nav">${nav[state.role].map(([page, label]) => `<button class="nav-item ${state.page === page ? 'active' : ''}" type="button" data-page="${page}" ${state.page === page ? 'aria-current="page"' : ''}>${icon(({ applications: 'track', service: 'review', faq: 'ask', reports: 'report', revenue: 'users', cash: 'clock', pnl: 'report', budget: 'track', bu: 'home', alerts: 'info' })[page] || page)}<strong>${label}</strong></button>`).join('')}</nav>
        <div class="sidebar-spacer"></div><button class="settings-link" type="button" data-settings>${icon('settings')}<span>個人設定</span></button>
      </aside>
      <div class="mobile-backdrop" data-close-menu></div>
      <div class="main-column">
        <header class="topbar"><div class="topbar-left"><button class="icon-button menu-button" type="button" data-menu aria-label="開啟選單">${icon('menu')}</button><span class="role-identity">${icon('users')} ${state.role === 'finance' ? '財務人員 Finance' : '一般員工 Employee'}</span></div><label class="global-search">${icon('search')}<input id="global-search" type="search" placeholder="${state.role === 'finance' ? '搜尋報表、BU、科目、關鍵字...' : '搜尋服務、政策、SOP 或任何問題...'}" aria-label="全站搜尋"></label><div class="topbar-actions"><button class="icon-button notification-button" type="button" data-notification aria-label="通知" aria-expanded="${state.notificationOpen}">${icon('bell')}<i>${state.role === 'finance' ? 6 : 3}</i></button><button class="icon-button help-button" type="button" data-page="${state.role === 'finance' ? 'reports' : 'faq'}" aria-label="說明">${icon('ask')}</button><span class="topbar-rule"></span><label class="profile-switch"><span class="header-avatar">${initials}</span><span class="profile-copy"><strong>${name}</strong><small>${roleLabel}</small></span><select id="role-switch" aria-label="切換角色"><option value="employee" ${state.role === 'employee' ? 'selected' : ''}>一般員工</option><option value="finance" ${state.role === 'finance' ? 'selected' : ''}>財務人員</option></select>${icon('chevron')}</label></div></header>
        ${state.notificationOpen ? `<div class="notification-popover">${icon('info')} 此為靜態展示，沒有即時通知。</div>` : ''}
        <main class="page-content" id="main-content">${state.settingsOpen ? settingsPage() : content}</main>
      </div>
      ${state.toast ? `<div class="toast" role="status">${icon('check')}${escapeHtml(state.toast)}</div>` : ''}
    </div>`;
  }
  function settingsPage() {
    const current = getLocale();
    let stored;
    try { stored = localStorage.getItem('fin-ssc-demo-locale'); } catch { stored = null; }
    const automatic = !['zh-TW', 'zh-CN', 'en'].includes(stored);
    return `${pageTitle('PERSONAL SETTINGS', t('settings.title'), t('settings.description'))}
      ${card(`<div class="section-title"><h2>${t('settings.language')}</h2></div><p class="settings-description">${t('settings.languageDescription')}</p><fieldset class="language-options"><legend>${t('settings.language')}</legend>${[['auto', 'settings.auto'], ['zh-TW', 'settings.traditional'], ['zh-CN', 'settings.simplified'], ['en', 'settings.english']].map(([value, key]) => `<label><input type="radio" name="locale" value="${value}" ${(value === 'auto' ? automatic : !automatic && current === value) ? 'checked' : ''}><span>${t(key)}</span></label>`).join('')}</fieldset><p class="settings-current">${t('settings.active')}: ${t(`settings.${current}`)}</p>`, 'reference-card settings-card')}`;
  }

  function caseTable(cases, withAction) {
    return `<div class="table-scroll"><table><thead><tr><th>申請編號</th><th>申請人／項目</th><th>送出日期</th><th>金額</th><th>狀態</th>${withAction ? '<th>操作</th>' : ''}</tr></thead><tbody>${cases.length ? cases.map(item => `<tr><td class="mono">${item.id}</td><td><strong>${item.title}</strong><small>${item.person} · ${t(`type.${item.type}`)}</small></td><td>${item.date}</td><td>${item.amount}</td><td>${badge(item.status)}</td>${withAction ? `<td><button class="table-action" data-review="${item.id}">${item.status === 'pending' ? '標記處理中' : '檢視'}</button></td>` : ''}</tr>`).join('') : `<tr><td colspan="${withAction ? 6 : 5}" class="empty-state">目前沒有符合條件的案件。</td></tr>`}</tbody></table></div>`;
  }
  function reviewPage() {
    const cases = state.financeCases.filter(item => (state.filter === 'all' || item.status === state.filter) && matchesSearch(`${item.id} ${item.title} ${item.person} ${t(`type.${item.type}`)}`));
    return `${pageTitle('APPLICATION REVIEW', '申請審核', '檢視示範案件並追蹤處理狀態。')}
      ${card(`<div class="card-heading"><div><h2>案件清單</h2><p>僅供互動展示，不會進行真正審核</p></div><span class="result-count">${cases.length} 筆案件</span></div><div class="toolbar"><label class="search-box">${icon('search')}<input id="content-search" type="search" placeholder="搜尋案件或申請人" value="${escapeHtml(state.search)}" aria-label="搜尋案件"></label><div class="filter-row compact">${['all', 'pending', 'in_progress'].map(code => `<button class="filter ${state.filter === code ? 'selected' : ''}" data-filter="${code}">${t(`status.${code}`)}</button>`).join('')}</div></div>${caseTable(cases, true)}`, 'table-card')}`;
  }
  function faqPage() {
    const visible = faqs.filter(item => matchesSearch(`${item.q} ${item.a} ${item.tag}`));
    return `${pageTitle('FAQ', '常見問題', '快速查找財務流程、規範與申請相關解答。')}
      ${card(`<div class="card-heading"><div><h2>常見問題</h2><p>快速找到解答</p></div></div><label class="search-box full">${icon('search')}<input id="content-search" type="search" placeholder="搜尋常見問題" value="${escapeHtml(state.search)}" aria-label="搜尋常見問題"></label><div class="faq-list">${visible.length ? visible.map((item, index) => `<div class="faq-item"><button type="button" data-faq-index="${faqs.indexOf(item)}" aria-expanded="${state.faqOpen === faqs.indexOf(item)}"><span><small>${item.tag}</small><strong>${item.q}</strong></span><span class="faq-plus">${state.faqOpen === faqs.indexOf(item) ? '−' : '+'}</span></button>${state.faqOpen === faqs.indexOf(item) ? `<p>${item.a}</p>` : ''}</div>`).join('') : '<p class="empty-state">沒有找到符合的問題。</p>'}</div>`, 'faq-card faq-only-card')}`;
  }
  function mountainArt(extra = '') { return `<div class="mountain-art ${extra}" aria-hidden="true"><span class="sun"></span><span class="mountain mountain-back one"></span><span class="mountain mountain-back two"></span><span class="mountain mountain-front one"></span><span class="mountain mountain-front two"></span><span class="mountain mountain-front three"></span></div>`; }
  function employeeBanner(title, lead, detail = '', withBook = false) { return `<section class="employee-banner"><div class="banner-copy"><h1>${title}</h1><p>${lead}</p>${detail ? `<small>${detail}</small>` : ''}</div>${mountainArt()}${withBook ? `<svg class="banner-book" viewBox="0 0 225 140" aria-hidden="true"><defs><linearGradient id="bookBlue" x1="0" x2="1"><stop stop-color="#2280ff"/><stop offset="1" stop-color="#5ba4ff"/></linearGradient></defs><path d="M12 27Q60 15 112 39Q164 15 213 27v100q-54-14-101 12Q65 113 12 127z" fill="url(#bookBlue)" opacity=".94"/><path d="M27 16Q71 5 111 28v94Q70 101 27 112z" fill="#f8fbff" stroke="#98c3ff" stroke-width="3"/><path d="M197 16Q153 5 113 28v94q41-21 84-10z" fill="#f8fbff" stroke="#98c3ff" stroke-width="3"/><path d="M111 28v94" stroke="#80b7fb" stroke-width="3"/><path d="M42 39q26-4 55 10M42 57q26-4 55 10M42 75q26-4 55 10M127 48q27-13 55-9M127 66q27-13 55-9M127 84q27-13 55-9" fill="none" stroke="#c0d8fb" stroke-width="6" stroke-linecap="round"/></svg>` : ''}</section>`; }
  function referenceServiceTiles() { return `<div class="reference-service-grid">${[['expense', '費用報銷', '差旅／交際／日常費用申請', 'green'], ['travel', '出差申請', '國內／國際出差申請', 'blue'], ['payment', '付款申請', '對外付款申請／查詢', 'orange']].map(([id, title, desc, color]) => `<button class="reference-service ${color}" type="button" data-service="${id}"><span class="service-pictogram">${icon(id === 'travel' ? 'plane' : id === 'payment' ? 'credit' : 'receipt')}</span><strong>${title}</strong><small>${desc}</small><span class="service-go" aria-hidden="true">${icon('chevron')}</span></button>`).join('')}</div>`; }
  function referencePolicyTiles(items = [['報銷規範', '費用項目／憑證要求／核銷標準', 'green', 'receipt'], ['出差政策', '國內外出差申請／補助標準', 'blue', 'plane'], ['付款規範', '廠商付款／內部付款流程', 'orange', 'credit'], ['知識庫／操作教學', '常見問題／系統操作教學', 'purple', 'book']]) { return `<div class="reference-policy-grid">${items.map(([title, subtitle, color, ico]) => `<button class="reference-policy-tile" type="button" data-policy="${title}"><span class="tile-icon ${color}">${icon(ico)}</span><span><strong>${title}</strong><small>${subtitle}</small></span>${icon('chevron')}</button>`).join('')}</div>`; }
  function employeeIdentityCard() {
    return `<section class="reference-card employee-identity-card">
      <div class="identity-heading"><div><h2>我的身分資訊</h2><span>依公司別／國家與部門顯示適用內容</span></div></div>
      <div class="identity-grid">
        <div class="identity-item"><span class="identity-icon">${icon('building')}</span><div><small>公司別</small><strong>${employeeContext.company}</strong></div></div>
        <div class="identity-item"><span class="identity-icon">${icon('globe')}</span><div><small>國家／地區</small><strong>${employeeContext.country}</strong></div></div>
        <div class="identity-item"><span class="identity-icon">${icon('users')}</span><div><small>所屬部門</small><strong>${employeeContext.department}</strong></div></div>
      </div>
    </section>`;
  }

  function companyFlowTiles() {
    const items = [
      ['Malaysia Travel Policy', 'policy'],
      ['Malaysia Expense Policy', 'policy'],
      ['Malaysia Corporate Card Policy', 'credit'],
      ['Malaysia Payment Guideline', 'credit'],
      ['Malaysia Finance Calendar', 'service']
    ];
    return `<div class="company-flow-grid">${items.map(([title, ico]) => `<button class="company-flow-tile" type="button" data-policy="${title}"><span class="company-flow-icon">${icon(ico)}</span><strong>${title}</strong></button>`).join('')}</div>`;
  }

  function financeScenarioCard() {
    const items = [
      ['發票遺失怎麼辦？', '如果發票遺失，仍可依規定申請，了解替代文件與申請方式。', 'ask', 'blue'],
      ['費用超額如何申請說明？', '超出標準金額時的申請流程與需檢附的說明文件。', 'info', 'red'],
      ['公司卡問題', '包含申請、額度調整、交易查詢及遺失處理等常見問題。', 'credit', 'blue'],
      ['不知道找誰', '依申請類型找到對應的聯絡窗口與支援管道。', 'users', 'purple']
    ];
    return card(`<div class="section-title"><div><h2>常見財務情境</h2><span>快速找到解決方案</span></div><button class="link-action" data-page="faq">查看更多 ${icon('chevron')}</button></div>
      <div class="finance-scenario-list">${items.map(([title, detail, ico, color]) => `<button type="button" data-page="faq"><span class="scenario-icon ${color}">${icon(ico)}</span><span><strong>${title}</strong><small>${detail}</small></span>${icon('chevron')}</button>`).join('')}</div>`, 'reference-card finance-scenarios');
  }

  function financeInfoCard() {
    const items = [
      ['9/30 付款截止提醒', '請於 9/30 前完成付款申請，以確保本月可順利請款。', '2026/09/25', 'bell'],
      ['10 月費用報銷截止日', '10 月所有費用報銷申請請於 10/25 前送出。', '2026/09/22', 'service'],
      ['Helios 系統維護通知', '預計於 9/20 02:00–05:00（Malaysia Time）進行系統維護。', '2026/09/18', 'settings']
    ];
    return card(`<div class="section-title"><div><h2>財務重要資訊</h2><span>掌握最新財務公告</span></div><button class="link-action" data-page="policy">查看更多 ${icon('chevron')}</button></div>
      <div class="finance-info-list">${items.map(([title, detail, date, ico]) => `<div class="finance-info-item"><span class="scenario-icon blue">${icon(ico)}</span><span><strong>${title}</strong><small>${detail}</small></span><time>${date}</time></div>`).join('')}</div>`, 'reference-card finance-important');
  }

  function employeeTravelStatus() {
    const travellers = [
      ['AC', 'Amy Chen', 'Malaysia · Kuala Lumpur', '9/25 - 9/29'],
      ['KL', 'Kevin Lin', 'Singapore', '9/24 - 9/28'],
      ['LW', 'Lily Wang', 'Japan · Tokyo', '9/23 - 9/27'],
      ['DW', 'Daniel Wu', 'Germany · Frankfurt', '9/22 - 9/30']
    ];
    const destinations = [
      ['新加坡', 4, 72],
      ['日本', 3, 57],
      ['馬來西亞', 3, 57],
      ['歐洲', 2, 38]
    ];
    return card(`<div class="section-title travel-title"><div><h2>人員出差狀況</h2><span>以下為您所屬公司（${employeeContext.company}）目前的員工出差概況</span></div><button class="link-action" type="button">查看完整名單 ${icon('chevron')}</button></div>
      <div class="travel-overview">
        <div class="travel-summary">
          <div class="travel-metrics">
            <div class="travel-metric"><span class="travel-metric-icon blue">${icon('plane')}</span><div><small>出差中人數</small><strong>12 <em>人</em></strong><span class="trend-up">↑ 20% <i>較上月同期</i></span></div></div>
            <div class="travel-metric"><span class="travel-metric-icon blue">${icon('pin')}</span><div><small>涵蓋地區</small><strong>4 <em>個</em></strong><span class="trend-neutral">-- <i>本次出差涵蓋地區數</i></span></div></div>
            <div class="travel-metric"><span class="travel-metric-icon red">${icon('info')}</span><div><small>待審批申請</small><strong>3 <em>件</em></strong><span class="trend-alert">↑ 50% <i>較上月同期</i></span></div></div>
          </div>
          <div class="travel-bars"><strong>出差地區分佈</strong>${destinations.map(([name, count, width]) => `<div class="travel-bar-row"><span>${name}</span><div class="travel-bar"><i style="width:${width}%"></i></div><b>${count} 人</b></div>`).join('')}</div>
        </div>
        <div class="traveller-panel"><div class="traveller-panel-head"><strong>目前出差員工 <small>（最近出發）</small></strong><button class="link-action" type="button">查看全部 ${icon('chevron')}</button></div>
          <div class="traveller-list">${travellers.map(([initials, name, destination, dates]) => `<div class="traveller-row"><span class="traveller-avatar">${initials}</span><strong>${name}</strong><span>${destination}</span><time>${dates}</time><b>出差中</b></div>`).join('')}</div>
        </div>
      </div>`, 'reference-card employee-travel-status');
  }

  function referenceEmployeeHome() {
    const applications = loadApplications();
    return `<div class="employee-home-v4">
      <div class="home-hero-grid">
        ${employeeBanner('早安，Evren', '歡迎使用 Finance SSC', '一站式財務服務平台')}
        ${employeeIdentityCard()}
      </div>
      <div class="home-reference-grid">
        <div class="home-primary">
          ${card(`<div class="section-title"><div><h2>常用服務</h2><span>根據您所屬公司別（${employeeContext.company}），提供可申請的財務服務</span></div><button class="link-action" data-page="service">查看所有服務 ${icon('chevron')}</button></div>${referenceServiceTiles()}`, 'reference-card home-services')}
          ${card(`<div class="section-title"><div><h2>常見流程文件</h2><span>您公司別的 ${employeeContext.country} 相關政策與規範</span></div><button class="link-action" data-page="policy">查看更多規範 ${icon('chevron')}</button></div>${companyFlowTiles()}`, 'reference-card home-company-flow')}
          ${card(`<div class="section-title"><div><h2>我的申請</h2><span>查看與追蹤您送出的各項申請進度</span></div><button class="link-action" data-page="applications">查看全部申請 ${icon('chevron')}</button></div><div class="home-status-grid">${[['in_progress', 3, 'blue', 'clock'], ['completed', 12, 'green', 'check'], ['needs_info', 1, 'red', 'info'], ['cancelled', 2, 'gray', 'close']].map(([label, count, color, ico]) => `<div class="home-status ${color}"><span>${icon(ico)}</span><div><strong>${t(`status.${label}`)}</strong><b>${count} <small>件</small></b></div></div>`).join('')}</div>${referenceApplicationTable(applications.slice(0, 4), true)}`, 'reference-card home-applications')}
          ${employeeTravelStatus()}
        </div>
        <div class="home-secondary">
          ${financeScenarioCard()}
          ${financeInfoCard()}
        </div>
      </div>
    </div>`;
  }
  function referenceApplicationTable(rows, home = false) {
    return `<div class="table-scroll"><table class="reference-table"><thead><tr><th>申請單號</th><th>${home ? '申請類型' : '申請項目'}</th>${home ? '' : '<th>申請目的</th>'}<th>申請日期</th>${home ? '<th>金額</th>' : ''}<th>狀態</th>${home ? '' : '<th>預計完成日</th>'}<th>操作</th></tr></thead><tbody>${rows.map(item => `<tr><td class="reference-id">${escapeHtml(item.id)}</td><td>${escapeHtml(t(`type.${home ? (item.type === 'airfare' || item.type === 'lodging' ? 'travel' : item.type === 'vendor_payment' ? 'payment' : 'expense') : item.type}`))}</td>${home ? '' : `<td>${escapeHtml(item.title)}</td>`}<td>${escapeHtml(item.date)}</td>${home ? `<td>${escapeHtml(item.amount)}</td>` : ''}<td>${badge(item.status)}</td>${home ? '' : `<td>${item.status === 'cancelled' ? '－' : '2026/10/08'}</td>`}<td><button class="row-link" type="button" data-application="${escapeHtml(item.id)}">${home ? '查看' : '查看詳情'} ${home ? '' : icon('chevron')}</button></td></tr>`).join('')}</tbody></table></div>`;
  }
  function referencePolicyPage() {
    const visible = policies.filter(item => matchesSearch(`${item.title} ${item.text}`));
    const tabContent = state.policyTab === 'sop' ? { title: '熱門作業指引', tiles: referencePolicyTiles([['報銷作業流程','送件與補件步驟','green','receipt'],['出差申請教學','申請與核准流程','blue','plane'],['付款審核流程','付款資料與附件','orange','credit'],['憑證上傳指引','系統操作步驟','purple','book']]) } : state.policyTab === 'training' ? { title: '熱門教育訓練', tiles: referencePolicyTiles([['報銷制度課程','費用規範入門','green','receipt'],['出差制度說明','差旅補助與申請','blue','plane'],['付款申請教學','廠商付款流程','orange','credit'],['Helios 操作教學','系統操作影片','purple','book']]) } : { title: '熱門主題', tiles: referencePolicyTiles() };
    return `${employeeBanner('懂規定', '申請前先了解各項財務政策、作業規範與操作教學，讓您的申請更順利、更符合規定。', '', true)}
      ${card(`<div class="policy-tabs"><button class="${state.policyTab === 'policy' ? 'selected' : ''}" type="button" data-policy-tab="policy">${icon('policy')}政策規範</button><button class="${state.policyTab === 'sop' ? 'selected' : ''}" type="button" data-policy-tab="sop">${icon('track')}作業指引 (SOP)</button><button class="${state.policyTab === 'training' ? 'selected' : ''}" type="button" data-policy-tab="training">${icon('book')}教育訓練</button></div><div class="policy-toolbar"><label class="reference-search">${icon('search')}<input id="content-search" type="search" value="${escapeHtml(state.search)}" placeholder="搜尋政策、SOP 或教學內容…（例如：報銷規範、出差申請、付款流程）"></label><label>主題類別<select><option>全部類別</option><option>費用與報銷</option><option>付款與採購</option></select></label><label>適用對象<select><option>全部對象</option><option>一般員工</option><option>財務人員</option></select></label><label>文件類型<select><option>全部類型</option><option>政策</option><option>SOP</option></select></label></div>`, 'reference-card policy-controls')}
      ${card(`<div class="section-title stacked"><div><h2>${tabContent.title}</h2><span>常用的財務政策與作業指引，協助您快速找到所需資訊。</span></div></div>${tabContent.tiles}`, 'reference-card policy-topics')}
      <div class="policy-bottom-grid">${card(`<div class="section-title stacked"><div><h2>最新發布</h2><span>掌握最新的政策公告、規範更新與重要資訊。</span></div><button class="link-action">查看全部 ${icon('chevron')}</button></div><div class="release-list">${(visible.length ? visible : policies).map((item, index) => `<button type="button" data-release="${index}"><span class="tile-icon ${['red','blue','green','purple'][index]}">${icon(index === 0 ? 'bell' : 'policy')}</span><span><strong>${['差旅費報銷標準調整公告','出差申請流程更新','發票憑證審核原則','Helios 系統操作教學上線'][index]}</strong><small>${item.text}</small></span><time>${item.updated.replaceAll(' / ', '/')}</time><span class="release-tag ${['red','blue','green','purple'][index]}">${['政策公告','流程更新','規範更新','教學資源'][index]}</span>${icon('chevron')}</button>`).join('')}</div>`, 'reference-card')}${card(`<div class="section-title stacked"><div><h2>常用文件</h2><span>精選常用的政策文件與作業指引，快速下載查閱。</span></div><button class="link-action">查看全部 ${icon('chevron')}</button></div><div class="document-list">${[['PDF','員工費用報銷管理辦法','PDF · 1.2 MB'],['PDF','國內出差旅費報支要點','PDF · 890 KB'],['DOC','付款申請作業指引','DOC · 560 KB'],['PDF','發票憑證審核標準','PDF · 1.1 MB'],['DOC','Helios 系統操作手冊（付款申請）','DOC · 2.3 MB']].map(([type,title,meta]) => `<button type="button" data-document="${title}"><span class="file-type ${type.toLowerCase()}">${type}</span><span><strong>${title}</strong><small>${meta}</small></span>${icon('upload')}</button>`).join('')}</div>`, 'reference-card')}</div>`;
  }
  function referenceTrackPage() {
    const applications = loadApplications();
    const filtered = applications.filter(item => (state.filter === 'all' || item.status === state.filter) && matchesSearch(`${item.id} ${item.title} ${t(`type.${item.type}`)}`));
    return `${employeeBanner('我的申請', '隨時查詢申請進度，掌握每一筆申請的處理狀態。', '您可以查看申請詳情、處理進度與相關通知，如需補件也會在此顯示。')}
      <div class="track-status-grid">${[['in_progress', 'blue', 'clock', '申請審核中'], ['completed', 'green', 'check', '已完成處理'], ['needs_info', 'orange', 'info', '待提供更多資料'], ['cancelled', 'red', 'close', '已取消的申請']].map(([label, color, ico, text]) => `<button class="track-status ${color}" type="button" data-filter="${label}"><span class="status-icon">${icon(ico)}</span><span><strong>${t(`status.${label}`)}</strong><b>${applications.filter(item => item.status === label).length} <small>件</small></b><small>${text}</small></span>${icon('chevron')}</button>`).join('')}</div>
      ${card(`<div class="track-filters"><span>申請狀態</span>${['all', 'in_progress', 'completed', 'needs_info', 'cancelled'].map(label => `<button type="button" data-filter="${label}" class="filter ${state.filter === label ? 'selected' : ''}">${t(`status.${label}`)}${label === 'all' ? ` (${applications.length})` : ''}</button>`).join('')}<label class="reference-search">${icon('search')}<input id="content-search" type="search" placeholder="搜尋申請編號、申請項目或目的..." value="${escapeHtml(state.search)}"></label><button class="outline-filter" type="button" data-advanced-filter>${icon('search')} 篩選條件</button></div>`, 'reference-card track-control')}
      ${card(`<div class="track-table-heading"><span>共 ${filtered.length} 筆申請記錄</span><label>排序： <select><option>申請日期（最新 → 最舊）</option><option>申請日期（最舊 → 最新）</option></select></label></div>${referenceApplicationTable(filtered.slice(state.listPage * 10, state.listPage * 10 + 10))}<div class="table-pagination"><span>顯示 ${filtered.length ? state.listPage * 10 + 1 : 0} - ${Math.min(filtered.length, state.listPage * 10 + 10)} / 共 ${filtered.length} 筆</span><div><button type="button" data-list-page="${Math.max(0, state.listPage - 1)}" aria-label="上一頁">‹</button>${Array.from({length: Math.max(1, Math.ceil(filtered.length / 10))}, (_, index) => `<button type="button" data-list-page="${index}" class="${state.listPage === index ? 'selected' : ''}">${index + 1}</button>`).join('')}<button type="button" data-list-page="${Math.min(Math.max(0, Math.ceil(filtered.length / 10) - 1), state.listPage + 1)}" aria-label="下一頁">›</button></div></div>`, 'reference-card track-table')}`;
  }
  function referenceServicePage() {
    const selected = services.find(item => item.id === state.selectedService);
    return `${employeeBanner('申請服務', '從常用服務選擇您的需求，快速開始財務申請。', '報銷、出差與付款申請皆為靜態示範流程。')}
      ${card(`<div class="section-title stacked"><div><h2>常用服務</h2><span>申請各項財務服務，提升工作效率</span></div></div>${referenceServiceTiles()}`, 'reference-card service-reference-section')}
      ${card(`<div class="service-guide"><span class="guide-icon">${icon('info')}</span><div><h2>員工先從首頁找到申請入口</h2><p>點選「報銷申請／出差申請／付款申請」後，在本展示中建立一筆示範申請。實際環境會導向 Helios 完成送件。</p></div></div>`, 'reference-card service-guide-card')}
      ${selected ? `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><div><span class="eyebrow">DEMO APPLICATION</span><h2 id="modal-title">${selected.title}</h2></div><button class="icon-button" data-close-modal aria-label="關閉">${icon('close')}</button></div><p>${selected.description}</p><form id="application-form" novalidate><input type="hidden" name="service" value="${selected.id}"><label>申請主旨<input name="title" maxlength="60" required placeholder="請輸入示範申請主旨"></label><label>金額（新臺幣）<input name="amount" type="number" min="1" max="9999999" required placeholder="0"></label><label>說明<textarea name="description" maxlength="300" rows="3" placeholder="簡述申請內容（選填）"></textarea></label><div class="modal-note">${icon('info')}資料僅儲存在本機瀏覽器，不會送出至任何系統。</div><div class="modal-actions"><button type="button" class="button button-outline" data-close-modal>取消</button><button type="submit" class="button button-primary">建立示範申請 ${icon('arrow')}</button></div></form></section></div>` : ''}`;
  }
  const financeReports = {
    revenue: { title: '本月營收', en: 'Revenue Overview', subtitle: '掌握本月營收表現，分析成長趨勢、BU 與產品貢獻，並與預算及去年同期比較。', metrics: [['本月營收','Total Revenue','USD 1.25M','↑ 5%','blue'],['上月營收','Last Month','USD 1.19M','較上月 (Aug)','purple'],['去年同期','Same Period Last Year','USD 1.05M','↑ 19%','teal'],['年度目標達成率','YTD Budget Achievement','68%','YTD 營收 USD 9.8M','pink']], chart: '營收趨勢', chartEn: 'Revenue Trend', pie: '營收構成', pieEn: 'Revenue Breakdown', table: 'BU 營收排名', tableEn: 'Revenue by BU', values: [130,125,155,175,188,182,200,230,228,240,255,285], segments: [['BU-A',28],['BU-B',24],['BU-C',18],['BU-D',16],['BU-E',10],['其他',4]], insight: ['本月營收較上月成長 5%，主要來自 BU-A 與 BU-C 的營收增加。','累計營收達成年度預算 68%，進度符合預期。','Product A 持續保持最高營收貢獻。'] },
    cash: { title: '可用現金', en: 'Cash / Liquidity Overview', subtitle: '掌握整體現金部位、流動性狀況、銀行帳戶餘額、資金調度與現金預測。', metrics: [['可用現金總額','Available Cash Balance','USD 320M','↑ 12%','green'],['銀行帳戶餘額','Bank Account Balance','USD 305M','↑ 10%','blue'],['近期資金調度','Net Cash Flow (30D)','USD 45M','↑ 25%','purple'],['流動性覆蓋率','Liquidity Coverage Ratio','2.8x','高於內部門檻 1.5x','orange']], chart: '現金部位趨勢', chartEn: 'Cash Position Trend', pie: '現金結構', pieEn: 'Cash Composition', table: '銀行帳戶餘額', tableEn: 'Bank Account Balance', values: [315,312,345,336,382,375,370,385,410,412,416,445], segments: [['營運帳戶',55],['定存／短投',20],['受限現金',15],['其他',10]], insight: ['可用現金較上月增加 12%，主要來自客戶回款與營運資金改善。','流動性覆蓋率 2.8x，高於內部門檻 1.5x。','未來 4 週預期淨現金流為正。'] },
    pnl: { title: '本月損益', en: 'P&L Overview', subtitle: '掌握本月損益表現，分析收入、成本、費用與淨利，快速了解營運狀況。', metrics: [['營業收入','Revenue','USD 45M','↑ 8%','blue'],['營業成本','Cost of Revenue','USD 28M','↑ 5%','purple'],['營業毛利','Gross Profit','USD 17M','↑ 14%','teal'],['營業費用','Operating Expense','USD 12M','↑ 6%','orange'],['本月淨利','Net Profit','USD 5M','↑ 27%','purple']], chart: '損益趨勢', chartEn: 'P&L Trend', pie: '損益結構', pieEn: 'P&L Composition', table: '損益表（本月）', tableEn: 'P&L Statement (This Month)', values: [46,48,55,50,59,62,65,68,75,76,78,82], segments: [['營業成本',62],['營業費用',27],['營業毛利',9],['其他',2]], insight: ['本月淨利較上月增加 27%，主要來自營業收入成長與毛利率提升。','BU-A 為本月獲利最高單位。','營業費用增加 6%，仍在預算範圍內。'] },
    budget: { title: '年度預算', en: 'Budget Execution', subtitle: '掌握年度預算達成率，分析各 BU／科目執行狀況，追蹤差異原因並預測全年結算結果。', metrics: [['年度預算總額','Total Budget','USD 480M','較去年 +8%','pink'],['已執行金額','YTD Actual','USD 320M','達成率 67%','blue'],['預算剩餘','Remaining Budget','USD 160M','33%','blue'],['預測全年執行','Full Year Forecast','USD 470M','預測達成率 98%','green'],['預算差異(絕對值)','Variance','USD -10M','-2% 低於預算','red']], chart: '月度預算執行趨勢', chartEn: 'Budget vs Actual Trend', pie: '預算達成率（依 BU）', pieEn: 'Budget Achievement by BU', table: '科目預算執行', tableEn: 'Budget Execution by Account', values: [45,47,51,53,52,55,57,63,66,68,70,72], segments: [['BU-A',26],['BU-B',23],['BU-C',20],['BU-D',16],['BU-E',15]], insight: ['目前預測全年達成率 98%，整體可望接近預算目標。','BU-C、BU-D 與 BU-E 達成率偏低。','營業費用成長率低於預期。'] },
    bu: { title: 'BU 表現分析', en: 'BU Performance Analysis', subtitle: '深入分析各業務單位的營收、獲利、預算達成與成長表現，協助掌握 BU 營運狀況。', metrics: [['BU 總營收','Total BU Revenue','USD 1.25B','↑ 12%','blue'],['平均獲利率','Average Profit Margin','18%','+3%','purple'],['表現最佳 BU','Top Performing BU','BU-A','USD 480M 營收','orange'],['表現未達預算 BU 數','Underperforming BU Count','2 項','占全部 BU 33%','red'],['預算達成率','Budget Attainment','92%','↑ +4%','green']], chart: 'BU 營收與獲利表現', chartEn: 'BU Revenue & Profit Performance', pie: 'BU 營收貢獻佔比', pieEn: 'Revenue Contribution by BU', table: 'BU 詳細表現', tableEn: 'BU Performance Details', values: [480,280,200,120,100,70], segments: [['BU-A',38],['BU-B',22],['BU-C',16],['BU-D',10],['BU-E',8],['其他',6]], insight: ['BU-A 持續領先，營收 USD 480M，佔總營收 38%。','BU-D 獲利率承壓。','2 個 BU 低於預算，需擬定改善計畫。'] },
    alerts: { title: '重大異常／預警', en: 'Major Exceptions & Alerts', subtitle: '整合關鍵業務、財務與營運異常，協助快速識別風險並追蹤處理進度。', metrics: [['開啟異常','Open Alerts','32 項','↓ 20%','red'],['高風險','High Risk','8 項','↓ 11%','red'],['今日到期','Due Today','6 項','↑ 50%','blue'],['逾期未處理','Overdue','12 項','↓ 25%','orange'],['已升級','Escalated','4 項','↑ 33%','purple']], chart: '異常數量趨勢', chartEn: 'Alert Trend', pie: '異常類型分佈', pieEn: 'Alerts by Category', table: '重大異常清單', tableEn: 'Alert List', values: [14,16,15,18,19,21,23,27,24,28,30,32], segments: [['營收異常',25],['成本異常',22],['現金流',19],['預算執行',12],['營運異常',12],['其他',10]], insight: ['營收與毛利異常佔比最高，需關注市場需求及定價策略。','逾期未處理件數較上月下降 25%。','合規風險有所上升，需加強審核流程。'] }
  };
  function miniLine(color = '#1b76ff') { return `<svg class="mini-line" viewBox="0 0 120 52" aria-hidden="true"><polyline points="0,42 16,29 30,38 46,23 63,27 78,14 95,20 120,2" fill="none" stroke="${color}" stroke-width="2"/><path d="M0 42 16 29 30 38 46 23 63 27 78 14 95 20 120 2v50H0z" fill="${color}" opacity=".08"/></svg>`; }
  function financeMetrics(items) { return `<div class="finance-metrics ${items.length === 5 ? 'five' : ''}">${items.map(([label,en,value,change,color]) => `<section class="finance-metric"><div class="finance-metric-head"><span class="finance-metric-icon ${color}">${icon(color === 'red' ? 'info' : color === 'green' ? 'check' : 'report')}</span><span><strong>${label}</strong><small>${en}</small></span></div><b class="${color === 'red' ? 'negative' : ''}">${value}</b><div class="finance-metric-foot"><strong class="${color === 'red' ? 'negative' : 'positive'}">${change}</strong>${miniLine(color === 'red' ? '#ff5964' : color === 'purple' ? '#9541ff' : color === 'teal' || color === 'green' ? '#00c3a2' : '#1b76ff')}</div></section>`).join('')}</div>`; }
  function financeChart(values) {
    const max = Math.max(...values) * 1.12;
    return `<div class="finance-chart"><div class="chart-grid"><span>300</span><span>200</span><span>100</span><span>0</span></div><div class="chart-bars">${values.map((value,index) => `<div class="chart-column"><span class="chart-bar" style="height:${Math.max(8, value / max * 100)}%"></span><small>${index + 1}月</small></div>`).join('')}</div></div>`;
  }
  function financeDonut(segments, center) {
    const colors = ['#2178ff','#5da8ff','#19bfda','#69d9a6','#8b63f7','#ff9d4b','#ff6b83'];
    let offset = 0;
    const stops = segments.map(([,percent], index) => { const start = offset; offset += percent; return `${colors[index % colors.length]} ${start}% ${offset}%`; }).join(',');
    return `<div class="donut-layout"><div class="donut" style="background:conic-gradient(${stops})"><div><strong>${center}</strong><small>示範數據</small></div></div><div class="donut-legend">${segments.map(([label,percent], index) => `<div><i style="background:${colors[index % colors.length]}"></i><span>${label}</span><strong>${percent}%</strong></div>`).join('')}</div></div>`;
  }
  function financeTable(key) {
    const rows = key === 'alerts' ? [['營收異常','BU-A','9月營收較預期低 22%',t('severity.critical')],['成本異常','BU-B','行銷費用超出預算 35%',t('severity.high')],['現金流','BU-C','應收帳款逾期金額上升',t('severity.high')],['預算執行','BU-D','Q3 預算執行率偏低',t('severity.medium')]] : [['BU-A','480M','38%','↑ 18%'],['BU-B','280M','22%','↑ 12%'],['BU-C','200M','16%','↑ 8%'],['BU-D','120M','10%','↓ 5%'],['BU-E','100M','8%','↑ 6%'],['其他','70M','6%','↑ 10%']];
    return `<div class="table-scroll"><table class="finance-table"><thead><tr><th>#</th><th>${key === 'alerts' ? '類型' : 'BU'}</th><th>${key === 'alerts' ? '單位／BU' : '本月金額 (USD)'}</th><th>${key === 'alerts' ? '事件' : '佔比'}</th><th>${key === 'alerts' ? '等級' : '較上月'}</th></tr></thead><tbody>${rows.map((row,index) => `<tr><td>${index + 1}</td>${row.map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function financeReportPage(key) {
    const report = financeReports[key];
    return `<div class="finance-report"><div class="finance-report-top"><button type="button" class="back-link" data-page="reports">← 返回總覽</button><span>最後更新：2026/09/30 09:30 (UTC+8)</span></div><div class="finance-report-heading"><div><h1>${report.title} <span>${report.en}</span></h1><p>${report.subtitle}</p></div><div class="finance-controls"><label>期間<select><option>本月 (2026/09)</option><option>上月 (2026/08)</option></select></label><label>幣別<select><option>USD</option><option>TWD (NT$)</option></select></label><label>範圍<select><option>全部 BU</option><option>BU-A</option><option>BU-B</option></select></label><button type="button" class="button button-primary" data-finance-filter>⚲ 進階篩選</button></div></div>
      ${financeMetrics(report.metrics)}<div class="finance-report-grid"><section class="finance-panel chart-panel"><h2>${report.chart} <small>${report.chartEn}</small></h2><div class="chart-legend"><span>● 本年</span><span>● 去年</span><span>● 預算</span></div>${financeChart(report.values)}</section><section class="finance-panel donut-panel"><h2>${report.pie} <small>${report.pieEn}</small></h2>${financeDonut(report.segments, report.metrics[0][2])}</section></div>
      <div class="finance-report-grid lower"><section class="finance-panel"><h2>${report.table} <small>${report.tableEn}</small></h2>${financeTable(key)}</section><section class="finance-panel insights"><h2>關鍵洞察 <small>Key Insights</small></h2>${report.insight.map((text,index) => `<div class="insight"><span class="insight-icon ${['green','blue','purple'][index]}">${icon(index === 0 ? 'arrow' : index === 1 ? 'report' : 'info')}</span><p>${text}</p></div>`).join('')}</section></div></div>`;
  }
  function financeOverviewPage() {
    return `<div class="finance-report"><div class="finance-report-top"><span>財務工作空間</span><span>最後更新：2026/09/30 09:30 (UTC+8)</span></div><div class="finance-report-heading"><div><h1>財務總覽 <span>Finance Overview</span></h1><p>集中掌握營收、現金、損益、預算與 BU 表現。</p></div></div>${financeMetrics([financeReports.revenue.metrics[0],financeReports.cash.metrics[0],financeReports.pnl.metrics[4],financeReports.alerts.metrics[0]])}<div class="finance-overview-grid">${[['revenue','本月營收','檢視營收趨勢與 BU 貢獻'],['cash','可用現金','掌握現金部位與流動性'],['pnl','本月損益','檢視營運損益表現'],['budget','年度預算','追蹤預算執行與差異'],['bu','BU 表現分析','分析業務單位表現'],['alerts','重大異常','追蹤重要風險與預警']].map(([page,title,subtitle]) => `<button type="button" data-page="${page}" class="finance-overview-link"><span class="list-icon">${icon(({revenue:'users',cash:'clock',pnl:'report',budget:'track',bu:'home',alerts:'info'})[page])}</span><span><strong>${title}</strong><small>${subtitle}</small></span>${icon('chevron')}</button>`).join('')}</div></div>`;
  }
  function financeLandingPage() { return financeOverviewPage(); }
  function financeDataCenterPage() { return `${pageTitle('DATA CENTER', '資料中心', '集中檢視財務政策、作業指引與示範資料。')}${card(`<div class="section-title"><h2>政策與指引</h2></div>${referencePolicyTiles()}`, 'reference-card')}`; }
  const pages = { employee: { home: referenceEmployeeHome, policy: referencePolicyPage, service: referenceServicePage, applications: referenceTrackPage, faq: faqPage }, finance: { home: financeLandingPage, reports: financeOverviewPage, revenue: () => financeReportPage('revenue'), cash: () => financeReportPage('cash'), pnl: () => financeReportPage('pnl'), budget: () => financeReportPage('budget'), bu: () => financeReportPage('bu'), alerts: () => financeReportPage('alerts'), review: reviewPage, policy: financeDataCenterPage } };
  function render(preserveFocus = false) {
    const focused = preserveFocus && document.activeElement?.id === 'content-search';
    const position = focused ? document.activeElement.selectionStart : 0;
    app.innerHTML = translateMarkup(shell(state.settingsOpen ? '' : pages[state.role][state.page]()));
    if (focused) { const input = document.getElementById('content-search'); if (input) { input.focus(); input.setSelectionRange(position, position); } }
  }
  function showToast(message) {
    state.toast = message;
    render();
    window.setTimeout(() => { if (state.toast === message) { state.toast = ''; render(); } }, 3500);
  }
  function replyFor(question) {
    if (/報銷|报销|費用|费用|reimburs|expense/i.test(question)) return '請前往「申請服務」選擇費用報銷；辦理前可先查看「財務政策」中的報銷作業指引。';
    if (/進度|进度|追蹤|追踪|狀態|状态|track|status|progress/i.test(question)) return '請前往「我的申請」查詢各筆示範申請的處理狀態。';
    if (/付款|payment|pay /i.test(question)) return '您可以在「申請服務」選擇付款申請，並先查閱付款申請作業指引。';
    return '我可以協助您找到財務政策、申請服務或申請進度。請試著輸入相關關鍵字。';
  }
  app.addEventListener('click', event => {
    const button = event.target.closest('button, [data-close-menu]');
    if (!button) return;
    if (button.dataset.page) { setRoute(state.role, button.dataset.page); return; }
    if (button.dataset.menu !== undefined) { state.mobileOpen = !state.mobileOpen; render(); return; }
    if (button.dataset.closeMenu !== undefined) { state.mobileOpen = false; render(); return; }
    if (button.dataset.notification !== undefined) { state.notificationOpen = !state.notificationOpen; render(); return; }
    if (button.dataset.service) { state.selectedService = button.dataset.service; if (state.page !== 'service') setRoute(state.role, 'service'); state.selectedService = button.dataset.service; render(); return; }
    if (button.dataset.closeModal !== undefined) { state.selectedService = null; render(); return; }
    if (button.dataset.filter) { state.filter = button.dataset.filter; state.listPage = 0; render(); return; }
    if (button.dataset.listPage !== undefined) { state.listPage = Number(button.dataset.listPage) || 0; render(); return; }
    if (button.dataset.faqIndex) { const index = Number(button.dataset.faqIndex); state.faqOpen = state.faqOpen === index ? -1 : index; render(); return; }
    if (button.dataset.faq) { setRoute(state.role, 'faq'); state.search = button.dataset.faq.split(' ')[0]; render(); return; }
    if (button.dataset.review) { const item = state.financeCases.find(entry => entry.id === button.dataset.review); if (item?.status === 'pending') { item.status = 'in_progress'; showToast('案件已標記為處理中（僅供展示）'); } else showToast('此案件正在處理中（僅供展示）'); return; }
    if (button.dataset.suggestion) { const question = button.dataset.suggestion; state.assistant.push({ user: question, reply: replyFor(question) }); render(); document.getElementById('chat-messages')?.scrollTo(0, 9999); }
    if (button.dataset.question) { setRoute(state.role, 'faq'); state.assistant.push({ user: button.dataset.question, reply: replyFor(button.dataset.question) }); render(); return; }
    if (button.dataset.policy) { setRoute(state.role, 'policy'); return; }
    if (button.dataset.document) { showToast('此為示範文件，尚未提供下載'); return; }
    if (button.dataset.release !== undefined) { showToast('此為示範公告'); return; }
    if (button.dataset.application) { showToast(`${button.dataset.application} 為示範申請`); return; }
    if (button.dataset.settings !== undefined) { state.settingsOpen = true; state.mobileOpen = false; render(); return; }
    if (button.dataset.advancedFilter !== undefined) { showToast('可使用狀態與搜尋欄篩選示範申請'); return; }
    if (button.dataset.financeFilter !== undefined) { showToast('可使用期間、幣別與範圍查看示範資料'); return; }
    if (button.dataset.policyTab) { state.policyTab = button.dataset.policyTab; render(); return; }
  });
  app.addEventListener('change', event => {
    if (event.target.id === 'role-switch') setRoute(event.target.value, 'home');
    if (event.target.name === 'locale') { setLocale(event.target.value); render(); }
  });
  app.addEventListener('input', event => { if (event.target.id === 'content-search') { state.search = event.target.value.trim(); state.listPage = 0; render(true); } });
  app.addEventListener('keydown', event => {
    if (event.target.id !== 'global-search' || event.key !== 'Enter') return;
    event.preventDefault();
    const query = event.target.value.trim();
    if (!query) return;
    const page = state.role === 'finance' ? 'reports' : /政策|規範|规范|policy|SOP/i.test(query) ? 'policy' : /問題|问题|怎麼|怎么|如何|FAQ|question|help/i.test(query) ? 'faq' : 'service';
    setRoute(state.role, page);
    state.search = query;
    render();
  });
  app.addEventListener('submit', event => {
    if (event.target.id === 'assistant-form') {
      event.preventDefault(); const question = String(new FormData(event.target).get('question') || '').trim();
      if (!question) { showToast(t('validation.question')); return; }
      state.assistant.push({ user: question, reply: replyFor(question) }); render(); document.getElementById('chat-messages')?.scrollTo(0, 9999);
    }
    if (event.target.id === 'application-form') {
      event.preventDefault(); const data = new FormData(event.target); const service = services.find(item => item.id === data.get('service'));
      const title = String(data.get('title') || '').trim(); const amount = Number(data.get('amount'));
      if (!service) { showToast(t('validation.service')); return; }
      if (!title) { showToast(t('validation.title')); return; }
      if (!Number.isFinite(amount) || amount < 1 || amount > 9999999) { showToast(t('validation.amount')); return; }
      const saved = (() => { try { const value = JSON.parse(localStorage.getItem(APPLICATIONS_KEY)); return Array.isArray(value) ? value : []; } catch { return []; } })();
      const today = new Date();
      saved.unshift({ id: `FSSC-DEMO-${String(Date.now()).slice(-8)}`, type: service.id, title: title.slice(0, 60), date: `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`, amount: `NT$ ${amount.toLocaleString('zh-TW')}`, status: 'in_progress' });
      try { localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(saved)); } catch { /* storage unavailable */ }
      setRoute('employee', 'applications'); showToast('已建立示範申請');
    }
  });
  window.addEventListener('popstate', () => { routeFromUrl(); render(); });
  window.addEventListener('keydown', event => { if (event.key === 'Escape' && state.selectedService) { state.selectedService = null; render(); } });
  routeFromUrl(); render();
})();

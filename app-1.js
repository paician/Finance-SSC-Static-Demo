  'use strict';

  const ROLE_KEY = 'fin-ssc-demo-role';
  const APPLICATIONS_KEY = 'fin-ssc-demo-applications';
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
    book: '<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1zM12 6v14"/>'
  };
  const icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const nav = {
    employee: [
      ['home', '首頁', 'Home', '尋找服務'],
      ['service', '申請服務', 'Application Service', '開始申請'],
      ['applications', '我的申請', 'My Applications', '追蹤進度'],
      ['policy', '財務政策', 'Finance Policy', '理解規範'],
      ['faq', 'FAQ / AI 助手', 'FAQ / AI Assistant', '取得解答']
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
  const state = { role: 'employee', page: 'home', mobileOpen: false, search: '', filter: '全部', listPage: 0, policyTab: 'policy', selectedService: null, faqOpen: 0, assistant: [], notificationOpen: false, toast: '', financeCases: financeCases.map(item => ({ ...item })) };

  function loadApplications() {
    try {
      const saved = JSON.parse(localStorage.getItem(APPLICATIONS_KEY));
      return Array.isArray(saved) ? [...saved, ...initialApplications] : initialApplications;
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
    const role = url.searchParams.get('role');
    state.role = role === 'employee' || role === 'finance' ? role : (getStoredRole() === 'finance' ? 'finance' : 'employee');
    state.page = nav[state.role].some(item => item[0] === url.searchParams.get('page')) ? url.searchParams.get('page') : 'home';
    setStoredRole(state.role);
  }
  function setRoute(role, page, push = true) {
    state.role = role;
    state.page = nav[role].some(item => item[0] === page) ? page : 'home';
    state.mobileOpen = false;
    state.search = '';
    state.filter = '全部';
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
  const badge = status => `<span class="status status-${status === '已完成' ? 'done' : status === '需補件' ? 'attention' : status === '已取消' ? 'cancelled' : status === '待審核' ? 'pending' : 'progress'}">${escapeHtml(status)}</span>`;
  const pageTitle = (eyebrow, title, subtitle, extra = '') => `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${subtitle}</p></div>${extra}</div>`;
  const action = (label, page, variant = 'primary') => `<button class="button button-${variant}" type="button" data-page="${page}">${label}${icon('arrow')}</button>`;

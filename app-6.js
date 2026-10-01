'use strict';
  function render(preserveFocus = false) {
    const focused = preserveFocus && document.activeElement?.id === 'content-search';
    const position = focused ? document.activeElement.selectionStart : 0;
    app.innerHTML = shell(pages[state.role][state.page]());
    if (focused) { const input = document.getElementById('content-search'); if (input) { input.focus(); input.setSelectionRange(position, position); } }
  }
  function showToast(message) {
    state.toast = message;
    render();
    window.setTimeout(() => { if (state.toast === message) { state.toast = ''; render(); } }, 3500);
  }
  function replyFor(question) {
    if (/報銷|費用/.test(question)) return '請前往「申請服務」選擇費用報銷；辦理前可先查看「財務政策」中的報銷作業指引。';
    if (/進度|追蹤|狀態/.test(question)) return '請前往「我的申請」查詢各筆示範申請的處理狀態。';
    if (/付款/.test(question)) return '您可以在「申請服務」選擇付款申請，並先查閱付款申請作業指引。';
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
    if (button.dataset.review) { const item = state.financeCases.find(entry => entry.id === button.dataset.review); if (item?.status === '待審核') { item.status = '處理中'; showToast('案件已標記為處理中（僅供展示）'); } else showToast('此案件正在處理中（僅供展示）'); return; }
    if (button.dataset.suggestion) { const question = button.dataset.suggestion; state.assistant.push({ user: question, reply: replyFor(question) }); render(); document.getElementById('chat-messages')?.scrollTo(0, 9999); }
    if (button.dataset.question) { setRoute(state.role, 'faq'); state.assistant.push({ user: button.dataset.question, reply: replyFor(button.dataset.question) }); render(); return; }
    if (button.dataset.policy) { setRoute(state.role, 'policy'); return; }
    if (button.dataset.document) { showToast('此為示範文件，尚未提供下載'); return; }
    if (button.dataset.release !== undefined) { showToast('此為示範公告'); return; }
    if (button.dataset.application) { showToast(`${button.dataset.application} 為示範申請`); return; }
    if (button.dataset.settings !== undefined) { showToast('目前使用靜態示範身分'); return; }
    if (button.dataset.advancedFilter !== undefined) { showToast('可使用狀態與搜尋欄篩選示範申請'); return; }
    if (button.dataset.financeFilter !== undefined) { showToast('可使用期間、幣別與範圍查看示範資料'); return; }
    if (button.dataset.policyTab) { state.policyTab = button.dataset.policyTab; render(); return; }
  });
  app.addEventListener('change', event => { if (event.target.id === 'role-switch') setRoute(event.target.value, 'home'); });
  app.addEventListener('input', event => { if (event.target.id === 'content-search') { state.search = event.target.value.trim(); state.listPage = 0; render(true); } });
  app.addEventListener('keydown', event => {
    if (event.target.id !== 'global-search' || event.key !== 'Enter') return;
    event.preventDefault();
    const query = event.target.value.trim();
    if (!query) return;
    const page = state.role === 'finance' ? 'reports' : /政策|規範|SOP/.test(query) ? 'policy' : /問題|怎麼|如何|FAQ/.test(query) ? 'faq' : 'service';
    setRoute(state.role, page);
    state.search = query;
    render();
  });
  app.addEventListener('submit', event => {
    if (event.target.id === 'assistant-form') {
      event.preventDefault(); const question = new FormData(event.target).get('question').trim(); if (!question) return;
      state.assistant.push({ user: question, reply: replyFor(question) }); render(); document.getElementById('chat-messages')?.scrollTo(0, 9999);
    }
    if (event.target.id === 'application-form') {
      event.preventDefault(); const data = new FormData(event.target); const service = services.find(item => item.id === data.get('service'));
      const title = String(data.get('title') || '').trim(); const amount = Number(data.get('amount'));
      if (!service || !title || !Number.isFinite(amount) || amount < 1 || amount > 9999999) return;
      const saved = (() => { try { const value = JSON.parse(localStorage.getItem(APPLICATIONS_KEY)); return Array.isArray(value) ? value : []; } catch { return []; } })();
      const today = new Date();
      saved.unshift({ id: `FSSC-DEMO-${String(Date.now()).slice(-8)}`, type: service.title, title: title.slice(0, 60), date: `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`, amount: `NT$ ${amount.toLocaleString('zh-TW')}`, status: '進行中' });
      try { localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(saved)); } catch { /* storage unavailable */ }
      setRoute('employee', 'applications'); showToast('已建立示範申請');
    }
  });
  window.addEventListener('popstate', () => { routeFromUrl(); render(); });
  window.addEventListener('keydown', event => { if (event.key === 'Escape' && state.selectedService) { state.selectedService = null; render(); } });
  routeFromUrl(); render();

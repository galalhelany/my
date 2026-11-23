// One Chatwoot SDK instance per document. The homepages load it asynchronously as before.
(() => {
  const root = document.documentElement;
  const mobile = matchMedia('(max-width: 1020px)');
  const arabic = root.lang === 'ar';
  const baseUrl = 'https://app.chatwoot.com';
  const websiteToken = 'swzo4hhjh2fjAiAVYvyiYSEo';
  const text = arabic ? {
    loading: 'جارٍ فتح المحادثة…',
    waiting: 'يستغرق تحميل المحادثة وقتًا أطول من المتوقع.',
    unavailable: 'المحادثة المباشرة غير متاحة حاليًا.',
    email: 'راسلني عبر البريد الإلكتروني',
    close: 'إغلاق',
    chat: 'محادثة مباشرة'
  } : {
    loading: 'Opening live chat…',
    waiting: 'Live chat is taking longer than expected.',
    unavailable: 'Live chat is unavailable.',
    email: 'Send an email instead',
    close: 'Close',
    chat: 'Live chat'
  };

  let started = false;
  let ready = false;
  let failed = false;
  let pending;
  let opener;
  let waitTimer;
  let notice;
  let noticeTrigger;
  let message;
  let email;

  function clearRequest() {
    clearTimeout(waitTimer);
    pending = undefined;
    if (notice) notice.hidden = true;
  }

  function restoreFocus(trigger) {
    requestAnimationFrame(() => {
      if (!mobile.matches || window.$chatwoot?.isOpen) return;
      if (trigger?.getClientRects().length && !trigger.closest('[inert]')) {
        trigger.focus({ preventScroll: true });
      } else {
        document.querySelector('.mp-brand')?.focus({ preventScroll: true });
      }
    });
  }

  function showNotice(trigger, copy) {
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'mp-chat-notice';
      message = document.createElement('p');
      message.setAttribute('role', 'status');
      email = document.createElement('a');
      email.textContent = text.email;
      email.addEventListener('click', clearRequest);
      const close = document.createElement('button');
      close.type = 'button';
      close.setAttribute('aria-label', text.close);
      close.textContent = '×';
      close.addEventListener('click', () => {
        clearRequest();
        restoreFocus(noticeTrigger);
      });
      notice.append(message, email, close);
      document.body.append(notice);
    }
    noticeTrigger = trigger;
    email.href = trigger.href;
    notice.hidden = false;
    message.textContent = copy;
    if (copy === text.unavailable && document.activeElement === trigger) email.focus({ preventScroll: true });
  }

  function fail() {
    failed = true;
    const trigger = pending;
    clearRequest();
    if (trigger && mobile.matches) showNotice(trigger, text.unavailable);
  }

  function loadChat() {
    if (started || window.$chatwoot) return;
    started = true;
    window.chatwootSettings = {
      hideMessageBubble: false,
      showUnreadMessagesDialog: false,
      position: arabic ? 'left' : 'right',
      locale: arabic ? 'ar' : 'en',
      useBrowserLanguage: false,
      type: 'standard',
      darkMode: 'auto'
    };

    const sdk = document.createElement('script');
    sdk.src = baseUrl + '/packs/js/sdk.js';
    sdk.async = true;
    sdk.addEventListener('error', fail, { once: true });
    sdk.addEventListener('load', () => {
      try {
        window.chatwootSDK.run({ baseUrl, websiteToken });
      } catch {
        fail();
      }
    }, { once: true });
    document.head.append(sdk);
  }

  function openChat(trigger) {
    if (window.$chatwoot.isOpen) return;
    opener = trigger;
    try {
      window.$chatwoot.toggle('open');
      focusChat();
    } catch {
      opener = undefined;
      showNotice(trigger, text.unavailable);
    }
  }

  function focusChat() {
    const iframe = document.getElementById('chatwoot_live_chat_widget');
    if (!opener || !window.$chatwoot.isOpen || !iframe || document.activeElement === iframe) return;
    iframe.focus({ preventScroll: true });
    if (document.activeElement !== iframe) iframe.contentWindow?.focus();
  }

  function onReady() {
    if (ready || typeof window.$chatwoot?.toggle !== 'function') return;
    ready = true;
    failed = false;
    root.setAttribute('data-mobile-chat', '');
    // Keep the original launcher behavior for the desktop homepage.
    if (root.dataset.mobilePage === 'home') window.$chatwoot.toggleBubbleVisibility?.('show');

    const iframe = document.getElementById('chatwoot_live_chat_widget');
    if (iframe) iframe.title = text.chat;
    document.querySelector('#cw-bubble-holder .woot--close')?.setAttribute('aria-label', text.close);

    const trigger = pending;
    clearRequest();
    if (trigger && mobile.matches) openChat(trigger);
  }

  function syncChatViewport() {
    const viewport = window.visualViewport;
    if (!mobile.matches || !window.$chatwoot?.isOpen || !viewport) return;
    const bottom = Math.max(0, root.clientHeight - viewport.height - viewport.offsetTop);
    root.style.setProperty('--mp-chat-keyboard', `${bottom}px`);
    root.style.setProperty('--mp-chat-viewport-top', `${viewport.offsetTop}px`);
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('a[data-mobile-chat-open]');
    if (!trigger || !mobile.matches || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    if (ready) {
      clearRequest();
      openChat(trigger);
      return;
    }
    if (failed) {
      showNotice(trigger, text.unavailable);
      return;
    }
    if (pending) return;

    pending = trigger;
    showNotice(trigger, text.loading);
    waitTimer = setTimeout(() => {
      if (pending) message.textContent = text.waiting;
    }, 8000);
    loadChat();
  });

  window.addEventListener('chatwoot:ready', onReady);
  window.addEventListener('chatwoot:error', () => {
    if (!ready) fail();
  });
  window.addEventListener('chatwoot:opened', () => {
    syncChatViewport();
    if (opener) requestAnimationFrame(focusChat);
  });
  window.addEventListener('chatwoot:closed', () => {
    root.style.removeProperty('--mp-chat-keyboard');
    root.style.removeProperty('--mp-chat-viewport-top');
    if (opener) restoreFocus(opener);
    opener = undefined;
  });
  window.visualViewport?.addEventListener('resize', syncChatViewport);
  window.visualViewport?.addEventListener('scroll', syncChatViewport);
  mobile.addEventListener('change', () => {
    if (mobile.matches) {
      syncChatViewport();
      return;
    }
    clearRequest();
    opener = undefined;
    if (root.dataset.mobilePage !== 'home' && window.$chatwoot?.isOpen) window.$chatwoot.toggle('close');
    root.style.removeProperty('--mp-chat-keyboard');
    root.style.removeProperty('--mp-chat-viewport-top');
  });
  window.addEventListener('pagehide', clearRequest);

  if (window.$chatwoot?.hasLoaded) onReady();
  else if (root.dataset.mobilePage === 'home') loadChat();
})();

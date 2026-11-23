// The HTML contains the complete mobile shell. This script wires its controls.
(() => {
  const page = document.documentElement;
  const app = document.getElementById('mobile-portfolio');
  const home = document.getElementById('mobile-main');
  const header = document.querySelector('.mp-header');
  const headerRegion = header.closest('.mp-header-region');
  const tabs = app.querySelectorAll('[data-mobile-tab]');
  const navTrack = app.querySelector('.mp-nav-inner');
  const bottomNav = navTrack.parentElement;
  const workProjects = [...(home?.querySelectorAll('.mp-work-project') ?? [])];
  const { hints: workHints, dock: dockHint } = prepareWorkCards();
  const tabOffsets = new Map();
  const entryOffsets = new Map();
  const entryPrefix = Date.now();
  const scrollStorageKey = 'portfolio-mobile-scroll';
  const hasProjectTimelines = CSS.supports('view-timeline-name', '--mp-work-entry') &&
    CSS.supports('view-timeline-inset', '1px 1px') && CSS.supports('animation-timeline', '--mp-work-entry') &&
    CSS.supports('animation-range', 'entry 0% entry 100%');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const principles = document.querySelectorAll('#principles .title h2');
  const sharedSections = [...app.querySelectorAll('[data-mobile-content]')].map(slot => {
    const section = document.getElementById(slot.dataset.mobileContent);
    const origin = document.createComment('Original location of ' + section.id);
    section.before(origin);
    return { slot, section, origin };
  });
  const sectionHashes = new Set(['#mp-selected-title', '#mp-previews-title',
    '#what-i-bring', '#markets', '#markets-title', '#principles']);
  let session;
  let focusFrame;
  let activeTab;
  let workSession;
  let currentEntry;
  let nextEntry = 0;
  let lastVibration = -Infinity;

  function prepareWorkCards() {
    const hintTemplate = home?.querySelector('[data-work-scroll-hint]');
    const hints = new Map();
    if (!hintTemplate) return { hints };

    const statuses = new Map();
    for (const card of document.querySelectorAll('#projects .project-card')) {
      const status = card.querySelector('span.project-card__action');
      if (!status || card.querySelector('a.project-card__action--case[href]')) continue;
      statuses.set(card.querySelector('.project-card__name').textContent.trim(), status.textContent.trim());
    }

    workProjects.forEach((project, index) => {
      const status = statuses.get(project.querySelector('h3').textContent.trim());

      if (status) {
        const text = document.createElement('p');
        text.className = 'mp-work-status';
        const type = document.createElement('span');
        type.className = 'mp-work-status-type';
        const ending = /(?:coming soon|قريبًا)$/u.exec(status);
        type.textContent = ending ? status.slice(0, ending.index) : status;
        if (ending) {
          const soft = document.createElement('span');
          soft.className = 'mp-work-status-soft';
          soft.textContent = ending[0];
          type.append(soft);
        }
        text.append(type);
        project.querySelector('.mp-card-copy').append(text);
      }

      if (index === workProjects.length - 1) return;
      const hint = hintTemplate.content.firstElementChild.cloneNode(true);
      project.firstElementChild.append(hint);
      hints.set(project, hint);
    });
    if (!hints.size) return { hints };
    const dock = hintTemplate.content.firstElementChild.cloneNode(true);
    dock.classList.add('mp-work-scroll-dock');
    hintTemplate.parentElement.append(dock);
    return { hints, dock };
  }

  function activateWorkStages() {
    const nav = navTrack.parentElement;
    const cards = workProjects.map(project => project.firstElementChild);
    const statuses = home.querySelectorAll('.mp-work-status-type');
    const pendingReveals = new Set(statuses);
    const options = { passive: true, signal: (workSession = new AbortController()).signal };
    let frame = 0;
    let revealRanges = [];
    let revealObserver;
    let revealMargin;
    let stageObserver;
    let stageMargin;
    let activeProject;
    let hintFade;
    const discoveredProjects = new Set();

    function showHint(project) {
      if (project !== activeProject) hintFade?.cancel();
      activeProject = project;
      const hint = workHints.get(project);
      dockHint.toggleAttribute('data-work-final', !hint);
      if (!hint || discoveredProjects.has(project)) return;
      discoveredProjects.add(project);
      if (reducedMotion.matches) return;
      const visibleHint = page.hasAttribute('data-work-hint-docked') ? dockHint : hint;
      hintFade = visibleHint.animate?.([{ opacity: 0.45 }, { opacity: 1 }], { duration: 310, easing: 'ease-out' });
    }

    function observeStages(top, bottom) {
      if (!dockHint || !('IntersectionObserver' in window)) return;
      // The project at the center of the unobstructed viewport owns the hint.
      const center = Math.floor((page.clientHeight - bottom + top) / 2);
      const margin = `${-center}px 0px ${center + 1 - page.clientHeight}px`;
      if (margin === stageMargin) return;
      stageMargin = margin;
      stageObserver?.disconnect();
      stageObserver = new IntersectionObserver(entries => {
        const project = entries.find(entry => entry.isIntersecting)?.target;
        if (project) showHint(project);
      }, { rootMargin: margin });
      for (const project of workProjects) stageObserver.observe(project);
    }

    function observeStatuses(top, bottom) {
      if (!pendingReveals.size || !('IntersectionObserver' in window)) return;
      const margin = `${-Math.ceil(top)}px 0px ${-Math.ceil(bottom)}px`;
      if (margin === revealMargin) return;
      revealMargin = margin;
      revealObserver?.disconnect();
      revealObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.intersectionRatio < 0.5 || !pendingReveals.delete(entry.target)) continue;
          observer.unobserve(entry.target);
          if (!reducedMotion.matches) entry.target.setAttribute('data-work-status-reveal', '');
        }
      }, { rootMargin: margin, threshold: 0.5 });
      for (const status of pendingReveals) revealObserver.observe(status);
    }

    function clearStatusReveal(event) {
      if (event.animationName === 'mp-work-status-reveal') event.target.removeAttribute('data-work-status-reveal');
    }

    function sizeStages() {
      const headerHeight = headerRegion.getBoundingClientRect().height;
      const navHeight = nav.getBoundingClientRect().height;
      page.style.setProperty('--mp-work-header', `${headerHeight}px`);
      page.style.setProperty('--mp-work-nav-base', `${navHeight}px`);
      page.style.setProperty('--mp-work-nav', `${navHeight}px`);
      const available = page.clientHeight - headerHeight - navHeight;
      // Leave room to read and focus links in exceptionally short or zoomed viewports.
      const free = available < 96 || (window.visualViewport?.scale ?? 1) > 1.05;
      page.removeAttribute('data-work-hint-docked');
      const docked = Boolean(dockHint && (free || [...workHints.keys()].some(project => project.offsetHeight > available + 1)));
      page.toggleAttribute('data-work-hint-docked', docked);
      const dockHeight = docked ? dockHint.getBoundingClientRect().height : 0;
      const bottom = navHeight + dockHeight;
      page.style.setProperty('--mp-work-nav', `${bottom}px`);
      const stageHeight = available - dockHeight;
      const allFit = !free && workProjects.every(project => project.offsetHeight <= stageHeight + 1);
      const mode = free ? 'free' : allFit ? 'mandatory' : 'proximity';
      if (page.dataset.workSnap !== mode) page.dataset.workSnap = mode;
      observeStatuses(headerHeight, bottom);
      observeStages(headerHeight, bottom);

      if (!hasProjectTimelines) {
        // Match the entry timeline's edges. Refresh geometry only when stages resize.
        const scroll = window.scrollY;
        const stageEnd = headerHeight + stageHeight;
        revealRanges = free ? [] : workProjects.slice(1).map(project => {
          const { top, height } = project.getBoundingClientRect();
          return { card: project.firstElementChild, start: top + scroll - stageEnd, distance: Math.min(height, stageHeight) };
        });
      }
      schedule();
    }

    function paint() {
      frame = 0;
      const scroll = window.scrollY;
      for (const { card, start, distance } of revealRanges) {
        const offset = Math.max(-1, Math.min(0, (scroll - start) / distance - 1)).toFixed(5);
        if (card.style.getPropertyValue('--mp-work-reveal-offset') !== offset) {
          card.style.setProperty('--mp-work-reveal-offset', offset);
        }
      }
    }

    function schedule() {
      if (revealRanges.length && !frame && !reducedMotion.matches) frame = requestAnimationFrame(paint);
    }

    const geometry = new ResizeObserver(sizeStages);
    for (const element of [headerRegion, nav, ...workProjects]) geometry.observe(element);
    home.addEventListener('animationend', clearStatusReveal, options);
    home.addEventListener('animationcancel', clearStatusReveal, options);
    window.addEventListener('resize', sizeStages, options);
    window.visualViewport?.addEventListener('resize', sizeStages, options);
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        hintFade?.cancel();
        cancelAnimationFrame(frame);
        frame = 0;
      } else schedule();
    }, options);
    if (!hasProjectTimelines) window.addEventListener('scroll', schedule, options);
    options.signal.addEventListener('abort', () => {
      geometry.disconnect();
      revealObserver?.disconnect();
      stageObserver?.disconnect();
      hintFade?.cancel();
      dockHint?.removeAttribute('data-work-final');
      cancelAnimationFrame(frame);
      delete page.dataset.workSnap;
      page.removeAttribute('data-work-hint-docked');
      page.style.removeProperty('--mp-work-header');
      page.style.removeProperty('--mp-work-nav');
      page.style.removeProperty('--mp-work-nav-base');
      for (const status of statuses) status.removeAttribute('data-work-status-reveal');
      if (!hasProjectTimelines) for (const card of cards) card.style.removeProperty('--mp-work-reveal-offset');
    }, { once: true });
    sizeStages();
  }

  function deactivateWorkStages() {
    workSession?.abort();
    workSession = undefined;
  }

  function positionActiveTab(tab, animate = false) {
    const bounds = tab.getBoundingClientRect();
    const center = `${bounds.left + bounds.width / 2 - bottomNav.getBoundingClientRect().left}px`;
    const width = `${bounds.width}px`;
    if (bottomNav.style.getPropertyValue('--mp-nav-active-center') === center &&
        bottomNav.style.getPropertyValue('--mp-spotlight-tab-width') === width) return;

    bottomNav.toggleAttribute('data-nav-motion', animate);
    bottomNav.style.setProperty('--mp-nav-active-center', center);
    bottomNav.style.setProperty('--mp-spotlight-tab-width', width);
  }

  function syncNavigation() {
    const activeScreen = home ? page.dataset.mobileScreen : 'work';
    let selectedTab;
    for (const tab of tabs) {
      if (tab.dataset.mobileTab === activeScreen) {
        tab.setAttribute('aria-current', 'page');
        selectedTab = tab;
      } else {
        tab.removeAttribute('aria-current');
      }
    }
    if (selectedTab && selectedTab !== activeTab) {
      positionActiveTab(selectedTab, Boolean(activeTab));
      activeTab = selectedTab;
      if (home) {
        if (activeScreen === 'work') activateWorkStages();
        else deactivateWorkStages();
      }
    }
  }

  function focusScreen() {
    home.querySelector('[data-mobile-panel="' + page.dataset.mobileScreen + '"] [aria-level="1"]')
      ?.focus({ preventScroll: true });
  }

  function trackEntry() {
    const state = history.state;
    const key = state?.mobileEntry ?? `${entryPrefix}-${++nextEntry}`;
    if (!state?.mobileEntry) history.replaceState({ ...state, mobileEntry: key }, '');
    currentEntry = { key, tab: page.dataset.mobileScreen };
  }

  function trackScroll() {
    const offset = window.scrollY;
    entryOffsets.set(currentEntry.key, offset);
    tabOffsets.set(currentEntry.tab, offset);
  }

  function savedOffset(state) {
    const key = state?.mobileEntry;
    if (entryOffsets.has(key)) return entryOffsets.get(key);
    try {
      const saved = JSON.parse(sessionStorage.getItem(scrollStorageKey));
      if (saved && saved.key === key && Number.isFinite(saved.offset)) return saved.offset;
    } catch {
      // The in-page history still works when session storage is blocked.
    }
    return state?.mobileScroll;
  }

  function onHistory(event) {
    cancelAnimationFrame(focusFrame);
    const offset = savedOffset(event.state);
    if (!Number.isFinite(offset)) scrollToHash();
    trackEntry();
    focusFrame = requestAnimationFrame(() => {
      if (Number.isFinite(offset)) {
        window.scrollTo({ top: offset, behavior: 'instant' });
      }
      trackScroll();
      focusScreen();
    });
  }

  function scrollToHash() {
    const hash = location.hash;
    if (!hash || hash === '#mobile-main' || history.state !== null) return;
    requestAnimationFrame(() => {
      if (!session || hash !== location.hash) return;
      if (sectionHashes.has(hash)) {
        const target = document.getElementById(hash.slice(1));
        // Align the shared section with its mobile heading and the sticky header.
        (target?.closest('.mp-content-slot, .mp-work-project, .mp-work-selected') || target)?.scrollIntoView({ behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }

  function placeSharedSections(mobile) {
    for (const { slot, section, origin } of sharedSections) {
      if (mobile) {
        if (section.parentElement !== slot) slot.append(section);
      } else if (section.parentElement === slot) {
        origin.after(section);
      }
    }
    for (const title of principles) {
      if (mobile) title.setAttribute('aria-level', '3');
      else title.removeAttribute('aria-level');
    }
  }

  function vibrateTabChange(event, link) {
    if (!event.isTrusted || event.detail === 0 || !navTrack.contains(link) || typeof navigator.vibrate !== 'function') return;
    const now = performance.now();
    if (now - lastVibration < 10) return;
    lastVibration = now;
    try {
      navigator.vibrate(10);
    } catch {
      // Vibration can be blocked by device or browser settings.
    }
  }

  function onClick(event) {
    const target = event.target;
    const plainClick = !event.defaultPrevented && event.button === 0 &&
      !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    const link = target.closest('a');
    if (!link) return;

    if (!plainClick) return;
    if (!home) {
      // Case studies use ordinary document links and keep Work selected.
      if (link.hasAttribute('data-mobile-tab') && link !== activeTab) vibrateTabChange(event, link);
      return;
    }
    if (!link.hasAttribute('data-mobile-route') && !link.classList.contains('mp-skip')) return;

    event.preventDefault();
    cancelAnimationFrame(focusFrame);
    let offset = 0;
    if (link.hasAttribute('data-mobile-route') && link.hash !== location.hash) {
      const leavingTab = page.dataset.mobileScreen;
      trackScroll();
      if (link.dataset.mobileTab !== leavingTab) offset = tabOffsets.get(link.dataset.mobileTab) ?? 0;
      history.replaceState({ ...history.state, mobileScroll: window.scrollY }, '');
      history.pushState({}, '', link.href);
      window.dispatchEvent(new Event('mobile-portfolio-navigate'));
      if (link.dataset.mobileTab !== leavingTab && activeTab === link) vibrateTabChange(event, link);
      trackEntry();
    }
    window.scrollTo({ top: offset, behavior: 'instant' });
    trackScroll();
    focusScreen();
  }

  function activate() {
    session = new AbortController();
    const options = { signal: session.signal };
    app.addEventListener('click', onClick, options);
    if (home) {
      header.addEventListener('click', onClick, options);
      window.addEventListener('popstate', onHistory, options);
      window.addEventListener('hashchange', scrollToHash, options);
      window.addEventListener('scroll', trackScroll, { ...options, passive: true });
      // Restore after the selected panel is visible, so its height can accommodate the saved position.
      history.scrollRestoration = 'manual';
      session.signal.addEventListener('abort', () => { history.scrollRestoration = 'auto'; }, { once: true });
      const offset = savedOffset(history.state);
      if (Number.isFinite(offset)) {
        focusFrame = requestAnimationFrame(() => window.scrollTo({ top: offset, behavior: 'instant' }));
      } else {
        scrollToHash();
      }
      trackEntry();
    }
    const navResize = new ResizeObserver(() => {
      page.style.setProperty('--mp-nav-height', bottomNav.offsetHeight + 'px');
      if (activeTab) positionActiveTab(activeTab);
    });
    navResize.observe(bottomNav);
    navResize.observe(navTrack);
    session.signal.addEventListener('abort', () => navResize.disconnect(), { once: true });

    page.setAttribute('data-mobile-ready', '');
  }

  function deactivate() {
    if (!session) return;
    session.abort();
    session = undefined;
    cancelAnimationFrame(focusFrame);
    deactivateWorkStages();
    activeTab = undefined;
    bottomNav.removeAttribute('data-nav-motion');
    page.removeAttribute('data-mobile-ready');
    page.style.removeProperty('--mp-nav-height');
  }

  function syncMobile() {
    if (!page.hasAttribute('data-mobile-active')) {
      deactivate();
      placeSharedSections(false);
      return;
    }
    if (!session) {
      placeSharedSections(true);
      activate();
    }
    syncNavigation();
  }

  // One document-level subscription owns the compact session across viewport changes.
  window.addEventListener('mobile-portfolio-routechange', syncMobile);
  window.addEventListener('pagehide', () => {
    if (home && session) {
      const offset = window.scrollY;
      history.replaceState({ ...history.state, mobileScroll: offset }, '');
      try {
        // Reload can snapshot history state before pagehide runs.
        sessionStorage.setItem(scrollStorageKey, JSON.stringify({ key: currentEntry.key, offset }));
      } catch {
        // Storage is optional for local file URLs.
      }
    }
    deactivate();
  });
  syncMobile();
})();

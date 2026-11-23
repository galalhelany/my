// Runs before first paint. Keep the legacy document available when scripts are blocked.
(() => {
  const bootScript = document.currentScript;
  const { kind } = bootScript.dataset;
  const root = document.documentElement;
  const compact = matchMedia('(max-width: 1020px)');
  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const themeKey = 'portfolio-mobile-theme';
  const homeHash = '#hello';
  const builtHash = '#things-ive-built';
  const screensByHash = {
    [homeHash]: 'work',
    '#work': 'work',
    '#projects': 'work',
    '#mp-selected-title': 'work',
    '#mp-previews-title': 'work',
    '#latest-projects': 'work',
    [builtHash]: 'built',
    '#mobile-products': 'built',
    '#mp-products-title': 'built',
    '#experience': 'experience',
    '#what-i-bring': 'experience',
    '#markets': 'experience',
    '#markets-title': 'experience',
    '#about': 'about',
    '#principles': 'about',
    '#contact': 'contact'
  };
  let desktopTheme;
  let chosen = 'system';
  let themeTimer;

  const isMonochrome = value => value === '0' || value === '16';
  const systemTheme = () => systemDark.matches ? '0' : '16';

  function readTheme() {
    try {
      const stored = localStorage.getItem(themeKey);
      chosen = isPaletteValue(stored) ? stored : 'system';
    } catch {
      // Theme selection still works in memory.
    }
  }

  function isPaletteValue(value) {
    return typeof value === 'string' && /^(?:[0-9]|1[0-6])$/.test(value);
  }

  function currentTheme() { return chosen === 'system' ? systemTheme() : chosen; }

  function getTheme() {
    return document.body?.className.match(/\btheme--(\d{2})\b/)?.[1];
  }

  function setBodyTheme(value) {
    const theme = String(value).padStart(2, '0');
    const oldTheme = getTheme();
    if (oldTheme && theme !== oldTheme) document.body.classList.replace('theme--' + oldTheme, 'theme--' + theme);
    const slider = document.querySelector('.app-aside .option.theme input');
    if (slider) slider.value = String(Number(theme));
  }

  // The boot script runs on desktop too, but the mobile preference owns the body
  // theme only at compact sizes. Keep the previous desktop selection on resize.
  function syncTheme() {
    const theme = currentTheme();
    if (root.dataset.mobileTheme !== theme) root.dataset.mobileTheme = theme;
    const body = document.body;
    if (!body) return;
    if (compact.matches) {
      if (!body.hasAttribute('data-mobile-theme-ready')) {
        desktopTheme = document.readyState === 'loading' ? systemTheme() : getTheme();
        body.setAttribute('data-mobile-theme-ready', '');
      }
      setBodyTheme(theme);
    } else if (body.hasAttribute('data-mobile-theme-ready')) {
      body.removeAttribute('data-mobile-theme-ready');
      setBodyTheme(desktopTheme ?? systemTheme());
    }
  }

  function stopThemeMotion() {
    clearTimeout(themeTimer);
    root.removeAttribute('data-mobile-theme-motion');
    root.removeAttribute('data-mobile-palette-motion');
  }

  function selectTheme(value, userTriggered = false) {
    const previous = root.dataset.mobileTheme;
    if (userTriggered && compact.matches && value !== previous && !reducedMotion.matches) {
      const monochromeMotion = isMonochrome(previous) && isMonochrome(value) &&
        typeof CSS.registerProperty === 'function' && CSS.supports('color', 'color-mix(in srgb, white, black)');
      const motion = monochromeMotion ? 'data-mobile-theme-motion' : 'data-mobile-palette-motion';
      if (!root.hasAttribute(motion)) {
        stopThemeMotion();
        root.setAttribute(motion, '');
        // Commit the current palette before changing the transition targets.
        getComputedStyle(document.body).backgroundColor;
      }
      clearTimeout(themeTimer);
      themeTimer = setTimeout(stopThemeMotion, 400);
    }
    chosen = value;
    syncTheme();
    try {
      localStorage.setItem(themeKey, value);
    } catch {
      // Theme selection still works in memory.
    }
  }

  function syncRoute() {
    if (kind === 'home') {
      const hash = location.hash;
      const screen = new URLSearchParams(location.search).get('view') === 'full' ? 'full'
        : hash === '#mobile-main' ? root.dataset.mobileScreen || 'work'
        : hash ? screensByHash[hash] || 'full' : 'work';
      if (root.dataset.mobileScreen !== screen) root.dataset.mobileScreen = screen;
    }
    root.toggleAttribute('data-mobile-active', compact.matches &&
      (kind !== 'home' || root.dataset.mobileScreen !== 'full'));
    syncTheme();
    window.dispatchEvent(new Event('mobile-portfolio-routechange'));
  }

  let appRequested = false;
  function loadApp() {
    if (appRequested || !document.getElementById('mobile-portfolio') ||
        !root.hasAttribute('data-mobile-active')) return;
    appRequested = true;
    // A classic script works on file URLs, where module imports require an HTTP origin.
    const script = document.createElement('script');
    const controller = new URL('mobile-controller.js', bootScript.src);
    controller.search = new URL(bootScript.src).search;
    script.src = controller.href;
    script.addEventListener('error', () => {
      script.remove();
      appRequested = false;
      console.error('Unable to load mobile portfolio controls.');
    }, { once: true });
    document.head.append(script);
  }

  root.dataset.mobilePage = kind;
  readTheme();
  syncRoute();
  window.addEventListener('mobile-portfolio-body', syncTheme, { once: true });
  window.addEventListener('mobile-portfolio-theme', event => {
    if (compact.matches && isPaletteValue(event.detail)) selectTheme(event.detail, true);
  });
  window.addEventListener('mobile-portfolio-navigate', syncRoute);
  window.addEventListener('hashchange', () => {
    syncRoute();
    loadApp();
  });
  window.addEventListener('popstate', syncRoute);
  window.addEventListener('DOMContentLoaded', () => {
    syncTheme();
    loadApp();
    new MutationObserver(() => {
      if (!compact.matches) return;
      const theme = getTheme();
      if (!theme || Number(theme) === Number(currentTheme())) return;
      const value = String(Number(theme));
      if (isPaletteValue(value)) selectTheme(value);
    }).observe(document.body, { attributeFilter: ['class'] });
  }, { once: true });

  compact.addEventListener('change', () => {
    stopThemeMotion();
    syncRoute();
    loadApp();
    if (kind !== 'home' || root.dataset.mobileScreen === 'full') return;
    if (compact.matches) {
      if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (location.hash && location.hash !== homeHash) {
      const desktopAliases = {
        '#work': '#projects',
        '#mp-selected-title': '#projects',
        '#mp-previews-title': '#projects',
        '#latest-projects': '#projects',
        '#mobile-products': builtHash,
        '#mp-products-title': builtHash
      };
      const fragment = desktopAliases[location.hash] || location.hash;
      document.getElementById(fragment.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
  systemDark.addEventListener('change', () => {
    if (chosen === 'system') stopThemeMotion();
    syncTheme();
  });
  reducedMotion.addEventListener('change', stopThemeMotion);
  window.addEventListener('storage', event => {
    if (event.key !== themeKey && event.key !== null) return;
    stopThemeMotion();
    readTheme();
    syncTheme();
  });
  window.addEventListener('pagehide', stopThemeMotion);
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    readTheme();
    syncRoute();
    loadApp();
  });
})();

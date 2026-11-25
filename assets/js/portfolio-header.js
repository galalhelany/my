// The localized HTML supplies the header and links. One observer controls its two states.
(() => {
  const root = document.documentElement;
  const region = document.querySelector('.mp-header-region');
  const boundary = document.querySelector('.mp-header-boundary');
  const expanded = region.querySelector('[data-header-expanded]');
  const compactActions = region.querySelector('[data-header-compact]');
  const heroActions = region.querySelector('.mp-hero-actions');
  const theme = region.querySelector('.mp-theme-toggle');
  const palette = document.querySelector('.app-aside .option.theme input');
  const locale = region.querySelector('.mp-language');
  const localePath = locale.getAttribute('href');
  const brand = region.querySelector('.mp-brand');
  const skip = region.querySelector('.mp-skip');
  const disclosures = region.querySelectorAll('.mp-details');
  const caseToc = region.querySelector('.mp-details:has(.mp-case-toc)');
  const caseBottomNav = caseToc && document.querySelector('.mp-nav');
  const readingSettings = region.querySelector('[data-reading-settings]');
  const legacyTextSize = document.querySelector('.app-aside .option.text-size input');
  const article = document.querySelector('.case-study-article');
  const mobile = matchMedia('(max-width: 1020px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let workExpanded = false;
  let themePicker;
  let readingPicker;

  function setCompact(compact, animate = true) {
    compact = compact && !workExpanded;
    if (!animate) expanded.parentElement.removeAttribute('data-header-motion');
    if (expanded.inert === compact) return;
    const outgoing = compact ? expanded : compactActions;
    if (outgoing.contains(document.activeElement) || (compact && heroActions?.contains(document.activeElement))) {
      brand.focus({ preventScroll: true });
    }
    if (animate) expanded.parentElement.setAttribute('data-header-motion', '');
    expanded.inert = compact;
    compactActions.inert = !compact;
    heroActions?.toggleAttribute('inert', compact);
    if (mobile.matches) measureHeader();
  }

  function syncLocale() {
    locale.setAttribute('href', localePath + location.search + location.hash);
  }

  function syncPreferences() {
    themePicker?.sync();
    syncLocale();
    readingPicker?.sync();
  }

  function syncRoute() {
    if (!mobile.matches) return;
    syncPreferences();
    if (root.dataset.mobilePage === 'home') {
      skip.setAttribute('href', root.hasAttribute('data-mobile-active') ? '#mobile-main' : '#portfolio-content');
      const keepExpanded = root.hasAttribute('data-mobile-active') && root.dataset.mobileScreen === 'work';
      if (workExpanded !== keepExpanded) {
        workExpanded = keepExpanded;
        setCompact(boundary.getBoundingClientRect().bottom <= 0, false);
      }
    }
  }

  function createReadingLabels(dialog) {
    let active;
    let hideTimer;

    function clear() {
      clearTimeout(hideTimer);
      active?.removeAttribute('data-label-state');
      active = undefined;
    }

    return {
      clear,
      show(caption) {
        if (!dialog.hasAttribute('data-visible')) return;
        if (active !== caption) clear();
        clearTimeout(hideTimer);
        active = caption;
        caption.dataset.labelState = 'visible';
      },
      release(caption) {
        if (active !== caption) return;
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => { caption.dataset.labelState = 'fading'; }, 800);
      }
    };
  }

  let lastSliderTick = -Infinity;

  function tickSlider(event, dialog) {
    if (!event.isTrusted || !mobile.matches || !dialog.hasAttribute('data-visible') || typeof navigator.vibrate !== 'function') return;
    const now = performance.now();
    if (now - lastSliderTick < 60) return;
    lastSliderTick = now;
    try {
      navigator.vibrate(10);
    } catch {
      // Vibration may be blocked by the browser or device settings.
    }
  }

  function createPickerSlider(dialog, { source, label, read, apply, describe, lineHeight }, activeDrags, labels) {
    // Both reading controls reuse the original five-stop text-size rail.
    const rail = document.createElement('div');
    rail.className = 'app-aside';
    if (dialog.id === 'mp-reading-settings') rail.classList.add('mp-picker-surface');
    const option = source.closest('.option').cloneNode(true);
    option.removeAttribute('tabindex');
    option.removeAttribute('aria-label');
    option.querySelector('.dots').setAttribute('aria-hidden', 'true');
    const icon = option.querySelector('svg');
    icon.setAttribute('aria-hidden', 'true');
    if (lineHeight) {
      // Lucide-style arrows with three text lines.
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('fill', 'none');
      icon.setAttribute('stroke', 'currentColor');
      icon.setAttribute('stroke-width', '2');
      icon.setAttribute('stroke-linecap', 'round');
      icon.setAttribute('stroke-linejoin', 'round');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M5 4v16m-3-3 3 3 3-3M2 7l3-3 3 3m4-3h9m-9 8h9m-9 8h9');
      path.style.fill = 'none';
      path.style.stroke = 'var(--color--foreground--100)';
      icon.replaceChildren(path);
    }

    const slider = option.querySelector('input');
    slider.setAttribute('aria-label', label);
    slider.setAttribute('aria-orientation', 'vertical');
    rail.append(option);
    dialog.append(rail);

    let caption;
    if (labels) {
      caption = document.createElement('span');
      caption.className = 'mp-reading-slider-label';
      caption.textContent = label;
      caption.setAttribute('aria-hidden', 'true');
      rail.append(caption);
      const rangeKeys = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End']);
      slider.addEventListener('keydown', event => {
        if (rangeKeys.has(event.key)) labels.show(caption);
      });
      slider.addEventListener('keyup', event => {
        if (rangeKeys.has(event.key) && dragging === undefined) labels.release(caption);
      });
      slider.addEventListener('blur', () => {
        if (dragging === undefined) labels.release(caption);
      });
    }

    const dots = option.querySelectorAll('.dot');
    const min = Number(slider.min);
    const max = Number(slider.max);
    let dragging;

    function sync() {
      slider.value = read();
      if (describe) slider.setAttribute('aria-valuetext', describe());
      option.style.setProperty('--mp-theme-position', (slider.valueAsNumber - min) / (max - min));
    }

    function preview(event) {
      const previous = read();
      if (slider.value === previous) return;
      apply(slider.value);
      sync();
      if (slider.value !== previous) tickSlider(event, dialog);
    }

    function previewAt(event) {
      const center = dot => {
        const { top, height } = dot.getBoundingClientRect();
        return top + height / 2;
      };
      const bottom = center(dots[0]);
      const top = center(dots[dots.length - 1]);
      slider.valueAsNumber = Math.round(min + (max - min) * (bottom - event.clientY) / (bottom - top));
      preview(event);
    }

    slider.addEventListener('input', preview);
    slider.addEventListener('pointerdown', event => {
      if ((!event.isPrimary && dialog.id === 'mp-theme-picker') || event.button !== 0 || dragging !== undefined) return;
      event.preventDefault();
      dragging = event.pointerId;
      activeDrags.add(dragging);
      labels?.show(caption);
      slider.setPointerCapture(dragging);
      slider.focus({ preventScroll: true });
      previewAt(event);
    });
    slider.addEventListener('pointermove', event => {
      if (event.pointerId === dragging) previewAt(event);
    });
    slider.addEventListener('pointerup', event => {
      if (event.pointerId === dragging) previewAt(event);
    });
    slider.addEventListener('lostpointercapture', event => {
      activeDrags.delete(event.pointerId);
      if (event.pointerId === dragging) {
        dragging = undefined;
        labels?.release(caption);
      }
    });
    return { slider, sync };
  }

  function createPicker(trigger, controls, reading = false) {
    const dialog = document.createElement('dialog');
    dialog.className = reading ? 'mp-theme-picker' : 'mp-theme-picker mp-picker-surface';
    dialog.id = reading ? 'mp-reading-settings' : 'mp-theme-picker';
    dialog.setAttribute('aria-label', trigger.getAttribute('aria-label'));

    const activeDrags = new Set();
    const labels = reading ? createReadingLabels(dialog) : null;
    const sliders = controls.map(control => createPickerSlider(dialog, control, activeDrags, labels));
    document.body.append(dialog);
    trigger.setAttribute('aria-controls', dialog.id);
    let backdropPress;
    let closeTimer;
    let returnScroll;

    function sync() {
      for (const entry of sliders) entry.sync();
    }

    function close(animate = true) {
      if (!dialog.open) return;
      clearTimeout(closeTimer);
      dialog.removeAttribute('data-visible');
      labels?.clear();
      const finish = () => {
        dialog.close();
        trigger.setAttribute('aria-expanded', 'false');
        if (mobile.matches) {
          if (reading) window.scrollTo({ top: returnScroll, behavior: 'instant' });
          (trigger === theme && expanded.inert ? brand : trigger).focus({ preventScroll: true });
        }
      };
      if (animate && !reducedMotion.matches) closeTimer = setTimeout(finish, 270);
      else finish();
    }

    const onBackdrop = event => {
      if (event.target !== dialog) return false;
      if (reading) return true;
      const { left, right, top, bottom } = dialog.getBoundingClientRect();
      return event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom;
    };
    dialog.addEventListener('pointerdown', event => { backdropPress = activeDrags.size === 0 && onBackdrop(event); });
    dialog.addEventListener('click', event => {
      if (backdropPress && onBackdrop(event)) close();
      backdropPress = false;
    });
    dialog.addEventListener('keydown', event => { event.stopPropagation(); });
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      close();
    });
    return {
      sync,
      close,
      open() {
        if (dialog.open) return;
        sync();
        returnScroll = window.scrollY;
        dialog.showModal();
        dialog.getBoundingClientRect();
        dialog.setAttribute('data-visible', '');
        trigger.setAttribute('aria-expanded', 'true');
        sliders[0].slider.focus({ preventScroll: true });
      }
    };
  }

  theme.addEventListener('click', () => {
    themePicker ??= createPicker(theme, [{
      source: palette,
      label: theme.getAttribute('aria-label'),
      read: () => root.dataset.mobileTheme,
      apply: value => window.dispatchEvent(new CustomEvent('mobile-portfolio-theme', { detail: value }))
    }]);
    themePicker.open();
  });
  if (palette && !palette.hasAttribute('aria-label')) {
    palette.setAttribute('aria-label', theme.dataset.desktopLabel);
  }

  region.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    if (link === locale) syncLocale();
    if (link.closest('.mp-case-toc')) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const section = document.getElementById(link.hash.slice(1));
      if (!section) return;
      event.preventDefault();
      link.closest('details').open = false;
      if (location.hash !== link.hash) history.pushState(history.state, '', link.hash);
      section.tabIndex = -1;
      section.focus({ preventScroll: true });
      section.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  });
  locale.addEventListener('focus', syncLocale);
  locale.addEventListener('pointerdown', syncLocale);

  if (readingSettings && legacyTextSize && article) {
    readingSettings.addEventListener('click', () => {
      readingPicker ??= createPicker(readingSettings, [
        {
          source: legacyTextSize,
          label: readingSettings.dataset.sizeLabel,
          read: () => legacyTextSize.value,
          describe: () => legacyTextSize.getAttribute('aria-valuetext'),
          apply(value) {
            legacyTextSize.value = value;
            legacyTextSize.dispatchEvent(new Event('input', { bubbles: true }));
          }
        },
        {
          source: legacyTextSize,
          label: root.lang === 'ar' ? 'تباعد الأسطر' : 'Line Height',
          lineHeight: true,
          read: () => article.dataset.caseLineHeight,
          describe: () => article.dataset.caseLineHeightLabel,
          apply: value => window.dispatchEvent(new CustomEvent('mobile-reading-line-height', { detail: value }))
        }
      ], true);
      readingPicker.open();
    });
  }

  document.addEventListener('pointerdown', event => {
    if (!mobile.matches) return;
    for (const disclosure of disclosures) {
      if (disclosure.open && !disclosure.contains(event.target)) disclosure.open = false;
    }
  });

  document.addEventListener('keydown', event => {
    if (!mobile.matches || event.key !== 'Escape' || document.querySelector('[data-case-lightbox]')) return;
    const disclosure = region.querySelector('.mp-details[open]');
    if (disclosure) {
      disclosure.open = false;
      disclosure.querySelector('summary').focus();
    }
    const menu = region.querySelector('[data-portfolio-menu][aria-expanded="true"]');
    if (menu) {
      menu.click();
      menu.focus();
    }
  });

  const headerObserver = new IntersectionObserver(([entry]) => {
    if (entry.boundingClientRect.bottom <= 0) setCompact(true);
    else if (entry.intersectionRatio === 1) setCompact(false);
  }, { threshold: [0, 1] });
  const preferences = new MutationObserver(syncPreferences);
  const headerBox = region.querySelector('.mp-header');
  const toolbar = region.querySelector('.mp-tools');

  function measureHeader() {
    root.style.setProperty('--mp-header-height', headerBox.offsetHeight + 'px');
    if (toolbar?.offsetHeight) root.style.setProperty('--mp-tools-height', toolbar.offsetHeight + 'px');
    if (caseToc?.open) fitCaseToc();
  }

  function fitCaseToc() {
    const bottom = caseBottomNav?.getBoundingClientRect().top ?? window.innerHeight;
    const height = Math.max(44, Math.floor(bottom - toolbar.getBoundingClientRect().bottom - 16)) + 'px';
    if (caseToc.style.getPropertyValue('--mp-toc-room') !== height) caseToc.style.setProperty('--mp-toc-room', height);
  }

  caseToc?.addEventListener('toggle', () => {
    if (caseToc.open && mobile.matches) {
      fitCaseToc();
      window.addEventListener('scroll', fitCaseToc, { passive: true });
      window.addEventListener('resize', fitCaseToc, { passive: true });
    } else {
      window.removeEventListener('scroll', fitCaseToc);
      window.removeEventListener('resize', fitCaseToc);
    }
  });

  const headerSize = new ResizeObserver(measureHeader);

  function syncViewport() {
    theme.disabled = !mobile.matches;
    if (readingSettings && legacyTextSize && article) {
      readingSettings.disabled = !mobile.matches;
      root.toggleAttribute('data-reading-settings-ready', mobile.matches);
    }
    root.toggleAttribute('data-portfolio-header-ready', mobile.matches);
    if (!mobile.matches) {
      if (caseToc) caseToc.open = false;
      themePicker?.close(false);
      readingPicker?.close(false);
      headerObserver.disconnect();
      headerSize.disconnect();
      root.style.removeProperty('--mp-header-height');
      root.style.removeProperty('--mp-tools-height');
      preferences.disconnect();
      return;
    }

    syncRoute();
    setCompact(boundary.getBoundingClientRect().bottom <= 0, false);
    headerObserver.observe(boundary);
    headerSize.observe(headerBox);
    if (toolbar) headerSize.observe(toolbar);
    preferences.observe(root, { attributeFilter: ['data-mobile-theme'] });
    if (readingSettings && article) {
      preferences.observe(document.body, { attributeFilter: ['data-case-text-size'] });
      preferences.observe(article, { attributeFilter: ['data-case-line-height'] });
    }
  }

  mobile.addEventListener('change', syncViewport);
  window.addEventListener('mobile-portfolio-routechange', syncRoute);
  window.addEventListener('pageshow', event => {
    if (mobile.matches && event.persisted) {
      setCompact(boundary.getBoundingClientRect().bottom <= 0, false);
      syncRoute();
    }
  });
  syncViewport();
})();

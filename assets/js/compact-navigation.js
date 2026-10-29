// Shared scroll viewport for responsive portfolio navigation; section tracking stays with each page.
(function () {
  window.createCompactNavigationViewport = function (options) {
    var body = document.body;
    var prefersReducedMotion = options.prefersReducedMotion;
    var propertyPrefix = options.propertyPrefix;
    var nav = options.nav;
    var propertyTarget = options.propertyTarget || nav;
    var viewport = nav ? nav.querySelector('.content') : null;
    var utilities = document.querySelector('.app-aside');
    var header = document.querySelector('.app-header');
    if (!nav || !viewport || !utilities || !header) {
      return { refresh: function () {}, reveal: function () {} };
    }
    var compact = window.matchMedia('(max-width: 1020px)');
    var enabled = false;
    var frame;
    var resizeObserver;
    var pendingLink;

    function isOpen() {
      return enabled && body.classList.contains('mobile-nav--is--visible');
    }

    function updateFades() {
      nav.classList.toggle('has-overflow-above', viewport.scrollTop > 1);
      nav.classList.toggle('has-overflow-below',
        viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop > 1);
    }

    function reveal(link, immediate) {
      if (!link || link.hidden || !viewport.contains(link)) { return; }
      if (!isOpen()) { pendingLink = link; return; }
      pendingLink = null;
      var bounds = viewport.getBoundingClientRect();
      var target = link.getBoundingClientRect();
      var focusSpace = parseFloat(window.getComputedStyle(viewport).paddingBlockStart) || 6;
      var fadeSize = parseFloat(window.getComputedStyle(nav, '::before').blockSize) || 20;
      var top = bounds.top + focusSpace + (viewport.scrollTop > 1 ? fadeSize : 0);
      var bottom = bounds.bottom - focusSpace -
        (viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop > 1 ? fadeSize : 0);
      var offset = target.top < top ? target.top - top : target.bottom > bottom ? target.bottom - bottom : 0;
      if (Math.abs(offset) < 1) { return; }
      viewport.scrollTo({
        top: viewport.scrollTop + offset,
        behavior: immediate || prefersReducedMotion ? 'auto' : 'smooth'
      });
    }

    function updateLayout() {
      frame = null;
      if (!isOpen()) { return; }
      var bounds = nav.getBoundingClientRect();
      var top = Math.max(0, header.getBoundingClientRect().bottom - bounds.top);
      var bottom = Math.max(0, bounds.bottom - utilities.getBoundingClientRect().top);
      [[propertyPrefix + '-header-bottom', top], [propertyPrefix + '-utilities-space', bottom]].forEach(function (entry) {
        var value = entry[1].toFixed(2) + 'px';
        if (propertyTarget.style.getPropertyValue(entry[0]) !== value) { propertyTarget.style.setProperty(entry[0], value); }
      });
      updateFades();
      // Defer only genuine active changes made while closed; manual scrolling stays untouched.
      if (pendingLink) { reveal(pendingLink, true); }
    }

    function scheduleLayout() {
      if (enabled && !frame) { frame = window.requestAnimationFrame(updateLayout); }
    }

    function revealFocus(event) {
      var link = event.target.closest('.item');
      if (link) { reveal(link, true); }
    }

    function stop() {
      enabled = false;
      if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
      window.cancelAnimationFrame(frame);
      frame = null;
      viewport.removeEventListener('scroll', updateFades);
      viewport.removeEventListener('focusin', revealFocus);
      window.removeEventListener('resize', scheduleLayout);
      utilities.removeEventListener('transitionend', scheduleLayout);
      propertyTarget.style.removeProperty(propertyPrefix + '-header-bottom');
      propertyTarget.style.removeProperty(propertyPrefix + '-utilities-space');
      nav.classList.remove('has-overflow-above', 'has-overflow-below');
    }

    function start() {
      if (enabled || !compact.matches) { return; }
      enabled = true;
      viewport.addEventListener('scroll', updateFades, { passive: true });
      viewport.addEventListener('focusin', revealFocus);
      window.addEventListener('resize', scheduleLayout, { passive: true });
      utilities.addEventListener('transitionend', scheduleLayout);
      if ('ResizeObserver' in window) {
        // Measure each expanding-control frame before paint, without observing our own output.
        resizeObserver = new ResizeObserver(function () {
          window.cancelAnimationFrame(frame);
          updateLayout();
        });
        resizeObserver.observe(header);
        resizeObserver.observe(utilities);
      }
      scheduleLayout();
    }

    compact.addEventListener('change', function () { compact.matches ? start() : stop(); });
    window.addEventListener('pagehide', stop);
    window.addEventListener('pageshow', start);
    if (document.fonts) { document.fonts.ready.then(scheduleLayout); }
    start();
    return { refresh: scheduleLayout, reveal: reveal };
  };
})();

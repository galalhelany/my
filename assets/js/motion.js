/* Premium, dependency-free motion system.
 * Intersection Observer handles one-shot reveals; requestAnimationFrame batches
 * the few scroll/mouse transforms so the main thread stays responsive. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var supportsObserver = 'IntersectionObserver' in window;
  var root = document.documentElement;
  var parallaxItems = [];
  var frameRequested = false;
  var pointerFrameRequested = false;
  var pointerX = 0;
  var pointerY = 0;
  var secondaryPointerX = 0;
  var secondaryPointerY = 0;

  function setDelay(element, index, step) {
    element.style.setProperty('--motion-delay', Math.min(index * step, 600) + 'ms');
  }

  function prepareReveals() {
    var sections = document.querySelectorAll('.app-main > .section:not(.cover)');

    sections.forEach(function (section) {
      section.classList.add('motion-reveal');
    });

    // Hero children enter in a compact page-load stagger.
    document.querySelectorAll('.section.intro .options, .section.intro .texts').forEach(function (element, index) {
      element.classList.add('motion-reveal');
      setDelay(element, index + 1, 110);
    });

    // Feature list and experience steps reveal sequentially.
    document.querySelectorAll('.section.values .title h2').forEach(function (element, index) {
      element.classList.add('motion-reveal');
      element.dataset.motionDirection = 'inline';
      setDelay(element, index, 95);
    });

    document.querySelectorAll('.section.background .item').forEach(function (element, index) {
      element.classList.add('motion-reveal');
      element.dataset.motionDirection = 'inline';
      setDelay(element, index % 3, 90);
    });

    // Project cards reveal once; footer items stay visible by default and use
    // their delay only when the parent contact section activates.
    document.querySelectorAll('.section.references .item').forEach(function (element, index) {
      element.classList.add('motion-reveal');
      setDelay(element, index % 4, 100);
    });

    document.querySelectorAll('.section.contact .actions > *').forEach(function (element, index) {
      setDelay(element, index, 100);
    });

    // Large artwork and portrait scale into place without changing dimensions.
    document.querySelectorAll('.section.work .hero-image .image, .section.work .hero-image .image-arabic, .section.contact .image figure').forEach(function (element) {
      element.classList.add('motion-image');
      parallaxItems.push(element);
    });

  }

  function revealImmediately() {
    document.querySelectorAll('.motion-reveal, .motion-image').forEach(function (element) {
      element.classList.add('is-in-view');
    });
  }

  function animateCount(element) {
    if (element.dataset.counted === 'true') return;
    element.dataset.counted = 'true';

    var target = Number(element.dataset.count);
    if (!Number.isFinite(target)) return;

    var start = performance.now();
    var duration = 1200;
    var prefix = element.dataset.countPrefix || '';
    var suffix = element.dataset.countSuffix || '';

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function observeReveals() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-in-view');
        entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        if (entry.target.matches('[data-count]')) animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    document.querySelectorAll('.motion-reveal, .motion-image, [data-count]').forEach(function (element) {
      observer.observe(element);
    });
  }

  function updateScrollEffects() {
    frameRequested = false;
    var viewportHeight = window.innerHeight || 1;

    // Parallax is deliberately disabled on small screens to protect mobile FPS.
    if (window.innerWidth > 760) {
      parallaxItems.forEach(function (element) {
        var rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) return;
        var centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        element.style.setProperty('--image-parallax', (centerOffset * -18).toFixed(2) + 'px');
      });
    } else {
      parallaxItems.forEach(function (element) {
        element.style.setProperty('--image-parallax', '0px');
      });
    }

  }

  function requestScrollFrame() {
    if (frameRequested) return;
    frameRequested = true;
    requestAnimationFrame(updateScrollEffects);
  }

  function createAmbientLayer() {
    if (document.querySelector('.motion-ambient')) return;

    var layer = document.createElement('div');
    var primary = document.createElement('div');
    var secondary = document.createElement('div');

    layer.className = 'motion-ambient';
    layer.setAttribute('aria-hidden', 'true');
    primary.className = 'motion-ambient__circle motion-ambient__circle--primary';
    secondary.className = 'motion-ambient__circle motion-ambient__circle--secondary';
    layer.append(primary, secondary);
    var appMain = document.querySelector('.app-main');
    if (appMain) appMain.insertBefore(layer, appMain.firstChild);
  }

  function updateAmbientPointer() {
    pointerFrameRequested = false;
    root.style.setProperty('--ambient-primary-x', pointerX.toFixed(2) + 'px');
    root.style.setProperty('--ambient-primary-y', pointerY.toFixed(2) + 'px');
    root.style.setProperty('--ambient-secondary-x', secondaryPointerX.toFixed(2) + 'px');
    root.style.setProperty('--ambient-secondary-y', secondaryPointerY.toFixed(2) + 'px');
  }

  function requestPointerFrame() {
    if (pointerFrameRequested) return;
    pointerFrameRequested = true;
    requestAnimationFrame(updateAmbientPointer);
  }

  function initPagePointer() {
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;

    window.addEventListener('pointermove', function (event) {
      pointerX = event.pageX;
      pointerY = event.pageY;
      secondaryPointerX = pointerX + (event.clientX < window.innerWidth / 2 ? 110 : -110);
      secondaryPointerY = pointerY + (event.clientY < window.innerHeight / 2 ? 80 : -80);
      requestPointerFrame();
    }, { passive: true });
  }

  function init() {
    root.classList.add('motion-enabled');
    createAmbientLayer();
    prepareReveals();

    if (reduceMotion.matches || !supportsObserver) {
      revealImmediately();
      if (reduceMotion.matches) {
        // Skip the legacy splash and jQuery scroll tween for reduced motion too.
        document.body.classList.remove('cover--is--visible', 'is--loading');
        if (window.jQuery) window.jQuery.fx.off = true;
      }
      return;
    }

    observeReveals();
    initPagePointer();
    window.addEventListener('scroll', requestScrollFrame, { passive: true });
    window.addEventListener('resize', requestScrollFrame, { passive: true });
    requestScrollFrame();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

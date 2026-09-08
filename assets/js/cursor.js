(function () {
  'use strict';

  var supportsCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!supportsCustomCursor || prefersReducedMotion || !document.body) {
    return;
  }

  var cursor = document.createElement('div');
  cursor.className = 'site-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="site-cursor__halo"></span><span class="site-cursor__dot"></span>' +
    '<span class="site-cursor__magnifier"><span class="site-cursor__magnifier-text"></span>' +
    '<span class="site-cursor__magnifier-logo"></span></span>';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('custom-cursor-enabled');

  var magnifierText = cursor.querySelector('.site-cursor__magnifier-text');
  var magnifierLogo = cursor.querySelector('.site-cursor__magnifier-logo');
  var isCaseStudyPage = document.body.classList.contains('case-study-page');
  var magnifierSize = 174;
  var magnifierZoom = 1.55;
  var activeHeading = null;
  var activeLogo = null;
  var pendingHeading = null;
  var pendingLogo = null;
  var pointerX = -80;
  var pointerY = -80;
  var cursorFrame = null;

  // The regular experience logos inherit the active site color. These values
  // are applied only to the cloned SVG inside the lens, revealing each
  // company's original identity without changing the page design.
  var originalLogoColors = {
    'ICS / Innovation Consulting & Solutions': ['#818285', '#27B6A9', '#27B6A9', '#02021E'],
    'Digital Wink LTD': ['#005DAC', '#005DAC'],
    'Variin': ['#000000', '#000000', '#4EB1BA'],
    'Larsa': ['#006CA2', '#006CA2', '#006CA2'],
    'Data Masher': ['#F10000', '#F10000'],
    'Workato': ['#67EADD'],
    'Digital Upgrade ME': ['#2E3192', '#FFCC66', '#2E3192', '#2E3192', '#FFCC66'],
    'Aktarr': ['#FE4296'],
    'Agenda': ['#185E65']
  };

  function clearMagnifier() {
    activeHeading = null;
    activeLogo = null;
    magnifierText.textContent = '';
    magnifierLogo.textContent = '';
    cursor.classList.remove('is-magnifier', 'is-logo-magnifier');
  }

  // Recreate only the active heading inside the circular lens. Positioning the
  // enlarged copy opposite the pointer makes the lens behave like a magnifier
  // without duplicating the page or reading unrelated content.
  function renderMagnifier(heading) {
    if (!heading) {
      clearMagnifier();
      return;
    }

    var bounds = heading.getBoundingClientRect();
    var styles = window.getComputedStyle(heading);
    var localX = pointerX - bounds.left;
    var localY = pointerY - bounds.top;

    if (activeHeading !== heading) {
      magnifierText.textContent = heading.textContent;
      activeHeading = heading;
      activeLogo = null;
      magnifierLogo.textContent = '';
    }

    magnifierText.style.width = bounds.width + 'px';
    magnifierText.style.fontFamily = styles.fontFamily;
    magnifierText.style.fontSize = styles.fontSize;
    magnifierText.style.fontStyle = styles.fontStyle;
    magnifierText.style.fontWeight = styles.fontWeight;
    magnifierText.style.lineHeight = styles.lineHeight;
    magnifierText.style.letterSpacing = styles.letterSpacing;
    magnifierText.style.textAlign = styles.textAlign;
    magnifierText.style.textTransform = styles.textTransform;
    magnifierText.style.whiteSpace = styles.whiteSpace;
    magnifierText.style.direction = styles.direction;
    magnifierText.style.color = styles.color;
    magnifierText.style.padding = styles.padding;
    magnifierText.style.transform = 'translate3d(' +
      (magnifierSize / 2 - localX * magnifierZoom) + 'px,' +
      (magnifierSize / 2 - localY * magnifierZoom) + 'px,0) scale(' + magnifierZoom + ')';

    cursor.classList.remove('is-logo-magnifier');
    cursor.classList.add('is-magnifier');
  }

  function renderLogoMagnifier(logo) {
    if (!logo) {
      clearMagnifier();
      return;
    }

    if (activeLogo !== logo) {
      var sourceSvg = logo.querySelector('svg');
      var item = logo.closest('.item');
      var company = item ? item.querySelector('.company') : null;
      var companyName = company ? company.textContent.trim() : '';
      var colors = originalLogoColors[companyName];

      magnifierLogo.textContent = '';
      magnifierText.textContent = '';
      activeHeading = null;
      activeLogo = logo;

      if (sourceSvg) {
        var logoClone = sourceSvg.cloneNode(true);
        logoClone.removeAttribute('width');
        logoClone.removeAttribute('height');

        // The visible Variin mark uses two monochrome shapes. Restore the
        // cyan overlap that completes the original-color version in the lens.
        if (companyName === 'Variin' && logoClone.querySelectorAll('path').length === 2) {
          var accentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          accentPath.setAttribute('d', 'M31.9849 35.3291H42.4899L44.8711 29.7646H30.8711L31.2456 31.7635L31.6105 33.5979L31.7833 34.5047L31.8697 34.9581L31.9849 35.3291Z');
          logoClone.appendChild(accentPath);
        }

        if (colors) {
          logoClone.querySelectorAll('path').forEach(function (path, index) {
            path.setAttribute('fill', colors[index] || colors[colors.length - 1]);
          });
        }

        if (companyName === 'Agenda') {
          var agendaPath = logoClone.querySelector('path');
          if (agendaPath) {
            agendaPath.setAttribute('stroke', '#034881');
            agendaPath.setAttribute('stroke-width', '2');
          }
        }

        magnifierLogo.appendChild(logoClone);
      }
    }

    cursor.classList.add('is-magnifier', 'is-logo-magnifier');
  }

  function renderCursor() {
    cursor.style.setProperty('--site-cursor-x', pointerX + 'px');
    cursor.style.setProperty('--site-cursor-y', pointerY + 'px');
    if (pendingLogo) {
      renderLogoMagnifier(pendingLogo);
    } else {
      renderMagnifier(pendingHeading);
    }
    cursorFrame = null;
  }

  function hideCursor() {
    pendingHeading = null;
    pendingLogo = null;
    clearMagnifier();
    cursor.classList.remove('is-visible', 'is-interactive', 'is-pressed');
  }

  function isNativeCursorTarget(target) {
    return Boolean(target.closest(
      'input, textarea, select, iframe, [contenteditable="true"], ' +
      '.project-card--dual [data-project-cursor-zone]'
    ));
  }

  function isInteractiveTarget(target) {
    return Boolean(target.closest(
      'a, button, label, summary, [role="button"], [data-cursor="interactive"]'
    ));
  }

  document.addEventListener('pointermove', function (event) {
    if (event.pointerType && event.pointerType !== 'mouse') {
      hideCursor();
      return;
    }

    var target = event.target instanceof Element ? event.target : null;
    if (!target || isNativeCursorTarget(target)) {
      hideCursor();
      return;
    }

    pointerX = event.clientX;
    pointerY = event.clientY;
    // Experience-logo lenses are homepage-only. Their SVG clone is recolored
    // with the original palette while the visible logo remains theme-aware.
    pendingLogo = isCaseStudyPage ? null : target.closest('.section.background .logo');
    // Use the same magnifying-lens treatment for H2 headings across the
    // homepage and case-study pages in both languages.
    pendingHeading = pendingLogo ? null : target.closest('h2');
    cursor.classList.toggle('is-interactive', !pendingLogo && !pendingHeading && isInteractiveTarget(target));
    cursor.classList.add('is-visible');

    if (!cursorFrame) {
      cursorFrame = window.requestAnimationFrame(renderCursor);
    }
  }, { passive: true });

  document.addEventListener('pointerdown', function (event) {
    if (!event.pointerType || event.pointerType === 'mouse') {
      cursor.classList.add('is-pressed');
    }
  }, { passive: true });

  document.addEventListener('pointerup', function () {
    cursor.classList.remove('is-pressed');
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', hideCursor);
  window.addEventListener('blur', hideCursor);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      hideCursor();
    }
  });
}());

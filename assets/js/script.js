

// Script
//------------------------------------------------------------------------------
var homepageCompactNavigation;
var mobileNavCloseTimer;

function setLanguage(lang) {

const currentPage = window.location.pathname.split("/").pop();

if (currentPage === "index.html" || currentPage === "") {
  document.getElementById("btn-en").classList.add("active");
} else if (currentPage === "index-ar.html") {
  document.getElementById("btn-ar").classList.add("active");
}

  // ... (rest of code above)
}

// Load saved language on page load
window.onload = function() {
  const savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);
};

$(document).ready(function() {
  // console.log('ready!');

  // Reset the window scroll position to top on every page load and re-load
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }

  // Fix touch device touch events
  // One bubbling listener retains the legacy touch-hover workaround without
  // allocating a jQuery event record on every element (including SVG paths).
  document.body.addEventListener('touchstart', function () {}, { passive: true });

  // Set the copyright to the current year in local time
  var currentYear = new Date().getFullYear();
  $('.copyright .year').html(currentYear);
  // console.log('Current year is ' + currentYear);
  // console.log('Setting copyright accordingly');

  // Keep the native details semantics while allowing the FAQ answers to finish
  // their closing motion before the browser removes them from the layout.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.faq__item').forEach(function(item) {
      var summary = item.querySelector('summary');
      var answer = item.querySelector('.faq__answer');
      var isAnimating = false;

      if (!summary || !answer) {
        return;
      }

      function clearAnswerStyles() {
        answer.style.removeProperty('max-height');
        answer.style.removeProperty('opacity');
        answer.style.removeProperty('transform');
        item.classList.remove('is-opening', 'is-closing');
        isAnimating = false;
      }

      function finishOnHeightTransition(callback) {
        function handleTransitionEnd(event) {
          if (event.target !== answer || event.propertyName !== 'max-height') {
            return;
          }

          answer.removeEventListener('transitionend', handleTransitionEnd);
          callback();
        }

        answer.addEventListener('transitionend', handleTransitionEnd);
      }

      function openAnswer() {
        isAnimating = true;
        item.open = true;
        item.classList.add('is-opening');
        answer.style.maxHeight = '0px';
        answer.style.opacity = '0';
        answer.style.transform = 'translate3d(0, -8px, 0)';

        window.requestAnimationFrame(function() {
          window.requestAnimationFrame(function() {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            answer.style.transform = 'translate3d(0, 0, 0)';
          });
        });

        finishOnHeightTransition(clearAnswerStyles);
      }

      function closeAnswer() {
        isAnimating = true;
        item.classList.add('is-closing');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        answer.style.transform = 'translate3d(0, 0, 0)';
        answer.getBoundingClientRect();

        window.requestAnimationFrame(function() {
          answer.style.maxHeight = '0px';
          answer.style.opacity = '0';
          answer.style.transform = 'translate3d(0, -8px, 0)';
        });

        finishOnHeightTransition(function() {
          item.open = false;
          clearAnswerStyles();
        });
      }

      summary.addEventListener('click', function(event) {
        event.preventDefault();
        if (isAnimating) {
          return;
        }

        if (item.open) {
          closeAnswer();
        } else {
          openAnswer();
        }
      });
    });
  }

  // Duplicate each client-logo group once so the CSS translation loops without
  // a visible jump. The clone is hidden from assistive technology.
  $('.client-logo-marquee').each(function() {
    var $marquee = $(this);
    var $track = $marquee.find('.client-logo-marquee__track');
    var $group = $track.find('.client-logo-marquee__group').first();

    if ($group.length && $track.find('.client-logo-marquee__group').length === 1) {
      var $clone = $group.clone();
      $clone
        .addClass('client-logo-marquee__group--clone')
        .attr('aria-hidden', 'true')
        .removeAttr('role');
      $clone.find('[role="listitem"]').removeAttr('role');
      // Keep the decorative duplicate out of keyboard navigation.
      $clone.find('a').attr('tabindex', '-1');
      $clone.find('img').attr('alt', '');
      $track.append($clone);
      $marquee.addClass('is-ready');
    }
  });

  // Keep decorative loops at their current phase while outside the viewport.
  // A single observer owns all targets; no polling or extra animation loop.
  if ('IntersectionObserver' in window) {
    var ambientTargets = Array.from(document.querySelectorAll('.client-logo-marquee, .project-card__date, .look'));
    var ambientVisibility = new Map();
    function updateAmbientMotion(element) {
      element.classList.toggle('is-motion-paused', document.hidden || !ambientVisibility.get(element));
    }
    var ambientObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        ambientVisibility.set(entry.target, entry.isIntersecting);
        updateAmbientMotion(entry.target);
      });
    });
    function startAmbientMotion() {
      ambientTargets.forEach(function (element) { ambientObserver.observe(element); });
    }
    window.addEventListener('pagehide', function () { ambientObserver.disconnect(); });
    window.addEventListener('pageshow', startAmbientMotion);
    document.addEventListener('visibilitychange', function () { ambientTargets.forEach(updateAmbientMotion); });
    startAmbientMotion();
  }

  // Featured project cards can have two intentional destinations. A lightweight,
  // transform-only cursor follows the active text or image region while the
  // native links preserve keyboard access and expected browser behavior.
  document.querySelectorAll('[data-project-dual-card]').forEach(function(card) {
    var figure = card.querySelector('figure');
    var cursor = card.querySelector('.project-card__cursor');
    var cursorLabel = card.querySelector('[data-project-cursor-label]');
    var isArabic = document.documentElement.lang === 'ar';
    var cursorSize = 160;
    var pendingX = -cursorSize;
    var pendingY = -cursorSize;
    var cursorFrame = null;
    var pendingZone = null;
    var activeMode = null;
    var cursorMedia = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

    if (!figure || !cursor || !cursorLabel) {
      return;
    }

    function renderProjectCursor() {
      cursorFrame = null;
      if (!pendingZone || !cursorMedia.matches || document.hidden) { return; }
      // Read geometry once per paint, before any cursor DOM writes. Keeping
      // this read live also handles scrolling/resizing during the interaction.
      var bounds = figure.getBoundingClientRect();
      var x = Math.max(8, Math.min(bounds.width - cursorSize - 8, pendingX - bounds.left - cursorSize / 2));
      var y = Math.max(8, Math.min(bounds.height - cursorSize - 8, pendingY - bounds.top - cursorSize / 2));
      var mode = pendingZone.getAttribute('data-project-cursor-zone');
      if (mode !== activeMode) {
        cursorLabel.textContent = mode === 'live'
          ? (card.getAttribute('data-project-live-label') || (isArabic ? 'عرض مباشر' : 'View live'))
          : (isArabic ? 'عرض الحالة' : 'View case');
        card.classList.toggle('is-project-cursor-live', mode === 'live');
        activeMode = mode;
      }
      cursor.style.setProperty('--project-cursor-x', x + 'px');
      cursor.style.setProperty('--project-cursor-y', y + 'px');
      if (!card.classList.contains('is-project-cursor-visible')) {
        card.classList.add('is-project-cursor-visible');
      }
    }

    function hideProjectCursor() {
      window.cancelAnimationFrame(cursorFrame);
      cursorFrame = null;
      pendingZone = null;
      activeMode = null;
      if (card.classList.contains('is-project-cursor-visible') || card.classList.contains('is-project-cursor-live')) {
        card.classList.remove('is-project-cursor-visible', 'is-project-cursor-live');
      }
    }

    figure.addEventListener('pointermove', function(event) {
      if (!cursorMedia.matches || (event.pointerType && event.pointerType !== 'mouse')) {
        hideProjectCursor();
        return;
      }

      var zone = event.target.closest('[data-project-cursor-zone]');
      if (!zone || !card.contains(zone) || zone.closest('.project-card__actions')) {
        hideProjectCursor();
        return;
      }

      pendingZone = zone;
      pendingX = event.clientX;
      pendingY = event.clientY;

      if (!cursorFrame) {
        cursorFrame = window.requestAnimationFrame(renderProjectCursor);
      }
    }, { passive: true });

    figure.addEventListener('pointerleave', hideProjectCursor, { passive: true });
    cursorMedia.addEventListener('change', hideProjectCursor);
    window.addEventListener('blur', hideProjectCursor);
    window.addEventListener('pagehide', hideProjectCursor);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { hideProjectCursor(); }
    });
  });

  // Build the AI Summary deep links at runtime so the prompt stays readable and maintainable.
  var aiSummaryPrompts = {
    en: 'Review https://galalhelany.com/ and provide a concise, factual summary for someone considering working with Galal Helany. Explain: 1) the purpose of the website, 2) the services and expertise presented, 3) the main strengths and benefits, 4) relevant experience and project highlights, and 5) why a company or product team should consider working with him. Base the answer only on information available on the website, clearly distinguish facts from inference, and organize the response with short headings and bullet points.',
    ar: 'راجع موقع https://galalhelany.com/index-ar.html وقدّم ملخصًا عربيًا موجزًا وموضوعيًا لشخص يفكر في العمل مع جلال حيلاني. اشرح: 1) هدف الموقع، 2) الخدمات والخبرات المعروضة، 3) أبرز نقاط القوة والفوائد، 4) الخبرات والمشاريع المهمة، و5) لماذا قد ترغب شركة أو فريق منتجات في العمل معه. استند فقط إلى المعلومات الموجودة في الموقع، وميّز بوضوح بين الحقائق والاستنتاجات، ونظّم الإجابة بعناوين قصيرة ونقاط.'
  };

  // Gemini does not currently read regular prompt query parameters. Copying
  // inside the user's click keeps the workflow reliable, including on file://.
  function copyAiSummaryPrompt(text) {
    // Try the synchronous path first so the copy completes before the link
    // opens Gemini in a new tab. This also works for locally opened file:// pages.
    var fallbackCopied = copyAiSummaryPromptFallback(text);

    // On secure origins, also use the modern Clipboard API. Running both paths
    // avoids browser-specific false positives from the legacy copy command.
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function() {
        return true;
      }).catch(function() {
        return fallbackCopied;
      });
    }

    return Promise.resolve(fallbackCopied);
  }

  function copyAiSummaryPromptFallback(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  }

  function showAiSummaryFeedback($summary, message) {
    var previousTimer = $summary.data('ai-feedback-timer');
    window.clearTimeout(previousTimer);
    $summary.find('.ai-summary__feedback').text(message);

    var timer = window.setTimeout(function() {
      $summary.find('.ai-summary__feedback').text('');
    }, 7000);
    $summary.data('ai-feedback-timer', timer);
  }

  $('.ai-summary').each(function() {
    var $summary = $(this);
    var language = $summary.data('ai-language') || 'en';
    var prompt = aiSummaryPrompts[language] || aiSummaryPrompts.en;

    $summary.find('.ai-summary__link').each(function() {
      var baseUrl = this.getAttribute('data-ai-url');
      var modelName = this.getAttribute('data-ai-name');

      if (baseUrl) {
        this.href = baseUrl + encodeURIComponent(prompt);
      }

      if (modelName === 'Gemini') {
        var feedbackMessage = language === 'ar'
          ? 'تم نسخ الـ Prompt — الصقه في Gemini باستخدام Ctrl+V أو ⌘V.'
          : 'Prompt copied — paste it in Gemini with Ctrl+V or ⌘V.';

        this.setAttribute(
          'title',
          language === 'ar' ? 'ينسخ الـ Prompt ثم يفتح Gemini' : 'Copies the prompt, then opens Gemini'
        );

        $(this).on('click', function() {
          copyAiSummaryPrompt(prompt).then(function(copied) {
            showAiSummaryFeedback(
              $summary,
              copied ? feedbackMessage : (language === 'ar' ? 'تعذّر النسخ التلقائي؛ انسخ الـ Prompt يدويًا.' : 'Automatic copy was blocked; copy the prompt manually.')
            );
          });
        });
      }
    });
  });

  // Detect if user prefers dark mode and make it dark
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if ( $('body').hasClass('theme--16') ){
         appThemeRemoveAll();
         $('body').addClass('theme--00');
         $('.app-aside .slider').val(0);
    }
  }

  // Auto hide app cover on load
  function hideAppCoverDelay() {
    // window.setTimeout(hideAppCover, 1500);
    window.setTimeout(hideAppCover, 1750);
  }
  function hideAppCover() {
    $('body').removeClass('cover--is--visible');
  }
  hideAppCoverDelay();

  // Auto remove body loading class to have a hook to prevent UI bugs
  function removeLoadingClassDelay() {
    window.setTimeout(removeLoadingClass, 3250);
  }
  function removeLoadingClass() {
    $('body').removeClass('is--loading');
    window.dispatchEvent(new Event('homepage-ready'));
  }
  removeLoadingClassDelay();

  // Scroll to Contact from app header
  $('.app-header .contact').click(function() {
    scrollToContact();
  });

  // Scroll to Intro from app nav
  $('.app-nav .item.intro').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToIntro, 300);
      }
      scrollDelay();
    }
    else {
      scrollToIntro();
    }
  });

  // Scroll to Values from app nav
  $('.app-nav .item.values').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToValues, 300);
      }
      scrollDelay();
    }
    else {
      scrollToValues();
    }
  });

  // Scroll to Background from app nav
  $('.app-nav .item.background').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToBackground, 300);
      }
      scrollDelay();
    }
    else {
      scrollToBackground();
    }
  });

  // Scroll to References from app nav
  $('.app-nav .item.references').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToReferences, 300);
      }
      scrollDelay();
    }
    else {
      scrollToReferences();
    }
  });

  // Scroll to Before We Work Together from app nav
  $('.app-nav .item.faq').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToFaq, 300);
      }
      scrollDelay();
    }
    else {
      scrollToFaq();
    }
  });

  // Scroll to Work from app nav
  $('.app-nav .item.work').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToWork, 300);
      }
      scrollDelay();
    }
    else {
      scrollToWork();
    }
  });

  // Independent products share the existing navigation timing and easing.
  $('.app-nav .item.independent-products').click(function() {
    if ($('body').hasClass('mobile-nav--is--visible')) {
      window.setTimeout(scrollToIndependentProducts, 300);
    } else {
      scrollToIndependentProducts();
    }
  });

  // Scroll to About from app nav
  $('.app-nav .item.about').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToAbout, 300);
      }
      scrollDelay();
    }
    else {
      scrollToAbout();
    }
  });

  // Scroll to Contact from app nav
  $('.app-nav .item.contact').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToContact, 300);
      }
      scrollDelay();
    }
    else {
      scrollToContact();
    }
  });

  // Mobile nav trigger
  $('.app-header .navigation').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      closeMobileNav();
    }
    else {
      openMobileNav();
    }
  });

  $('.app-header .navigation').on('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      $(this).trigger('click');
    }
  });

  // Close mobile nav from app nav item
  $('.app-nav .item').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      closeMobileNav();
    }
  });

  // Auto hide app nav on window resize to prevent visibility bugs
  $(window).on( 'resize', function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      closeMobileNav();
    }
  });

  // Make theme slider visible on hover on no touch devices
  $('html.no-touchevents .option.theme').mouseenter(function() {
    $('body').addClass('theme-slider--is--visible');
  });
  $('html.no-touchevents .option.theme').mouseleave(function() {
    $('body').removeClass('theme-slider--is--visible');
  });

  // Make theme slider visible on tap on touch devices
  $('html.touchevents .option.theme').click(function() {
    $('body').addClass('theme-slider--is--visible');
    // alert('option tapped');
  });
  // Make theme slider invisible if anything besides the slider is tapped
  $('html.touchevents').click(function(event) {
    if (!$(event.target).closest('.option.theme').length) {
      $('body').removeClass('theme-slider--is--visible');
    }
  });

  // Theme slider
  $('.app-aside .slider').on('input', function() {
    var sliderValue = $(this).val();

    // put in a leading zero
    if ( sliderValue < 10 ){
      sliderValue = 0 + sliderValue;
    }
    // console.log(sliderValue);

    // detect and remove class names that start with 'theme--'
    appThemeRemoveAll();

    // add new class name
    $('body').addClass('theme--' + sliderValue);
  });

  // Grid overlay
  $('.option.grid').click(function() {
    appGridOverlay();
  });

  // Intro section options
  $('.section.intro .options').scroll(function() {
    var introOptionsScrollLeft = $('.section.intro .options').scrollLeft();
    if ( introOptionsScrollLeft > 0 ){
      $('.section.intro .gradient-mask.left').addClass('is--visible');
    }
    else {
      $('.section.intro .gradient-mask.left').removeClass('is--visible');
    }
  });
  $('.section.intro .option').click(function() {
    $('.section.intro .option').removeClass('is--active');
    $('.section.intro .text').removeClass('is--visible');
  });
  $('.section.intro .option.anyone').click(function() {
    $('.section.intro .option.anyone').addClass('is--active');
    $('.section.intro .text.anyone').addClass('is--visible');
  });
  $('.section.intro .option.recruiters').click(function() {
    $('.section.intro .option.recruiters').addClass('is--active');
    $('.section.intro .text.recruiters').addClass('is--visible');
  });
  $('.section.intro .option.design-directors').click(function() {
    $('.section.intro .option.design-directors').addClass('is--active');
    $('.section.intro .text.design-directors').addClass('is--visible');
  });
  $('.section.intro .option.product-designers').click(function() {
    $('.section.intro .option.product-designers').addClass('is--active');
    $('.section.intro .text.product-designers').addClass('is--visible');
  });
  $('.section.intro .option.product-managers').click(function() {
    $('.section.intro .option.product-managers').addClass('is--active');
    $('.section.intro .text.product-managers').addClass('is--visible');
  });
  $('.section.intro .option.engineers').click(function() {
    $('.section.intro .option.engineers').addClass('is--active');
    $('.section.intro .text.engineers').addClass('is--visible');
  });

  // Audience controls in both languages reuse click behavior on the keyboard.
  $('.section.intro .option[role="button"]').on('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      $(this).trigger('click');
    }
  }).on('click', function() {
    $('.section.intro .option[role="button"]').attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');
  });

  // Scroll to Contact from text links in sections
  $('.section a.contact').click(function() {
    scrollToContact();
  });

}); // End document ready



// Keyboard Shortcuts
// reference https://www.w3.org/2002/09/tests/keys.html
$(document).keydown(function(key) {

    switch(parseInt(key.which,10)) {

      // 'g' key pressed
      case 71:
        // console.log('g key pressed');
        appGridOverlay();
        break;

      // ';' key pressed
      case 186:
        // console.log('; key pressed');
        appGridOverlay();
        break;

      // 'w' key pressed
      case 87:
        // console.log('w key pressed');
        appTheme();
        break;

      // 'b' key pressed
      case 66:
        // console.log('b key pressed');
        appTheme();
        break;

      // 's' key pressed
      case 83:
        // console.log('s key pressed');
        appThemeSpectrum();
        break;
    }
});

// Keep the existing duration/easing, but a new destination replaces old work.
function animatePageScroll(top) {
  var duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 750;
  $('html, body').stop(true).animate({ scrollTop: top }, duration, 'easeOutCubic');
}

// Native scrolling should also interrupt a pending programmatic journey.
window.addEventListener('wheel', function () { $('html, body').stop(true); }, { passive: true });
window.addEventListener('touchstart', function () { $('html, body').stop(true); }, { passive: true });
window.addEventListener('pagehide', function () { $('html, body').stop(true); });
document.addEventListener('keydown', function (event) {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].indexOf(event.key) !== -1) {
    $('html, body').stop(true);
  }
});

// Scroll to Intro
function scrollToIntro() {
  // $('html, body').animate({ scrollTop: $('.section.intro').offset().top }, 750, 'easeOutCubic');
  animatePageScroll(0);
}

// Scroll to Values
function scrollToValues() {
  // $('html, body').animate({ scrollTop: $('.section.values').offset().top - 90 }, 750, 'easeOutCubic');
  animatePageScroll($('.section.values').offset().top);
}

// Scroll to Background
function scrollToBackground() {
  animatePageScroll($('.section.background').offset().top);
}

// Scroll to References
function scrollToReferences() {
  animatePageScroll($('.section.references').offset().top);
}

// Scroll to Before We Work Together
function scrollToFaq() {
  animatePageScroll($('.section.faq').offset().top);
}

// Scroll to Work
function scrollToWork() {
  animatePageScroll($('.section.work').offset().top);
}

function scrollToIndependentProducts() {
  animatePageScroll($('#things-ive-built').offset().top);
}

// Scroll to About
function scrollToAbout() {
  animatePageScroll($('.section.about').offset().top);
}

// Scroll to Contact
function scrollToContact() {

  var pageHeight = $(document).height();
  var viewportHeight = $(window).height();

  var sectionContact = $('.app-main .section.contact')
  var sectionContactHeight = sectionContact.height();
  var sectionContactTop = sectionContact.offset().top;

  if ( sectionContactHeight > viewportHeight ) {
    animatePageScroll(sectionContactTop);
  }
  else {
    animatePageScroll(pageHeight - viewportHeight);
  }

}

// Open mobile nav
function openMobileNav() {
  window.clearTimeout(mobileNavCloseTimer);
  $('.app-header .navigation').attr('aria-expanded', 'true');
  $('body').addClass('mobile-nav--is--transitioning');
  function addVisibleClassDelay() {
    window.setTimeout(addVisibleClass, 1);
  }
  function addVisibleClass() {
    $('body').addClass('mobile-nav--is--visible');
    if (homepageCompactNavigation) { homepageCompactNavigation.refresh(); }
  }
  addVisibleClassDelay();
}

// Close mobile nav
function closeMobileNav() {
  window.clearTimeout(mobileNavCloseTimer);
  $('.app-header .navigation').attr('aria-expanded', 'false');
  $('body').removeClass('mobile-nav--is--visible');
  function removeTransitioningClassDelay() {
    mobileNavCloseTimer = window.setTimeout(removeTransitioningClass, 500);
  }
  function removeTransitioningClass() {
    $('body').removeClass('mobile-nav--is--transitioning');
  }
  removeTransitioningClassDelay();
}

// detect and remove class names that start with 'theme--'
function appThemeRemoveAll() {
  $('body').removeClass(function (index, themeClassName) {
    return (themeClassName.match (/(^|\s)theme--\S+/g) || []).join(' ');
  });
}

// Toggle between black and white themes
function appTheme() {
  if ( $('body').hasClass('theme--00') ){
    appThemeRemoveAll();
    $('body').addClass('theme--16');
    $('.app-aside .slider').val(16);
  }
  else {
       appThemeRemoveAll();
       $('body').addClass('theme--00');
       $('.app-aside .slider').val(0);
  }
}

// Cycle through all themes
function appThemeSpectrum() {
  if ( $('body').hasClass('theme--16') ){
       appThemeRemoveAll();
       $('body').addClass('theme--15');
       $('.app-aside .slider').val(15);
  }
  else if ( $('body').hasClass('theme--15') ){
            appThemeRemoveAll();
            $('body').addClass('theme--14');
            $('.app-aside .slider').val(14);
  }
  else if ( $('body').hasClass('theme--14') ){
            appThemeRemoveAll();
            $('body').addClass('theme--13');
            $('.app-aside .slider').val(13);
  }
  else if ( $('body').hasClass('theme--13') ){
            appThemeRemoveAll();
            $('body').addClass('theme--12');
            $('.app-aside .slider').val(12);
  }
  else if ( $('body').hasClass('theme--12') ){
            appThemeRemoveAll();
            $('body').addClass('theme--11');
            $('.app-aside .slider').val(11);
  }
  else if ( $('body').hasClass('theme--11') ){
            appThemeRemoveAll();
            $('body').addClass('theme--10');
            $('.app-aside .slider').val(10);
  }
  else if ( $('body').hasClass('theme--10') ){
            appThemeRemoveAll();
            $('body').addClass('theme--09');
            $('.app-aside .slider').val(9);
  }
  else if ( $('body').hasClass('theme--09') ){
            appThemeRemoveAll();
            $('body').addClass('theme--08');
            $('.app-aside .slider').val(8);
  }
  else if ( $('body').hasClass('theme--08') ){
            appThemeRemoveAll();
            $('body').addClass('theme--07');
            $('.app-aside .slider').val(7);
  }
  else if ( $('body').hasClass('theme--07') ){
            appThemeRemoveAll();
            $('body').addClass('theme--06');
            $('.app-aside .slider').val(6);
  }
  else if ( $('body').hasClass('theme--06') ){
            appThemeRemoveAll();
            $('body').addClass('theme--05');
            $('.app-aside .slider').val(5);
  }
  else if ( $('body').hasClass('theme--05') ){
            appThemeRemoveAll();
            $('body').addClass('theme--04');
            $('.app-aside .slider').val(4);
  }
  else if ( $('body').hasClass('theme--04') ){
            appThemeRemoveAll();
            $('body').addClass('theme--03');
            $('.app-aside .slider').val(3);
  }
  else if ( $('body').hasClass('theme--03') ){
            appThemeRemoveAll();
            $('body').addClass('theme--02');
            $('.app-aside .slider').val(2);
  }
  else if ( $('body').hasClass('theme--02') ){
            appThemeRemoveAll();
            $('body').addClass('theme--01');
            $('.app-aside .slider').val(1);
  }
  else if ( $('body').hasClass('theme--01') ){
            appThemeRemoveAll();
            $('body').addClass('theme--00');
            $('.app-aside .slider').val(0);
  }
  else if ( $('body').hasClass('theme--00') ){
            appThemeRemoveAll();
            $('body').addClass('theme--16');
            $('.app-aside .slider').val(16);
  }
}

// Grid overlay
function appGridOverlay() {
  $('.app-grid-overlay').toggleClass('is--visible');
}

// Sidebar section tracking: existing click handlers still own smooth scrolling.
$(function () {
  // Select by document order at one reading line, never observer callback order.
  // Keep the preceding destination active through unlinked editorial interludes.
  function trackSidebarNavigation(items, options) {
    items = items.filter(function (item) { return item.section; }).sort(function (a, b) {
      if (a.section === b.section) { return 0; }
      return a.section.compareDocumentPosition(b.section) & 2 ? 1 : -1;
    });
    var observer;
    var frame;
    var readingLine;
    var pendingLink;
    var pendingTimer;

    function select(link) {
      var changed = link && link.getAttribute('aria-current') !== 'location';
      items.forEach(function (item) {
        var active = item.link === link && !item.link.hidden;
        item.link.classList.toggle('is--active', active);
        if (active) {
          item.link.setAttribute('aria-current', 'location');
        } else {
          item.link.removeAttribute('aria-current');
        }
      });
      if (changed && options.onActiveChange) { options.onActiveChange(link); }
    }

    function clearPending() {
      window.clearTimeout(pendingTimer);
      pendingLink = null;
    }

    function update() {
      frame = null;
      var visible = items.filter(function (item) {
        return !item.link.hidden && !item.section.hidden && item.section.getClientRects().length;
      });
      if (!visible.length) { return; }
      var current = visible[0];
      visible.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= readingLine + 2) { current = item; }
      });
      if (window.scrollY > 2 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = visible[visible.length - 1];
      }
      if (pendingLink && visible.some(function (item) { return item.link === pendingLink; })) {
        if (current.link !== pendingLink) { return; }
      }
      clearPending();
      select(current.link);
    }

    function schedule() {
      if (!frame) { frame = window.requestAnimationFrame(update); }
    }

    function rebuild() {
      var height = Math.max(4, window.innerHeight);
      var clearance = 0;
      if (options.anchorClearance && items.length) {
        clearance = (parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0) +
          (parseFloat(window.getComputedStyle(items[0].section).scrollMarginTop) || 0);
      }
      readingLine = Math.floor(Math.min(height - 2, Math.max(height * 0.3, clearance + 2)));
      if ('IntersectionObserver' in window) {
        if (observer) { observer.disconnect(); }
        observer = new IntersectionObserver(schedule, {
          rootMargin: '-' + readingLine + 'px 0px -' + (height - readingLine - 2) + 'px 0px',
          threshold: 0
        });
        items.forEach(function (item) { observer.observe(item.section); });
      }
      schedule();
    }

    function activate(link) {
      clearPending();
      pendingLink = link;
      select(link);
      // Hold the clicked destination during smooth travel, including the mobile delay.
      pendingTimer = window.setTimeout(function () { clearPending(); schedule(); }, 1500);
    }

    function cancelPending() {
      if (pendingLink) { clearPending(); schedule(); }
    }
    window.addEventListener('wheel', cancelPending, { passive: true });
    window.addEventListener('touchstart', cancelPending, { passive: true });
    document.addEventListener('keydown', function (event) {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].indexOf(event.key) !== -1) {
        cancelPending();
      }
    });
    window.addEventListener('resize', rebuild, { passive: true });
    window.addEventListener('load', schedule, { once: true });
    if ('IntersectionObserver' in window && items.length) {
      // A short final section may never reach the reading line before page end.
      var endObserver = new IntersectionObserver(schedule, { threshold: [0, 1] });
      endObserver.observe(options.footer || items[items.length - 1].section);
    } else {
      // Only browsers without IntersectionObserver need a scroll listener.
      window.addEventListener('scroll', schedule, { passive: true });
    }
    rebuild();
    return { activate: activate, refresh: schedule };
  }
  var items = Array.from(document.querySelectorAll('.app-nav .item[href^="#"]')).map(function (link) {
    return {
      link: link,
      // #hello belongs to the transient cover; track the persistent intro instead.
      section: link.classList.contains('intro') ? document.querySelector('.section.intro') :
        document.getElementById(link.getAttribute('href').slice(1))
    };
  });
  homepageCompactNavigation = window.createCompactNavigationViewport({
    nav: document.querySelector('.app-nav'),
    propertyTarget: document.body,
    propertyPrefix: '--home-compact',
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });
  var tracking = trackSidebarNavigation(items, {
    onActiveChange: function(link) { homepageCompactNavigation.reveal(link, false); }
  });
  items.forEach(function (item) {
    item.link.addEventListener('click', function (event) {
      if (!item.section) { return; }
      // Avoid a native hash jump competing with the existing jQuery smooth scroll.
      event.preventDefault();
      var destination = item.link.getAttribute('href');
      if (window.history.pushState && window.location.hash !== destination) {
        window.history.pushState(null, '', destination);
      }
      tracking.activate(item.link);
    });
  });

  // Restore this new destination on deep links and Back/Forward navigation.
  // Existing destinations keep their current page-load and scrolling behavior.
  function restoreIndependentProducts() {
    if (window.location.hash === '#things-ive-built' && !document.body.classList.contains('is--loading')) {
      var section = document.getElementById('things-ive-built');
      if (section) {
        window.scrollTo(0, section.offsetTop);
        tracking.refresh();
      }
    }
  }
  window.addEventListener('pageshow', restoreIndependentProducts);
  window.addEventListener('homepage-ready', restoreIndependentProducts);
  window.addEventListener('popstate', restoreIndependentProducts);
  window.addEventListener('hashchange', restoreIndependentProducts);
  if (document.fonts) { document.fonts.ready.then(restoreIndependentProducts); }
});

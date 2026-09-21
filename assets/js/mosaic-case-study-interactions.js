(function () {
  'use strict';

  var article = document.querySelector('.case-study-article[data-mosaic-static-content]');
  if (!article) {
    return;
  }

  var isArabic = document.documentElement.lang === 'ar';
  document.body.setAttribute('data-case-study-project', 'mosaic-erp');

  function initializeMosaicWorkflowTabs(gallery) {
    if (!gallery) {
      return;
    }

    var tabs = Array.prototype.slice.call(gallery.querySelectorAll('[data-mosaic-gallery-tab]'));
    var panels = Array.prototype.slice.call(gallery.querySelectorAll('[data-mosaic-gallery-panel]'));
    var emptyState = gallery.querySelector('[data-mosaic-gallery-empty]');
    var emptyTitle = gallery.querySelector('[data-mosaic-gallery-empty-title]');

    if (!tabs.length || !panels.length || !emptyState || !emptyTitle) {
      return;
    }

    function selectTab(selectedTab, moveFocus) {
      var selectedSet = selectedTab.getAttribute('data-mosaic-gallery-tab');
      var selectedPanel = null;

      tabs.forEach(function (tab) {
        var isSelected = tab === selectedTab;
        tab.classList.toggle('is-active', isSelected);
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });

      panels.forEach(function (panel) {
        var isSelected = panel.getAttribute('data-mosaic-gallery-panel') === selectedSet;
        panel.hidden = !isSelected;
        if (isSelected) {
          selectedPanel = panel;
        }
      });

      gallery.setAttribute('data-active-gallery-set', selectedSet);
      emptyState.hidden = Boolean(selectedPanel);
      emptyTitle.textContent = selectedTab.textContent.trim();

      if (moveFocus) {
        selectedTab.focus();
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        selectTab(tab, false);
      });

      tab.addEventListener('keydown', function (event) {
        var nextIndex = index;
        if (event.key === 'ArrowRight') {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft') {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        selectTab(tabs[nextIndex], true);
      });
    });
  }

  function initializeMosaicAuditCarousel(carousel) {
    if (!carousel) {
      return;
    }

    var viewport = carousel.querySelector('[data-mosaic-audit-viewport]');
    var track = carousel.querySelector('[data-mosaic-audit-track]');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-mosaic-audit-slide]'));
    var zoomButtons = Array.prototype.slice.call(carousel.querySelectorAll('[data-mosaic-audit-zoom]'));
    var previousButton = carousel.querySelector('[data-mosaic-audit-previous]');
    var nextButton = carousel.querySelector('[data-mosaic-audit-next]');
    var currentLabel = carousel.querySelector('[data-mosaic-audit-current]');
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var carouselLabel = carousel.getAttribute('data-mosaic-carousel-label') || carousel.getAttribute('aria-label') || 'Mosaic image gallery';
    var activeIndex = 0;
    var autoTimer = null;
    var pointerStartX = null;
    var isVisible = !('IntersectionObserver' in window);
    var hasRendered = false;
    var isHovered = false;
    var hasFocus = false;

    if (!viewport || !track || !slides.length || !previousButton || !nextButton) {
      return;
    }

    function loadSlide(index) {
      var slide = slides[(index + slides.length) % slides.length];
      var image = slide ? slide.querySelector('img[data-src]') : null;
      if (image && !image.getAttribute('src')) {
        image.src = image.getAttribute('data-src');
      }
    }

    function render(nextIndex) {
      hasRendered = true;
      activeIndex = (nextIndex + slides.length) % slides.length;
      loadSlide(activeIndex);
      loadSlide(activeIndex + 1);
      track.style.transform = 'translate3d(' + (activeIndex * -100) + '%, 0, 0)';
      slides.forEach(function (slide, index) {
        slide.setAttribute('aria-hidden', String(index !== activeIndex));
        var zoomButton = slide.querySelector('[data-mosaic-audit-zoom]');
        if (zoomButton) {
          zoomButton.tabIndex = index === activeIndex ? 0 : -1;
        }
      });
      if (currentLabel) {
        currentLabel.textContent = String(activeIndex + 1).padStart(2, '0');
      }
    }

    function canAutoPlay() {
      return slides.length > 1 && !reducedMotion && !isHovered && !hasFocus && isVisible && !document.hidden;
    }

    function scheduleAutoPlay() {
      window.clearTimeout(autoTimer);
      autoTimer = null;
      if (!canAutoPlay()) {
        return;
      }
      autoTimer = window.setTimeout(function () {
        render(activeIndex + 1);
        scheduleAutoPlay();
      }, 4500);
    }

    function showManual(nextIndex) {
      render(nextIndex);
      scheduleAutoPlay();
    }

    previousButton.addEventListener('click', function () {
      showManual(activeIndex - 1);
    });
    nextButton.addEventListener('click', function () {
      showManual(activeIndex + 1);
    });

    var lightboxItems = slides.map(function (slide) {
      var image = slide.querySelector('img');
      var caption = slide.querySelector('figcaption');
      return {
        src: image ? (image.getAttribute('src') || image.getAttribute('data-src')) : '',
        alt: image ? image.alt : '',
        caption: caption ? caption.textContent : '',
        width: image ? Number(image.getAttribute('width')) : 1440,
        height: image ? Number(image.getAttribute('height')) : 1024
      };
    });
    zoomButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        document.dispatchEvent(new CustomEvent('case-study:open-lightbox', {
          detail: {
            items: lightboxItems,
            index: index,
            language: 'en',
            label: carouselLabel,
            onChange: render
          }
        }));
      });
    });

    viewport.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showManual(activeIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showManual(activeIndex + 1);
      }
    });
    viewport.addEventListener('pointerdown', function (event) {
      if (event.isPrimary) {
        pointerStartX = event.clientX;
      }
    }, { passive: true });
    viewport.addEventListener('pointerup', function (event) {
      if (pointerStartX === null || !event.isPrimary) {
        return;
      }
      var distance = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(distance) >= 48) {
        showManual(activeIndex + (distance < 0 ? 1 : -1));
      }
    }, { passive: true });
    viewport.addEventListener('pointercancel', function () {
      pointerStartX = null;
    }, { passive: true });

    carousel.addEventListener('mouseenter', function () {
      isHovered = true;
      scheduleAutoPlay();
    });
    carousel.addEventListener('mouseleave', function () {
      isHovered = false;
      scheduleAutoPlay();
    });
    carousel.addEventListener('focusin', function () {
      hasFocus = true;
      scheduleAutoPlay();
    });
    carousel.addEventListener('focusout', function (event) {
      if (!carousel.contains(event.relatedTarget)) {
        hasFocus = false;
        scheduleAutoPlay();
      }
    });
    document.addEventListener('visibilitychange', scheduleAutoPlay);

    if ('IntersectionObserver' in window) {
      var carouselObserver = new IntersectionObserver(function (entries) {
        isVisible = entries.some(function (entry) { return entry.isIntersecting; });
        if (isVisible && !hasRendered) {
          render(0);
        }
        scheduleAutoPlay();
      }, { rootMargin: '600px 0px', threshold: 0.01 });
      carouselObserver.observe(carousel);
    } else {
      render(0);
    }

    scheduleAutoPlay();
  }

  function initializeMosaicIaFlow() {
    var flow = article.querySelector('[data-mosaic-ia-flow]');
    var sitemap = article.querySelector('[data-mosaic-sitemap]');
    if (!flow || !sitemap) {
      return;
    }

    var branches = Array.prototype.slice.call(sitemap.querySelectorAll('details'));
    var title = flow.querySelector('[data-mosaic-ia-title]');
    var branchLabel = flow.querySelector('[data-mosaic-ia-branch]');
    var path = flow.querySelector('[data-mosaic-ia-path]');
    var children = flow.querySelector('[data-mosaic-ia-children]');
    var destination = flow.querySelector('[data-mosaic-ia-destination]');
    var description = flow.querySelector('[data-mosaic-ia-description]');
    var activeBranch = '';

    function setFlowVisible(isVisible) {
      flow.classList.toggle('is-collapsed', !isVisible);
      flow.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      flow.toggleAttribute('inert', !isVisible);
    }

    var descriptions = {
      'Overview': {
        'Dashboard': 'The operational overview and main entry point for daily work.',
        'KPIs': 'Key operational signals that help teams see what needs attention.',
        'Recent Projects': 'Fast access to active and recently viewed project work.',
        'Alerts': 'Exceptions, risks, and pending items that require attention.',
        'Quick Actions': 'Shortcuts to frequent tasks and common starting points.'
      },
      'Projects': {
        'All Projects': 'A complete, filterable view of project records.',
        'Recent Projects': 'Projects a user has recently opened or worked on.',
        'Project Browser': 'A structured way to locate and move between project records.',
        'Details': 'Core project information, ownership, customer, and scope.',
        'Phases': 'Project stages organized around the work lifecycle.',
        'Timeline': 'Dates, milestones, and progress in project context.',
        'Status': 'The project’s current operational state and next required action.'
      },
      'Openings': {
        'List': 'A searchable view of every opening connected to a project.',
        'Create': 'A guided path for adding a new opening and its required data.',
        'Import': 'A way to bring opening information into the project in bulk.',
        'Door': 'Door attributes linked directly to an opening.',
        'Frame': 'Frame attributes linked directly to an opening.',
        'Wall Type': 'Wall conditions that influence the opening configuration.',
        'Fire Rating': 'Compliance and rating requirements for the opening.',
        'Specifications': 'Technical requirements that guide selection and coordination.',
        'Hardware Assignment': 'The hardware set or items assigned to the opening.'
      },
      'Hardware & Libraries': {
        'Library': 'The shared source for reusable hardware information.',
        'Hardware Sets': 'Reusable hardware groupings connected to openings and specifications.',
        'Categories': 'A consistent structure for organizing hardware types.',
        'Manufacturers': 'Manufacturer records connected to products and specifications.',
        'Specifications': 'Reusable technical criteria for hardware selection.',
        'Reusable information': 'Shared data that reduces repeated setup across projects.'
      },
      'Orders': {
        'Draft': 'Orders still being prepared and reviewed before submission.',
        'Submitted': 'Orders sent forward for processing or approval.',
        'Approved': 'Orders cleared to continue through fulfillment.',
        'Rejected': 'Orders returned with issues that require resolution.',
        'Items': 'The products and materials included in an order.',
        'Pricing': 'Order values, unit pricing, and commercial totals.',
        'Quantities': 'Required item counts linked to project demand.',
        'Suppliers': 'The vendors responsible for supplying ordered items.',
        'Shipments': 'Delivery progress connected to orders and project commitments.',
        'Receiving': 'Incoming material status connected to purchasing and project needs.'
      },
      'Reports & Documents': {
        'Progress': 'Reporting that summarizes project advancement and current state.',
        'Costs': 'Project and order costs gathered for operational review.',
        'Budgets': 'Planned financial limits compared with current project activity.',
        'Orders': 'Order information presented for review and reporting.',
        'Shipments': 'Shipment status and delivery information in report form.',
        'Deadlines': 'Upcoming dates and commitments that need attention.',
        'Export': 'A controlled way to take selected information outside Mosaic.',
        'PDF': 'Portable documents for review, sharing, and approval.',
        'DWG': 'Drawing files connected to architectural project documentation.',
        'XLS': 'Spreadsheet exports for structured data review.',
        'Tags': 'Labels used to organize and retrieve documents.',
        'Versions': 'A history of document revisions and current status.',
        'Submittals': 'Document packages prepared and tracked for formal review.',
        'Approvals': 'Review decisions and approval state connected to documents.'
      },
      'Notifications': {
        'Milestones': 'Updates when important project stages are reached or changed.',
        'Tasks': 'Prompts for assigned work that is pending or due.',
        'Approvals': 'Requests and decisions that need a user’s attention.',
        'Orders': 'Changes to order state that affect project work.',
        'Shipments': 'Delivery events, delays, and receiving updates.'
      },
      'Administration': {
        'Users': 'People who can access Mosaic within the organization.',
        'Roles': 'Named responsibility groups used to organize access.',
        'Permissions': 'Controls that determine what each role can view and change.',
        'Activity': 'A traceable record of important actions and system changes.',
        'Company Settings': 'Organization-wide defaults and configuration.',
        'Researched integrations': 'Potential connections explored for the wider ERP ecosystem.',
        'Custom Fields': 'Organization-defined data fields for specific operational needs.'
      }
    };

    function describe(branch, item) {
      return descriptions[branch] && descriptions[branch][item]
        ? descriptions[branch][item]
        : (isArabic
          ? 'يُعدّ ' + item + ' جزءًا من مساحة عمل ' + branch + ' ضمن بنية المنتج المقترحة.'
          : item + ' is part of the ' + branch + ' workspace in the proposed architecture.');
    }

    function selectDestination(branch, button) {
      Array.prototype.slice.call(children.querySelectorAll('button')).forEach(function (item) {
        var selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });
      destination.textContent = button.textContent;
      description.textContent = describe(branch, button.textContent);
      path.textContent = 'Mosaic → ' + branch + ' → ' + button.textContent;
    }

    function renderBranch(details) {
      var summary = details.querySelector('summary');
      var branch = summary ? summary.textContent.trim() : '';
      var itemSource = details.getAttribute('data-mosaic-items') || '';
      var items = itemSource.split('|').map(function (item) {
        return item.trim();
      }).filter(Boolean);

      if (!branch || !items.length || branch === activeBranch) {
        return;
      }

      activeBranch = branch;
      title.textContent = branch;
      branchLabel.textContent = branch;
      children.setAttribute('aria-label', branch + ' destinations');
      children.replaceChildren();

      branches.forEach(function (item) {
        item.classList.toggle('is-selected', item === details);
      });

      items.forEach(function (item, index) {
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = item;
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', function () {
          selectDestination(branch, button);
        });
        button.addEventListener('keydown', function (event) {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
            return;
          }
          event.preventDefault();
          var buttons = Array.prototype.slice.call(children.querySelectorAll('button'));
          var current = buttons.indexOf(button);
          var direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
          buttons[(current + direction + buttons.length) % buttons.length].focus();
        });
        children.appendChild(button);
        if (index === 0) {
          selectDestination(branch, button);
        }
      });
    }

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var accordionControllers = branches.map(function (details) {
      var summary = details.querySelector('summary');
      var answer = details.querySelector('.mosaic-sitemap__answer');
      var isAnimating = false;
      var transitionTimer = null;

      function clearAnswerStyles() {
        window.clearTimeout(transitionTimer);
        answer.style.removeProperty('max-height');
        answer.style.removeProperty('opacity');
        answer.style.removeProperty('transform');
        details.classList.remove('is-opening', 'is-closing');
        isAnimating = false;
      }

      function finishOnHeightTransition(callback) {
        var finished = false;
        function finish() {
          if (finished) {
            return;
          }
          finished = true;
          answer.removeEventListener('transitionend', handleTransitionEnd);
          callback();
        }
        function handleTransitionEnd(event) {
          if (event.target === answer && event.propertyName === 'max-height') {
            finish();
          }
        }
        answer.addEventListener('transitionend', handleTransitionEnd);
        transitionTimer = window.setTimeout(finish, 500);
      }

      function openAnswer() {
        if (reducedMotion) {
          details.open = true;
          return;
        }
        isAnimating = true;
        details.open = true;
        details.classList.add('is-opening');
        answer.style.maxHeight = '0px';
        answer.style.opacity = '0';
        answer.style.transform = 'translate3d(0, -8px, 0)';
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            answer.style.transform = 'translate3d(0, 0, 0)';
          });
        });
        finishOnHeightTransition(clearAnswerStyles);
      }

      function closeAnswer() {
        if (!details.open) {
          return;
        }
        if (reducedMotion) {
          details.open = false;
          return;
        }
        isAnimating = true;
        details.classList.add('is-closing');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        answer.style.transform = 'translate3d(0, 0, 0)';
        answer.getBoundingClientRect();
        window.requestAnimationFrame(function () {
          answer.style.maxHeight = '0px';
          answer.style.opacity = '0';
          answer.style.transform = 'translate3d(0, -8px, 0)';
        });
        finishOnHeightTransition(function () {
          details.open = false;
          clearAnswerStyles();
        });
      }

      return {
        details: details,
        summary: summary,
        open: openAnswer,
        close: closeAnswer,
        isAnimating: function () { return isAnimating; }
      };
    });

    accordionControllers.forEach(function (controller) {
      if (!controller.summary) {
        return;
      }
      controller.summary.addEventListener('click', function (event) {
        event.preventDefault();
        if (controller.isAnimating()) {
          return;
        }
        renderBranch(controller.details);
        if (controller.details.open) {
          controller.close();
          setFlowVisible(false);
          return;
        }
        accordionControllers.forEach(function (otherController) {
          if (otherController !== controller && otherController.details.open && !otherController.isAnimating()) {
            otherController.close();
          }
        });
        controller.open();
        setFlowVisible(true);
      });
    });

    var initiallyOpenBranch = branches.find(function (details) {
      return details.open;
    });
    renderBranch(initiallyOpenBranch || branches[0]);
    setFlowVisible(Boolean(initiallyOpenBranch));
  }

  initializeMosaicWorkflowTabs(article.querySelector('#details-key-ui [data-mosaic-workflow-gallery]'));
  initializeMosaicWorkflowTabs(article.querySelector('#tldr-interface [data-mosaic-workflow-gallery]'));
  initializeMosaicIaFlow();
  Array.prototype.slice.call(document.querySelectorAll('[data-mosaic-audit-carousel]')).forEach(initializeMosaicAuditCarousel);
}());

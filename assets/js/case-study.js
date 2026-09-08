(function () {
  'use strict';

  // Replace this centralized placeholder data with final case-study content later.
  var projects = {
    'enterprise-platform': {
      image: 'assets/img/projects/hamdan-awards-mockup.png',
      en: {
        title: 'Hamdan Awards',
        category: 'Enterprise Product · Multi-Role Workflows · Design System -Digital Ecosystem',
        summary: 'Designing a scalable digital ecosystem for award applications, evaluation, and management.',
        role: 'Lead Product Designer',
        timeline: '6 months',
        platform: 'Web',
        year: '2024',
        sector: 'Government · Education · Digital Platform',
        collaborator: 'Ashraqat Maher — UI/UX Designer',
        overview: 'This placeholder case study describes how a fragmented enterprise workflow could be transformed into one clear, scalable product experience. It is ready to be replaced with the real project context, responsibilities, and evidence.',
        challenge: 'Teams relied on disconnected tools and inconsistent processes, making everyday tasks slow and reducing visibility for decision-makers.'
      },
      ar: {
        title: 'جوائز حمدان',
        category: 'منظومة رقمية · تجربة مؤسسية · نظام تصميم',
        summary: 'تصميم منظومة رقمية قابلة للتوسع للتقديم على الجوائز وتقييمها وإدارتها.',
        role: 'مصمم منتجات رئيسي',
        timeline: '6 أشهر',
        platform: 'الويب',
        year: '2024',
        sector: 'حكومي · تعليم · منصة رقمية',
        collaborator: 'إشراقات ماهر — مصممة UI/UX',
        overview: 'تشرح دراسة الحالة التجريبية هذه كيف يمكن تحويل سير عمل مؤسسي متفرق إلى تجربة منتج واضحة وقابلة للتوسع. المحتوى جاهز للاستبدال بسياق المشروع الحقيقي والمسؤوليات والأدلة.',
        challenge: 'اعتمدت الفرق على أدوات منفصلة وعمليات غير متسقة، مما أبطأ المهام اليومية وقلل وضوح المعلومات أمام صناع القرار.'
      }
    },
    'digital-banking': {
      image: 'assets/img/projects/mosaic-arc-erp-mockup.png',
      en: {
        title: 'Mosaic / ARC ERP',
        category: 'B2B SaaS · ERP · Complex Workflows',
        summary: 'Designing a specialized ERP for architectural hardware operations.',
        role: 'Senior Product Designer',
        timeline: '16 weeks',
        platform: 'iOS + Android',
        year: '2026',
        sector: 'Architecture · Manufacturing · Enterprise Software',
        overview: 'This placeholder narrative demonstrates how research, service design, and interface design can come together in a trusted digital banking experience. Final customer insights and business outcomes can be added later.',
        challenge: 'Customers needed a simpler way to understand balances, complete transfers, and manage sensitive actions without losing confidence or control.'
      },
      ar: {
        title: 'Mosaic / ARC ERP',
        category: 'B2B SaaS · ERP · مسارات عمل معقدة',
        summary: 'تصميم نظام ERP متخصص لعمليات تجهيزات المباني المعمارية.',
        role: 'مصمم منتجات أول',
        timeline: '16 أسبوعًا',
        platform: 'iOS وAndroid',
        year: '2026',
        sector: 'عمارة · تصنيع · برمجيات مؤسسية',
        overview: 'يوضح هذا السرد التجريبي كيف يمكن دمج البحث وتصميم الخدمات والواجهات لبناء تجربة مصرفية رقمية موثوقة. يمكن إضافة رؤى العملاء والنتائج الفعلية لاحقًا.',
        challenge: 'احتاج العملاء إلى طريقة أبسط لفهم الأرصدة وتنفيذ التحويلات وإدارة الإجراءات الحساسة مع الحفاظ على الثقة والتحكم.'
      }
    },
    'workforce-system': {
      image: 'assets/img/projects/laffah-mockup.png',
      en: {
        title: 'Laffah',
        category: 'Consumer Product · E-commerce · Responsive Web',
        summary: 'Reimagining the digital ordering experience for a growing restaurant brand.',
        role: 'Product Designer',
        timeline: '10 weeks',
        platform: 'Responsive web',
        year: '2025',
        sector: 'Food & Beverage · E-commerce · Consumer',
        overview: 'This placeholder case study outlines a scalable B2B product approach for managers, employees, and administrators. Replace it later with the real workflows, constraints, and implementation details.',
        challenge: 'Different roles needed quick access to different actions, while legacy navigation and dense forms created avoidable errors and support requests.'
      },
      ar: {
        title: 'لفاح',
        category: 'منتج استهلاكي · تجارة إلكترونية · ويب متجاوب',
        summary: 'إعادة تصور تجربة الطلب الرقمي لعلامة مطاعم متنامية.',
        role: 'مصمم منتجات',
        timeline: '10 أسابيع',
        platform: 'ويب متجاوب',
        year: '2025',
        sector: 'أغذية ومشروبات · تجارة إلكترونية · مستهلك',
        overview: 'توضح دراسة الحالة التجريبية نهجًا قابلًا للتوسع لمنتج B2B يخدم المديرين والموظفين والمسؤولين. يمكن استبدالها لاحقًا بسير العمل والقيود وتفاصيل التنفيذ الحقيقية.',
        challenge: 'احتاج كل دور إلى وصول سريع لإجراءات مختلفة، بينما تسببت بنية التنقل القديمة والنماذج الكثيفة في أخطاء وطلبات دعم يمكن تجنبها.'
      }
    },
    'retail-dashboard': {
      image: 'assets/img/projects/abh-manufacturing-mockup.png',
      en: {
        title: 'ABH Manufacturing',
        category: 'B2B Product · Product Discovery · Responsive Web',
        summary: 'Transforming a complex product ecosystem into a scalable digital experience.',
        role: 'UX/UI Designer',
        timeline: '8 weeks',
        platform: 'Desktop web',
        year: '2025',
        sector: 'Manufacturing · B2B · Product Discovery',
        overview: 'This placeholder story presents a dashboard redesign focused on hierarchy, faster scanning, and more confident decisions. Replace the sample metrics with verified project results when available.',
        challenge: 'High-value data was spread across reports, forcing teams to spend too much time assembling information before they could make a decision.'
      },
      ar: {
        title: 'ABH Manufacturing',
        category: 'منتج B2B · اكتشاف المنتجات · ويب متجاوب',
        summary: 'تحويل منظومة منتجات معقدة إلى تجربة رقمية قابلة للتوسع.',
        role: 'مصمم UX/UI',
        timeline: '8 أسابيع',
        platform: 'ويب لسطح المكتب',
        year: '2025',
        sector: 'تصنيع · B2B · اكتشاف المنتجات',
        overview: 'تعرض هذه القصة التجريبية إعادة تصميم لوحة معلومات تركّز على التسلسل البصري وسرعة القراءة واتخاذ قرارات أكثر ثقة. يمكن استبدال المؤشرات التجريبية بنتائج موثقة لاحقًا.',
        challenge: 'كانت البيانات المهمة موزعة على تقارير متعددة، مما أجبر الفرق على قضاء وقت طويل في جمع المعلومات قبل اتخاذ القرار.'
      }
    },
    'service-marketplace': {
      image: 'assets/img/projects/ras-al-khaimah-awards.png',
      en: {
        title: 'Ras Al Khaimah Awards',
        category: 'Enterprise Product · Admin Dashboard · Workflow Optimization',
        summary: 'Streamlining administrative workflows for an awards management platform.',
        role: 'Product Designer',
        timeline: '14 weeks',
        platform: 'Mobile + web',
        year: '2025',
        sector: 'Government · Education · Awards Platform',
        overview: 'This placeholder case study shows how a two-sided marketplace can balance customer discovery with provider operations. Real interviews, journey maps, and conversion results can be inserted later.',
        challenge: 'Customers struggled to compare providers, while service teams lacked a consistent way to manage availability, requests, and booking changes.'
      },
      ar: {
        title: 'جوائز رأس الخيمة',
        category: 'منتج مؤسسي · لوحة إدارة · تحسين مسارات العمل',
        summary: 'تبسيط مسارات العمل الإدارية لمنصة إدارة الجوائز.',
        role: 'مصمم منتجات',
        timeline: '14 أسبوعًا',
        platform: 'الجوال والويب',
        year: '2025',
        sector: 'حكومي · تعليم · منصة جوائز',
        overview: 'توضح دراسة الحالة التجريبية كيف يمكن لسوق ثنائي الأطراف الموازنة بين اكتشاف العملاء وعمليات مقدمي الخدمة. يمكن إضافة المقابلات وخرائط الرحلة ونتائج التحويل الفعلية لاحقًا.',
        challenge: 'واجه العملاء صعوبة في مقارنة مقدمي الخدمة، بينما افتقرت فرق الخدمة إلى طريقة موحدة لإدارة التوفر والطلبات وتغييرات الحجز.'
      }
    },
    'design-system': {
      image: 'assets/img/client-logos/arab-organization.png',
      en: {
        title: 'Arab Tourism Organization',
        category: 'Information Architecture · UX/UI · Responsive Web',
        summary: 'Restructuring a content-rich digital experience for easier discovery.',
        role: 'Design System Lead',
        timeline: 'Ongoing',
        platform: 'Multi-platform',
        year: '2026',
        sector: 'Tourism · Public Sector · Content Platform',
        overview: 'This placeholder case study describes the foundations, governance, and product patterns behind a scalable design system. Component coverage and adoption data can replace the sample content later.',
        challenge: 'Product teams were recreating similar patterns independently, producing inconsistent interactions and slowing the design-to-development handoff.'
      },
      ar: {
        title: 'المنظمة العربية للسياحة',
        category: 'هندسة معلومات · UX/UI · ويب متجاوب',
        summary: 'إعادة هيكلة تجربة رقمية غنية بالمحتوى لتسهيل الاكتشاف.',
        role: 'قائد نظام التصميم',
        timeline: 'مستمر',
        platform: 'منصات متعددة',
        year: '2026',
        sector: 'سياحة · قطاع عام · منصة محتوى',
        overview: 'تصف دراسة الحالة التجريبية الأسس والحوكمة وأنماط المنتج وراء نظام تصميم قابل للتوسع. يمكن استبدال المحتوى التجريبي ببيانات تغطية المكونات والتبني لاحقًا.',
        challenge: 'كانت فرق المنتجات تعيد إنشاء أنماط متشابهة بشكل مستقل، مما أدى إلى تفاعلات غير متسقة وأبطأ عملية التسليم من التصميم إلى التطوير.'
      }
    }
  };

  var sharedCopy = {
    en: {
      labels: {
        role: 'Role',
        timeline: 'Timeline',
        platform: 'Platform',
        year: 'Year',
        sector: 'Sector',
        readTime: 'Read time',
        collaborator: 'Collaborator'
      },
      approach: [
        { text: 'Align stakeholders around the problem, audience, constraints, and measurable definition of success.', showInTldr: true },
        { text: 'Map priority journeys and simplify the information architecture before moving into interface details.', showInTldr: false },
        { text: 'Prototype the critical workflows, test assumptions, and iterate based on evidence and technical input.', showInTldr: true },
        { text: 'Document reusable patterns and provide development-ready specifications for a consistent handoff.', showInTldr: false }
      ],
      outcomes: [
        { text: '[Placeholder] Reduced time to complete the primary workflow by 30%.', showInTldr: true },
        { text: '[Placeholder] Improved consistency across the highest-traffic product journeys.', showInTldr: true },
        { text: '[Placeholder] Established reusable patterns that accelerated future releases.', showInTldr: true }
      ],
      imageAlt: 'Project interface collage',
      supportingCaption: 'Supporting visual placeholder — replace with final project imagery.',
      nextLabel: 'Next case study'
    },
    ar: {
      labels: {
        role: 'الدور',
        timeline: 'المدة',
        platform: 'المنصة',
        year: 'السنة',
        sector: 'القطاع',
        readTime: 'وقت القراءة',
        collaborator: 'المتعاونة'
      },
      approach: [
        { text: 'توحيد رؤية أصحاب المصلحة حول المشكلة والجمهور والقيود والتعريف القابل للقياس للنجاح.', showInTldr: true },
        { text: 'رسم رحلات الاستخدام ذات الأولوية وتبسيط بنية المعلومات قبل الانتقال إلى تفاصيل الواجهة.', showInTldr: false },
        { text: 'إنشاء نماذج أولية لسير العمل الأساسي واختبار الافتراضات والتكرار بناءً على الأدلة والمدخلات التقنية.', showInTldr: true },
        { text: 'توثيق الأنماط القابلة لإعادة الاستخدام وتقديم مواصفات جاهزة للتطوير لضمان تسليم متسق.', showInTldr: false }
      ],
      outcomes: [
        { text: '[محتوى تجريبي] تقليل وقت إكمال سير العمل الأساسي بنسبة 30٪.', showInTldr: true },
        { text: '[محتوى تجريبي] تحسين الاتساق عبر رحلات المنتج الأكثر استخدامًا.', showInTldr: true },
        { text: '[محتوى تجريبي] تأسيس أنماط قابلة لإعادة الاستخدام تسرّع الإصدارات المستقبلية.', showInTldr: true }
      ],
      imageAlt: 'مجموعة من واجهات المشروع',
      supportingCaption: 'صورة مساندة تجريبية — استبدلها بصور المشروع النهائية.',
      nextLabel: 'دراسة الحالة التالية'
    }
  };

  /* Keep case-study navigation aligned with the six projects on the homepage. */
  var slugs = Object.keys(projects);
  var pageParameters = new URLSearchParams(window.location.search);
  var requestedSlug = pageParameters.get('project');
  var requestedView = pageParameters.get('view');
  var slug = projects[requestedSlug] ? requestedSlug : slugs[0];
  var readingView = requestedView === 'tldr' ? 'tldr' : 'details';
  var language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  var project = projects[slug];
  var content = project[language];
  var copy = sharedCopy[language];
  var currentIndex = slugs.indexOf(slug);
  var nextSlug = slugs[(currentIndex + 1) % slugs.length];
  var supportingSlugs = [
    slugs[(currentIndex + 1) % slugs.length],
    slugs[(currentIndex + 2) % slugs.length]
  ];

  function setText(field, value) {
    var element = document.querySelector('[data-project-field="' + field + '"]');
    if (element) {
      element.textContent = value;
    }
  }

  function renderList(field, items) {
    var list = document.querySelector('[data-project-list="' + field + '"]');
    if (!list) {
      return;
    }

    list.textContent = '';
    items.forEach(function (item) {
      var itemData = typeof item === 'string' ? { text: item, showInTldr: true } : item;
      var listItem = document.createElement('li');
      listItem.textContent = itemData.text;
      listItem.setAttribute('data-reading-copy', '');
      listItem.setAttribute('data-reading-mode', itemData.showInTldr === false ? 'supporting' : 'essential');
      list.appendChild(listItem);
    });
  }

  setText('category', content.category);
  setText('title', content.title);
  setText('summary', content.summary);
  setText('role-label', copy.labels.role);
  setText('timeline-label', copy.labels.timeline);
  setText('platform-label', copy.labels.platform);
  setText('year-label', copy.labels.year);
  setText('sector-label', copy.labels.sector);
  setText('read-time-label', copy.labels.readTime);
  setText('collaborator-label', copy.labels.collaborator);
  setText('role', content.role);
  setText('timeline', content.timeline);
  setText('platform', content.platform);
  setText('year', content.year);
  setText('sector', content.sector);
  setText('collaborator', content.collaborator || '—');
  setText('overview', content.overview);
  setText('challenge', content.challenge);
  setText('gallery-caption-1', copy.supportingCaption);
  setText('gallery-caption-2', copy.supportingCaption);
  setText('next-label', copy.nextLabel);
  setText('next-title', projects[nextSlug][language].title);
  renderList('approach', copy.approach);
  renderList('outcomes', copy.outcomes);

  var heroImage = document.querySelector('[data-project-image="hero"]');
  if (heroImage) {
    heroImage.src = project.image;
    heroImage.alt = copy.imageAlt + ': ' + content.title;
  }

  supportingSlugs.forEach(function (supportingSlug, index) {
    var supportingImage = document.querySelector('[data-project-image="supporting-' + (index + 1) + '"]');
    if (supportingImage) {
      supportingImage.src = projects[supportingSlug].image;
      supportingImage.alt = copy.imageAlt + ': ' + projects[supportingSlug][language].title;
    }
  });

  var nextLink = document.querySelector('[data-project-next]');
  if (nextLink) {
    nextLink.href = (language === 'ar' ? 'case-study-ar.html' : 'case-study.html') + '?project=' + nextSlug + '&view=' + readingView;
  }

  // Keep both language controls on the same case study, matching the homepage
  // language switcher rather than sending visitors back to the landing page.
  document.querySelectorAll('[data-project-language]').forEach(function (languageLink) {
    var targetLanguage = languageLink.getAttribute('data-project-language');
    languageLink.href = (targetLanguage === 'ar' ? 'case-study-ar.html' : 'case-study.html') + '?project=' + slug + '&view=' + readingView;
  });

  document.title = content.title + (language === 'ar' ? ' | جلال حيلاني' : ' | Galal Helany');

  // Footer AI links use the current project rather than the homepage prompt.
  // Gemini also receives the prompt through the clipboard because it does not
  // consistently preserve query-string prompts when opening a new chat.
  function getCaseStudySummaryPrompt() {
    var caseStudyUrl = 'https://galalhelany.com/' +
      (language === 'ar' ? 'case-study-ar.html' : 'case-study.html') +
      '?project=' + encodeURIComponent(slug);

    if (language === 'ar') {
      return 'راجع دراسة حالة ' + content.title + ' على ' + caseStudyUrl +
        ' وقدّم ملخصًا موجزًا ودقيقًا لمسؤول توظيف أو قائد منتج. وضّح سياق المشروع وهدفه، ودور جلال حيلاني وتعاونه مع الفريق، والمشكلات الأساسية للمستخدمين والعمليات، ومنهج البحث والتصميم، وأهم قرارات تجربة المستخدم والمنتج، وكيف تعمل مكونات المنظومة معًا، ثم النتائج والأثر والدروس المستفادة. اعتمد فقط على المعلومات المعروضة في دراسة الحالة، وافصل بوضوح بين الحقائق والاستنتاجات، واحترم ملاحظة السرية، ونظّم الإجابة بعناوين قصيرة ونقاط سهلة القراءة.';
    }

    return 'Review the ' + content.title + ' product-design case study at ' + caseStudyUrl +
      ' and provide a concise, factual summary for a recruiter or product leader. Explain the project context and objective, Galal Helany’s role and collaboration, the main user and operational problems, the research and design approach, the most important UX and product decisions, how the parts of the ecosystem work together, and the verified outcomes, impact, and key learning. Base the answer only on the case study, clearly distinguish facts from inference, respect the confidentiality note, and organize the response with short headings and scannable bullets.';
  }

  function fallbackCopyText(value) {
    var textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }
    document.body.removeChild(textarea);
    return copied;
  }

  function copyCaseStudyPrompt(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value).then(function () {
        return true;
      }).catch(function () {
        return fallbackCopyText(value);
      });
    }
    return Promise.resolve(fallbackCopyText(value));
  }

  function initializeCaseStudyAiSummary() {
    var prompt = getCaseStudySummaryPrompt();

    document.querySelectorAll('.case-study-footer .ai-summary').forEach(function (summary) {
      var feedback = summary.querySelector('.ai-summary__feedback');

      summary.querySelectorAll('.ai-summary__link').forEach(function (link) {
        var baseUrl = link.getAttribute('data-ai-url');
        var modelName = link.getAttribute('data-ai-name');

        if (baseUrl) {
          link.href = baseUrl + encodeURIComponent(prompt);
        }

        if (modelName === 'Gemini') {
          link.title = language === 'ar'
            ? 'ينسخ نص دراسة الحالة ثم يفتح Gemini'
            : 'Copies the case-study prompt, then opens Gemini';
          link.addEventListener('click', function () {
            copyCaseStudyPrompt(prompt).then(function (copied) {
              if (!feedback) {
                return;
              }
              feedback.textContent = copied
                ? (language === 'ar'
                  ? 'تم نسخ النص — الصقه في Gemini باستخدام Ctrl+V أو ⌘V.'
                  : 'Prompt copied — paste it in Gemini with Ctrl+V or ⌘V.')
                : (language === 'ar'
                  ? 'تعذّر النسخ تلقائيًا. انسخ النص يدويًا بعد فتح Gemini.'
                  : 'Automatic copying was unavailable. Paste the prompt manually in Gemini.');
              window.clearTimeout(summary.aiFeedbackTimer);
              summary.aiFeedbackTimer = window.setTimeout(function () {
                feedback.textContent = '';
              }, 7000);
            });
          });
        }
      });
    });
  }

  initializeCaseStudyAiSummary();

  // Shared portfolio shell ---------------------------------------------------
  var body = document.body;
  var article = document.querySelector('.case-study-article');
  var navigationButton = document.querySelector('.app-header .navigation');
  var navigationLinks = document.querySelectorAll('.case-study-nav .item');
  var themeControl = document.querySelector('.app-aside .option.theme');
  var themeSlider = document.querySelector('.app-aside .option.theme .slider');
  var readingButtons = document.querySelectorAll('[data-reading-view]');
  var conditionalNavigationLinks = document.querySelectorAll('[data-reading-nav]');
  var textSizeControl = document.querySelector('.app-aside .option.text-size');
  var textSizeSlider = textSizeControl ? textSizeControl.querySelector('.slider') : null;
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Both product galleries share one data-driven carousel on the English and
  // Arabic pages. Generated slides keep image references out of the HTML.
  function padGalleryNumber(value) {
    return value < 10 ? '0' + value : String(value);
  }

  function localizeGalleryNumber(value, galleryLanguage) {
    var formatted = padGalleryNumber(value);
    if (galleryLanguage !== 'ar') {
      return formatted;
    }

    var arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return formatted.replace(/\d/g, function (digit) {
      return arabicDigits[Number(digit)];
    });
  }

  function buildAwardsManagementSlides(galleryLanguage) {
    var assetRoot = 'assets/img/case-studies/hamdan/awards-management/';
    var slides = [
      {
        file: '00-mobile-awards-management.png',
        en: 'Awards Management mobile application screens',
        ar: 'شاشات تطبيق إدارة الجوائز على الجوال',
        width: 1920,
        height: 1080
      },
      { file: '01-admin.webp', en: 'Administrator dashboard', ar: 'لوحة الإدارة' },
      { file: '02-admin-detail.webp', en: 'Administrator detail view', ar: 'تفاصيل لوحة الإدارة' },
      { file: '03-judge.webp', en: 'Judge workflow', ar: 'مسار عمل المحكّم' },
      { file: '04-team-lead.webp', en: 'Team lead workflow — screen 1', ar: 'مسار عمل رئيس الفريق — الشاشة ١' }
    ];

    for (var teamIndex = 1; teamIndex <= 14; teamIndex += 1) {
      slides.push({
        file: padGalleryNumber(teamIndex + 4) + '-team-lead-' + padGalleryNumber(teamIndex) + '.webp',
        en: 'Team lead workflow — screen ' + (teamIndex + 1),
        ar: 'مسار عمل رئيس الفريق — الشاشة ' + localizeGalleryNumber(teamIndex + 1, 'ar')
      });
    }

    slides.push({
      file: '19-committee.webp',
      en: 'Committee management — screen 1',
      ar: 'إدارة اللجان الثنائية — الشاشة ١'
    });

    for (var committeeIndex = 1; committeeIndex <= 18; committeeIndex += 1) {
      slides.push({
        file: padGalleryNumber(committeeIndex + 19) + '-committee-' + padGalleryNumber(committeeIndex) + '.webp',
        en: 'Committee management — screen ' + (committeeIndex + 1),
        ar: 'إدارة اللجان الثنائية — الشاشة ' + localizeGalleryNumber(committeeIndex + 1, 'ar')
      });
    }

    return slides.map(function (slide) {
      return {
        src: assetRoot + slide.file,
        alt: galleryLanguage === 'ar' ? slide.ar : slide.en,
        width: slide.width || 1920,
        height: slide.height || 1250
      };
    });
  }

  function buildApplicantPortalSlides(galleryLanguage) {
    var assetRoot = 'assets/img/case-studies/hamdan/applicant-portal/';
    var slides = [];

    for (var applicantIndex = 1; applicantIndex <= 17; applicantIndex += 1) {
      slides.push({
        src: assetRoot + 'applicant-' + padGalleryNumber(applicantIndex) + '.png',
        alt: galleryLanguage === 'ar'
          ? 'مسار منصة التقديم — الشاشة ' + localizeGalleryNumber(applicantIndex, 'ar')
          : 'Applicant Portal workflow — screen ' + applicantIndex,
        width: 1920,
        height: 1229
      });
    }

    return slides;
  }

  function buildWebsiteSlides(galleryLanguage) {
    var assetRoot = 'assets/img/case-studies/hamdan/website/';
    var slides = [];

    for (var websiteIndex = 1; websiteIndex <= 6; websiteIndex += 1) {
      slides.push({
        src: assetRoot + 'website-' + padGalleryNumber(websiteIndex) + '.png',
        alt: galleryLanguage === 'ar'
          ? 'واجهة موقع مؤسسة حمدان — الشاشة ' + localizeGalleryNumber(websiteIndex, 'ar')
          : 'Hamdan Foundation website — screen ' + websiteIndex,
        width: 1920,
        height: 1255
      });
    }

    return slides;
  }

  function initializeCaseStudyCarousels() {
    document.querySelectorAll('[data-case-carousel]').forEach(function (carousel) {
      var galleryLanguage = carousel.getAttribute('data-carousel-language') === 'ar' ? 'ar' : 'en';
      var galleryType = carousel.getAttribute('data-carousel-type');
      var stage = carousel.querySelector('[data-case-carousel-stage]');
      var viewport = carousel.querySelector('[data-case-carousel-viewport]');
      var previousButton = carousel.querySelector('[data-case-carousel-previous]');
      var nextButton = carousel.querySelector('[data-case-carousel-next]');
      var currentLabel = carousel.querySelector('[data-case-carousel-current]');
      var totalLabel = carousel.querySelector('[data-case-carousel-total]');
      var galleryItems;
      if (galleryType === 'applicant') {
        galleryItems = buildApplicantPortalSlides(galleryLanguage);
      } else if (galleryType === 'website') {
        galleryItems = buildWebsiteSlides(galleryLanguage);
      } else {
        galleryItems = buildAwardsManagementSlides(galleryLanguage);
      }
      var activeIndex = 0;
      var pointerStartX = null;

      if (!stage || !viewport || !previousButton || !nextButton || !galleryItems.length) {
        return;
      }

      var fragment = document.createDocumentFragment();
      galleryItems.forEach(function (item, index) {
        var slide = document.createElement('figure');
        var image = document.createElement('img');

        slide.className = 'case-study-carousel__slide';
        slide.setAttribute('data-case-carousel-slide', '');
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', galleryLanguage === 'ar' ? 'شريحة' : 'slide');
        slide.setAttribute('aria-label', localizeGalleryNumber(index + 1, galleryLanguage) +
          (galleryLanguage === 'ar' ? ' من ' : ' of ') +
          localizeGalleryNumber(galleryItems.length, galleryLanguage));

        image.setAttribute('data-case-carousel-src', item.src);
        image.alt = item.alt;
        image.width = item.width;
        image.height = item.height;
        image.decoding = 'async';
        image.loading = 'lazy';

        slide.appendChild(image);
        fragment.appendChild(slide);
      });
      stage.appendChild(fragment);

      var renderedSlides = Array.prototype.slice.call(stage.querySelectorAll('[data-case-carousel-slide]'));
      var pairCount = Math.max(1, renderedSlides.length - 1);

      function showSlide(nextIndex) {
        var shouldResetTrack = nextIndex < 0 || nextIndex >= pairCount;
        activeIndex = (nextIndex + pairCount) % pairCount;

        // Load the visible pair and its nearest neighbours only, keeping the
        // gallery light without duplicating the carousel content.
        [-1, 0, 1, 2].forEach(function (offset) {
          var nearbyIndex = activeIndex + offset;
          if (nearbyIndex < 0 || nearbyIndex >= renderedSlides.length) {
            return;
          }
          var nearbyImage = renderedSlides[nearbyIndex].querySelector('img');
          var source = nearbyImage ? nearbyImage.getAttribute('data-case-carousel-src') : '';
          if (nearbyImage && source && !nearbyImage.getAttribute('src')) {
            nearbyImage.loading = offset === 0 || offset === 1 ? 'eager' : 'lazy';
            nearbyImage.src = source;
          }
        });

        renderedSlides.forEach(function (slide, index) {
          var isVisible = index === activeIndex || index === activeIndex + 1;
          slide.setAttribute('aria-hidden', String(!isVisible));
        });

        // Movement is handled only with a GPU-accelerated track transform;
        // there is intentionally no opacity or cross-fade animation.
        if (shouldResetTrack) {
          stage.classList.add('is-resetting');
        }
        stage.style.transform = 'translate3d(' + (activeIndex * -50) + '%, 0, 0)';
        if (shouldResetTrack) {
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              stage.classList.remove('is-resetting');
            });
          });
        }

        if (currentLabel) {
          currentLabel.textContent =
            localizeGalleryNumber(activeIndex + 1, galleryLanguage) + '\u2013' +
            localizeGalleryNumber(activeIndex + 2, galleryLanguage);
        }
      }

      if (totalLabel) {
        totalLabel.textContent = localizeGalleryNumber(renderedSlides.length, galleryLanguage);
      }

      viewport.setAttribute('tabindex', '0');
      viewport.setAttribute('role', 'region');
      viewport.setAttribute('aria-roledescription', galleryLanguage === 'ar' ? 'عرض شرائح' : 'carousel');
      viewport.setAttribute('aria-label', carousel.getAttribute('aria-label') ||
        (galleryLanguage === 'ar' ? 'معرض دراسة الحالة' : 'Case study gallery'));

      previousButton.addEventListener('click', function () {
        showSlide(activeIndex - 1);
      });

      nextButton.addEventListener('click', function () {
        showSlide(activeIndex + 1);
      });

      viewport.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showSlide(activeIndex - 1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          showSlide(activeIndex + 1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          showSlide(0);
        } else if (event.key === 'End') {
          event.preventDefault();
          showSlide(pairCount - 1);
        }
      });

      viewport.addEventListener('pointerdown', function (event) {
        if (!event.isPrimary) {
          return;
        }
        pointerStartX = event.clientX;
      }, { passive: true });

      viewport.addEventListener('pointerup', function (event) {
        if (pointerStartX === null || !event.isPrimary) {
          return;
        }

        var distance = event.clientX - pointerStartX;
        pointerStartX = null;
        if (Math.abs(distance) < 48) {
          return;
        }
        showSlide(activeIndex + (distance < 0 ? 1 : -1));
      }, { passive: true });

      viewport.addEventListener('pointercancel', function () {
        pointerStartX = null;
      }, { passive: true });

      showSlide(0);
    });
  }

  initializeCaseStudyCarousels();

  function initializeEvidencePreviews() {
    document.querySelectorAll('.case-study-research').forEach(function (section) {
      var preview = section.querySelector('[data-evidence-preview]');
      var previewImages = preview
        ? Array.prototype.slice.call(preview.querySelectorAll('img'))
        : [];
      var steps = Array.prototype.slice.call(section.querySelectorAll('.case-study-process li'));
      var activeIndex = -1;

      if (!preview || !previewImages.length || previewImages.length !== steps.length) {
        return;
      }

      function showPreview(index) {
        activeIndex = index;
        preview.classList.add('is-active');
        previewImages.forEach(function (image, imageIndex) {
          image.classList.toggle('is-active', imageIndex === index);
        });
        steps.forEach(function (step, stepIndex) {
          step.classList.toggle('is-evidence-active', stepIndex === index);
        });
      }

      function hidePreview() {
        activeIndex = -1;
        preview.classList.remove('is-active');
        previewImages.forEach(function (image) {
          image.classList.remove('is-active');
        });
        steps.forEach(function (step) {
          step.classList.remove('is-evidence-active');
        });
      }

      function restorePointerOrFocusPreview() {
        var focusedIndex = steps.indexOf(document.activeElement);
        if (focusedIndex >= 0) {
          showPreview(focusedIndex);
          return;
        }

        var hoveredIndex = steps.findIndex(function (step) {
          return step.matches(':hover');
        });
        if (hoveredIndex >= 0) {
          showPreview(hoveredIndex);
        } else {
          hidePreview();
        }
      }

      steps.forEach(function (step, index) {
        step.addEventListener('pointerenter', function () {
          showPreview(index);
        });
        step.addEventListener('pointerleave', restorePointerOrFocusPreview);
        step.addEventListener('focus', function () {
          showPreview(index);
        });
        step.addEventListener('blur', function () {
          window.requestAnimationFrame(restorePointerOrFocusPreview);
        });
        step.addEventListener('click', function () {
          if (window.matchMedia('(hover: none)').matches) {
            if (activeIndex === index) {
              hidePreview();
            } else {
              showPreview(index);
            }
          }
        });
      });
    });
  }

  initializeEvidencePreviews();

  // Read time uses the visible editorial copy plus a short visual scan
  // allowance. TL;DR therefore updates the metadata without adding time to
  // the floating mode control.
  function calculateReadTime(view) {
    var words = 0;
    var wordsPerMinute = language === 'ar' ? 180 : 220;

    document.querySelectorAll('[data-reading-copy]').forEach(function (element) {
      var isSupporting = element.closest('[data-reading-mode="supporting"]');
      var isInterfaceCopy = element.closest('[data-reading-mode="chrome"]');
      if (isInterfaceCopy || (view === 'tldr' && isSupporting)) {
        return;
      }

      var text = element.textContent.trim();
      if (text) {
        words += text.split(/\s+/).length;
      }
    });

    var visibleVisuals = 0;
    document.querySelectorAll('.case-study-media img, .case-study-gallery img').forEach(function (image) {
      if (view !== 'tldr' || !image.closest('[data-reading-mode="supporting"]')) {
        visibleVisuals += 1;
      }
    });

    var estimatedSeconds = (words / wordsPerMinute) * 60 + (visibleVisuals * 12);
    return Math.max(1, Math.ceil(estimatedSeconds / 60));
  }

  function updateReadTime() {
    var readTime = document.querySelector('[data-project-read-time]');
    if (!readTime) {
      return;
    }

    var minutes = calculateReadTime(readingView);
    readTime.textContent = language === 'ar' ? '~' + minutes + ' د' : '~' + minutes + ' min';
  }

  function updateReadingLinks(view) {
    if (nextLink) {
      nextLink.href = (language === 'ar' ? 'case-study-ar.html' : 'case-study.html') + '?project=' + nextSlug + '&view=' + view;
    }

    document.querySelectorAll('[data-project-language]').forEach(function (languageLink) {
      var targetLanguage = languageLink.getAttribute('data-project-language');
      languageLink.href = (targetLanguage === 'ar' ? 'case-study-ar.html' : 'case-study.html') + '?project=' + slug + '&view=' + view;
    });
  }

  function commitReadingView(view, shouldUpdateUrl) {
    readingView = view === 'tldr' ? 'tldr' : 'details';
    body.setAttribute('data-reading-view', readingView);

    readingButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-reading-view') === readingView;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    conditionalNavigationLinks.forEach(function (link) {
      var linkMode = link.getAttribute('data-reading-nav');
      var shouldHide = linkMode !== readingView;
      link.hidden = shouldHide;
      link.setAttribute('aria-hidden', String(shouldHide));
      if (shouldHide) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });

    updateReadTime();
    updateReadingLinks(readingView);

    if (shouldUpdateUrl && window.history && window.history.replaceState) {
      var updatedUrl = new URL(window.location.href);
      updatedUrl.searchParams.set('project', slug);
      updatedUrl.searchParams.set('view', readingView);
      window.history.replaceState({ readingView: readingView }, '', updatedUrl);
    }
  }

  function setReadingView(view, options) {
    var settings = options || {};
    var nextView = view === 'tldr' ? 'tldr' : 'details';
    if (nextView === readingView && body.getAttribute('data-reading-view')) {
      return;
    }

    if (settings.animate !== false && !prefersReducedMotion && article) {
      article.classList.add('is-reading-transitioning');
      window.setTimeout(function () {
        commitReadingView(nextView, settings.updateUrl !== false);
        window.requestAnimationFrame(function () {
          article.classList.remove('is-reading-transitioning');
        });
      }, 90);
    } else {
      commitReadingView(nextView, settings.updateUrl !== false);
    }
  }

  readingButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setReadingView(button.getAttribute('data-reading-view'), { updateUrl: true, animate: true });
    });
  });

  // TL;DR ends with an explicit path back to the full narrative.
  document.querySelectorAll('[data-reading-switch]').forEach(function (button) {
    button.addEventListener('click', function () {
      setReadingView(button.getAttribute('data-reading-switch'), { updateUrl: true, animate: true });
    });
  });

  window.addEventListener('popstate', function () {
    var viewFromUrl = new URLSearchParams(window.location.search).get('view');
    setReadingView(viewFromUrl === 'tldr' ? 'tldr' : 'details', { updateUrl: false, animate: false });
  });

  // Five persistent text sizes reuse the theme selector's vertical slider.
  var textSizeStorageKey = 'caseStudyTextSize';
  var textSizeStates = ['extra-small', 'small', 'default', 'large', 'extra-large'];
  var textSizeLabels = language === 'ar'
    ? ['صغير جدًا', 'صغير', 'افتراضي', 'كبير', 'كبير جدًا']
    : ['extra small', 'small', 'default', 'large', 'extra large'];

  function removeTextSizeClasses() {
    Array.from(body.classList).forEach(function (className) {
      if (className.indexOf('text-size--') === 0) {
        body.classList.remove(className);
      }
    });
  }

  function applyTextSize(value, shouldPersist) {
    var numericValue = Number(value);
    var safeValue = Number.isInteger(numericValue) ? Math.min(4, Math.max(0, numericValue)) : 2;
    var size = textSizeStates[safeValue];
    removeTextSizeClasses();
    body.classList.add('text-size--' + String(safeValue).padStart(2, '0'));
    body.setAttribute('data-case-text-size', size);
    if (textSizeSlider) {
      textSizeSlider.value = safeValue;
      textSizeSlider.setAttribute('aria-valuetext', textSizeLabels[safeValue]);
    }

    if (shouldPersist) {
      try {
        window.localStorage.setItem(textSizeStorageKey, String(safeValue));
      } catch (error) {
        // The selector remains usable when browser storage is unavailable.
      }
    }
  }

  function readSavedTextSize() {
    try {
      var storedValue = window.localStorage.getItem(textSizeStorageKey);
      if (storedValue === null) {
        return 2;
      }
      var savedValue = Number(storedValue);
      return Number.isInteger(savedValue) && savedValue >= 0 && savedValue <= 4 ? savedValue : 2;
    } catch (error) {
      return 2;
    }
  }

  function showTextSizeOptions() {
    body.classList.add('text-size-slider--is--visible');
    if (textSizeControl) {
      textSizeControl.setAttribute('aria-expanded', 'true');
    }
  }

  function hideTextSizeOptions() {
    body.classList.remove('text-size-slider--is--visible');
    if (textSizeControl) {
      textSizeControl.setAttribute('aria-expanded', 'false');
    }
  }

  if (textSizeControl) {
    textSizeControl.addEventListener('pointerenter', showTextSizeOptions);
    textSizeControl.addEventListener('pointerleave', hideTextSizeOptions);
    textSizeControl.addEventListener('focusin', showTextSizeOptions);
    textSizeControl.addEventListener('focusout', function (event) {
      if (!textSizeControl.contains(event.relatedTarget)) {
        hideTextSizeOptions();
      }
    });
    textSizeControl.addEventListener('click', function (event) {
      if ((event.pointerType === 'touch' || window.matchMedia('(hover: none)').matches) && event.target !== textSizeSlider) {
        showTextSizeOptions();
      }
    });
  }

  if (textSizeSlider) {
    textSizeSlider.addEventListener('input', function () {
      applyTextSize(this.value, true);
    });
  }

  applyTextSize(readSavedTextSize(), false);
  commitReadingView(readingView, true);

  function removeThemeClasses() {
    Array.from(body.classList).forEach(function (className) {
      if (className.indexOf('theme--') === 0) {
        body.classList.remove(className);
      }
    });
  }

  function applyTheme(value) {
    var themeValue = String(value).padStart(2, '0');
    removeThemeClasses();
    body.classList.add('theme--' + themeValue);
    if (themeSlider) {
      themeSlider.value = Number(value);
    }
  }

  // Match the homepage's automatic dark-mode choice on first load.
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme(0);
  } else {
    applyTheme(16);
  }

  if (themeSlider) {
    themeSlider.addEventListener('input', function () {
      applyTheme(this.value);
    });
  }

  function showThemeSlider() {
    body.classList.add('theme-slider--is--visible');
  }

  function hideThemeSlider() {
    body.classList.remove('theme-slider--is--visible');
  }

  if (themeControl) {
    themeControl.addEventListener('pointerenter', showThemeSlider);
    themeControl.addEventListener('pointerleave', hideThemeSlider);
    themeControl.addEventListener('focusin', showThemeSlider);
    themeControl.addEventListener('focusout', hideThemeSlider);
    themeControl.addEventListener('click', function (event) {
      if (event.pointerType === 'touch' || window.matchMedia('(hover: none)').matches) {
        showThemeSlider();
      }
    });
  }

  document.addEventListener('pointerdown', function (event) {
    if (themeControl && !themeControl.contains(event.target)) {
      hideThemeSlider();
    }
    if (textSizeControl && !textSizeControl.contains(event.target)) {
      hideTextSizeOptions();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hideThemeSlider();
      hideTextSizeOptions();
    }
  });

  var navigationCloseTimer;

  function setMobileNavigation(isOpen) {
    window.clearTimeout(navigationCloseTimer);
    if (navigationButton) {
      navigationButton.setAttribute('aria-expanded', String(isOpen));
    }

    if (isOpen) {
      body.classList.add('mobile-nav--is--transitioning');
      window.requestAnimationFrame(function () {
        body.classList.add('mobile-nav--is--visible');
      });
    } else {
      body.classList.remove('mobile-nav--is--visible');
      navigationCloseTimer = window.setTimeout(function () {
        body.classList.remove('mobile-nav--is--transitioning');
      }, 500);
    }
  }

  if (navigationButton) {
    navigationButton.addEventListener('click', function () {
      setMobileNavigation(!body.classList.contains('mobile-nav--is--visible'));
    });
  }

  // Section links use the case-study content itself for quick in-page travel.
  navigationLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) {
        return;
      }

      event.preventDefault();
      setMobileNavigation(false);
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  var observedSections = document.querySelectorAll('[data-case-section]');
  var closingSection = document.querySelector('[data-case-closing]');
  var caseStudyFooter = document.querySelector('.case-study-footer');
  var closingSectionIsActive = false;

  function clearActiveNavigation() {
    navigationLinks.forEach(function (link) {
      link.classList.remove('is--active');
    });
  }

  function restoreNearestNavigation() {
    var readingLine = window.innerHeight * 0.3;
    var nearestId = '';
    observedSections.forEach(function (section) {
      if (section.hidden) {
        return;
      }
      var bounds = section.getBoundingClientRect();
      if (bounds.top <= readingLine && bounds.bottom > 0) {
        nearestId = section.id;
      }
    });

    navigationLinks.forEach(function (link) {
      link.classList.toggle('is--active', Boolean(nearestId) && link.getAttribute('href') === '#' + nearestId);
    });
  }

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        if (closingSectionIsActive) {
          clearActiveNavigation();
          return;
        }

        navigationLinks.forEach(function (link) {
          if (link.hidden) {
            link.classList.remove('is--active');
            return;
          }
          link.classList.toggle('is--active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-22% 0px -68% 0px', threshold: 0 });

    observedSections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    if (closingSection) {
      var closingObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          closingSectionIsActive = entry.isIntersecting;
          body.classList.toggle('case-study-closing--is-visible', closingSectionIsActive);
          if (closingSectionIsActive) {
            clearActiveNavigation();
          } else {
            restoreNearestNavigation();
          }
        });
      }, { rootMargin: '0px', threshold: 0 });
      closingObserver.observe(closingSection);
    }

    // The floating Details/TL;DR switch is useful while reading, but should
    // disappear when the footer itself enters the viewport.
    if (caseStudyFooter) {
      var footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          body.classList.toggle('case-study-footer--is-visible', entry.isIntersecting);
        });
      }, { threshold: 0.01 });
      footerObserver.observe(caseStudyFooter);
    }
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1020 && body.classList.contains('mobile-nav--is--visible')) {
      setMobileNavigation(false);
    }
  }, { passive: true });

  // Preserve the homepage theme shortcuts: W/B toggles monochrome and S
  // travels through the spectrum one step at a time.
  document.addEventListener('keydown', function (event) {
    if (event.target.matches('input, textarea, select')) {
      return;
    }

    var key = event.key.toLowerCase();
    if (key === 'w' || key === 'b') {
      applyTheme(body.classList.contains('theme--00') ? 16 : 0);
    } else if (key === 's') {
      var currentValue = themeSlider ? Number(themeSlider.value) : 16;
      applyTheme(currentValue <= 0 ? 16 : currentValue - 1);
    }
  });
})();

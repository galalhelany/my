(function () {
  'use strict';

  var requestedProject = new URLSearchParams(window.location.search).get('project');
  if (document.documentElement.lang !== 'ar' || (requestedProject && requestedProject !== 'mosaic-erp')) {
    return;
  }

  var canonicalUrl = 'https://galalhelany.com/mosaic-arc-erp-case-study-ar.html';
  var englishUrl = 'https://galalhelany.com/mosaic-arc-erp-case-study.html';
  var title = 'دراسة حالة تصميم Mosaic ERP | جلال حيلاني';
  var description = 'اكتشف كيف صُمم Mosaic، وهو نظام ERP متخصص لفرق التجهيزات المعمارية، عبر البحث ومسارات العمل والصلاحيات ونظام التصميم والنماذج الأولية والتحقق.';

  document.title = title;

  function setMeta(selector, attribute, value) {
    var element = document.querySelector(selector);
    if (element) {
      element.setAttribute(attribute, value);
    }
  }

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[property="og:locale"]', 'content', 'ar_SY');
  setMeta('meta[property="og:locale:alternate"]', 'content', 'en_US');
  setMeta('meta[property="og:image:alt"]', 'content', 'مجموعة واجهات نظام Mosaic ARC ERP');
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:url"]', 'content', canonicalUrl);
  setMeta('meta[name="twitter:image:alt"]', 'content', 'مجموعة واجهات نظام Mosaic ARC ERP');

  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.href = canonicalUrl;
  }

  function setAlternate(language, href) {
    var link = document.querySelector('link[rel="alternate"][hreflang="' + language + '"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = language;
      document.head.appendChild(link);
    }
    link.href = href;
  }

  setAlternate('ar', canonicalUrl);
  setAlternate('en', englishUrl);
  setAlternate('x-default', englishUrl);

  var schema = document.querySelector('#mosaic-case-study-schema');
  if (schema) {
    try {
      var schemaData = JSON.parse(schema.textContent);
      schemaData['@id'] = canonicalUrl + '#article';
      schemaData.url = canonicalUrl;
      schemaData.mainEntityOfPage = { '@type': 'WebPage', '@id': canonicalUrl };
      schemaData.headline = 'دراسة حالة تصميم Mosaic ERP';
      schemaData.description = description;
      schemaData.inLanguage = 'ar';
      schema.textContent = JSON.stringify(schemaData);
    } catch (error) {
      // Keep the valid English schema if a future edit changes its structure.
    }
  }

  var translations = {
    "Overview": "نظرة عامة",
    "Challenge": "التحدي",
    "Audit": "التدقيق",
    "Discovery": "الاستكشاف",
    "Business & Domain": "الأعمال والمجال",
    "Competition": "المنافسون",
    "Users": "المستخدمون",
    "Processes": "العمليات",
    "Problem": "المشكلة",
    "IAM": "إدارة الهوية والوصول",
    "IA": "هندسة المعلومات",
    "Domain Model": "نموذج المجال",
    "Flows": "المسارات",
    "UX Structure": "بنية تجربة المستخدم",
    "Design System": "نظام التصميم",
    "Key UI": "الواجهات الرئيسية",
    "Testing": "الاختبار",
    "Handoff": "التسليم للتطوير",
    "Outcome": "النتيجة",
    "Takeaways": "الخلاصات",
    "Insights": "الاستنتاجات",
    "Interface": "الواجهات",
    "Validation": "التحقق",
    "Details": "التفاصيل",
    "TL;DR": "الخلاصة",
    "Enterprise ERP · Systems Thinking · Complex Workflows": "نظام ERP مؤسسي · تفكير منظومي · مسارات عمل معقدة",
    "Designing a scalable ERP for architectural hardware distribution.": "تصميم نظام ERP قابل للتوسع لتوزيع التجهيزات المعمارية.",
    "Role": "الدور",
    "Product Designer": "مصمم منتجات",
    "Product Type": "نوع المنتج",
    "Enterprise ERP": "نظام ERP مؤسسي",
    "Platform": "المنصة",
    "Web": "الويب",
    "Industry": "القطاع",
    "Construction · Architectural Hardware · B2B SaaS": "الإنشاءات · التجهيزات المعمارية · برمجيات B2B",
    "Timeline": "المدة",
    "9 months": "9 أشهر",
    "Scope": "النطاق",
    "Discovery · Research · IA · UX · Ready production Design System & UI · Prototype · Validation · Handoff": "الاستكشاف · البحث · هندسة المعلومات · تجربة المستخدم · نظام تصميم وواجهات جاهزة للإنتاج · النمذجة الأولية · التحقق · التسليم",
    "Overview": "نظرة عامة",
    "What is Mosaic?": "ما هو Mosaic؟",
    "Challenge": "التحدي",
    "Turning Complexity Into a Scalable System": "تحويل التعقيد إلى نظام قابل للتوسع",
    "Existing Product Audit": "تدقيق المنتج الحالي",
    "Existing ERP Review": "مراجعة نظام ERP الحالي",
    "Discovery & Research": "الاستكشاف والبحث",
    "Exploring the Problem Space": "استكشاف مساحة المشكلة",
    "Business & Domain Research": "بحث الأعمال والمجال",
    "Why Generic ERP Falls Short": "لماذا لا يكفي نظام ERP عام؟",
    "Competitive Analysis": "تحليل المنافسين",
    "Deep functionality existed clarity was the opportunity": "الوظائف العميقة موجودة؛ وكانت الفرصة في الوضوح",
    "Users & Needs": "المستخدمون والاحتياجات",
    "Different Roles, Different Needs": "أدوار مختلفة واحتياجات مختلفة",
    "Business Process Mapping": "رسم عمليات الأعمال",
    "Understanding End-to-End Workflows": "فهم مسارات العمل من البداية إلى النهاية",
    "Problem Definition": "تعريف المشكلة",
    "Defining the Real Design Challenge": "تحديد تحدي التصميم الحقيقي",
    "Identity & Access Management": "إدارة الهوية والوصول",
    "Designing Roles, Permissions, and Access": "تصميم الأدوار والصلاحيات والوصول",
    "Information Architecture": "هندسة المعلومات",
    "Organizing the Product Architecture": "تنظيم بنية المنتج",
    "How do Business Objects Connect?": "كيف ترتبط كائنات الأعمال؟",
    "User Flows": "مسارات المستخدم",
    "Translating Structure Into Actions": "تحويل البنية إلى إجراءات",
    "Designing for Data-Dense Enterprise Work": "التصميم لعمل مؤسسي كثيف البيانات",
    "Building for Consistency": "البناء من أجل الاتساق",
    "Key Workflows & UI": "مسارات العمل والواجهات الرئيسية",
    "From Product Thinking to UI": "من التفكير في المنتج إلى الواجهة",
    "Prototype & Testing": "النموذج الأولي والاختبار",
    "Validating Design Decisions": "التحقق من قرارات التصميم",
    "Developer Handoff": "التسليم للمطورين",
    "A System Ready to Build": "نظام جاهز للبناء",
    "A System Built to Scale": "نظام مصمم للتوسع",
    "Key Takeaways": "أهم الخلاصات",
    "Turning Complexity Into Clarity": "تحويل التعقيد إلى وضوح",
    "Mosaic at a glance": "Mosaic في لمحة",
    "Challenge & Starting Point": "التحدي ونقطة البداية",
    "What I Learned": "ما تعلمته",
    "Five signals shaped the product direction": "خمس إشارات شكّلت اتجاه المنتج",
    "Validation & Delivery": "التحقق والتسليم",
    "Outcome & Takeaways": "النتيجة والخلاصات",
    "Mosaic is a specialized model within ARC ERP designed for companies operating in the door, frame, and architectural hardware distribution industry.": "Mosaic نموذج متخصص ضمن ARC ERP صُمم للشركات العاملة في توزيع الأبواب والإطارات والتجهيزات المعمارية.",
    "Unlike a generic ERP, Mosaic is structured around the way architectural opening projects are actually planned, specified, ordered, coordinated, and delivered. It brings project information, openings, doors and frames, hardware sets, orders, suppliers, documents, and operational data into one connected environment.": "بخلاف أنظمة ERP العامة، بُني Mosaic حول الطريقة الفعلية لتخطيط مشاريع الفتحات المعمارية وتوصيفها وطلبها وتنسيقها وتسليمها. ويجمع معلومات المشاريع والفتحات والأبواب والإطارات ومجموعات التجهيزات والطلبات والموردين والوثائق والبيانات التشغيلية في بيئة مترابطة واحدة.",
    "One System for Complex Project Operations": "نظام واحد لعمليات المشاريع المعقدة",
    "Architectural hardware projects contain highly interconnected information.": "تحتوي مشاريع التجهيزات المعمارية على معلومات شديدة الترابط.",
    "A single project can include hundreds of openings, with each opening carrying its own door, frame, wall, fire-rating, hardware, and specification requirements. Those requirements eventually influence quotations, purchasing, orders, shipments, receiving, project costs, and documentation.": "قد يضم المشروع الواحد مئات الفتحات، ولكل فتحة متطلباتها الخاصة من الباب والإطار والجدار وتصنيف مقاومة الحريق والتجهيزات والمواصفات. وتؤثر هذه المتطلبات لاحقًا في عروض الأسعار والمشتريات والطلبات والشحنات والاستلام وتكاليف المشروع والوثائق.",
    "Mosaic creates a structured relationship between these operational objects rather than treating them as isolated records.": "ينشئ Mosaic علاقة منظمة بين هذه الكائنات التشغيلية بدل التعامل معها كسجلات منفصلة.",
    "Mosaic was not simply a dashboard redesign. The product needed to support detailed configurations, interconnected data, multiple roles, permissions, dense information, long operational workflows, and future expansion without making everyday tasks harder to understand.": "لم يكن Mosaic مجرد إعادة تصميم للوحة معلومات. كان على المنتج دعم إعدادات تفصيلية وبيانات مترابطة وأدوار وصلاحيات متعددة ومعلومات كثيفة ومسارات تشغيل طويلة وتوسع مستقبلي، من دون جعل المهام اليومية أصعب فهمًا.",
    "How might we transform a collection of disconnected ERP screens into a scalable operational system capable of supporting complex projects, products, workflows, roles, permissions, and future modules without overwhelming users?": "كيف يمكننا تحويل مجموعة من شاشات ERP المنفصلة إلى نظام تشغيلي قابل للتوسع يدعم المشاريع والمنتجات والمسارات والأدوار والصلاحيات والوحدات المستقبلية المعقدة من دون إرباك المستخدمين؟",
    "Complexity": "التعقيد",
    "Architectural hardware data includes detailed door, frame, hardware, specification, and compliance relationships.": "تشمل بيانات التجهيزات المعمارية علاقات تفصيلية بين الأبواب والإطارات والتجهيزات والمواصفات ومتطلبات الامتثال.",
    "Cross-functional workflows": "مسارات عمل متعددة الوظائف",
    "Sales, projects, procurement, inventory, finance, and customer service depend on shared information.": "تعتمد المبيعات والمشاريع والمشتريات والمخزون والمالية وخدمة العملاء على معلومات مشتركة.",
    "Scalability": "قابلية التوسع",
    "The architecture needed room for more organizations, users, modules, data, roles, and researched integration needs.": "احتاجت البنية إلى استيعاب مزيد من المؤسسات والمستخدمين والوحدات والبيانات والأدوار واحتياجات التكامل المدروسة.",
    "Usability": "سهولة الاستخدام",
    "Operational depth had to remain clear enough for frequent work, review, and decision-making.": "كان لا بد أن يبقى العمق التشغيلي واضحًا بما يكفي للعمل المتكرر والمراجعة واتخاذ القرار.",
    "Home page": "الصفحة الرئيسية",
    "User management": "إدارة المستخدمين",
    "All orders": "كل الطلبات",
    "Add order": "إضافة طلب",
    "Order detail": "تفاصيل الطلب",
    "All templates": "كل القوالب",
    "The existing design was reviewed against the needs of a scalable ERP. The audit examined structure, reuse, responsiveness, workflow continuity, and support for enterprise operations—not only visual consistency.": "رُوجع التصميم الحالي مقابل احتياجات نظام ERP قابل للتوسع. وفحص التدقيق البنية وإعادة الاستخدام والتجاوب واستمرارية المسارات ودعم العمليات المؤسسية، لا الاتساق البصري وحده.",
    "No structured design system": "غياب نظام تصميم منظم",
    "Reusable components, shared states, tokens, and scalable component rules were limited.": "كانت المكونات القابلة لإعادة الاستخدام والحالات المشتركة والرموز وقواعد توسيع المكونات محدودة.",
    "Inadequate grid foundation": "أساس شبكي غير كافٍ",
    "Alignment and adaptation across desktop, tablet, and smaller screens lacked a consistent framework.": "افتقر المحاذاة والتكيف عبر سطح المكتب والجهاز اللوحي والشاشات الأصغر إلى إطار متسق.",
    "Dashboard thinking": "تفكير محصور في لوحة المعلومات",
    "The early structure did not sufficiently account for tables, forms, approvals, documents, reporting, and cross-module relationships.": "لم تراعِ البنية المبكرة بما يكفي الجداول والنماذج والموافقات والوثائق والتقارير والعلاقات بين الوحدات.",
    "No clear user flows": "غياب مسارات مستخدم واضحة",
    "Entry points, task progression, completion states, and relationships between modules required definition.": "احتاجت نقاط الدخول وتقدم المهام وحالات الإكمال والعلاقات بين الوحدات إلى تعريف واضح.",
    "Responsive risk": "مخاطر التجاوب",
    "Dense tables, forms, and multi-column operations were not prepared for progressive adaptation.": "لم تكن الجداول والنماذج الكثيفة والعمليات متعددة الأعمدة مهيأة للتكيف التدريجي.",
    "Missing shared guidelines": "غياب إرشادات مشتركة",
    "Future modules did not have documented rules for maintaining consistency.": "لم تكن للوحدات المستقبلية قواعد موثقة للحفاظ على الاتساق.",
    "No separate original “before” screens were found in the repository, so the audit is documented without fabricating a visual comparison.": "لم تتوفر شاشات أصلية منفصلة تمثل حالة «قبل»، لذلك وُثق التدقيق من دون اختلاق مقارنة بصرية.",
    "Discovery was grouped into five lenses to connect business priorities, role behavior, product scope, technical constraints, and experience quality. This prevented a long question list from becoming detached from design decisions.": "نُظم الاستكشاف ضمن خمس عدسات تربط أولويات العمل وسلوك الأدوار ونطاق المنتج والقيود التقنية وجودة التجربة، حتى لا تنفصل قائمة الأسئلة الطويلة عن قرارات التصميم.",
    "Business": "الأعمال",
    "Business problems, critical workflows, success criteria, and future product direction.": "مشكلات الأعمال والمسارات الحرجة ومعايير النجاح واتجاه المنتج المستقبلي.",
    "Primary roles, workflow behavior, existing ERP pain points, module switching, and customization needs.": "الأدوار الأساسية وسلوك المسارات ونقاط الألم في نظام ERP الحالي والتنقل بين الوحدات واحتياجات التخصيص.",
    "Product": "المنتج",
    "Must-have functions, researched automation opportunities, configuration, and dashboard requirements.": "الوظائف الأساسية وفرص الأتمتة المدروسة ومتطلبات الإعداد ولوحات المعلومات.",
    "Technology": "التقنية",
    "Integration, collaboration, cloud access, security, compliance, and offline considerations.": "التكامل والتعاون والوصول السحابي والأمان والامتثال والعمل دون اتصال.",
    "Experience": "التجربة",
    "Visual direction, information density, accessibility, responsive behavior, and industry conventions.": "الاتجاه البصري وكثافة المعلومات وإمكانية الوصول والسلوك المتجاوب وأعراف القطاع.",
    "Architectural hardware projects connect openings, doors, frames, wall types, fire ratings, hardware sets, products, manufacturers, suppliers, specifications, approvals, orders, and shipments. Changes to one object can affect several downstream teams and records.": "تربط مشاريع التجهيزات المعمارية الفتحات والأبواب والإطارات وأنواع الجدران وتصنيفات الحريق ومجموعات التجهيزات والمنتجات والمصنّعين والموردين والمواصفات والموافقات والطلبات والشحنات. وقد يؤثر تغيير كائن واحد في فرق وسجلات لاحقة متعددة.",
    "Industry complexity": "تعقيد القطاع",
    "Configurations, manufacturers, product dependencies, compliance requirements, fire ratings, and specifications must remain connected.": "يجب أن تبقى الإعدادات والمصنّعون واعتماديات المنتجات ومتطلبات الامتثال وتصنيفات الحريق والمواصفات مترابطة.",
    "Project complexity": "تعقيد المشروع",
    "Projects can contain many openings, schedules, stakeholders, suppliers, changes, approvals, and related orders.": "قد تضم المشاريع فتحات وجداول وأصحاب مصلحة وموردين وتغييرات وموافقات وطلبات مترابطة كثيرة.",
    "Operational friction": "الاحتكاك التشغيلي",
    "The supplied research material identified spreadsheets, manual processes, duplicate data, quoting, procurement, inventory, and shipment tracking as problem areas.": "حددت مواد البحث جداول البيانات والعمليات اليدوية وتكرار البيانات والتسعير والمشتريات والمخزون وتتبع الشحنات كمناطق مشكلة.",
    "Financial needs": "الاحتياجات المالية",
    "Project costs, billing, invoicing, profitability visibility, and financial reporting need project context.": "تحتاج تكاليف المشروع والفوترة وإصدار الفواتير ووضوح الربحية والتقارير المالية إلى سياق المشروع.",
    "Customer and stakeholder needs": "احتياجات العملاء وأصحاب المصلحة",
    "Order visibility, communication, delivery tracking, and issue resolution depend on reliable shared status.": "يعتمد وضوح الطلبات والتواصل وتتبع التسليم وحل المشكلات على حالة مشتركة وموثوقة.",
    "Market research was used as a secondary signal. No precise market-size statistic is presented because its source was not available in the supplied files.": "استُخدم بحث السوق كإشارة ثانوية، ولم تُعرض إحصائية دقيقة لحجم السوق لأن مصدرها لم يكن متاحًا ضمن الملفات.",
    "Competitive analysis overview": "نظرة عامة على تحليل المنافسين",
    "Competitor feature matrix": "مصفوفة خصائص المنافسين",
    "Research reviewed Comsense Enterprise, PRO-TECH TITAN, AVAware Technologies, and Insite4Doors. The comparison focused on the supplied research themes rather than asserting unsupported feature parity.": "راجع البحث منتجات Comsense Enterprise وPRO-TECH TITAN وAVAware Technologies وInsite4Doors. وركزت المقارنة على محاور البحث المتاحة من دون افتراض تكافؤ غير موثق في الخصائص.",
    "Research focus": "محور البحث",
    "Supported signal": "الإشارة المدعومة",
    "Opportunity considered": "الفرصة المدروسة",
    "Established industry specialization": "تخصص راسخ في القطاع",
    "Interface clarity and learning experience": "وضوح الواجهة وتجربة التعلم",
    "Cloud-based project focus": "تركيز سحابي على المشاريع",
    "Learnability and workflow coherence": "سهولة التعلم واتساق المسارات",
    "Deep traditional workflows": "مسارات تقليدية عميقة",
    "Modernization and cloud access": "التحديث والوصول السحابي",
    "Broad door-industry operations": "عمليات واسعة في قطاع الأبواب",
    "Connected navigation and scale": "تنقل مترابط وقابلية للتوسع",
    "Connected architectural-hardware operations": "عمليات مترابطة للتجهيزات المعمارية",
    "Responsive modular product direction": "اتجاه منتج معياري ومتجاوب",
    "Clarity, context, permissions, and systems": "الوضوح والسياق والصلاحيات والأنظمة",
    "The market already contained deep functionality. Mosaic’s opportunity was not simply to add more features, but to make complex industry workflows clearer, more connected, easier to navigate, and easier to scale.": "كان السوق يضم بالفعل وظائف عميقة. لم تكن فرصة Mosaic في إضافة مزيد من الخصائص فحسب، بل في جعل مسارات القطاع المعقدة أوضح وأكثر ترابطًا وأسهل تنقلًا وتوسعًا.",
    "Role-based archetypes kept the work grounded in responsibilities instead of fictional names, ages, or biographies.": "أبقت النماذج القائمة على الأدوار العمل مرتبطًا بالمسؤوليات بدل الأسماء والأعمار والسير المتخيلة.",
    "Sales Representative": "مندوب المبيعات",
    "Manages quotations, customer relationships, order creation, and follow-up. Needs pricing, stock context, quote speed, order status, and customer history; manual entry and limited visibility create friction.": "يدير عروض الأسعار وعلاقات العملاء وإنشاء الطلبات والمتابعة. ويحتاج إلى الأسعار وسياق المخزون وسرعة التسعير وحالة الطلب وسجل العميل؛ بينما يسبب الإدخال اليدوي وضعف الرؤية احتكاكًا.",
    "Project Manager": "مدير المشروع",
    "Coordinates timelines, budgets, resources, suppliers, and changes. Needs milestones, approvals, procurement context, and material visibility; fragmented information slows coordination.": "ينسق الجداول الزمنية والميزانيات والموارد والموردين والتغييرات. ويحتاج إلى المراحل والموافقات وسياق المشتريات ووضوح المواد؛ بينما تبطئ المعلومات المجزأة التنسيق.",
    "Customer Service": "خدمة العملاء",
    "Needs customer and order history, issue tracking, communication context, and current delivery status.": "تحتاج إلى سجل العميل والطلب وتتبع المشكلات وسياق التواصل وحالة التسليم الحالية.",
    "Inventory / Procurement": "المخزون والمشتريات",
    "Needs stock visibility, supplier context, purchasing, receiving, and material planning.": "يحتاج إلى وضوح المخزون وسياق الموردين والشراء والاستلام وتخطيط المواد.",
    "Finance": "المالية",
    "Needs project-linked invoices, costs, billing information, and reporting.": "تحتاج إلى فواتير وتكاليف وبيانات فوترة وتقارير مرتبطة بالمشروع.",
    "Organization Administrator": "مسؤول المؤسسة",
    "Needs users, roles, permissions, configuration, and researched integration settings.": "يحتاج إلى إدارة المستخدمين والأدوار والصلاحيات والإعدادات والتكاملات المدروسة.",
    "User-needs synthesis": "خلاصة احتياجات المستخدمين",
    "Visibility": "الوضوح",
    "Efficiency": "الكفاءة",
    "Coordination": "التنسيق",
    "Control": "التحكم",
    "Customization": "التخصيص",
    "Traceability": "قابلية التتبع",
    "Business process mapping": "رسم عمليات الأعمال",
    "Strategic areas—projects, sales, inventory, supply chain, customer relationships, and finance—were connected to tactical processes such as quotation, procurement, order management, project coordination, and support. Operational flows then exposed dependencies and handoffs.": "رُبطت المجالات الاستراتيجية—المشاريع والمبيعات والمخزون وسلسلة التوريد وعلاقات العملاء والمالية—بعمليات تكتيكية مثل التسعير والمشتريات وإدارة الطلبات وتنسيق المشاريع والدعم. ثم كشفت المسارات التشغيلية الاعتماديات ونقاط التسليم.",
    "Mosaic needed to unify highly interconnected operational workflows without reproducing the complexity associated with traditional ERP systems.": "احتاج Mosaic إلى توحيد مسارات تشغيل شديدة الترابط من دون إعادة إنتاج التعقيد المرتبط بأنظمة ERP التقليدية.",
    "Work crosses departments and modules": "العمل يعبر الأقسام والوحدات",
    "Handoffs and shared status matter": "نقاط التسليم والحالة المشتركة أساسية",
    "One Operational Source of Truth": "مصدر تشغيلي موحد للحقيقة",
    "Model end-to-end operations before UI": "نمذجة العمليات كاملة قبل تصميم الواجهة",
    "The architecture had to answer not only what information exists, but who can see, create, edit, approve, remove, or administer it.": "كان على البنية أن تجيب ليس فقط عمّا هي المعلومات الموجودة، بل عمّن يستطيع رؤيتها وإنشاءها وتعديلها واعتمادها وحذفها وإدارتها.",
    "RBAC baseline": "أساس RBAC",
    "Role-Based Access Control groups predictable permissions by responsibility instead of configuring every user independently.": "يجمع التحكم بالوصول القائم على الدور الصلاحيات المتوقعة حسب المسؤولية بدل إعداد كل مستخدم بصورة مستقلة.",
    "ABAC where context matters": "استخدام ABAC عندما يفرض السياق ذلك",
    "Organization, department, location, resource, or other attributes can shape contextual access where a role alone is insufficient.": "يمكن لخصائص المؤسسة والقسم والموقع والمورد وغيرها أن تحدد الوصول السياقي عندما لا يكون الدور وحده كافيًا.",
    "Least privilege": "أقل قدر من الصلاحيات",
    "Users should receive only the access required for their responsibilities.": "ينبغي أن يحصل المستخدمون فقط على الوصول المطلوب لمسؤولياتهم.",
    "DAC limitation": "حدود DAC",
    "Highly discretionary individual sharing was considered a weaker primary model because it can make governance and review harder.": "اعتُبرت المشاركة الفردية واسعة التقدير نموذجًا أساسيًا أضعف لأنها قد تصعّب الحوكمة والمراجعة.",
    "Proposed role hierarchy": "التسلسل المقترح للأدوار",
    "Super Admin": "المسؤول الأعلى",
    "Platform-level administration": "إدارة على مستوى المنصة",
    "System Admin": "مسؤول النظام",
    "System and organization administration": "إدارة النظام والمؤسسة",
    "Organization Admin": "مسؤول المؤسسة",
    "Organization users and settings": "مستخدمو المؤسسة وإعداداتها",
    "Default Roles": "الأدوار الافتراضية",
    "Predefined operational permissions": "صلاحيات تشغيلية محددة مسبقًا",
    "Custom Roles": "أدوار مخصصة",
    "Configured permission combinations": "تركيبات صلاحيات مهيأة",
    "This is a proposed access model explored during design, not a claim of complete implementation.": "هذا نموذج وصول مقترح جرى استكشافه أثناء التصميم، وليس ادعاءً باكتمال تنفيذه.",
    "Mosaic sits within a wider ARC ERP context that includes Sales, Purchasing, Manufacturing, Items, MRP, Employees, Quality, PLM, Projects, Receivables, Payables, PM, and Admin. Its own architecture needed to stay connected to that ecosystem while keeping domain-specific work coherent.": "يقع Mosaic ضمن سياق ARC ERP أوسع يضم المبيعات والمشتريات والتصنيع والمواد وMRP والموظفين والجودة وPLM والمشاريع والمدينين والدائنين وإدارة المشاريع والإدارة. وكان على بنيته أن تبقى متصلة بهذه المنظومة مع الحفاظ على اتساق العمل المتخصص.",
    "Proposed sitemap": "خريطة الموقع المقترحة",
    "Dashboard": "لوحة المعلومات",
    "Projects": "المشاريع",
    "Openings": "الفتحات",
    "Hardware & Libraries": "التجهيزات والمكتبات",
    "Orders": "الطلبات",
    "Reports & Documents": "التقارير والوثائق",
    "Notifications": "الإشعارات",
    "Administration": "الإدارة",
    "The sitemap combines designed structure with proposed and researched areas; it does not assert that every listed capability was implemented.": "تجمع خريطة الموقع بين البنية المصممة والمجالات المقترحة والمدروسة، ولا تفترض أن كل قدرة مدرجة قد نُفذت.",
    "Global workspace": "مساحة العمل العامة",
    "Where do I need to work?": "أين أحتاج إلى العمل؟",
    "Project workspace": "مساحة عمل المشروع",
    "What do I need to do inside this project?": "ماذا أحتاج إلى فعله داخل هذا المشروع؟",
    "The interface architecture needed to preserve relationships between business objects rather than treating each ERP module as an isolated destination.": "احتاجت بنية الواجهة إلى الحفاظ على العلاقات بين كائنات الأعمال بدل التعامل مع كل وحدة ERP كوجهة منفصلة.",
    "Organization": "المؤسسة",
    "Project": "المشروع",
    "Opening": "الفتحة",
    "Door / Frame / Wall Type": "الباب / الإطار / نوع الجدار",
    "Hardware Set": "مجموعة التجهيزات",
    "Hardware Items": "عناصر التجهيزات",
    "Quote": "عرض السعر",
    "Order": "الطلب",
    "Shipment / Receiving": "الشحن / الاستلام",
    "Documents": "الوثائق",
    "Suppliers": "الموردون",
    "Approvals": "الموافقات",
    "Reports": "التقارير",
    "Permissions": "الصلاحيات",
    "Objects change across a shared lifecycle": "تتغير الكائنات ضمن دورة حياة مشتركة",
    "Modules cannot behave as silos": "لا يمكن للوحدات أن تعمل كجزر منفصلة",
    "Make Project the operational context": "اجعل المشروع هو السياق التشغيلي",
    "Role creation and login flows": "مسارات إنشاء الدور وتسجيل الدخول",
    "Role assignment and access denial": "إسناد الدور ورفض الوصول",
    "Detailed custom role flow": "المسار التفصيلي للدور المخصص",
    "Role assignment flow": "مسار إسناد الدور",
    "Custom role flow": "مسار الدور المخصص",
    "Password recovery flow": "مسار استعادة كلمة المرور",
    "Starting a new project": "بدء مشروع جديد",
    "Managing openings": "إدارة الفتحات",
    "Ordering": "إدارة الطلبات",
    "Managing shipments": "إدارة الشحنات",
    "Generating reports": "إنشاء التقارير",
    "The case-study material documents six representative workflow models. They show intended structure and dependencies; no claim is made that every flow reached implementation.": "توثق مواد دراسة الحالة ستة نماذج تمثيلية لمسارات العمل. وهي توضح البنية والاعتماديات المقصودة من دون الادعاء بأن كل مسار وصل إلى التنفيذ.",
    "The architecture translated into a predictable set of navigation, information, operation, action, and feedback patterns.": "تحولت البنية إلى مجموعة متوقعة من أنماط التنقل والمعلومات والعمليات والإجراءات والتغذية الراجعة.",
    "Navigation": "التنقل",
    "Global navigation, project navigation, breadcrumbs, and persistent project context.": "التنقل العام وتنقل المشروع ومسار التصفح وسياق المشروع المستمر.",
    "Information": "المعلومات",
    "Overviews, lists, entity details, and tabs create progressive depth.": "تخلق النظرات العامة والقوائم وتفاصيل الكيانات وعلامات التبويب عمقًا تدريجيًا.",
    "Data operations": "عمليات البيانات",
    "Tables, search, filters, sorting, pagination, bulk actions, and export were structured where appropriate.": "نُظمت الجداول والبحث والتصفية والفرز وترقيم الصفحات والإجراءات الجماعية والتصدير حيث يلزم.",
    "Actions": "الإجراءات",
    "Drawers, modals, forms, and multi-step workflows support different levels of task complexity.": "تدعم الأدراج والنوافذ والنماذج والمسارات متعددة الخطوات مستويات مختلفة من تعقيد المهام.",
    "System feedback": "تغذية النظام الراجعة",
    "Statuses, alerts, validation, loading, empty, and error states make progress and exceptions visible.": "تجعل حالات الحالة والتنبيه والتحقق والتحميل والفراغ والخطأ التقدم والاستثناءات واضحة.",
    "The audit exposed limited reuse and inconsistent foundations. The design response organized a reusable enterprise system so modules could share behavior instead of recreating it screen by screen.": "كشف التدقيق محدودية إعادة الاستخدام وعدم اتساق الأسس. ونظمت استجابة التصميم نظامًا مؤسسيًا قابلًا لإعادة الاستخدام كي تتشارك الوحدات السلوك بدل إعادة إنشائه شاشة بعد أخرى.",
    "States and responsive foundation": "الحالات وأساس التجاوب",
    "Default, hover, focus, selected, disabled, error, success, and loading states formed the intended coverage. Responsive behavior prioritized progressive adaptation: desktop supports dense operational work, while tablet and mobile emphasize lookup, status, approvals, and lightweight updates rather than compressing every workflow.": "شملت التغطية المقصودة حالات الافتراضي والتحويم والتركيز والتحديد والتعطيل والخطأ والنجاح والتحميل. وأعطى السلوك المتجاوب الأولوية للتكيف التدريجي: يدعم سطح المكتب العمل التشغيلي الكثيف، بينما يركز الجهاز اللوحي والجوال على الاستعلام والحالة والموافقات والتحديثات الخفيفة بدل ضغط كل مسار.",
    "Create New Role": "إنشاء دور جديد",
    "Sets Management": "إدارة المجموعات",
    "Role Management": "إدارة الأدوار",
    "Modify Users Super Admin": "تعديل المستخدمين — المسؤول الأعلى",
    "Modify Roles": "تعديل الأدوار",
    "Create Hardware Set": "إنشاء مجموعة تجهيزات",
    "View live ↗": "عرض مباشر ↗",
    "Gallery photos will be added here.": "ستُضاف صور المعرض هنا.",
    "I moved beyond static Figma prototypes by building a": "تجاوزت نماذج Figma الثابتة ببناء",
    "production-ready front-end prototype": "نموذج أولي للواجهة الأمامية جاهز للإنتاج",
    "to validate Mosaic’s workflows and Design System components in a real interactive environment.": "للتحقق من مسارات Mosaic ومكونات نظام التصميم ضمن بيئة تفاعلية حقيقية.",
    "This helped validate": "ساعد ذلك في التحقق من",
    "navigation, task sequences, states, permissions, responsive behavior, and component interactions": "التنقل وتسلسل المهام والحالات والصلاحيات والسلوك المتجاوب وتفاعلات المكونات",
    "before development handoff.": "قبل التسليم للتطوير.",
    "Explore a Live Example": "استكشف مثالًا مباشرًا",
    "This interactive prototype demonstrates both the": "يوضح هذا النموذج التفاعلي سلوك",
    "Side Navigation": "التنقل الجانبي",
    "behavior—expanded, collapsed, and pinned states—and the complete": "بحالاته الموسعة والمطوية والمثبتة، إلى جانب مسار صلاحيات",
    "Create New Role": "إنشاء دور جديد",
    "permission flow.": "الكامل.",
    "View Live Prototype ↗": "عرض النموذج المباشر ↗",
    "This is one representative example of the broader prototyping approach used across Mosaic to validate": "هذا مثال تمثيلي على منهج النمذجة الأولية الأوسع المستخدم في Mosaic للتحقق من",
    "reusable, implementation-ready interactions rather than isolated screens.": "تفاعلات قابلة لإعادة الاستخدام وجاهزة للتنفيذ بدل شاشات منفصلة.",
    "The documented handoff model connected the design system, responsive rules, workflow structure, and access logic so engineering could reason about behavior across modules.": "ربط نموذج التسليم الموثق نظام التصميم وقواعد التجاوب وبنية المسارات ومنطق الوصول، كي يتمكن فريق الهندسة من فهم السلوك عبر الوحدات.",
    "Reusable system": "نظام قابل لإعادة الاستخدام",
    "Components, variants, design tokens, interaction states, and responsive rules.": "المكونات والمتغيرات ورموز التصميم وحالات التفاعل وقواعد التجاوب.",
    "Operational states": "الحالات التشغيلية",
    "Loading, empty, error, success, validation, and status behavior.": "سلوك التحميل والفراغ والخطأ والنجاح والتحقق والحالة.",
    "Product logic": "منطق المنتج",
    "User flows, domain relationships, permission rules, and global versus project context.": "مسارات المستخدم وعلاقات المجال وقواعد الصلاحيات والسياق العام مقابل سياق المشروع.",
    "Documentation": "التوثيق",
    "Specifications and shared naming intended to reduce ambiguity between design and development.": "مواصفات وتسميات مشتركة تهدف إلى تقليل الالتباس بين التصميم والتطوير.",
    "The handoff went beyond Figma specifications. I translated the Mosaic Design System into": "تجاوز التسليم مواصفات Figma؛ إذ حولت نظام تصميم Mosaic إلى",
    "Storybook": "Storybook",
    ", giving developers an implementation-ready reference for reusable components, variants, states, interaction patterns, and usage guidelines—creating a clearer bridge between design and development and supporting consistency across the product.": "، لتوفير مرجع جاهز للتنفيذ للمكونات القابلة لإعادة الاستخدام ومتغيراتها وحالاتها وأنماط التفاعل وإرشادات الاستخدام، بما يبني جسرًا أوضح بين التصميم والتطوير ويدعم الاتساق في المنتج.",
    "View Storybook ↗": "عرض Storybook ↗",
    "No verified performance metrics were supplied. The supported outcomes are structural product-design deliverables and directions.": "لم تُقدّم مؤشرات أداء موثقة. وتتمثل النتائج المدعومة في مخرجات واتجاهات بنيوية لتصميم المنتج.",
    "Defined global and project contexts": "تحديد السياق العام وسياق المشروع",
    "Mapped core ERP relationships": "رسم علاقات ERP الأساسية",
    "Proposed role and permission architecture": "اقتراح بنية الأدوار والصلاحيات",
    "Structured reusable enterprise patterns": "تنظيم أنماط مؤسسية قابلة لإعادة الاستخدام",
    "Established a design-system direction": "تأسيس اتجاه لنظام التصميم",
    "Created a framework for future modules": "إنشاء إطار للوحدات المستقبلية",
    "The work also improved responsive readiness and clarified the intended design-to-development handoff. These statements describe the documented product foundation; they do not claim launch or business performance.": "حسّن العمل أيضًا الجاهزية للتجاوب ووضح التسليم المقصود من التصميم إلى التطوير. تصف هذه العبارات أساس المنتج الموثق ولا تدّعي نتائج إطلاق أو أداء أعمال.",
    "Enterprise design is not about removing complexity. It is about structuring complexity so users can understand, navigate, and control it.": "لا يدور التصميم المؤسسي حول إزالة التعقيد، بل حول تنظيمه كي يتمكن المستخدمون من فهمه والتنقل فيه والتحكم به.",
    "Mosaic required business analysis, domain and competitive research, user understanding, process mapping, systems thinking, IAM, information architecture, domain modeling, workflow design, data-dense UX, design systems, responsive design, and technical collaboration.": "تطلب Mosaic تحليل الأعمال وبحث المجال والمنافسين وفهم المستخدمين ورسم العمليات والتفكير المنظومي وإدارة الهوية والوصول وهندسة المعلومات ونمذجة المجال وتصميم المسارات وتجربة مستخدم كثيفة البيانات وأنظمة التصميم والتصميم المتجاوب والتعاون التقني.",
    "The biggest shift was moving from designing ERP screens to designing an interconnected operational system.": "كان التحول الأكبر هو الانتقال من تصميم شاشات ERP إلى تصميم نظام تشغيلي مترابط.",
    "Mosaic is a specialized model within ARC ERP for door, frame, and architectural hardware distributors.": "Mosaic نموذج متخصص ضمن ARC ERP لموزعي الأبواب والإطارات والتجهيزات المعمارية.",
    "It brings complex project operations into one connected workspace—linking": "يجمع عمليات المشاريع المعقدة في مساحة عمل مترابطة واحدة، تربط",
    "projects, openings, doors and frames, hardware, quotes, orders, suppliers, shipments, and documents.": "المشاريع والفتحات والأبواب والإطارات والتجهيزات وعروض الأسعار والطلبات والموردين والشحنات والوثائق.",
    "The platform supports multiple operational roles—including": "تدعم المنصة أدوارًا تشغيلية متعددة تشمل",
    "Sales, Project Management, Procurement, Customer Service, Finance, and Administration": "المبيعات وإدارة المشاريع والمشتريات وخدمة العملاء والمالية والإدارة",
    "—while keeping project information and workflows connected throughout the lifecycle.": "مع إبقاء معلومات المشروع ومسارات العمل مترابطة طوال دورة الحياة.",
    "No scalable design system": "غياب نظام تصميم قابل للتوسع",
    "Limited component reuse and shared states.": "إعادة استخدام محدودة للمكونات والحالات المشتركة.",
    "Weak responsive foundation": "أساس متجاوب ضعيف",
    "Inconsistent grid and unresolved dense-screen adaptation.": "شبكة غير متسقة وتكيف غير محسوم للشاشات الكثيفة.",
    "Unclear flows": "مسارات غير واضحة",
    "Entry, progression, completion, and module relationships needed definition.": "احتاجت نقاط الدخول والتقدم والإكمال وعلاقات الوحدات إلى تعريف.",
    "Dashboard-oriented structure": "بنية تتمحور حول لوحة المعلومات",
    "Operational tables, forms, approvals, documents, and cross-module work were underrepresented.": "لم تُمثل الجداول والنماذج والموافقات والوثائق والعمل بين الوحدات بما يكفي.",
    "Limited access model": "نموذج وصول محدود",
    "Roles, permissions, and contextual visibility needed an explicit architecture.": "احتاجت الأدوار والصلاحيات والوضوح السياقي إلى بنية صريحة.",
    "How might we turn disconnected ERP screens into a scalable operational system without overwhelming users?": "كيف نحول شاشات ERP المنفصلة إلى نظام تشغيلي قابل للتوسع من دون إرباك المستخدمين؟",
    "Openings, doors, frames, hardware, specifications, suppliers, orders, and compliance data form a connected domain.": "تشكل الفتحات والأبواب والإطارات والتجهيزات والمواصفات والموردون والطلبات وبيانات الامتثال مجالًا مترابطًا.",
    "Sales, project, service, procurement, finance, and admin roles require different information and control.": "تحتاج أدوار المبيعات والمشاريع والخدمة والمشتريات والمالية والإدارة إلى معلومات ومستويات تحكم مختلفة.",
    "Spreadsheet dependence, duplicate data, and disconnected workflows create operational friction.": "يؤدي الاعتماد على جداول البيانات وتكرار البيانات والمسارات المنفصلة إلى احتكاك تشغيلي.",
    "Existing products offer deep functionality; clarity, learnability, connection, and scale remain opportunities.": "توفر المنتجات الحالية وظائف عميقة، بينما يبقى الوضوح وسهولة التعلم والترابط والتوسع فرصًا للتحسين.",
    "Quotation and procurement span departments, objects, decisions, and handoffs rather than isolated modules.": "يمتد التسعير والمشتريات عبر الأقسام والكائنات والقرارات ونقاط التسليم بدل وحدات منفصلة.",
    "Evidence": "الدليل",
    "Complex cross-functional operations": "عمليات معقدة متعددة الوظائف",
    "Insight": "الاستنتاج",
    "Users need shared truth with role-specific views": "يحتاج المستخدمون إلى حقيقة مشتركة مع عروض مخصصة لكل دور",
    "Decision": "القرار",
    "Design the operating model before the interface": "تصميم النموذج التشغيلي قبل الواجهة",
    "Prototype & workflow validation": "التحقق من النموذج الأولي ومسار العمل",
    "The documented scope covered context, sequence, state, responsibility, and next actions across representative flows. No participants, findings, metrics, or iteration artifacts were supplied.": "غطى النطاق الموثق السياق والتسلسل والحالة والمسؤولية والإجراءات التالية عبر مسارات تمثيلية.",
    "Developer handoff": "التسليم للمطورين",
    "The intended package connected components, variants, tokens, interaction states, responsive rules, UX flows, permissions logic, and documentation. Source handoff files were not supplied for verification.": "ربطت حزمة التسليم المقصودة المكونات ومتغيراتها والرموز وحالات التفاعل وقواعد التجاوب ومسارات تجربة المستخدم ومنطق الصلاحيات والتوثيق.",
    "Clear global and project contexts": "سياق عام وسياق مشروع واضحان",
    "Structured object relationships": "علاقات منظمة بين الكائنات",
    "Proposed role and permission foundation": "أساس مقترح للأدوار والصلاحيات",
    "Reusable enterprise patterns": "أنماط مؤسسية قابلة لإعادة الاستخدام",
    "Design-system direction": "اتجاه لنظام التصميم",
    "Framework for future modules": "إطار للوحدات المستقبلية",
    "No performance metrics or business outcomes are claimed. The supported outcome is a clearer product architecture and design foundation.": "لا تُدعى مؤشرات أداء أو نتائج أعمال. والنتيجة المدعومة هي بنية منتج وأساس تصميم أكثر وضوحًا.",
    "Read the full case study": "اقرأ دراسة الحالة كاملة",
    "01 · Overview": "01 · نظرة عامة",
    "02 · Challenge": "02 · التحدي",
    "03 · Existing Product Audit": "03 · تدقيق المنتج الحالي",
    "04 · Discovery & Research": "04 · الاستكشاف والبحث",
    "05 · Business & Domain Research": "05 · بحث الأعمال والمجال",
    "06 · Competitive Analysis": "06 · تحليل المنافسين",
    "07 · Users & Needs": "07 · المستخدمون والاحتياجات",
    "08 · Business Process Mapping": "08 · رسم عمليات الأعمال",
    "09 · Problem Definition": "09 · تعريف المشكلة",
    "10 · IAM & Permissions": "10 · إدارة الهوية والصلاحيات",
    "11 · Information Architecture": "11 · هندسة المعلومات",
    "12 · Domain Model": "12 · نموذج المجال",
    "13 · User Flows": "13 · مسارات المستخدم",
    "14 · UX Structure": "14 · بنية تجربة المستخدم",
    "15 · Design System": "15 · نظام التصميم",
    "16 · Key Workflows & UI": "16 · مسارات العمل والواجهات الرئيسية",
    "17 · Prototype & Testing": "17 · النموذج الأولي والاختبار",
    "18 · Developer Handoff": "18 · التسليم للمطورين",
    "19 · Outcome": "19 · النتيجة",
    "20 · Key Takeaways": "20 · أهم الخلاصات",
    "02 · Challenge & Starting Point": "02 · التحدي ونقطة البداية",
    "03 · What I Learned": "03 · ما تعلمته",
    "07 · Validation & Delivery": "07 · التحقق والتسليم",
    "08 · Outcome & Takeaways": "08 · النتيجة والخلاصات",
    "Estimating, detailing, projects, catalogs, accounting": "التقدير والتفصيل والمشاريع والكتالوجات والمحاسبة",
    "Projects, workflows, changes, quote requests": "المشاريع ومسارات العمل والتغييرات وطلبات عروض الأسعار",
    "Bidding, detailing, submissions, elevations, scheduling": "المناقصات والتفصيل والتقديمات والواجهات والجدولة",
    "Inventory, service, mobile, customers, projects": "المخزون والخدمة والجوال والعملاء والمشاريع",
    "Quotation": "التسعير",
    "Client Request": "طلب العميل",
    "Verify Customer": "التحقق من العميل",
    "Analyze Requirements": "تحليل المتطلبات",
    "Assess Project Scope": "تقييم نطاق المشروع",
    "Select Products": "اختيار المنتجات",
    "Calculate Cost": "حساب التكلفة",
    "Calculate Margin": "حساب الهامش",
    "Prepare Quote": "إعداد عرض السعر",
    "Review": "المراجعة",
    "Approval": "الموافقة",
    "Send": "الإرسال",
    "Follow Up": "المتابعة",
    "Procurement": "المشتريات",
    "Material Requirement": "احتياج المواد",
    "Supplier Selection": "اختيار المورد",
    "Purchase Order": "أمر الشراء",
    "Supplier Processing": "معالجة المورد",
    "Shipment": "الشحن",
    "Receiving": "الاستلام",
    "Inspection": "الفحص",
    "Inventory / Project Update": "تحديث المخزون / المشروع",
    "Clarity Before Complexity": "الوضوح قبل التعقيد",
    "Sales, projects, inventory, procurement, finance, customer service, and administration depend on shared information. Yet each role needs a different level of visibility and control. The design challenge became: expose complexity when necessary while keeping everyday work clear, predictable, and efficient.": "تعتمد المبيعات والمشاريع والمخزون والمشتريات والمالية وخدمة العملاء والإدارة على معلومات مشتركة. لكن كل دور يحتاج إلى مستوى مختلف من الرؤية والتحكم. وأصبح تحدي التصميم هو إظهار التعقيد عند الحاجة مع إبقاء العمل اليومي واضحًا ومتوقعًا وفعالًا.",
    "Context Before Complexity": "السياق قبل التعقيد",
    "Show the information and actions relevant to the current task.": "إظهار المعلومات والإجراءات المرتبطة بالمهمة الحالية.",
    "Keep shared business objects consistent across workflows.": "الحفاظ على اتساق كائنات الأعمال المشتركة عبر المسارات.",
    "Design Around Workflows": "التصميم حول مسارات العمل",
    "Organize the experience around work, not the internal module map.": "تنظيم التجربة حول العمل لا حول خريطة الوحدات الداخلية.",
    "Roles Shape the Experience": "الأدوار تشكل التجربة",
    "Match visibility and actions to responsibility.": "مواءمة الرؤية والإجراءات مع المسؤولية.",
    "Scale Through Systems": "التوسع عبر الأنظمة",
    "Use reusable patterns that can extend to future modules.": "استخدام أنماط قابلة لإعادة الاستخدام تمتد إلى الوحدات المستقبلية.",
    "Make Status Visible": "إظهار الحالة بوضوح",
    "Clarify what happened, what is pending, and who owns the next step.": "توضيح ما حدث وما هو معلق ومن يملك الخطوة التالية.",
    "Designing Access & Control": "تصميم الوصول والتحكم",
    "Mosaic → Overview → Dashboard": "Mosaic ← نظرة عامة ← لوحة المعلومات",
    "The operational overview and main entry point for daily work.": "النظرة التشغيلية العامة ونقطة الدخول الرئيسية للعمل اليومي.",
    "Overview · Projects · Libraries · Openings · Hardware · Orders · Reports & Analytics · Document Center · Notifications · Admin & Settings": "نظرة عامة · المشاريع · المكتبات · الفتحات · التجهيزات · الطلبات · التقارير والتحليلات · مركز الوثائق · الإشعارات · الإدارة والإعدادات",
    "Summary · Project Details · Phases & Timeline · Openings · Hardware Sets · Orders · Receiving · Shipments · Documents · Reports · Project Settings": "الملخص · تفاصيل المشروع · المراحل والجدول الزمني · الفتحات · مجموعات التجهيزات · الطلبات · الاستلام · الشحنات · الوثائق · التقارير · إعدادات المشروع",
    "Create Project": "إنشاء مشروع",
    "Projects → New Project → Information → Configuration → Team → Save → Project Workspace": "المشاريع ← مشروع جديد ← المعلومات ← الإعداد ← الفريق ← الحفظ ← مساحة عمل المشروع",
    "Opening Creation / Import": "إنشاء / استيراد فتحة",
    "Project → Openings → Create / Import → Door → Frame → Wall → Specifications → Save": "المشروع ← الفتحات ← إنشاء / استيراد ← الباب ← الإطار ← الجدار ← المواصفات ← الحفظ",
    "Hardware Assignment": "إسناد التجهيزات",
    "Opening → Hardware → Select Set → Modify Items → Validate → Assign": "الفتحة ← التجهيزات ← اختيار المجموعة ← تعديل العناصر ← التحقق ← الإسناد",
    "Quote to Order": "من عرض السعر إلى الطلب",
    "Project → Select Items → Quantity → Pricing → Quote → Approval → Order": "المشروع ← اختيار العناصر ← الكمية ← التسعير ← عرض السعر ← الموافقة ← الطلب",
    "Order to Receiving": "من الطلب إلى الاستلام",
    "Order → Supplier → Submit → Shipment → Receiving → Project / Inventory Update": "الطلب ← المورد ← الإرسال ← الشحن ← الاستلام ← تحديث المشروع / المخزون",
    "Permission Management": "إدارة الصلاحيات",
    "Admin → User → Role → Permissions → Scope → Save": "الإدارة ← المستخدم ← الدور ← الصلاحيات ← النطاق ← الحفظ",
    "Patterns That Scale": "أنماط قابلة للتوسع",
    "Dialog": "نافذة حوار",
    "Badge and progress": "الشارات والتقدم",
    "Toast and snackbar": "إشعارات Toast وSnackbar",
    "File uploader": "رافع الملفات",
    "Date and time picker": "منتقي التاريخ والوقت",
    "Input and textarea": "حقول الإدخال والنص",
    "Combobox and autocomplete": "القائمة المركبة والإكمال التلقائي",
    "Buttons": "الأزرار",
    "Component architecture": "بنية المكونات",
    "The originating Figma component library, typography specification, token file, and grid documentation were not available. Component coverage and states are presented as the documented design-system model, not as proof of full implementation.": "لم تتوفر مكتبة مكونات Figma الأصلية أو مواصفات الخطوط أو ملف الرموز أو توثيق الشبكة. ويُعرض نطاق المكونات وحالاتها بوصفه نموذج نظام التصميم الموثق، لا دليلًا على اكتمال التنفيذ.",
    "Previous image": "الصورة السابقة",
    "Next image": "الصورة التالية",
    "Previous images": "الصور السابقة",
    "Next images": "الصور التالية",
    "images": "صور",
    "image": "صورة"
  };

  function translateTextNode(node) {
    var trimmed = node.nodeValue.trim();
    if (!trimmed || !Object.prototype.hasOwnProperty.call(translations, trimmed)) {
      return;
    }
    node.nodeValue = node.nodeValue.replace(trimmed, translations[trimmed]);
  }

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }
  textNodes.forEach(translateTextNode);

  var attributeTranslations = {
    "Interactive proposed sitemap flow": "مخطط تفاعلي لخريطة الموقع المقترحة",
    "Key workflow galleries": "معارض مسارات العمل الرئيسية",
    "View Mosaic live in a new tab": "عرض Mosaic مباشرة في علامة تبويب جديدة",
    "View the Mosaic role and permission prototype in a new tab": "عرض نموذج Mosaic للأدوار والصلاحيات في علامة تبويب جديدة",
    "View the Mosaic Storybook in a new tab": "عرض Storybook الخاص بـMosaic في علامة تبويب جديدة",
    "Proposed Mosaic role hierarchy": "التسلسل المقترح لأدوار Mosaic",
    "Mosaic core domain relationship": "علاقات مجال Mosaic الأساسية",
    "Supporting domain entities": "كيانات المجال المساندة",
    "Proposed role hierarchy": "التسلسل المقترح للأدوار",
    "Condensed Mosaic domain model": "نموذج مجال Mosaic المختصر",
    "ARC ERP module launcher and Mosaic operational dashboard": "مشغّل وحدات ARC ERP ولوحة عمليات Mosaic"
  };

  document.querySelectorAll('[aria-label], [data-mosaic-carousel-label], img[alt]').forEach(function (element) {
    ['aria-label', 'data-mosaic-carousel-label', 'alt'].forEach(function (attribute) {
      var value = element.getAttribute(attribute);
      if (!value) {
        return;
      }
      if (attributeTranslations[value]) {
        element.setAttribute(attribute, attributeTranslations[value]);
        return;
      }
      value = value
        .replace(/^Open full-size image: /, 'فتح الصورة بالحجم الكامل: ')
        .replace(/^Previous images?$/, 'الصور السابقة')
        .replace(/^Next images?$/, 'الصور التالية')
        .replace(/ gallery controls$/, ' — عناصر تحكم المعرض')
        .replace(/ interface gallery$/, ' — معرض الواجهات')
        .replace(/ gallery$/, ' — معرض')
        .replace(/^Existing ERP /, 'نظام ERP الحالي — ')
        .replace(/^Mosaic /, 'Mosaic — ');
      element.setAttribute(attribute, value);
    });
  });

  document.querySelectorAll('[aria-roledescription="carousel"]').forEach(function (element) {
    element.setAttribute('aria-roledescription', 'عارض شرائح');
  });
  document.querySelectorAll('[data-carousel-language]').forEach(function (carousel) {
    carousel.setAttribute('data-carousel-language', 'ar');
  });

  var sitemapItems = {
    "Dashboard|KPIs|Recent Projects|Alerts|Quick Actions": "لوحة المعلومات|مؤشرات الأداء|المشاريع الأخيرة|التنبيهات|إجراءات سريعة",
    "All Projects|Recent Projects|Project Browser|Details|Phases|Timeline|Status": "كل المشاريع|المشاريع الأخيرة|متصفح المشاريع|التفاصيل|المراحل|الجدول الزمني|الحالة",
    "List|Create|Import|Door|Frame|Wall Type|Fire Rating|Specifications|Hardware Assignment": "القائمة|إنشاء|استيراد|الباب|الإطار|نوع الجدار|تصنيف الحريق|المواصفات|إسناد التجهيزات",
    "Library|Hardware Sets|Categories|Manufacturers|Specifications|Reusable information": "المكتبة|مجموعات التجهيزات|الفئات|المصنّعون|المواصفات|معلومات قابلة لإعادة الاستخدام",
    "Draft|Submitted|Approved|Rejected|Items|Pricing|Quantities|Suppliers|Shipments|Receiving": "مسودة|مرسل|معتمد|مرفوض|العناصر|التسعير|الكميات|الموردون|الشحنات|الاستلام",
    "Progress|Costs|Budgets|Orders|Shipments|Deadlines|Export|PDF|DWG|XLS|Tags|Versions|Submittals|Approvals": "التقدم|التكاليف|الميزانيات|الطلبات|الشحنات|المواعيد النهائية|التصدير|PDF|DWG|XLS|الوسوم|الإصدارات|التقديمات|الموافقات",
    "Milestones|Tasks|Approvals|Orders|Shipments": "المراحل|المهام|الموافقات|الطلبات|الشحنات",
    "Users|Roles|Permissions|Activity|Company Settings|Researched integrations|Custom Fields": "المستخدمون|الأدوار|الصلاحيات|النشاط|إعدادات الشركة|التكاملات المدروسة|حقول مخصصة"
  };

  document.querySelectorAll('[data-mosaic-items]').forEach(function (details) {
    var items = details.getAttribute('data-mosaic-items');
    if (sitemapItems[items]) {
      details.setAttribute('data-mosaic-items', sitemapItems[items]);
    }
  });

  var readingMode = document.querySelector('.case-study-reading-mode');
  if (readingMode) {
    readingMode.setAttribute('aria-label', 'نمط قراءة دراسة الحالة');
  }
})();

(function () {
  'use strict';

  var parameters = new URLSearchParams(window.location.search);
  var requestedProject = parameters.get('project');
  if (requestedProject && requestedProject !== 'mosaic-erp') {
    return;
  }
  var isArabic = document.documentElement.lang === 'ar';

  document.body.setAttribute('data-case-study-project', 'mosaic-erp');
  document.title = isArabic
    ? 'دراسة حالة تصميم Mosaic ERP | جلال حيلاني'
    : 'Mosaic ERP Product Design Case Study | Galal Helany';

  function setMeta(selector, attribute, value) {
    var element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      if (selector.indexOf('property=') > -1) {
        element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
      } else {
        element.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
      }
      document.head.appendChild(element);
    }
    element.setAttribute(attribute, value);
  }

  var description = isArabic
    ? 'اكتشف كيف صُمم Mosaic، وهو نظام ERP متخصص لفرق التجهيزات المعمارية، عبر البحث ومسارات العمل والصلاحيات ونظام التصميم والنماذج الأولية والتحقق.'
    : 'Explore how Mosaic, an ERP for architectural hardware teams, was shaped through research, workflows, permissions, design systems, prototypes, and validation.';
  var canonicalUrl = isArabic
    ? 'https://galalhelany.com/case-study-ar.html?project=mosaic-erp'
    : 'https://galalhelany.com/case-study.html?project=mosaic-erp';
  var socialImage = 'https://galalhelany.com/assets/img/social/mosaic-erp-case-study-1200x630.jpg';
  var schemaImage = 'https://galalhelany.com/assets/img/projects/mosaic-arc-erp-mockup.png';

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[name="author"]', 'content', 'Galal Helany');
  setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large');
  setMeta('meta[property="og:type"]', 'content', 'article');
  setMeta('meta[property="og:title"]', 'content', document.title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[property="og:site_name"]', 'content', 'Galal Helany');
  setMeta('meta[property="og:locale"]', 'content', isArabic ? 'ar_SY' : 'en_US');
  setMeta('meta[property="og:locale:alternate"]', 'content', isArabic ? 'en_US' : 'ar_SY');
  setMeta('meta[property="og:image"]', 'content', socialImage);
  setMeta('meta[property="og:image:type"]', 'content', 'image/jpeg');
  setMeta('meta[property="og:image:width"]', 'content', '1200');
  setMeta('meta[property="og:image:height"]', 'content', '630');
  setMeta('meta[property="og:image:alt"]', 'content', 'Mosaic ARC ERP interface composite');
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', document.title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:url"]', 'content', canonicalUrl);
  setMeta('meta[name="twitter:image"]', 'content', socialImage);
  setMeta('meta[name="twitter:image:alt"]', 'content', 'Mosaic ARC ERP interface composite');

  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  function setAlternate(language, href) {
    var alternate = document.querySelector('link[rel="alternate"][hreflang="' + language + '"]');
    if (!alternate) {
      alternate = document.createElement('link');
      alternate.rel = 'alternate';
      alternate.hreflang = language;
      document.head.appendChild(alternate);
    }
    alternate.href = href;
  }

  setAlternate('en', 'https://galalhelany.com/case-study.html?project=mosaic-erp');
  setAlternate('ar', 'https://galalhelany.com/case-study-ar.html?project=mosaic-erp');
  setAlternate('x-default', 'https://galalhelany.com/case-study.html?project=mosaic-erp');

  var schema = document.querySelector('#mosaic-case-study-schema');
  if (!schema) {
    schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'mosaic-case-study-schema';
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': canonicalUrl + '#article',
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    headline: isArabic ? 'دراسة حالة تصميم Mosaic ERP' : 'Mosaic ERP Product Design Case Study',
    description: description,
    inLanguage: isArabic ? 'ar' : 'en',
    image: { '@type': 'ImageObject', url: schemaImage, width: 2796, height: 2260 },
    author: isArabic
      ? { '@type': 'Person', '@id': 'https://galalhelany.com/#person', name: 'جلال حيلاني', alternateName: 'Galal Helany', url: 'https://galalhelany.com/' }
      : { '@type': 'Person', '@id': 'https://galalhelany.com/#person', name: 'Galal Helany', url: 'https://galalhelany.com/' },
    publisher: { '@id': 'https://galalhelany.com/#person' },
    isPartOf: { '@type': 'WebSite', '@id': 'https://galalhelany.com/#website', url: 'https://galalhelany.com/', name: isArabic ? 'معرض أعمال جلال حيلاني' : 'Galal Helany Portfolio' }
  });

  var detailsNavigation = [
    ['details-overview', 'Overview'],
    ['details-challenge', 'Challenge'],
    ['details-audit', 'Audit'],
    ['details-discovery', 'Discovery'],
    ['details-domain-research', 'Business & Domain'],
    ['details-competition', 'Competition'],
    ['details-users', 'Users'],
    ['details-processes', 'Processes'],
    ['details-problem', 'Problem'],
    ['details-iam', 'IAM'],
    ['details-ia', 'IA'],
    ['details-domain-model', 'Domain Model'],
    ['details-flows', 'Flows'],
    ['details-ux', 'UX Structure'],
    ['details-design-system', 'Design System'],
    ['details-key-ui', 'Key UI'],
    ['details-testing', 'Testing'],
    ['details-handoff', 'Handoff'],
    ['details-outcome', 'Outcome'],
    ['details-takeaways', 'Takeaways']
  ];
  var tldrNavigation = [
    ['tldr-overview', 'Overview'],
    ['tldr-challenge', 'Challenge'],
    ['tldr-insights', 'Insights'],
    ['tldr-interface', 'Interface'],
    ['tldr-validation', 'Validation'],
    ['tldr-outcome', 'Outcome']
  ];

  var navigation = document.querySelector('.case-study-nav .content');
  if (navigation) {
    navigation.innerHTML = detailsNavigation.map(function (item, index) {
      return '<a class="item' + (index === 0 ? ' is--active' : '') + '" href="#' + item[0] + '" data-reading-nav="details">' + item[1] + '</a>';
    }).concat(tldrNavigation.map(function (item, index) {
      return '<a class="item' + (index === 0 ? ' is--active' : '') + '" href="#' + item[0] + '" data-reading-nav="tldr">' + item[1] + '</a>';
    })).join('');
  }

  var article = document.querySelector('.case-study-article');
  if (!article) {
    return;
  }

  var closing = article.querySelector('[data-case-closing]');
  var nextProject = article.querySelector('[data-project-next]');

  function section(mode, id, number, label, title, content) {
    return '<section class="case-study-section" id="' + id + '" data-case-section data-reading-mode="' + mode + '" aria-labelledby="' + id + '-title">' +
      '<div class="case-study-section__heading">' +
        '<p class="case-study-section__label">' + number + ' · ' + label + '</p>' +
        '<h2 id="' + id + '-title" data-reading-copy>' + title + '</h2>' +
      '</div>' +
      '<div class="case-study-section__content">' + content + '</div>' +
    '</section>';
  }

  var detailsSections = [
    section('details-only', 'details-overview', '01', 'Overview', 'What is Mosaic?', `
      <p data-reading-copy>Mosaic is a specialized model within ARC ERP designed for companies operating in the door, frame, and architectural hardware distribution industry.</p>
      <p data-reading-copy>Unlike a generic ERP, Mosaic is structured around the way architectural opening projects are actually planned, specified, ordered, coordinated, and delivered. It brings project information, openings, doors and frames, hardware sets, orders, suppliers, documents, and operational data into one connected environment.</p>
      <h3 data-reading-copy>One System for Complex Project Operations</h3>
      <p data-reading-copy>Architectural hardware projects contain highly interconnected information.</p>
      <p data-reading-copy>A single project can include hundreds of openings, with each opening carrying its own door, frame, wall, fire-rating, hardware, and specification requirements. Those requirements eventually influence quotations, purchasing, orders, shipments, receiving, project costs, and documentation.</p>
      <p data-reading-copy>Mosaic creates a structured relationship between these operational objects rather than treating them as isolated records.</p>
    `),
    section('details-only', 'details-challenge', '02', 'Challenge', 'Turning Complexity Into a Scalable System', `
      <p data-reading-copy>Mosaic was not simply a dashboard redesign. The product needed to support detailed configurations, interconnected data, multiple roles, permissions, dense information, long operational workflows, and future expansion without making everyday tasks harder to understand.</p>
      <blockquote data-reading-copy>How might we transform a collection of disconnected ERP screens into a scalable operational system capable of supporting complex projects, products, workflows, roles, permissions, and future modules without overwhelming users?</blockquote>
      <div class="case-study-stack">
        <article><h3>Complexity</h3><p data-reading-copy>Architectural hardware data includes detailed door, frame, hardware, specification, and compliance relationships.</p></article>
        <article><h3>Cross-functional workflows</h3><p data-reading-copy>Sales, projects, procurement, inventory, finance, and customer service depend on shared information.</p></article>
        <article><h3>Scalability</h3><p data-reading-copy>The architecture needed room for more organizations, users, modules, data, roles, and researched integration needs.</p></article>
        <article><h3>Usability</h3><p data-reading-copy>Operational depth had to remain clear enough for frequent work, review, and decision-making.</p></article>
      </div>
    `),
    section('details-only', 'details-audit', '03', 'Existing Product Audit', 'Existing ERP Review', `
      <div class="mosaic-audit-carousel" data-mosaic-audit-carousel data-mosaic-carousel-label="Existing ERP interface review" aria-label="Existing ERP interface review" aria-roledescription="carousel">
        <div class="mosaic-audit-carousel__viewport" data-mosaic-audit-viewport tabindex="0">
          <div class="mosaic-audit-carousel__track" data-mosaic-audit-track>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Existing ERP home page"><img src="assets/img/projects/mosaic-audit-home.png" alt="Existing ERP home page with Templates, Orders, and Users navigation" width="1440" height="1024" loading="eager" decoding="async"></button><figcaption>Home page</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Existing ERP user management"><img src="assets/img/projects/mosaic-audit-user-management.png" alt="Existing ERP user-management table" width="1440" height="1024" loading="lazy" decoding="async"></button><figcaption>User management</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Existing ERP all orders"><img src="assets/img/projects/mosaic-audit-all-orders.png" alt="Existing ERP all-orders table" width="1440" height="1024" loading="lazy" decoding="async"></button><figcaption>All orders</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Existing ERP add order"><img src="assets/img/projects/mosaic-audit-add-order.png" alt="Existing ERP create-new-order form" width="1440" height="1024" loading="lazy" decoding="async"></button><figcaption>Add order</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Existing ERP order detail"><img src="assets/img/projects/mosaic-audit-order-detail.png" alt="Existing ERP order detail with door cards" width="1440" height="1024" loading="lazy" decoding="async"></button><figcaption>Order detail</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Existing ERP all templates"><img src="assets/img/projects/mosaic-audit-all-templates.png" alt="Existing ERP all-templates table" width="1440" height="1024" loading="lazy" decoding="async"></button><figcaption>All templates</figcaption></figure>
          </div>
        </div>
        <div class="case-study-carousel__footer mosaic-audit-carousel__footer">
          <p class="case-study-carousel__status" data-mosaic-audit-status aria-live="off" aria-atomic="true"><span data-mosaic-audit-current>01</span><span aria-hidden="true"> / </span><span>06</span><span class="visually-hidden"> images</span></p>
          <div class="case-study-carousel__actions" role="group" aria-label="Existing ERP gallery controls">
            <button type="button" data-mosaic-audit-previous aria-label="Previous image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
            <button type="button" data-mosaic-audit-next aria-label="Next image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
          </div>
        </div>
      </div>
      <p data-reading-copy>The existing design was reviewed against the needs of a scalable ERP. The audit examined structure, reuse, responsiveness, workflow continuity, and support for enterprise operations—not only visual consistency.</p>
      <div class="case-study-stack">
        <article><h3>No structured design system</h3><p data-reading-copy>Reusable components, shared states, tokens, and scalable component rules were limited.</p></article>
        <article><h3>Inadequate grid foundation</h3><p data-reading-copy>Alignment and adaptation across desktop, tablet, and smaller screens lacked a consistent framework.</p></article>
        <article><h3>Dashboard thinking</h3><p data-reading-copy>The early structure did not sufficiently account for tables, forms, approvals, documents, reporting, and cross-module relationships.</p></article>
        <article><h3>No clear user flows</h3><p data-reading-copy>Entry points, task progression, completion states, and relationships between modules required definition.</p></article>
        <article><h3>Responsive risk</h3><p data-reading-copy>Dense tables, forms, and multi-column operations were not prepared for progressive adaptation.</p></article>
        <article><h3>Missing shared guidelines</h3><p data-reading-copy>Future modules did not have documented rules for maintaining consistency.</p></article>
      </div>
      <p class="case-study-caption" data-reading-copy>No separate original “before” screens were found in the repository, so the audit is documented without fabricating a visual comparison.</p>
    `),
    section('details-only', 'details-discovery', '04', 'Discovery & Research', 'Exploring the Problem Space', `
      <p data-reading-copy>Discovery was grouped into five lenses to connect business priorities, role behavior, product scope, technical constraints, and experience quality. This prevented a long question list from becoming detached from design decisions.</p>
      <div class="mosaic-question-grid">
        <article><h3>Business</h3><p data-reading-copy>Business problems, critical workflows, success criteria, and future product direction.</p></article>
        <article><h3>Users</h3><p data-reading-copy>Primary roles, workflow behavior, existing ERP pain points, module switching, and customization needs.</p></article>
        <article><h3>Product</h3><p data-reading-copy>Must-have functions, researched automation opportunities, configuration, and dashboard requirements.</p></article>
        <article><h3>Technology</h3><p data-reading-copy>Integration, collaboration, cloud access, security, compliance, and offline considerations.</p></article>
        <article><h3>Experience</h3><p data-reading-copy>Visual direction, information density, accessibility, responsive behavior, and industry conventions.</p></article>
      </div>
    `),
    section('details-only', 'details-domain-research', '05', 'Business & Domain Research', 'Why Generic ERP Falls Short', `
      <p data-reading-copy>Architectural hardware projects connect openings, doors, frames, wall types, fire ratings, hardware sets, products, manufacturers, suppliers, specifications, approvals, orders, and shipments. Changes to one object can affect several downstream teams and records.</p>
      <div class="case-study-stack">
        <article><h3>Industry complexity</h3><p data-reading-copy>Configurations, manufacturers, product dependencies, compliance requirements, fire ratings, and specifications must remain connected.</p></article>
        <article><h3>Project complexity</h3><p data-reading-copy>Projects can contain many openings, schedules, stakeholders, suppliers, changes, approvals, and related orders.</p></article>
        <article><h3>Operational friction</h3><p data-reading-copy>The supplied research material identified spreadsheets, manual processes, duplicate data, quoting, procurement, inventory, and shipment tracking as problem areas.</p></article>
        <article><h3>Financial needs</h3><p data-reading-copy>Project costs, billing, invoicing, profitability visibility, and financial reporting need project context.</p></article>
        <article><h3>Customer and stakeholder needs</h3><p data-reading-copy>Order visibility, communication, delivery tracking, and issue resolution depend on reliable shared status.</p></article>
      </div>
      <p data-reading-copy>Market research was used as a secondary signal. No precise market-size statistic is presented because its source was not available in the supplied files.</p>
    `),
    section('details-only', 'details-competition', '06', 'Competitive Analysis', 'Deep functionality existed clarity was the opportunity', `
      <div class="mosaic-audit-carousel mosaic-competition-carousel" data-mosaic-audit-carousel data-mosaic-carousel-label="Competitive analysis gallery" aria-label="Competitive analysis gallery" aria-roledescription="carousel">
        <div class="mosaic-audit-carousel__viewport" data-mosaic-audit-viewport tabindex="0">
          <div class="mosaic-audit-carousel__track" data-mosaic-audit-track>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Competitive analysis overview"><img src="assets/img/projects/mosaic-competition-overview.png" alt="Competitive analysis overview comparing four architectural hardware ERP products" width="11850" height="5708" loading="lazy" decoding="async"></button><figcaption>Competitive analysis overview</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Comsense Enterprise"><img src="assets/img/projects/mosaic-competition-comsense.png" alt="Comsense Enterprise detailing and opening schedule interface" width="2176" height="1528" loading="lazy" decoding="async"></button><figcaption>Comsense Enterprise</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: PRO-TECH TITAN"><img src="assets/img/projects/mosaic-competition-protech-titan.png" alt="PRO-TECH TITAN product selector interface" width="2419" height="1528" loading="lazy" decoding="async"></button><figcaption>PRO-TECH TITAN</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: AVAware Technologies"><img src="assets/img/projects/mosaic-competition-avaware.png" alt="AVAware project and opening schedule interface" width="2205" height="1486" loading="lazy" decoding="async"></button><figcaption>AVAware Technologies</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Insite4Doors"><img src="assets/img/projects/mosaic-competition-insite4doors.png" alt="Insite4Doors financial dashboard interface" width="1880" height="1528" loading="lazy" decoding="async"></button><figcaption>Insite4Doors</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Competitor feature matrix"><img src="assets/img/projects/mosaic-competition-feature-matrix.png" alt="Feature comparison matrix for Comsense, PRO-TECH TITAN, AVAware, and Insite4Doors" width="3872" height="1766" loading="lazy" decoding="async"></button><figcaption>Competitor feature matrix</figcaption></figure>
          </div>
        </div>
        <div class="case-study-carousel__footer mosaic-audit-carousel__footer">
          <p class="case-study-carousel__status" aria-live="off" aria-atomic="true"><span data-mosaic-audit-current>01</span><span aria-hidden="true"> / </span><span>06</span><span class="visually-hidden"> images</span></p>
          <div class="case-study-carousel__actions" role="group" aria-label="Competitive analysis gallery controls">
            <button type="button" data-mosaic-audit-previous aria-label="Previous image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
            <button type="button" data-mosaic-audit-next aria-label="Next image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
          </div>
        </div>
      </div>
      <p data-reading-copy>Research reviewed Comsense Enterprise, PRO-TECH TITAN, AVAware Technologies, and Insite4Doors. The comparison focused on the supplied research themes rather than asserting unsupported feature parity.</p>
      <div class="mosaic-table-wrap" role="region" aria-label="Competitor research comparison" tabindex="0">
        <table class="mosaic-table">
          <thead><tr><th>Product</th><th>Research focus</th><th>Supported signal</th><th>Opportunity considered</th></tr></thead>
          <tbody>
            <tr><th>Comsense Enterprise</th><td>Estimating, detailing, projects, catalogs, accounting</td><td>Established industry specialization</td><td>Interface clarity and learning experience</td></tr>
            <tr><th>PRO-TECH TITAN</th><td>Projects, workflows, changes, quote requests</td><td>Cloud-based project focus</td><td>Learnability and workflow coherence</td></tr>
            <tr><th>AVAware Technologies</th><td>Bidding, detailing, submissions, elevations, scheduling</td><td>Deep traditional workflows</td><td>Modernization and cloud access</td></tr>
            <tr><th>Insite4Doors</th><td>Inventory, service, mobile, customers, projects</td><td>Broad door-industry operations</td><td>Connected navigation and scale</td></tr>
            <tr class="is-opportunity"><th>Mosaic</th><td>Connected architectural-hardware operations</td><td>Responsive modular product direction</td><td>Clarity, context, permissions, and systems</td></tr>
          </tbody>
        </table>
      </div>
      <blockquote data-reading-copy>The market already contained deep functionality. Mosaic’s opportunity was not simply to add more features, but to make complex industry workflows clearer, more connected, easier to navigate, and easier to scale.</blockquote>
    `),
    section('details-only', 'details-users', '07', 'Users & Needs', 'Different Roles, Different Needs', `
      <p data-reading-copy>Role-based archetypes kept the work grounded in responsibilities instead of fictional names, ages, or biographies.</p>
      <div class="case-study-role-grid mosaic-role-grid">
        <article><h3>Sales Representative</h3><p data-reading-copy>Manages quotations, customer relationships, order creation, and follow-up. Needs pricing, stock context, quote speed, order status, and customer history; manual entry and limited visibility create friction.</p></article>
        <article><h3>Project Manager</h3><p data-reading-copy>Coordinates timelines, budgets, resources, suppliers, and changes. Needs milestones, approvals, procurement context, and material visibility; fragmented information slows coordination.</p></article>
        <article><h3>Customer Service</h3><p data-reading-copy>Needs customer and order history, issue tracking, communication context, and current delivery status.</p></article>
        <article><h3>Inventory / Procurement</h3><p data-reading-copy>Needs stock visibility, supplier context, purchasing, receiving, and material planning.</p></article>
        <article><h3>Finance</h3><p data-reading-copy>Needs project-linked invoices, costs, billing information, and reporting.</p></article>
        <article><h3>Organization Administrator</h3><p data-reading-copy>Needs users, roles, permissions, configuration, and researched integration settings.</p></article>
      </div>
      <h3>User-needs synthesis</h3>
      <div class="case-study-principles"><span>Visibility</span><span>Efficiency</span><span>Coordination</span><span>Control</span><span>Customization</span><span>Traceability</span></div>
    `),
    section('details-only', 'details-processes', '08', 'Business Process Mapping', 'Understanding End-to-End Workflows', `
      <div class="mosaic-audit-carousel mosaic-process-carousel" data-mosaic-audit-carousel data-mosaic-single-slide data-mosaic-carousel-label="Business process mapping" aria-label="Business process mapping" aria-roledescription="carousel">
        <div class="mosaic-audit-carousel__viewport" data-mosaic-audit-viewport tabindex="0">
          <div class="mosaic-audit-carousel__track" data-mosaic-audit-track>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Business process mapping"><img src="assets/img/projects/mosaic-business-process-mapping.png" alt="Business process map connecting strategic, tactical, operational, and task levels" width="5919" height="2437" loading="lazy" decoding="async"></button><figcaption>Business process mapping</figcaption></figure>
          </div>
        </div>
        <div class="case-study-carousel__footer mosaic-audit-carousel__footer" aria-hidden="true">
          <p class="case-study-carousel__status"><span data-mosaic-audit-current>01</span><span aria-hidden="true"> / </span><span>01</span><span class="visually-hidden"> image</span></p>
          <div class="case-study-carousel__actions" role="group" aria-label="Business process mapping gallery controls">
            <button type="button" data-mosaic-audit-previous aria-label="Previous image" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
            <button type="button" data-mosaic-audit-next aria-label="Next image" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
          </div>
        </div>
      </div>
      <p data-reading-copy>Strategic areas—projects, sales, inventory, supply chain, customer relationships, and finance—were connected to tactical processes such as quotation, procurement, order management, project coordination, and support. Operational flows then exposed dependencies and handoffs.</p>
      <div class="mosaic-flow-group" aria-label="Quotation workflow model"><h3>Quotation</h3><ol class="mosaic-flow"><li>Client Request</li><li>Verify Customer</li><li>Analyze Requirements</li><li>Assess Project Scope</li><li>Select Products</li><li>Calculate Cost</li><li>Calculate Margin</li><li>Prepare Quote</li><li>Review</li><li>Approval</li><li>Send</li><li>Follow Up</li></ol></div>
      <div class="mosaic-flow-group" aria-label="Procurement workflow model"><h3>Procurement</h3><ol class="mosaic-flow mosaic-flow--short"><li>Material Requirement</li><li>Supplier Selection</li><li>Purchase Order</li><li>Supplier Processing</li><li>Shipment</li><li>Receiving</li><li>Inspection</li><li>Inventory / Project Update</li></ol></div>
      <div class="mosaic-evidence-chain"><span>Evidence</span><strong>Work crosses departments and modules</strong><span>Insight</span><strong>Handoffs and shared status matter</strong><span>Decision</span><strong>Model end-to-end operations before UI</strong></div>
    `),
    section('details-only', 'details-problem', '09', 'Problem Definition', 'Clarity Before Complexity', `
      <blockquote data-reading-copy>Mosaic needed to unify highly interconnected operational workflows without reproducing the complexity associated with traditional ERP systems.</blockquote>
      <p data-reading-copy>Sales, projects, inventory, procurement, finance, customer service, and administration depend on shared information. Yet each role needs a different level of visibility and control. The design challenge became: expose complexity when necessary while keeping everyday work clear, predictable, and efficient.</p>
      <div class="case-study-stack mosaic-principle-cards">
        <article><h3>Context Before Complexity</h3><p data-reading-copy>Show the information and actions relevant to the current task.</p></article>
        <article><h3>One Operational Source of Truth</h3><p data-reading-copy>Keep shared business objects consistent across workflows.</p></article>
        <article><h3>Design Around Workflows</h3><p data-reading-copy>Organize the experience around work, not the internal module map.</p></article>
        <article><h3>Roles Shape the Experience</h3><p data-reading-copy>Match visibility and actions to responsibility.</p></article>
        <article><h3>Scale Through Systems</h3><p data-reading-copy>Use reusable patterns that can extend to future modules.</p></article>
        <article><h3>Make Status Visible</h3><p data-reading-copy>Clarify what happened, what is pending, and who owns the next step.</p></article>
      </div>
    `),
    section('details-only', 'details-iam', '10', 'IAM & Permissions', 'Designing Access & Control', `
      <p data-reading-copy>The architecture had to answer not only what information exists, but who can see, create, edit, approve, remove, or administer it.</p>
      <div class="case-study-stack">
        <article><h3>RBAC baseline</h3><p data-reading-copy>Role-Based Access Control groups predictable permissions by responsibility instead of configuring every user independently.</p></article>
        <article><h3>ABAC where context matters</h3><p data-reading-copy>Organization, department, location, resource, or other attributes can shape contextual access where a role alone is insufficient.</p></article>
        <article><h3>Least privilege</h3><p data-reading-copy>Users should receive only the access required for their responsibilities.</p></article>
        <article><h3>DAC limitation</h3><p data-reading-copy>Highly discretionary individual sharing was considered a weaker primary model because it can make governance and review harder.</p></article>
      </div>
      <h3>Proposed role hierarchy</h3>
      <ol class="mosaic-hierarchy" aria-label="Proposed Mosaic role hierarchy"><li><strong>Super Admin</strong><span>Platform-level administration</span></li><li><strong>System Admin</strong><span>System and organization administration</span></li><li><strong>Organization Admin</strong><span>Organization users and settings</span></li><li><strong>Default Roles</strong><span>Predefined operational permissions</span></li><li><strong>Custom Roles</strong><span>Configured permission combinations</span></li></ol>
      <p class="case-study-caption" data-reading-copy>This is a proposed access model explored during design, not a claim of complete implementation.</p>
    `),
    section('details-only', 'details-ia', '11', 'Information Architecture', 'Organizing the Product Architecture', `
      <div class="mosaic-ia-flow" data-mosaic-ia-flow aria-label="Interactive proposed sitemap flow">
        <div class="mosaic-ia-flow__inner">
          <div class="mosaic-ia-flow__header">
            <h3 data-mosaic-ia-title>Overview</h3>
            <p data-mosaic-ia-path aria-live="polite">Mosaic → Overview → Dashboard</p>
          </div>
          <div class="mosaic-ia-flow__canvas">
            <div class="mosaic-ia-flow__node mosaic-ia-flow__node--root"><strong>Mosaic</strong></div>
            <span class="mosaic-ia-flow__connector" aria-hidden="true"></span>
            <div class="mosaic-ia-flow__node mosaic-ia-flow__node--branch"><strong data-mosaic-ia-branch>Overview</strong></div>
            <span class="mosaic-ia-flow__connector" aria-hidden="true"></span>
            <div class="mosaic-ia-flow__children" data-mosaic-ia-children aria-label="Overview destinations"></div>
          </div>
          <div class="mosaic-ia-flow__detail" aria-live="polite">
            <strong data-mosaic-ia-destination>Dashboard</strong>
            <p data-mosaic-ia-description>Operational overview and entry point.</p>
          </div>
        </div>
      </div>
      <p data-reading-copy>Mosaic sits within a wider ARC ERP context that includes Sales, Purchasing, Manufacturing, Items, MRP, Employees, Quality, PLM, Projects, Receivables, Payables, PM, and Admin. Its own architecture needed to stay connected to that ecosystem while keeping domain-specific work coherent.</p>
      <h3>Proposed sitemap</h3>
      <div class="mosaic-sitemap" data-mosaic-sitemap>
        <details data-mosaic-items="Dashboard|KPIs|Recent Projects|Alerts|Quick Actions"><summary><span>Overview</span><span class="mosaic-sitemap__icon" aria-hidden="true"></span></summary><div class="mosaic-sitemap__answer"><p>The operational starting point for priorities, recent work, alerts, and frequent actions.</p></div></details>
        <details data-mosaic-items="All Projects|Recent Projects|Project Browser|Details|Phases|Timeline|Status"><summary><span>Projects</span><span class="mosaic-sitemap__icon" aria-hidden="true"></span></summary><div class="mosaic-sitemap__answer"><p>The central workspace for finding projects, reviewing status, and managing lifecycle activity.</p></div></details>
        <details data-mosaic-items="List|Create|Import|Door|Frame|Wall Type|Fire Rating|Specifications|Hardware Assignment"><summary><span>Openings</span><span class="mosaic-sitemap__icon" aria-hidden="true"></span></summary><div class="mosaic-sitemap__answer"><p>A structured area for creating and maintaining opening, door, frame, rating, and specification data.</p></div></details>
        <details data-mosaic-items="Library|Hardware Sets|Categories|Manufacturers|Specifications|Reusable information"><summary><span>Hardware &amp; Libraries</span><span class="mosaic-sitemap__icon" aria-hidden="true"></span></summary><div class="mosaic-sitemap__answer"><p>Reusable product knowledge that keeps hardware selection and specification work consistent.</p></div></details>
        <details data-mosaic-items="Draft|Submitted|Approved|Rejected|Items|Pricing|Quantities|Suppliers|Shipments|Receiving"><summary><span>Orders</span><span class="mosaic-sitemap__icon" aria-hidden="true"></span></summary><div class="mosaic-sitemap__answer"><p>The commercial workflow connecting order status, items, pricing, suppliers, delivery, and receiving.</p></div></details>
        <details data-mosaic-items="Progress|Costs|Budgets|Orders|Shipments|Deadlines|Export|PDF|DWG|XLS|Tags|Versions|Submittals|Approvals"><summary><span>Reports &amp; Documents</span><span class="mosaic-sitemap__icon" aria-hidden="true"></span></summary><div class="mosaic-sitemap__answer"><p>Project reporting and controlled documentation for progress, cost, delivery, review, and export.</p></div></details>
        <details data-mosaic-items="Milestones|Tasks|Approvals|Orders|Shipments"><summary><span>Notifications</span><span class="mosaic-sitemap__icon" aria-hidden="true"></span></summary><div class="mosaic-sitemap__answer"><p>A focused view of events and pending work that require awareness or action.</p></div></details>
        <details data-mosaic-items="Users|Roles|Permissions|Activity|Company Settings|Researched integrations|Custom Fields"><summary><span>Administration</span><span class="mosaic-sitemap__icon" aria-hidden="true"></span></summary><div class="mosaic-sitemap__answer"><p>Organization-level control for people, access, configuration, traceability, and extensibility.</p></div></details>
      </div>
      <div class="mosaic-context-split">
        <article><span>Global workspace</span><h3>Where do I need to work?</h3><p data-reading-copy>Overview · Projects · Libraries · Openings · Hardware · Orders · Reports & Analytics · Document Center · Notifications · Admin & Settings</p></article>
        <article><span>Project workspace</span><h3>What do I need to do inside this project?</h3><p data-reading-copy>Summary · Project Details · Phases & Timeline · Openings · Hardware Sets · Orders · Receiving · Shipments · Documents · Reports · Project Settings</p></article>
      </div>
      <p class="case-study-caption" data-reading-copy>The sitemap combines designed structure with proposed and researched areas; it does not assert that every listed capability was implemented.</p>
    `),
    section('details-only', 'details-domain-model', '12', 'Domain Model', 'How do Business Objects Connect?', `
      <p data-reading-copy>The interface architecture needed to preserve relationships between business objects rather than treating each ERP module as an isolated destination.</p>
      <ol class="mosaic-domain-model" aria-label="Mosaic core domain relationship"><li>Organization</li><li>Project</li><li>Opening</li><li>Door / Frame / Wall Type</li><li>Hardware Set</li><li>Hardware Items</li><li>Quote</li><li>Order</li><li>Shipment / Receiving</li></ol>
      <div class="mosaic-supporting-entities" aria-label="Supporting domain entities"><span>Documents</span><span>Suppliers</span><span>Approvals</span><span>Notifications</span><span>Reports</span><span>Users</span><span>Roles</span><span>Permissions</span></div>
      <div class="mosaic-evidence-chain"><span>Evidence</span><strong>Objects change across a shared lifecycle</strong><span>Insight</span><strong>Modules cannot behave as silos</strong><span>Decision</span><strong>Make Project the operational context</strong></div>
    `),
    section('details-only', 'details-flows', '13', 'User Flows', 'Translating Structure Into Actions', `
      <div class="mosaic-audit-carousel mosaic-flows-carousel" data-mosaic-audit-carousel data-mosaic-carousel-label="Mosaic user flows and journey maps" aria-label="Mosaic user flows and journey maps" aria-roledescription="carousel">
        <div class="mosaic-audit-carousel__viewport" data-mosaic-audit-viewport tabindex="0">
          <div class="mosaic-audit-carousel__track" data-mosaic-audit-track>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Role creation and login flows"><img src="assets/img/projects/mosaic-user-flow-role-login.png" alt="Role creation and login user-flow diagrams" width="3200" height="1880" loading="lazy" decoding="async"></button><figcaption>Role creation and login flows</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Role assignment and access denial flows"><img src="assets/img/projects/mosaic-user-flow-role-access.png" alt="Role assignment and access denial user-flow diagrams" width="3200" height="2148" loading="lazy" decoding="async"></button><figcaption>Role assignment and access denial</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Detailed custom role flow"><img src="assets/img/projects/mosaic-user-flow-custom-role-detailed.png" alt="Detailed custom-role creation and assignment flow" width="3200" height="1600" loading="lazy" decoding="async"></button><figcaption>Detailed custom role flow</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Role assignment flow"><img src="assets/img/projects/mosaic-user-flow-role-assignment.png" alt="Role assignment and access denial flow summary" width="3200" height="2449" loading="lazy" decoding="async"></button><figcaption>Role assignment flow</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Custom role flow"><img src="assets/img/projects/mosaic-user-flow-custom-role.png" alt="Custom-role creation, review, assignment, and permissions flow" width="3200" height="1617" loading="lazy" decoding="async"></button><figcaption>Custom role flow</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Password recovery flow"><img src="assets/img/projects/mosaic-user-flow-password-recovery.png" alt="Password recovery flows from login and user profile" width="3200" height="1851" loading="lazy" decoding="async"></button><figcaption>Password recovery flow</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Starting a new project journey"><img src="assets/img/projects/mosaic-user-flow-new-project-journey.png" alt="Journey map for starting a new Mosaic project" width="3200" height="1301" loading="lazy" decoding="async"></button><figcaption>Starting a new project</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Managing openings journey"><img src="assets/img/projects/mosaic-user-flow-openings-journey.png" alt="Journey map for managing project openings" width="3200" height="1301" loading="lazy" decoding="async"></button><figcaption>Managing openings</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Ordering journey"><img src="assets/img/projects/mosaic-user-flow-ordering-journey.png" alt="Journey map for creating and tracking orders" width="3200" height="1301" loading="lazy" decoding="async"></button><figcaption>Ordering</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Managing shipments journey"><img src="assets/img/projects/mosaic-user-flow-shipments-journey.png" alt="Journey map for managing shipment status and delivery updates" width="3200" height="1301" loading="lazy" decoding="async"></button><figcaption>Managing shipments</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Generating reports journey"><img src="assets/img/projects/mosaic-user-flow-reports-journey.png" alt="Journey map for generating, customizing, and exporting reports" width="3200" height="1301" loading="lazy" decoding="async"></button><figcaption>Generating reports</figcaption></figure>
          </div>
        </div>
        <div class="case-study-carousel__footer mosaic-audit-carousel__footer">
          <p class="case-study-carousel__status" data-mosaic-audit-status aria-live="off" aria-atomic="true"><span data-mosaic-audit-current>01</span><span aria-hidden="true"> / </span><span>11</span><span class="visually-hidden"> images</span></p>
          <div class="case-study-carousel__actions" role="group" aria-label="User-flow gallery controls">
            <button type="button" data-mosaic-audit-previous aria-label="Previous image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
            <button type="button" data-mosaic-audit-next aria-label="Next image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
          </div>
        </div>
      </div>
      <p data-reading-copy>The case-study material documents six representative workflow models. They show intended structure and dependencies; no claim is made that every flow reached implementation.</p>
      <div class="mosaic-flow-cards">
        <article><span>01</span><h3>Create Project</h3><p>Projects → New Project → Information → Configuration → Team → Save → Project Workspace</p></article>
        <article><span>02</span><h3>Opening Creation / Import</h3><p>Project → Openings → Create / Import → Door → Frame → Wall → Specifications → Save</p></article>
        <article><span>03</span><h3>Hardware Assignment</h3><p>Opening → Hardware → Select Set → Modify Items → Validate → Assign</p></article>
        <article><span>04</span><h3>Quote to Order</h3><p>Project → Select Items → Quantity → Pricing → Quote → Approval → Order</p></article>
        <article><span>05</span><h3>Order to Receiving</h3><p>Order → Supplier → Submit → Shipment → Receiving → Project / Inventory Update</p></article>
        <article><span>06</span><h3>Permission Management</h3><p>Admin → User → Role → Permissions → Scope → Save</p></article>
      </div>
    `),
    section('details-only', 'details-ux', '14', 'UX Structure', 'Patterns That Scale', `
      <p data-reading-copy>The architecture translated into a predictable set of navigation, information, operation, action, and feedback patterns.</p>
      <div class="case-study-stack">
        <article><h3>Navigation</h3><p data-reading-copy>Global navigation, project navigation, breadcrumbs, and persistent project context.</p></article>
        <article><h3>Information</h3><p data-reading-copy>Overviews, lists, entity details, and tabs create progressive depth.</p></article>
        <article><h3>Data operations</h3><p data-reading-copy>Tables, search, filters, sorting, pagination, bulk actions, and export were structured where appropriate.</p></article>
        <article><h3>Actions</h3><p data-reading-copy>Drawers, modals, forms, and multi-step workflows support different levels of task complexity.</p></article>
        <article><h3>System feedback</h3><p data-reading-copy>Statuses, alerts, validation, loading, empty, and error states make progress and exceptions visible.</p></article>
      </div>
      <blockquote data-reading-copy>Overview → List → Entity → Details → Action</blockquote>
    `),
    section('details-only', 'details-design-system', '15', 'Design System', 'Building for Consistency', `
      <div class="mosaic-audit-carousel mosaic-design-system-carousel" data-mosaic-audit-carousel data-mosaic-carousel-label="Mosaic design system component gallery" aria-label="Mosaic design system component gallery" aria-roledescription="carousel">
        <div class="mosaic-audit-carousel__viewport" data-mosaic-audit-viewport tabindex="0">
          <div class="mosaic-audit-carousel__track" data-mosaic-audit-track>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Dialog components"><img src="assets/img/projects/mosaic-design-system-dialog.png" alt="Mosaic design system dialog layouts, content patterns, and actions" width="1984" height="1797" loading="lazy" decoding="async"></button><figcaption>Dialog</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Badge components"><img src="assets/img/projects/mosaic-design-system-badge.png" alt="Mosaic design system badges, statuses, and progress indicators" width="1763" height="918" loading="lazy" decoding="async"></button><figcaption>Badge and progress</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Toast and snackbar components"><img src="assets/img/projects/mosaic-design-system-toast-snackbar.png" alt="Mosaic toast and snackbar feedback component states" width="1826" height="682" loading="lazy" decoding="async"></button><figcaption>Toast and snackbar</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Navigation components"><img src="assets/img/projects/mosaic-design-system-navigation.png" alt="Mosaic logos, utility navigation, menu items, and sidebar states" width="1152" height="1502" loading="lazy" decoding="async"></button><figcaption>Navigation</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: File uploader components"><img src="assets/img/projects/mosaic-design-system-file-uploader.png" alt="Mosaic file-uploader drag, browse, selected, and progress states" width="622" height="1074" loading="lazy" decoding="async"></button><figcaption>File uploader</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Date picker components"><img src="assets/img/projects/mosaic-design-system-date-picker.png" alt="Mosaic date, range, and time picker component states" width="1237" height="1924" loading="lazy" decoding="async"></button><figcaption>Date and time picker</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Input and textarea components"><img src="assets/img/projects/mosaic-design-system-input-textarea.png" alt="Mosaic input, file input, and textarea component states" width="2048" height="1055" loading="lazy" decoding="async"></button><figcaption>Input and textarea</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Combobox and autocomplete components"><img src="assets/img/projects/mosaic-design-system-combobox.png" alt="Mosaic combobox and autocomplete component states" width="1891" height="1322" loading="lazy" decoding="async"></button><figcaption>Combobox and autocomplete</figcaption></figure>
            <figure class="mosaic-audit-carousel__slide" data-mosaic-audit-slide><button class="case-study-carousel__zoom mosaic-audit-carousel__zoom" type="button" data-case-carousel-zoom data-mosaic-audit-zoom aria-label="Open full-size image: Button components"><img src="assets/img/projects/mosaic-design-system-buttons.png" alt="Mosaic button variants, sizes, loading states, and icon buttons" width="1495" height="1037" loading="lazy" decoding="async"></button><figcaption>Buttons</figcaption></figure>
          </div>
        </div>
        <div class="case-study-carousel__footer mosaic-audit-carousel__footer">
          <p class="case-study-carousel__status" data-mosaic-audit-status aria-live="off" aria-atomic="true"><span data-mosaic-audit-current>01</span><span aria-hidden="true"> / </span><span>09</span><span class="visually-hidden"> images</span></p>
          <div class="case-study-carousel__actions" role="group" aria-label="Design-system gallery controls">
            <button type="button" data-mosaic-audit-previous aria-label="Previous image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
            <button type="button" data-mosaic-audit-next aria-label="Next image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
          </div>
        </div>
      </div>
      <p data-reading-copy>The audit exposed limited reuse and inconsistent foundations. The design response organized a reusable enterprise system so modules could share behavior instead of recreating it screen by screen.</p>
      <div class="mosaic-foundations" aria-label="Design system foundations"><span>Typography</span><span>Color</span><span>Spacing</span><span>Grid</span><span>Radius</span><span>Elevation</span><span>Iconography</span></div>
      <h3>Component architecture</h3>
      <div class="case-study-principles"><span>Buttons</span><span>Inputs</span><span>Selects</span><span>Dropdowns</span><span>Checkboxes</span><span>Radio</span><span>Date inputs</span><span>Cards</span><span>Tables</span><span>Tabs</span><span>Tags</span><span>Alerts</span><span>Navigation</span><span>Pagination</span><span>Modals</span><span>Drawers</span><span>Tooltips</span></div>
      <h3>States and responsive foundation</h3>
      <p data-reading-copy>Default, hover, focus, selected, disabled, error, success, and loading states formed the intended coverage. Responsive behavior prioritized progressive adaptation: desktop supports dense operational work, while tablet and mobile emphasize lookup, status, approvals, and lightweight updates rather than compressing every workflow.</p>
      <p class="case-study-caption" data-reading-copy>The originating Figma component library, typography specification, token file, and grid documentation were not available. Component coverage and states are presented as the documented design-system model, not as proof of full implementation.</p>
    `),
    section('details-only', 'details-key-ui', '16', 'Key Workflows & UI', 'From Product Thinking to UI', `
      <div class="mosaic-create-role-carousel" data-mosaic-workflow-gallery>
        <div class="mosaic-workflow-tabs" role="tablist" aria-label="Key workflow galleries">
          <button class="mosaic-workflow-tabs__tab is-active" type="button" role="tab" aria-selected="true" aria-controls="mosaic-workflow-gallery-display" tabindex="0" data-mosaic-gallery-tab="create-new-role">Create New Role</button>
          <button class="mosaic-workflow-tabs__tab" type="button" role="tab" aria-selected="false" aria-controls="mosaic-workflow-gallery-display" tabindex="-1" data-mosaic-gallery-tab="sets-management">Sets Management</button>
          <button class="mosaic-workflow-tabs__tab" type="button" role="tab" aria-selected="false" aria-controls="mosaic-workflow-gallery-display" tabindex="-1" data-mosaic-gallery-tab="role-management">Role Management</button>
          <button class="mosaic-workflow-tabs__tab" type="button" role="tab" aria-selected="false" aria-controls="mosaic-workflow-gallery-display" tabindex="-1" data-mosaic-gallery-tab="modify-users-super-admin">Modify Users Super Admin</button>
          <button class="mosaic-workflow-tabs__tab" type="button" role="tab" aria-selected="false" aria-controls="mosaic-workflow-gallery-display" tabindex="-1" data-mosaic-gallery-tab="modify-roles">Modify Roles</button>
          <button class="mosaic-workflow-tabs__tab" type="button" role="tab" aria-selected="false" aria-controls="mosaic-workflow-gallery-display" tabindex="-1" data-mosaic-gallery-tab="create-hardware-set">Create Hardware Set</button>
        </div>
        <div id="mosaic-workflow-gallery-display">
          <div class="case-study-carousel mosaic-workflow-gallery__carousel" data-case-carousel data-carousel-type="mosaic-create-role" data-carousel-language="en" data-mosaic-gallery-panel="create-new-role" aria-label="Create New Role interface gallery">
            <div class="case-study-carousel__viewport" data-case-carousel-viewport><div class="case-study-carousel__stage" data-case-carousel-stage></div></div>
            <div class="case-study-carousel__footer case-study-carousel__footer--with-live">
              <p class="case-study-carousel__status" aria-live="polite" aria-atomic="true"><span data-case-carousel-current>01–02</span><span aria-hidden="true"> / </span><span data-case-carousel-total>14</span><span class="visually-hidden"> images</span></p>
              <div class="case-study-carousel__actions" role="group" aria-label="Create New Role gallery controls">
                <button type="button" data-case-carousel-previous aria-label="Previous images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
                <button type="button" data-case-carousel-next aria-label="Next images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
              </div>
              <a class="case-study-carousel__live-link" href="https://mosaic.arcerpsolutions.com/" target="_blank" rel="noopener noreferrer" aria-label="View Mosaic live in a new tab">View live ↗</a>
            </div>
          </div>
          <div class="case-study-carousel mosaic-workflow-gallery__carousel" data-case-carousel data-carousel-type="mosaic-modify-roles" data-carousel-language="en" data-mosaic-gallery-panel="modify-roles" aria-label="Modify Roles interface gallery" hidden>
            <div class="case-study-carousel__viewport" data-case-carousel-viewport><div class="case-study-carousel__stage" data-case-carousel-stage></div></div>
            <div class="case-study-carousel__footer case-study-carousel__footer--with-live">
              <p class="case-study-carousel__status" aria-live="polite" aria-atomic="true"><span data-case-carousel-current>01–02</span><span aria-hidden="true"> / </span><span data-case-carousel-total>06</span><span class="visually-hidden"> images</span></p>
              <div class="case-study-carousel__actions" role="group" aria-label="Modify Roles gallery controls">
                <button type="button" data-case-carousel-previous aria-label="Previous images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
                <button type="button" data-case-carousel-next aria-label="Next images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
              </div>
              <a class="case-study-carousel__live-link" href="https://mosaic.arcerpsolutions.com/" target="_blank" rel="noopener noreferrer" aria-label="View Mosaic live in a new tab">View live ↗</a>
            </div>
          </div>
          <div class="case-study-carousel mosaic-workflow-gallery__carousel" data-case-carousel data-carousel-type="mosaic-create-hardware-set" data-carousel-language="en" data-mosaic-gallery-panel="create-hardware-set" aria-label="Create Hardware Set interface gallery" hidden>
            <div class="case-study-carousel__viewport" data-case-carousel-viewport><div class="case-study-carousel__stage" data-case-carousel-stage></div></div>
            <div class="case-study-carousel__footer case-study-carousel__footer--with-live">
              <p class="case-study-carousel__status" aria-live="polite" aria-atomic="true"><span data-case-carousel-current>01–02</span><span aria-hidden="true"> / </span><span data-case-carousel-total>12</span><span class="visually-hidden"> images</span></p>
              <div class="case-study-carousel__actions" role="group" aria-label="Create Hardware Set gallery controls">
                <button type="button" data-case-carousel-previous aria-label="Previous images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
                <button type="button" data-case-carousel-next aria-label="Next images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
              </div>
              <a class="case-study-carousel__live-link" href="https://mosaic.arcerpsolutions.com/" target="_blank" rel="noopener noreferrer" aria-label="View Mosaic live in a new tab">View live ↗</a>
            </div>
          </div>
          <div class="case-study-carousel mosaic-workflow-gallery__carousel" data-case-carousel data-carousel-type="mosaic-sets-management" data-carousel-language="en" data-mosaic-gallery-panel="sets-management" aria-label="Sets Management interface gallery" hidden>
            <div class="case-study-carousel__viewport" data-case-carousel-viewport><div class="case-study-carousel__stage" data-case-carousel-stage></div></div>
            <div class="case-study-carousel__footer case-study-carousel__footer--with-live">
              <p class="case-study-carousel__status" aria-live="polite" aria-atomic="true"><span data-case-carousel-current>01–02</span><span aria-hidden="true"> / </span><span data-case-carousel-total>08</span><span class="visually-hidden"> images</span></p>
              <div class="case-study-carousel__actions" role="group" aria-label="Sets Management gallery controls">
                <button type="button" data-case-carousel-previous aria-label="Previous images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
                <button type="button" data-case-carousel-next aria-label="Next images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
              </div>
              <a class="case-study-carousel__live-link" href="https://mosaic.arcerpsolutions.com/" target="_blank" rel="noopener noreferrer" aria-label="View Mosaic live in a new tab">View live ↗</a>
            </div>
          </div>
          <div class="case-study-carousel mosaic-workflow-gallery__carousel" data-case-carousel data-carousel-type="mosaic-role-management" data-carousel-language="en" data-mosaic-gallery-panel="role-management" aria-label="Role Management interface gallery" hidden>
            <div class="case-study-carousel__viewport" data-case-carousel-viewport><div class="case-study-carousel__stage" data-case-carousel-stage></div></div>
            <div class="case-study-carousel__footer case-study-carousel__footer--with-live">
              <p class="case-study-carousel__status" aria-live="polite" aria-atomic="true"><span data-case-carousel-current>01–02</span><span aria-hidden="true"> / </span><span data-case-carousel-total>14</span><span class="visually-hidden"> images</span></p>
              <div class="case-study-carousel__actions" role="group" aria-label="Role Management gallery controls">
                <button type="button" data-case-carousel-previous aria-label="Previous images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
                <button type="button" data-case-carousel-next aria-label="Next images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
              </div>
              <a class="case-study-carousel__live-link" href="https://mosaic.arcerpsolutions.com/" target="_blank" rel="noopener noreferrer" aria-label="View Mosaic live in a new tab">View live ↗</a>
            </div>
          </div>
          <div class="case-study-carousel mosaic-workflow-gallery__carousel" data-case-carousel data-carousel-type="mosaic-modify-users-super-admin" data-carousel-language="en" data-mosaic-gallery-panel="modify-users-super-admin" aria-label="Modify Users Super Admin interface gallery" hidden>
            <div class="case-study-carousel__viewport" data-case-carousel-viewport><div class="case-study-carousel__stage" data-case-carousel-stage></div></div>
            <div class="case-study-carousel__footer case-study-carousel__footer--with-live">
              <p class="case-study-carousel__status" aria-live="polite" aria-atomic="true"><span data-case-carousel-current>01–02</span><span aria-hidden="true"> / </span><span data-case-carousel-total>05</span><span class="visually-hidden"> images</span></p>
              <div class="case-study-carousel__actions" role="group" aria-label="Modify Users Super Admin gallery controls">
                <button type="button" data-case-carousel-previous aria-label="Previous images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
                <button type="button" data-case-carousel-next aria-label="Next images"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
              </div>
              <a class="case-study-carousel__live-link" href="https://mosaic.arcerpsolutions.com/" target="_blank" rel="noopener noreferrer" aria-label="View Mosaic live in a new tab">View live ↗</a>
            </div>
          </div>
          <div class="mosaic-workflow-gallery-empty" data-mosaic-gallery-empty role="tabpanel" hidden>
            <strong data-mosaic-gallery-empty-title></strong>
            <span>Gallery photos will be added here.</span>
          </div>
        </div>
      </div>
    `),
    section('details-only', 'details-testing', '17', 'Prototype & Testing', 'Validating Design Decisions', `
      <p data-reading-copy>I moved beyond static Figma prototypes by building a <strong>production-ready front-end prototype</strong> to validate Mosaic’s workflows and Design System components in a real interactive environment.</p>
      <p data-reading-copy>This helped validate <strong>navigation, task sequences, states, permissions, responsive behavior, and component interactions</strong> before development handoff.</p>
      <h3 data-reading-copy>Explore a Live Example</h3>
      <p data-reading-copy>This interactive prototype demonstrates both the <strong>Side Navigation</strong> behavior—expanded, collapsed, and pinned states—and the complete <strong>Create New Role</strong> permission flow.</p>
      <p data-reading-copy><a class="mosaic-live-prototype-link" href="https://mosaic-rbac-prototype-roles.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View the Mosaic role and permission prototype in a new tab"><strong>View Live Prototype ↗</strong></a></p>
      <p data-reading-copy>This is one representative example of the broader prototyping approach used across Mosaic to validate <strong>reusable, implementation-ready interactions rather than isolated screens.</strong></p>
    `),
    section('details-only', 'details-handoff', '18', 'Developer Handoff', 'A System Ready to Build', `
      <p data-reading-copy>The documented handoff model connected the design system, responsive rules, workflow structure, and access logic so engineering could reason about behavior across modules.</p>
      <div class="case-study-stack">
        <article><h3>Reusable system</h3><p data-reading-copy>Components, variants, design tokens, interaction states, and responsive rules.</p></article>
        <article><h3>Operational states</h3><p data-reading-copy>Loading, empty, error, success, validation, and status behavior.</p></article>
        <article><h3>Product logic</h3><p data-reading-copy>User flows, domain relationships, permission rules, and global versus project context.</p></article>
        <article><h3>Documentation</h3><p data-reading-copy>Specifications and shared naming intended to reduce ambiguity between design and development.</p></article>
      </div>
      <p class="mosaic-storybook-note" data-reading-copy>The handoff went beyond Figma specifications. I translated the Mosaic Design System into <strong>Storybook</strong>, giving developers an implementation-ready reference for reusable components, variants, states, interaction patterns, and usage guidelines—creating a clearer bridge between design and development and supporting consistency across the product. <a class="mosaic-live-prototype-link" href="https://storybook-lhtpruwo0-galalhelany-6581.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View the Mosaic Storybook in a new tab"><strong>View Storybook ↗</strong></a></p>
    `),
    section('details-only', 'details-outcome', '19', 'Outcome', 'A System Built to Scale', `
      <p data-reading-copy>No verified performance metrics were supplied. The supported outcomes are structural product-design deliverables and directions.</p>
      <div class="case-study-metrics mosaic-outcomes">
        <article><strong>IA</strong><span data-reading-copy>Defined global and project contexts</span></article>
        <article><strong>Domain</strong><span data-reading-copy>Mapped core ERP relationships</span></article>
        <article><strong>IAM</strong><span data-reading-copy>Proposed role and permission architecture</span></article>
        <article><strong>UX</strong><span data-reading-copy>Structured reusable enterprise patterns</span></article>
        <article><strong>System</strong><span data-reading-copy>Established a design-system direction</span></article>
        <article><strong>Scale</strong><span data-reading-copy>Created a framework for future modules</span></article>
      </div>
      <p data-reading-copy>The work also improved responsive readiness and clarified the intended design-to-development handoff. These statements describe the documented product foundation; they do not claim launch or business performance.</p>
    `),
    section('details-only', 'details-takeaways', '20', 'Key Takeaways', 'Turning Complexity Into Clarity', `
      <p data-reading-copy>Enterprise design is not about removing complexity. It is about structuring complexity so users can understand, navigate, and control it.</p>
      <p data-reading-copy>Mosaic required business analysis, domain and competitive research, user understanding, process mapping, systems thinking, IAM, information architecture, domain modeling, workflow design, data-dense UX, design systems, responsive design, and technical collaboration.</p>
      <blockquote data-reading-copy>The biggest shift was moving from designing ERP screens to designing an interconnected operational system.</blockquote>
    `)
  ];

  var tldrSections = [
    section('tldr-only', 'tldr-overview', '01', 'Overview', 'Mosaic at a glance', `
      <p data-reading-copy><strong>Mosaic is a specialized model within ARC ERP for door, frame, and architectural hardware distributors.</strong></p>
      <p data-reading-copy>It brings complex project operations into one connected workspace—linking <strong>projects, openings, doors and frames, hardware, quotes, orders, suppliers, shipments, and documents.</strong> The platform supports multiple operational roles—including <strong>Sales, Project Management, Procurement, Customer Service, Finance, and Administration</strong>—while keeping project information and workflows connected throughout the lifecycle.</p>
    `),
    section('tldr-only', 'tldr-challenge', '02', 'Challenge & Starting Point', 'Turning Complexity Into a Scalable System', `
      <div class="case-study-stack">
        <article><h3>No scalable design system</h3><p data-reading-copy>Limited component reuse and shared states.</p></article>
        <article><h3>Weak responsive foundation</h3><p data-reading-copy>Inconsistent grid and unresolved dense-screen adaptation.</p></article>
        <article><h3>Unclear flows</h3><p data-reading-copy>Entry, progression, completion, and module relationships needed definition.</p></article>
        <article><h3>Dashboard-oriented structure</h3><p data-reading-copy>Operational tables, forms, approvals, documents, and cross-module work were underrepresented.</p></article>
        <article><h3>Limited access model</h3><p data-reading-copy>Roles, permissions, and contextual visibility needed an explicit architecture.</p></article>
      </div>
      <blockquote data-reading-copy>How might we turn disconnected ERP screens into a scalable operational system without overwhelming users?</blockquote>
    `),
    section('tldr-only', 'tldr-insights', '03', 'What I Learned', 'Five signals shaped the product direction', `
      <div class="mosaic-insight-grid">
        <article><span>Industry</span><p data-reading-copy>Openings, doors, frames, hardware, specifications, suppliers, orders, and compliance data form a connected domain.</p></article>
        <article><span>Users</span><p data-reading-copy>Sales, project, service, procurement, finance, and admin roles require different information and control.</p></article>
        <article><span>Business</span><p data-reading-copy>Spreadsheet dependence, duplicate data, and disconnected workflows create operational friction.</p></article>
        <article><span>Competition</span><p data-reading-copy>Existing products offer deep functionality; clarity, learnability, connection, and scale remain opportunities.</p></article>
        <article><span>Process</span><p data-reading-copy>Quotation and procurement span departments, objects, decisions, and handoffs rather than isolated modules.</p></article>
      </div>
      <div class="mosaic-evidence-chain"><span>Evidence</span><strong>Complex cross-functional operations</strong><span>Insight</span><strong>Users need shared truth with role-specific views</strong><span>Decision</span><strong>Design the operating model before the interface</strong></div>
    `),
    section('tldr-only', 'tldr-interface', '16', 'Key Workflows & UI', 'From Product Thinking to UI', ''),
    section('tldr-only', 'tldr-validation', '07', 'Validation & Delivery', 'A System Built to Scale', `
      <div class="case-study-stack">
        <article>
          <h3>Prototype & workflow validation</h3>
          <p data-reading-copy>The documented scope covered context, sequence, state, responsibility, and next actions across representative flows. No participants, findings, metrics, or iteration artifacts were supplied.</p>
          <p data-reading-copy><a class="mosaic-live-prototype-link" href="https://mosaic-rbac-prototype-roles.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View the Mosaic role and permission prototype in a new tab"><strong>View Live Prototype ↗</strong></a></p>
        </article>
        <article>
          <h3>Developer handoff</h3>
          <p data-reading-copy>The intended package connected components, variants, tokens, interaction states, responsive rules, UX flows, permissions logic, and documentation. Source handoff files were not supplied for verification.</p>
          <p data-reading-copy><a class="mosaic-live-prototype-link" href="https://storybook-lhtpruwo0-galalhelany-6581.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View the Mosaic Storybook in a new tab"><strong>View Storybook ↗</strong></a></p>
        </article>
      </div>
    `),
    section('tldr-only', 'tldr-outcome', '08', 'Outcome & Takeaways', 'Turning Complexity Into Clarity', `
      <div class="case-study-metrics mosaic-outcomes"><article><strong>IA</strong><span data-reading-copy>Clear global and project contexts</span></article><article><strong>Domain</strong><span data-reading-copy>Structured object relationships</span></article><article><strong>IAM</strong><span data-reading-copy>Proposed role and permission foundation</span></article><article><strong>UX</strong><span data-reading-copy>Reusable enterprise patterns</span></article><article><strong>System</strong><span data-reading-copy>Design-system direction</span></article><article><strong>Scale</strong><span data-reading-copy>Framework for future modules</span></article></div>
      <p data-reading-copy>No performance metrics or business outcomes are claimed. The supported outcome is a clearer product architecture and design foundation.</p>
      <blockquote data-reading-copy>The biggest shift was moving from designing ERP screens to designing an interconnected operational system.</blockquote>
      <button class="case-study-read-full" type="button" data-reading-switch="details">Read the full case study</button>
    `)
  ];

  article.innerHTML = (`
    <header class="case-study-hero" data-reading-mode="essential">
      <p class="case-study-eyebrow" data-project-field="category" data-reading-copy>Enterprise ERP · Systems Thinking · Complex Workflows</p>
      <h1 data-project-field="title" data-reading-copy>Mosaic — ARC ERP</h1>
      <p class="case-study-lead" data-project-field="summary" data-reading-copy>Designing a scalable ERP for architectural hardware distribution.</p>
      <dl class="case-study-facts">
        <div class="case-study-fact"><dt>Role</dt><dd>Product Designer</dd></div>
        <div class="case-study-fact"><dt>Product Type</dt><dd>Enterprise ERP</dd></div>
        <div class="case-study-fact"><dt>Platform</dt><dd>Web</dd></div>
        <div class="case-study-fact"><dt>Industry</dt><dd>Construction · Architectural Hardware · B2B SaaS</dd></div>
        <div class="case-study-fact"><dt>Timeline</dt><dd>9 months</dd></div>
        <div class="case-study-fact"><dt>Scope</dt><dd>Discovery · Research · IA · UX · Ready production Design System &amp; UI · Prototype · Validation · Handoff</dd></div>
      </dl>
    </header>
    <div class="case-study-reading-bar" data-reading-mode="chrome">
      <div class="case-study-reading-mode" role="group" aria-label="Case study reading mode">
        <button class="case-study-reading-mode__button is-active" type="button" data-reading-view="details" aria-pressed="true"><span>Details</span></button>
        <button class="case-study-reading-mode__button" type="button" data-reading-view="tldr" aria-pressed="false"><span>TL;DR</span></button>
      </div>
    </div>
    <figure class="case-study-media case-study-media--hero mosaic-hero-media" data-reading-mode="essential">
      <img src="assets/img/projects/mosaic-arc-erp-hero.png" alt="ARC ERP module launcher and Mosaic operational dashboard" srcset="assets/img/optimized/mosaic-arc-erp-hero-768.webp 768w, assets/img/optimized/mosaic-arc-erp-hero-1536.webp 1536w" sizes="100vw" width="2796" height="1184" decoding="async" fetchpriority="high">
      <figcaption data-reading-copy>ARC ERP module launcher and Mosaic operational dashboard.</figcaption>
    </figure>
    <aside class="case-study-note" data-reading-mode="essential" aria-label="Confidentiality note"><strong>Confidentiality &amp; NDA</strong><p data-reading-copy>Some operational data, customer information, and internal implementation details have been simplified, anonymized, or omitted. Evidence status is stated wherever source material was unavailable.</p></aside>
    ${detailsSections.join('')}
    ${tldrSections.join('')}
  `).replace(/<img src="([^"]+)"([^>]*loading="lazy")/g, '<img data-src="$1"$2');

  var auditCarousel = article.querySelector('#details-audit [data-mosaic-audit-carousel]');
  var auditHeading = article.querySelector('#details-audit .case-study-section__heading');
  if (auditCarousel && auditHeading) {
    auditHeading.appendChild(auditCarousel);
  }

  var competitionCarousel = article.querySelector('#details-competition [data-mosaic-audit-carousel]');
  var competitionHeading = article.querySelector('#details-competition .case-study-section__heading');
  if (competitionCarousel && competitionHeading) {
    competitionHeading.appendChild(competitionCarousel);
  }

  var processCarousel = article.querySelector('#details-processes [data-mosaic-audit-carousel]');
  var processHeading = article.querySelector('#details-processes .case-study-section__heading');
  if (processCarousel && processHeading) {
    processHeading.appendChild(processCarousel);
  }

  var flowsCarousel = article.querySelector('#details-flows [data-mosaic-audit-carousel]');
  var flowsHeading = article.querySelector('#details-flows .case-study-section__heading');
  if (flowsCarousel && flowsHeading) {
    flowsHeading.appendChild(flowsCarousel);
  }

  var designSystemCarousel = article.querySelector('#details-design-system [data-mosaic-audit-carousel]');
  var designSystemHeading = article.querySelector('#details-design-system .case-study-section__heading');
  if (designSystemCarousel && designSystemHeading) {
    designSystemHeading.appendChild(designSystemCarousel);
  }

  var keyUiSection = article.querySelector('#details-key-ui');
  var keyUiHeading = article.querySelector('#details-key-ui .case-study-section__heading');
  var keyUiContent = article.querySelector('#details-key-ui .case-study-section__content');
  var keyUiGallery = article.querySelector('#details-key-ui [data-mosaic-workflow-gallery]');
  if (keyUiSection && keyUiHeading && keyUiGallery) {
    keyUiHeading.insertAdjacentElement('afterend', keyUiGallery);
    if (keyUiContent && !keyUiContent.textContent.trim() && !keyUiContent.children.length) {
      keyUiContent.remove();
    }
  }

  var tldrKeyUiHeading = article.querySelector('#tldr-interface .case-study-section__heading');
  var tldrKeyUiContent = article.querySelector('#tldr-interface .case-study-section__content');
  var tldrKeyUiGallery = null;
  if (tldrKeyUiHeading && keyUiGallery) {
    tldrKeyUiGallery = keyUiGallery.cloneNode(true);
    var tldrGalleryDisplay = tldrKeyUiGallery.querySelector('#mosaic-workflow-gallery-display');
    if (tldrGalleryDisplay) {
      tldrGalleryDisplay.id = 'mosaic-workflow-gallery-display-tldr';
    }
    tldrKeyUiGallery.querySelectorAll('[aria-controls="mosaic-workflow-gallery-display"]').forEach(function (tab) {
      tab.setAttribute('aria-controls', 'mosaic-workflow-gallery-display-tldr');
    });
    tldrKeyUiHeading.insertAdjacentElement('afterend', tldrKeyUiGallery);
    if (tldrKeyUiContent) {
      tldrKeyUiContent.remove();
    }
  }

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

  initializeMosaicWorkflowTabs(keyUiGallery);
  initializeMosaicWorkflowTabs(tldrKeyUiGallery);

  var iaFlow = article.querySelector('#details-ia [data-mosaic-ia-flow]');
  var iaHeading = article.querySelector('#details-ia .case-study-section__heading');
  if (iaFlow && iaHeading) {
    iaHeading.appendChild(iaFlow);
  }

  if (nextProject) {
    article.appendChild(nextProject);
  }
  if (closing) {
    article.appendChild(closing);
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
      children.innerHTML = '';

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

  initializeMosaicIaFlow();
  Array.prototype.slice.call(document.querySelectorAll('[data-mosaic-audit-carousel]')).forEach(initializeMosaicAuditCarousel);
})();

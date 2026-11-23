# Mobile Portfolio V1 architecture audit

## Architecture before V1

- The repository is a buildless, bilingual static site. The root contains the English and Arabic homepages, separate Hamdan and Mosaic case-study files in both languages, and two legacy case-study redirects to Mosaic. The redirects also carry forward `?view=tldr`.
- Each homepage is one editorial document. Hash links point to introduction, selected projects, independent products, principles, experience, strengths, FAQ, biography, and contact. Five project cards are hard-coded in each locale. Hamdan and Mosaic have full case studies. Laffah, ABH Manufacturing, and Arab Tourism Organization have previews. The independent-product HTML is synchronized from `data/independent-products.json` by a Python script.
- Styles layer normalization, reset, font faces, semantic tokens, 17 body-class palettes, shared shell and grid rules, responsive overrides, and case-level overrides. The compact shell starts at 1020px and reflows again at 760px and 500px. Latin typography uses Montserrat and Arabic uses DIN Next LT Arabic. Locale pages set `lang` and `dir` and link directly to their counterparts.
- Homepage behavior lives in jQuery, jQuery Easing, and `script.js`. It manages the intro cover, audience-specific copy, navigation, accordions, and portfolio motion. Compact navigation, cursor, and copyright have shared scripts. `case-study.js` handles reading modes, anchored sections, lazy carousels, lightboxes, text size, and metrics. Mosaic also has its own content and interactions scripts.
- Indexed pages include localized titles/descriptions, canonicals, hreflang, Open Graph/Twitter metadata, and JSON-LD. `sitemap.xml` lists the six primary documents and `robots.txt` points to it. `CNAME` specifies the custom domain. At audit time the checkout used a buildless publishing layout. Pages source settings live outside the checkout.

## Reuse

- Read localized project names, descriptions, tags, approved metrics, image attributes, and real destinations from the existing homepage documents at build time. Use the independent-products JSON directly.
- Use the existing portrait, responsive WebP artwork, fonts, and theme tokens. Build About from the biography and use the current email, calendar, LinkedIn, and Behance links.
- Keep the full Hamdan article in the existing document, including headings, figures, approved outcome data, galleries, reading modes, and section IDs. Reuse the case script for interactive article behavior.

## Observations and constraints

| Step | Existing experience | V1 response |
| --- | --- | --- |
| 1. Arrive on Home | A timed introductory cover precedes the portfolio. The compact header and audience controls offer context once the cover is dismissed. | Show name, positioning, and actions from the first paint. |
| 2. Find Work | Project evidence is already strong. The project section sits below the introduction, with different image and text destinations on featured cards. | Give Work a persistent tab and make the case-study card one clear touch target. |
| 3. Read Hamdan | The original URL exposes a substantive article and multiple reading modes. At phone width the opening reserves a large header gap and reading controls share the lower screen with the legacy utility row. | Tighten the opening, keep a sticky Work link, and reserve a dedicated place for reading controls. |

The live reference reinforced a short introduction, immediately available contact, and persistent navigation. The new layout uses Galal's portfolio content, images, typography, and theme palette. This review covered the visible starting screen and the Home-to-Hamdan path. Assistive-technology conformance was outside this visual inspection. [Existing portfolio](https://galalhelany.com/) · [Design reference](https://noahelhadedy.com/)

- The homepage's timed loading classes can obscure the legacy page when JavaScript is unavailable. Several pages also reference a missing `gradual-blur.js` in this checkout.
- Legacy sections and CSS rely on global class and ID selectors. Keep the same legacy nodes and scope the new styles to the compact shell.
- Hamdan's Arabic source currently lists a different timeline, platform, and year from the English source. Preserve the published locale-specific article facts. Resolve editorial discrepancies with the project owner before harmonizing the copy.
- Hashes and real HTML files work on GitHub Pages without a route fallback. The Pages publishing source must receive the built static output for the app to appear. [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## V1 integration

The initial React release added static markup for the bilingual homepages and Hamdan at the existing 1020px breakpoint. The subsequent migration kept that integration and moved HTML generation to the Python content pipeline. A deferred native controller handles the controls, and the original case studies remain independent HTML documents. The four homepage views use the existing hashes and browser history. Each source page keeps its canonical native heading and exposes a level-one heading in the active mobile view. See the [migration report](mobile-v1-migration.md) for the baseline comparison.

## V1 boundaries

| Included | Deferred |
| --- | --- |
| Home, Work, About, Contact, and a dedicated Hamdan reading layout | A bespoke Mosaic layout and full case studies for preview projects |
| Bilingual tab navigation, theme controls, project metrics, and real contact links | Audience-personalized content, FAQ, and full experience timeline as app screens |
| Existing article controls, responsive artwork, and a local static build | Changes to live Pages settings or production deployment |

The original portfolio sections remain reachable through the full portfolio view and existing section links.

# Mobile Portfolio V1 implementation report

## Edit and preview

Open `index.html` or `index-ar.html` directly in a browser. Use a viewport **1020 CSS pixels wide or narrower** to see Mobile V1. Edit the root HTML and its linked files in `assets/`, then refresh the browser. Both language versions and the original case-study URLs are part of the source site.

For HTTP behavior, serve the repository root with any static server. If Python 3 is already available, this is an optional way to do that.

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open [English](http://127.0.0.1:4173/) or [Arabic](http://127.0.0.1:4173/index-ar.html). Use HTTP to test origin-dependent behavior such as shared storage across pages and third-party chat. Browser storage behavior for files opened from disk varies by browser.

## What shipped

- Work is the mobile landing screen. It uses the original desktop Selected projects order: Hamdan Awards, Mosaic / ARC ERP, Laffah, ABH Manufacturing, and Arab Tourism Organization. Independent products appear in the dedicated mobile Built screen.
- Work keeps the header and introduction expanded while projects snap vertically underneath. A resize observer measures the header, bottom bar, and project stages. CSS uses mandatory snapping when every stage fits and proximity snapping when content needs more room. Exceptionally short or zoomed viewports let the header scroll with the document. Action links sit above the bottom bar when their stage fits. Native view timelines animate transitions, with passive frame-batched updates on browsers without them. Reduced motion disables the card effects. Tab and history entries retain their scroll positions.
- The bottom bar switches Work, Built, Experience, About, and Contact in-page. The Experience screen combines the existing career history, capabilities, and markets. About includes the original design principles. Contact uses the current email, calendar, LinkedIn, Behance, and live chat destinations.
- Direct links, refresh, and browser history remain available. The `#hello` and `#work` fragments lead to Work. The `#things-ive-built` fragment opens Built on mobile and the independent-products section on desktop. The `#what-i-bring`, `#markets-title`, and `#principles` fragments scroll to their sections within Experience or About.
- On mobile, the homepages and both localized case studies share the same header. Outside Work, it swaps theme and language controls for the existing contact links after scrolling, then restores them near the top. Desktop uses the original wordmark or case-study Back link with its sidebar navigation and appearance controls.
- Hamdan and Mosaic use a separate row for Back to Work. At compact widths this row also holds the section menu and text-size control. Reading modes, galleries, and lightboxes are part of the existing articles.
- The compact layout uses Montserrat and DIN Next LT Arabic, logical spacing, safe-area insets, keyboard focus, and reduced-motion rules. The mobile shell follows the system color scheme until a Light or Dark mode is selected. The choice carries across tabs, locales, and case-study navigation. Legacy controls retain all 17 palettes.

## Architecture

The localized homepages and Hamdan contain their mobile markup alongside the original site content. The early theme script selects the route and layout before paint and loads a classic controller only when the compact shell is active. The controller releases its navigation listeners and observers when the shell closes or the viewport widens. The original HTML provides the JavaScript-disabled fallback. Each source document retains its native H1, and the active mobile screen exposes a level-one heading. The [earlier native migration report](mobile-v1-migration.md) records the transition from React.

Edit portfolio copy and project cards in `index.html` and `index-ar.html`. When a card appears in both the compact and desktop layouts, update both versions of that card in the relevant language. Experience and About use the original source sections, which the controller moves into the compact layout and restores on desktop. Edit the Hamdan and Mosaic articles directly in their original documents.

Historical artwork from the earlier showcase remains in `assets/img/optimized/work-archive/`.

Five homepage views use the existing hashes. Case-study pages and redirects use real HTML files. The repository root contains the custom-domain file, sitemap, robots directives, and the `.nojekyll` marker for direct static publishing.

## Publish through GitHub Pages

1. In the repository's **Settings → Pages → Build and deployment**, choose **Deploy from a branch**.
2. Select the publishing branch and **/ (root)**, then save. Use `main` if you publish from the repository's default branch.
3. Keep the custom domain set to `galalhelany.com` and keep the root `CNAME` file. Push the static files to the configured branch for future updates.

The repository contains no custom Pages workflow. The migration was performed locally and the live repository settings were left as configured.

## Current files

| Files | Purpose |
| --- | --- |
| `index.html`, `index-ar.html` | Complete localized site and five-tab mobile views |
| `hamdan-awards-case-study*.html`, `mosaic-arc-erp-case-study*.html` | Original project articles and controls |
| `assets/css/portfolio-header.css`, `assets/js/portfolio-header.js` | Shared header styling, scroll states, language links, and appearance controls |
| `assets/js/mobile-boot.js`, `assets/js/mobile-controller.js`, `assets/css/mobile.css` | First paint, native controls, and mobile layout |
| `assets/js/script.js`, `assets/js/case-study.js`, `assets/js/cursor.js` | Existing compact theme, reading controls, visible-section scroll, and cursor handoff |
| `.nojekyll`, `CNAME`, `robots.txt`, `sitemap.xml` | Direct Pages publishing and crawl configuration |

## Direct static migration

The previous preview added the compact markup, theme boot script, and fingerprinted CSS and JavaScript during a Python build. Opening the old source pages therefore displayed the original documents without Mobile V1. The current root pages contain the same mobile markup and use regular relative asset paths. The classic controller works from disk, and the social icon masks are embedded in the shared CSS to avoid browser restrictions on local SVG masks. The obsolete generators, npm aliases, and output directory have been retired.

- Compared 70 Chrome screenshots at 320, 375, 427, 768, 1020, and 1440px in English and Arabic, with a Dark comparison at 427px. All six desktop screenshots and 55 mobile captures matched pixel for pixel. The other nine showed only portrait rasterization differences, with at most 207 pixels affected and a maximum change of 3 per color channel. Sampled layout and typography matched throughout.
- Tested all five tabs, the spotlight, header transitions, reduced motion, scroll restoration, deep links, refresh, theme persistence, and case navigation. The mobile controller was fetched once during six breakpoint changes. Chrome also passed the direct-file checks in both languages, including theme persistence across the tested files.
- The eight HTML routes retained canonical and alternate links, metadata, structured data, heading counts, IDs, and original article content. The sitemap, robots directives, redirects, and domain file matched the baseline. The HTML link audit found no missing local paths or fragment targets. The migration removed four references to the already-missing `gradual-blur.js` script.

## Verification of the initial React release

| Check | Result |
| --- | --- |
| Dependency installation, TypeScript, and production build | Pass. Vite produced a static `dist/` with versioned assets. Lucide emitted non-fatal bundler notices about its client directives. |
| Legacy regression suite | Pass across all six source pages at 375px and 1440px. |
| Desktop lifecycle suite against the build and baseline | Pass for cursor typography and geometry, repeated lifecycle events, reduced motion, legacy language links, and 15 Hamdan lightbox cycles. |
| Desktop screenshot comparison | Pixel-identical at 1440px for both homepages and both Hamdan pages against the original checkout. |
| Chrome viewport and interaction checks | 54 checks across English and Arabic at widths from 320px to 1440px. Verified one visible main and heading, tab history without document requests, direct links, resize, keyboard focus, theme and text-size persistence, sticky case navigation, project artwork taps, galleries, and reduced motion. |
| Accessibility and fallback checks | Axe reported zero violations in the eight localized mobile tab views and the tested Hamdan chrome. Both homepages and both Hamdan articles exposed readable content with JavaScript disabled. |
| SEO and static hosting files | Canonicals, hreflang, metadata, JSON-LD, original fragment IDs, and native H1 counts matched the source. Sitemap, robots, CNAME, and redirect files matched byte for byte. |
| Browser errors | Zero uncaught JavaScript errors in the verification suite. The pre-existing missing script returned a 404. |

## Known limitations and next improvements

- Mosaic and the three preview projects retain their current level of case-study coverage. Extend the mobile reading treatment to Mosaic next.
- The English and Arabic Hamdan sources differ on timeline, platform, and year. Reconcile the published project facts with the source material before editing either locale.
- Before publishing, confirm safe-area and screen-reader behavior on physical iOS and Android devices.

# Mobile Portfolio V1 native migration

This report records the earlier React-to-Vanilla migration. For the current source-only workflow and GitHub Pages setup, see the [direct static implementation notes](mobile-v1-implementation.md).

The migration preserves the existing compact screens through 1020px and the desktop layout above that breakpoint. Home, Work, About, and Contact still use the existing fragments. Both Hamdan languages use their original static case-study URLs, article content, reading controls, and navigation.

## Architecture and files

| Files | Change |
| --- | --- |
| `mobile/controller.js` | Adds native tab routing, keyboard focus, history scroll restoration, locale links, disclosures, theme and reading-size controls, and the existing chat integration. A single active session owns its listeners and observer across resize and page restoration. |
| `mobile/boot.js`, `mobile/style.css` | Keep pre-paint routing, theme handoff, and the existing visual CSS. The stylesheet uses a native control-readiness attribute. |
| `mobile/copy.json`, `mobile/icons.json`, `mobile/lucide-license.txt` | Preserve the bilingual shell labels and SVG icon geometry from V1. |
| `scripts/build-mobile.py`, `scripts/mobile_content.py`, `scripts/mobile_markup.py` | Assemble static Pages output, reuse the original HTML content extractor and independent-products data, and render the complete compact shell at build time. |
| `package.json`, `package-lock.json`, `.gitignore` | Retain the npm build and preview aliases with an empty dependency tree. Ignore the generated Python cache. |
| `mobile/App.tsx`, `mobile/client.tsx`, `mobile/content.ts`, `tsconfig.json`, `vite.config.ts` | Removed the React, TypeScript, and Vite pipeline after verifying the native replacement. |
| `docs/mobile-v1-audit.md`, `docs/mobile-v1-implementation.md` | Document the current build and preserve the initial release findings as historical context. |

The build uses the Python 3.9+ standard library. It writes versioned assets and static pages to `dist/`. All view text and links are present in the generated HTML. The deferred controller attaches behavior to those nodes. The original documents supply the readable JavaScript-disabled fallback.

## Verification against React V1

| Check | Result |
| --- | --- |
| Browser and screenshot matrix | Captured 58 before-and-after pairs in Chrome at 320, 375, 430, 768, 1020, and 1440px, covering English and Arabic, the phone and tablet screens, and the desktop homepages and case studies. Sampled layout geometry, typography, colors, and image attributes matched in every pair. |
| Visual differences | All six desktop pairs matched pixel-for-pixel. Across all sizes, 39 pairs matched exactly. The other 19 varied only in portrait image pixels, with at most 0.068% of a frame affected and a maximum difference of 3 per color channel. |
| Mobile interactions | Verified all four tabs, keyboard focus, direct fragments, refresh, Back and Forward, language switching, repeated breakpoint changes, all 17 palettes and saved preferences, reduced motion, and the chat control with a simulated SDK. The same 210ms tab motion was reported by both builds. |
| Scroll history | In the tested Work → About → Contact → Back path, the original build returned Work to the top. The native build restored the saved 420px offset. Both builds switched tabs without requesting a new document. |
| Hamdan | Verified article section links, language handoff with the current query and fragment, reading modes, persisted text size, gallery and Escape focus restoration, and Back to Work. |
| Existing desktop lifecycle suite | Passed with the React build as baseline, including cursor geometry, repeated page lifecycle events, reduced motion, language links, and 15 lightbox cycles. |
| Accessibility | Axe returned zero violations in the tested app shell for the eight localized tabs and both Hamdan pages. Both homepages and both Hamdan articles exposed readable legacy content with JavaScript disabled. |
| Static output and SEO | Verified all eight HTML routes. Canonicals, hreflang, head metadata, structured data, original IDs, native H1 counts, and legacy main content matched. Original assets, redirects, robots, sitemap, and CNAME matched byte-for-byte. |
| Build and runtime | `npm run build` emitted `dist/` using Python. `npm ls --all` reported an empty dependency tree. The paired browser suites reported zero uncaught JavaScript exceptions. |

## Payload and requests

Sizes are bytes. Gzip figures come from compressing the measured build files at level 9. Resource counts come from cold local Chrome loads with third-party requests blocked.

| Measurement | React | Vanilla |
| --- | ---: | ---: |
| Deferred mobile JavaScript | 243,076 | 5,511 |
| Deferred mobile JavaScript, gzip | 75,356 | 1,857 |
| Compact stylesheet | 16,111 | 19,993 |
| Compact stylesheet, gzip | 3,793 | 4,103 |
| English homepage HTML | 120,348 | 117,097 |
| Arabic homepage HTML | 134,696 | 129,447 |
| Local resource requests per homepage, 375px | 37 | 37 |
| JavaScript resource requests per homepage, 375px | 9 | 9 |
| Deferred mobile script requests per homepage, 1440px | 0 | 0 |
| New document requests during tab navigation | 0 | 0 |

The deferred JavaScript is 97.5% smaller after gzip compression. The stylesheet is copied as authored, which adds 310 gzip bytes relative to the Vite output. Runtime speed was outside the measured comparison.

## Remaining issues

- The inherited `gradual-blur.js` reference still returns 404. The existing localized Hamdan project facts still differ between the two source articles.
- Browser verification used desktop Chrome with responsive viewports. Physical-device safe-area and assistive-technology checks remain open.
- The output was built and served locally. GitHub Pages activation uses the same static `dist/` publishing step as V1.

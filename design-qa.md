# Mobile Home visual verification

The two supplied PNGs were identical. Each was 854 × 1904 pixels and represented a 427 × 952 CSS viewport at 2× density. The browser captures used the same viewport and density in English light mode with Home selected and the page at the top.

- [Supplied reference](/var/folders/jn/s08z2t815w9fm0f3btzy9yqh0000gn/T/codex-clipboard-41648676-67a7-4ad4-8bb6-22e63f821cdc.png)
- [Reference, before, and after at the same scale](/Users/galalhelany/.codex/visualizations/2026/11/20/01a1f8f1-f503-7c40-a283-5c6e84c204a0/mobile-home-reference-before-after.png)
- [Final 427 × 952 render](/Users/galalhelany/.codex/visualizations/2026/11/20/01a1f8f1-f503-7c40-a283-5c6e84c204a0/mobile-home-427-after.png) and [Arabic dark-mode render](/Users/galalhelany/.codex/visualizations/2026/11/20/01a1f8f1-f503-7c40-a283-5c6e84c204a0/mobile-home-427-dark-rtl.png)

## Comparison

| Area | Final result |
| --- | --- |
| Header and hero | The header measures 61px, the portrait 36px, and the inline gutter 20.5px. The light header and intro use the requested neutral surface. The existing Montserrat introduction wraps to three lines at 427px with a stronger opening phrase. Calendar, message, and socials sit on one row at that width and wrap as needed on narrow screens. |
| Featured projects | The first card starts at y=220px and measures 386 × 518px. Existing 16:9 imagery, title, description, two-column outcomes, and the full-width case-study action line up with the reference. Home displays both featured projects with their existing text and metrics. |
| Shared navigation | The fixed bar starts at y=885px and measures 67px before the safe-area inset. It uses an upper separator and shadow, a translucent surface, and 12px backdrop blur. The icon and label follow the active tab. The inactive shade uses a deeper gray for readability. |
| Content and assets | The Home portrait, project imagery, and project links come from the existing source. Book a call opens the existing calendar. Send message opens the existing chat when ready, with the established email link as fallback. LinkedIn and Behance use the existing profile URLs. The social marks use the original Bootstrap Icons artwork. [LinkedIn icon](https://icons.getbootstrap.com/icons/linkedin/) · [Behance icon](https://icons.getbootstrap.com/icons/behance/) |

The original Home placed the first project below a large title, buttons, and section label. The compact introduction and inline contacts brought the card to the reference's y=220px in the first pass. The first comparison also showed the moon about 7px too far from the language control and the first card extending about 8px beyond the reference. The final comparison confirms the icon alignment and tightened card bottom padding.

## Regression checks

- The production build passed. Chrome checked English and Arabic at 320, 375, 390, 427, 430, 768, and 1020px for overflow, action overlap, fixed navigation, and image proportions.
- All 17 palettes switched successfully. Dark mode persisted across the language switch. Axe reported zero violations for the tested English and Arabic Home shells.
- Verified tab switching without document requests, active states, keyboard focus, Back and Forward, scroll restoration, reduced motion, Hamdan navigation, and the JavaScript-disabled legacy fallback. The chat handoff was verified with a simulated SDK.
- Compared Work, About, Contact, and Hamdan content geometry in both languages with the baseline. All six 1440px desktop screenshots matched pixel-for-pixel. Canonicals, hreflang, metadata, structured data, and static hosting files matched the baseline.

## Modified files

| Files | Change |
| --- | --- |
| `mobile/style.css` | Home header, intro, card rhythm, and shared mobile navigation styling |
| `scripts/mobile_markup.py` | Localized Home markup, featured card variants, and contact actions |
| `mobile/controller.js` | Reused the chat handoff for the Home message link |
| `mobile/copy.json`, `mobile/icons.json` | Message label and existing Lucide phone and moon glyphs |
| `assets/img/social/linkedin.svg`, `assets/img/social/behance.svg`, `assets/img/social/bootstrap-icons-license.txt` | Local social icon assets and attribution |
| `design-qa.md` | Comparison and verification record |

## Remaining differences and test limits

- The approved social row includes LinkedIn and Behance. English action labels use the system sans-serif.
- Safe-area placement was checked through CSS and desktop browser viewports. Physical-device checks remain open.
- The inherited `gradual-blur.js` reference returned 404. The browser checks recorded zero uncaught JavaScript exceptions.

final result: passed

# Phone app uses the system font

The web app sets Geist Sans and Geist Mono; the phone app sets no font at all and renders in the platform face, San Francisco on iOS and Roboto on Android, with the platform monospace where the web would use Geist Mono. React Native has no text inheritance, so a custom face has to be named on every `Text`, one family per weight, and every screen ends up carrying the same class strings that all have to move together when the type changes. Shipping Geist on the phone was tried and reverted for that reason. The system font costs nothing to maintain, ships its own optical sizing and tracking, and is what people expect on the platform; brand consistency across web and phone was the trade-off, and it lost.

## Consequences

- Fonts are set only in `apps/web/src/styles.css`. `apps/mobile/global.css` never defines `--font-*`, and no mobile screen uses a `font-sans` or `font-mono` class.
- The DESIGN.md type scale (sizes, weights, tabular figures) still applies on the phone; only the face differs.
- Supersedes the "each app sets `--font-*` itself" line in ADR 0003.

# Latest everything, no compatibility layers

Prismark runs on the current release of everything (React 19, Vite 8, Tailwind 4, Expo 57, Node 24 with native TypeScript) and does not carry fallbacks for anything older. No polyfills, no light theme, no old-browser CSS, no Android below 13 or iOS below 26, no ORM compatibility shims. A ten-person team with its own devices does not need to pay the tax of supporting devices it does not have, and a young codebase is the cheapest place to stay current. When a dependency ships a breaking major, the answer is to upgrade, not to pin.

## Consequences

- Something will break on an upgrade now and then. That is accepted.
- New code that adds a fallback "just in case" is wrong by policy, not by taste.

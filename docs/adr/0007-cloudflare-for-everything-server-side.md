# Cloudflare for everything server side

The web app is TanStack Start on Cloudflare Workers, the database is D1 (SQLite), and file bytes live in R2. One vendor, one deploy, no servers to keep up, and a free tier that covers an agency of ten for a long time. The costs are known: D1 is a single SQLite database with its own limits, and Workers are not Node. The phone app is Expo for iOS and Android only; it has no web target, because the web app already is the web target.

## Consequences

- Schema decisions assume SQLite: text ULIDs, integer timestamps, no native booleans or enums.
- The wrangler compatibility date must match the installed workerd, not "today". A date in the future builds fine and fails local dev.

# better-auth on Workers and D1

Research for issue #6 (part of #3). Everything below was read on 2026-09-04 from the better-auth docs and the `v1.7.2` source tag, the Polar docs and adapter source, the Cloudflare docs, the Drizzle docs, and the Effect v4 source. Claims carry a source link; "not found" means the primary sources did not answer.

## Summary

1. The current release is better-auth **v1.7.2** (2026-08-26, npm `latest`); `@better-auth/expo` and `@better-auth/passkey` ship the same version. `@polar-sh/better-auth` is 1.8.4 on npm.
2. It runs on Workers: the Hono guide mounts `auth.handler(c.req.raw)` and asks for `nodejs_compat` (AsyncLocalStorage); compat dates from 2026-08-04 turn that on by default. `auth` is a module-scope constant in the guide, and Cloudflare's `import { env } from "cloudflare:workers"` makes `drizzle(env.DB, { schema })` legal at module scope; no per-request instance is required.
3. D1 has no interactive transactions, so `drizzleAdapter` keeps its default `transaction: false` and migrations go `npx auth@latest generate` -> `drizzle-kit generate` -> `wrangler d1 migrations apply`. Since 1.5 there is also a built-in path (`database: env.DB`) that uses `batch()` and supports `getMigrations` from inside a Worker.
4. The organization plugin gives `organization`, `member`, `invitation` (plus `activeOrganizationId` on `session`); workspace = organization, membership = member. Roles are strings on `member.role`; owner/admin/staff/client are declared with `createAccessControl` + `roles`. Project roles and the client's company are not modelled by the plugin and stay on Prismark tables.
5. Passwordless sign-in: email OTP and magic link are plugins with a `send*` callback and no built-in delivery; social OAuth is core config; passkeys are a plugin whose client is browser WebAuthn only. Email/password is opt-in and simply stays off.
6. The glossary's "code" is the email OTP plugin with `otpLength: 6`, `expiresIn: 600`, `allowedAttempts` and `storeOTP: "hashed"`; `disableSignUp: true` answers unknown emails with `success: true` and rejects the code with `INVALID_OTP`.
7. Sessions: `session.expiresIn` (default 7 d) and `updateAge` give sliding expiry; `advanced.crossSubDomainCookies.domain = "prismark.tech"` shares the cookie between app. and api.; `revokeSessions` is "sign out everywhere".
8. Expo: `@better-auth/expo` stores the session cookie in SecureStore and sends it as a `Cookie` header (not a bearer token); `baseURL` is a client option, so a client built after the user types a server address works; the server must trust the app scheme.
9. Polar: `polar({ client, createCustomerOnSignUp, use: [checkout, portal, usage, webhooks] })` creates a Polar customer per user (`externalId` = user id), adds no tables, and serves webhooks at `/api/auth/polar/webhooks`; self-hosted = leave the plugin out of `plugins`.
10. Effect v4 (npm `rc` 4.0.0-rc.112) wraps it as `class Auth extends Context.Service<Auth, Shape>()("Auth")` built with `Layer.effect`, each call `Effect.tryPromise({ try, catch })` into a tagged error. better-auth tests itself with Vitest on in-memory `node:sqlite`; integration tests on real D1 run under `@cloudflare/vitest-plugin` (Vitest >= 4.1) with `applyD1Migrations` in a setup file.

## Current release

- GitHub latest release: `v1.7.2`, published 2026-08-26 ([releases/tag/v1.7.2](https://github.com/better-auth/better-auth/releases/tag/v1.7.2)). npm dist-tags: `latest: 1.7.2`, `rc: 1.7.0-rc.6`, `beta: 1.7.0-beta.10` ([registry.npmjs.org/better-auth](https://registry.npmjs.org/better-auth)).
- `@better-auth/expo` latest 1.7.2, peer `better-auth ^1.7.2` ([registry](https://registry.npmjs.org/@better-auth%2Fexpo)); `@better-auth/passkey` 1.7.2.
- `@polar-sh/better-auth` latest 1.8.4, peers `better-auth ^1.4.12`, `@polar-sh/sdk ^0.47.0` ([registry](https://registry.npmjs.org/@polar-sh%2Fbetter-auth)); the adapter repo's `main` is at 1.9.0 ([package.json](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/package.json)).
- 1.7.0 headline changes that touch this ticket: Drizzle users must regenerate the schema for joins; accounts keyed on `(issuer, accountId)`; Expo `getCookie()` now returns a promise; SCIM decoupled from the organization plugin ([release v1.7.0](https://github.com/better-auth/better-auth/releases/tag/v1.7.0), [1.7 upgrade guide](https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/docs/guides/1-7-upgrade-guide.mdx)).

## Running on Workers with D1 through the Drizzle adapter

### Mounting and runtime flags

- Hono guide: `app.all("/api/auth/*", (c) => auth.handler(c.req.raw));`, with `auth` exported as a module-scope constant, and a Cloudflare Workers section: add `"compatibility_flags": ["nodejs_compat"]` (or `nodejs_als` if only AsyncLocalStorage is needed) ([integrations/hono](https://better-auth.com/docs/integrations/hono)).
- Cloudflare: for compatibility dates 2026-08-04 or later "Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default"; AsyncLocalStorage and Crypto are fully supported ([Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)).
- Why: `@better-auth/core` imports `AsyncLocalStorage` from `node:async_hooks` and, if missing, logs "[better-auth] If you are using Cloudflare Workers, please see: https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag" and throws in server code ([core/src/async_hooks/index.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/core/src/async_hooks/index.ts)). Issue #6613 was the 1.4 upgrade hitting exactly this ("No request state found ... runWithRequestState") ([#6613](https://github.com/better-auth/better-auth/issues/6613)).
- CORS with cookies: register `cors({ origin: "https://app.prismark.tech", credentials: true })` before the auth route, and put the same origin in `trustedOrigins`; the docs say "When `credentials` is enabled, configure an explicit CORS origin instead of `*`" ([integrations/hono](https://better-auth.com/docs/integrations/hono)).

### Module scope, bindings, and the instance

- Cloudflare: `import { env } from "cloudflare:workers"` makes bindings available in top-level scope; the example builds an API client at module scope from `env.API_KEY`. The caveat is "Workers do not allow I/O from outside a request context": environment variables, secrets and Durable Object stubs are usable at top level, but calls such as `env.KV.get()` are not ([Bindings: importing env as a global](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global)). No compatibility date or flag is stated for the import.
- Drizzle: `import { drizzle } from 'drizzle-orm/d1'; const db = drizzle(env.<BINDING_NAME>);` ([Drizzle: Cloudflare D1](https://orm.drizzle.team/docs/connect-cloudflare-d1)). Constructing the Drizzle instance is not I/O.
- better-auth constructs its context eagerly: `const authContext = initFn(options);` runs at `betterAuth()` time and the handler awaits the promise ([auth/base.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/auth/base.ts)). Init awaits `createTelemetry` (telemetry is "disabled by default" per [reference/telemetry](https://better-auth.com/docs/reference/telemetry)), `getTrustedOrigins`, `getTrustedProviders` and plugin init hooks ([context/create-context.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/context/create-context.ts)). I found no database query in that init path, so `export const auth = betterAuth({ database: drizzleAdapter(drizzle(env.DB, { schema }), { provider: "sqlite" }) })` at module scope is consistent with both the Hono guide and Cloudflare's rule. better-auth's own D1 example (1.5 blog) builds the instance inside `fetch`, but nothing in the docs or source says that is required.
- Old issue #1143 (Jan 2025, v1.1.10) reported that env was not reachable at module scope; that predates `cloudflare:workers` env and is closed ([#1143](https://github.com/better-auth/better-auth/issues/1143)).

### The adapter

- `drizzleAdapter(db, { provider: "sqlite" })`; `schema` maps model names to Drizzle tables, `usePlural` for plural table names ([adapters/drizzle](https://better-auth.com/docs/adapters/drizzle)).
- Config type at v1.7.2: `schema?`, `provider: "pg" | "mysql" | "sqlite"`, `usePlural?`, `debugLogs?`, `camelCase?`, `transaction?`, `schemaName?`. Transactions default off: `transaction: (config.transaction ?? false) ? (cb) => db.transaction(...)`. The adapter normalises D1's affected-row count: "Cloudflare D1 nests the affected-row count under `meta.changes`." ([drizzle-adapter.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/drizzle-adapter/src/drizzle-adapter.ts)); PR #10257 fixed `updateMany`/`deleteMany` on D1 ([drizzle-adapter CHANGELOG](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/drizzle-adapter/CHANGELOG.md)).
- Keep `transaction` off on D1. D1's own API: "Batched statements are SQL transactions" and `batch()` is the atomic primitive ([D1 Worker API](https://developers.cloudflare.com/d1/worker-api/d1-database/)); import docs say to strip `BEGIN TRANSACTION`/`COMMIT` ([Import and export data](https://developers.cloudflare.com/d1/best-practices/import-export-data/)); Drizzle's `db.transaction()` on D1 fails with "To execute a transaction, please use the state.storage.transaction() API instead of the SQL BEGIN TRANSACTION or SAVEPOINT statements" and the issue is still open ([drizzle-orm #2463](https://github.com/drizzle-team/drizzle-orm/issues/2463)).
- 1.7 drizzle change: joins moved to `advanced.database.joins`; Drizzle users "regenerate their schema (`npx auth@latest generate`) so it includes the required relations" ([release v1.7.0](https://github.com/better-auth/better-auth/releases/tag/v1.7.0)).

### Migrations

- Drizzle path: "The Better Auth CLI generates schemas with `npx auth@latest generate`, but drizzle-kit must be used for actual migrations" ([adapters/drizzle](https://better-auth.com/docs/adapters/drizzle)). The `migrate` command is "Limited to the built-in SQL database configuration and SQL-backed Drizzle or Prisma adapters" and cannot reach D1 because "Cloudflare D1 can only be queried through a Cloudflare Worker, so the CLI cannot access it directly" ([concepts/cli](https://better-auth.com/docs/concepts/cli), [concepts/database.mdx](https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/docs/concepts/database.mdx)).
- So: `npx auth@latest generate` writes the Drizzle schema, `drizzle-kit generate` writes SQL into the `migrations_dir` named in `wrangler.jsonc`, and `wrangler d1 migrations apply` records them in `d1_migrations` ([Drizzle: Cloudflare D1](https://orm.drizzle.team/docs/connect-cloudflare-d1), [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/)).
- The CLI can load an `auth.ts` that imports `cloudflare:workers`: "The CLI loads `auth.ts` with jiti, outside that runtime, so a config importing it would crash. It is aliased to an inert stub whose named exports mirror the real module so every import links." ([cli/src/utils/cloudflare-virtual-modules.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/cli/src/utils/cloudflare-virtual-modules.ts); fixed issue [#5178](https://github.com/better-auth/better-auth/issues/5178)). `env.DB` is undefined under the stub, so the config must tolerate that at generate time (open question below).

### The built-in D1 alternative

- 1.5: "Better Auth now natively supports Cloudflare D1 as a first-class database option. Pass your D1 binding directly — no custom adapter setup required." and "D1 does not support interactive transactions — Better Auth uses D1's `batch()` API for atomicity instead." ([1.5 blog](https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/blogs/1-5.mdx)).
- Detection is `"batch" in db && "exec" in db && "prepare" in db`, which builds `D1SqliteDialect` and sets `transaction = false` ([kysely-adapter/src/dialect.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/kysely-adapter/src/dialect.ts), [d1-sqlite-dialect.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/kysely-adapter/src/d1-sqlite-dialect.ts)).
- `getMigrations` from `better-auth/db/migration` "only works with the built-in Kysely adapter (SQLite/D1, PostgreSQL, MySQL, MSSQL). It does **not** work with Prisma or Drizzle ORM adapters"; the docs show a `/migrate` Worker route ([concepts/database](https://better-auth.com/docs/concepts/database)).
- Trade-off: the Drizzle adapter keeps one schema for auth and app tables; the built-in path gives in-Worker migrations and `batch()` atomicity for better-auth's multi-row writes without Drizzle in the loop.

### workerd gaps found

- AsyncLocalStorage needs `nodejs_compat` (above).
- Incoming request headers are immutable on Workers; the Expo server plugin has "Cloudflare Workers has immutable headers on incoming requests, so fall back to constructing a new Request." ([expo/src/index.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/expo/src/index.ts)).
- workerd rejects `redirect: "error"` on fetch; core uses manual mode for OAuth ([core/src/oauth2/reject-redirects.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/core/src/oauth2/reject-redirects.ts)).
- 1.7.0-beta.4/5 crashed at module evaluation on Workers (`createRequire(import.meta.url)`); a smoke test now fails the build if Wrangler output contains `createRequire` or `node:module` ([.postmortem/cloudflare-create-require-runtime.md](https://github.com/better-auth/better-auth/blob/v1.7.2/.postmortem/cloudflare-create-require-runtime.md)). AGENTS.md: "Must work across Node.js, Bun, Deno, and Cloudflare Workers."
- SCIM: "Cloudflare D1 does not support the interactive transactions required by the SCIM plugin." ([plugins/scim](https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/docs/plugins/scim/index.mdx)). Not needed here.
- D1 limits: 100 bound parameters per query, 1000 queries per invocation (paid), 100 KB statement, 10 GB database ([D1 limits](https://developers.cloudflare.com/d1/platform/limits/)).
- Email callbacks: "It is recommended to not await the email sending to avoid timing attacks. On serverless platforms, use `waitUntil` or similar to ensure the email is sent." ([email-otp/types.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/email-otp/types.ts)); `advanced.backgroundTasks.handler` accepts a `waitUntil` ([reference/options](https://better-auth.com/docs/reference/options)).

## The organization plugin as workspace and membership

### Tables

From [organization/schema.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/organization/schema.ts) and [plugins/organization](https://better-auth.com/docs/plugins/organization):

- `organization`: `id`, `name`, `slug` (unique), `logo`, `metadata`, `createdAt`, `updatedAt`.
- `member`: `id`, `organizationId`, `userId`, `role` (string, default `"member"`), `createdAt`.
- `invitation`: `id`, `organizationId`, `email`, `role`, `status` (default `"pending"`), `expiresAt`, `createdAt`, `inviterId`.
- `session` gains `activeOrganizationId` (and `activeTeamId` with teams).
- `organizationRole` only when `dynamicAccessControl.enabled`; `team` and `teamMember` (`teamId`, `userId`) only when `teams.enabled`.
- Core tables ([concepts/database](https://better-auth.com/docs/concepts/database)): `user` (`id`, `name`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`), `session` (`id`, `userId`, `token`, `expiresAt`, `ipAddress`, `userAgent`, ...), `account` (one row per auth method, keyed on `issuer`+`accountId`), `verification` (`id`, `identifier`, `value`, `expiresAt`).

### Roles

- Built-in roles `owner`, `admin`, `member`; `creatorRole` defaults to `"owner"`. "A user can have multiple roles. Multiple roles are stored as string separated by comma". Custom roles: `const ac = createAccessControl(statement); const staff = ac.newRole({...})` then `organization({ ac, roles: { owner, admin, staff, client } })`; checks via `auth.api.hasPermission` on the server and `authClient.organization.checkRolePermission` on the client ([plugins/organization](https://better-auth.com/docs/plugins/organization)). `dynamicAccessControl` stores roles in the database instead; not needed for four fixed roles.
- `allowUserToCreateOrganization` (boolean or function) and `organizationLimit` gate who creates workspaces; `membershipLimit` defaults to 100 ([plugins/organization](https://better-auth.com/docs/plugins/organization)).

### Invitations versus the glossary's invite

- `createInvitation({ email, role, organizationId, resend, teamId })` calls `sendInvitationEmail(data)` (you deliver it); expiry defaults to 48 h (`invitationExpiresIn`, seconds; source `60 * 60 * 48`). `acceptInvitation` requires a signed-in user whose email matches (`YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION`), and "The plugin does not auto-create user accounts; the invitee must already exist or sign up before accepting" ([plugins/organization](https://better-auth.com/docs/plugins/organization), [routes/crud-invites.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/organization/routes/crud-invites.ts)).
- The glossary says "an existing member creates every account" and sign up does not exist. Two server-only pieces make that work: the admin plugin's `auth.api.createUser({ email, name, role?, data? })` where `password` is optional ("If not provided, the user will be created without a credential account (useful for magic link or social login only users)") ([admin/routes.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/admin/routes.ts)), and the organization plugin's server-only `auth.api.addMember({ userId, role, organizationId })`, which "bypasses the standard invitation workflow entirely" ([plugins/organization](https://better-auth.com/docs/plugins/organization)). Invite = create the user, add the member, send the first code. The `invitation` table can stay unused, or record the invite for audit.

### Mapping to the glossary

| Glossary term | better-auth | Notes |
| --- | --- | --- |
| Workspace | `organization` | `slug` is unique in both. `base_currency`, `timezone`, counters are extra columns: `schema.organization.additionalFields` or a 1:1 Prismark table keyed by organization id. |
| User | `user` | `avatar_file_id`, `last_login_at` become `user.additionalFields`; `emailVerified` and `image` come for free. |
| Membership | `member` | `organizationId` + `userId` + `role`. `title`, `invited_by`, `preferences`, `removed_at` and `company_id` are not in the plugin; add them as member `additionalFields` if the schema option covers `member` (see open questions) or as a Prismark side table keyed by `member.id`. |
| Member | a `member` row | Clients included: they are members with the `client` role. |
| Role | `member.role` | Declare `owner`, `admin`, `staff`, `client` with `createAccessControl` and pass `roles`; do not use the default `member` role name. |
| Staff | `client`-less custom role | Permission statement decides what staff can do. |
| Client member | `member.role = "client"` + `company_id` | The company link is Prismark's (ADR 0006); the plugin has no concept of it. |
| Project role | none | `project_member` stays a Prismark table. Teams are org-scoped groups with no per-team role, not projects. |
| Sign up | disabled | `emailOTP({ disableSignUp: true })`, `magicLink({ disableSignUp: true })`, `allowUserToCreateOrganization: false` past the first owner. |
| Invite | `admin.createUser` + `organization.addMember` | Or `createInvitation` if the invitee should sign in first. |
| Sign in | `emailOTP` plugin | `sendVerificationOTP` with `type: "sign-in"`. |
| Code | `verification` row | Replaces `sign_in_attempt`; attempts are counted inside `value`. |
| Session | `session` | `token`, `expiresAt`, `ipAddress`, `userAgent`; `activeOrganizationId` is the current workspace. |

## Sign in methods with no passwords required

- Email and password is opt-in: "To enable email and password authentication, you need to set the `emailAndPassword.enabled` option to `true`" ([authentication/email-password](https://better-auth.com/docs/authentication/email-password)). Leave it out; the `account` table still exists for OAuth.
- **Email OTP** (plugin `emailOTP`, core package): `sendVerificationOTP({ email, otp, type }, ctx)` with `type` in `sign-in | email-verification | forget-password | change-email`; `otpLength` default 6; `expiresIn` default 300 s; `allowedAttempts` default 3; `storeOTP` default `"plain"` (also `"hashed"`, `"encrypted"`); `disableSignUp` default false; `rateLimit` default `{ window: 60, max: 3 }` ([email-otp/types.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/email-otp/types.ts), [plugins/email-otp](https://better-auth.com/docs/plugins/email-otp)). With `disableSignUp`, `send-verification-otp` for an unknown email returns `{ success: true }` without sending, and `sign-in/email-otp` for an unknown email throws `INVALID_OTP` ([email-otp/routes.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/email-otp/routes.ts)). Endpoints `POST /email-otp/send-verification-otp` and `POST /sign-in/email-otp`; client `authClient.emailOtp.sendVerificationOtp()` and `authClient.signIn.emailOtp()`. For the glossary: `otpLength: 6`, `expiresIn: 600`, `allowedAttempts: 5`, `storeOTP: "hashed"`, `disableSignUp: true`.
- **Magic link** (plugin `magicLink`): `sendMagicLink({ email, token, url, metadata }, ctx)`; `expiresIn` default 300 s; `disableSignUp`; rate limit default `{ window: 60, max: 5 }`; verify at `GET /magic-link/verify` ([plugins/magic-link](https://better-auth.com/docs/plugins/magic-link), [magic-link/index.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/magic-link/index.ts)). The glossary avoids "magic link"; keep the plugin off unless a decision changes.
- **Passkeys** (`@better-auth/passkey`): server options `rpID`, `rpName`, `origin`, `authenticatorSelection`; `registration.requireSession: false` with `resolveUser` allows passkey-first; adds a `passkey` table ([plugins/passkey](https://better-auth.com/docs/plugins/passkey)). The client imports `startRegistration`/`startAuthentication` from `@simplewebauthn/browser` and has no React Native branch ([passkey/src/client.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/passkey/src/client.ts)); issue #2235 "Passkeys do not work in expo apps" shows no resolution ([#2235](https://github.com/better-auth/better-auth/issues/2235)). Web only until proven otherwise.
- **OAuth**: `socialProviders: { google: { clientId, clientSecret } }` in core, no plugin; per-provider `disableSignUp` and `disableImplicitSignUp`; other providers through the `genericOAuth` plugin ([concepts/oauth](https://better-auth.com/docs/concepts/oauth), [plugins/generic-oauth](https://better-auth.com/docs/plugins/generic-oauth)).
- **Email delivery**: none is built in. Every method hands you a callback (`sendVerificationOTP`, `sendMagicLink`, `sendInvitationEmail`); the self-hoster's provider is app code behind those callbacks, run through `waitUntil` per the source comment above.

## Sessions

- Defaults: `expiresIn: 60 * 60 * 24 * 7`, `updateAge: 60 * 60 * 24`, `freshAge: 60 * 60 * 24`; "whenever the session is used and the `updateAge` is reached, the session expiration is updated to the current time plus the `expiresIn` value"; `disableSessionRefresh` turns that off ([concepts/session-management](https://better-auth.com/docs/concepts/session-management)). Thirty days sliding = `expiresIn: 60 * 60 * 24 * 30`.
- Cookies: names are `${prefix}.${name}` with prefix `better-auth`; `session_token`, `session_data`, `dont_remember`; "httpOnly and secure when the server is running in production mode", `useSecureCookies: true` forces it. Cross-subdomain: `advanced.crossSubDomainCookies: { enabled: true, domain: "prismark.tech" }`, with the warning "Only enable cross-subdomain cookies if it's necessary". The docs note Safari ITP blocks third-party cookies across different domains; a shared parent domain is the supported answer ([concepts/cookies](https://better-auth.com/docs/concepts/cookies)). app.prismark.tech and api.prismark.tech share `prismark.tech`, so the cookie set by api. is sent from app.; `trustedOrigins` must list `https://app.prismark.tech` and CORS must use `credentials: true` with that explicit origin.
- Sign out everywhere: `revokeSessions` ends all of the user's sessions, `revokeOtherSessions` all but the current, `revokeSession` one by token; server `auth.api.revokeSessions`, client `authClient.revokeSessions()` ([concepts/session-management](https://better-auth.com/docs/concepts/session-management)). Revoked sessions are deleted unless `preserveSessionInDatabase: true`, which is the switch if `session.revoked_at` from `packages/db/auth.md` is wanted. The multi-session plugin is for several accounts in one browser, not needed here.
- `cookieCache` (signed cookie, `strategy: compact | jwt | jwe`) cuts D1 reads per request; `secondaryStorage` (KV) can hold sessions, but KV I/O only inside a request ([concepts/database](https://better-auth.com/docs/concepts/database), [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/)).
- Self-hosted hosts: `baseURL` accepts `{ allowedHosts, fallback, protocol }` and derives the host from the request ([reference/options](https://better-auth.com/docs/reference/options), [1.5 blog](https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/blogs/1-5.mdx)).

## The Expo client

- Packages: `better-auth`, `@better-auth/expo`, `expo-secure-store`, `expo-network`; `expo-linking`, `expo-web-browser`, `expo-constants` for social providers ([integrations/expo](https://better-auth.com/docs/integrations/expo)). Peer ranges at 1.7.2: `expo-secure-store >=12.5.0`, `expo-network >=8.0.7`, `expo-constants >=17`, `expo-linking >=7`, `expo-web-browser >=14` ([expo/package.json](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/expo/package.json)). `apps/mobile` has `expo-constants` and `expo-linking` today and needs `expo-secure-store` and `expo-network`.
- Server: `plugins: [expo()]` and `trustedOrigins: ["prismark://", "prismark://*"]` from the app scheme; `exp://` wildcards only in development. The plugin turns the `expo-origin` header into `origin` and rewrites callback redirects into deep links with cookies as query parameters ([integrations/expo](https://better-auth.com/docs/integrations/expo), [expo/src/index.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/expo/src/index.ts)).
- Client: `createAuthClient({ baseURL, plugins: [expoClient({ scheme, storagePrefix, storage: SecureStore, cookiePrefix?, disableCache? })] })`. Sessions are cookies, not bearer tokens: the `Set-Cookie` from the server is saved in SecureStore under `${storagePrefix}_cookie` (colons replaced, chunked above 1800 characters) and replayed as a `Cookie` header on every request, alongside `expo-origin` ([expo/src/client.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/expo/src/client.ts)). Authenticated calls to other routes: `const cookies = await authClient.getCookie(); fetch(url, { headers: { Cookie: cookies }, credentials: "omit" })`; since 1.7 `getCookie()` is async ([integrations/expo](https://better-auth.com/docs/integrations/expo), [1.7 upgrade guide](https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/docs/guides/1-7-upgrade-guide.mdx)). The bearer plugin exists for clients that cannot use cookies (`set-auth-token` header, `Authorization: Bearer`) but the Expo client does not need it ([plugins/bearer](https://better-auth.com/docs/plugins/bearer)).
- User-supplied server address: the docs only show a static `baseURL` and "do not indicate runtime modification" ([integrations/expo](https://better-auth.com/docs/integrations/expo), [concepts/client](https://better-auth.com/docs/concepts/client)). In the source the client's `init` hook resolves each request with `new URL(url, options?.baseURL)`, so the address is just an option ([expo/src/client.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/expo/src/client.ts)). Read the address from storage, then build the client; the self-hosted server needs the app scheme in its `trustedOrigins` regardless of host.
- Expo SDK 53+ needs no Metro config; on native, `signIn.social` does not navigate ([integrations/expo](https://better-auth.com/docs/integrations/expo)). Expo 57 in `apps/mobile` is above that.

## The Polar plugin

- Install `better-auth @polar-sh/better-auth @polar-sh/sdk`. Server: `const polarClient = new Polar({ accessToken, server: "sandbox" | "production" })`, then `polar({ client: polarClient, createCustomerOnSignUp: true, use: [checkout({ products, successUrl, authenticatedUsersOnly }), portal(), usage(), webhooks({ secret, onPayload, onOrderPaid, onCustomerStateChanged, ... })] })`; client `polarClient()` in the auth client plugins ([Polar: Better Auth](https://polar.sh/docs/integrate/sdk/adapters/better-auth), [plugins/polar](https://better-auth.com/docs/plugins/polar)).
- What it manages: customers ("automatically create a new Polar Customer when a new User is added in the BetterAuth database", "All new customers are created with an associated `externalId`, i.e. the ID of your User in the Database"); checkouts (`authClient.checkout()`); the customer portal and state (`authClient.customer.portal()`, `.state()`, `.benefits.list()`, `.orders.list()`, `.subscriptions.list()`); usage meters; webhooks at `/api/auth/polar/webhooks` verified with `POLAR_WEBHOOK_SECRET` ([Polar docs](https://polar.sh/docs/integrate/sdk/adapters/better-auth)).
- Implementation: customer creation is a `databaseHooks.user.create.after` hook; sub-plugins are called with `(client, options)` ([server.ts](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/server.ts), [types.ts](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/types.ts)). No database tables: none documented and none in the source. Organizations: checkout `referenceId` can be the organization id to track purchases per organization ([Polar docs](https://polar.sh/docs/integrate/sdk/adapters/better-auth)); `experimental_organizationSync` "Mirror Better Auth organizations to Polar team customers ... Organization support is disabled when omitted" ([types.ts](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/types.ts)).
- Runtime: `@polar-sh/sdk` wraps the native Fetch API ([polar-js README](https://github.com/polarsource/polar-js/blob/main/README.md)); Polar's docs list a Cloudflare Workers example.
- Self-hosted: `client` is a required field of `PolarOptions`, and customer creation lives in a plugin hook, so "billing off" is the plugin absent from `plugins`. The map's boot-time question becomes `plugins: [..., ...(env.POLAR_ACCESS_TOKEN ? [polar({...})] : [])]`; the web client adds `polarClient()` only when the instance is hosted (open question on typing below). Sandbox and production tokens and products are separate ([Polar docs](https://polar.sh/docs/integrate/sdk/adapters/better-auth)).

## Wrapping it in Effect

- Versions: npm `effect` dist-tags are `latest 3.22.1`, `beta 4.0.0-beta.107`, `rc 4.0.0-rc.112` ([registry](https://registry.npmjs.org/effect)); the `effect-smol` repo is archived and "Effect V4 has moved to the canonical Effect-TS/effect repository" ([effect-smol README](https://github.com/Effect-TS/effect-smol)). The map says "Effect v4 beta"; the `rc` line is newer.
- Services: "In v4, all of these have been replaced by `Context.Service`": `class Database extends Context.Service<Database, { readonly query: (sql: string) => string }>()("Database") {}`; with a constructor, `Context.Service<Logger>()("Logger", { make: Effect.gen(...) })` and `static readonly layer = Layer.effect(this, this.make).pipe(Layer.provide(Config.layer))`; the `dependencies` option is gone; prefer `yield*` over `.use` ([migration/services.md](https://github.com/Effect-TS/effect/blob/main/migration/services.md)). `Layer.effect(service, effect)` "create[s] a `Layer` from an `Effect` that produces a service" ([Layer.ts](https://github.com/Effect-TS/effect/blob/main/packages/effect/src/Layer.ts)).
- Promises: `Effect.tryPromise({ try, catch })` maps rejections to a typed error (`class TodoFetchError extends Data.TaggedError("TodoFetchError")<{ readonly cause: unknown }> {}`); the thunk gets an `AbortSignal` tied to interruption; a throwing `catch` becomes a defect ([Effect.ts](https://github.com/Effect-TS/effect/blob/main/packages/effect/src/Effect.ts)).
- Boundary shape for `apps/server`: one `Auth` service whose shape is the handful of calls the app makes (`getSession(headers)`, `createUser`, `addMember`, `revokeSessions`, `handler(request)`), each `Effect.tryPromise` over `auth.api.*` with `catch` turning better-auth's `APIError` (its routes throw `APIError.from("BAD_REQUEST", ...)`, see [email-otp/routes.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/email-otp/routes.ts)) into tagged errors; `Layer.effect(Auth, Effect.sync(() => make(betterAuth({...}))))` provided once per Worker; `auth.handler` mounted by the transport. Nothing better-auth does needs a scope or finalizer.

## Its own test story and what integration tests need

- better-auth: Vitest, `pnpm test`, single suites with `pnpm vitest packages/better-auth/src/plugins/organization --run`; "Adapter tests require Docker containers" ([CONTRIBUTING.md](https://github.com/better-auth/better-auth/blob/v1.7.2/CONTRIBUTING.md)). `getTestInstance(options, { testWith: "sqlite" | "postgres" | "mongodb" | "mysql", transaction, disableTestUser, ... })` defaults to `new DatabaseSync(":memory:")` from `node:sqlite`, runs `getMigrations(...).runMigrations()`, and returns `auth`, `client`, `signInWithTestUser`, `db`, `cookieSetter`, `sessionSetter` ([test-utils/test-instance.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/test-utils/test-instance.ts)). The D1 dialect is unit-tested with a fake `{ batch, exec, prepare }` object ([dialect.test.ts](https://github.com/better-auth/better-auth/blob/v1.7.2/packages/kysely-adapter/src/dialect.test.ts)); no real-D1 test was found in the repo.
- `testUtils` plugin (`better-auth/plugins`): factories without writes, `saveUser`/`saveOrganization`, `login` (session, headers, cookies, token), `getAuthHeaders`, `getCookies({ userId, domain })` for Playwright, `captureOTP: true` to read codes in tests ([plugins/test-utils](https://better-auth.com/docs/plugins/test-utils), [1.5 blog](https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/blogs/1-5.mdx)).
- Real D1 in tests: `@cloudflare/vitest-plugin` (npm 1.1.4) "requires Vitest 4.1 or later", config `plugins: [cloudflareTest({ wrangler: { configPath: "./wrangler.jsonc" } })]`, tests run in workerd via Miniflare with "isolated per-test-file storage" ([write your first test](https://developers.cloudflare.com/workers/testing/vitest-integration/get-started/write-your-first-test/), [vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/), [isolation](https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/)). Migrations: `readD1Migrations(migrationsPath)` in the config, `miniflare.bindings: { TEST_MIGRATIONS: migrations }`, and a setup file with `await applyD1Migrations(env.DATABASE, env.TEST_MIGRATIONS);` ([test APIs](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/), [D1 fixture](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/d1)). `@cloudflare/vitest-pool-workers` (0.22.0) is the legacy package with a migration path.
- Plan that follows: unit tests on the memory `node:sqlite` instance (fast, no bindings); integration tests in the Workers pool against Miniflare's D1 with the Drizzle migrations applied in setup and `testUtils` for sessions and captured codes; Playwright gets cookies from `getCookies`.

## Open questions

- Drizzle adapter or the built-in D1 dialect: the map chose Drizzle; the built-in path gives `getMigrations` in-Worker and `batch()` atomicity for better-auth's own writes. Decide in #13 with the storage prototype.
- `npx auth@latest generate` stubs `cloudflare:workers`, so `env.DB` is undefined under the CLI; the `auth.ts` layout that survives both the CLI and workerd is untested.
- Whether `schema.member.additionalFields` (for `company_id`, `title`, `invited_by`, `removed_at`) is supported: the docs show `additionalFields` on `organization`; `schema.ts` types `member` with the same `InferSchema` machinery, but no doc sentence confirms it.
- The per-workspace Durable Object storage idea cannot hold better-auth's tables (`user` and `session` are global); auth stays in D1 whichever way the prototype goes.
- Effect: build on the `rc` line or the `beta` line; the map's "v4 beta" wording predates `rc`.
- Client plugin typing when `polar()` is conditional: `polarClient()` on the web client assumes the endpoints exist; a self-hosted instance returns 404 for them.
- Passkeys on native: not found in better-auth's own packages.
- Email provider interface for self-hosters: still unspecified (map).
- Timing: nothing measured for the Workers pool against the ten-second budget.

## Sources

- https://github.com/better-auth/better-auth/releases/tag/v1.7.2
- https://github.com/better-auth/better-auth/releases/tag/v1.7.0
- https://registry.npmjs.org/better-auth
- https://registry.npmjs.org/@better-auth%2Fexpo
- https://registry.npmjs.org/@polar-sh%2Fbetter-auth
- https://registry.npmjs.org/effect
- https://better-auth.com/docs/integrations/hono
- https://better-auth.com/docs/integrations/expo
- https://better-auth.com/docs/adapters/drizzle
- https://better-auth.com/docs/concepts/database
- https://better-auth.com/docs/concepts/cli
- https://better-auth.com/docs/concepts/session-management
- https://better-auth.com/docs/concepts/cookies
- https://better-auth.com/docs/concepts/client
- https://better-auth.com/docs/concepts/oauth
- https://better-auth.com/docs/authentication/email-password
- https://better-auth.com/docs/reference/options
- https://better-auth.com/docs/reference/telemetry
- https://better-auth.com/docs/plugins/organization
- https://better-auth.com/docs/plugins/admin
- https://better-auth.com/docs/plugins/email-otp
- https://better-auth.com/docs/plugins/magic-link
- https://better-auth.com/docs/plugins/passkey
- https://better-auth.com/docs/plugins/bearer
- https://better-auth.com/docs/plugins/generic-oauth
- https://better-auth.com/docs/plugins/polar
- https://better-auth.com/docs/plugins/test-utils
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/drizzle-adapter/src/drizzle-adapter.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/drizzle-adapter/CHANGELOG.md
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/kysely-adapter/src/dialect.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/kysely-adapter/src/d1-sqlite-dialect.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/kysely-adapter/src/dialect.test.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/core/src/async_hooks/index.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/core/src/oauth2/reject-redirects.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/cli/src/utils/cloudflare-virtual-modules.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/expo/src/index.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/expo/src/client.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/expo/package.json
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/passkey/src/client.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/auth/base.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/context/create-context.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/email-otp/types.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/email-otp/routes.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/magic-link/index.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/admin/routes.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/organization/schema.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/plugins/organization/routes/crud-invites.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/packages/better-auth/src/test-utils/test-instance.ts
- https://github.com/better-auth/better-auth/blob/v1.7.2/CONTRIBUTING.md
- https://github.com/better-auth/better-auth/blob/v1.7.2/.postmortem/cloudflare-create-require-runtime.md
- https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/blogs/1-5.mdx
- https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/docs/concepts/database.mdx
- https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/docs/guides/1-7-upgrade-guide.mdx
- https://github.com/better-auth/better-auth/blob/v1.7.2/docs/content/docs/plugins/scim/index.mdx
- https://github.com/better-auth/better-auth/issues/1143
- https://github.com/better-auth/better-auth/issues/2235
- https://github.com/better-auth/better-auth/issues/5178
- https://github.com/better-auth/better-auth/issues/6613
- https://polar.sh/docs/integrate/sdk/adapters/better-auth
- https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/server.ts
- https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/types.ts
- https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/package.json
- https://github.com/polarsource/polar-js/blob/main/README.md
- https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global
- https://developers.cloudflare.com/workers/runtime-apis/nodejs/
- https://developers.cloudflare.com/d1/worker-api/d1-database/
- https://developers.cloudflare.com/d1/best-practices/import-export-data/
- https://developers.cloudflare.com/d1/reference/migrations/
- https://developers.cloudflare.com/d1/platform/limits/
- https://developers.cloudflare.com/workers/testing/vitest-integration/
- https://developers.cloudflare.com/workers/testing/vitest-integration/get-started/write-your-first-test/
- https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/
- https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/
- https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/d1
- https://orm.drizzle.team/docs/connect-cloudflare-d1
- https://github.com/drizzle-team/drizzle-orm/issues/2463
- https://github.com/Effect-TS/effect-smol
- https://github.com/Effect-TS/effect/blob/main/migration/services.md
- https://github.com/Effect-TS/effect/blob/main/packages/effect/src/Effect.ts
- https://github.com/Effect-TS/effect/blob/main/packages/effect/src/Layer.ts

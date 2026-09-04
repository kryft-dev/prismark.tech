# Testing on Workers: Vitest pool, Playwright, Maestro

Research for issue #8 (part of the walking-skeleton map, issue #3). Every claim below is sourced from the primary doc fetched during this research pass; a claim with no primary source is marked "not found."

## Summary

1. Cloudflare's Workers Vitest integration was renamed: `@cloudflare/vitest-pool-workers` is now `@cloudflare/vitest-plugin` as of its v1/v0.13.0 rearchitecture, built as a Vite plugin (`cloudflareTest()`) instead of a custom pool.
2. That plugin requires **Vitest ^4.1.0**, and Vitest 4.1 itself added Vite 8 support and now reuses the project's installed Vite instead of bundling its own — a good fit for `apps/web`'s Vite 8.
3. Storage isolation is **per test file**, not per test: each file gets fresh D1/R2/KV/Durable Object storage; writes in one file never leak into another. `--max-workers=1 --no-isolate` shares storage across files when integration tests need it.
4. `import { env } from "cloudflare:workers"` is the same, module-scope binding import the repo's Workers code already uses — the docs describe it as the way handlers and tests both reach bindings, so no per-request threading or lazy-singleton workaround is needed for tests either.
5. D1 migrations are applied in tests via `readD1Migrations()` (Node-side) + `applyD1Migrations()` (worker-side, from `cloudflare:test`), not by hand-running `wrangler d1 migrations apply`.
6. Durable Objects are tested with `runInDurableObject()` and `listDurableObjectIds()` from `cloudflare:test`; DO + WebSockets is unsupported under per-file storage isolation and needs `--max-workers=1 --no-isolate`.
7. Coverage inside the Workers pool must be Istanbul-instrumented — V8 native coverage isn't supported there.
8. Vitest **projects** (`test.projects` in the root config) let a workerd-pool project and a plain Node project coexist and run from one `vitest` invocation, with `--project` to run either alone.
9. Playwright's `webServer` array can boot both the Worker API and the web app before tests run, with `reuseExistingServer` for local dev; sharding (`--shard=x/y`) plus `fullyParallel: true` and a merge-reports job is the documented fast-CI shape; Playwright's own CI guidance is to **not** cache browser binaries.
10. Expo's documented unit-test stack is Jest + `jest-expo` + React Native Testing Library, not Vitest — RN's native-module mocking is tied to Jest's preset. Maestro's CI story is built around Maestro Cloud's GitHub Action rather than a local-simulator recipe. Turborepo's `--affected` flag (default `--filter=...[main...HEAD]`) is the documented way to run tasks (including `test`) only for changed packages and their dependents, with `TURBO_SCM_BASE`/`TURBO_SCM_HEAD` to override the comparison.

## Cloudflare's Vitest pool (now `@cloudflare/vitest-plugin`)

**Rename, not a new tool.** "Version 1 of the Workers Vitest integration is published as `@cloudflare/vitest-plugin`. The package was formerly named `@cloudflare/vitest-pool-workers`... The Vitest configuration API is unchanged. Existing projects must update the dependency name, package imports, and TypeScript `types` entries," with a codemod: `npx @cloudflare/codemods vitest:pool-workers-to-vitest-plugin`. (developers.cloudflare.com/changelog/post/2026-08-19-vitest-plugin/)

**Version requirements.** The Vitest-3→4 migration guide: install "Vitest 4 and the latest version of `@cloudflare/vitest-pool-workers`" — `@cloudflare/vitest-pool-workers` v0.13.0+ supports Vitest 4 (v0.12.x was the last release on Vitest 3.x), and the architecture moved from `defineWorkersProject`/`defineWorkersConfig` (removed) to a `cloudflareTest()` Vite plugin; `isolatedStorage` and `singleWorker` pool options were removed because storage isolation now defaults to per-file. (developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-vitest-3-to-vitest-4/)

**Get-started config.** Minimum: compatibility date `2022-10-31`+, ES modules format, `vitest@^4.1.0` and `@cloudflare/vitest-plugin`. Config shape:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [cloudflareTest({ wrangler: { configPath: "./wrangler.jsonc" } })],
});
```

`cloudflareTest()` inherits compatibility date/bindings from the Wrangler config; a `miniflare` key overrides/adds test-only resources (e.g. an extra KV namespace) and takes precedence. Types come from running `wrangler types` and a `test/tsconfig.json` extending the root config with `"types": ["@cloudflare/vitest-plugin/types"]`, which enables both `cloudflare:test` and `cloudflare:workers` module types. (developers.cloudflare.com/workers/testing/vitest-integration/get-started/)

**Vitest 4.1 / Vite 8.** "This release adds support for the new Vite 8 version," and "Vitest now uses the installed `vite` version instead of downloading a separate dependency, if possible" — which "makes issues like type inconsistencies in your config file obsolete," relevant for a monorepo where `apps/web` already pins `vite@^8.0.0`. (main.vitest.dev/blog/vitest-4-1)

**Isolated storage per test.** "Storage isolation is per test file. Each test file gets its own storage environment, and any writes to storage during a test file are not visible to other test files." All tests **within** one file share that file's storage; files run isolated and concurrent by default. `--max-workers=1 --no-isolate` shares storage across files, which the docs call out as the fix for the one DO+WebSockets combination that isn't supported under per-file isolation. (developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/)

**`cloudflare:workers` env inside the pool.** The test-APIs docs describe `env` as coming from `cloudflare:workers` — "Provides `env` (bindings) and `exports` (access to the main Worker)" — and explicitly say the docs "only mention `import { env } from \"cloudflare:workers\"`, not from `cloudflare:test`" for bindings access; `env` is described as usable "as the second argument passed to ES modules format exported handlers" and for direct access to configured bindings. Combined with the isolation doc above, `cloudflare:workers`'s `env` resolves against each test file's own isolated storage — the same import path this repo's non-test code already standardizes on (docs/agents/cloudflare.md), so tests need no separate binding-access pattern. (developers.cloudflare.com/workers/testing/vitest-integration/test-apis/)

**D1 migrations in tests.** `applyD1Migrations()` "applies all un-applied D1 migrations stored in the migrations array to database db"; the migrations array itself comes from `readD1Migrations()`, called Node-side (in `cloudflare:vitest-plugin/config` per the fetched summary) and passed into the test file, which then calls `applyD1Migrations()` from `cloudflare:test` before assertions run. (developers.cloudflare.com/workers/testing/vitest-integration/test-apis/)

**Durable Objects in tests.** `runInDurableObject()` executes a callback "inside the Durable Object that corresponds to the provided stub," for calling methods or seeding state directly; `listDurableObjectIds()` "gets the IDs of all objects that have been created in the namespace." (same page)

**Known issues / limits.**
- Native V8 code coverage is unsupported in the pool; use Istanbul-instrumented coverage instead.
- Vitest fake timers don't reach the KV/R2/cache simulators, so you can't time-travel through simulated expirations.
- Dynamic `import()` fails inside the default-exported handler and inside DO event handlers — use static top-level imports.
- WebSockets + Durable Objects doesn't work under per-file storage isolation; workaround is `--max-workers=1 --no-isolate`.
- Complex builds using virtual modules can produce incomplete `ctx.exports` inference — fix with the `additionalExports` config option.
- CJS/ESM interop issues (`Cannot use require() to import an ES Module`) are addressed via the `deps.optimizer` option.
(developers.cloudflare.com/workers/testing/vitest-integration/known-issues/)

**Speed.** The integration's overview page states it runs "fully-locally" using Miniflare/workerd and "Leverages Vitest's hot-module reloading for near instant reruns," featuring "a fast watch mode." No numeric cold-run benchmark is published on the fetched pages — "not found" for a specific cold-start figure against the map's under-10-seconds-locally bar; the architecture (in-process workerd, per-file isolated storage, HMR reruns) is what the docs point to as the speed mechanism rather than a stated number. (developers.cloudflare.com/workers/testing/vitest-integration/)

## Plain Vitest for non-Workers unit tests, and coexisting configs

Vitest's **projects** feature (`test.projects` in a root `defineConfig`) runs multiple named test configurations from a single `vitest` invocation — e.g. glob-based `projects: ['packages/*']` or a mix of directories, config files, and inline objects, each with its own environment, plugins, resolve aliases and pool. `vitest --project unit --project e2e` runs a subset by name; inline projects can `extends` the root config to avoid duplicating shared settings. This is the documented mechanism for a `apps/server` project running the `cloudflareTest()` pool alongside a plain-Node project for logic that doesn't touch workerd. (vitest.dev/guide/workspace)

## Playwright: local server, seeding, fast CI

**`webServer`.** Accepts an array of server configs so Playwright can boot more than one process (e.g. the API worker and the web app) before the test run, each with its own `command`, `url` and optional `name`. Readiness is detected either by `url` returning a 2xx/3xx/400–403 status, or by a `wait` regex matched against process output (both can be set; either satisfies readiness). `reuseExistingServer` (commonly `!process.env.CI`) reuses an already-running server locally but fails fast on a port collision in CI. `timeout` (default 60s) bounds how long Playwright waits for readiness; `gracefulShutdown` sends `SIGTERM` before a hard kill. (playwright.dev/docs/test-webserver)

**Sharding.** `npx playwright test --shard=x/y` splits the suite across `y` CI jobs; with `fullyParallel: true` individual tests balance evenly across shards (docs: "recommended... especially in CI environments"), without it the split is per-file and can be uneven. Each shard should use the `blob` reporter in CI; artifacts are uploaded per shard and combined with `npx playwright merge-reports --reporter html ./all-blob-reports` in a dependent merge job. The documented GitHub Actions shape is a matrix over `shardIndex`/`shardTotal`. (playwright.dev/docs/test-sharding)

**CI guidance.** Playwright's own CI doc recommends **against** caching browser binaries: "Caching browser binaries is not recommended, since the amount of time it takes to restore the cache is comparable to the time it takes to download the binaries," and Linux OS dependencies aren't cacheable at all. If caching is still done, key it on a hash of the Playwright version. For speed, the doc recommends `workers: 1` in CI (stability/reproducibility) and to get parallelism from sharding across jobs instead, plus Playwright's pre-built Docker images to skip OS-dependency installation. (playwright.dev/docs/ci)

**Seeding a user:** not found — no fetched Playwright page describes a specific "seed a user" API; that's an application-level `webServer`/global-setup concern (e.g. a setup project or a request to the API before tests), not something Playwright itself prescribes.

## Expo: unit tests and Maestro end to end

**Unit tests.** Expo's unit-testing doc recommends **Jest** + **jest-expo** ("a Jest preset that mocks the native part of the Expo SDK and handles most of the configuration required for your Expo project") together with `@testing-library/react-native`, which "replaces the deprecated `react-test-renderer` because `react-test-renderer` does not support React 19 and above." TypeScript projects add `"jest"` to `tsconfig.json`'s `types` array. The fetched page does not mention Vitest at all. (docs.expo.dev/develop/unit-testing/)

**Vitest vs. Jest for React Native, independently confirmed.** Community sourcing (not a primary Cloudflare/Expo doc, flagged as such) states RN's testing infra is "deeply integrated with Jest through `@react-native/jest-preset`, native module mocking, and platform-specific test configurations," and that "Vitest does not support React Native." Treat this as corroborating, not primary, evidence — Expo's own doc above is the primary source and is sufficient on its own to settle "Jest, not Vitest" for `apps/mobile`.

**Maestro CI.** Maestro's own CI/CD doc centers on an "Official GitHub Action for Maestro Cloud" — a hosted device farm — triggered on push/PR, passing env vars and exposing outputs like a console URL. It also lists generic CI-platform support (implying a self-hosted-simulator path is possible) but the documented, first-class path is Maestro Cloud rather than a bring-your-own-simulator GitHub Actions recipe. No numeric speed/cost comparison between cloud and local simulators was found on the fetched pages. (docs.maestro.dev/maestro-cloud/ci-cd-integration.md) A dedicated "what is Maestro" / "how Maestro works" primary explainer was requested but 404'd at the guessed URL — not found at `docs.maestro.dev/getting-started/what-is-maestro`; the correct paths per the site's own sitemap are `get-started/what-is-maestro.md` and `get-started/how-maestro-works.md`, not fetched in this pass.

## Turborepo: caching and affected filtering

**Caching a `test` task.** Turborepo hashes task inputs into a global hash and a task hash; matching hashes on both restore cached results instead of re-running. `outputs` in `turbo.json` declares what gets cached — "If you do not declare file outputs for a task, Turborepo will not cache them" — relevant if `test` should cache a coverage or JUnit report. `inputs` (defaults to all source-controlled files in the package) determines what invalidates the cache; changing a test file invalidates it. Terminal output/logs are also replayed from cache on a hit. (turborepo.dev/docs/crafting-your-repository/caching) The repo's current `turbo.json` has no `test` task yet — only `build`, `typecheck`, `dev`, `deploy`, `render`, `lint`, `//#fmt:check`.

**Affected filtering.** `turbo run test --affected` is, by default, "equivalent to `--filter=...[main...HEAD]`" — it compares `main` to `HEAD` via git and runs the task for any package with a changed file, plus their dependents. `TURBO_SCM_BASE` / `TURBO_SCM_HEAD` env vars override the comparison points (useful for a non-`main` default branch or a specific PR base). The docs flag that shallow git checkouts can defeat the comparison and mark everything as changed — CI needs enough git history (`fetch-depth: 0` equivalent) for `--affected` to be meaningful. (turborepo.dev/docs/reference/run#--affected)

## Effect v4 test helpers

`@effect/vitest`'s README on the `main` branch (Effect v4) documents:
- `it.effect` — "Runs a scoped test with test services such as `TestClock` and `TestConsole`," with an automatically provided fresh `Scope` closed at test end.
- `it.live` — runs a scoped test against the live (non-simulated) Effect environment.
- `it.layer` — shares one `Layer` across multiple tests.
- `it.prop` — property tests using Effect `Schema` and `Arbitrary` values.
- `it.flakyTest` — retries an Effect that occasionally fails until it succeeds or a timeout is hit.

Install: `npm install -D vitest @effect/vitest@rc`, requiring `vitest ^4.1.0` — the same Vitest major the Cloudflare plugin requires, so one Vitest install serves both. Tests can use `.skip`/`.only`/`.fails`; default per-test timeout is 5000ms. (github.com/Effect-TS/effect/blob/main/packages/vitest/README.md)

## Proposed layout of test configs across the monorepo

Given the current tree (`apps/web`, `apps/mobile`, `packages/config|db|design|theme`; `apps/server` not yet scaffolded — map issue #3 lists it as future work) and the sourced facts above:

- **`apps/server`** (future, per map): one root `vitest.config.ts` using `test.projects` to run two projects from one `vitest` invocation:
  - a `worker` project using `cloudflareTest()` from `@cloudflare/vitest-plugin` (`vitest ^4.1.0`), reading bindings through `cloudflare:workers`'s `env` exactly as production code does, with `readD1Migrations()`/`applyD1Migrations()` run in a `beforeAll`/setup file per the D1-migrations doc above;
  - a `unit` project on the default Node pool for pure logic (Effect services, schema validation, etc.) that doesn't need workerd, using `@effect/vitest`'s `it.effect`/`it.layer` helpers.
  - `--project worker` / `--project unit` lets CI or a dev run either alone; `vitest` with no `--project` runs both.
- **`apps/web`**: a `vitest.config.ts` (plain Node/jsdom project, no `cloudflareTest()`) for component/unit tests, since it only calls the server contract over HTTP rather than reading Worker bindings directly; a separate `playwright.config.ts` with a `webServer` array booting `apps/server`'s `wrangler dev`/local worker and `apps/web`'s `vite dev`/`vite preview` together, sharded in CI per the Playwright doc above.
- **`apps/mobile`**: `jest-expo` + `@testing-library/react-native` for unit/component tests (not Vitest, per Expo's own doc); a `.maestro/` flow directory plus the Maestro Cloud GitHub Action for end to end, deferred until the phone app has more than sign-in per map issue #3's "Not yet specified" list.
- **`turbo.json`**: add a `test` task (`inputs`/`outputs` per the caching doc above, e.g. `outputs: ["coverage/**"]` if coverage is collected) so `turbo run test --affected` only re-runs suites in packages whose files changed since `main`, with CI using `TURBO_SCM_BASE`/full git history so the comparison is valid; Playwright's e2e suite likely wants its own `test:e2e` task (uncached, since it depends on live servers) separate from the cacheable unit/integration `test` task.

## Open questions

- No fetched source gives a numeric cold-run time for the Workers Vitest pool, so whether it clears the map's "under ten seconds locally" bar for unit+integration together is unverified — needs a local timing spike once `apps/server` exists.
- Maestro's local-simulator-in-GitHub-Actions path (vs. Maestro Cloud) wasn't found in the pages fetched this pass; the sitemap points to `get-started/how-maestro-works.md`, not yet fetched, and to Bitrise/Bitbucket/CircleCI/generic-CI integration pages not yet fetched.
- Whether `readD1Migrations()` lives at `@cloudflare/vitest-plugin/config` vs. `@cloudflare/vitest-plugin` root wasn't independently re-verified beyond one WebFetch summary — worth confirming against the package's actual type exports once it's installed.
- "Seeding a user" for Playwright e2e has no Playwright-side answer; needs an application-level decision (a setup project hitting the server's sign-up route, or a DB-seed script) once `apps/server`'s better-auth integration exists.
- Whether Istanbul-instrumented coverage (required inside the Workers pool, since V8 native coverage isn't supported there) is fast enough to run on every local `test` invocation, or should be CI-only, is unresolved.

## Sources

- https://developers.cloudflare.com/workers/testing/vitest-integration/
- https://developers.cloudflare.com/workers/testing/vitest-integration/get-started/
- https://developers.cloudflare.com/workers/testing/vitest-integration/known-issues/
- https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/
- https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/
- https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-vitest-3-to-vitest-4/
- https://developers.cloudflare.com/changelog/post/2026-08-19-vitest-plugin/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global
- https://main.vitest.dev/blog/vitest-4-1
- https://vitest.dev/guide/workspace
- https://playwright.dev/docs/test-webserver
- https://playwright.dev/docs/test-sharding
- https://playwright.dev/docs/ci
- https://docs.expo.dev/develop/unit-testing/
- https://docs.maestro.dev/maestro-cloud/ci-cd-integration.md
- https://docs.maestro.dev/sitemap.md
- https://turborepo.dev/docs/crafting-your-repository/caching
- https://turborepo.dev/docs/reference/run#--affected
- https://github.com/Effect-TS/effect/blob/main/packages/vitest/README.md
- Repo: `docs/agents/cloudflare.md`, `package.json`, `turbo.json`, `apps/web/package.json`, `apps/mobile/package.json`

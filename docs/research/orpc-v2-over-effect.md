# oRPC v2 in front of an Effect server

Research for issue #5, part of the walking-skeleton map (#3). Every claim below was checked on 2026-09-04 against the oRPC v2 docs at orpc.dev, the `middleapi/orpc` repository on `main`, npm dist-tags, and Effect v4 docs and package sources. Nothing comes from oRPC v1 or Effect v3. Where v2 differs from v1 the difference is called out. Where a v2 source could not be found, the text says "not found in v2 sources".

## Summary

1. oRPC v2 is a real, published beta: npm dist-tag `beta` = `2.0.0-beta.32` (2026-08-29), `latest` = `1.15.0`; 32 betas since `2.0.0-beta.1` on 2026-06-24. The project moved from `unnoq/orpc` to `middleapi/orpc`, and orpc.unnoq.com now 301s to orpc.dev, whose docs are the v2 docs. No stable date is published.
2. Contract first works with no codegen: `oc` from `@orpc/contract` builds plain-data contracts, `implement(contract)` type-checks the server, `RouterContractClient<typeof contract>` types the client. One `packages/contract` workspace package feeds web, mobile, and server.
3. Effect Schema plugs in through Standard Schema. Two paths: `Schema.toStandardSchemaV1(s)` explicitly, or the `@orpc/experimental-effect/extensions/input-output` side-effect import that patches `.input`/`.output` to accept Effect schemas directly, typed as `Schema<S['Encoded'], S['Type']>` on both ends.
4. TanStack Query: one package `@orpc/tanstack-query` for React and React Native; `createTanstackQueryUtils(client)` gives `queryOptions`/`mutationOptions`/`infiniteOptions`. Expo SDK 56+ needs no polyfill. TanStack Start gets `createIsomorphicFn` link config and a server-side client for SSR; cross-Worker SSR loaders are not documented.
5. OpenAPI: `OpenAPIGenerator` emits 3.1 from a contract or router; `EffectSchemaToJsonSchemaConverter` ships in the Effect package and relies on Effect's `toStandardJSONSchemaV1`, which Effect itself marks experimental. Workers use `@orpc/server/fetch` or `@orpc/openapi/fetch`; `export default { fetch }`.
6. Typed errors cross the wire as `ORPCError { code, message, data }`; v2 dropped `status` from errors (handler-level `errorStatusMap`) and renamed `isDefinedError` to `isInferableError`. There is no automatic bridge from Effect tagged errors: only `ORPCError` in the Effect error channel is inferable, anything else squashes to `INTERNAL_SERVER_ERROR`. Mapping must be written per error.
7. Effect composition is small glue: `handlerGen`/`.effect` runs a generator per request with `Effect.runPromiseExit`; services come from a `'effect/context'` entry in the oRPC context and an optional `'effect/wrap'` hook. About 1.2 kB of code. The package is named `@orpc/experimental-effect`, requires `effect >=4.0.0-beta.90`, and is developed against `4.0.0-rc.112`.
8. Bundle (esbuild, minify, ES2022): oRPC server transport is about 38 kB minified; Effect + Schema dominate at about 265-277 kB minified (82-86 kB gzip). Effect's own `HttpApi` stack measured larger still (397 kB / 125 kB gzip). All far under Cloudflare's 3 MB / 10 MB limits; no Workers cold-start figures exist in v2 sources.
9. Against the map's ranking oRPC v2 scores well on ranks 1-4 and 6, and its Effect seam is the smallest surface a maintainer new to Effect has to learn (rank 5). The costs: a beta wire format that must ship server and clients together, two `declare module` prototype patches, and manual tagged-error mapping.
10. Recommendation for the skeleton ticket: adopt oRPC v2 beta with `packages/contract`, Effect Schema through the input-output extension, and a single `mapDomainErrors` middleware; keep Effect's `HttpApi` as the fallback if the beta churn bites.

## Publish state: what "v2" is

- npm dist-tags for `@orpc/server`, `@orpc/client`, `@orpc/contract`, `@orpc/openapi`, `@orpc/tanstack-query`: `latest: 1.15.0`, `beta: 2.0.0-beta.32`, `next: 0.0.0-next.47dbd93` (checked with `npm view <pkg> dist-tags`, 2026-09-04). `@orpc/server@2.0.0-beta.32` declares `repository.url = git+https://github.com/middleapi/orpc.git` and `homepage = https://orpc.dev`.
- GitHub releases at https://github.com/middleapi/orpc/releases: `v2.0.0-beta.1` published 2026-06-24, `v2.0.0-beta.32` on 2026-08-29, all flagged prerelease; `v1.15.0` (2026-08-08) is the newest non-prerelease. Repo `pushed_at` 2026-09-03.
- The old repo `unnoq/orpc` resolves through the GitHub API to `dinwwwh/orpc` (7 stars); `middleapi/orpc` has 5,578 stars. https://orpc.unnoq.com/ returns `301` to https://orpc.dev/. The orpc.dev docs install with `@beta` tags and carry a "Migrating from v1" page, so they are the v2 docs (https://orpc.dev/docs/getting-started, https://orpc.dev/docs/migrations/from-v1).
- v2 renamed and merged packages: `@orpc/openapi-client` merged into `@orpc/openapi`; the per-framework query packages became `@orpc/tanstack-query`; `@orpc/experimental-publisher-durable-object` became `@orpc/cloudflare`; `@orpc/otel` became `@orpc/opentelemetry` (from-v1 "Update Packages" table).
- v2 changed the wire format: "a v1 RPC Link or OpenAPI Link cannot talk to a v2 server (and vice versa). Deploy the upgraded server and clients together." (from-v1 "Wire Format Changes").
- The transport core moved out of `@orpc/standard-server` into `@standardserver/*` packages: `@orpc/server@2.0.0-beta.32` depends on `@standardserver/core`, `/fetch`, `/node`, `/fastify`, `/aws-lambda`, `/peer` at `^0.8.2` (`npm view @orpc/server@beta dependencies`).
- Stable date: not found in v2 sources. Open `[v2]` issues exist (for example #1638 "OpenAPI To Contract", #1689, #1725).

Effect side: `npm view effect dist-tags` gives `latest: 3.22.1`, `beta: 4.0.0-beta.107`, `rc: 4.0.0-rc.112`. `@orpc/experimental-effect@2.0.0-beta.32` has `peerDependencies.effect = ">=4.0.0-beta.90"` and `devDependencies.effect = "4.0.0-rc.112"` (packages/effect/package.json on main). The map says "Effect v4 beta"; the `rc` tag is ahead of `beta` and is what oRPC tests against.

## Contract first

Source: https://orpc.dev/docs/contract-first, https://orpc.dev/docs/contract/procedure, https://orpc.dev/docs/contract/implementation, https://orpc.dev/docs/recipes/monorepo-setup, https://orpc.dev/docs/migrations/from-v1.

- Declaration: `import { oc } from '@orpc/contract'`; chain `.meta()`, `.errors()`, `.input()`, `.output()`, group in a plain object. "A contract has no `.handler`." `.output` is required for a typed result: "Skip it and the result type becomes `unknown`", and "once implemented, the server validates every response against it at runtime."
- Implementation: `const os = implement(contract)`; `os.planet.find.handler(...)`; `os.router({...})` "checks completeness: forget to implement a procedure, or put it under the wrong key, and the code does not compile." New in v2: `implement(contract, { disableOutputValidation: true })` accepts a procedure config (from-v1 "Contract-First").
- Client: `RouterContractClient<typeof contract>` from `@orpc/contract` (renamed from v1's `ContractRouterClient`; alias kept). "it needs only the contract, which contains no business logic, so no server code can leak into the client bundle." No generation step anywhere; the docs' word for it: "Because the contract is plain data plus schemas, you can move it into a shared package that both sides depend on".
- Monorepo: the recommended "Contract First" layout is `packages/core-contract` imported by `apps/api`, `apps/web`, `apps/app`; use TypeScript project references (`composite: true` in packages, `references` in apps) and "linked workspace packages (e.g., PNPM Workspace protocol)" rather than alias imports.
- Sharing with React Native: the Expo adapter uses the same `RPCLink` from `@orpc/client/fetch` and the same typed client; nothing contract-specific differs (https://orpc.dev/docs/adapters/expo).
- Routing metadata moved in v2: REST paths go on the contract as `.meta(openapi({ method: 'GET', path: '/planets/{id}' }))` from `@orpc/openapi` (from-v1 "Routing Moved to OpenAPI Metadata"; https://orpc.dev/docs/openapi/specification). This means `packages/contract` depends on `@orpc/openapi` if REST routes are declared on the contract.
- At scale: `createContractClientFactory` and `createContractUtilsFactory` let clients depend on individual procedure contracts instead of the root, at the price of a `meta.path` consistency rule (https://orpc.dev/docs/contract/client-factory). Not needed for the skeleton.

Verdict: shareable by web, mobile, and server with no codegen. One package, TypeScript project references, done.

## Schema support: Effect Schema through Standard Schema

Sources: https://orpc.dev/docs/integrations/standard-schema, https://orpc.dev/docs/integrations/effect, `packages/effect/src/schema.ts` and `src/extensions/input-output.ts` on `middleapi/orpc@main`, https://effect.website/docs/v4/schema/standard-schema, `effect@4.0.0-rc.112/dist/Schema.d.ts`.

- oRPC accepts any Standard Schema in `.input`, `.output`, and `.errors[*].data`. The Standard Schema page names Zod, Valibot, ArkType "and many more"; Effect is not listed there but is covered by the Effect integration page.
- Effect v4 exposes `Schema.toStandardSchemaV1(schema)`; the result reports `"~standard".vendor === "effect"`. Constraints from the Effect docs: "The schema must not require decoding services; its DecodingServices must be never", and validation "first attempts to decode synchronously. If decoding encounters an asynchronous transformation or check, it returns a Promise instead."
- Path A (explicit): `os.input(Schema.toStandardSchemaV1(Schema.Struct({ name: Schema.String })))`.
- Path B (extension): `import '@orpc/experimental-effect/extensions/input-output'` once at startup; then `.input(Schema.Struct(...))` works on both `os` and `oc`. The source patches `ContractBuilder.prototype.input/output` and `Builder.prototype.input/output`, calling `EffectSchema.isSchema(schema)` and converting through `toStandardSchema`, which also copies oRPC's hidden meta plugins onto the converted schema. The `declare module '@orpc/contract'` and `declare module '@orpc/server'` overloads type the result as `Schema<S['Encoded'], S['Type']>`, so input is `Encoded` on the wire and `Type` in the handler, and output is `Type` from the handler and `Encoded` on the client. Inference is intact on both ends; the doc adds "You can also use these extensions with the contract builder."
- Cost of path B: it is a side-effect import that mutates prototypes and relies on module augmentation; it must be imported "from a module that always runs during initialization". If `packages/contract` uses it, every consumer of the contract must import the extension too, otherwise `.input(EffectSchema)` type-checks but is not converted at runtime. For a contract package, path A (convert at the contract) avoids the trap.
- Error data: `.errors({ X: { data: schema } })` requires "a synchronous schema" for error factories (https://orpc.dev/docs/error-handling, "Error Factory"). Effect schemas with async checks would not qualify.

Verdict: works, typed both ways. Prefer explicit `toStandardSchemaV1` inside `packages/contract`; keep the prototype extension out of shared code.

## TanStack Query for React and React Native

Sources: https://orpc.dev/docs/integrations/tanstack-query, https://orpc.dev/docs/adapters/tanstack-start, https://orpc.dev/docs/adapters/expo, https://orpc.dev/docs/recipes/optimizing-ssr, https://orpc.dev/docs/migrations/from-v1.

- One package: `@orpc/tanstack-query@beta`; v1's `@orpc/react-query` and friends were removed. `createTanstackQueryUtils(client, { prefix })` (v1's `path` option became `prefix`).
- Client surface: `orpc.planet.find.queryOptions({ input, context })`, `.mutationOptions()`, `.infiniteOptions({ input: pageParam => ..., initialPageParam, getNextPageParam })`, `.streamedOptions()` / `.liveOptions()` (v1's `experimental_` prefixes dropped), and key helpers `.key()`, `.queryKey()`, `.mutationKey()`, `.infiniteKey()` for invalidation.
- Typed errors in hooks: `isInferableError(error)` in `onError` or on `mutation.error`.
- React Native: the same utils; the Expo adapter says "Use SDK 56 or later to get everything working out of the box" because Expo provides Web Streams globals from SDK 53 and installs streaming `expo/fetch` as global `fetch` from SDK 56. Bare React Native is "not supported out of the box"; React Native 0.78 is a hard floor (class static blocks). Nested `File`/`Blob` never works on Expo; keep files at the root of an input.
- TanStack Start SSR: link config through `createIsomorphicFn().client(() => new RPCLink({ url })).server(() => new RPCLink({ url, origin: () => new URL(getRequest().url).origin, headers: () => getRequestHeaders() }))`; or a server-side client `createRouterClient(router, { context })` when the router lives in the same process. Hydration needs care for non-JSON types (`RPCJsonSerializer` in `queryKeyHashFn`, `dehydrate.serializeData`, `hydrate.deserializeData`) and streamed/live queries must be cancelled on the server and resumed with `refetchOnMount: 'always'`.
- Prismark's shape is web on one Worker and the API on another (`api.prismark.tech`), so the in-process `createRouterClient` path does not apply; the SSR loader would call across origins with forwarded headers via `RPCLink`. A service-binding or Workers-to-Workers example is not found in v2 sources.
- Measured: `@orpc/client` + `@orpc/client/fetch` + `@orpc/tanstack-query` bundle to 33.5 kB minified / 11.1 kB gzip without `@tanstack/react-query` itself (the utils package has no runtime dependency on TanStack; the build succeeded with it absent).

Verdict: both clients covered by one package; the web SSR story is documented for same-process routers and only partially for a separate API Worker.

## OpenAPI generation and the Workers / fetch adapter

Sources: https://orpc.dev/docs/openapi/specification, https://orpc.dev/docs/adapters/fetch-api, https://orpc.dev/docs/requirements, https://orpc.dev/docs/plugins/openapi-reference, `packages/effect/src/converter.ts`, `packages/cloudflare/package.json`, `effect@4.0.0-rc.112/dist/Schema.d.ts`.

- Generator: `new OpenAPIGenerator({ converters: [...] })`, `generator.generate(routerOrContract, { base: { info, servers } })`; "generates an OpenAPI 3.1 document by default. OpenAPI 3.2 is partially supported." v1's `schemaConverters` became `converters`, document fields moved under `base`, `commonSchemas` was removed (from-v1 "OpenAPIGenerator options restructured").
- Converters: first-party `ZodToJsonSchemaConverter`, `ValibotToJsonSchemaConverter`, `ArkTypeToJsonSchemaConverter`; "When no matching converter is configured, OpenAPIGenerator falls back to Standard Json Schema conversion." The Effect package ships `EffectSchemaToJsonSchemaConverter`, whose `condition` is `schema['~standard'].vendor === 'effect'` and whose `convert` calls `EffectSchema.toStandardJSONSchemaV1(effectSchema)` and hands the result to oRPC's `StandardJsonSchemaConverter`. Effect's own d.ts for `toStandardJSONSchemaV1` says "Converts a schema to an experimental Standard JSON Schema V1 representation" and links standard-schema PR 134; the standardschema.dev JSON Schema page does not list Effect among implementers yet. It is present in both `4.0.0-beta.107` and `4.0.0-rc.112`.
- Error responses in the spec: `errorStatusMap` and `customErrorResponseBodySchema` on `generate`; the wire body no longer has `status` and gained `inferable`.
- Serving the spec: `OpenAPIReferenceHandlerPlugin({ provider: 'scalar', spec: () => generator.generate(...) })` from `@orpc/openapi/plugins` (renamed from v1's `OpenAPIReferencePlugin`).
- Workers: there is no Workers-specific handler. The Fetch API adapter is the Workers adapter: `new RPCHandler(router)` from `@orpc/server/fetch` or `new OpenAPIHandler(router)` from `@orpc/openapi/fetch`, `handler.handle(request, { prefix, context })`, then `export default { fetch }`. Requirements page: "Cloudflare Workers tracks current V8 and ships every Web API oRPC uses; use the Fetch Adapter there." Published bundles target ES2022 and are not compiled down.
- `@orpc/cloudflare@2.0.0-beta.32` is only "Durable Object pub/sub and Workers rate limiting adapters" (`DurablePublisher`, `publisher-object`, `ratelimit`); it is not a transport. Relevant later for realtime on Durable Objects, outside this map.
- CORS: the CORS plugin's default is now any origin; for cross-origin `Blob`/stream bodies add `Content-Disposition` and `Standard-Server` to `allowHeaders`/`exposeHeaders`. v2 also rejects `GET` on `RPCHandler` by default (from-v1 "GET requests are rejected by default").

Verdict: spec generation from the contract, one converter class for Effect Schema, and a plain `fetch` export for Workers. The Effect JSON Schema path is marked experimental on Effect's side.

## Error handling: typed errors on the wire and Effect tagged errors

Sources: https://orpc.dev/docs/error-handling, https://orpc.dev/docs/client/error-handling, https://orpc.dev/docs/rpc/handler, https://orpc.dev/docs/migrations/from-v1, `packages/effect/src/handler.ts`, `src/runtime.ts`, `src/error.ts`.

- Declaration: `.errors({ RATE_LIMITED: { data: z.object({ retryAfter: z.number() }) } })` on a procedure, a shared builder, or the contract; thrown as `throw errors.RATE_LIMITED({ message, data })`. v2 adds error factories: `const RateLimitedError = error('RATE_LIMITED', { message, data })`, `throw new RateLimitedError({ data })`, `instanceof` narrowing, and registration in `.errors({ [RateLimitedError.code]: RateLimitedError })`.
- Wire: `ORPCError` with `code`, optional `message`, optional `data`; "message and data are sent to the client." v2 removed `status` from `ORPCError` and `.errors`; status codes come from the handler's `errorStatusMap` (default `COMMON_ERROR_STATUS_MAP`, for example `NOT_FOUND` 404, `CONFLICT` 409). Non-`ORPCError` throws become `INTERNAL_SERVER_ERROR` by default.
- Client: `const [error, data, inferableError, isSuccess] = await safe(client.x(...))`; `isInferableError(error)` (v1's `isDefinedError` remains as a deprecated alias) narrows to the declared union; `createSafeClient(client)` wraps everything.
- Effect boundary, from the source: `handlerGen` runs `Effect.gen(...).pipe(succeedOnORPCError)` where `succeedOnORPCError = Effect.catch(error => error instanceof ORPCError ? Effect.succeed(error) : Effect.fail(error))`. So an `ORPCError` in the error channel, or returned, becomes a returned typed error; the handler's declared type is `TReturn | Extract<InferYieldError<TYield>, AnyORPCError>`. Every other failure reaches `runPromise`, which throws `Cause.squash(exit.cause)`; interruption becomes `AbortError`.
- Effect tagged errors: no automatic mapping exists. `grep -i "tagged|_tag|catchTag"` over `packages/effect/src` finds nothing. A `Schema.TaggedError` or `Data.TaggedError` yielded from a handler is squashed and lands on the client as `INTERNAL_SERVER_ERROR`. To keep types, map explicitly, either at the yield site, `yield* repo.find(id).pipe(Effect.catchTag('NotFound', () => Effect.fail(errors.NOT_FOUND())))`, which keeps the `ORPCError` in the channel and therefore inferable, or in an oRPC middleware that catches the thrown domain error and rethrows `ORPCError` (the docs' "Using Custom Error Classes" pattern). Types stay intact because `errors.X` is typed from `.errors`; the mapping table is hand-written.
- Client side in Effect: `createEffectClient(client)` returns lazy effects with `Effect.Effect<Output, Error>`; `catchORPCError`, `catchORPCErrorCode('NOT_FOUND', ...)`, `catchORPCErrorCodes({...})` narrow by code with data typed from the contract, and "interrupting the effect aborts the underlying call."

Verdict: typed errors are first class and survive the wire; Effect tagged errors need one explicit map per error family. "Without losing types" holds only when the mapping is written inside the typed `errors` scope.

## Composition with Effect: the handler boundary

Sources: https://orpc.dev/docs/integrations/effect, `packages/effect/src/{handler,middleware,context,runtime,client}.ts`, `src/extensions/effect.ts`, `effect@4.0.0-rc.112/dist/unstable/httpapi/*.d.ts`.

- Install: `npm install @orpc/experimental-effect@beta effect@beta`. The package is still prefixed `experimental` while `@orpc/experimental-publisher` and others were promoted in v2.
- Handler: `os.handler(handlerGen(function* ({ input, context, errors }) { ... }))`, or after `import '@orpc/experimental-effect/extensions/effect'`, `os.effect(function* ...)`. The extension is 174 lines of `declare module` overloads plus `Builder.prototype.effect = function (handler) { return this.handler(handlerGen(handler)) }`; it also patches `ProcedureImplementer`, so `implement(contract).x.effect(...)` works.
- Services and layers: the oRPC context carries `'effect/context': Context.Context<Services>`; `handlerGen` does `Effect.provide(opts.context['effect/context'])` when present. The typed requirement channel of yielded effects is `InferEffectServices<TContext>`, so a handler that yields a service not in the context fails to type-check. Middleware can extend it: `next({ context: { 'effect/context': context['effect/context'].pipe(Context.add(Svc, impl)) } })`. Layers are not run per request; you build the `Context` once (from a `Layer` at Worker start) and hand it in at `handler.handle(request, { context })`.
- Wrapping: `'effect/wrap': (effect, { path, procedure, signal }) => effect` runs after `succeedOnORPCError`, for tracing (`Effect.provide(TracingLive)`) or app-level `Effect.catchCause`.
- Runtime: one `Effect.runPromiseExit(effect, { signal })` per request; the abort signal is passed through. Middleware via `middlewareGen` wraps `opts.next()` in `Effect.tryPromise`, so downstream failures land in the error channel of `next` and can be recovered with Effect.
- Glue count for Prismark: one `packages/contract` (plain `oc` + `toStandardSchemaV1`), one `base = os` file with the two extension imports, one context factory that turns the app `Layer` into a `Context` at boot, one error-mapping middleware, one `export default { fetch }`. The integration itself contributes 1.2 kB to the bundle.
- What Effect's own HTTP layer offers instead (verified from `effect@4.0.0-rc.112` sources only): `effect/unstable/httpapi` exports `HttpApi`, `HttpApiGroup`, `HttpApiEndpoint`, `HttpApiBuilder`, `HttpApiClient`, `HttpApiError`, `HttpApiMiddleware`, `HttpApiSecurity`, `HttpApiScalar`, `HttpApiSwagger`, and `OpenApi.fromApi(api)`, all `@since 4.0.0`. The `HttpApi` header says "The same description can be used by server builders, generated clients, URL builders, OpenAPI generation, and reflection tools." It is a contract-first, typed-error, layer-native design, but the module path is `unstable`, and a TanStack Query integration for `HttpApiClient` is not found in Effect v4 sources.

Verdict: the boundary is thin and honest. The maintainer new to Effect learns `Effect.gen`, `Context`, and `Layer`; oRPC handles routing, validation, serialization, and the client.

## Bundle size and cold start on Workers

Method: `npm install` of `@orpc/*@beta` (`2.0.0-beta.32`), `effect@beta` (`4.0.0-beta.107`) then `effect@rc` (`4.0.0-rc.112`), `zod@4.5.4`, bundled with `esbuild@0.28.2 --bundle --minify --format=esm --platform=browser --target=es2022`, gzip -9. Entries are minimal one-procedure Workers. Numbers are from this run and will drift with every beta.

| Entry | Minified | Gzip |
| --- | ---: | ---: |
| oRPC `RPCHandler` (fetch) + `os` + Zod | 118.9 kB | 34.9 kB |
| of which Zod 4.5.4 | 80.8 kB | |
| of which oRPC + `@standardserver/*` | 37.8 kB | |
| oRPC + `@orpc/experimental-effect` + Effect Schema, effect@beta.107 | 308.1 kB | 96.0 kB |
| same, effect@rc.112 | 320.5 kB | 100.0 kB |
| oRPC `OpenAPIHandler` + `OpenAPIGenerator` + Effect converter, beta.107 | 344.6 kB | 108.5 kB |
| Effect + Schema decode only, no oRPC, beta.107 | 264.5 kB | 82.1 kB |
| same, rc.112 | 276.7 kB | 86.0 kB |
| Effect core only (`Effect.succeed`), rc.112 | 81.6 kB | 28.5 kB |
| Effect `HttpApi` + `HttpApiBuilder` + `HttpRouter`, rc.112 | 396.7 kB | 124.6 kB |
| oRPC client (`createORPCClient` + `RPCLink`) | 25.1 kB | 9.0 kB |
| oRPC client + `@orpc/tanstack-query` utils | 33.5 kB | 11.1 kB |

- oRPC's own comparison page (measured 2026-08-09 on `2.0.0-beta.26`) gives 45.0 kB minified / 14.1 kB gzip for a minimal client and server pair, and claims 18,551 req/s over HTTP versus tRPC's 4,299 on Node (https://orpc.dev/docs/comparison). The per-package split above agrees: the transport is a few tens of kB; the schema library is the weight.
- Inside the Effect-only bundle the largest inputs are `Schema.js` (73 kB), `internal/effect.js` (37 kB), `SchemaAST.js` (30 kB), and `internal/schema/toArbitrary.js` (10 kB) even though nothing generates arbitraries; `effect`'s `package.json` has `sideEffects: []`, so this is Schema's module graph, not a tree-shaking failure in oRPC.
- Cold start: no Workers cold-start measurements exist in v2 sources; the comparison page only says the lazy router gives "faster cold starts". Cloudflare's published limits are 3 MB compressed on Free, 10 MB on Paid, and "A Worker must parse and execute its global scope ... within 1 second", reported by `wrangler deploy` as `startup_time_ms` (https://developers.cloudflare.com/workers/platform/limits/). Every bundle above is under 0.4 MB. As a rough proxy, importing the built bundles in Node 24 took 15 ms for the Zod server, 107 ms for the Effect server, and 144 ms for the Effect `HttpApi` server (best of five); this is module evaluation on Node, not an isolate start, and should be re-measured with `wrangler` on the real skeleton.

Verdict: oRPC adds about 38 kB to a Worker; Effect adds 265-277 kB whichever transport is chosen. Bundle size does not separate the two options; it is a cost of Effect itself.

## Scorecard against the map's transport ranking

Ranking from #3: end to end types with no codegen; typed errors and dependency injection inside the server; TanStack Query on both clients; an OpenAPI spec; learning curve for one maintainer new to Effect; bundle size.

| Rank | Criterion | oRPC v2 in front of Effect | Effect `HttpApi` alone (from v4 rc sources) | Notes |
| --- | --- | --- | --- | --- |
| 1 | E2E types, no codegen | Strong. `oc` contract, `implement`, `RouterContractClient`; project references. | Strong. `HttpApi` is data; `HttpApiClient` derives a client. | Both pass. oRPC's client also types binary and streams. |
| 2 | Typed errors + DI in server | Strong with one caveat. `.errors` + `isInferableError`; `Context` via `'effect/context'`, middleware can extend it. Tagged errors need a hand-written map. | Strong. Errors are Schema-typed per endpoint; layers native. | oRPC keeps Effect DI intact; the tax is the error map. |
| 3 | TanStack Query on web and mobile | Strong. One package, Expo SDK 56 documented, typed errors in hooks. | Not found in v4 sources. | Decisive for this rank. |
| 4 | OpenAPI spec | Strong. `OpenAPIGenerator`, Effect converter, Scalar plugin. Effect's `toStandardJSONSchemaV1` is marked experimental. | Present: `OpenApi.fromApi`. | Both pass; oRPC's depends on an experimental Effect API. |
| 5 | Learning curve, maintainer new to Effect | Good. Effect surface is `Effect.gen`, `Context`, `Layer`; HTTP, validation, and clients are oRPC's ordinary docs. Two side-effect prototype patches to understand. | Harder. Everything is Effect: router, middleware, security, layers, client. | Favors oRPC for one person. |
| 6 | Bundle size | 38 kB transport + Effect. Measured 320 kB / 100 kB gzip total. | Measured 397 kB / 125 kB gzip. | Effect dominates either way; oRPC is smaller in this run. |

Costs specific to oRPC v2 beta: wire format not compatible with v1 and free to change until stable, so server and both clients deploy together; `@orpc/experimental-effect` is named experimental and pins its peer to a moving `effect` prerelease; 32 betas in nine weeks means version bumps will be frequent during the skeleton.

## Open questions

1. Stable timeline for oRPC 2.0 and for `@orpc/experimental-effect` dropping the prefix: not found in v2 sources. Worth asking in `middleapi/orpc` discussions before the ADR.
2. `effect@beta` (4.0.0-beta.107) or `effect@rc` (4.0.0-rc.112)? oRPC develops against rc; the map says beta. ADR 0008 (latest everything) suggests rc; the decision ticket should say which tag the repo pins and why.
3. SSR loaders on TanStack Start against a separate API Worker: cross-origin `RPCLink` with forwarded headers is the only documented route. Whether a Workers service binding can back `RPCLink.fetch` is untested; it should work since `fetch` is overridable, but no v2 source shows it.
4. Effect Schema's bundle share (265-277 kB including `toArbitrary`) is on Effect, not oRPC. Whether importing from a narrower Effect entry point trims it is unverified.
5. Where the error map lives: at the yield site (typed, per procedure) or a global middleware (untyped rethrow). The skeleton should try the middleware form first and measure how much inference is lost.
6. The prototype-patching extensions (`extensions/effect`, `extensions/input-output`) need a single initialization module; in a monorepo with a shared contract package the safer form is explicit `toStandardSchemaV1` in the contract and `.effect` only in `apps/server`.
7. Effect's `toStandardJSONSchemaV1` is labelled experimental; the OpenAPI output for Effect-specific types (Option, DateTime, branded types) has not been checked here.

## Sources

oRPC v2 docs (orpc.dev, fetched 2026-09-04; MDX read from `middleapi/orpc@main` under `apps/content/docs/`):

- https://orpc.dev/ and https://orpc.unnoq.com/ (301 to orpc.dev)
- https://orpc.dev/docs/getting-started
- https://orpc.dev/docs/contract-first
- https://orpc.dev/docs/contract/procedure
- https://orpc.dev/docs/contract/implementation
- https://orpc.dev/docs/contract/client-factory
- https://orpc.dev/docs/recipes/monorepo-setup
- https://orpc.dev/docs/integrations/standard-schema
- https://orpc.dev/docs/integrations/effect
- https://orpc.dev/docs/integrations/tanstack-query
- https://orpc.dev/docs/adapters/tanstack-start
- https://orpc.dev/docs/adapters/expo
- https://orpc.dev/docs/adapters/fetch-api
- https://orpc.dev/docs/requirements
- https://orpc.dev/docs/recipes/optimizing-ssr
- https://orpc.dev/docs/openapi/specification
- https://orpc.dev/docs/openapi/handler
- https://orpc.dev/docs/rpc/handler
- https://orpc.dev/docs/plugins/openapi-reference
- https://orpc.dev/docs/error-handling
- https://orpc.dev/docs/client/error-handling
- https://orpc.dev/docs/comparison
- https://orpc.dev/docs/migrations/from-v1

oRPC repository and packages:

- https://github.com/middleapi/orpc (GitHub API: `unnoq/orpc` resolves to `dinwwwh/orpc`; `middleapi/orpc` is canonical, `homepage: https://orpc.dev`)
- https://github.com/middleapi/orpc/releases (v2.0.0-beta.1 2026-06-24 through v2.0.0-beta.32 2026-08-29; v1.15.0 2026-08-08)
- https://github.com/middleapi/orpc/blob/main/packages/effect/package.json
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/handler.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/middleware.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/runtime.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/context.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/schema.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/converter.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/error.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/client.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/extensions/effect.ts
- https://github.com/middleapi/orpc/blob/main/packages/effect/src/extensions/input-output.ts
- https://github.com/middleapi/orpc/blob/main/packages/cloudflare/package.json and `src/index.ts`
- https://github.com/middleapi/orpc/issues/1638, /1689, /1725 (open `[v2]` issues)
- npm: `npm view @orpc/server dist-tags`, `npm view @orpc/server@beta dependencies repository.url homepage` (2026-09-04)

Effect v4:

- https://effect.website/docs/v4/schema/introduction
- https://effect.website/docs/v4/schema/standard-schema
- https://effect.website/docs/v4/schema/json-schema
- https://www.effect.website/docs/v4/api/effect/unstable/httpapi/HttpApi
- `effect@4.0.0-rc.112/dist/Schema.d.ts` (`toStandardSchemaV1`, `toStandardJSONSchemaV1` "experimental", `TaggedError`) and `dist/unstable/httpapi/{HttpApi,OpenApi}.d.ts`, read from the local install
- `effect@4.0.0-beta.107` tarball, `dist/Schema.js` (`toStandardSchemaV1` implementation, `~standard.jsonSchema` presence)
- npm: `npm view effect dist-tags` (latest 3.22.1, beta 4.0.0-beta.107, rc 4.0.0-rc.112)

Standards and platform:

- https://standardschema.dev/json-schema (Standard JSON Schema; Effect not listed)
- https://developers.cloudflare.com/workers/platform/limits/ (3 MB / 10 MB compressed size, 1 s startup, `startup_time_ms`)

Local measurements: esbuild 0.28.2 bundles of the entries described above, Node v24.16.0, Linux; scripts kept in the session scratchpad, not committed.

# Deploying three Workers and the Deploy to Cloudflare button

Research for issue #9, part of #3. Every claim below was read from the cited
source on 2026-09-04. Nothing is from memory. Where the docs are silent the
finding says "not found".

## Summary

1. Workers Builds handles a pnpm monorepo by connecting the same repo to each Worker separately, with a per Worker **root directory** (where its `wrangler.jsonc` lives and where build and deploy run) and optional **build watch paths**; every commit triggers one build per Worker whose watch paths match. Three Workers means three Git connections rooted at `apps/server`, `apps/web`, `apps/landing`.
2. The build image ships pnpm 10.11.1 by default; the repo pins pnpm 11.6.0, so set the `PNPM_VERSION` build variable on each Worker. Whether the `packageManager` field is honoured is not documented.
3. Custom domains are `routes: [{ pattern, custom_domain: true }]` per Worker. Apex and subdomains are both supported, three Workers on three hostnames in one zone is the documented case, and Cloudflare creates the DNS record and certificate. A Worker on a custom domain can be reached by plain `fetch()` from another Worker on the same zone; a Worker on a route cannot.
4. Cookie sharing is a browser rule, not a Cloudflare one: a `Set-Cookie` from `api.prismark.tech` with `Domain=prismark.tech` is sent to `app.prismark.tech` and every other subdomain; without `Domain` it is host only. `app.` and `api.` are the same *site*, so `SameSite=Lax` still sends it. Do not use the `__Host-` prefix on that cookie.
5. Astro static output needs no adapter: `assets.directory: "./dist"`, no `main`, `not_found_handling: "404-page"` for a custom 404, build `astro build`, deploy `wrangler deploy`. If a page ever needs on-demand rendering, add `@astrojs/cloudflare` and `main: "@astrojs/cloudflare/entrypoints/server"` with `nodejs_compat`.
6. The Deploy to Cloudflare button clones the repo into the user's GitHub or GitLab, reads **one** `wrangler.jsonc`, provisions D1, R2, KV, Durable Objects, Queues and more from it, prompts for secrets listed in `.dev.vars.example` or `.env.example`, and builds with Workers Builds. It does **not** deploy more than one Worker: a monorepo needs one button per Worker, and a subdirectory URL must be "fully isolated within that subdirectory, including any dependencies". `workspace:*` packages break that; see Open questions.
7. Durable Object lifecycle now lives in the declarative `exports` map (`migrations` is legacy, the two are mutually exclusive). Lifecycle changes apply only via `wrangler deploy`; `wrangler versions upload` fails fast, so the server Worker gets no preview URLs for non-production branches.
8. Service bindings from web to server run on the same thread with no added latency and no extra request fee, but they bind by Worker name (which a self hoster may rename in the button flow) and require both Workers in one account. Plain HTTPS to `api.prismark.tech` is explicitly supported for custom domains and gives web SSR, the browser, and the phone app one code path. Recommendation: plain HTTP for the skeleton, service binding as a later measured optimisation.
9. Compatibility date: the platform docs say "set it to the current date"; the ADR 0007 rule (the newest date the installed workerd supports) is stricter because wrangler silently falls back to the newest supported date in local dev, which the workerd maintainer calls a bug. Keep the ADR rule and bump on every wrangler update.
10. D1 goes in `d1_databases` with `binding`, `database_name`, `database_id`, and `migrations_dir`; apply migrations in the `deploy` script with `wrangler d1 migrations apply <binding> --remote` so the button works when the user renames the database.

## Workers Builds for a pnpm monorepo

How it works. "When a commit is pushed to your connected repository, Workers Builds runs a two-step process: 1. Build command (optional) ... 2. Deploy command - Deploys your Worker to Cloudflare (defaults to `npx wrangler deploy`)". For non-production branches "the deploy command is replaced with a preview deploy command (defaults to `npx wrangler versions upload`), which creates a preview version without promoting it to production." ([Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/))

Monorepo setup, verbatim from the docs ([Advanced setups](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/)):

1. "Find the Workers associated with your project in the Workers & Pages Dashboard."
2. "Connect your monorepo to each Worker in the repository."
3. "Set the root directory for each Worker to specify the location of its `wrangler.jsonc` and where build and deploy commands should run."
4. "Optionally, configure unique build and deploy commands for each Worker."
5. "Optionally, configure build watch paths for each Worker to monitor specific paths for changes."

"When a new commit is made to the monorepo, a new build and deploy will trigger for each Worker if the change is within each of its included watch paths." The same page names pnpm workspaces and Turborepo as the expected tooling and gives `turbo deploy -F product-service` as an example deploy command.

Root directory: "Specify the path to your project. The root directory defines where the build command will be run and can be helpful in monorepos to isolate a specific project within the repository for builds." ([Configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)) There is no separate "path to wrangler config" setting; the root directory is it.

Build watch paths ([Build watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/)): defaults are includes `[*]`, excludes `[]`. "Paths satisfying excludes conditions are ignored first. Any remaining paths are checked against includes conditions. If any matching path is found, a build is triggered. Otherwise the build is skipped." Wildcards go "at the start or end of your rule". Example 1 in the docs is exactly our shape: "Include paths: `project-a/*, packages/*`". Path matching is bypassed for pushes with 0 file changes or "3000+ file changes or 20+ commits".

Package manager and versions ([Build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/)): defaults are Node.js 24.18.0 and pnpm 10.11.1, overridable with the `PNPM_VERSION` and `NODE_VERSION` build variables or `.nvmrc`. The repo's `packageManager` is `pnpm@11.6.0`; whether Workers Builds reads `packageManager` was **not found** in the builds docs, so set `PNPM_VERSION=11.6.0` on each Worker. "Workers Builds will use the Wrangler version set in your package.json." ([Configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)) "Workers Builds does not honor the configurations set in Custom Builds within your Wrangler configuration file." (same page)

Durable Objects and previews: "Preview URLs are not generated for Workers that implement Durable Objects" ([Configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)), and "`wrangler versions upload` does not apply lifecycle changes ... If your Wrangler configuration contains `exports` entries, `wrangler versions upload` fails fast with an actionable error." ([Durable Object class exports](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/)) So the server Worker's non-production deploy command must be something other than the default, or non-production builds must be disabled for it.

Proposed dashboard settings, one row per Worker:

| Worker | Root directory | Build command | Deploy command | Watch paths (include) |
| --- | --- | --- | --- | --- |
| `prismark-server` | `apps/server` | `pnpm build` | `pnpm deploy` (runs D1 migrations, then `wrangler deploy`) | `apps/server/*, packages/*, pnpm-lock.yaml` |
| `prismark-web` | `apps/web` | `pnpm build` | `pnpm exec wrangler deploy` | `apps/web/*, packages/*, pnpm-lock.yaml` |
| `prismark-landing` | `apps/landing` | `pnpm build` | `pnpm exec wrangler deploy` | `apps/landing/*, packages/theme/*, pnpm-lock.yaml` |

Note: root directory `apps/web` with `pnpm build` is what the README already documents for the web Worker, and the docs example root `/workers/product-service/` shows the root can be a subdirectory of a pnpm workspace (the docs list pnpm workspaces as the expected setup). Whether dependency install runs at the repo root or the root directory is **not stated**; the current web deploy is the proof it works.

## Custom domains and cookies

Config ([Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)):

```jsonc
"routes": [{ "pattern": "api.prismark.tech", "custom_domain": true }]
```

- "Custom Domains are routes to a domain or subdomain (such as `example.com` or `shop.example.com`) within a Cloudflare zone where the Worker is the origin." Apex (`prismark.tech`) and subdomains are both fine.
- "After you set up a Custom Domain for your Worker, Cloudflare will create DNS records and issue necessary certificates on your behalf." "Creating a Custom Domain will also generate an Advanced Certificate on your target zone for your target hostname."
- Requirements: "An active Cloudflare zone" and "You cannot create a Custom Domain on a hostname with an existing CNAME DNS record or on a zone you do not own." A self hoster therefore needs their domain on Cloudflare before a custom domain route can deploy; `workers.dev` works without a zone.
- Three Workers on one zone is the documented shape: "if you have Worker A attached to `app.example.com` and Worker B attached to `api.example.com`, Worker A can call `fetch()` on `api.example.com` and invoke Worker B."
- Same-zone fetch: "Fetch requests sent on the same zone from one Worker to another Worker running on a Custom Domain will succeed without a service binding." A Worker on a *route* cannot be reached that way ([Limits](https://developers.cloudflare.com/workers/platform/limits/): "Using global fetch() to call another Worker on the same zone without service bindings fails. Workers accept requests sent to a Custom Domain.").
- "Custom Domains do not support wildcard DNS records. An incoming request must exactly match the domain or subdomain", so `www.prismark.tech` needs a redirect rule plus a proxied placeholder DNS record (`192.0.2.0` A or `100::` AAAA), per the "Redirect between www and root domain" section.
- Limit: 100 custom domains per zone ([Limits](https://developers.cloudflare.com/workers/platform/limits/)).
- "If you change your routes in the dashboard, Wrangler will override them in the next deploy with the routes you have set in your Wrangler configuration file." ([Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)) Hostnames in `wrangler.jsonc` are the source of truth, which is a problem for self hosters (see Open questions).

Cookies between `app.prismark.tech` and `api.prismark.tech` (browser rules):

- Domain attribute: "Setting the domain makes the cookie available to that domain and all its subdomains. If omitted, the cookie is returned only to the host that sent it (i.e., it becomes a 'host-only cookie')." "The value must be the domain of the server that sends the `Set-Cookie` response header, or a parent domain of that server's domain. ... For example, a response from `api.example.com` can set `Domain=api.example.com` or `Domain=example.com`, but not `Domain=beta.api.example.com`, `Domain=other.example.com`, or `Domain=com`." ([MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie))
- RFC 6265 section 4.1.2.3: "if the value of the Domain attribute is 'example.com', the user agent will include the cookie in the Cookie header when making HTTP requests to example.com, www.example.com, and www.corp.example.com. ... If the server omits the Domain attribute, the user agent will return the cookie only to the origin server." and "the user agent will accept a cookie with a Domain attribute of 'example.com' or of 'foo.example.com' from foo.example.com". ([RFC 6265](https://www.rfc-editor.org/rfc/rfc6265.txt))
- So the server sets `Set-Cookie: <session>; Domain=prismark.tech; Secure; HttpOnly; SameSite=Lax; Path=/` and the browser sends it to `app.prismark.tech`. For a self hoster the value is their parent domain, so it must be configuration (an env var such as `COOKIE_DOMAIN`), not code.
- SameSite: `Lax` and `Strict` send the cookie "for requests originating from the same site that set the cookie" ([MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)), and a site "is determined by the registrable domain portion of the domain name ... `support.mozilla.org` and `developer.mozilla.org` are part of the same site, because `mozilla.org` is a registrable domain." ([MDN Site](https://developer.mozilla.org/en-US/docs/Glossary/Site)) `app.` and `api.` under `prismark.tech` are one site, so `SameSite=Lax` does not block the shared cookie.
- Do not name the shared cookie `__Host-...`: such cookies "must not have a `Domain` attribute specified" ([MDN Cookies guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)). `__Secure-` is fine.
- Security note from the same guide: "An application on a subdomain can set a cookie with the `Domain` attribute, which gives access to that cookie on all other subdomains. This mechanism can be abused in a session fixation attack." Every subdomain of `prismark.tech` is ours, so the exposure is accepted, but nothing untrusted should ever be hosted under the parent domain.

## Astro on Workers for apps/landing

Static (the waitlist form posts to the server; no on-demand rendering needed):

- "If you're using Astro as a static site builder, you don't need an adapter." ([Astro Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/))
- Wrangler config for a static Astro site, identical in both vendors' docs ([Cloudflare Astro guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/), [Astro deploy guide](https://docs.astro.build/en/guides/deploy/cloudflare/)):

  ```jsonc
  { "name": "my-astro-app", "compatibility_date": "YYYY-MM-DD", "assets": { "directory": "./dist" } }
  ```

  "Also note how there's no `main` field in this config - this is because you're only serving static assets, so no Worker code is needed". ([Cloudflare Astro guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)) "The `main` key is optional for assets-only Workers." ([Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/))
- Build and deploy: `npx astro build && npx wrangler deploy`; Workers Builds settings "Build command: `npx astro build`, Deploy command: `npx wrangler deploy`". ([Astro deploy guide](https://docs.astro.build/en/guides/deploy/cloudflare/))
- Custom 404: "For Workers projects, you will need to set `not_found_handling` if you want to serve a custom 404 page": `"assets": { "directory": "./dist", "not_found_handling": "404-page" }`. (same page) `not_found_handling` options are `"single-page-application" | "404-page" | "none"`, default `"none"`; `html_handling` defaults to `"auto-trailing-slash"`. ([Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/))
- Hydration: disable Cloudflare Auto Minify if hydration mismatch warnings appear. ([Astro deploy guide](https://docs.astro.build/en/guides/deploy/cloudflare/))

On-demand rendering, if a page ever needs it:

- `npx astro add cloudflare`, then per page `prerender = false` or `output: 'server'`. ([Astro Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/))
- Astro 6 / adapter v13: "the `main` field ... has changed to point to a new unified entrypoint provided by the Cloudflare adapter: `@astrojs/cloudflare/entrypoints/server`." "Astro will automatically generate a default configuration, using the package.json name field or the folder name as the Worker name. You can optionally create a Wrangler configuration file if you need custom settings." (same page) The Astro deploy guide's on-demand config is `main: "@astrojs/cloudflare/entrypoints/server"`, `compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]`, `assets: { binding: "ASSETS", directory: "./dist" }`, `observability: { enabled: true }`. ([Astro deploy guide](https://docs.astro.build/en/guides/deploy/cloudflare/))
- Assets: "Routing for static assets is based on the file structure in the build directory (e.g. `./dist`). If no match is found, this will fall back to the Worker for on-demand rendering." Hashed assets get long cache headers automatically. `_headers` and `_redirects` in `public/` are honoured for static assets. ([Astro Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/))
- Sessions: the adapter provisions a KV namespace named `SESSION` on deploy unless `session: false` is set in the Astro config. (same page) The landing page has no sessions, so set `session: false` to avoid an unwanted KV namespace, especially under the Deploy button.

## Deploy to Cloudflare button

Source for this whole section: [Deploy to Cloudflare buttons](https://developers.cloudflare.com/workers/platform/deploy-buttons/).

What it does: "Clone a Git repository: Cloudflare clones your source repository into the user's GitHub/GitLab account", "Configure a project: Your users can customize key details such as repository name, Worker name, and required resource names in a single setup page", "Build & deploy: Cloudflare builds the application using Workers Builds and deploys it ... Any required resources are automatically provisioned and bound to the Worker".

What it provisions: "Storage: KV namespaces, D1 databases, R2 buckets, Hyperdrive, Vectorize databases, and Secrets Store Secrets. Compute: Durable Objects, Workers AI, and Queues." "Cloudflare will read the Wrangler configuration file of your source repo to determine resource requirements ... and update the Wrangler configuration where applicable for newly created resources (e.g. database IDs and namespace IDs). To ensure successful deployment, please make sure your source repository includes default values for resource names, resource IDs and any other properties for each binding."

Secrets prompts: "Worker secrets can be defined in a `.dev.vars.example` or `.env.example` file with a dotenv format", e.g. `COOKIE_SIGNING_KEY=my-secret # comment`. Descriptions and hints go in `package.json` under `cloudflare.bindings.<NAME>.description`, with inline markdown supported, e.g. "Generate a random string using `openssl rand -hex 32`."

Build and deploy commands: "If you are using custom `build` and `deploy` scripts in your `package.json` ... Cloudflare will automatically detect and pre-populate the build and deploy fields." "If no `deploy` script is specified, Cloudflare will preconfigure `npx wrangler deploy` by default."

D1 migrations through the button: "run your migrations as part of your `deploy` script. The migration command should reference the binding name rather than the database name to ensure migrations are successful when users specify a database name that is different from that of your source repository", example `"deploy": "npm run db:migrations:apply && wrangler deploy"`, `"db:migrations:apply": "wrangler d1 migrations apply DB_BINDING --remote"`. (The [D1 migrations reference](https://developers.cloudflare.com/d1/reference/migrations/) suggests the database name for ordinary use because "the binding name can change, whereas the database name cannot"; for the button the binding name is the stable one.)

Durable Object migrations through the button: **not found**. The page lists Durable Objects as provisioned and says the Wrangler config is read, and the DO docs say lifecycle changes apply "via `wrangler deploy`", which is the button's default deploy command, so an `exports` map in `wrangler.jsonc` should be applied on the first deploy. Not documented as such; verify with a prototype.

Multiple Workers from one repo: **no**. "Monorepos: Cloudflare does not fully support monorepos. If your repository URL contains a subdirectory, your application must be fully isolated within that subdirectory, including any dependencies. Otherwise, the build will fail. Cloudflare treats this subdirectory as the root of the new repository created as part of the deploy process. Additionally, if you have a monorepo that contains multiple Workers applications, they will not be deployed together. You must configure a separate Deploy to Cloudflare button for each application. The user will manually create a distinct Workers application for each subdirectory."

Other limits: public repos only; github.com and gitlab.com only; Workers only, not Pages.

README snippet, exact:

```md
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=<your git repo URL>)
```

"You can also optionally specify a subdirectory", i.e. `?url=https://github.com/kryft-dev/prismark.tech/tree/main/apps/server`. The dashboard also generates the snippet from an existing Workers Builds Worker via its share button. The Cloudflare Astro guide uses an older link form, `https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/deploy-to-workers&repository=<repo>`; the documented form is the `deploy.workers.cloudflare.com/?url=` one.

What the README must contain for Prismark, given the above: three buttons (server, web, landing), each pointing at its `apps/<name>` subdirectory, each subdirectory carrying its own `wrangler.jsonc` with default resource names, a `.dev.vars.example` for that Worker's secrets, and `build` and `deploy` scripts in its `package.json`. The blocking problem is the "fully isolated ... including any dependencies" rule against `workspace:*` packages; see Open questions.

## Service bindings from web to server

Sources: [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/), [RPC](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/), [HTTP](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/), [Pricing](https://developers.cloudflare.com/workers/platform/pricing/), [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [Vite plugin API](https://developers.cloudflare.com/workers/vite-plugin/reference/api/), [Multi-Worker development](https://developers.cloudflare.com/workers/development-testing/multi-workers/).

What they give:

- "When you use Service Bindings, there is zero overhead or added latency. By default, both Workers run on the same thread of the same Cloudflare server."
- "Requests made from your Worker to another worker via a Service Binding do not incur additional request fees." Billed as one request for the initial invocation of Worker A.
- Two interfaces: RPC (`await env.BINDING.myMethod(arg)`; the server's default export must `extends WorkerEntrypoint`, and "Currently, entrypoints without a named handler are not supported", so a `fetch()` is still required) and HTTP (`env.BINDING.fetch(request)`, forwards a `Request` and returns a `Response`).
- Config on the caller only: `"services": [{ "binding": "SERVER", "service": "prismark-server" }]`; optional `entrypoint`. "This Worker must be on your Cloudflare account."
- Local dev: `wrangler dev -c ./app/wrangler.jsonc -c ./api/wrangler.jsonc` runs the first as the primary and the rest as auxiliary Workers, or `auxiliaryWorkers` in the Vite plugin. Workers "run in different dev commands but can still communicate with each other via service bindings ... regardless of whether they are started with `wrangler dev` or `vite dev`."
- "Cloudflare Access does not propagate `ctx.access` from Worker A to Worker B."
- "A single request has a maximum of 32 Worker invocations."

What plain HTTP gives:

- Custom domains explicitly allow it: "Worker A can call `fetch()` on `api.example.com` and invoke Worker B", "Fetch requests sent on the same zone from one Worker to another Worker running on a Custom Domain will succeed without a service binding."
- One transport for three clients (web SSR loaders, the browser, the phone app), one auth story (the session cookie forwarded on the request), and the self hoster's API base URL is one env var.
- Costs: a subrequest over the network, counted as a second Worker request, back through the same zone's edge. No latency figure in the docs.

Trade-offs for Prismark:

- A binding names the target Worker (`service: "prismark-server"`). The Deploy button lets users "customize ... Worker name", so a renamed server Worker breaks a hard-coded binding in the web Worker. Plain HTTP only needs a URL.
- The HTTP binding style carries the same cookies and headers as a network call, so the auth code is unchanged either way; only RPC would need a second auth path.
- Verdict: **not worth it for the skeleton.** Ship plain HTTPS from web SSR to `api.prismark.tech`. Revisit with a service binding (HTTP style, same code, one config line) once SSR latency is measured and the self host story is stable.

## Wrangler config per app

Rules used:

- "At a minimum, the `name`, `main` and `compatibility_date` keys are required to deploy a Worker. The `main` key is optional for assets-only Workers." ([Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/))
- Compatibility date. Cloudflare: "When you start your project, you should always set `compatibility_date` to the current date." ([Compatibility dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/)) ADR 0007: "The wrangler compatibility date must match the installed workerd, not 'today'. A date in the future builds fine and fails local dev." ([docs/adr/0007](../adr/0007-cloudflare-for-everything-server-side.md)) The mechanism behind the ADR is in the workers-sdk tracker: wrangler currently prints `The latest compatibility date supported by the installed Cloudflare Workers Runtime is "2025-12-23", but you've requested "2026-02-02". Falling back to "2025-12-23"` and runs at the older date, which the issue (filed by the workerd lead) calls a source of subtle bugs that only surface in production. ([workers-sdk #12374](https://github.com/cloudflare/workers-sdk/issues/12374)) The ADR rule stands: the date is the newest one the installed workerd supports, bumped when wrangler is bumped. The three apps must share one wrangler version so they share one date.
- Durable Objects: "`exports` and `migrations` are mutually exclusive." "New Durable Object namespaces created through `exports` always use the SQLite storage backend." "A class that appears only in your code is ignored until you declare it in `exports`; Cloudflare does not provision a namespace implicitly." "Once a Worker has been deployed with `exports`, subsequent deploys cannot return to the legacy `migrations` array." ([Durable Object class exports](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/))
- D1: `binding`, `database_name`, `database_id` required; `migrations_dir` "for example, if you have a mono-repo setup"; `migrations_pattern` for ORM layouts such as Drizzle's `migrations/*/migration.sql`. ([Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/), [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/))
- R2: `binding` and `bucket_name` required. ([Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/))
- Assets: "Not required if you're using the Cloudflare Vite plugin, which will automatically point to the client build output." (same page) That is why `apps/web/wrangler.jsonc` has no `assets` key and must not gain one.

### apps/server/wrangler.jsonc (proposed)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "prismark-server",
  "main": "src/index.ts",
  // Newest date the installed workerd supports (ADR 0007). Same value in all three apps.
  "compatibility_date": "2026-08-20",
  "compatibility_flags": ["nodejs_compat"],
  "observability": { "enabled": true },
  "upload_source_maps": true,
  "routes": [{ "pattern": "api.prismark.tech", "custom_domain": true }],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "prismark",
      // Placeholder; wrangler d1 create fills it locally, the Deploy button fills it for self hosters.
      "database_id": "00000000-0000-0000-0000-000000000000",
      "migrations_dir": "src/db/migrations"
    }
  ],
  "r2_buckets": [{ "binding": "FILES", "bucket_name": "prismark-files" }],
  "durable_objects": {
    "bindings": [{ "name": "WORKSPACE", "class_name": "Workspace" }]
  },
  "exports": {
    "Workspace": { "type": "durable-object", "storage": "sqlite" }
  }
}
```

`package.json` scripts for the button: `"build"`, `"deploy": "pnpm db:migrate && wrangler deploy"`, `"db:migrate": "wrangler d1 migrations apply DB --remote"`. Secrets in `.dev.vars.example` (better-auth secret, email provider key, Polar key optional). Whether the Deploy button accepts a placeholder `database_id` or needs the key absent is **not found**; the docs only say to include "default values for resource names, resource IDs". Test both.

### apps/web/wrangler.jsonc (change from current)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "prismark-web",                       // was "prismark"
  "compatibility_date": "2026-08-20",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry",
  "observability": { "enabled": true },
  "upload_source_maps": true,
  "routes": [{ "pattern": "app.prismark.tech", "custom_domain": true }],  // was prismark.tech
  "vars": { "API_URL": "https://api.prismark.tech" }
  // Later, if measured: "services": [{ "binding": "SERVER", "service": "prismark-server" }]
}
```

Renaming the Worker creates a new Worker on the dashboard; the existing `prismark` Worker with the `prismark.tech` custom domain must give that hostname up before the landing Worker can claim it ("You cannot create a Custom Domain on a hostname with an existing CNAME DNS record"). The TanStack side is unchanged: `cloudflare({ viteEnvironment: { name: 'ssr' } })` first in the plugin list, `main: "@tanstack/react-start/server-entry"`, `nodejs_compat`, `deploy: "npm run build && wrangler deploy"`. ([TanStack Start hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting), [Cloudflare TanStack Start guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/))

### apps/landing/wrangler.jsonc (proposed, static)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "prismark-landing",
  "compatibility_date": "2026-08-20",
  "observability": { "enabled": true },
  "routes": [{ "pattern": "prismark.tech", "custom_domain": true }],
  "assets": { "directory": "./dist", "not_found_handling": "404-page" }
}
```

No `main`, no adapter. Scripts: `"build": "astro build"`, `"deploy": "astro build && wrangler deploy"`. If on-demand rendering is ever added: `npx astro add cloudflare`, `main: "@astrojs/cloudflare/entrypoints/server"`, `compatibility_flags: ["nodejs_compat"]`, `assets: { directory: "./dist", binding: "ASSETS" }`, and `session: false` in `astro.config.mjs`.

## Open questions

1. **Deploy button versus pnpm workspaces.** The button requires a subdirectory to be "fully isolated ... including any dependencies". `apps/web` depends on `@prismark/theme` and `@prismark/config` via `workspace:*`; `apps/server` will share `packages/contract` if oRPC wins. Options to prototype: (a) button URL at the repo root with a root-level build that deploys one Worker, repeated per Worker with a build variable choosing the app (undocumented, may fail because the button reads one `wrangler.jsonc` from the root); (b) publish the shared packages to npm so each app is isolated; (c) accept that the button covers only the server Worker and hand self hosters a `pnpm deploy` script for the rest. A prototype ticket should try (a) on a throwaway repo before choosing.
2. **Hostnames in `wrangler.jsonc` for self hosters.** Custom domains in the config are the source of truth and override dashboard changes on the next deploy. A self hoster's fork would deploy to `api.prismark.tech`, which fails because the zone is not theirs. Either drop `routes` from the checked in config and attach domains in the dashboard (the docs recommend `workers_dev: false` in that case), or use a Wrangler environment for the hosted instance. Not decided here.
3. **Durable Object provisioning through the button.** Not documented. Verify that the first button deploy applies `exports`.
4. **Placeholder `database_id`.** Whether the button accepts a dummy UUID, an empty string, or needs the key omitted is not documented.
5. **Non-production builds for the server Worker.** `wrangler versions upload` rejects `exports`, and DO Workers get no preview URLs. Decide whether to disable non-production builds for `prismark-server` or set a no-op preview command.
6. **Install location in Workers Builds.** Whether `pnpm install` runs at the repo root or in the root directory is not stated; the working web deploy suggests the workspace is honoured, but confirm from a build log before adding the server and landing Workers.
7. **pnpm version.** Set `PNPM_VERSION=11.6.0` as a build variable on each Worker unless a build log shows `packageManager` being honoured.
8. **www redirect.** `www.prismark.tech` needs a redirect rule and a placeholder DNS record; decide whether the landing ticket owns it.

## Sources

Cloudflare (developers.cloudflare.com):

- https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/ (monorepos, root directory, watch paths, Wrangler environments)
- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/ (build and deploy commands, root directory, preview deploy, DO preview URL note, Custom Builds not honoured)
- https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/
- https://developers.cloudflare.com/workers/ci-cd/builds/build-image/ (Node and pnpm defaults, `PNPM_VERSION`)
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- https://developers.cloudflare.com/workers/platform/limits/ (custom domains per zone, same-zone fetch)
- https://developers.cloudflare.com/workers/platform/deploy-buttons/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/
- https://developers.cloudflare.com/workers/platform/pricing/ (service bindings billing)
- https://developers.cloudflare.com/workers/development-testing/multi-workers/
- https://developers.cloudflare.com/workers/vite-plugin/reference/api/ (`auxiliaryWorkers`)
- https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/ (`exports`, legacy `migrations`, `versions upload`)
- https://developers.cloudflare.com/workers/wrangler/configuration/ (required keys, `compatibility_date`, `exports`, `d1_databases`, `r2_buckets`, `services`, `routes`, `assets`, routes override)
- https://developers.cloudflare.com/workers/configuration/compatibility-dates/
- https://developers.cloudflare.com/d1/reference/migrations/
- https://developers.cloudflare.com/workers/wrangler/commands/d1/ (`d1 migrations apply [DATABASE] --remote`)
- https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/
- https://developers.cloudflare.com/workers/static-assets/routing/full-stack-application/

Astro (docs.astro.build):

- https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- https://docs.astro.build/en/guides/deploy/cloudflare/

TanStack:

- https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Cookies:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
- https://developer.mozilla.org/en-US/docs/Glossary/Site
- https://www.rfc-editor.org/rfc/rfc6265.txt (sections 4.1.2.3, 5.1.3)

Compatibility date behaviour:

- https://github.com/cloudflare/workers-sdk/issues/12374
- docs/adr/0007-cloudflare-for-everything-server-side.md (repo)

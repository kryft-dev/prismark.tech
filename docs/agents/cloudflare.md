# Cloudflare Workers conventions

How Worker code in this repo reaches its bindings. Training data predates the current Workers runtime, so when memory and this file disagree, this file wins.

## Bindings come from `cloudflare:workers`

Read `env` once, at module scope, and build module level singletons on it:

```ts
import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"
import { env } from "cloudflare:workers"

export const db = drizzle(env.DB, { schema })

export type Db = typeof db
```

The same import reaches every binding: D1, R2, Durable Object namespaces, secrets, vars. Handlers take only the request; services import what they need. Reference: https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global

Patterns that pass `env` through every function, cache it lazily on first request, or smuggle it into module scope through AsyncLocalStorage are relics of the runtime before this module existed. Replace them with the import above.

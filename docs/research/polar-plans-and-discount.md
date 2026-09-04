# Polar for hosted plans and the early bird discount

Research for #10, part of the walking-skeleton map in #3.

## Summary

1. Polar products and subscriptions belong to a Polar **organization**, not to individual customers; Prismark's server would create one Polar organization and sell one catalogue of products from it.
2. A **workspace** maps to a Polar **customer** (or, with the better-auth adapter's experimental organization sync, a Polar **team customer**) via `externalId`, not to a separate Polar organization per workspace — there is no per-workspace Polar org.
3. Checkout sessions are created server-side against `products`, optionally carrying `customerEmail`, `metadata`, and a `discountId`; the better-auth checkout endpoint exposes the same shape (`discountId`, `allowDiscountCodes`) plus better-auth's own `organizationId`.
4. Polar discounts have no field to restrict a code to one customer or email; matching a waitlist signup to its discount is Prismark's own job — mint one code per email (or one shared code with `maxRedemptions`) and pass `discountId` explicitly when the server builds the checkout for that signup.
5. The customer portal is a hosted, Polar-run page; the server never builds its own billing UI, only links to it (email OTP by default, or a pre-authenticated link from the server).
6. Webhooks follow the Standard Webhooks spec (`webhook-id`, `webhook-timestamp`, `webhook-signature`, HMAC-SHA256) and Polar's JS SDK verifies them with `validateEvent()`, built on the `standardwebhooks` package, which itself depends only on pure-JS `fast-sha256` and `@stablelib/base64` — no Node-only crypto API is required, so it should run on a Cloudflare Worker without `nodejs_compat`.
7. The better-auth Polar adapter ships four independent sub-plugins (`checkout`, `portal`, `usage`, `webhooks`) plus optional customer-on-signup creation; the server still owns webhook business logic (each `on*` handler is empty until Prismark fills it in) and any organization-to-team-customer sync, which the adapter itself calls **experimental** and warns not to enable over existing billing.
8. Polar's sandbox is a fully separate environment (`sandbox-api.polar.sh` / `sandbox.polar.sh`) with its own account, org, and access token — not a flag on production — and it still talks to Stripe test cards, so it does not by itself let integration tests skip the network.
9. Nothing in Polar's docs or SDK addresses a Prismark-specific "billing off" mode; that boot-time behaviour (is Polar configured) is a decision already recorded in #3, not a Polar feature — the server has to write that check itself, e.g. skip mounting the better-auth Polar plugin when no Polar API key/org id is present.
10. "Payment" in `CONTEXT.md` already means money in against a client invoice; the word for what a workspace is on with Prismark itself needs a different name — see Open questions.

## Products and subscriptions keyed to an organisation, checkout flow, customer portal

Products (including subscriptions — Polar treats a subscription and a one-time purchase as "the same API, same data model, just different pricing and billing logic") are organization-scoped: an organization has one default currency and a Products dashboard, and every product belongs to that organization (`organizationId` on `DiscountFixedOnceForeverDurationBase`, `organization_id` in the API payload, confirms the same organization-scoping on discounts). [Products](https://polar.sh/docs/documentation/features/products)

Subscriptions support five pricing models — fixed, pay-what-you-want, free, usage-based (metered), and seat-based — and these can combine, e.g. a fixed fee plus metered usage. The billing interval is locked in at product creation; changing it means a new product. [Products](https://polar.sh/docs/documentation/features/products)

A checkout session is created against one or more `products`; the response includes a URL to redirect the customer to. The API accepts `customerEmail`, `customerName`, `customerBillingAddress`, `metadata` (copied onto the resulting order/subscription), and — confirmed directly from the better-auth adapter's Zod schema — `discountId`, `allowDiscountCodes`, `organizationId` (a better-auth org, not a Polar one), `seats`/`minSeats`/`maxSeats`, and trial fields (`allowTrial`, `trialInterval`, `trialIntervalCount`). [Checkout sessions](https://polar.sh/docs/guides/create-checkout-session), [`CheckoutParams` source](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/checkout.ts)

The customer portal is Polar-hosted and cannot be disabled; from it a customer views subscriptions and order history, cancels or changes plans, updates the payment method (portal-only, for PCI reasons), downloads invoices, and reaches benefits (license keys, files, Discord invites). Default auth is a one-time email code sent to the purchase email; the server can instead hand a customer a pre-authenticated portal link so a signed-in workspace member never re-authenticates with Polar. [Customer portal](https://polar.sh/docs/features/customer-portal)

## Discount codes: per-waitlist-email honouring

A discount is either percentage or fixed-amount, with a `duration` of once / a fixed number of months / forever for recurring products, an optional `code` (case-insensitive; omit it to make the discount API-only), `startsAt`/`endsAt`, and `maxRedemptions` across all customers. Reading the discount object's own schema directly from the SDK source shows no field that scopes a discount to one customer, email, or external ID — `DiscountFixedOnceForeverDurationBase` carries only `duration`, `type`, `amounts`, `id`, `metadata`, `name`, `code`, `startsAt`, `endsAt`, `maxRedemptions`, `redemptionsCount`, `organizationId`. [`discountfixedonceforeverdurationbase.ts`](https://github.com/polarsource/polar-js/blob/main/src/models/components/discountfixedonceforeverdurationbase.ts)

Per-customer redemption limits exist (a separate cap on how many times one customer can use a given code), and Polar identifies "the same customer" by matching any of: external customer ID, email (with plus-alias normalization), or the card used. [Discounts](https://polar.sh/docs/features/discounts)

Because there is no email-restriction field, honouring an early-bird promise made to a waitlist address at sign-up time is entirely Prismark's job at the application layer, in one of two shapes:
- **One code per waitlist email**: the server calls the discounts create endpoint once per signup (`POST /v1/discounts`, `discounts:write` scope) and stores the resulting `code`/`id` against that waitlist row; at sign-up the server looks up the row by email and passes that `discountId` into the checkout session it builds — no code entry by the customer required.
- **One shared code**: mint a single code with `maxRedemptions` equal to the waitlist size (or unlimited) and let anyone with the link redeem it; this does not restrict redemption to waitlist emails, only to a count, so it does not by itself honour a promise tied to a specific address.

Discounts can also be preset on a checkout link so it is auto-applied without the customer typing a code, and passed as `discount_id` when a checkout session is created via the API — both routes stack with `allowDiscountCodes` on the better-auth checkout endpoint. [Discounts](https://polar.sh/docs/features/discounts), [`checkout.ts` source](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/checkout.ts)

## Webhooks on Workers: signature verification, events for plan state

Polar signs every webhook delivery per the Standard Webhooks spec: `webhook-id`, `webhook-timestamp`, and `webhook-signature` headers, the signature an HMAC-SHA256 over the payload keyed by the endpoint's configured secret. [Webhook delivery & security](https://polar.sh/docs/integrate/webhooks/endpoints)

The JS SDK verifies this with `validateEvent(body, headers, secret)` from `@polar-sh/sdk/webhooks`, throwing `WebhookVerificationError` on failure (the caller should answer with 403). Reading the SDK's `webhooks.ts` source directly shows it wraps the `standardwebhooks` npm package's `Webhook` class and re-exports its `WebhookVerificationError`. [`webhooks.ts` source](https://github.com/polarsource/polar-js/blob/main/src/webhooks.ts) The `standardwebhooks` package's own npm listing shows its only two runtime dependencies are `fast-sha256` and `@stablelib/base64` — both pure-JS implementations, not bindings to Node's `crypto` module — so signature verification should run on a Cloudflare Worker as-is, with no `nodejs_compat` flag needed. This directly contradicts the ticket's premise that webhook verification might need Node APIs; nothing found here requires them. [`standardwebhooks` on npm](https://www.npmjs.com/package/standardwebhooks)

Events relevant to plan state, as listed in Polar's webhook events reference and cross-checked against the full set of payload types imported by the better-auth adapter's `webhooks.ts`: `subscription.created`, `subscription.active`, `subscription.updated`, `subscription.canceled` (immediate or end-of-period), `subscription.uncanceled`, `subscription.revoked`, `subscription.past_due`, alongside `checkout.created`/`checkout.updated`/`checkout.expired` and `order.created`/`order.paid`/`order.updated`/`order.refunded` for the purchase itself, and `customer.state_changed` as a rolled-up "something about this customer's entitlements changed" event. [Webhook events](https://polar.sh/docs/integrate/webhooks/events), [`webhooks.ts` source](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/webhooks.ts)

## The better-auth Polar plugin: what it takes over versus what the server still does

The `@polar-sh/better-auth` (published from the `polarsource/polar-adapters` repo, package `polar-betterauth`) plugin is composed from four independently opt-in sub-plugins passed in a `use` array — `checkout`, `portal`, `usage`, `webhooks` — plus root-level options on `PolarOptions`: `client` (a `Polar` SDK instance), `createCustomerOnSignUp`, `getCustomerCreateParams`, and `experimental_organizationSync`. [`types.ts` source](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/types.ts)

Takes over:
- Turning a signed-up better-auth `User` into a Polar customer automatically, keyed by `externalId`, when `createCustomerOnSignUp` is set.
- The `/checkout` endpoint: resolving a product by slug or ID list, enforcing `authenticatedUsersOnly`, forwarding `discountId`/`allowDiscountCodes`/seats/trial params to Polar, and redirecting.
- The `/portal` endpoint for handing an authenticated user a portal session.
- Usage event ingestion plumbing for metered products.
- A webhook receiver at `/api/auth/polar/webhooks` that verifies the signature via `validateEvent` and dispatches to per-event-type handlers (25+ `on*` callbacks plus a catch-all `onPayload`).

Still the server's job, confirmed by reading the source rather than the docs:
- Every `on*` webhook handler is just a typed callback signature in `WebhooksOptions` — the adapter parses and verifies the payload, but Prismark writes the actual "update this workspace's plan state" logic inside each handler.
- Mapping a waitlist email to a `discountId` before calling checkout — nothing in the adapter looks up discounts.
- `experimental_organizationSync`, which mirrors a better-auth **organization** (Prismark's workspace) to a Polar **team customer** (`CustomerTeamCreate`, `type: "team"`) and syncs members/seats, is explicitly marked experimental in its own doc comment: *"Do not enable this for applications that already handle organization billing. Existing billing data is not migrated and can become inconsistent with the newly synchronized Polar team customer."* [`types.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/types.ts), [`sync.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/organization/sync.ts), [`seats.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/organization/seats.ts)

This is the direct answer to "how does Polar handle a per-workspace subscription": there is no per-workspace Polar organization; a workspace becomes one Polar customer (individual or, opt-in and experimental, "team"), and that customer holds the subscription.

## Sandbox for tests, and how integration tests avoid hitting Polar

`sandbox.polar.sh` / `sandbox-api.polar.sh` is a fully separate deployment from production — its own account, organization, and access token; production tokens are rejected there. The SDK exposes a `server: "sandbox"` option to point at it instead of manually swapping the base URL. Card payments in sandbox still run through Stripe's test-card flow (e.g. `4242 4242 4242 4242`), and customer-facing emails there only deliver to members of the sandbox organization. [Sandbox](https://polar.sh/docs/integrate/sandbox)

Nothing in Polar's own docs describes a way to avoid the network entirely in integration tests — the sandbox is a real (if isolated) instance, not a mock. Given that, and the standing rule that local unit/integration runs must stay under ten seconds, integration tests exercising checkout/webhook code would need to fake the boundary themselves: construct `standardwebhooks`-signed fixture payloads locally (using a fixed secret) to drive the webhook handler without a network call, and stub the `Polar` SDK client for anything that creates checkouts/discounts, reserving the real sandbox for a slower, separate suite. This is Prismark's own test-architecture choice, not something found in Polar's material — flagged as such rather than cited as fact.

## What a self hosted instance sees when Polar is not configured

Polar's own docs have nothing to say here — there is no "unconfigured" or "disabled" mode in Polar itself, since Polar is external to the self-hosted app. This is purely a Prismark decision, already recorded in #3: *"Self hosted instance = the same app with billing off. Instance mode is one boot time question: is Polar configured."* Concretely, from what the better-auth adapter's shape allows: `use` is an array of sub-plugins built from a `Polar` client, so the natural implementation is to only construct that client and only pass the `use: [checkout(...), portal(...), webhooks(...)]` array into `betterAuth()`'s plugin list when a Polar API key (and org id) is present at module-scope boot — otherwise the whole Polar plugin is simply not registered, and every workspace on that instance is unconditionally on whatever the self-hosted default is. No Polar source confirms this pattern (it is outside their adapter's concern); it is inferred from the adapter's own composition API. [`index.ts` source](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/index.ts)

## Sequence: waitlist signup to discounted checkout

1. A visitor submits their email on `apps/landing`'s waitlist page. The server records the signup (per #3's decision, "the list lives in the server").
2. The server calls Polar's discounts API (`discounts:write`) to create one discount — percentage or fixed, `duration` chosen up front — either immediately per signup or in a batch job, and stores the returned `discountId` (and `code`, if one is set) against that waitlist row. [Discounts](https://polar.sh/docs/features/discounts)
3. Months later, the same email signs up for real (better-auth `signUp`) and, in the same or a following step, creates a workspace, becoming its first owner (#3's "Sign up" definition).
4. If `createCustomerOnSignUp` is enabled, the better-auth Polar plugin creates a Polar customer for the new user at that moment, `externalId` set to the better-auth user id. [`types.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/types.ts)
5. The server looks up the stored `discountId` for that signup email and calls the checkout endpoint with `products: [<the hosted plan's product id>]` and `discountId` set, so the discount is pre-applied — the customer never types a code. [`checkout.ts` source](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/checkout.ts)
6. The better-auth `/checkout` endpoint resolves the product, checks `authenticatedUsersOnly` if set, and redirects the browser to the Polar-hosted checkout URL, discount already reflected in the price.
7. The customer pays; Polar fires `checkout.updated` (confirmed) and `order.paid`/`subscription.created`, `subscription.active` webhooks in sequence toward the server's `/api/auth/polar/webhooks` endpoint. [Webhook events](https://polar.sh/docs/integrate/webhooks/events)
8. The server's `onSubscriptionActive` (or equivalent) handler — code Prismark writes, not the adapter — verifies the signature (already done by the adapter via `validateEvent`) and flips the workspace's plan state.
9. The workspace member can from then on reach Polar's customer portal (a pre-authenticated link, or the default one-time-email flow) to manage the plan, without the server building any billing UI of its own. [Customer portal](https://polar.sh/docs/features/customer-portal)

## Open questions

- **Glossary word for the hosted plan.** `CONTEXT.md` already reserves **Payment** for money in against a client invoice, so the workspace's own standing with Prismark needs a different word. Proposal: **Plan** — "the workspace's Plan" (e.g. Free plan, Pro plan), with a **Plan change** for upgrade/downgrade and **Early bird plan** or **Early bird discount** for the waitlist reward. *Avoid*: subscription (it's Polar's word for the underlying object, not the on-screen concept), billing, payment. This is a proposal for #3 to adopt into `CONTEXT.md`, not a decision made here.
- Whether `experimental_organizationSync` (workspace → Polar team customer) is trustworthy enough to build on given its own "experimental, do not enable over existing billing" warning, or whether Prismark should map workspace → Polar customer by hand instead and skip the adapter's organization sub-system entirely.
- Exact webhook event set the server needs to handle for "plan state" beyond the subscription lifecycle events found here (e.g. does a seat change on a team customer need its own handling, given `customer_seat.assigned`/`claimed`/`revoked` events exist in the SDK's webhook payload types but were not otherwise researched here).
- Whether a discount should be minted per waitlist signup immediately, or lazily at sign-up time — the API supports either; this is a product/ops choice, not something Polar's docs settle.
- How to fixture-test the webhook path without the sandbox, and whether that lives in `apps/server`'s existing test setup — flagged above as inferred, needs its own ticket.

## Sources

- [Products — Polar docs](https://polar.sh/docs/documentation/features/products)
- [Create Checkout Session — Polar docs](https://polar.sh/docs/guides/create-checkout-session)
- [Discounts — Polar docs](https://polar.sh/docs/features/discounts)
- [Customer Portal — Polar docs](https://polar.sh/docs/features/customer-portal)
- [Webhook delivery & security — Polar docs](https://polar.sh/docs/integrate/webhooks/endpoints)
- [Webhook events — Polar docs](https://polar.sh/docs/integrate/webhooks/events)
- [Sandbox — Polar docs](https://polar.sh/docs/integrate/sandbox)
- [BetterAuth adapter — Polar docs](https://polar.sh/docs/integrate/sdk/adapters/better-auth)
- [`polarsource/polar-js`, `src/webhooks.ts`](https://github.com/polarsource/polar-js/blob/main/src/webhooks.ts)
- [`polarsource/polar-js`, `src/models/components/discountcreate.ts`](https://github.com/polarsource/polar-js/blob/main/src/models/components/discountcreate.ts)
- [`polarsource/polar-js`, `src/models/components/discountfixedonceforeverdurationbase.ts`](https://github.com/polarsource/polar-js/blob/main/src/models/components/discountfixedonceforeverdurationbase.ts)
- [`polarsource/polar-adapters`, `packages/polar-betterauth/src/plugins/checkout.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/checkout.ts)
- [`polarsource/polar-adapters`, `packages/polar-betterauth/src/plugins/webhooks.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/webhooks.ts)
- [`polarsource/polar-adapters`, `packages/polar-betterauth/src/types.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/types.ts)
- [`polarsource/polar-adapters`, `packages/polar-betterauth/src/index.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/index.ts)
- [`polarsource/polar-adapters`, `packages/polar-betterauth/src/organization/types.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/organization/types.ts)
- [`polarsource/polar-adapters`, `packages/polar-betterauth/src/organization/seats.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/organization/seats.ts)
- [`polarsource/polar-adapters`, `packages/polar-betterauth/src/organization/sync.ts`](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/organization/sync.ts)
- [`standardwebhooks` package — npm registry](https://www.npmjs.com/package/standardwebhooks)

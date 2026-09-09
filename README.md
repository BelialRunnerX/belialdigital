# Belial Digital — Print on Demand Store

Gothic clothing house rebuilt from the original Belial Digital catalog. This version actually charges (Stripe) and actually prints (Printful).

Without API keys the same path still runs: a mock Stripe desk takes the order and a mock printer records the Printful payload. Plug in live keys when you are ready.

## What you get

- Catalog from the original store: tees, hoodie, longsleeve, joggers, cap, beanie, poster, mug, tote, plus studio cloak / trousers / jewelry / scarf
- Size selection, bag, checkout, order lookup
- Stripe Checkout when `STRIPE_SECRET_KEY` is set
- Printful order created on `checkout.session.completed` (or immediately after mock pay)
- Studio queue for pieces Printful cannot print
- `/studio` desk to inspect printer jobs (default local key: `devotion`)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

`npm run dev` uses webpack so the store hydrates even when the Turbopack HMR websocket is blocked (common in some cloud previews). If clicks still do nothing, use the production server:

```bash
npm run build
npm start
```

```bash
npm test
npm run build
```

## Stripe

1. Create a Stripe account and copy the secret key into `STRIPE_SECRET_KEY`.
2. Set `NEXT_PUBLIC_APP_URL` to the public origin (needed for redirects and print-file URLs).
3. Add a webhook for `checkout.session.completed` pointing at `/api/webhooks/stripe`, and put the signing secret in `STRIPE_WEBHOOK_SECRET`.
4. Use test cards (`4242…`) until you switch to `sk_live_`.

If those variables are missing, checkout opens `/checkout/mock` instead. That mock still fulfills through the printer adapter.

## Printful

1. Create a Printful store and an API token (`PRINTFUL_API_KEY`).
2. Optional: `PRINTFUL_STORE_ID` if the token is account-level.
3. `PRINTFUL_AUTO_CONFIRM=true` sends paid orders straight to production. Leave it unset to create drafts you can review in the Printful dashboard.
4. Register `/api/webhooks/printful?secret=…` for `package_shipped` so tracking lands on the order page.

Print files live in `/public/prints` and are attached as Printful catalog items (Bella + Canvas 3001, Gildan 18500, Yupoong caps, etc.). Printful needs a **public** URL to fetch those files, so deploy before confirming live orders.

## Environment

See `.env.example`. Never commit live secrets.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Public site origin |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Verify Stripe webhooks |
| `PRINTFUL_API_KEY` | Printer API |
| `PRINTFUL_STORE_ID` | Store scope |
| `PRINTFUL_AUTO_CONFIRM` | Confirm Printful drafts |
| `PRINTFUL_WEBHOOK_SECRET` | Verify printer webhooks |
| `ADMIN_SECRET` | `/studio` desk key |
| `ALLOW_MOCK_PAY` | Keep mock pay while Stripe is configured |

## Stack

Next.js (App Router), TypeScript, Tailwind, shadcn/ui, Stripe, Printful.

Orders are stored in `data/orders.json` on a long-running server. On Vercel that file will not persist across instances — Stripe + Printful remain the source of truth once keys are live.

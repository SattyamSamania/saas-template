# BrandMyWallet

BrandMyWallet is a paid public leaderboard: the highest-paid visible wallet/project is #1. Every new checkout is priced server-side at the current top amount + $1 (or $1 when empty).

## Stack
Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Dodo Payments, Zod, Vitest.

## Local setup
```bash
npm install
cp .env.example .env
# fill DATABASE_URL and Dodo test credentials
npm run db:generate
npm run db:migrate
npm run dev
```

Checks:
```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Environment
- `DATABASE_URL`: Postgres connection string.
- `DODO_PAYMENTS_API_KEY`: Dodo test/live API key.
- `DODO_PAYMENTS_ENVIRONMENT`: `test_mode` or `live_mode`.
- `DODO_PRODUCT_ID`: one-time Dodo product used with dynamic pricing.
- `DODO_WEBHOOK_SECRET`: webhook signing secret.
- `NEXT_PUBLIC_APP_URL`: deployed origin, e.g. `https://brandmywallet.com`.
- `ADMIN_SECRET`: reserved for protected admin operations.

## Dodo setup
Create a one-time product in Dodo and copy its product ID into `DODO_PRODUCT_ID`. Dynamic pricing overrides the product's amount at checkout; USD amounts are cents. Configure a webhook to `https://YOUR_DOMAIN/api/webhooks/dodo` and subscribe to `payment.succeeded`, `payment.failed`, and `payment.cancelled`. Copy the generated signing secret to `DODO_WEBHOOK_SECRET`. Dodo uses Standard Webhooks signatures and retries non-2xx responses.

## Ranking and concurrency
Money is integer cents. Public queries only select `PAID + VISIBLE`, sorted by amount descending and paidAt ascending. Checkout creation takes a PostgreSQL-backed singleton lock and reserves an amount for 30 minutes, so concurrent checkout creation receives increasing prices. A successful webhook checks the actual paid amount/currency and rechecks that the entry still beats the current visible #1 before transitioning PENDING → PAID. This prevents a stale checkout from silently taking #1. Webhook processing is idempotent using the entry's processed timestamp and unique payment ID.

## Security
The browser never supplies an accepted amount. `/api/checkout` recalculates it from Postgres. Webhooks verify the raw request with Standard Webhooks before parsing. User input is Zod-validated and rendered as React text; only HTTP(S) URLs are accepted. Pending/failed/hidden records never appear publicly. No secrets are exposed to client code.

## Production
1. Create a Postgres database and set `DATABASE_URL` in Vercel.
2. Set all Dodo variables in Vercel; use `live_mode` only after test checkout verification.
3. Set `NEXT_PUBLIC_APP_URL` to the production origin.
4. Deploy and run `npm run db:deploy` against the production database (or run it as your deployment migration step).
5. Create the Dodo webhook using `https://YOUR_DOMAIN/api/webhooks/dodo`.
6. Keep `.env` local and never commit credentials.

## Important
If Dodo credentials/product ID are missing, checkout fails safely with a generic error; there is no fake payment path.

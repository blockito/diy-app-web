# DIY Guide — landing page

Promotional site for the DIY Guide mobile app. Next.js (App Router), TypeScript,
Tailwind, Framer Motion, Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## The palette is not a guess

Colours in `tailwind.config.ts` are lifted from the app's own `src/theme.js`, so the
site and the product look like the same thing rather than two designs that happen to
agree about green. Junge sets the headlines, Judson the titles, Inter anything that has
to be read rather than admired.

## Deploying it

Nothing here has ever been deployed; it has only ever run on localhost, which
means the waitlist has never collected an address from anybody.

The page is static and `/api/waitlist` is one serverless function, which is
exactly Vercel's free tier. Next.js needs no configuration file for it.

```bash
npm i -g vercel
vercel login          # "Continue with GitHub", as blockito
vercel --prod         # first run asks to link the repo; accept the defaults
```

Then set **one** environment variable in the Vercel project (Settings →
Environment Variables), or the deployed page will accept addresses and store
none of them — see the next section for what each does:

| | |
| --- | --- |
| `FORMSPREE_ENDPOINT` | simplest; needs a free Formspree form |
| `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` | writes to the same Supabase project the app uses |

The service key is a secret and belongs in Vercel's dashboard, never in this
repo and never on a laptop. Redeploy after setting it.

A custom domain goes in the same settings page. `diyguide.app` is registered
but parked at GoDaddy, so pointing it here is a nameserver change.

**If you would rather not create a hosting account**, the alternative is a
static export on GitHub Pages — this repo is public, so that is free — with the
waitlist moved to a `POST /waitlist` on the FastAPI backend, which already runs
and already holds Supabase credentials. It costs an architecture change and
leaves you on a `github.io` URL until a domain is pointed at it.

## The waitlist actually has to work

`app/api/waitlist/route.ts` validates the address and then stores it with whichever
provider is configured:

| Variable | Effect |
| --- | --- |
| `FORMSPREE_ENDPOINT` | Posts to a Formspree form, e.g. `https://formspree.io/f/xxxxxxxx` |
| `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` | Inserts into a `waitlist` table |

**With neither set, an address is logged to the server console and not stored**, and the
reply says `persisted: false` — so the form tells the visitor that too, in a developer
note, rather than thanking them for something that went nowhere. Put one of the above in
`.env.local` before showing this to anyone real.

For the Supabase route, create the table first:

```sql
create table if not exists public.waitlist (
  email      text primary key,
  created_at timestamptz not null default now()
);
alter table public.waitlist enable row level security;
-- No policy: only the service key writes here, and nothing reads it from the browser.
```

## Before it goes live

- The App Store and Google Play buttons say **coming soon** and link nowhere, because
  the app is not on either store yet. A dead store button is the fastest way to lose
  someone who was ready to wait for you — swap them for real links when there are some.
- `/terms` is referenced in the footer and does not exist yet.
- The support address and social links in `components/Closing.tsx` are placeholders.

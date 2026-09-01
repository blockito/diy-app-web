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

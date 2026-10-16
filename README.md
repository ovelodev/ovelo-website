# Ovelo AI website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static site written to ./out
npx serve@14.2.4 out   # preview the built site
npm run lint
```

The site is a fully static export (`output: "export"` in `next.config.ts`), so it can be hosted for free.

## Deploying for free

### GitHub Pages (set up already)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Create a **public** repository on GitHub, e.g. `ovelo-website` (Pages is free for public repos).
2. Push this folder to it:
   ```bash
   git add -A && git commit -m "Ovelo AI website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ovelo-website.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Wait for the **Actions** tab to show a green tick. The site is then live at
   `https://<your-username>.github.io/ovelo-website/`.

The workflow sets the sub-path (`/ovelo-website`) and the site URL automatically. If you later connect a custom domain under Settings → Pages, it switches to the root path on its own.

### Alternatives (also free)

Vercel, Netlify and Cloudflare Pages each give a free `*.vercel.app` / `*.netlify.app` / `*.pages.dev` address. Import the repo, keep the build command `npm run build`, set the output directory to `out`, and set `NEXT_PUBLIC_SITE_URL` to the address you're given.

### Static-hosting rules

Keep the site compatible with static export: no API routes, server actions or server-side `searchParams`, and use `next/link` (not raw `<a href="/...">`) for internal links so the GitHub Pages sub-path is applied.

## Where things live

| What | File |
| --- | --- |
| Product catalogue (single source of truth) | `src/data/products.ts` |
| Focus areas and principles copy | `src/data/brand.ts` |
| Site name, contact email, social links, legal date | `src/lib/site.ts` |
| Pages | `src/app/**/page.tsx` |
| Motion primitives (reveal, spotlight, magnetic, scroll progress) | `src/components/motion/` |

**Adding a product:** add an entry to `products` in `src/data/products.ts`. It automatically gets a card on `/products`, a `/products/[slug]` page, footer and support links, and a sitemap entry. Store buttons only render when `status` is `"available"`. Category filters appear automatically once there are 6 or more products.

## Animation and accessibility

- Every Framer Motion animation respects `prefers-reduced-motion` (via `MotionConfig reducedMotion="user"`), and CSS keyframes are disabled under the same preference. Parallax and tilt effects switch off completely.
- Animations use `transform`/`opacity` only, with no layout-thrashing properties.
- Skip link, visible focus states, labelled form fields with linked errors, semantic headings (one `h1` per page).

## Contact form

There is no form backend yet. The form validates input in the browser, runs basic spam checks (a honeypot field and a minimum fill time), then opens the visitor's email app with the message pre-filled. Nothing is stored on the site, and the Privacy Policy says so. If you add a form provider later, update `src/components/contact/ContactForm.tsx` **and** the Privacy Policy.

## Before launch (requirements §11–12)

- [x] Official contact/support address set in `src/lib/site.ts` (ovelo.dev@gmail.com).
- [ ] Swap the logo in `src/components/brand/Logo.tsx`, `src/app/icon.svg`, `src/app/apple-icon.tsx` and `src/app/opengraph-image.tsx` for the final logo files, if they differ.
- [ ] Confirm product details, statuses and store links in `src/data/products.ts`.
- [ ] Add official social profiles to `site.social` (only ones that exist).
- [x] Hosting (GitHub Pages) and email (Gmail) providers named in `src/app/privacy/page.tsx`.
- [ ] Have the Privacy Policy and Terms reviewed for your jurisdictions.
- [ ] Deploy (see above). GitHub Pages and the alternatives all serve over HTTPS.

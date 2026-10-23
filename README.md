# Red Rose Figure Skating Club website

Static site for [rrfsc.org](https://www.rrfsc.org), built with [Astro](https://astro.build) and hosted on GitHub Pages.

## How content works

Every fact lives in one place under `src/content/`, and the pages read from there:

| Folder | What it holds | Shown on |
| --- | --- | --- |
| `sessions/` | Learn to Skate sessions (dates, price, classes, RegFox links) | Home, Learn to Skate |
| `events/` | Competitions, shows, fundraisers | Events |
| `announcements/` | Short notices with an expiry date | Home |
| `coaches/` | One file per coach | Coaches |
| `faqs/` | One file per question | FAQs |
| `board/` | Board members | About, Contact |
| `settings/` | Club details, freestyle schedule and rates, test info, membership rates | Everywhere |

Sessions, events and announcements with a past date disappear on their own. A nightly rebuild (see `.github/workflows/deploy.yml`) keeps that current even when nobody edits anything.

## Editing without code

Volunteers use [Pages CMS](https://app.pagescms.org): sign in with GitHub, open this repo, and edit through forms. `.pages.yml` defines what they see. Each save is a commit to `main`, which republishes the site in about a minute.

## Developing

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
```

## Launch checklist

- [ ] Copy coach headshots to `public/images/coaches/` and fill in `src/content/coaches/*.yaml`
- [ ] Copy PDFs (Ice Rules, Drop Off Policy, FAQ docs, newsletters) to `public/docs/`
- [ ] Put the Google Calendar ID in `src/pages/calendar.astro`
- [ ] Settings > Pages: source "GitHub Actions"; custom domain `www.rrfsc.org`; enforce HTTPS
- [ ] GoDaddy DNS: `www` CNAME to `jpas116.github.io`, apex A records to GitHub Pages IPs. Do not touch MX records.
- [ ] Re-verify Google Search Console and submit `/sitemap-index.xml`

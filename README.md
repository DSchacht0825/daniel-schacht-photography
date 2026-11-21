# Daniel Schacht Photography

Static site (GitHub Pages, custom domain in `CNAME`). Redesigned Nov 2026 around
StoryBrand: the client is the hero, Daniel is the guide.

## Pages
- `index.html`: home (hero → problem → guide → 3-step plan → work strip → stakes → CTA)
- `about.html`: Daniel's story and promises
- `work.html`: filterable gallery with a lightbox (`images/work/wNN.jpg` + `wNN-full.jpg`)
- `pricing.html`: sessions, add-ons, FAQ
- `contact.html`: booking form (Formspree) and text/email links
- `services.html`: redirects to `pricing.html`

## Assets
- `site.css` / `site.js`: all styling and behavior
- `images/site/`: section photos (hero, problem, guide, strip, about, cta), og image, icons
- Photo rule: **only Fujifilm-shot images** (X-T4 `DSCF*` / `_DSF*`)

To add a gallery photo, export it at 900px (grid) and 2000px (`-full`) to
`images/work/`, then copy one of the `<figure>` lines in `work.html`.

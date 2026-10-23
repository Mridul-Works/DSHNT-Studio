# DSHNT Studio

Portfolio and booking site for Dishant's photography. Next.js 16 with Lenis smooth scroll. No other runtime dependencies.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Make it Dishant's

Everything you'd normally edit lives in one file: `src/data/site.ts`.

- **Photos** — put his pictures in `public/work/` and point each entry in `frames` at them (`src: "/work/portrait-01.jpg"`). Set `ratio` to the real width ÷ height so the wall lays out without jumping, and `select: true` on the shots he'd show first (they're labelled "Pick"). `aperture.src` is the square photo revealed inside the big orange aperture.
- **Headline, about copy, services, process** — same file.
- **Social links** — `site.socials`.

## Leads

Enquiries POST to `/api/enquiry`. Copy `.env.example` to `.env.local`:

- `LEAD_WEBHOOK_URL` — every enquiry is forwarded here as JSON (Google Apps Script, Zapier, Make, a Slack/Discord webhook…). Without it, leads are only printed to the server log.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — digits only with country code. Shows the WhatsApp buttons, pre-filled with whatever the visitor typed.

## How the page works

| Section | What's going on |
| --- | --- |
| Hero | Two-line headline set very large and tight, lines rise in on load. |
| Selected work | A wall of prints in columns with mixed aspect ratios, category tabs, mono captions. Click a print for the lightbox and a synthesised shutter click. |
| The instrument | The signature: a giant flat orange nine-blade aperture (SVG) driven by scroll. It opens from f/16 to f/1.8 over the section, revealing a photo; the readout ticks through real stops. |
| About | Short copy and a facts list. |
| Services | Numbered groups, each row with an "Enquire" pill that pre-fills the form. Hovering a group floats a print beside the pointer. |
| Book a shoot | The form carries a light meter: the needle reaches 0 ("correct exposure") once name, phone and shoot type are filled. |

Reduced-motion users get everything static.

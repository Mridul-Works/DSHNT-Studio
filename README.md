# DSHNT Studio

Portfolio and booking site for Dishant's photography. Next.js 16, Lenis smooth scroll, three.js via React Three Fiber.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Make it Dishant's

Everything you'd normally edit lives in one file: `src/data/site.ts`.

- **Photos** — put his pictures in `public/work/` and point each entry in `frames` at them (`src: "/work/portrait-01.jpg"`). Portrait orientation (4:5) looks best. Set `select: true` on the shots he'd circle on a contact sheet; those get the red grease-pencil ring in the 3D roll. `hero.src` is the big photo inside the aperture.
- **Services, story, process copy** — same file.
- **Social links** — `site.socials`.

## Leads

Enquiries POST to `/api/enquiry`. Copy `.env.example` to `.env.local`:

- `LEAD_WEBHOOK_URL` — every enquiry is forwarded here as JSON (Google Apps Script, Zapier, Make, a Slack/Discord webhook…). Without it, leads are only printed to the server log.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — digits only with country code. Shows the "Message on WhatsApp" button, pre-filled with whatever the visitor typed.

## How the page works

| Section | What's going on |
| --- | --- |
| Hero | A nine-blade mechanical iris built in three.js. It opens on load, follows the pointer slightly, and closes again as you scroll — the hero ends in black like a shutter. |
| The roll | The portfolio as cut negatives floating in a dark room. Vertical scroll drives the camera along the strip. Each frame is a canvas texture (film base, sprockets, number, photo, pencil circle). Click a frame for the lightbox and a synthesised shutter click. |
| Story | Words develop from grey to ink as you scroll, beside the receipt for the first camera. |
| Services | Hovering a group floats a print beside the pointer. Clicking a service pre-fills the booking form. |
| Book a shoot | The form carries a light meter: the needle reaches 0 ("correct exposure") once name, phone and shoot type are filled. |

Reduced-motion users get the iris already open and no animation. The reticle cursor only appears on mouse devices.

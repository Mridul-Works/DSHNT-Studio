import { site } from "@/data/v2/site";

// `home` is "" on /v2 itself and "/v2" on other v2 pages (see Header).
export default function Footer({ home = "" }: { home?: string }) {
  return (
    <footer className="footer">
      <div className="rule">
        <span className="rule__live">
          <i />
          {site.name}
        </span>
        <span className="rule__line" />
        <span className="rule__end">{site.year}</span>
      </div>
      <div className="footer__grid">
        <h2 className="h2">
          Let’s make
          <br />
          something worth
          <br />
          keeping.
        </h2>
        <div className="footer__cta">
          <a href={`${home}#book`} className="pill pill--dark pill--lg">
            Book a shoot
          </a>
          {site.whatsapp && (
            <a className="pill pill--lg" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp ↗
            </a>
          )}
        </div>
      </div>
      <div className="footer__row mono">
        <span>{site.tagline}</span>
        <nav aria-label="Social">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label} ↗
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

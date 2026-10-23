import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__mark">{site.tagline}</p>
      <div className="footer__row">
        <span className="mono">© {new Date().getFullYear()} {site.name}</span>
        <nav aria-label="Social">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

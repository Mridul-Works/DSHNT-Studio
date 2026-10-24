import { hero } from "@/data/v2/site";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <h1 className="hero__title">
        <span className="line">
          <span style={{ "--i": 0 } as React.CSSProperties}>{hero.lineA}</span>
        </span>
        <span className="line">
          <span style={{ "--i": 1 } as React.CSSProperties}>{hero.lineB}</span>
        </span>
      </h1>
      <p className="hero__sub">{hero.sub}</p>
    </section>
  );
}

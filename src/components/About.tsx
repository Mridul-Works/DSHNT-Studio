import { about } from "@/data/site";

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="about__grid">
        <h2 className="h2">
          {about.headline[0]}
          <br />
          {about.headline[1]}
        </h2>
        <div className="about__text">
          {about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <dl className="facts">
            {about.facts.map(([k, v]) => (
              <div key={k} className="facts__row">
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <a href="#book" className="pill pill--dark">
            Work with Dishant
          </a>
        </div>
      </div>
    </section>
  );
}

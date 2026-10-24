import Image from "next/image";
import { about } from "@/data/v2/site";

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="about__grid">
        <div>
          <h2 className="h2">
            {about.headline[0]}
            <br />
            {about.headline[1]}
          </h2>

          <figure className="about__photos">
            <div className="about__photo about__photo--main">
              <Image src={about.portrait.src} alt={about.portrait.alt} fill sizes="(max-width: 860px) 60vw, 320px" />
            </div>
            {about.more.map((p) => (
              <div className="about__photo" key={p.src}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 860px) 40vw, 240px" />
              </div>
            ))}
            <figcaption className="mono">{about.caption}</figcaption>
          </figure>
        </div>

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

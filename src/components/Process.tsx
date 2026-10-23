import { steps } from "@/data/site";

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="section__head">
        <h2 className="h2">
          How a shoot
          <br />
          works
        </h2>
        <p className="section__lede">Four steps, start to finish. Most shoots are booked within a week.</p>
      </div>
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.title} className="step">
            <span className="mono">0{i + 1}</span>
            <h3 className="step__title">{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

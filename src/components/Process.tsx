import { steps } from "@/data/site";

export default function Process() {
  return (
    <section className="section process" data-tone="light">
      <p className="eyebrow">How a shoot works</p>
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.title} className="step">
            <span className="step__no mono">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="step__title">{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { allServiceNames, site } from "@/data/v2/site";
import { SERVICE_EVENT } from "./Services";

type Status = "idle" | "sending" | "sent" | "error";

// The form carries a light meter. Each required field you fill moves the
// needle toward 0: correct exposure means the enquiry is ready to send.
const REQUIRED = 3;
const PHONE = /^[0-9+\s-]{7,16}$/;

export default function EnquiryForm() {
  const [service, setService] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [missing, setMissing] = useState<string[]>(["name", "phone", "type of shoot"]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onPick = (e: Event) => {
      setService((e as CustomEvent<string>).detail);
      requestAnimationFrame(measure);
    };
    window.addEventListener(SERVICE_EVENT, onPick);
    return () => window.removeEventListener(SERVICE_EVENT, onPick);
  }, []);

  const readForm = () => Object.fromEntries(new FormData(formRef.current!)) as Record<string, string>;

  const measure = () => {
    if (!formRef.current) return;
    const f = readForm();
    const m: string[] = [];
    if (!f.name?.trim()) m.push("name");
    if (!PHONE.test(f.phone ?? "")) m.push("phone");
    if (!f.service) m.push("type of shoot");
    setMissing(m);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readForm()),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "The enquiry couldn’t be sent. Check your connection and try again.");
      setStatus("sent");
      formRef.current?.reset();
      setService("");
      setMissing(["name", "phone", "type of shoot"]);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "The enquiry couldn’t be sent.");
    }
  };

  const whatsappHref = () => {
    const f = formRef.current ? readForm() : {};
    const lines = [
      `Hi Dishant, I'd like to book a shoot with DSHNT Studio.`,
      f.service && `Shoot: ${f.service}`,
      f.date && `Date: ${f.date}`,
      f.city && `Location: ${f.city}`,
      f.message && `Details: ${f.message}`,
      f.name && `— ${f.name}`,
    ].filter(Boolean);
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const filled = REQUIRED - missing.length;
  const ev = -3 + (filled / REQUIRED) * 3; // -3 (nothing filled) → 0 (ready)
  const ready = missing.length === 0;

  return (
    <section className="section book" id="book">
      <div className="book__intro">
        <p className="eyebrow">Book a shoot</p>
        <h2 className="h2">
          Tell Dishant
          <br />
          what you want
          <br />
          to shoot
        </h2>
        <p>
          Share a few details and Dishant will reply with availability and a quote. Not sure which kind of shoot you
          need? Describe the idea in the message.
        </p>
        {site.whatsapp && (
          <a
            className="pill pill--dark"
            href={`https://wa.me/${site.whatsapp}`}
            onClick={(e) => (e.currentTarget.href = whatsappHref())}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message on WhatsApp ↗
          </a>
        )}
      </div>

      {status === "sent" ? (
        <div className="form form--done" role="status">
          <p className="eyebrow eyebrow--orange">Enquiry sent</p>
          <h3>Dishant will get back to you on the number you shared.</h3>
          <button type="button" className="pill" onClick={() => setStatus("idle")}>
            Send another enquiry
          </button>
        </div>
      ) : (
        <form ref={formRef} className="form" onSubmit={onSubmit} onInput={measure} onChange={measure}>
          <div className="meter field--wide" aria-live="polite">
            <div className="meter__scale" aria-hidden="true">
              {[-3, -2, -1, 0, 1, 2, 3].map((v) => (
                <span key={v} className={v === 0 ? "meter__tick meter__tick--zero" : "meter__tick"}>
                  {v > 0 ? `+${v}` : v}
                </span>
              ))}
              <i className="meter__needle" style={{ left: `${((ev + 3) / 6) * 100}%` }} />
            </div>
            <p className="meter__label mono">
              {ready ? "Correct exposure · ready to send" : `Underexposed · still needs ${missing.join(", ")}`}
            </p>
          </div>

          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone / WhatsApp</label>
            <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+\s\-]{7,16}" />
          </div>
          <div className="field field--wide">
            <label htmlFor="email">
              Email <span>(optional)</span>
            </label>
            <input id="email" name="email" type="email" autoComplete="email" />
          </div>
          <div className="field field--wide">
            <label htmlFor="service">Type of shoot</label>
            <select id="service" name="service" required value={service} onChange={(e) => setService(e.target.value)}>
              <option value="" disabled>
                Choose a service
              </option>
              {allServiceNames.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="date">
              Preferred date <span>(optional)</span>
            </label>
            <input id="date" name="date" type="date" />
          </div>
          <div className="field">
            <label htmlFor="city">
              Location <span>(optional)</span>
            </label>
            <input id="city" name="city" autoComplete="address-level2" />
          </div>
          <div className="field field--wide">
            <label htmlFor="message">Tell us about the shoot</label>
            <textarea id="message" name="message" rows={4} placeholder="The idea, how many people, the look you want…" />
          </div>
          {/* Honeypot for bots; hidden from people and screen readers. */}
          <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="form__footer">
            <button type="submit" className="pill pill--dark pill--lg" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
            {status === "error" && (
              <p className="form__error" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}

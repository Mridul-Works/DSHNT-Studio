import { NextResponse } from "next/server";

const FIELDS = ["name", "phone", "email", "service", "date", "city", "message"] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The enquiry was empty. Fill in the form and send it again." }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots don't retry.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const lead: Record<string, string> = {};
  for (const key of FIELDS) {
    const v = body[key];
    lead[key] = typeof v === "string" ? v.trim().slice(0, 2000) : "";
  }

  if (!lead.name || !lead.phone || !lead.service) {
    return NextResponse.json({ error: "Add your name, phone number and type of shoot." }, { status: 400 });
  }
  if (!/^[0-9+\s-]{7,16}$/.test(lead.phone)) {
    return NextResponse.json({ error: "Enter a phone number with 7 to 16 digits." }, { status: 400 });
  }

  const entry = { ...lead, receivedAt: new Date().toISOString(), source: "dshnt-website" };
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[enquiry] webhook failed", err, entry);
      return NextResponse.json(
        { error: "The enquiry couldn’t be delivered right now. Try again in a minute, or message on WhatsApp." },
        { status: 502 },
      );
    }
  } else {
    console.log("[enquiry] new lead (set LEAD_WEBHOOK_URL to forward these):", entry);
  }

  return NextResponse.json({ ok: true });
}

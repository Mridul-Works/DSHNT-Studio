// A synthesised SLR shutter: a sharp click, then the mirror slapping back.
// No audio file needed. Only ever called from a user gesture.

let ctx: AudioContext | null = null;

function burst(at: number, dur: number, gain: number, freq: number) {
  if (!ctx) return;
  const n = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.2);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = freq;
  f.Q.value = 0.8;
  const g = ctx.createGain();
  g.gain.value = gain;
  src.connect(f).connect(g).connect(ctx.destination);
  src.start(at);
}

export function shutterClick() {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    burst(t, 0.022, 0.5, 2600);
    burst(t + 0.075, 0.04, 0.32, 900);
  } catch {
    // audio is a garnish; never let it break a click
  }
}

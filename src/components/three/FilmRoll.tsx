"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Frame } from "@/data/site";

// The portfolio as a strip of cut negatives hanging in a dark room. Vertical
// scroll drives the camera along the strip; each frame is one canvas texture
// (film base, sprockets, number, the photo, and a grease-pencil circle on
// Dishant's picks) so the whole roll is one draw call per frame.

export const SPACING = 2.05;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Props = {
  frames: Frame[];
  active: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
  onActive: (i: number) => void;
  onOpen: (i: number) => void;
  onHover: (hovering: boolean) => void;
};

/* ---------- card texture ---------- */
const W = 512, H = 680;
const INSET = { x: 24, y: 48, w: 464, h: 580 }; // 4:5

function drawBase(ctx: CanvasRenderingContext2D, no: number) {
  ctx.fillStyle = "#0e0f10";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(233,234,228,0.85)";
  for (let x = 10; x < W - 14; x += 32) {
    ctx.beginPath();
    ctx.roundRect(x, 12, 16, 16, 3);
    ctx.roundRect(x, H - 28, 16, 16, 3);
    ctx.fill();
  }
  ctx.fillStyle = "#1c1d20";
  ctx.fillRect(INSET.x, INSET.y, INSET.w, INSET.h);
  ctx.fillStyle = "#e39b1e";
  ctx.font = "500 15px ui-monospace, Menlo, monospace";
  ctx.textBaseline = "middle";
  ctx.fillText(`${no} ▸ ${no}A`, INSET.x, H - 36 - 0.5);
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(227,155,30,0.7)";
  ctx.fillText("DSHNT 400", W - INSET.x, H - 36 - 0.5);
  ctx.textAlign = "left";
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const ia = img.width / img.height, ra = INSET.w / INSET.h;
  let sw = img.width, sh = img.height, sx = 0, sy = 0;
  if (ia > ra) { sw = img.height * ra; sx = (img.width - sw) / 2; }
  else { sh = img.width / ra; sy = (img.height - sh) / 2; }
  ctx.drawImage(img, sx, sy, sw, sh, INSET.x, INSET.y, INSET.w, INSET.h);
}

function drawPencilCircle(ctx: CanvasRenderingContext2D, seed: number) {
  const cx = INSET.x + INSET.w / 2, cy = INSET.y + INSET.h / 2;
  const rx = INSET.w * 0.5, ry = INSET.h * 0.44;
  ctx.strokeStyle = "rgba(215,38,46,0.92)";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    const start = seed + pass * 0.4;
    for (let a = 0; a <= Math.PI * 2.08; a += 0.08) {
      const wob = Math.sin(a * 3 + seed) * 6 + Math.cos(a * 7 + pass) * 3;
      const x = cx + Math.cos(a + start) * (rx + wob + pass * 5);
      const y = cy + Math.sin(a + start) * (ry + wob - pass * 4);
      if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.globalAlpha = pass ? 0.55 : 1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function useCardTextures(frames: Frame[]) {
  return useMemo(() => {
    if (typeof document === "undefined") return [];
    return frames.map((f, i) => {
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;
      drawBase(ctx, i + 1);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        drawCover(ctx, img);
        if (f.select) drawPencilCircle(ctx, i);
        tex.needsUpdate = true;
      };
      img.onerror = () => {
        // keep the dark placeholder, still mark the pick
        if (f.select) drawPencilCircle(ctx, i);
        tex.needsUpdate = true;
      };
      img.src = f.src;
      return tex;
    });
  }, [frames]);
}

/* ---------- scene ---------- */
function layout(i: number) {
  return {
    x: i * SPACING,
    y: Math.sin(i * 0.9) * 0.16,
    z: Math.cos(i * 0.7) * 0.3,
    ry: Math.sin(i * 0.9) * 0.14,
  };
}

function Strip({ frames, sectionRef, onActive, onOpen, onHover }: Omit<Props, "active">) {
  const textures = useCardTextures(frames);
  const { camera, viewport } = useThree();
  // On narrow screens the whole strip shrinks so a frame fits across the view.
  const s = Math.min(1, viewport.aspect / 0.95);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const camX = useRef(0);
  const active = useRef(-1);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;

  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

  useFrame((state, dt) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < -vh || rect.top > vh * 2) return; // far off screen: skip the work
    const p = clamp01(-rect.top / (rect.height - vh));
    const target = p * (frames.length - 1) * SPACING;
    const k = 1 - Math.exp(-dt * 6);
    camX.current += (target - camX.current) * k;
    camera.position.x = camX.current * s;
    camera.position.y = Math.sin(camX.current * 0.45) * 0.06 * s;
    camera.lookAt(camX.current * s + 0.4 * s, 0, 0);

    const near = Math.round(camX.current / SPACING);
    if (near !== active.current) {
      active.current = near;
      onActive(near);
    }

    const t = state.clock.elapsedTime;
    meshes.current.forEach((m, i) => {
      if (!m) return;
      const L = layout(i);
      const d = L.x - camX.current;
      const isHover = hoveredRef.current === i;
      const s = isHover ? 1.06 : 1;
      m.scale.x += (s - m.scale.x) * k;
      m.scale.y += (s - m.scale.y) * k;
      m.position.y = L.y + Math.sin(t * 0.6 + i) * 0.015;
      m.rotation.y = L.ry + d * 0.09 + (isHover ? 0 : 0);
      m.rotation.z = Math.sin(t * 0.4 + i * 1.3) * 0.01;
    });
  });

  return (
    <group scale={[s, s, s]}>
      {frames.map((f, i) => {
        const L = layout(i);
        return (
          <mesh
            key={f.src}
            ref={(el) => {
              meshes.current[i] = el;
            }}
            position={[L.x, L.y, L.z]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(i);
              onHover(true);
            }}
            onPointerOut={() => {
              setHovered((h) => (h === i ? null : h));
              onHover(false);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(i);
            }}
          >
            <planeGeometry args={[1.5, (1.5 * H) / W]} />
            <meshBasicMaterial map={textures[i]} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function Dust({ length }: { length: number }) {
  const geo = useMemo(() => {
    const n = 420;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = Math.random() * (length + 6) - 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = Math.random() * 3 - 2.2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [length]);
  const pts = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pts.current) pts.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });
  return (
    <points ref={pts} geometry={geo}>
      <pointsMaterial color="#e39b1e" size={0.018} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Leak() {
  const tex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(227,155,30,0.55)");
    g.addColorStop(0.45, "rgba(215,38,46,0.18)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const sprite = useRef<THREE.Sprite>(null);
  const { camera } = useThree();
  useFrame((state) => {
    if (!sprite.current) return;
    const t = state.clock.elapsedTime;
    sprite.current.position.set(camera.position.x + Math.sin(t * 0.25) * 2.2, Math.cos(t * 0.2) * 1.2 + 0.4, -1.6);
  });
  if (!tex) return null;
  return (
    <sprite ref={sprite} scale={[7, 7, 1]}>
      <spriteMaterial map={tex} blending={THREE.AdditiveBlending} depthWrite={false} transparent />
    </sprite>
  );
}

export default function FilmRoll({ active, ...props }: Props) {
  return (
    <Canvas
      className="roll__canvas"
      camera={{ fov: 38, position: [0, 0, 4.1], near: 0.1, far: 30 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0e0f10"]} />
      <fog attach="fog" args={["#0e0f10", 4.5, 9]} />
      <Strip {...props} />
      <Dust length={(props.frames.length - 1) * SPACING} />
      <Leak />
    </Canvas>
  );
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

// A real mechanical iris: nine blades pivoting on a ring. Closed on load,
// it opens to reveal the photograph, then closes again as the page scrolls
// so the hero ends in black, like a shutter, before the film roll begins.

const BLADES = 9;
const THETA_MAX = 1.12; // radians each blade swings when fully open

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;

type Shared = {
  scroll: React.RefObject<number>; // 0..1, how far the hero has been scrolled away
  pointer: React.RefObject<{ x: number; y: number }>; // -1..1
  startedAt: React.RefObject<number>; // ms timestamp when the iris starts opening, 0 = not yet
  reduced: boolean;
};

// A leaf-shaped blade: pivot at the origin, tip at (L, 0). The fat convex
// edge (toward -y) is the one that sweeps the aperture, so nine of them
// open into a rounded polygon instead of a star.
function bladeGeometry(R: number) {
  const L = R * 1.18;
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(L * 0.5, -R * 0.8, L, 0);
  s.quadraticCurveTo(L * 0.5, R * 0.36, 0, 0);
  return new THREE.ExtrudeGeometry(s, {
    depth: 0.015,
    bevelEnabled: true,
    bevelSize: 0.006,
    bevelThickness: 0.004,
    bevelSegments: 2,
    curveSegments: 28,
  });
}

function Iris({ R, open }: { R: number; open: React.RefObject<number> }) {
  const geo = useMemo(() => bladeGeometry(R), [R]);
  const blades = useRef<(THREE.Group | null)[]>([]);
  const disc = useRef<THREE.Mesh>(null);
  const bladeMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#26282c", roughness: 0.5, metalness: 0.3 }),
    [],
  );
  const edgeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#e39b1e", transparent: true, opacity: 0.75 }),
    [],
  );

  useFrame(() => {
    const theta = open.current * THETA_MAX;
    blades.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.z = (i * Math.PI * 2) / BLADES + Math.PI + theta;
    });
    // leaf blades leave a pinhole when shut; a disc behind them seals it
    if (disc.current) {
      const m = disc.current.material as THREE.MeshBasicMaterial;
      m.opacity = 1 - Math.min(1, open.current / 0.14);
      disc.current.visible = m.opacity > 0.01;
    }
  });

  return (
    <group>
      {Array.from({ length: BLADES }, (_, i) => {
        const phi = (i * Math.PI * 2) / BLADES;
        return (
          <group
            key={i}
            ref={(el) => {
              blades.current[i] = el;
            }}
            position={[Math.cos(phi) * R, Math.sin(phi) * R, i * 0.0045]}
          >
            {/* amber edge: the same blade, a hair larger, sitting just behind */}
            <mesh geometry={geo} material={edgeMat} position={[0, 0, -0.003]} scale={[1.004, 1.03, 1]} />
            <mesh geometry={geo} material={bladeMat} />
          </group>
        );
      })}
      <mesh ref={disc} position={[0, 0, -0.03]}>
        <circleGeometry args={[R * 0.9, 64]} />
        <meshBasicMaterial color="#0b0c0d" transparent opacity={1} />
      </mesh>
      {/* lens barrel: hides the pivots and everything beyond the aperture ring */}
      <mesh position={[0, 0, 0.08]}>
        <ringGeometry args={[R * 0.8, R * 3.2, 128]} />
        <meshStandardMaterial color="#0b0c0d" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <torusGeometry args={[R * 0.8, R * 0.008, 12, 128]} />
        <meshStandardMaterial color="#9a9ea4" roughness={0.25} metalness={0.95} />
      </mesh>
    </group>
  );
}

const photoVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const photoFrag = /* glsl */ `
  uniform sampler2D map;
  uniform float time;
  uniform float aspect;
  uniform vec2 offset;
  uniform vec2 fit;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec2 uv = (vUv - 0.5) * fit + 0.5 + offset;
    vec2 c = uv - 0.5;
    float r = length(c * vec2(aspect, 1.0));
    float ab = 0.012 * r * r;
    vec3 col;
    col.r = texture2D(map, uv + c * ab).r;
    col.g = texture2D(map, uv).g;
    col.b = texture2D(map, uv - c * ab).b;
    float grain = hash(floor(gl_FragCoord.xy * 0.5) + fract(time) * 7.0) - 0.5;
    col += grain * 0.07;
    col *= smoothstep(1.25, 0.3, r);
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function Photo({ src, shared, onLoaded }: { src: string; shared: Shared; onLoaded: () => void }) {
  const { viewport, camera, size } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  // Built by hand rather than via <shaderMaterial uniforms>: R3F copies that
  // prop, so later mutations would never reach the material.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: photoVert,
        fragmentShader: photoFrag,
        uniforms: {
          map: { value: new THREE.Texture() },
          time: { value: 0 },
          aspect: { value: 1 },
          offset: { value: new THREE.Vector2() },
          fit: { value: new THREE.Vector2(1, 1) },
        },
      }),
    [],
  );
  const uniforms = material.uniforms as {
    map: { value: THREE.Texture };
    time: { value: number };
    aspect: { value: number };
    offset: { value: THREE.Vector2 };
    fit: { value: THREE.Vector2 };
  };

  // The plane sits behind the iris; size it to cover the view at its depth.
  const z = -0.45;
  const v = viewport.getCurrentViewport(camera, [0, 0, z]);
  const planeAspect = v.width / v.height;

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onLoaded();
    };
    loader.load(
      src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        uniforms.map.value = tex;
        const img = tex.image as { width: number; height: number };
        uniforms.map.value.userData.aspect = img.width / img.height;
        finish();
      },
      undefined,
      (err) => {
        console.warn("[hero] photo failed to load", src, err);
        finish();
      },
    );
    const t = setTimeout(finish, 5000);
    return () => clearTimeout(t);
  }, [src, uniforms, onLoaded]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, dt) => {
    uniforms.time.value = state.clock.elapsedTime;
    uniforms.aspect.value = planeAspect;
    const ia = (uniforms.map.value.userData.aspect as number | undefined) ?? planeAspect;
    // "object-fit: cover" done in UV space
    if (planeAspect > ia) uniforms.fit.value.set(1, ia / planeAspect);
    else uniforms.fit.value.set(planeAspect / ia, 1);
    const p = shared.pointer.current;
    const k = 1 - Math.exp(-dt * 4);
    uniforms.offset.value.x += (p.x * 0.025 - uniforms.offset.value.x) * k;
    uniforms.offset.value.y += (p.y * 0.025 - uniforms.offset.value.y) * k;
  });

  return (
    <mesh ref={mesh} position={[0, 0, z]} scale={[v.width * 1.08, v.height * 1.08, 1]} key={size.width} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

function Rig({ shared, onLoaded, src }: { shared: Shared; onLoaded: () => void; src: string }) {
  const { viewport } = useThree();
  const open = useRef(0);
  const group = useRef<THREE.Group>(null);
  const R = Math.min(viewport.width, viewport.height) * 0.72;

  useFrame((_, dt) => {
    const started = shared.startedAt.current;
    const load = shared.reduced ? (started ? 1 : 0) : started ? easeOutCubic(clamp01((performance.now() - started) / 1900)) : 0;
    const close = easeInCubic(clamp01(shared.scroll.current));
    open.current = load * (1 - close);
    if (group.current) {
      const p = shared.pointer.current;
      const k = 1 - Math.exp(-dt * 3);
      group.current.rotation.y += (p.x * 0.05 - group.current.rotation.y) * k;
      group.current.rotation.x += (-p.y * 0.05 - group.current.rotation.x) * k;
    }
  });

  return (
    <>
      <hemisphereLight args={["#ffffff", "#2a2420", 0.6]} />
      <directionalLight position={[2, 3, 4]} intensity={1.6} />
      <directionalLight position={[-3, -2, 2]} intensity={0.7} color="#e39b1e" />
      <pointLight position={[0, 0, 1.2]} intensity={1.2} color="#ffe6b8" distance={4} />
      <group ref={group}>
        <Iris R={R} open={open} />
      </group>
      <Photo src={src} shared={shared} onLoaded={onLoaded} />
    </>
  );
}

export default function HeroScene({
  src,
  shared,
  active,
  onLoaded,
}: {
  src: string;
  shared: Shared;
  active: boolean;
  onLoaded: () => void;
}) {
  return (
    <Canvas
      className="hero__canvas"
      camera={{ fov: 40, position: [0, 0, 3], near: 0.1, far: 20 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0b0c0d"]} />
      <Rig src={src} shared={shared} onLoaded={onLoaded} />
    </Canvas>
  );
}

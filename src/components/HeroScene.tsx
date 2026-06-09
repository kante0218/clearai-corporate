"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useGLTF, Preload } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const MODEL_URL = "/models/vegetables.glb";

const VEGGIES = [
  "Broccoli", "Apple", "Lemon", "Strawberry", "NapaCabbage",
  "Pumpkin", "Tomato", "Peach", "Grapes", "Onion",
] as const;
type VeggieKey = typeof VEGGIES[number];

/* Home anchors pulled inward so that, combined with the ±2-unit free
   roaming drift below, veggies always stay inside the viewport on 16:10
   and narrower aspect ratios. Neighbour overlap is fine — each fruit
   orbits on its own Lissajous curve so they cross paths naturally, and
   drifting through the centre text is allowed (the hero vignette keeps
   the headline legible). */
const POSITIONS: Record<VeggieKey, [number, number, number]> = {
  // upper band
  Broccoli:    [-3.0,  2.6, -2.0],
  Strawberry:  [-1.0,  3.0, -3.8],
  Onion:       [ 1.2,  2.7, -3.4],
  Apple:       [ 3.0,  2.4, -2.0],
  // lower band
  NapaCabbage: [-2.8, -2.6, -1.8],
  Tomato:      [-0.9, -2.9, -3.2],
  Lemon:       [ 1.1, -3.0, -3.6],
  Pumpkin:     [ 2.8, -2.5, -2.0],
  // mid-height sides
  Grapes:      [-3.4,  0.0, -3.8],
  Peach:       [ 3.4,  0.2, -3.6],
};

const SCALES: Record<VeggieKey, number> = {
  Broccoli: 1.95, Apple: 1.55, Lemon: 1.30, Strawberry: 1.25, NapaCabbage: 2.20,
  Pumpkin: 2.40, Tomato: 1.65, Peach: 1.55, Grapes: 2.10, Onion: 1.60,
};

const LINE_COLORS: Record<VeggieKey, string> = {
  Broccoli:    "#aaaaaa",
  Apple:       "#888888",
  Lemon:       "#cccccc",
  Strawberry:  "#999999",
  NapaCabbage: "#bbbbbb",
  Pumpkin:     "#888888",
  Tomato:      "#888888",
  Peach:       "#cccccc",
  Grapes:      "#aaaaaa",
  Onion:       "#cccccc",
};

const ACCENT  = "#aaaaaa";
const PRIMARY = "#888888";

/* ── powder shader: per-grain colour read from the source texture ─── */
const powderVertex = /* glsl */ `
  attribute vec3 aDir;
  attribute float aSeed;
  attribute vec2 aUV;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uDispersion;
  uniform float uAlpha;
  varying float vAlpha;
  varying float vDist;
  varying vec3 vColor;
  void main() {
    vColor = texture2D(uTexture, aUV).rgb;

    float speed = 0.5 + aSeed * 0.9;
    float reach = uDispersion * speed * (1.5 + 7.0 * uDispersion);
    vec3 disp = aDir * reach;
    disp.x += sin(uTime * 0.7 + aSeed * 6.28) * 0.6 * uDispersion;
    disp.y += sin(uTime * 0.5 + aSeed * 12.0) * 0.45 * uDispersion;
    disp.z += cos(uTime * 0.6 + aSeed * 9.0)  * 0.6 * uDispersion;
    vec3 perp = normalize(cross(aDir, vec3(0.0, 1.0, 0.0)) + vec3(0.001));
    disp += perp * sin(uTime * 0.4 + aSeed * 6.28) * 0.5 * uDispersion;
    disp.y -= uDispersion * uDispersion * 0.05;

    vec3 pos = position + disp;
    vAlpha = uAlpha;
    vDist = length(disp);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (0.55 + aSeed * 0.85) * (32.0 / -mv.z);
  }
`;
const powderFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDist;

  // RGB → HSV → RGB so saturation/value can be boosted without odd hue shifts
  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float core = 1.0 - smoothstep(0.12, 0.50, r);
    float distFade = 1.0 - smoothstep(2.0, 8.0, vDist) * 0.22;

    // Boost saturation 2.4× and brightness 1.7× via HSV — clean colour push
    vec3 hsv = rgb2hsv(vColor);
    hsv.y = clamp(hsv.y * 2.4, 0.0, 1.0);
    hsv.z = clamp(hsv.z * 1.70 + 0.10, 0.0, 1.0);  // floor + boost
    vec3 col = hsv2rgb(hsv);
    // extra hot pop on the bright peak
    col *= 1.20;

    gl_FragColor = vec4(col, core * vAlpha * 1.0 * distFade);
  }
`;

/* ── per-vegetable component ─────────────────────────────────── */
function VegetableMorph({
  geometry, material, wireSource, position, scale, lineColor, phaseOffset,
}: {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  wireSource: THREE.BufferGeometry;
  position: [number, number, number];
  scale: number;
  lineColor: string;
  phaseOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { clock } = useThree();

  /* — solid material clone (strong vibrance) — */
  const mat = useMemo(() => {
    const m = (material as THREE.MeshStandardMaterial).clone();
    m.transparent = true;
    m.opacity = 1;
    // lower env map intensity so neutral reflections don't desaturate the colour
    m.envMapIntensity = 1.05;
    m.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `#include <map_fragment>
         {
           vec3 c    = diffuseColor.rgb;
           float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
           // saturation 2.0x, brightness 1.22x — closer to photographic colour
           diffuseColor.rgb = mix(vec3(lum), c, 2.0) * 1.22;
           diffuseColor.rgb = clamp(diffuseColor.rgb, vec3(0.0), vec3(1.7));
         }`
      );
    };
    m.needsUpdate = true;
    return m;
  }, [material]);

  /* — wireframe (auto wire state only — no DNA, no click action) — */
  const wireGeo = useMemo(
    () => new THREE.WireframeGeometry(wireSource),
    [wireSource]
  );
  const wireMat = useMemo(
    () => new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor).multiplyScalar(1.6),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
    [lineColor]
  );

  /* — powder: dense per-triangle samples + texture-driven colour — */
  const powderGeo = useMemo(() => buildPowderGeometry(geometry, 4), [geometry]);
  const sourceTexture = useMemo(
    () => (material as THREE.MeshStandardMaterial).map ?? null,
    [material]
  );
  const powderMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime:        { value: 0 },
      uDispersion:  { value: 0 },
      uAlpha:       { value: 0 },
      uTexture:     { value: sourceTexture },
    },
    vertexShader:   powderVertex,
    fragmentShader: powderFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  }), [sourceTexture]);

  /* — click state (powder only) — */
  const click = useRef<{ start: number } | null>(null);
  const POWDER_DUR = 8.0;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    powderMat.uniforms.uTime.value = t;

    // zero-gravity drift + tri-axis tumble — each veggie roams freely on
    // a slow two-component Lissajous path. Amplitudes are large enough
    // that fruits traverse across the scene (and behind the headline),
    // phase offsets keep their trajectories independent.
    if (groupRef.current) {
      const f = phaseOffset;
      const dx = Math.sin(t * 0.16 + f * 1.7) * 1.45 + Math.cos(t * 0.09 + f * 0.7) * 0.75;
      const dy = Math.sin(t * 0.13 + f * 2.1) * 1.20 + Math.cos(t * 0.20 + f * 1.3) * 0.55;
      const dz = Math.cos(t * 0.18 + f * 1.9) * 1.00 + Math.sin(t * 0.11 + f * 2.5) * 0.55;
      groupRef.current.position.set(position[0] + dx, position[1] + dy, position[2] + dz);

      // slow tri-axis tumble — like an object floating in microgravity
      groupRef.current.rotation.x = t * (0.06 + (f * 0.013) % 0.05) + f * 0.7;
      groupRef.current.rotation.y = t * (0.10 + (f * 0.017) % 0.05) + f * 1.4;
      groupRef.current.rotation.z = t * (0.04 + (f * 0.011) % 0.04) + f * 0.9;
    }

    /* SYNC cycle */
    const cycleDur = 11.2;
    const cyclePos = ((t % cycleDur) + cycleDur) % cycleDur;
    let solidA: number, wireA: number;
    if (cyclePos < 5.0) {
      solidA = 1; wireA = 0;
    } else if (cyclePos < 5.6) {
      const k = (cyclePos - 5.0) / 0.6;
      solidA = 1 - k; wireA = k;
    } else if (cyclePos < 10.6) {
      solidA = 0; wireA = 1;
    } else {
      const k = (cyclePos - 10.6) / 0.6;
      solidA = k; wireA = 1 - k;
    }

    /* powder click overrides */
    let powderA = 0, powderD = 0;

    if (click.current !== null) {
      const e = t - click.current.start;
      if (e >= POWDER_DUR) {
        click.current = null;
      } else {
        if (e < 1.0) {
          const k = e / 1.0;
          solidA = 1 - k;
          powderA = k * 0.95;
          powderD = k * 0.4;
        } else if (e < 2.5) {
          const k = (e - 1.0) / 1.5;
          solidA = 0;
          powderA = 0.95;
          powderD = 0.4 + k * 0.6;
        } else if (e < 5.0) {
          const k = (e - 2.5) / 2.5;
          solidA = 0;
          powderA = 0.95 - k * 0.18;
          powderD = 1.0;
        } else if (e < 7.0) {
          const k = (e - 5.0) / 2.0;
          solidA = 0;
          powderA = 0.77 + k * 0.18;
          powderD = 1.0 - k;
        } else {
          const k = (e - 7.0) / 1.0;
          solidA = k;
          powderA = 0.95 * (1 - k);
          powderD = 0;
        }
        wireA = 0;
      }
    }

    /* Apply */
    mat.opacity = solidA;
    mat.visible = solidA > 0.005;

    wireMat.opacity = wireA * 0.95;
    wireMat.visible = wireA > 0.005;

    powderMat.uniforms.uDispersion.value = powderD;
    powderMat.uniforms.uAlpha.value      = powderA;
    powderMat.visible = powderA > 0.005;
  });

  // Click only triggers powder when the vegetable is mostly visible (solid state).
  // While the wire / fade-out states are showing, clicks are ignored.
  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (click.current !== null) return;
    const t = clock.elapsedTime;
    const cycleDur = 11.2;
    const cyclePos = ((t % cycleDur) + cycleDur) % cycleDur;
    const inSolid = cyclePos < 5.3;   // slight guard around the crossfade
    if (!inSolid) return;
    click.current = { start: t };
  };
  const setHover = (h: boolean) => {
    if (typeof document !== "undefined") document.body.style.cursor = h ? "pointer" : "auto";
  };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* invisible click hitbox — only matters while in solid state */}
      <mesh
        onPointerDown={handleClick}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      >
        <sphereGeometry args={[0.7, 14, 14]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* solid textured mesh */}
      <mesh geometry={geometry} material={mat} />

      {/* auto-cycle wireframe (clicks have no effect here) */}
      <lineSegments geometry={wireGeo} material={wireMat} renderOrder={2} />

      {/* powder grains (only triggered by clicking the real vegetable) */}
      <points geometry={powderGeo} material={powderMat} renderOrder={4} />
    </group>
  );
}

/* ── powder geometry builder (with UVs for texture sampling) ─── */
function buildPowderGeometry(src: THREE.BufferGeometry, samplesPerTri: number): THREE.BufferGeometry {
  const posAttr = src.attributes.position;
  const uvAttr = src.attributes.uv as THREE.BufferAttribute | undefined;
  const indexAttr = src.index;
  const triCount = indexAttr ? indexAttr.count / 3 : posAttr.count / 3;
  const totalCount = posAttr.count + triCount * samplesPerTri;

  const positions = new Float32Array(totalCount * 3);
  const dirs = new Float32Array(totalCount * 3);
  const seeds = new Float32Array(totalCount);
  const uvs = new Float32Array(totalCount * 2);

  let idx = 0;

  for (let i = 0; i < posAttr.count; i++) {
    positions[idx * 3]     = posAttr.getX(i);
    positions[idx * 3 + 1] = posAttr.getY(i);
    positions[idx * 3 + 2] = posAttr.getZ(i);
    if (uvAttr) {
      uvs[idx * 2]     = uvAttr.getX(i);
      uvs[idx * 2 + 1] = uvAttr.getY(i);
    }
    const x = Math.random() - 0.5;
    const y = Math.random() - 0.5;
    const z = Math.random() - 0.5;
    const len = Math.hypot(x, y, z) || 1;
    dirs[idx * 3]     = x / len;
    dirs[idx * 3 + 1] = y / len;
    dirs[idx * 3 + 2] = z / len;
    seeds[idx] = Math.random();
    idx++;
  }

  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const uvA = new THREE.Vector2(), uvB = new THREE.Vector2(), uvC = new THREE.Vector2();
  for (let i = 0; i < triCount; i++) {
    const ai = indexAttr ? indexAttr.getX(i * 3)     : i * 3;
    const bi = indexAttr ? indexAttr.getX(i * 3 + 1) : i * 3 + 1;
    const ci = indexAttr ? indexAttr.getX(i * 3 + 2) : i * 3 + 2;
    a.fromBufferAttribute(posAttr, ai);
    b.fromBufferAttribute(posAttr, bi);
    c.fromBufferAttribute(posAttr, ci);
    if (uvAttr) {
      uvA.fromBufferAttribute(uvAttr, ai);
      uvB.fromBufferAttribute(uvAttr, bi);
      uvC.fromBufferAttribute(uvAttr, ci);
    }
    for (let s = 0; s < samplesPerTri; s++) {
      let r1 = Math.random();
      let r2 = Math.random();
      if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
      const r3 = 1 - r1 - r2;
      positions[idx * 3]     = a.x * r3 + b.x * r1 + c.x * r2;
      positions[idx * 3 + 1] = a.y * r3 + b.y * r1 + c.y * r2;
      positions[idx * 3 + 2] = a.z * r3 + b.z * r1 + c.z * r2;
      if (uvAttr) {
        uvs[idx * 2]     = uvA.x * r3 + uvB.x * r1 + uvC.x * r2;
        uvs[idx * 2 + 1] = uvA.y * r3 + uvB.y * r1 + uvC.y * r2;
      }
      const dx = Math.random() - 0.5;
      const dy = Math.random() - 0.5;
      const dz = Math.random() - 0.5;
      const len = Math.hypot(dx, dy, dz) || 1;
      dirs[idx * 3]     = dx / len;
      dirs[idx * 3 + 1] = dy / len;
      dirs[idx * 3 + 2] = dz / len;
      seeds[idx] = Math.random();
      idx++;
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("aDir",    new THREE.BufferAttribute(dirs, 3));
  g.setAttribute("aSeed",   new THREE.BufferAttribute(seeds, 1));
  g.setAttribute("aUV",     new THREE.BufferAttribute(uvs, 2));
  return g;
}

/* ── procedural environment ──────────────────────────────────── */
function ProceduralEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => { env.dispose(); pmrem.dispose(); };
  }, [gl, scene]);
  return null;
}

/* ── starfield (cosmic background) ───────────────────────────── */
function Starfield() {
  const { geo, mat } = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);   // per-star base size
    const tints = new Float32Array(count);   // 0=white, +blue, -warm
    for (let i = 0; i < count; i++) {
      // distribute on a thick spherical shell so stars surround the camera
      const r = 22 + Math.random() * 18;       // depth 22..40
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5; // flatter vertically
      positions[i * 3 + 2] = r * Math.cos(phi) - 6;                     // pushed back
      seeds[i] = Math.random();
      // most stars small, a few bright ones
      const r1 = Math.random();
      sizes[i] = r1 < 0.85 ? 0.4 + Math.random() * 0.6 : 1.2 + Math.random() * 1.6;
      // mostly neutral, slight blue/warm variance
      tints[i] = (Math.random() - 0.5) * 1.0;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed",    new THREE.BufferAttribute(seeds, 1));
    g.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aTint",    new THREE.BufferAttribute(tints, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */`
        attribute float aSeed;
        attribute float aSize;
        attribute float aTint;
        uniform float uTime;
        varying float vAlpha;
        varying float vTint;
        void main() {
          // gentle twinkle — each star pulses on its own clock
          float t = uTime * (0.5 + aSeed * 1.4) + aSeed * 12.566;
          float twinkle = 0.6 + 0.4 * sin(t);
          vAlpha = twinkle;
          vTint = aTint;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * twinkle * (220.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */`
        varying float vAlpha;
        varying float vTint;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          // soft round star with sharp core
          float core    = 1.0 - smoothstep(0.0,  0.50, d);
          float bright  = 1.0 - smoothstep(0.0,  0.10, d);
          float a = (core * 0.45 + bright * 0.55) * vAlpha;
          // subtle warm/cool tint (white core, slight color cast)
          vec3 col = vec3(1.0);
          col.r += vTint * -0.10;
          col.b += vTint *  0.15;
          gl_FragColor = vec4(col, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geo: g, mat: m };
  }, []);
  useFrame((s) => { mat.uniforms.uTime.value = s.clock.elapsedTime; });
  return <points geometry={geo} material={mat} />;
}

/* ── scene root ──────────────────────────────────────────────── */
function Scene() {
  const { mouse } = useThree();
  const camRig = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(MODEL_URL) as unknown as {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  };

  useFrame(() => {
    if (!camRig.current) return;
    camRig.current.rotation.y = THREE.MathUtils.lerp(
      camRig.current.rotation.y, mouse.x * 0.10, 0.04
    );
    camRig.current.rotation.x = THREE.MathUtils.lerp(
      camRig.current.rotation.x, -mouse.y * 0.05, 0.04
    );
  });

  return (
    <>
      <ProceduralEnv />
      <ambientLight intensity={0.40} />
      <directionalLight position={[6, 7, 5]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-6, -2, -3]} intensity={0.55} color="#ffffff" />

      <group ref={camRig}>
        <Starfield />
        {VEGGIES.map((name, i) => {
          const mesh = nodes[name];
          const wire = nodes[`${name}_wire`];
          if (!mesh || !wire) return null;
          const meshMaterial = mesh.material as THREE.Material | undefined
            ?? Object.values(materials)[i];
          return (
            <VegetableMorph
              key={name}
              geometry={mesh.geometry}
              material={meshMaterial}
              wireSource={wire.geometry}
              position={POSITIONS[name]}
              scale={SCALES[name]}
              lineColor={LINE_COLORS[name]}
              phaseOffset={i * 1.18}
            />
          );
        })}
      </group>
    </>
  );
}

useGLTF.preload(MODEL_URL);

/* ── exported Canvas wrapper ─────────────────────────────────── */
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 60 }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 14, 36]} />
      <Suspense fallback={null}>
        <Scene />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

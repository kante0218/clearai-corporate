import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

/**
 * ParticleHero — every model is drawn ENTIRELY as points (black dust on white).
 * -----------------------------------------------------------------------------
 * - AT REST each model is its real geometry rendered as points, driven by the
 *   model's ORIGINAL baked animation (moon spins, jellyfish pulses, butterfly
 *   flaps). None of the models use skeletal skinning — moon/butterfly are node
 *   transforms, jellyfish is a morph target — so the points animate for free by
 *   rendering the live mesh geometry as THREE.Points under the same animation.
 * - DRAG to rotate the view (OrbitControls); it also auto-rotates slowly.
 * - TAP / CLICK (without dragging) explodes the model into scattered sand that
 *   re-assembles into the NEXT model.
 */

const COUNT = 42000;         // sand grains for the transition (shared, morphable)
const REST_COUNT = 26000;    // points shown at rest (mesh vertices are decimated to ~this)
const TARGET_EXTENT = 4.6;   // normalized model size
const MORPH_DURATION = 2.8;  // seconds per tap-transition
const DARK = 0.34;           // sand output multiplier → black on white

const MODEL_URLS = [
  '/models/hero/earth.glb',
  '/models/hero/jellyfish.glb',
  '/models/hero/butterfly.glb',
];
const ANIM_SPEED = [1.0, 1.0, 0.25];      // butterfly flaps slowly
const SPIN = [0.12, 0.0, 0.0];            // jupiter (static) gets a slow Y spin
const DOT_SIZE = 0.025;                   // unified dot size for every model (matched to jellyfish)
// max grey per model (lower = darker/more visible). Jellyfish texture is bright,
// so cap it darker so its dots don't wash out on the white background.
const GMAX = [0.6, 0.34, 0.36];
// force these models to use surface sampling instead of mesh vertices
const SAMPLE_OVERRIDE = [false, false, false];
// height bias for sampling (bottom vs top weight). Jellyfish: denser bell (top),
// sparser tentacles (bottom).
const YWEIGHT = [null, null, null];
// sample only land (skip ocean) — for the earth, so seas are blank and only the
// continents are drawn as dots.
const LAND_ONLY = [true, false, false];
// per-model vertical nudge (normalized units, TARGET_EXTENT=4.6). butterfly sits lower.
const YOFFSET = [0, 0, -0.8];
// explicit texture to read for classification (earth's material uses the
// spec-gloss extension, so its texture isn't on material.map).
const TEX_OVERRIDE = ['/models/hero/earth_diffuse.jpg', null, null];

const GrayscaleShader = {
  uniforms: { tDiffuse: { value: null }, contrast: { value: 0.98 } },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float contrast;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
      l = (l - 0.5) * contrast + 0.5;
      gl_FragColor = vec4(vec3(clamp(l, 0.0, 1.0)), c.a);
    }
  `,
};

const pointVert = /* glsl */ `
  uniform float uProgress, uTime, uScatter, uSize;
  attribute vec3 aTarget, aNormalFrom, aNormalTo, aDir;
  attribute float aAlbedoFrom, aAlbedoTo, aRand;
  varying float vShade, vFacing;
  void main() {
    float p = clamp((uProgress - aRand * 0.10) / 0.90, 0.0, 1.0);
    p = p * p * (3.0 - 2.0 * p);
    vec3 pos = mix(position, aTarget, p);
    float burst = sin(p * 3.14159265);
    pos += aDir * burst * uScatter * (0.4 + aRand);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec3 nrm = normalize(mix(aNormalFrom, aNormalTo, p));
    vec3 vn = normalize(normalMatrix * nrm);
    // same high-contrast texture-grey as the resting points, so the flying sand
    // looks like the very same dots (pattern preserved through the transition)
    float albedo = mix(aAlbedoFrom, aAlbedoTo, p);
    float lc = clamp((albedo - 0.5) * 2.4 + 0.5, 0.0, 1.0);
    vShade = clamp(0.03 + lc * 0.55, 0.03, 0.6);

    vec3 viewDir = normalize(-mv.xyz);
    vFacing = mix(dot(vn, viewDir), 1.0, burst);
    gl_PointSize = max(1.6, uSize * (50.0 / -mv.z)); // small grains, always visible
    gl_Position = projectionMatrix * mv;
  }
`;
const pointFrag = /* glsl */ `
  varying float vShade, vFacing;
  void main() {
    if (vFacing < 0.05) discard;
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    gl_FragColor = vec4(vec3(vShade), 1.0);
  }
`;

export class ParticleHero {
  constructor(container, opts = {}) {
    this.container = container;
    this.opts = opts;
    this.clock = new THREE.Clock();
    this.models = [];     // { pivot, mixer, cloud, tone }
    this.current = 0;
    this.morphing = false;
    this.morphT = 0;

    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d', { willReadFrequently: true });

    // per-model point materials (size adapts to each model's point count)
    this._restMats = [];

    this._initRenderer();
    this._initScene();
    this._initControls();
    this._initComposer();
    this._bindEvents();
    this._loadAll();

    this._animate = this._animate.bind(this);
    this._raf = requestAnimationFrame(this._animate);
  }

  _size() {
    return {
      w: this.container.clientWidth || window.innerWidth,
      h: this.container.clientHeight || window.innerHeight,
    };
  }

  _initRenderer() {
    const { w, h } = this._size();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);
  }

  _initScene() {
    const { w, h } = this._size();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    this.camera.position.set(0, 0, 9);
  }

  _initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.enableZoom = true;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 16;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.7;
    this.controls.rotateSpeed = 0.7;
  }

  _initComposer() {
    const { w, h } = this._size();
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.composer.setSize(w, h);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const gray = new ShaderPass(GrayscaleShader);
    gray.renderToScreen = true;
    this.composer.addPass(gray);
  }

  _bindEvents() {
    this._onResize = () => {
      const { w, h } = this._size();
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.composer.setSize(w, h);
    };
    window.addEventListener('resize', this._onResize);

    this._onDown = (e) => { this._down = { x: e.clientX, y: e.clientY, t: performance.now() }; };
    this._onUp = (e) => {
      if (!this._down) return;
      const moved = Math.hypot(e.clientX - this._down.x, e.clientY - this._down.y);
      const dt = performance.now() - this._down.t;
      this._down = null;
      if (this._ready && moved < 6 && dt < 400) this.next();
    };
    this.container.addEventListener('pointerdown', this._onDown);
    window.addEventListener('pointerup', this._onUp);

    this._io = new IntersectionObserver((es) => { this._visible = es[0]?.isIntersecting ?? true; });
    this._io.observe(this.container);
    this._visible = true;
  }

  // ---- loading --------------------------------------------------------------

  async _loadAll() {
    const loader = new GLTFLoader();
    const load = (url) => new Promise((res, rej) => loader.load(url, res, undefined, rej));

    let done = 0;
    for (let i = 0; i < MODEL_URLS.length; i++) {
      try {
        const gltf = await load(MODEL_URLS[i]);
        const texOverride = TEX_OVERRIDE[i] ? await this._loadImageData(TEX_OVERRIDE[i]) : null;
        this.models[i] = this._prepModel(gltf, i, texOverride);
      } catch (err) {
        console.error('[ParticleHero] failed', MODEL_URLS[i], err);
        const pivot = new THREE.Group();
        pivot.add(this._buildSampledPoints(this._sphereCloud(REST_COUNT), 0.5));
        this.models[i] = { pivot, mixer: null, spin: SPIN[i] ?? 0 };
        this.scene.add(pivot);
      }
      done++;
      this.opts.onProgress?.(done / MODEL_URLS.length);
      await new Promise((r) => setTimeout(r, 0));
    }

    this.models.forEach((m, i) => { m.pivot.visible = i === this.current; });
    this._ready = true;
    this.opts.onLoaded?.();
  }

  /** Build a model: sample its sand cloud, then render its live geometry as
   *  animated points (driven by the original baked animation). */
  _prepModel(gltf, i, texOverride) {
    const root = gltf.scene;
    root.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const scale = TARGET_EXTENT / (Math.max(size.x, size.y, size.z) || 1);
    const gMax = GMAX[i] ?? 0.6;
    const useSample = !gltf.animations?.length || SAMPLE_OVERRIDE[i];

    let pivot, mixer = null, pulse = false;
    if (!useSample) {
      // VERTEX path (butterfly node anim): render live mesh vertices as points so
      // the original baked animation drives them.
      this._meshesToPoints(root, gMax);
      mixer = new THREE.AnimationMixer(root);
      gltf.animations.forEach((c) => mixer.clipAction(c).play());
      mixer.timeScale = ANIM_SPEED[i] ?? 1.0;
      pivot = new THREE.Group();
      pivot.scale.setScalar(scale);
      pivot.position.copy(center).multiplyScalar(-scale);
      pivot.add(root);
    } else {
      // SAMPLED path (jupiter, + jellyfish with height bias): surface-sample so we
      // control density (handles low-poly jupiter & lets the jellyfish be denser
      // at the top / sparser at the bottom).
      const cloud = LAND_ONLY[i]
        ? this._sampleLandCloud(root, REST_COUNT, center, scale, texOverride)
        : this._sampleCloud(root, REST_COUNT, center, scale, YWEIGHT[i]);
      pivot = new THREE.Group();
      pivot.add(this._buildSampledPoints(cloud, gMax));
      pulse = !!gltf.animations?.length; // jellyfish lost its morph → gentle procedural pulse
    }
    pivot.position.y += YOFFSET[i] ?? 0;  // lower the butterfly a touch
    this.scene.add(pivot);

    return { pivot, mixer, spin: SPIN[i] ?? 0, pulse };
  }

  /** Keep each Mesh (so the AnimationMixer binds to it exactly) but make it draw
   *  nothing, and add a child Points that reuses the geometry + SHARES the morph
   *  influences. The Points, as a child, inherits the mesh's animated node
   *  transform (moon/butterfly) and renders the shared morph weights (jellyfish).
   */
  _meshesToPoints(root, gMax) {
    const meshes = [];
    root.traverse((o) => { if (o.isMesh && o.geometry?.attributes?.position) meshes.push(o); });

    // decimate to ~REST_COUNT points total across the whole model
    const vTotal = meshes.reduce((s, m) => s + m.geometry.attributes.position.count, 0);
    const stride = Math.max(1, Math.round(vTotal / REST_COUNT));

    const mat = this._makeRestMaterial();

    for (const m of meshes) {
      const tex = this._readTexture(m);
      // hide the solid mesh without removing it (keeps animation binding alive)
      m.material = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false });

      const geom = this._decimate(m.geometry, stride, tex, gMax);
      const p = new THREE.Points(geom, mat);
      if (m.morphTargetDictionary) p.morphTargetDictionary = m.morphTargetDictionary;
      if (m.morphTargetInfluences) p.morphTargetInfluences = m.morphTargetInfluences; // SHARE ref
      m.add(p); // child → inherits animated transform; shares morph weights
    }
  }

  /** PointsMaterial that (a) culls back-facing grains so the surface pattern
   *  reads as a solid face, and (b) scales each grain by a per-vertex `aSize`
   *  (dark texture areas → bigger grains) so the pattern shows through dot size. */
  _makeRestMaterial() {
    const mat = new THREE.PointsMaterial({ vertexColors: true, size: DOT_SIZE, sizeAttenuation: true });
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = 'attribute vec3 aNormal;\nattribute float aSize;\nvarying float vFace;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        'vec4 _mv = modelViewMatrix * vec4(transformed, 1.0);\n' +
        'vFace = dot(normalize(normalMatrix * aNormal), normalize(-_mv.xyz));\n' +
        '#include <project_vertex>'
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <logdepthbuf_vertex>',
        'gl_PointSize *= aSize;\n#include <logdepthbuf_vertex>'
      );
      shader.fragmentShader = 'varying float vFace;\n' + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <clipping_planes_fragment>',
        'if (vFace < 0.05) discard;\n' +
        'vec2 _cxy = gl_PointCoord - 0.5;\n' +
        'if (dot(_cxy, _cxy) > 0.25) discard;\n' + // round grains, not squares
        '#include <clipping_planes_fragment>'
      );
    };
    this._restMats.push(mat);
    return mat;
  }

  /** Map a texture luminance to a grain grey value + size multiplier.
   *  Dark areas → darker AND bigger grains, so the pattern reads (butterfly-like). */
  _albToGreySize(lum, gMax = 0.6) {
    const lc = Math.min(1, Math.max(0, (lum - 0.5) * 2.4 + 0.5)); // boost contrast
    const g = Math.min(gMax, Math.max(0.03, 0.03 + lc * (gMax - 0.03)));
    const s = 1.0; // uniform dot size for every grain (matched to the planet)
    return { g, s };
  }

  /** Build a Points object from an evenly surface-sampled cloud (static models). */
  _buildSampledPoints(cloud, gMax) {
    const n = cloud.pos.length / 3;
    const geom = new THREE.BufferGeometry();
    const col = new Float32Array(n * 3);
    const siz = new Float32Array(n);
    for (let k = 0; k < n; k++) {
      const { g, s } = this._albToGreySize(cloud.alb[k], gMax);
      col[k * 3] = g; col[k * 3 + 1] = g; col[k * 3 + 2] = g;
      siz[k] = s;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(cloud.pos, 3));
    geom.setAttribute('aNormal', new THREE.BufferAttribute(cloud.nrm, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geom.setAttribute('aSize', new THREE.BufferAttribute(siz, 1));
    return new THREE.Points(geom, this._makeRestMaterial());
  }

  /** Build a reduced-vertex geometry (every `stride`-th vertex), carrying morph
   *  target deltas (so jellyfish morph still works) and a per-vertex grey colour
   *  + size sampled from the model's texture (so the pattern shows). */
  _decimate(src, stride, tex, gMax) {
    const sp = src.attributes.position;
    const uv = src.attributes.uv;
    const sn = src.attributes.normal;
    const idxs = [];
    for (let i = 0; i < sp.count; i += stride) idxs.push(i);

    const out = new THREE.BufferGeometry();
    const pos = new Float32Array(idxs.length * 3);
    const col = new Float32Array(idxs.length * 3);
    const nrm = new Float32Array(idxs.length * 3);
    const siz = new Float32Array(idxs.length);
    idxs.forEach((vi, k) => {
      pos[k * 3] = sp.getX(vi); pos[k * 3 + 1] = sp.getY(vi); pos[k * 3 + 2] = sp.getZ(vi);
      if (sn) { nrm[k * 3] = sn.getX(vi); nrm[k * 3 + 1] = sn.getY(vi); nrm[k * 3 + 2] = sn.getZ(vi); }
      else { const l = Math.hypot(pos[k*3],pos[k*3+1],pos[k*3+2])||1; nrm[k*3]=pos[k*3]/l; nrm[k*3+1]=pos[k*3+1]/l; nrm[k*3+2]=pos[k*3+2]/l; }
      let lum = tex && tex.base != null ? tex.base : 0.5;
      if (tex && tex.data && uv) {
        let u = uv.getX(vi) - Math.floor(uv.getX(vi));
        let v = uv.getY(vi) - Math.floor(uv.getY(vi));
        const px = Math.min(tex.W - 1, (u * tex.W) | 0);
        const py = Math.min(tex.H - 1, ((1 - v) * tex.H) | 0);
        const id = (py * tex.W + px) * 4;
        lum = (0.2126 * tex.data[id] + 0.7152 * tex.data[id + 1] + 0.0722 * tex.data[id + 2]) / 255;
      }
      const { g, s } = this._albToGreySize(lum, gMax);
      col[k * 3] = g; col[k * 3 + 1] = g; col[k * 3 + 2] = g;
      siz[k] = s;
    });
    out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    out.setAttribute('color', new THREE.BufferAttribute(col, 3));
    out.setAttribute('aNormal', new THREE.BufferAttribute(nrm, 3));
    out.setAttribute('aSize', new THREE.BufferAttribute(siz, 1));

    const morphs = src.morphAttributes?.position;
    if (morphs?.length) {
      out.morphAttributes.position = morphs.map((attr) => {
        const a = new Float32Array(idxs.length * 3);
        idxs.forEach((vi, k) => { a[k * 3] = attr.getX(vi); a[k * 3 + 1] = attr.getY(vi); a[k * 3 + 2] = attr.getZ(vi); });
        return new THREE.BufferAttribute(a, 3);
      });
      out.morphTargetsRelative = src.morphTargetsRelative;
    }
    return out;
  }

  _geometryArea(geom) {
    const pos = geom.attributes.position, idx = geom.index;
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
    const ab = new THREE.Vector3(), ac = new THREE.Vector3();
    let area = 0;
    const tris = idx ? idx.count / 3 : pos.count / 3;
    for (let t = 0; t < tris; t++) {
      const i0 = idx ? idx.getX(t * 3) : t * 3;
      const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
      const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      a.fromBufferAttribute(pos, i0); b.fromBufferAttribute(pos, i1); c.fromBufferAttribute(pos, i2);
      ab.subVectors(b, a); ac.subVectors(c, a);
      area += ab.cross(ac).length() * 0.5;
    }
    return area;
  }

  /** Load an image URL into a pixel buffer ({data,W,H}) for classification. */
  _loadImageData(url) {
    return new Promise((res) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const W = Math.min(img.width, 2048), H = Math.min(img.height, 2048);
        this._canvas.width = W; this._canvas.height = H;
        this._ctx.drawImage(img, 0, 0, W, H);
        res({ data: this._ctx.getImageData(0, 0, W, H).data, W, H, base: 0.5 });
      };
      img.onerror = () => res(null);
      img.src = url;
    });
  }

  _readTexture(mesh) {
    const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    const img = mat?.map?.image;
    if (!img || !img.width) {
      const base = mat?.color
        ? 0.2126 * mat.color.r + 0.7152 * mat.color.g + 0.0722 * mat.color.b : 0.8;
      return { data: null, base };
    }
    const W = Math.min(img.width, 1024), H = Math.min(img.height, 1024);
    this._canvas.width = W; this._canvas.height = H;
    this._ctx.drawImage(img, 0, 0, W, H);
    return { data: this._ctx.getImageData(0, 0, W, H).data, W, H, base: 0.85 };
  }

  _sampleCloud(root, n, center, scale, yWeight) {
    const meshes = [];
    root.traverse((o) => { if (o.isMesh && o.geometry?.attributes?.position) meshes.push(o); });
    if (!meshes.length) return this._sphereCloud(n);

    const geos = meshes.map((m) => { const g = m.geometry.clone(); g.applyMatrix4(m.matrixWorld); return g; });
    const texes = meshes.map((m) => this._readTexture(m));
    const areas = geos.map((g) => this._geometryArea(g) || 1e-6);
    const total = areas.reduce((s, a) => s + a, 0);

    // optional height bias: weight sampling so more grains land high (top) and
    // fewer low (bottom) — used for the jellyfish (denser bell, sparser tentacles).
    if (yWeight) {
      let yMin = Infinity, yMax = -Infinity;
      geos.forEach((g) => {
        const p = g.attributes.position;
        for (let v = 0; v < p.count; v++) { const y = p.getY(v); if (y < yMin) yMin = y; if (y > yMax) yMax = y; }
      });
      const span = (yMax - yMin) || 1;
      geos.forEach((g) => {
        const p = g.attributes.position;
        const w = new Float32Array(p.count);
        for (let v = 0; v < p.count; v++) {
          let ny = (p.getY(v) - yMin) / span;            // 0 bottom → 1 top
          ny = ny * ny * (3 - 2 * ny);                    // smoothstep
          w[v] = yWeight.bottom + (yWeight.top - yWeight.bottom) * ny;
        }
        g.setAttribute('weight', new THREE.BufferAttribute(w, 1));
      });
    }

    const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3), alb = new Float32Array(n);
    const tmpP = new THREE.Vector3(), tmpN = new THREE.Vector3(), tmpUV = new THREE.Vector2();
    let written = 0;

    geos.forEach((g, gi) => {
      const isLast = gi === geos.length - 1;
      let count = isLast ? n - written : Math.round((areas[gi] / total) * n);
      count = Math.max(0, Math.min(count, n - written));
      if (!count) { g.dispose(); return; }
      const hasUV = !!g.attributes.uv;
      let sampler = new MeshSurfaceSampler(new THREE.Mesh(g));
      if (g.attributes.weight) sampler.setWeightAttribute('weight');
      sampler.build();
      const tex = texes[gi];
      for (let k = 0; k < count; k++) {
        sampler.sample(tmpP, tmpN, null, hasUV ? tmpUV : null);
        const w = written++;
        pos[w * 3]     = (tmpP.x - center.x) * scale;
        pos[w * 3 + 1] = (tmpP.y - center.y) * scale;
        pos[w * 3 + 2] = (tmpP.z - center.z) * scale;
        tmpN.normalize();
        nrm[w * 3] = tmpN.x; nrm[w * 3 + 1] = tmpN.y; nrm[w * 3 + 2] = tmpN.z;
        let a = tex.base;
        if (tex.data && hasUV) {
          const u = tmpUV.x - Math.floor(tmpUV.x), v = tmpUV.y - Math.floor(tmpUV.y);
          const px = Math.min(tex.W - 1, (u * tex.W) | 0);
          const py = Math.min(tex.H - 1, ((1 - v) * tex.H) | 0);
          const id = (py * tex.W + px) * 4;
          a = (0.2126 * tex.data[id] + 0.7152 * tex.data[id + 1] + 0.0722 * tex.data[id + 2]) / 255;
        }
        alb[w] = a;
      }
      g.dispose();
    });
    return { pos, nrm, alb };
  }

  /** Sample only LAND points (skip ocean). Ocean is detected by a blue-dominant
   *  texture colour, so the seas stay blank and only the continents become dots. */
  _sampleLandCloud(root, n, center, scale, texOverride) {
    const meshes = [];
    root.traverse((o) => { if (o.isMesh && o.geometry?.attributes?.position) meshes.push(o); });
    if (!meshes.length) return this._sphereCloud(n);
    const m = meshes[0];
    const g = m.geometry.clone(); g.applyMatrix4(m.matrixWorld);
    const tex = texOverride || this._readTexture(m);
    const hasUV = !!g.attributes.uv;
    const sampler = new MeshSurfaceSampler(new THREE.Mesh(g)).build();

    const P = [], N = [], A = [];
    const tmpP = new THREE.Vector3(), tmpN = new THREE.Vector3(), tmpUV = new THREE.Vector2();
    const maxAttempts = n * 8;
    let attempts = 0;
    while (P.length < n * 3 && attempts < maxAttempts) {
      attempts++;
      sampler.sample(tmpP, tmpN, null, hasUV ? tmpUV : null);
      let landLum = 0.45;
      if (tex.data && hasUV) {
        const u = tmpUV.x - Math.floor(tmpUV.x), v = tmpUV.y - Math.floor(tmpUV.y);
        const px = Math.min(tex.W - 1, (u * tex.W) | 0);
        const py = Math.min(tex.H - 1, ((1 - v) * tex.H) | 0);
        const id = (py * tex.W + px) * 4;
        const r = tex.data[id] / 255, gg = tex.data[id + 1] / 255, b = tex.data[id + 2] / 255;
        const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
        const sat = mx > 0 ? (mx - mn) / mx : 0;
        const cloud = mx > 0.72 && sat < 0.12;           // bright low-sat ice/snow → blank
        const ocean = (b >= mx - 0.02) && (b > r + 0.02); // blue-dominant → sea → blank
        if (cloud || ocean) continue;
        landLum = 0.32 + (gg - 0.2) * 0.4;               // subtle land shading
      }
      P.push((tmpP.x - center.x) * scale, (tmpP.y - center.y) * scale, (tmpP.z - center.z) * scale);
      tmpN.normalize(); N.push(tmpN.x, tmpN.y, tmpN.z);
      A.push(Math.min(0.55, Math.max(0.15, landLum)));
    }
    g.dispose();
    return { pos: new Float32Array(P), nrm: new Float32Array(N), alb: new Float32Array(A) };
  }

  _sphereCloud(n) {
    const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3), alb = new Float32Array(n).fill(0.8);
    for (let i = 0; i < n; i++) {
      const u = Math.acos(2 * ((i + 0.5) / n) - 1), a = i * 2.399963;
      const x = Math.sin(u) * Math.cos(a), y = Math.sin(u) * Math.sin(a), z = Math.cos(u);
      const r = TARGET_EXTENT * 0.5;
      pos[i * 3] = x * r; pos[i * 3 + 1] = y * r; pos[i * 3 + 2] = z * r;
      nrm[i * 3] = x; nrm[i * 3 + 1] = y; nrm[i * 3 + 2] = z;
    }
    return { pos, nrm, alb };
  }

  // ---- interaction ----------------------------------------------------------

  /** Tap → simply switch to the next object (no sand effect). */
  next() {
    if (!this._ready || this.models.length < 2) return;
    const cur = this.models[this.current];
    cur.pivot.visible = false;
    cur.pivot.rotation.y = 0; // reset spin so it returns next time aligned

    this.current = (this.current + 1) % this.models.length;
    const nx = this.models[this.current];
    nx.pivot.rotation.y = 0;
    if (nx.mixer) nx.mixer.setTime(0);
    nx.pivot.visible = true;
  }

  // ---- loop -----------------------------------------------------------------

  _animate() {
    this._raf = requestAnimationFrame(this._animate);
    if (this._visible === false) return;

    const dt = this.clock.getDelta();
    const t = this.clock.elapsedTime;
    const m = this.models[this.current];
    m?.mixer?.update(dt);                            // baked animation (butterfly node)
    if (m?.spin) m.pivot.rotation.y += m.spin * dt;  // slow spin (jupiter)
    if (m?.pulse) {                                  // gentle jellyfish pulse + bob
      const s = 1 + 0.05 * Math.sin(t * 1.4);
      m.pivot.scale.set(s, 1 + 0.07 * Math.sin(t * 1.4), s);
      m.pivot.position.y = 0.12 * Math.sin(t * 0.7);
    }

    this.controls.update();
    this.composer.render();
  }

  dispose() {
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('pointerup', this._onUp);
    this.container.removeEventListener('pointerdown', this._onDown);
    this._io?.disconnect();
    this.controls?.dispose();
    this._restMats.forEach((m) => m.dispose());
    this.composer?.dispose?.();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

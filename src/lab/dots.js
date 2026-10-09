/* Dots — the second signature effect.

   Every dot lives in an ambient field that covers the screen. The intro pulls
   them together into Nuri, holds, and lets them fly back out; afterwards the
   field just drifts behind the wall, parallaxing with it. Nuri = 누리 = "world":
   she is made of the same dots the world is. */

import * as THREE from "three";
import gsap from "gsap";
import { sampleShape } from "./nuri.js";

const vertex = /* glsl */ `
  attribute vec2 aShape;
  attribute vec2 aField;
  attribute float aRand;
  uniform float uMorph;
  uniform float uDisperse;
  uniform float uTime;
  uniform float uParallax;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uFieldAlpha;
  uniform vec2 uViewport;
  uniform vec2 uOffset;
  varying float vW;
  varying float vAlpha;

  void main() {
    vec2 field = aField * uViewport + uOffset * uParallax * (0.35 + aRand * 0.65);
    field = mod(field, uViewport) - uViewport * 0.5;
    field += vec2(sin(uTime * 0.3 + aRand * 40.0), cos(uTime * 0.23 + aRand * 23.0)) * 7.0;

    // each dot runs on its own slightly shifted clock
    float m = smoothstep(aRand * 0.35, aRand * 0.35 + 0.65, uMorph);
    float d = smoothstep(aRand * 0.4, aRand * 0.4 + 0.6, uDisperse);
    float w = m * (1.0 - d);

    vec2 p = mix(field, aShape, w);
    // a little swirl while travelling, zero at both ends
    vec2 dir = normalize(aShape - field + 0.001);
    p += vec2(-dir.y, dir.x) * sin(w * 3.14159) * 40.0 * (aRand - 0.5);

    vW = w;
    float twinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aRand) + aRand * 10.0);
    vAlpha = mix(uFieldAlpha * twinkle, 1.0, w);

    gl_Position = projectionMatrix * viewMatrix * vec4(p, -1.0, 1.0);
    gl_PointSize = uSize * mix(0.8 + aRand * 0.6, 1.35, w) * uPixelRatio;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  uniform float uOpacity;
  varying float vW;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = 1.0 - smoothstep(0.38, 0.5, d);
    vec3 col = mix(uInk, uAccent, vW);
    gl_FragColor = vec4(col, a * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

export class Dots {
  constructor({ scene, settings }) {
    this.scene = scene;
    this.s = settings;
    this.points = null;
    this.uniforms = {
      uMorph: { value: 0 },
      uDisperse: { value: 0 },
      uTime: { value: 0 },
      uParallax: { value: 0.12 },
      uSize: { value: settings.dotSize },
      uPixelRatio: { value: 1 },
      uFieldAlpha: { value: settings.fieldAlpha },
      uViewport: { value: new THREE.Vector2(1, 1) },
      uOffset: { value: new THREE.Vector2() },
      uInk: { value: new THREE.Color("#f1eadf") },
      uAccent: { value: new THREE.Color("#ff5b35") },
      uOpacity: { value: 0 },
    };
    this.timeline = null;
  }

  layout(vw, vh, pixelRatio) {
    this.uniforms.uViewport.value.set(vw, vh);
    this.uniforms.uPixelRatio.value = pixelRatio;

    const count = vw < 640 ? this.s.dotsMobile : this.s.dotsDesktop;
    const size = Math.min(vw, vh) * (vw < 640 ? 0.62 : 0.42);
    const shape = sampleShape(count, size);

    const n = shape.length / 2;
    const aField = new Float32Array(n * 2);
    const aRand = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      aField[i * 2] = Math.random();
      aField[i * 2 + 1] = Math.random();
      aRand[i] = Math.random();
    }
    // lift Nuri a little above centre so the dock doesn't crowd her
    for (let i = 1; i < shape.length; i += 2) shape[i] += vh * 0.04;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("aShape", new THREE.BufferAttribute(shape, 2));
    geo.setAttribute("aField", new THREE.BufferAttribute(aField, 2));
    geo.setAttribute("aRand", new THREE.BufferAttribute(aRand, 1));

    if (this.points) {
      this.scene.remove(this.points);
      this.points.geometry.dispose();
    } else {
      this.material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: this.uniforms,
        transparent: true,
        depthWrite: false,
      });
    }
    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = -1;
    this.scene.add(this.points);
    this.count = n;
  }

  /* intro: field → Nuri → hold → field. `onRelease` fires as she breaks up,
     which is the cue for the wall to come in. */
  playIntro({ onRelease, onDone } = {}) {
    const u = this.uniforms;
    this.timeline && this.timeline.kill();
    u.uMorph.value = 0;
    u.uDisperse.value = 0;
    u.uOpacity.value = 0;

    if (this.s.reducedMotion) {
      u.uOpacity.value = 1;
      onRelease && onRelease();
      onDone && onDone();
      return;
    }

    const T = this.s.introSpeed;
    this.timeline = gsap
      .timeline({ onComplete: onDone })
      .to(u.uOpacity, { value: 1, duration: 0.5 * T, ease: "power2.out" })
      .to(u.uMorph, { value: 1, duration: 1.6 * T, ease: "power3.inOut" }, 0.1 * T)
      .add(() => onRelease && onRelease(), `+=${0.7 * T}`)
      .to(u.uDisperse, { value: 1, duration: 1.4 * T, ease: "power3.inOut" }, "<");
  }

  /* reading a project: the field steps back */
  setReading(on) {
    gsap.to(this.uniforms.uOpacity, { value: on ? 0 : 1, duration: on ? 0.5 : 1.0, ease: "power2.out" });
  }

  update(t, offset) {
    this.uniforms.uTime.value = t;
    this.uniforms.uOffset.value.copy(offset);
    this.uniforms.uSize.value = this.s.dotSize;
    this.uniforms.uFieldAlpha.value = this.s.fieldAlpha;
    this.uniforms.uParallax.value = this.s.reducedMotion ? 0 : this.s.parallax;
  }
}

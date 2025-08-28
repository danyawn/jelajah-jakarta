'use client';

import { useEffect, useRef, FC, useMemo } from "react";
import * as THREE from "three";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";

import "./Hyperspeed.css";

interface Distortion {
  uniforms: Record<string, { value: unknown }>;
  getDistortion: string;
  getJS?: (progress: number, time: number) => THREE.Vector3;
}

interface Colors {
  roadColor: number;
  islandColor: number;
  background: number;
  shoulderLines: number;
  brokenLines: number;
  leftCars: number[];
  rightCars: number[];
  sticks: number;
}

interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void;
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void;
  distortion?: string | Distortion;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: [number, number];
  lightStickHeight: [number, number];
  movingAwaySpeed: [number, number];
  movingCloserSpeed: [number, number];
  carLightsLength: [number, number];
  carLightsRadius: [number, number];
  carWidthPercentage: [number, number];
  carShiftX: [number, number];
  carFloorSeparation: [number, number];
  colors: Colors;
}

interface HyperspeedProps {
  effectOptions?: Partial<HyperspeedOptions>;
}

// Jakarta-themed preset with Indonesian flag colors and vibrant city lights
const jakartaPreset: HyperspeedOptions = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 12,
  islandWidth: 3,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 30,
  lightPairsPerRoadWay: 50,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x0f172a, // Very dark slate
    islandColor: 0x1e293b,
    background: 0x020617, // Ultra dark background
    shoulderLines: 0x22d3ee, // Cyan accent
    brokenLines: 0x22d3ee,
    leftCars: [0xff4757, 0xff3742, 0xdc143c], // Red - Indonesian flag
    rightCars: [0x22d3ee, 0x06b6d4, 0x0891b2], // Cyan - Modern accent
    sticks: 0xffa502, // Orange - Jakarta sunset
  },
};

function pickRandom<T>(arr: T | T[]): T {
  if (Array.isArray(arr)) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return arr;
}

// Simplified App class for better performance
class App {
  container: HTMLElement;
  options: HyperspeedOptions;
  renderer: THREE.WebGLRenderer;
  composer: EffectComposer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;
  disposed: boolean;
  fogUniforms: Record<string, { value: unknown }>;
  road?: THREE.Mesh;
  lights?: THREE.Points;

  constructor(container: HTMLElement, options: HyperspeedOptions) {
    this.options = options;
    this.container = container;
    this.disposed = false;
    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.composer = new EffectComposer(this.renderer);
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      options.fov,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 8, -5);

    this.scene = new THREE.Scene();
    const fog = new THREE.Fog(options.colors.background, 50, 500);
    this.scene.fog = fog;

    this.fogUniforms = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far },
    };

    this.tick = this.tick.bind(this);
    this.init();
  }

  init() {
    this.initPasses();
    this.createSimpleRoad();
    this.createLights();
    this.tick();

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  initPasses() {
    const renderPass = new RenderPass(this.scene, this.camera);
    const bloomPass = new EffectPass(
      this.camera,
      new BloomEffect({
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0,
        resolutionScale: 0.5,
      })
    );

    renderPass.renderToScreen = false;
    bloomPass.renderToScreen = true;

    this.composer.addPass(renderPass);
    this.composer.addPass(bloomPass);
  }

  createSimpleRoad() {
    const geometry = new THREE.PlaneGeometry(50, 200, 32, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(this.options.colors.roadColor) },
        ...this.fogUniforms,
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec3 pos = position;
          pos.z += sin(pos.x * 0.1 + uTime) * 2.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv;
          uv.y = mod(uv.y + uTime * 0.1, 1.0);
          
          float lines = step(0.95, fract(uv.x * 8.0)) * step(0.3, fract(uv.y * 20.0));
          vec3 color = mix(uColor, vec3(1.0), lines * 0.3);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    this.road = new THREE.Mesh(geometry, material);
    this.road.rotation.x = -Math.PI / 2;
    this.road.position.z = -50;
    this.scene.add(this.road);
  }

  createLights() {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < 200; i++) {
      positions.push(
        (Math.random() - 0.5) * 100,
        Math.random() * 20,
        -Math.random() * 200
      );

      const color = new THREE.Color(pickRandom(this.options.colors.leftCars));
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    this.lights = new THREE.Points(geometry, material);
    this.scene.add(this.lights);
  }

  onWindowResize() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.composer.setSize(width, height);
  }

  update() {
    const time = this.clock.getElapsedTime();

    if (this.road && this.road.material instanceof THREE.ShaderMaterial) {
      this.road.material.uniforms.uTime.value = time;
    }

    if (this.lights) {
      this.lights.rotation.y = time * 0.1;
    }
  }

  render() {
    this.composer.render();
  }

  tick() {
    if (this.disposed) return;
    
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  }

  dispose() {
    this.disposed = true;
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.composer) {
      this.composer.dispose();
    }
    if (this.scene) {
      this.scene.clear();
    }
    
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }
}

const Hyperspeed: FC<HyperspeedProps> = ({ effectOptions = {} }) => {
  const mergedOptions: HyperspeedOptions = useMemo(() => ({
    ...jakartaPreset,
    ...effectOptions,
  }), [effectOptions]);
  
  const hyperspeed = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.dispose();
    }

    const container = hyperspeed.current;
    if (!container) return;

    const myApp = new App(container, mergedOptions);
    appRef.current = myApp;

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
      }
    };
  }, [mergedOptions]);

  return <div id="lights" ref={hyperspeed}></div>;
};

export default Hyperspeed;

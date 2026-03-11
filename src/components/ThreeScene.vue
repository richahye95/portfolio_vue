<template>
  <div ref="pinContainer" class="pin-container">
    <canvas ref="canvasRef" class="webgl"></canvas>

    <div class="wrap">
      <section class="section text_white">
        <h1>web publisher</h1>
      </section>
      <section class="section text_gray">
        <h1>Front-end developer</h1>
      </section>
      <section class="section">
        <h1>portfolio <br><span>차혜리</span></h1>
      </section>

      <section class="space"></section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const canvasRef = ref(null);
const pinContainer = ref(null);

onMounted(() => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // ── 도형 ──
  const geometry = new THREE.IcosahedronGeometry(1.5, 0);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 1,
    ior: 2.417,
    thickness: 2,
    specularIntensity: 2,
    specularColor: 0xffffff,
    transparent: true,
    flatShading: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // ── 조명 ──
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 100);
  spotLight.position.set(5, 5, 5);
  spotLight.angle = 0.3;
  scene.add(spotLight);

  const purpleLight = new THREE.PointLight(0x7f00ff, 50);
  purpleLight.position.set(-5, 2, 3);
  scene.add(purpleLight);

  const blueLight = new THREE.PointLight(0x00c3ff, 50);
  blueLight.position.set(5, -3, 2);
  scene.add(blueLight);

  // ── 배경 그라데이션 ──
  gsap.to(canvasRef.value, {
    backgroundImage: 'linear-gradient(to bottom, #ededed 0%, #ffffff 100%)',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: () => `+=${pinContainer.value.offsetHeight}`,
      scrub: true,
    },
  });

  // ── 회전 애니메이션 ──
  gsap.to(cube.rotation, {
    x: Math.PI * 1,
    y: Math.PI * 2,
    z: Math.PI,
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: () => `+=${pinContainer.value.offsetHeight}`,
      scrub: 2,
    },
  });

  // ── 렌더 루프 ──
  const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  // ── 리사이즈 ──
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ── 핀 ──
  ScrollTrigger.create({
    trigger: '.pin-container',
    start: 'bottom bottom',
    pin: true,
    pinSpacing: false,
  });
});
</script>

<style scoped>
.wrap {
  width: 100%;
  overflow-x: hidden;
}

.webgl {
  width: 100% !important;
  position: sticky;
  top: 0;
  left: 0;
  outline: none;
  z-index: -1;
  background: radial-gradient(circle at center, #1a1c2c 0%, #050505 100%);
}

.section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #111;
  font-family: sans-serif;
  pointer-events: none;
}

.section h1 {
  text-transform: uppercase;
  /* 기본(데스크탑): 6vw, 태블릿에서 줄고, 모바일 최소값 보장 */
  font-size: clamp(2rem, 6vw, 6rem);
  text-align: center;
  line-height: 1.15;
  word-break: keep-all;
}

.section h1 span {
  font-weight: 400;
  font-size: 0.4em;
  display: block; /* 줄바꿈 후 이름이 잘리지 않게 */
}

.text_white { color: #fff; }
.text_gray  { color: #5e5e5e; }

.text_small h1 {
  font-size: clamp(1rem, 2vw, 2rem);
  text-align: center;
  line-height: 1.5;
}

/* ── 태블릿 (768px ~ 1024px) ── */
@media (max-width: 1024px) {
  .section h1 {
    font-size: clamp(1.8rem, 7vw, 5rem);
  }
}

/* ── 모바일 (~ 767px) ── */
@media (max-width: 767px) {
  .section h1 {
    /* 모바일에서 vw 비율을 높여 화면 꽉 차도록, 최소 1.6rem 보장 */
    font-size: clamp(1.6rem, 9vw, 3.5rem);
    letter-spacing: -0.02em;
  }
}

/* ── 소형 모바일 (~ 380px) ── */
@media (max-width: 380px) {
  .section h1 {
    font-size: clamp(1.4rem, 10vw, 2.8rem);
  }
}
</style>
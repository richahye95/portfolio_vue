<template>
  <div ref="pinContainer" class="pin-container" >
    <canvas ref="canvasRef" class="webgl"></canvas>

    <div class="wrap">
      <section class="section text_white">
      <h1>Scroll Down</h1>
    </section>
    <section class="section text_gray">
      <h1>Keep Scrolling</h1>
    </section>
    <section class="section">
      <h1>Three.js + GSAP</h1>
    </section>
    <section class="space">
    </section>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);


const canvasRef = ref(null);

onMounted(() => {
  // 1. Scene & Camera 설정
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 3;

  // 2. Renderer 설정 (배경 투명도 허용)
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true, // CSS 배경(그라데이션)을 보이기 위해 투명 설정
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace; 
renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // 3. 도형 생성
  const geometry = new THREE.IcosahedronGeometry(1.5, 0);

const material = new THREE.MeshPhysicalMaterial({ 
  color: 0xffffff,
  metalness: 0,
  roughness: 0,            // 극강의 매끄러움
  transmission: 1,         // 투명도 (유리처럼 투과)
  ior: 2.417,              // 다이아몬드의 실제 굴절률 (매우 중요!)
  thickness: 2,            // 내부 굴절 두께
  specularIntensity: 2,    // 반사광 강도
  specularColor: 0xffffff,
  transparent: true,
  flatShading: true,       // 보석의 각진 면 살리기
});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 4. 조명
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // 전체 조명은 아주 어둡게
scene.add(ambientLight);

// 메인 하이라이트 (다이아몬드 상단 반짝임)
const spotLight = new THREE.SpotLight(0xffffff, 100);
spotLight.position.set(5, 5, 5);
spotLight.angle = 0.3;
scene.add(spotLight);

// 보라/파란색 보조 조명 (영롱한 보석 광채 추가)
const purpleLight = new THREE.PointLight(0x7f00ff, 50);
purpleLight.position.set(-5, 2, 3);
scene.add(purpleLight);

const blueLight = new THREE.PointLight(0x00c3ff, 50);
blueLight.position.set(5, -3, 2);
scene.add(blueLight);

  // 배경 그라데이션 애니메이션 추가
  gsap.to(canvasRef.value, {
   // 스크롤 끝지점에서 거의 흰색에 가까운 실버로 변화
  backgroundImage: "linear-gradient(to bottom, #ededed 0%, #ffffff 100%)",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  }
  });

  // 5. GSAP ScrollTrigger를 이용한 회전 애니메이션
  gsap.to(cube.rotation, {
    x: Math.PI * 1,
    y: Math.PI * 2,
    z: Math.PI,
    scrollTrigger: {
      trigger: "body",      // 스크롤 감지 범위
      start: "top top",     // 시작 시점
      end: "bottom bottom", // 종료 시점
      scrub: 2,            // 스크롤 속도에 반응 (숫자가 클수록 부드러움)
    }
  });

  // 6. 애니메이션 루프
  const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  // 7. 윈도우 리사이즈 대응
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 8. pin
  ScrollTrigger.create({
  trigger: ".pin-container", // 보석과 텍스트가 들어있는 전체 컨테이너
  start: "bottom bottom",
  pin: true,
  pinSpacing: false, // 다음 컴포넌트(Intro)가 바로 덮고 올라오게 함
});


});
</script>

<style scoped>
.wrap{
  width: 100%;
  overflow-x: hidden;
}
.webgl {
  width: 100% !important;
  position: sticky;
  top: 0;
  left: 0;
  outline: none;
  z-index: -1; /* 텍스트 뒤로 배치 */
  background: radial-gradient(circle at center, #1a1c2c 0%, #050505 100%);
}


.section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #111;
  font-size: 3rem;
  font-family: sans-serif;
  pointer-events: none; /* 클릭 이벤트가 캔버스에 전달되도록 설정 */
}
.text_white{
  color: #fff;
}
.text_gray{
  color: #5e5e5e;
}
</style>
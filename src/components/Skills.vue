<template>
  <section class="skill-section">

    <!-- 배경 별들 (랜덤 작은 별) -->
    <canvas ref="starsCanvas" class="stars-bg"></canvas>

    <!-- 섹션 타이틀 -->
    <div class="section-header">
      <span class="section-label">Skills</span>
      <h2 class="section-title">Tech<br /><em>Stack</em></h2>
    </div>

    <!-- 별자리 SVG + 아이콘 레이어 -->
    <div class="constellation-wrap">
      <svg
        class="constellation-svg"
        :viewBox="`0 0 ${W} ${H}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- 연결선 -->
        <g class="lines">
          <line
            v-for="(edge, ei) in edges"
            :key="ei"
            :x1="stars[edge[0]].x"
            :y1="stars[edge[0]].y"
            :x2="stars[edge[1]].x"
            :y2="stars[edge[1]].y"
            class="constellation-line"
            :class="{ 'line--lit': litEdges.has(ei) }"
          />
          <!-- 빛 번짐 (lit 상태일 때 glow 레이어) -->
          <line
            v-for="(edge, ei) in edges"
            :key="`g-${ei}`"
            :x1="stars[edge[0]].x"
            :y1="stars[edge[0]].y"
            :x2="stars[edge[1]].x"
            :y2="stars[edge[1]].y"
            class="constellation-line--glow"
            :class="{ 'line--lit': litEdges.has(ei) }"
          />
        </g>
      </svg>

      <!-- 스킬 아이콘 노드 -->
      <div
        v-for="(star, si) in stars"
        :key="si"
        class="star-node"
        :style="{ left: star.x + 'px', top: star.y + 'px' }"
        @mouseenter="onHover(si)"
        @mouseleave="onLeave"
      >
        <div class="star-core" :class="{ 'star-core--active': hoveredStar === si }">
          <img :src="star.icon" :alt="star.name" class="star-icon" />
        </div>
        <div class="star-pulse" :class="{ 'star-pulse--active': hoveredStar === si }"></div>
        <span class="star-label" :class="{ 'star-label--active': hoveredStar === si }">
          {{ star.name }}
        </span>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';

// ── 캔버스 크기 ──
const W = 700;
const H = 620;

// ── 전갈자리 별 위치 + 스킬 ──
//
// 구조:
//  꼬리(우상단):  React(0) → Vue(1) → TypeScript(2)
//  TypeScript에서 T자 3갈래:
//    ① 위  갈래: TypeScript(2) → Next.js(14)
//    ② 아래 갈래: TypeScript(2) → Nuxt(15)
//    ③ 메인 몸통: TypeScript(2) → JavaScript(3) → Node.js(4) → Figma(5) → GSAP(6) → CSS(7) → Sass(8) → Git(9) → GitHub(10)
//  집게(좌하단): Figma(5) → HTML(11) → Vite(12) → Vite2(13)

const stars = [
  // ── 꼬리 (우상단) ──
  { x: 570, y:  55, name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },       // 0
  { x: 600, y: 115, name: 'Vue',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },        // 1
  { x: 600, y: 185, name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' }, // 2 ← T자 분기점

  // ── T자 아래 갈래 ──
  { x: 620, y: 260, name: 'Nuxt',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },      // 3
  { x: 620, y: 350, name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' }, // 4

  // ── 메인 몸통 (TypeScript → 좌하단 S자) ──
  { x: 375, y: 280, name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },       // 5
  { x: 310, y: 330, name: 'Figma',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },        // 6 ← 집게 분기점
  { x: 265, y: 395, name: 'GSAP',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },          // 7
  { x: 285, y: 460, name: 'CSS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },          // 8
  { x: 345, y: 508, name: 'Sass',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },          // 9
  { x: 400, y: 550, name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },            // 10
  { x: 445, y: 590, name: 'GitHub',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },      // 11

  // ── 왼쪽 집게 (Figma에서 분기) ──
  { x: 170, y: 345, name: 'HTML',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },        // 12
  { x: 105, y: 390, name: 'Vite',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },      // 13
  { x: 115, y: 455, name: 'Sass2',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },          // 14
];

// ── 연결선 ──
const edges = [
  // 꼬리: React → Vue → TypeScript
  [0, 1], [1, 2],

  // TypeScript 2갈래 (Next.js 제거 후)
  [2, 3], [3, 4],  // 아래 갈래 → Nuxt
  [2, 5],  // 메인 몸통 → JavaScript

  // 메인 몸통
  [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],

  // 왼쪽 집게 (Figma에서 분기)
  [6, 12], [12, 13], [13, 14],
];

// ── 호버 상태 ──
const hoveredStar = ref(null);
const litEdges = reactive(new Set());

// 깊이(depth)만큼 BFS로 연결된 엣지를 수집
const getEdgesWithinDepth = (startNode, depth) => {
  const result = new Set();
  let currentNodes = new Set([startNode]);

  for (let d = 0; d < depth; d++) {
    const nextNodes = new Set();
    edges.forEach((e, ei) => {
      if (currentNodes.has(e[0]) || currentNodes.has(e[1])) {
        result.add(ei);
        nextNodes.add(e[0]);
        nextNodes.add(e[1]);
      }
    });
    currentNodes = nextNodes;
  }
  return result;
};

const onHover = (si) => {
  hoveredStar.value = si;
  litEdges.clear();

  // ↓ 숫자를 바꾸면 빛나는 범위 조절
  //   1 = 직접 연결된 선만
  //   2 = 앞뒤 2개씩  ← 현재 설정
  //   3 = 앞뒤 3개씩
  const depth = 2;

  getEdgesWithinDepth(si, depth).forEach(ei => litEdges.add(ei));
};

const onLeave = () => {
  hoveredStar.value = null;
  clearTimeout(litTimeout);
  litEdges.clear();
};

// ── 배경 별 캔버스 ──
const starsCanvas = ref(null);

onMounted(() => {
  const canvas = starsCanvas.value;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  for (let i = 0; i < 280; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 1.2;
    const alpha = Math.random() * 0.7 + 0.1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ────────────────────────────
   섹션 전체
──────────────────────────── */
.skill-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #04060f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Pretendard', -apple-system, sans-serif;
}

/* ── 배경 별 ── */
.stars-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* ── 섹션 타이틀 ── */
.section-header {
  position: absolute;
  top: 7vh;
  left: 8vw;
  z-index: 2;
}

.section-label {
  font-size: 0.62rem;
  color: #3a4060;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 700;
  display: block;
  margin-bottom: 10px;
}

.section-title {
  font-size: clamp(2.4rem, 4vw, 4.5rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.section-title em {
  font-style: normal;
  color: #1e2340;
  -webkit-text-stroke: 1px #2e3560;
}

/* ── 별자리 래퍼 ── */
.constellation-wrap {
  position: relative;
  width: 700px;
  height: 620px;
  flex-shrink: 0;
}

/* ── SVG ── */
.constellation-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* ── 연결선 기본 ── */
.constellation-line {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1px;
  transition: stroke 0.4s ease, stroke-width 0.4s ease, stroke-opacity 0.4s ease;
  fill: none;
}

.constellation-line.line--lit {
  stroke: rgba(160, 190, 255, 0.7);
  stroke-width: 1.5px;
}

/* ── 연결선 glow 레이어 ── */
.constellation-line--glow {
  stroke: rgba(100, 150, 255, 0);
  stroke-width: 6px;
  filter: blur(4px);
  fill: none;
  transition: stroke 0.35s ease, opacity 0.35s ease;
  opacity: 0;
  pointer-events: none;
}

.constellation-line--glow.line--lit {
  stroke: rgba(120, 170, 255, 0.45);
  opacity: 1;
}

/* ── 별 노드 ── */
.star-node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  z-index: 5;
}

/* ── 별 코어 ── */
.star-core {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #090d1e;
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.star-core--active {
  border-color: rgba(160, 200, 255, 0.6);
  background: #0d1530;
  box-shadow:
    0 0 12px rgba(100, 160, 255, 0.4),
    0 0 30px rgba(80, 130, 255, 0.2);
  transform: scale(1.15);
}

.star-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: brightness(0.85);
  transition: filter 0.3s ease;
}

.star-core--active .star-icon {
  filter: brightness(1.1);
}

/* ── 펄스 링 ── */
.star-pulse {
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(120, 180, 255, 0);
  transition: none;
  pointer-events: none;
  z-index: 1;
}

.star-pulse--active {
  animation: pulse-ring 1.2s ease-out infinite;
}

@keyframes pulse-ring {
  0%   { transform: translate(-50%, -50%) scale(1);   border-color: rgba(120,180,255,0.5); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2.2); border-color: rgba(120,180,255,0);   opacity: 0; }
}

.star-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(120, 180, 255, 0);
  pointer-events: none;
  z-index: 1;
}

/* ── 레이블 ── */
.star-label {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.3s ease, opacity 0.3s ease;
  pointer-events: none;
}

.star-label--active {
  color: rgba(180, 210, 255, 0.9);
}
</style>
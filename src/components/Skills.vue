<template>
  <section class="skill-section">

    <!-- 배경 별들 -->
    <canvas ref="starsCanvas" class="stars-bg"></canvas>

    <!-- 섹션 타이틀 -->
    <div class="section-header">
      <span class="section-label">Skills</span>
    </div>

    <!-- 별자리 SVG + 아이콘 레이어 -->
    <div
      class="constellation-wrap"
      ref="wrapRef"
      :style="{ width: scaledW + 'px', height: scaledH + 'px' }"
    >
      <svg
        class="constellation-svg"
        :viewBox="`0 0 ${BASE_W} ${BASE_H}`"
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

      <!-- 스킬 아이콘 노드: 스케일된 좌표로 배치 -->
      <div
        v-for="(star, si) in stars"
        :key="si"
        class="star-node"
        :style="{
          left: star.x * scale + 'px',
          top:  star.y * scale + 'px',
        }"
        @mouseenter="onHover(si)"
        @mouseleave="onLeave"
        @click="onHover(si)"
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
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';

// ── 기준 캔버스 크기 (디자인 원본) ──
const BASE_W = 700;
const BASE_H = 620;

// ── 현재 스케일 (반응형) ──
const scale = ref(1);
const scaledW = computed(() => BASE_W * scale.value);
const scaledH = computed(() => BASE_H * scale.value);

// 섹션 너비 기준으로 스케일 계산
const updateScale = () => {
  const vw = window.innerWidth;
  if (vw >= 1200) {
    scale.value = 1;
  } else if (vw >= 900) {
    scale.value = 0.78;
  } else if (vw >= 600) {
    scale.value = 0.58;
  } else if (vw >= 400) {
    scale.value = 0.46;
  } else {
    scale.value = 0.38;
  }
};

// ── 스킬 별 데이터 (좌표는 BASE 기준 고정) ──
const stars = [
  { x: 570, y:  55, name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { x: 600, y: 115, name: 'Vue',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { x: 600, y: 185, name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { x: 620, y: 260, name: 'Vite',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { x: 620, y: 350, name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { x: 375, y: 280, name: 'Figma',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { x: 310, y: 330, name: 'HTML',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { x: 265, y: 395, name: 'CSS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { x: 285, y: 460, name: 'Sass',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { x: 345, y: 508, name: 'GSAP',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { x: 170, y: 345, name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { x: 105, y: 390, name: 'GitHub',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
];

const edges = [
  [0, 1], [1, 2],
  [2, 3], [3, 4],
  [2, 5],
  [5, 6], [6, 7], [7, 8], [8, 9],
  [6, 10], [10, 11],
];

// ── 호버 상태 ──
const hoveredStar = ref(null);
const litEdges = reactive(new Set());
let litTimeout = null;

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
  getEdgesWithinDepth(si, 2).forEach(ei => litEdges.add(ei));
};

const onLeave = () => {
  hoveredStar.value = null;
  clearTimeout(litTimeout);
  litEdges.clear();
};

// ── 배경 별 캔버스 ──
const starsCanvas = ref(null);

const drawStars = () => {
  const canvas = starsCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
};

const onResize = () => {
  updateScale();
  drawStars();
};

onMounted(() => {
  updateScale();
  drawStars();
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ── 섹션 전체 ── */
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
  font-size: 1rem;
  color: #3a4060;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 700;
  display: block;
  margin-bottom: 10px;
}

/* ── 별자리 래퍼 ── */
.constellation-wrap {
  position: relative;
  flex-shrink: 0;
  /* width / height는 :style 바인딩으로 동적 적용 */
}

/* ── SVG: viewBox 기준으로 내부 좌표 그대로 사용, 크기만 스케일 ── */
.constellation-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* ── 연결선 ── */
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
  top: 50%;
  left: 50%;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(120, 180, 255, 0);
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

/* ── 모바일: 아이콘/레이블 크기 축소 ── */
@media (max-width: 767px) {
  .star-core {
    width: 32px;
    height: 32px;
  }

  .star-icon {
    width: 15px;
    height: 15px;
  }

  .star-pulse {
    width: 32px;
    height: 32px;
  }

  .star-label {
    font-size: 0.48rem;
  }

  .section-label {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .star-core {
    width: 26px;
    height: 26px;
  }

  .star-icon {
    width: 12px;
    height: 12px;
  }

  .star-pulse {
    width: 26px;
    height: 26px;
  }

  .star-label {
    font-size: 0.42rem;
    letter-spacing: 0.05em;
  }
}
</style>
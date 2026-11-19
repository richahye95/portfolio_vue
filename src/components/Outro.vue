<template>
  <footer ref="outroRef" class="outro-section" :class="{ 'is-visible': isVisible }">
    <!-- 배경 별빛 캔버스 (하단 어두운 영역에서 자연스럽게 등장) -->
    <canvas ref="starsCanvas" class="stars-bg" aria-hidden="true"></canvas>

    <!-- 메인 타이틀 -->
    <div class="outro-content">
      <h2 class="outro-title">Thank you</h2>
    </div>

    <!-- 하단 TOP 버튼 -->
    <button type="button" class="outro-top-btn" @click="scrollToTop" aria-label="맨 위로 이동">
      <span>TOP</span>
      <span class="top-arrow" aria-hidden="true">↑</span>
    </button>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
}

const outroRef = ref<HTMLElement | null>(null);
const starsCanvas = ref<HTMLCanvasElement | null>(null);
const isVisible = ref(false);

let stars: Star[] = [];
let rafId: number | null = null;
let observer: IntersectionObserver | null = null;
let prefersReducedMotion = false;

const initStars = (width: number, height: number) => {
  const count = Math.min(200, Math.max(80, Math.floor((width * height) / 6000)));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.2 + 0.25,
    baseAlpha: Math.random() * 0.65 + 0.15,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.012 + 0.004,
  }));
};

const renderStars = (time = 0) => {
  const canvas = starsCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const s of stars) {
    const twinkle = prefersReducedMotion
      ? 1
      : 0.65 + 0.35 * Math.sin(time * s.speed + s.phase);
    const alpha = s.baseAlpha * twinkle;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220, 232, 255, ${alpha.toFixed(3)})`;
    ctx.fill();
  }
};

const animate = (time: number) => {
  renderStars(time * 0.06);
  rafId = window.requestAnimationFrame(animate);
};

const setupCanvas = () => {
  const canvas = starsCanvas.value;
  if (!canvas) return;
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;
  initStars(width, height);
  renderStars(0);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setupCanvas();

  if (!prefersReducedMotion) {
    rafId = window.requestAnimationFrame(animate);
  }

  window.addEventListener('resize', setupCanvas);

  if (outroRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            observer?.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(outroRef.value);
  }
});

onUnmounted(() => {
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
  }
  window.removeEventListener('resize', setupCanvas);
  observer?.disconnect();
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

.outro-section {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #fafbfd 7%,
    #ebf0f6 14%,
    #d0d6e2 21%,
    #aab2c4 28%,
    #7e879d 35%,
    #535c73 42%,
    #32394f 49%,
    #1b2135 57%,
    #0e1324 66%,
    #070a17 76%,
    #050711 88%,
    #04060f 100%
  );
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 8vw;
  box-sizing: border-box;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ── 배경 별빛 (상단 흰색 구간은 투명하게 페이드) ── */
.stars-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  -webkit-mask-image: linear-gradient(
    180deg,
    transparent 0%,
    transparent 36%,
    rgba(0, 0, 0, 0.22) 50%,
    rgba(0, 0, 0, 0.68) 66%,
    #000000 84%
  );
  mask-image: linear-gradient(
    180deg,
    transparent 0%,
    transparent 36%,
    rgba(0, 0, 0, 0.22) 50%,
    rgba(0, 0, 0, 0.68) 66%,
    #000000 84%
  );
}

/* ── 중앙 타이포그래피 ── */
.outro-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.outro-title {
  margin: 0;
  font-size: clamp(2.8rem, 7.5vw, 6.2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: #ffffff;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.9s ease,
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.outro-section.is-visible .outro-title {
  opacity: 1;
  transform: translateY(0);
}

/* ── 하단 TOP 버튼 ── */
.outro-top-btn {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 0;
  color: rgba(255, 255, 255, 0.55);
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  cursor: pointer;
  transition: color 0.25s ease;
}

.outro-top-btn:hover {
  color: #ffffff;
  border-color: transparent;
}

.outro-top-btn:focus-visible {
  outline: 1px solid rgba(255, 255, 255, 0.7);
  outline-offset: 4px;
}

.top-arrow {
  display: inline-block;
  transition: transform 0.25s ease;
}

.outro-top-btn:hover .top-arrow {
  transform: translateY(-3px);
}

/* ── 모바일 (~ 767px) ── */
@media (max-width: 767px) {
  .outro-section {
    padding: 0 5vw;
  }

  .outro-top-btn {
    bottom: 28px;
    font-size: 0.72rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .outro-title {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>

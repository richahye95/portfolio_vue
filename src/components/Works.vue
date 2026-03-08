<template>
  <div ref="horizontalSection" class="horizontal-container">
    <div class="pin-wrap" ref="pinWrapRef">

      <!-- ── layout 순서대로 렌더링 ── -->
      <template v-for="(block, bi) in layout" :key="bi">

        <!-- 단독 카드 -->
        <div
          v-if="block.type === 'single'"
          class="project-card"
          :class="`project-card--${projects[block.index].size}`"
          @click="openModal(block.index)"
        >
          <img :src="projects[block.index].image" :alt="projects[block.index].title" class="project-card__img" />
          <div class="project-card__overlay">
            <div class="project-card__info">
              <span class="project-card__num">{{ String(block.index + 1).padStart(2, '0') }}</span>
              <h3 class="project-card__title">{{ projects[block.index].title }}</h3>
              <p class="project-card__sub">{{ projects[block.index].subtitle }}</p>
            </div>
          </div>
        </div>

        <!-- mixed-col: wide가 1행, small 2개가 2행 -->
        <div v-else-if="block.type === 'mixed-wide-top'" class="mixed-col">
          <div
            class="project-card project-card--wide"
            @click="openModal(block.wide)"
          >
            <img :src="projects[block.wide].image" :alt="projects[block.wide].title" class="project-card__img" />
            <div class="project-card__overlay">
              <div class="project-card__info">
                <span class="project-card__num">{{ String(block.wide + 1).padStart(2, '0') }}</span>
                <h3 class="project-card__title">{{ projects[block.wide].title }}</h3>
                <p class="project-card__sub">{{ projects[block.wide].subtitle }}</p>
              </div>
            </div>
          </div>
          <div class="small-row">
            <div
              v-for="si in block.smalls" :key="si"
              class="project-card project-card--small"
              @click="openModal(si)"
            >
              <img :src="projects[si].image" :alt="projects[si].title" class="project-card__img" />
              <div class="project-card__overlay">
                <div class="project-card__info">
                  <span class="project-card__num">{{ String(si + 1).padStart(2, '0') }}</span>
                  <h3 class="project-card__title">{{ projects[si].title }}</h3>
                  <p class="project-card__sub">{{ projects[si].subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- mixed-col: small 2개가 1행, wide가 2행 -->
        <div v-else-if="block.type === 'mixed-small-top'" class="mixed-col">
          <div class="small-row">
            <div
              v-for="si in block.smalls" :key="si"
              class="project-card project-card--small"
              @click="openModal(si)"
            >
              <img :src="projects[si].image" :alt="projects[si].title" class="project-card__img" />
              <div class="project-card__overlay">
                <div class="project-card__info">
                  <span class="project-card__num">{{ String(si + 1).padStart(2, '0') }}</span>
                  <h3 class="project-card__title">{{ projects[si].title }}</h3>
                  <p class="project-card__sub">{{ projects[si].subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="project-card project-card--wide"
            @click="openModal(block.wide)"
          >
            <img :src="projects[block.wide].image" :alt="projects[block.wide].title" class="project-card__img" />
            <div class="project-card__overlay">
              <div class="project-card__info">
                <span class="project-card__num">{{ String(block.wide + 1).padStart(2, '0') }}</span>
                <h3 class="project-card__title">{{ projects[block.wide].title }}</h3>
                <p class="project-card__sub">{{ projects[block.wide].subtitle }}</p>
              </div>
            </div>
          </div>
        </div>

      </template>

    </div>

    <!-- ── 팝업 모달 ── -->
    <Transition name="modal">
      <div v-if="activeIndex !== null" class="modal-backdrop" @click.self="closeModal">
        <div class="modal">
          <button class="modal-close" @click="closeModal">✕</button>

          <div class="modal-inner">
            <!-- 좌측: 이미지 -->
            <div class="modal-left">
              <img
                :src="projects[activeIndex].image"
                :alt="projects[activeIndex].title"
                class="modal-img"
              />
              <div class="modal-tags">
                <span v-for="tag in projects[activeIndex].tags" :key="tag" class="modal-tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 우측: 정보 -->
            <div class="modal-right">
              <p class="modal-num">{{ String(activeIndex + 1).padStart(2, '0') }}</p>
              <h2 class="modal-title">{{ projects[activeIndex].title }}</h2>
              <p class="modal-sub">{{ projects[activeIndex].subtitle }}</p>
              <p class="modal-desc">{{ projects[activeIndex].description }}</p>

              <div class="modal-meta">
                <div
                  class="meta-item"
                  v-for="meta in projects[activeIndex].meta"
                  :key="meta.label"
                >
                  <span class="meta-label">{{ meta.label }}</span>
                  <span class="meta-value">{{ meta.value }}</span>
                </div>
              </div>

              <div class="modal-colors">
                <div
                  v-for="col in projects[activeIndex].colors"
                  :key="col"
                  class="modal-chip"
                  :style="{ background: col }"
                >
                  <span class="modal-chip-label">{{ col }}</span>
                </div>
              </div>

              <a :href="projects[activeIndex].link" class="modal-btn" target="_blank">
                View Project →
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const horizontalSection = ref(null);
const pinWrapRef = ref(null);
const activeIndex = ref(null);

// size: 'tall' | 'wide' | 'square' | 'small'
const projects = [
  {
    size: 'tall',
    title: 'Fnits Studio',
    subtitle: 'Branding · Web',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80',
    description: '스트리트웨어 브랜드 Fnits의 공식 온라인 스토어 및 브랜드 아이덴티티 디자인. 빈티지 감성과 현대적 UI를 결합하여 독창적인 쇼핑 경험을 제공합니다.',
    tags: ['Branding', 'Web Design', 'E-commerce'],
    link: '#',
    meta: [
      { label: 'Client', value: 'Fnits Studio' },
      { label: 'Year',   value: '2024' },
      { label: 'Role',   value: 'Design & Dev' },
      { label: 'Stack',  value: 'Vue, GSAP' },
    ],
    colors: ['#FFFFFF', '#F4F4F4', '#0ADADA', '#797979', '#505050', '#000000'],
  },
  {
    size: 'tall',
    title: 'Palace Archive',
    subtitle: 'UI/UX · Motion',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&q=80',
    description: '팔라스 스케이트보딩의 아카이브 플랫폼. 드롭 컬렉션과 히스토리를 시각적으로 탐색할 수 있는 인터랙티브 경험을 제공합니다.',
    tags: ['UI/UX', 'Motion', 'Archive'],
    link: '#',
    meta: [
      { label: 'Client', value: 'Palace Skate' },
      { label: 'Year',   value: '2024' },
      { label: 'Role',   value: 'UI Design' },
      { label: 'Stack',  value: 'React, Three.js' },
    ],
    colors: ['#FFFFFF', '#F4F4F4', '#ADADAD', '#797979', '#505050', '#000000'],
  },
  {
    size: 'small',
    title: 'Fnits Logo',
    subtitle: 'Identity',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
    description: 'Fnits 브랜드 로고타입 및 심볼 디자인. 레트로 스케이트 문화에서 영감을 받은 독창적인 레터링 시스템.',
    tags: ['Logo', 'Identity'],
    link: '#',
    meta: [
      { label: 'Client', value: 'Fnits Studio' },
      { label: 'Year',   value: '2024' },
      { label: 'Role',   value: 'Brand Design' },
      { label: 'Stack',  value: 'Illustrator' },
    ],
    colors: ['#FFFFFF', '#000000', '#F4F4F4', '#505050'],
  },
  {
    size: 'small',
    title: 'Icon Pack',
    subtitle: 'UI Icons',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
    description: '커머스 플랫폼을 위한 커스텀 아이콘 시스템. 일관된 그리드와 획 굵기로 완성된 200개 이상의 아이콘 세트.',
    tags: ['Icon', 'Design System'],
    link: '#',
    meta: [
      { label: 'Client', value: 'In-house' },
      { label: 'Year',   value: '2024' },
      { label: 'Role',   value: 'Icon Design' },
      { label: 'Count',  value: '200+ Icons' },
    ],
    colors: ['#FFFFFF', '#797979', '#000000'],
  },
  {
    size: 'wide',
    title: 'StyleSeller',
    subtitle: 'Product · Mobile App',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80',
    description: '개인 셀러를 위한 스타일 마켓플레이스. 빠른 상품 등록과 큐레이션 피드를 통해 빈티지 패션 거래를 혁신합니다.',
    tags: ['Product', 'Mobile', 'Marketplace'],
    link: '#',
    meta: [
      { label: 'Client', value: 'StyleSeller Inc.' },
      { label: 'Year',   value: '2023' },
      { label: 'Role',   value: 'Full-stack' },
      { label: 'Stack',  value: 'Nuxt, Node' },
    ],
    colors: ['#FFFFFF', '#F4F4F4', '#ADADAD', '#797979', '#505050', '#000000'],
  },
  {
    size: 'square',
    title: 'Motion Grid',
    subtitle: 'Creative Dev',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    description: '크리에이티브 에이전시의 포트폴리오 사이트. GSAP 기반의 고성능 스크롤 인터랙션과 3D 전환 효과.',
    tags: ['Motion', 'Creative', 'GSAP'],
    link: '#',
    meta: [
      { label: 'Client', value: 'Motion Grid' },
      { label: 'Year',   value: '2023' },
      { label: 'Role',   value: 'Creative Dev' },
      { label: 'Stack',  value: 'Vue, GSAP, WebGL' },
    ],
    colors: ['#FFFFFF', '#ADADAD', '#0A0A0A'],
  },
  {
    size: 'square',
    title: 'Mono Type',
    subtitle: 'Typography',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80',
    description: '타이포그래피 중심의 브랜드 가이드라인 시스템. 다양한 매체에서 일관된 타이포그래피 경험.',
    tags: ['Typography', 'Brand', 'System'],
    link: '#',
    meta: [
      { label: 'Client', value: 'Mono Type Co.' },
      { label: 'Year',   value: '2022' },
      { label: 'Role',   value: 'Design System' },
      { label: 'Stack',  value: 'Figma, Storybook' },
    ],
    colors: ['#FFFFFF', '#F4F4F4', '#797979', '#000000'],
  },
];

// ── 레이아웃 순서 정의 ──
// type: 'single'           → projects[index] 단독 카드
// type: 'mixed-small-top'  → small 2개(위) + wide(아래)
// type: 'mixed-wide-top'   → wide(위) + small 2개(아래)
//
// 원하는 순서: tall → mixed → tall → mixed → mixed(wide 1행, small 2행) → tall
const layout = [
  { type: 'single', index: 0 },                          // tall
  { type: 'mixed-small-top', smalls: [2, 3], wide: 4 },  // mixed (small 위, wide 아래)
  { type: 'single', index: 1 },                          // tall
  { type: 'mixed-wide-top',  wide: 4, smalls: [2, 3] },  // mixed (wide 위, small 아래)  ← 예시, 인덱스 조정하세요
  { type: 'single', index: 5 },                          // tall (square도 single로 넣기 가능)
];

onMounted(() => {
  const pinWrap = pinWrapRef.value;

  ScrollTrigger.create({
    trigger: horizontalSection.value,
    pin: true,
    scrub: 1,
    start: 'top top',
    end: () => '+=' + (pinWrap.scrollWidth - window.innerWidth),
    animation: gsap.to(pinWrap, {
      x: () => -(pinWrap.scrollWidth - window.innerWidth),
      ease: 'none',
    }),
    invalidateOnRefresh: true,
  });
});

const openModal = (index) => {
  activeIndex.value = index;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  activeIndex.value = null;
  document.body.style.overflow = '';
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ────────────────────────────
   컨테이너
──────────────────────────── */
.horizontal-container {
  overflow: hidden;
  background: #0a0a0a;
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: 'Pretendard', -apple-system, sans-serif;
}

/* ────────────────────────────
   핀랩 — 가로 스크롤 트랙
──────────────────────────── */
.pin-wrap {
  display: flex;
  flex-wrap: wrap;           /* 두 줄 배치 허용 */
  align-content: flex-start;
  width: max-content;
  height: 100vh;
  padding: 5vh 5vw;
  gap: 12px;
}

/* ────────────────────────────
   프로젝트 카드 — 공통
──────────────────────────── */
.project-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: #111;
  border: 1px solid #1c1c1c;
  /* 호버 시 테두리 밝아짐 */
  transition: border-color 0.3s ease;
}

.project-card:hover {
  border-color: #333;
}

/* ── small(위) + wide(아래) 묶음 컬럼 ── */
.mixed-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
  height: calc(90vh - 10px);
}

/* ── small 2개 가로 묶음 ── */
.small-row {
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-shrink: 0;
}

/* ── 카드 크기 변형 ──
   이미지의 사각형 분포를 참고:
   tall  = 세로 긴 카드  (1,2번 - 상단 두 개)
   small = 작은 정사각형 (3,4번 - 오른쪽 위 두 개)
   wide  = 가로 긴 카드  (5번 - 하단 큰 카드)
   square= 중간 정사각형 (6,7번 - 하단 오른쪽)
*/
.project-card--tall {
  width: 22vw;
  min-width: 240px;
  height: calc(90vh - 10px - 12px);   /* 두 줄 합친 전체 높이 */
}

.project-card--small {
  width: 14vw;
  min-width: 155px;
  height: calc((90vh - 10px - 12px) / 2 - 6px);
}

.project-card--wide {
  width: 100%;
  flex: 1;
}

.project-card--square {
  width: 18vw;
  min-width: 200px;
  height: calc((90vh - 10px - 12px) / 2 - 6px);
}

/* ── 이미지 ── */
.project-card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s ease;
  filter: brightness(0.75);
}

.project-card:hover .project-card__img {
  transform: scale(1.05);
  filter: brightness(0.6);
}

/* ── 오버레이 ── */
.project-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.65) 0%,
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.project-card__num {
  font-size: 0.58rem;
  color: rgba(255,255,255,0.4);
  font-weight: 700;
  letter-spacing: 0.14em;
}

.project-card__title {
  font-size: clamp(0.9rem, 1.4vw, 1.3rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.project-card__sub {
  font-size: 0.6rem;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ────────────────────────────
   모달 백드롭
──────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5vh 5vw;
}

/* ────────────────────────────
   모달 본체
──────────────────────────── */
.modal {
  background: #111111;
  border: 1px solid #222;
  border-radius: 24px;
  width: 100%;
  max-width: 980px;
  max-height: 86vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 10;
  background: #1a1a1a;
  border: 1px solid #252525;
  color: #666;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #222;
  color: #fff;
}

.modal-inner {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* 모달 좌측 */
.modal-left {
  width: 46%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1a1a1a;
}

.modal-img {
  flex: 1;
  width: 100%;
  height: 0;
  min-height: 300px;
  object-fit: cover;
  display: block;
}

.modal-tags {
  padding: 18px 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  background: #0d0d0d;
  border-top: 1px solid #1a1a1a;
  flex-shrink: 0;
}

.modal-tag {
  font-size: 0.62rem;
  color: #777;
  border: 1px solid #222;
  padding: 4px 13px;
  border-radius: 20px;
  background: #141414;
  letter-spacing: 0.06em;
}

/* 모달 우측 */
.modal-right {
  flex: 1;
  padding: 44px 38px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
}

.modal-num {
  font-size: 0.62rem;
  color: #2e2e2e;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.modal-title {
  font-size: clamp(1.8rem, 2.8vw, 2.5rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.modal-sub {
  font-size: 0.68rem;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.modal-desc {
  font-size: 0.82rem;
  color: #5a5a5a;
  line-height: 1.85;
  padding-top: 12px;
  border-top: 1px solid #1a1a1a;
}

.modal-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.meta-item {
  background: #0d0d0d;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  padding: 13px 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.meta-label {
  font-size: 0.56rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
}

.meta-value {
  font-size: 0.8rem;
  color: #ddd;
  font-weight: 600;
}

/* 모달 컬러 칩 */
.modal-colors {
  display: flex;
  gap: 6px;
}

.modal-chip {
  flex: 1;
  height: 32px;
  border-radius: 7px;
  border: 1px solid rgba(255,255,255,0.04);
  display: flex;
  align-items: flex-end;
  padding: 2px 5px;
}

.modal-chip-label {
  font-size: 0.46rem;
  color: rgba(255,255,255,0.3);
  font-weight: 600;
  letter-spacing: 0.04em;
  mix-blend-mode: difference;
}

/* 모달 CTA */
.modal-btn {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 26px;
  background: #fff;
  color: #000;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  border-radius: 10px;
  transition: background 0.2s;
  text-transform: uppercase;
}

.modal-btn:hover { background: #ddd; }

/* ── 모달 트랜지션 ── */
.modal-enter-active { transition: opacity 0.28s ease; }
.modal-leave-active { transition: opacity 0.22s ease; }

.modal-enter-active .modal {
  transition: opacity 0.28s ease, transform 0.32s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.modal-leave-active .modal {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.modal-enter-from,
.modal-leave-to { opacity: 0; }

.modal-enter-from .modal {
  opacity: 0;
  transform: scale(0.93) translateY(24px);
}
.modal-leave-to .modal {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
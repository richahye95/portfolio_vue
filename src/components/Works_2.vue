<template>
  <div ref="horizontalSection" class="horizontal-container">
    <div class="pin-wrap" ref="pinWrapRef">
      <div
        v-for="(item, index) in projects"
        :key="index"
        class="project-item"
      >
        <div class="project-card" @click="toggleDetail(index)">
          <img :src="item.image" alt="project image" />
          <h3>{{ item.title }}</h3>
        </div>

        <div
          class="detail-content"
          :ref="el => detailRefs[index] = el"
          :class="{ 'is-open': activeIndex === index }"
        >
          <div class="inner-detail">
            <p>{{ item.description }}</p>
            <div class="dummy" v-for="i in 20" :key="i">상세 정보가 나열됩니다...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const horizontalSection = ref(null);
const pinWrapRef = ref(null);
const detailRefs = ref([]);
const activeIndex = ref(null);
let mainST = null;

const projects = [
  { title: 'Project 01', image: 'url1', description: '01 상세 설명...' },
  { title: 'Project 02', image: 'url2', description: '02 상세 설명...' },
  { title: 'Project 03', image: 'url3', description: '03 상세 설명...' },
  { title: 'Project 04', image: 'url3', description: '04 상세 설명...' },
  { title: 'Project 05', image: 'url3', description: '05 상세 설명...' },
  { title: 'Project 06', image: 'url3', description: '06 상세 설명...' },
  { title: 'Project 07', image: 'url3', description: '07 상세 설명...' },
];

onMounted(() => {
  const pinWrap = pinWrapRef.value;

  mainST = ScrollTrigger.create({
    trigger: horizontalSection.value,
    pin: true,
    scrub: 1,
    start: "top top",
    end: () => "+=" + (pinWrap.scrollWidth - window.innerWidth),
    animation: gsap.to(pinWrap, {
      x: () => -(pinWrap.scrollWidth - window.innerWidth),
      ease: "none",
    }),
    invalidateOnRefresh: true,
  });
});

const toggleDetail = (index) => {
  const items = document.querySelectorAll(".project-item");
  const card = items[index];
  const target = detailRefs.value[index];
  const pinWrap = pinWrapRef.value;

  if (activeIndex.value === index) {
    gsap.to(target, { height: 0, duration: 0.5, ease: "power2.inOut" });
    target.classList.remove('is-open');
    // 카드 닫힐 때 padding 원복
    gsap.to(pinWrap, { paddingTop: '8%', duration: 0.5, ease: "power2.inOut" });
    activeIndex.value = null;
    return;
  }

  if (activeIndex.value !== null) {
    gsap.to(detailRefs.value[activeIndex.value], { height: 0, duration: 0.3 });
    detailRefs.value[activeIndex.value].classList.remove('is-open');
  }

  const cardCenterInWrap = card.offsetLeft + card.offsetWidth / 2;
  const targetX = -(cardCenterInWrap - window.innerWidth / 2);
  const clampedX = Math.max(-(pinWrap.scrollWidth - window.innerWidth), Math.min(0, targetX));
  const totalMove = pinWrap.scrollWidth - window.innerWidth;
  const totalScroll = mainST.end - mainST.start;
  const ratio = Math.abs(clampedX) / totalMove;
  const finalScrollY = mainST.start + ratio * totalScroll;

  gsap.to(window, {
    scrollTo: { y: finalScrollY, autoKill: false },
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      // 카드 열릴 때 padding 줄여서 위로 올리기
      gsap.to(pinWrap, { paddingTop: '3%', duration: 0.5, ease: "power2.out" });
      gsap.to(target, {
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => target.classList.add('is-open')
      });
      activeIndex.value = index;
    }
  });
};
</script>

<style scoped>
.horizontal-container {
  overflow: hidden;
  background: #fff;
  width: 100%;
  position: relative;
  z-index: 1;
}

.pin-wrap {
  display: flex;
  width: max-content;
  height: 100vh;
  align-items: flex-start;
  padding: 13% calc(50vw - 300px) 0 calc(50vw - 300px);
}

.project-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38vw;
}

.project-item:last-child {
  margin-right: 0;
}

.project-card {
  width: 34.0833vw;
  height: 19.0667vw;
  background: #f0f0f0;
  cursor: pointer;
  overflow: hidden;
  border-radius: 15px;
  flex-shrink: 0;
}

.project-card img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}

.project-card h3 {
  padding: 10px 20px;
}

.detail-content {
  margin-top: 20px;
  width: 1200px;
  height: 0;
  overflow: hidden;
  background: #f9f9f9;
  border-radius: 0 0 15px 15px;
}

.detail-content.is-open {
  overflow-y: auto;
  max-height: calc(100vh - 26.4167vw);
}

.inner-detail {
  padding: 20px;
  color: #333;
}
</style>
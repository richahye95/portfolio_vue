<template>
  <div class="works-section" ref="worksSection">
    <Swiper
      :modules="modules"
      :slides-per-view="'auto'"
      :centered-slides="true"
      :space-between="150"
      :mousewheel="{ forceToAxis: true, releaseOnEdges: true, enabled: mousewheelEnabled }"
      :grab-cursor="true"
      :simulate-touch="true"
      class="works-swiper"
      @swiper="onSwiper"
    >
      <SwiperSlide
        v-for="(item, index) in projects"
        :key="index"
        class="project-slide"
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
            <div class="dummy" v-for="i in 3" :key="i">상세 정보가 나열됩니다...</div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';

const modules = [Mousewheel];
const swiperInstance = ref(null);
const detailRefs = ref([]);
const activeIndex = ref(null);
const worksSection = ref(null);
const mousewheelEnabled = ref(false);

const projects = [
  { title: 'Project 01', image: 'url1', description: '01 상세 설명...' },
  { title: 'Project 02', image: 'url2', description: '02 상세 설명...' },
  { title: 'Project 03', image: 'url3', description: '03 상세 설명...' },
  { title: 'Project 04', image: 'url3', description: '04 상세 설명...' },
  { title: 'Project 05', image: 'url3', description: '05 상세 설명...' },
  { title: 'Project 06', image: 'url3', description: '06 상세 설명...' },
  { title: 'Project 07', image: 'url3', description: '07 상세 설명...' },
];

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

// Works 섹션이 뷰포트에 들어오면 mousewheel 활성화
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        mousewheelEnabled.value = entry.isIntersecting;
        if (swiperInstance.value) {
          if (entry.isIntersecting) {
            swiperInstance.value.mousewheel.enable();
          } else {
            swiperInstance.value.mousewheel.disable();
          }
        }
      });
    },
    { threshold: 0.8 } // 80% 이상 보일 때 활성화
  );

  if (worksSection.value) observer.observe(worksSection.value);

  onUnmounted(() => observer.disconnect());
});

const toggleDetail = (index) => {
  const target = detailRefs.value[index];

  if (activeIndex.value === index) {
    gsap.to(target, { height: 0, duration: 0.5, ease: "power2.inOut" });
    activeIndex.value = null;
    return;
  }

  swiperInstance.value.slideTo(index, 800);

  if (activeIndex.value !== null) {
    gsap.to(detailRefs.value[activeIndex.value], { height: 0, duration: 0.3 });
  }

  setTimeout(() => {
    gsap.to(target, { height: 'auto', duration: 0.5, ease: "power2.out" });
    activeIndex.value = index;
  }, 850);
};
</script>

<style scoped>
.works-section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  padding-top: 150px;
  background: #fff;
  position: relative;
  z-index: 1; /* ← ThreeScene canvas 위로 올라오게 */
}

.works-swiper {
  width: 100%;
  height: 100%;
}

.project-slide {
  width: 600px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-card {
  width: 600px;
  height: 450px;
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
  width: 100%;
  height: 0;
  overflow: hidden;
  background: #f9f9f9;
  border-radius: 0 0 15px 15px;
}

.detail-content.is-open {
  overflow-y: auto;
  max-height: calc(100vh - 150px - 450px);
}

.inner-detail {
  padding: 20px;
  color: #333;
}
</style>
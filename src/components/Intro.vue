<template>
  <section class="intro-section">
    <div class="intro-inner">

      <!-- 좌측: 캐릭터 이미지 -->
      <div class="intro-left">
        <img src="/img/intro_img.png" alt="프로필" class="intro-img" />
      </div>

      

      <!-- 우측: 정보 -->
      <div class="intro-right">

        <div class="intro-block">
          <span class="intro-label">경력</span>
          <ul class="intro-list">
            <li>PMG KOREA - CCP팀 Front-end developer, publisher <span class="date">(2024.03 - )</span></li>
            <li>(주) 리테일앤인사이트 - TS개발팀 publisher <span class="date">(2022.06 - 2023.08)</span></li>
            <li>서울평가정보 - 운영팀 인사/회계 <span class="date">(2020.07 - 2021.07)</span></li>
          </ul>
        </div>

        <div class="intro-block">
          <span class="intro-label">자격증</span>
          <ul class="intro-list">
            <li>웹디자인기능사 <span class="date">(한국산업인력공단, 2022.04)</span></li>
            <li>GTQ 포토샵 1급 <span class="date">(한국생산성본부, 2021.11)</span></li>
            <li>컴퓨터활용능력2급 <span class="date">(대한상공회의소, 2017.10)</span></li>
            
          </ul>
        </div>

        <div class="intro-block">
          <span class="intro-label">교육</span>
          <ul class="intro-list">
            <li>UI/UX 반응형 웹디자인&웹퍼블리셔 수료<span class="date">그린아카데미</span></li>
            <li>공주대학교 <span class="date">(식물자원학과 졸업)</span></li>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.intro-section {
  padding: 80px 10vw;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-inner {
  display: flex;
  align-items: center;
  gap: 0 30px;
  margin: 0 auto;
  width: 100%;
}

/* 좌측 이미지 */
.intro-left {
  flex-shrink: 0;
}

.intro-img {
  width: 28vw;
  object-fit: contain;
}


/* 우측 정보 */
.intro-right {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-top: 20px;
  flex: 1;
}

.intro-block {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 0 40px;
  align-items: start;
}

.intro-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #111;
  text-underline-offset: 4px;
  padding-top: 2px;
}

.intro-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.intro-list li {
  font-size: 0.88rem;
  color: #111;
  line-height: 1.5;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.intro-list li::before {
  content: '—';
  color: #111;
  flex-shrink: 0;
}

.date {
  color: #888;
  font-size: 0.82rem;
}
</style>
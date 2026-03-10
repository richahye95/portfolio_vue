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
            <li>TmaxCloud - CL2-2-2팀 UX 매니저 <span class="date">(2024.06 - 2024.10)</span></li>
            <li>휴머스온 - 프런트엔드개발파트 퍼블리셔 <span class="date">(2022.11 - 2023.12)</span></li>
            <li>티몬 - 마크업 개발팀 마크업 개발자 <span class="date">(2021.02 - 2022.06)</span></li>
            <li>엑스이허브 - UI개발팀 퍼블리셔 <span class="date">(2020.03 - 2021.01)</span></li>
            <li>개인사업자 - 디자이너 / 퍼블리셔 <span class="date">(2018.02 - 2019.12)</span></li>
          </ul>
        </div>

        <div class="intro-block">
          <span class="intro-label">자격증</span>
          <ul class="intro-list">
            <li>GTQ 1급 <span class="date">(한국생산성본부, 2016.06.17)</span></li>
            <li>컴퓨터그래픽스기능사 <span class="date">(한국산업인력공단, 2014.06.27)</span></li>
            <li>웹디자인기능사 <span class="date">(한국산업인력공단, 2014.06.27)</span></li>
          </ul>
        </div>

        <div class="intro-block">
          <span class="intro-label">교육</span>
          <ul class="intro-list">
            <li>패스트캠퍼스 <span class="date">(Web 개발 취업 스쿨 HTML/CSS/JS 1학기 수료)</span></li>
            <li>하이미디어 아카데미 <span class="date">(반응형 디자인 웹퍼블리셔반 수료)</span></li>
            <li>가천대학교 <span class="date">(시각디자인과 졸업)</span></li>
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
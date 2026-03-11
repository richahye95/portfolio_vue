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
            <li>UI/UX 반응형 웹디자인&amp;웹퍼블리셔 수료 <span class="date">그린아카데미</span></li>
            <li>공주대학교 <span class="date">(식물자원학과 졸업)</span></li>
          </ul>
        </div>

      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="contact-section">
    <div class="contact-inner">
      <span class="contact-label">Contact</span>
      <div class="contact-links">
        <a href="mailto:himy1114@naver.com" class="contact-item">
          <span class="contact-type">Email</span>
          <span class="contact-value">himy1114@naver.com</span>
          <span class="contact-arrow">↗</span>
        </a>
        <div class="contact-divider"></div>
        <a href="tel:+821092304170" class="contact-item">
          <span class="contact-type">Phone</span>
          <span class="contact-value">010-9230-4170</span>
          <span class="contact-arrow">↗</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>

/* =============================================
   INTRO SECTION
============================================= */
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
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;;
}

.intro-img {
  width: 28vw;
  max-width: 360px;
  object-fit: contain;
  display: block;
}

/* 우측 정보 */
.intro-right {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-top: 20px;
  flex: 1;
  min-width: 0; /* flex 자식 overflow 방지 */
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
  line-height: 1.6;
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap; /* 긴 텍스트 줄바꿈 허용 */
  word-break: keep-all;
}

.intro-list li::before {
  content: '—';
  color: #111;
  flex-shrink: 0;
}

.date {
  color: #888;
  font-size: 0.82rem;
  white-space: nowrap;
}

/* =============================================
   CONTACT SECTION
============================================= */
.contact-section {
  padding: 60px 10vw 80px;
  background: #fff;
  border-top: 1px solid #e8e8e8;
}

.contact-inner {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 0 40px;
  align-items: start;
  width: 100%;
}

.contact-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #111;
  padding-top: 14px;
}

.contact-links {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 0;
  text-decoration: none;
  color: #111;
  transition: opacity 0.2s ease;
}

.contact-item:hover {
  opacity: 0.45;
}

.contact-type {
  font-size: 0.75rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  width: 48px;
  flex-shrink: 0;
}

.contact-value {
  font-size: 0.95rem;
  color: #111;
  flex: 1;
  word-break: break-all; /* 이메일 길 경우 대비 */
}

.contact-arrow {
  font-size: 0.9rem;
  color: #bbb;
  transition: transform 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}

.contact-item:hover .contact-arrow {
  transform: translate(3px, -3px);
  color: #111;
}

.contact-divider {
  height: 1px;
  background: #ebebeb;
  width: 100%;
}

/* =============================================
   TABLET (768px ~ 1024px)
============================================= */
@media (max-width: 1024px) {
  .intro-section {
    padding: 60px 6vw;
  }

  .intro-inner {
    gap: 0 24px;
  }
  .intro-left{
    width: 30%;
  }

  .intro-img {
    width: 32vw;
  }

  .intro-right {
    gap: 44px;
  }

  .intro-block {
    grid-template-columns: 64px 1fr;
    gap: 0 24px;
  }

  .contact-section {
    padding: 50px 6vw 60px;
  }

  .contact-inner {
    grid-template-columns: 64px 1fr;
    gap: 0 24px;
  }
}

/* =============================================
   MOBILE (~ 767px)
   세로 레이아웃으로 전환
============================================= */
@media (max-width: 767px) {
  .intro-section {
    padding: 48px 5vw 40px;
  }

  /* 이미지 + 정보 → 세로 스택 */
  .intro-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 36px 0;
  }
  .intro-left{
    width: 100%;
  }

  .intro-img {
    width: 52vw;
    max-width: 200px;
    margin: 0 auto;
  }

  .intro-right {
    width: 100%;
    gap: 36px;
    padding-top: 0;
  }

  /* 라벨 위, 리스트 아래 → 세로 스택 */
  .intro-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .intro-label {
    font-size: 0.78rem;
    letter-spacing: 0.05em;
  }

  .intro-list li {
    font-size: 0.84rem;
  }

  .date {
    font-size: 0.78rem;
    white-space: normal; /* 모바일에서 줄바꿈 허용 */
  }

  /* Contact */
  .contact-section {
    padding: 40px 5vw 56px;
  }

  .contact-inner {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .contact-label {
    padding-top: 0;
    font-size: 0.78rem;
    letter-spacing: 0.05em;
  }

  .contact-item {
    gap: 12px;
    padding: 12px 0;
  }

  .contact-type {
    width: 40px;
    font-size: 0.7rem;
  }

  .contact-value {
    font-size: 0.88rem;
  }
}

/* =============================================
   SMALL MOBILE (~ 380px)
============================================= */
@media (max-width: 380px) {
  .intro-img {
    width: 60vw;
    margin: 0 auto;
  }

  .intro-list li {
    font-size: 0.8rem;
  }

  .contact-value {
    font-size: 0.82rem;
  }
}
</style>
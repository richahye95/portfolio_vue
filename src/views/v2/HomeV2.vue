<template>
  <div class="legodt-v2">
    <!-- Top Announcement Bar -->
    <div class="top-announcement-bar reveal">
      <span>2026 FRONT-END DEVELOPER &amp; WEB PUBLISHER PORTFOLIO</span>
      <span class="bar-dot">•</span>
      <span>HYERI CHA</span>
    </div>

    <!-- Header -->
    <header class="legodt-header">
      <div class="header-inner">
        <a href="#" class="brand-logo">
          <span class="logo-main">HYERI CHA</span>
          <span class="logo-tag btn-pill">PORTFOLIO v2</span>
        </a>

        <nav class="gnb-nav">
          <a href="#projects" class="gnb-link">PROJECTS</a>
          <a href="#values" class="gnb-link">VALUES</a>
          <a href="#skills" class="gnb-link">SKILLS</a>
          <a href="#experience" class="gnb-link">EXPERIENCE</a>
        </nav>

        <div class="header-action">
          <a href="mailto:himy1114@naver.com" class="btn-header-cta btn-pill">CONTACT ME →</a>
        </div>
      </div>
    </header>

    <!-- Main Visual / Hero -->
    <section class="legodt-hero">
      <div class="hero-inner">
        <span class="hero-badge btn-pill reveal" data-delay="0">FRONT-END DEVELOPER &amp; WEB PUBLISHER</span>
        <h1 class="hero-headline reveal" data-delay="0.1">
          사용자 중심의 UI/UX와 <br />
          <span class="text-underline">정교한 웹 인터랙션</span>
        </h1>
        <p class="hero-subtext reveal" data-delay="0.2">
          기획, 데이터 아키텍처 설계, 퍼블리싱 및 프론트엔드 개발까지 <br class="pc-only" />
          디테일한 완성도를 추구하는 개발자 차혜리입니다.
        </p>

        <div class="hero-btns reveal" data-delay="0.3">
          <a href="#projects" class="btn-legodt btn-legodt-primary btn-pill">PROJECTS 보기</a>
          <a href="#experience" class="btn-legodt btn-legodt-outline btn-pill">경력 사항 확인</a>
        </div>

        <div class="hero-impact-stats reveal" data-delay="0.4">
          <div class="impact-box">
            <span class="impact-num">3+</span>
            <span class="impact-lbl">Years Experience</span>
          </div>
          <div class="impact-divider"></div>
          <div class="impact-box">
            <span class="impact-num">10+</span>
            <span class="impact-lbl">Major Projects</span>
          </div>
          <div class="impact-divider"></div>
          <div class="impact-box">
            <span class="impact-num">100%</span>
            <span class="impact-lbl">Handmade Precision</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="legodt-section projects-section">
      <div class="section-container">
        <div class="section-title-box reveal" data-delay="0">
          <span class="sub-heading">FEATURED WORKS</span>
          <h2 class="main-heading">주요 프로젝트</h2>
          <p class="heading-desc">
            사내 그룹웨어 전면 리뉴얼부터 글로벌 브랜드 웹사이트 운영까지, 수록된 작업물을 확인해보세요.
          </p>
        </div>

        <!-- Filter Category Tabs -->
        <div class="legodt-filter-tabs reveal" data-delay="0.1">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="filter-btn btn-pill"
            :class="{ active: currentCategory === cat.id }"
            @click="currentCategory = cat.id"
          >
            {{ cat.label }}
            <span class="count-badge">{{ getCategoryCount(cat.id) }}</span>
          </button>
        </div>

        <!-- Project Cards Grid -->
        <div class="legodt-projects-grid">
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="legodt-project-card reveal"
            :data-delay="(index % 3) * 0.15"
            @click="openModal(project)"
          >
            <figure class="card-thumb-wrap">
              <img :src="project.image" :alt="project.title" class="card-img" />
              <div v-if="project.badge" class="badge-tag btn-pill">{{ project.badge }}</div>

              <figcaption class="legodt-hover-caption">
                <p class="quote-text">"{{ project.quote }}"</p>
                <span class="btn-detail-view btn-pill">자세히 보기 →</span>
              </figcaption>
            </figure>

            <div class="card-info">
              <div class="card-meta-top">
                <span class="category-label">{{ project.categoryLabel }}</span>
                <span class="project-date">{{ project.period }}</span>
              </div>
              <h3 class="card-title">{{ project.title }}</h3>
              <p class="card-subtitle">{{ project.subtitle }}</p>

              <div class="card-tag-pills">
                <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="tag-item btn-pill">
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Developer Values Section -->
    <section id="values" class="legodt-section values-section">
      <div class="section-container">
        <div class="section-title-box center reveal" data-delay="0">
          <span class="sub-heading">DEVELOPMENT PHILOSOPHY</span>
          <h2 class="main-heading">개발 가치관 &amp; 노하우</h2>
        </div>

        <div class="values-grid">
          <div class="value-card reveal" data-delay="0.1">
            <span class="value-num">01</span>
            <h3 class="value-title">Handmade Precision</h3>
            <p class="value-desc">
              모든 마크업과 스타일링은 찍어내듯 만들지 않고, 다양한 기기 환경에서도 완벽히 유지되는 100% 정교한 완성도를 집착합니다.
            </p>
          </div>

          <div class="value-card reveal" data-delay="0.2">
            <span class="value-num">02</span>
            <h3 class="value-title">Modern Stack &amp; Tools</h3>
            <p class="value-desc">
              React, Vue 3, TypeScript 및 GSAP 모션 기술을 유연하게 활용하며, AI 도구와 Storybook을 통한 개발 생산성 극대화를 추구합니다.
            </p>
          </div>

          <div class="value-card reveal" data-delay="0.3">
            <span class="value-num">03</span>
            <h3 class="value-title">Full Pipeline Vision</h3>
            <p class="value-desc">
              단순 화면 구현에 그치지 않고, DB ERD 및 화면설계서 수립부터 어드민 API 연동까지 서비스의 전체 데이터 흐름을 조망합니다.
            </p>
          </div>

          <div class="value-card reveal" data-delay="0.4">
            <span class="value-num">04</span>
            <h3 class="value-title">Global CMS &amp; Workflow</h3>
            <p class="value-desc">
              Adobe Experience Manager(AEM) 등 글로벌 CMS 운영 노하우와 Git 기반 로컬 작업 체계를 구축하여 검증된 작업 공수를 이끌어냅니다.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="legodt-section skills-section">
      <div class="section-container">
        <div class="section-title-box center reveal" data-delay="0">
          <span class="sub-heading">TECH STACK</span>
          <h2 class="main-heading">보유 기술 및 스택</h2>
        </div>

        <div class="skills-block-grid">
          <div v-for="(group, index) in skillGroups" :key="group.title" class="skill-category-box reveal" :data-delay="(index + 1) * 0.1">
            <h3 class="skill-category-header">
              <span class="cat-icon">{{ group.icon }}</span>
              {{ group.title }}
            </h3>
            <div class="skill-items-container">
              <div v-for="skill in group.items" :key="skill.name" class="skill-pill">
                <img :src="skill.icon" :alt="skill.name" class="skill-img" />
                <span class="skill-name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience & Profile Section -->
    <section id="experience" class="legodt-section experience-section">
      <div class="section-container">
        <div class="experience-layout">
          <!-- Profile Left Card -->
          <div class="profile-side-card reveal" data-delay="0">
            <div class="profile-avatar-frame">
              <img src="/img/intro_img.png" alt="차혜리 프로필" class="profile-avatar" />
            </div>
            <div class="profile-text-content">
              <h3 class="profile-name">차혜리</h3>
              <span class="profile-title-tag">Front-end Developer / Publisher</span>
              <p class="profile-bio-text">
                기술과 디테일한 퍼블리싱의 완벽한 조화를 추구하며, 새로운 기술 도전과 비즈니스 성장에 기여하는 것을 즐깁니다.
              </p>
            </div>
          </div>

          <!-- Timeline & Info Right -->
          <div class="timeline-side reveal" data-delay="0.2">
            <!-- 경력 -->
            <div class="exp-block">
              <h3 class="exp-block-title">EXPERIENCE (경력)</h3>
              <div class="exp-timeline">
                <div class="exp-timeline-item">
                  <div class="timeline-bullet"></div>
                  <div class="exp-item-body">
                    <span class="exp-date">2024.03 - 현재</span>
                    <h4 class="exp-company">PMG KOREA</h4>
                    <p class="exp-position">CCP팀 Front-end developer, publisher</p>
                  </div>
                </div>

                <div class="exp-timeline-item">
                  <div class="timeline-bullet"></div>
                  <div class="exp-item-body">
                    <span class="exp-date">2022.06 - 2023.08</span>
                    <h4 class="exp-company">(주) 리테일앤인사이트</h4>
                    <p class="exp-position">TS개발팀 publisher</p>
                  </div>
                </div>

                <div class="exp-timeline-item">
                  <div class="timeline-bullet"></div>
                  <div class="exp-item-body">
                    <span class="exp-date">2020.07 - 2021.07</span>
                    <h4 class="exp-company">서울평가정보</h4>
                    <p class="exp-position">운영팀 인사/회계</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 자격증 & 교육 -->
            <div class="exp-grid-two">
              <div class="exp-block">
                <h3 class="exp-block-title">LICENSES (자격증)</h3>
                <ul class="exp-list">
                  <li><strong>웹디자인기능사</strong> <span class="exp-sub">(2022.04)</span></li>
                  <li><strong>GTQ 포토샵 1급</strong> <span class="exp-sub">(2021.11)</span></li>
                  <li><strong>컴퓨터활용능력 2급</strong> <span class="exp-sub">(2017.10)</span></li>
                </ul>
              </div>

              <div class="exp-block">
                <h3 class="exp-block-title">EDUCATION (교육)</h3>
                <ul class="exp-list">
                  <li><strong>그린아카데미</strong> <span class="exp-sub">UI/UX 반응형 웹디자인&amp;웹퍼블리셔 수료</span></li>
                  <li><strong>공주대학교</strong> <span class="exp-sub">식물자원학과 졸업</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="legodt-footer">
      <div class="section-container">
        <div class="footer-header-wrap reveal" data-delay="0">
          <div class="footer-title-group">
            <h2 class="footer-big-title">LET'S CONNECT.</h2>
            <p class="footer-desc">협업 제안이나 문의사항은 이메일이나 전화로 언제든 연락주세요.</p>
          </div>

          <div class="footer-contacts-list">
            <a href="mailto:himy1114@naver.com" class="footer-contact-item">
              <span class="lbl">EMAIL</span>
              <span class="val">himy1114@naver.com</span>
              <span class="arrow">↗</span>
            </a>
            <a href="tel:+821092304170" class="footer-contact-item">
              <span class="lbl">PHONE</span>
              <span class="val">010-9230-4170</span>
              <span class="arrow">↗</span>
            </a>
          </div>
        </div>

        <div class="footer-copyright-bar">
          <span class="copy-text">© 2026 HYERI CHA. ALL RIGHTS RESERVED.</span>
          <a href="/" class="v1-link">← GO TO V1 PORTFOLIO</a>
        </div>
      </div>
    </footer>

    <!-- Project Modal Popup -->
    <Teleport to="body">
      <Transition name="legodt-modal">
        <div v-if="selectedProject" class="modal-overlay-bg" @click.self="closeModal">
          <div class="modal-dialog-card">
            <button class="btn-close-modal" @click="closeModal">✕</button>

            <div class="modal-content-grid">
              <div class="modal-left-media">
                <img :src="selectedProject.modalImage || selectedProject.image" :alt="selectedProject.title" class="modal-media-img" />
              </div>

              <div class="modal-right-details">
                <span class="modal-cat-tag btn-pill">{{ selectedProject.categoryLabel }}</span>
                <h2 class="modal-project-title">{{ selectedProject.title }}</h2>
                <p class="modal-project-sub">{{ selectedProject.subtitle }}</p>

                <div class="modal-desc-lines">
                  <p v-for="(line, i) in selectedProject.description" :key="i" v-html="line"></p>
                </div>

                <div class="modal-meta-table">
                  <div v-for="meta in selectedProject.meta" :key="meta.label" class="meta-row">
                    <span class="meta-lbl">{{ meta.label }}</span>
                    <span class="meta-val">{{ meta.value }}</span>
                  </div>
                </div>

                <a v-if="selectedProject.link" :href="selectedProject.link" target="_blank" class="btn-modal-visit btn-pill">
                  LIVE PROJECT VISIT ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import './HomeV2.css';

// Scroll reveal animation (LEGODT-style stagger entrance)
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
});

const categories = [
  { id: 'all', label: '전체 (ALL)' },
  { id: 'fe', label: 'FRONT-END' },
  { id: 'pub', label: 'PUBLISHING' },
  { id: 'cms', label: 'AEM / CMS' },
  { id: 'mobile', label: 'MOBILE & APP' },
];

const currentCategory = ref('all');
const selectedProject = ref<any>(null);

const projects = [
  {
    id: 1,
    cat: 'fe',
    categoryLabel: 'FRONT-END',
    badge: 'BEST',
    title: 'PMG Portal 사내 그룹웨어',
    subtitle: 'React · TypeScript · Tailwind CSS',
    period: '2024.03 - 진행중',
    quote: '기존 그룹웨어를 분석하여 사용자 중심 UI/UX로 전면 리뉴얼했습니다.',
    image: '/img/works/potal_thum.png',
    modalImage: '/img/works/potal_imgwrap.png',
    description: [
      '[개요] 기존 시스템을 분석하여 <span class="hl">사용자 중심의 UI/UX로 전면 리뉴얼</span>한 사내 프로젝트로, 복잡한 업무 프로세스를 직관적인 인터페이스로 개선했습니다.',
      '[기술 및 도구] <span class="hl">React, TypeScript, TailwindCSS</span>를 사용했으며, <span class="hl">Storybook</span>을 도입해 컴포넌트 단위의 개발 및 검증 시스템을 구축했습니다.',
      '[작업] <span class="hl">공통 컴포넌트</span> 설계 및 마이페이지, 공지사항, 도서, 기안서, 구성원관리 등 맡은 페이지를 주도하여 개발했습니다.',
      '[성과] AI 도구를 반응형 개발과 리팩토링에 적극 활용하여 개발 생산성을 크게 높였으며 성공적인 서비스 오픈에 기여했습니다.'
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    meta: [
      { label: 'Role', value: 'Front-end Development' },
      { label: 'Stack', value: 'React, TS, Tailwind, Storybook' },
      { label: 'Contribution', value: '30% (FE 3명 협업)' },
      { label: 'Client', value: 'PMG KOREA' },
    ],
  },
  {
    id: 2,
    cat: 'fe',
    categoryLabel: 'SYSTEM & ARCH',
    badge: 'FEATURED',
    title: 'DB ERD, 스토리보드 설계',
    subtitle: 'ERD Design · UI/UX Planning · Storyboard',
    period: '2024.04 - 2024.06',
    quote: '데이터 아키텍처 구축부터 상세 화면설계서 수립까지 서비스 라이프사이클을 직접 설계했습니다.',
    image: '/img/works/erd_thum.png',
    modalImage: '/img/works/erd_storyboard_wrap.png',
    description: [
      '사내 그룹웨어 리뉴얼을 위해 서비스의 기초가 되는 <span class="hl">데이터 아키텍처와 UI/UX 흐름을 직접 설계</span>하였습니다.',
      '공지사항, 도서 신청, IT 기기 관리 등 핵심 테이블 관계를 정의하는 <span class="hl">ERD 구축</span> 및 화면 설계서(스토리보드)를 작성하여 팀 간 기술적 소통을 주도했습니다.'
    ],
    tags: ['ERD Design', 'UI/UX Planning', 'Database Architecture', 'Storyboard'],
    meta: [
      { label: 'Role', value: 'Service Planning & DB Architect' },
      { label: 'Deliverables', value: 'ERD, Storyboard, Functional Spec' },
      { label: 'Contribution', value: '맡은 파트 100%' },
    ],
  },
  {
    id: 3,
    cat: 'cms',
    categoryLabel: 'AEM / CMS',
    badge: 'GLOBAL',
    title: 'BAT glo 글로벌 웹사이트 운영',
    subtitle: 'AEM CMS · HTML · GSAP · Git',
    period: '2024.03 - 2025',
    quote: 'Adobe Experience Manager(AEM) CMS 내 Git 기반 로컬 프로세스를 세워 작업 생산성을 높였습니다.',
    image: '/img/works/glo_thum.png',
    modalImage: '/img/works/glo_wrap.png',
    description: [
      'Adobe Experience Manager(AEM) CMS를 활용하여 글로벌 브랜드 BAT glo의 웹사이트 구축 및 유지보수를 전담했습니다.',
      'Git 기반 로컬 개발 환경을 구축하여 AEM 시스템 한계를 극복하고 생산성을 극대화했습니다.'
    ],
    tags: ['AEM CMS', 'HTML', 'GSAP', 'Git'],
    link: 'https://www.myglo.com/kr/ko/home',
    meta: [
      { label: 'Role', value: 'Web Publishing & UI Development' },
      { label: 'Stack', value: 'Adobe Experience Manager (AEM)' },
      { label: 'Contribution', value: 'glo Pick (100%), 메인/이벤트 (50%)' },
      { label: 'Client', value: 'BAT Korea (glo)' },
    ],
  },
  {
    id: 4,
    cat: 'pub',
    categoryLabel: 'PUBLISHING',
    badge: 'CAMPAIGN',
    title: 'Campaign Form Page',
    subtitle: 'Form Validation · Data Management · Admin',
    period: '2024.05 - 2025',
    quote: '글로벌 브랜드 마케팅 캠페인의 유효성 검사 폼 구축 및 대량 데이터 수집 어드민을 연동했습니다.',
    image: '/img/works/form_thum.png',
    modalImage: '/img/works/form_wrap.png',
    description: [
      'Seagate, Adobe, 조니워커 등 글로벌 브랜드 마케팅 캠페인을 위한 이벤트 폼 및 어드민 연동 시스템을 전담 제작했습니다.',
      '유효성 검사, 반응형 마크업, 대량 데이터 안정적 수집을 위한 데이터 파이프라인 유지보수를 수행했습니다.'
    ],
    tags: ['Form Validation', 'Admin Integration', 'Responsive Web'],
    link: 'https://seagate-event.com/Next_Smart_Work_Summit_2025/',
    meta: [
      { label: 'Role', value: 'UI Development & Maintenance' },
      { label: 'Stack', value: 'JavaScript, Form API, DB Integration' },
      { label: 'Client', value: 'Seagate, Adobe, Johnnie Walker' },
    ],
  },
  {
    id: 5,
    cat: 'pub',
    categoryLabel: 'PUBLISHING',
    title: 'eDM Newsletter',
    subtitle: 'HTML Email · Table Layout',
    period: '2024',
    quote: 'Gmail, Outlook 등 이메일 클라이언트 호환성을 고려한 테이블 기반 HTML 뉴스레터 전담 마크업.',
    image: '/img/works/edm_thum.png',
    modalImage: '/img/works/edm_imgwrap.png',
    description: [
      'Gmail, Outlook 등 다양한 이메일 클라이언트의 렌더링 호환성을 고려한 HTML Table 레이아웃 이메일 뉴스레터 구축.'
    ],
    tags: ['HTML Email', 'Table Layout', 'Cross-browser'],
    meta: [
      { label: 'Role', value: 'Publishing 90%' },
      { label: 'Client', value: 'STANLEY, Adobe, AMD, Naver Works, Dell' },
    ],
  },
  {
    id: 6,
    cat: 'mobile',
    categoryLabel: 'MOBILE & APP',
    title: 'Essilor Z-SERIES',
    subtitle: 'Tablet & Mobile Specialized',
    period: '2024',
    quote: '5주간 매주 업데이트되는 태블릿/모바일 전용 브랜드 웹사이트 100% 퍼블리싱 성공 완수.',
    image: '/img/works/zseies_thum.png',
    modalImage: '/img/works/zseies_wrap.png',
    description: [
      '에실로 안경 렌즈 브랜드 태블릿 및 모바일 전용 5주 테마 모듈형 반응형 웹사이트 100% 퍼블리싱 단독 완료.'
    ],
    tags: ['Tablet & Mobile UI', 'Responsive Web', 'Optimization'],
    meta: [
      { label: 'Contribution', value: '100% (Single Publishing)' },
      { label: 'Client', value: 'Essilor Korea' },
    ],
  },
  {
    id: 7,
    cat: 'mobile',
    categoryLabel: 'MOBILE & APP',
    title: 'DON JULIO COUPON',
    subtitle: 'Mobile UI · Coupon Logic · CRM',
    period: '2023',
    quote: '데킬라 브랜드 모바일 전용 쿠폰 시스템 퍼블리싱 및 클라이언트 CRM 연동 구현.',
    image: '/img/works/donjulo_thum.png',
    modalImage: '/img/works/donjulo_wrap.png',
    description: [
      '프리미엄 데킬라 돈훌리오의 모바일 쿠폰 발급/사용 로직 퍼블리싱 및 클라이언트 CRM 연동.'
    ],
    tags: ['Mobile Web', 'JavaScript', 'Coupon Logic'],
    meta: [
      { label: 'Contribution', value: 'Publishing 100%' },
      { label: 'Client', value: 'Don Julio (Diageo)' },
    ],
  },
  {
    id: 8,
    cat: 'mobile',
    categoryLabel: 'MOBILE & APP',
    title: 'TOMATO Web / App',
    subtitle: 'Hybrid App · Trade Shop B2B',
    period: '2022 - 2023',
    quote: '동네 마트 하이브리드 앱 토마토 UI/UX 및 B2B 토마토 트레이드 샵 전담 퍼블리싱.',
    image: '/img/works/tomato_thum.png',
    modalImage: '/img/works/tomato_wrap.png',
    description: [
      '동네 마트 하이브리드 앱 토마토 UI/UX 퍼블리싱 및 B2B 쇼핑몰 토마토 트레이드 샵 전담 퍼블리싱.'
    ],
    tags: ['Hybrid App', 'Responsive Web', 'Bootstrap'],
    meta: [
      { label: 'Contribution', value: 'Publishing 70%' },
      { label: 'Platform', value: 'Hybrid App (iOS/Android)' },
    ],
  },
];

const skillGroups = [
  {
    title: 'Frontend Core',
    icon: '⚡',
    items: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
  },
  {
    title: 'Publishing & Styling',
    icon: '🎨',
    items: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
      { name: 'GSAP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },
  {
    title: 'CMS & Tools',
    icon: '🛠',
    items: [
      { name: 'AEM CMS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    ],
  },
];

const filteredProjects = computed(() => {
  if (currentCategory.value === 'all') return projects;
  return projects.filter((p) => p.cat === currentCategory.value);
});

const getCategoryCount = (catId: string) => {
  if (catId === 'all') return projects.length;
  return projects.filter((p) => p.cat === catId).length;
};

const openModal = (proj: any) => {
  selectedProject.value = proj;
};

const closeModal = () => {
  selectedProject.value = null;
};
</script>

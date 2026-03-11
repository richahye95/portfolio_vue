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
              <!-- <span class="project-card__num">{{ String(block.index + 1).padStart(2, '0') }}</span> -->
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
                <!-- <span class="project-card__num">{{ String(block.wide + 1).padStart(2, '0') }}</span> -->
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
                  <!-- <span class="project-card__num">{{ String(si + 1).padStart(2, '0') }}</span> -->
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
                  <!-- <span class="project-card__num">{{ String(si + 1).padStart(2, '0') }}</span> -->
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
                <!-- <span class="project-card__num">{{ String(block.wide + 1).padStart(2, '0') }}</span> -->
                <h3 class="project-card__title">{{ projects[block.wide].title }}</h3>
                <p class="project-card__sub">{{ projects[block.wide].subtitle }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 정사각형 2개 세로 묶음 -->
        <div v-else-if="block.type === 'double-square'" class="mixed-col">
          <div
            v-for="si in block.squares" :key="si"
            class="project-card project-card--square"
            @click="openModal(si)"
          >
            <img :src="projects[si].image" :alt="projects[si].title" class="project-card__img" />
            <div class="project-card__overlay">
              <div class="project-card__info">
                <!-- <span class="project-card__num">{{ String(si + 1).padStart(2, '0') }}</span> -->
                <h3 class="project-card__title">{{ projects[si].title }}</h3>
                <p class="project-card__sub">{{ projects[si].subtitle }}</p>
              </div>
            </div>
          </div>
        </div>

      </template>

    </div>

    

  </div>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="activeIndex !== null" class="modal-backdrop" @click.self="closeModal">
        <div class="modal">
          <button class="modal-close" @click="closeModal">✕</button>
          <div class="modal-inner">
            <!-- 좌측 -->
            <div class="modal-left">
              <img
    :src="projects[activeIndex].modalImage || projects[activeIndex].image"
    :alt="projects[activeIndex].title"
    class="modal-img"
  />
              
            </div>
            <!-- 우측 -->
            <div class="modal-right">
              <div class="modal-right-top">
                <h2 class="modal-title">{{ projects[activeIndex].title }}</h2>
                <div class="modal-tags">
                  <span v-for="tag in projects[activeIndex].tags" :key="tag" class="modal-tag">{{ tag }}</span>
                </div>
                <div class="modal-desc">
                  <p 
                    v-for="(line, i) in projects[activeIndex].description" 
                    :key="i" 
                    v-html="line"
                  ></p>
                </div>
              </div>
              
              <div class="modal-meta">
                <div class="meta-item" v-for="meta in projects[activeIndex].meta" :key="meta.label">
                  <span class="meta-label">{{ meta.label }}</span>
                  <span class="meta-value">{{ meta.value }}</span>
                </div>
              </div>
              
              <a v-if="projects[activeIndex].link"
  :href="projects[activeIndex].link" class="modal-btn" target="_blank">View Project →</a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
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
    title: 'PMG Potal 사내 그룹웨어 ',
    subtitle: 'React · TypeScript · Taliwind CSS',
    image: '/img/works/potal_thum.png',       
    modalImage: '/img/works/potal_imgwrap.png',
    description: [
      '[개요] 기존 시스템을 분석하여 <span class="hl">사용자 중심의 UI/UX로 전면 리뉴얼</span>한 사내 프로젝트로, 복잡한 업무 프로세스를 직관적인 인터페이스로 개선했습니다.',
      
      '[기술 및 도구] <span class="hl">React, TypeScript, TailwindCSS</span>를 사용했으며, <span class="hl">Storybook</span>을 도입해 컴포넌트 단위의 개발 및 검증 시스템을 구축했습니다.',
      
      '[작업] <span class="hl">공통 컴포넌트</span> 설계 및 <span class="hl">마이페이지, 공지사항, 도서, 기안서, 구성원관리</span> 등 맡은 페이지를 주도하여 개발 하고, 다른 작업자들과 소통하며 일관성 있는 UI/UX를 구현했습니다.',
      
      '[데이터 연동] <span class="hl">Swagger API 문서</span>를 바탕으로 비동기 통신 로직을 구현하고, 백엔드와 긴밀하게 소통하며 복잡한 비즈니스 데이터를 안정적으로 처리했습니다.',
      
      '[성과 및 성장] <span class="hl">AI 도구(GPT, Claude)</span>를 코드 리뷰 및 최적화에 적극 활용하여 품질을 높였으며, 기본 React 강의를 들으며 실무에 반영하였고 최종 라이브까지 성공적으로 도달함.'
    ],
    tags: ['React', 'TypeScript', 'Taliwind CSS'],
    meta: [
      { label: 'Role',   value: 'Front-end Development' },
      { label: 'Stack',  value: 'React, TS, Tailwind, Storybook' },
      { label: 'Contribution', value: '30% (FE 3, DB 1, Design 1)' },
      { label: 'Client',   value: '사내 그룹웨어 프로젝트' },
      
    ],
    
  },
  
  {
    size: 'wide',
    title: 'DB ERD, 스토리 보드 작성',
    subtitle: 'ERD Design · UI/UX Planning · Storyboard',
    image: '/img/works/erd_thum.png',       
    modalImage: '/img/works/erd_storyboard_wrap.png',
    description: [
      '사내 그룹웨어 리뉴얼을 위해 서비스의 기초가 되는 <span class="hl">데이터 아키텍처와 UI/UX 흐름을 직접 설계</span>하였습니다 . 맡은 페이지인 공지사항 및 도서 신청, IT 기기 관리 등 각 테이블 row 간의 관계를 정의하는 <span class="hl">ERD를 구축</span>하여 데이터의 네이밍의 일관성과 확장성을 확보하였습니다.',
      
      '프로젝트 진행 전 실무자와의 면담을 통해 얻은 사용자 요구사항을 바탕으로 상세 기능 명세가 담긴 <span class="hl">화면 설계서(스토리보드)를 작성</span>하여 메뉴 트리부터 세부 인터랙션 로직까지 구체화하였습니다. 기획 단계에서부터 사용자가 필요한 기능을 디벨롭, 드랍 하여 설계하였고 개발 과정에서 어떤 화면과 기능을 개발해야하는지를 정확히 파악할 수 있어 <span class="hl"> 팀 간의 기술적 소통</span>에 중요한 역할을 하였습니다.',
      
      '단순한 구현을 넘어 서비스의 밑바닥인 DB 구조부터 화면의 흐름까지 <span class="hl">전체 라이프사이클을 설계</span>해 봄으로써, 서비스 전반을 조망하고 비즈니스 로직을 깊이 있게 이해하는 <span class="hl">전체적 흐름을 파악</span>하는 눈을 얻었습니다.'
    ],
    tags: ['ERD Design', 'UI/UX Planning', 'Database Architecture', 'Storyboard'],
    meta: [
      { label: 'Role',   value: 'Service Planning & DB Architect' },
      { label: 'Deliverables', value: 'ERD, Storyboard, Functional Spec' },
      { label: 'Contribution', value: '맡은 부분 100%' },
      { label: 'Focus',  value: '사내 그룹웨어 프로젝트' },
    ],
  },
  {
    size: 'small',
    title: 'eDM Newsletter',
    subtitle: 'HTML Email · Table Layout',
    image: '/img/works/edm_thum.png',        // 카드 썸네일
    modalImage: '/img/works/edm_imgwrap.png', // 모달 이미지
    description: [
  '클라이언트를 위한 eDM 뉴스레터 퍼블리싱.',
  '이메일 클라이언트 간 렌더링 편차를 극복하기 위해 HTML table 기반 레이아웃과 inline CSS를 적용하였습니다.',
  'Gmail, Outlook 등 주요 메일 클라이언트 호환성을 최우선으로 고려하여 구조를 설계했으며, CSS 지원 범위가 제한된 환경에서도 의도한 디자인이 정확히 구현되도록 마크업을 최적화하였습니다.',
],
    tags: ['HTML Email', 'Table Layout'],
    meta: [
      { label: 'Role',   value: 'Publishing' },
      { label: 'Stack',  value: 'HTML, inline CSS' },
      { label: 'Contribution',   value: '90%' },
      { label: 'Client', value: 'STANLEY, adobe, AMD, Naver Works, Dell, Johnnie Walker 외 다수' },
      
      
    ],
    
  },
  {
    size: 'small',
    title: 'Campaign Form page ',
    subtitle: 'Form Architecture · Data Management · Admin Integration',
    image: '/img/works/form_thum.png',
    modalImage: '/img/works/form_wrap.png',
    description: [
      'Seagate, Adobe, 조니워커 등 글로벌 브랜드의 마케팅 캠페인을 위한 <span class="hl">이벤트 폼 페이지 제작 및 데이터 관리 시스템 유지보수</span>를 수행하였습니다. 사용자가 입력한 정보를 프론트엔드에서 유효성 검사 후 DB로 안전하게 전달하는 Form 구조를 설계하고, 이를 실시간으로 확인할 수 있는 <span class="hl">Admin 페이지와의 연동 로직</span>을 최적화하였습니다.',
      
      '캠페인 특성에 맞는 최적의 UI를 위해 <span class="hl">전체 화면 마크업 및 스타일링을 100% 전담</span>하여 제작하였으며, 다양한 기기 환경에서도 불편함이 없도록 반응형 레이아웃을 구현하였습니다. 특히 대량의 데이터가 유입되는 환경에서 데이터 전송의 안정성을 확보하고 관리자가 효율적으로 정보를 열람할 수 있도록 <span class="hl">어드민 인터페이스 및 연동 프로세스를 지속적으로 개선</span>하였습니다.',
      
      '단순한 페이지 제작을 넘어 데이터의 수집부터 관리까지의 <span class="hl">전체 데이터 파이프라인을 유지보수</span>하며 실무에서의 데이터 핸들링 역량을 강화하였습니다. 클라이언트의 요구사항에 기민하게 대응하며 실제 비즈니스 환경에서 작동하는 <span class="hl">안정적인 웹 서비스 운영 노하우</span>를 습득하는 계기가 되었습니다.'
    ],
      tags: ['Form Validation', 'Admin Integration', 'Data Handling', 'Responsive Web'],
      link: 'https://seagate-event.com/Next_Smart_Work_Summit_2025/',
      meta: [
        { label: 'Role',     value: 'UI Development & System Maintenance' },
        { label: 'Stack', value: 'JavaScript, Form API, DB Integration' },
        { label: 'Contribution', value: '50% (화면 구현 100%, 시스템 유지보수)' },
        { label: 'Client',   value: 'Seagate, Adobe, Johnnie Walker' },
      
    ],
    
  },
  {
    size: 'tall',
    title: 'BAT glo 웹사이트 운영',
    subtitle: 'AEM CMS · HTML · GSAP · Git',
    image: '/img/works/glo_thum.png',
    modalImage: '/img/works/glo_wrap.png',
    description: [
    '어도비의 기업용 콘텐츠 관리 시스템인 <span class="hl">AEM(Adobe Experience Manager)을 활용</span>하여 글로벌 브랜드 BAT glo의 웹사이트 구축 및 유지보수를 수행하였습니다. CMS 내 표준 컴포넌트를 적극적으로 활용함과 동시에, 시스템만으로 구현이 어려운 복잡한 UI는 <span class="hl">직접 커스텀 HTML/CSS 마크업을 설계</span>하여 브랜드 아이덴티티에 최적화된 화면을 구현하였습니다.',
    
    '홈페이지 내 <span class="hl">home, glo Pick, 이벤트 페이지 등</span>다수의 페이지 제작을 맡아 하였으며, 기존 페이지의 유지보수 작업도 진행하였습니다. AEM 작업 환경의 제약으로 인한 생산성 저하를 해결하기 위해, <span class="hl">Git 기반의 로컬 개발 환경을 별도로 구축</span>하여 작업 효율을 극대화하였습니다. 로컬 환경에서 선제적으로 코드를 검증하고 AEM에 즉시 반영할 수 있는 워크플로우를 설계함으로써, <span class="hl">제작 공수를 획기적으로 단축</span>하고 코드의 안정성을 확보하는 성과를 거두었습니다.',
    
    '글로벌 서비스 특성에 맞춰 다양한 디바이스와 브라우저 환경에서도 동일한 사용자 경험을 제공할 수 있도록 <span class="hl">완벽한 반응형 웹을 구현</span>하였습니다. 시스템의 한계를 기술적 아이디어로 극복하며, 대규모 엔터프라이즈 환경에서 효율적으로 프로젝트를 관리하고 운영하는 <span class="hl">실무 최적화 역량</span>을 강화하였습니다.'
  ],
    tags: ['AEM CMS', 'HTML', 'GSAP', 'Git', 'Responsive Web'],
    link: 'https://www.myglo.com/kr/ko/home',
    meta: [
      { label: 'Role',     value: 'Web Publishing & UI Development' },
      { label: 'Stack', value: 'Adobe Experience Manager (AEM)' },
      { label: 'Contribution', value: 'glo Pick (100%), 그 외 페이지 50 %' },
      { label: 'Client',   value: 'BAT Korea (glo)' },
    ],
  },
  
  {
    size: 'square',
    title: 'Esilor Z-SERIES',
    subtitle: 'Tablet & Mobile Specialized',
    image: '/img/works/zseies_thum.png',
    modalImage: '/img/works/zseies_wrap.png',
   description: [
    '글로벌 안경 렌즈 브랜드 에실로의 <span class="hl">태블릿 및 모바일 전용 브랜드 홍보 페이지</span>를 100% 전담하여 퍼블리싱하였습니다. 5주간 매주 새로운 테마의 콘텐츠가 순차적으로 공개되는 프로젝트 특성에 맞춰, <span class="hl">유지보수가 용이한 모듈형 마크업 구조</span>를 설계하여 안정적인 콘텐츠 업데이트를 수행하였습니다.',
    
    '태블릿과 모바일 기기별로 최적화된 사용자 경험을 제공하기 위해 콘텐츠 중심의 페이지인 만큼 기기별 해상도 차이에도 브랜드 이미지가 왜곡 없이 전달되도록<span class="hl"> 미디어 쿼리와 유연한 레이아웃 시스템</span>을 적용하였으며, 터치 인터페이스에 최적화된 인터랙션을 반영하여 사용성을 극대화했습니다.',
    
    '5주간의 긴밀한 업데이트 일정 속에서도 <span class="hl"> 단 한 차례의 마감 누락 없이</span> 완성도 높은 결과물을 적기에 인도하며 프로젝트를 성공적으로 완수하였습니다.'
  ],
    tags: ['Tablet & Mobile UI', 'Responsive Web', 'Maintenance', 'Optimization'],
    meta: [
      { label: 'Type',     value: 'Mobile & Tablet Web' },
      { label: 'Period',   value: '5 Weeks (Weekly Update)' },
      { label: 'Contribution', value: '100% (Single Publishing)' },
      { label: 'Client',   value: 'Essilor Korea' },
    ],
  },
  {
    size: 'square',
    title: 'DON JULIO COUPON',
    subtitle: 'Mobile UI · Coupon Logic · CRM Integration', 
    image: '/img/works/donjulo_thum.png',
    modalImage: '/img/works/donjulo_wrap.png',
    description: [
    '프리미엄 데킬라 브랜드 돈훌리오의 <span class="hl">모바일 전용 쿠폰 시스템</span>을 구축하였습니다. 지역 및 매장 선택, 쿠폰 사용 로직 등 사용자 흐름에 따른 전 과정을 퍼블리싱하였으며, 브랜드 감성이 돋보이는 디자인을 모바일 환경에 최적화된 마크업으로 구현하였습니다.',
    
    '쿠폰 등록 시점으로부터 이용 기간 30일이 자동 기입되도록 자동 날짜 계산 스크립트를 구현하여 운영 효율을 높였으며, 지역/매장 선택, 팝업, 쿠폰 발급 및 사용 완료 처리 등 <span class="hl">실제 서비스 연동에 필요한 핵심 인터랙션</span>을 안정적으로 구축하였습니다.',
    
    '제작된 결과물은 클라이언트 측 <span class="hl">CRM 개발자와의 협업</span>을 통해 시스템에 통합되었습니다. 데이터가 전달되는 구조를 고려하여 명확한 네이밍 규칙과 마크업 가이드를 준수하였으며, 비즈니스 로직이 포함된 프론트엔드 코드를 제공함으로써 전체 개발 공수를 단축하는 성과를 거두었습니다.'
  ],
    tags: ['Mobile Web', 'JavaScript', 'UI/UX Publishing'],
    meta: [
      { label: 'Role',     value: 'Web Publishing & UI Development' },
      { label: 'Stack', value: 'HTML, CSS, JavaScript' },
      { label: 'Contribution', value: 'Publishing 100%' },
      { label: 'Client',   value: 'Don Julio (Diageo)' },
    ],
  },
  {
    size: 'small',
    title: 'TOMATO web / app',
    subtitle: 'Hybrid App',
    image: '/img/works/tomato_thum.png',
    modalImage: '/img/works/tomato_wrap.png',
    description: [
    '동네 마트와 고객을 연결하는 <span class="hl">하이브리드 앱 ‘토마토’</span>의 메인 서비스 UI/UX 퍼블리싱을 담당하였습니다. 웹과 앱의 경계를 아우르는 하이브리드 환경에 최적화된 마크업을 설계하였으며, 다양한 모바일 기기 해상도에 유연하게 대응할 수 있도록 <span class="hl">미디어쿼리 전략</span>을 적용하여 사용자 인터페이스의 일관성을 확보하였습니다.',
    
    'B2B 고객을 위한 폐쇄형 쇼핑몰인 <span class="hl">‘토마토 트레이드 샵’</span>의 퍼블리싱을 100% 전담하여 수행하였습니다. 초기 부트스트랩(Bootstrap) 기반의 적응형 구조를 바탕으로 오차 없는 레이아웃을 구현하는 성과를 거두었습니다.',
    
    '다양한 디바이스 환경에 기민하게 대응하며 신규 화면 제작 및 유지보수를 수행하였고, 특히 유통 플랫폼 특유의 <span class="hl">복잡한 상품 리스트와 주문 프로세스</span>를 모바일 환경에 최적화된 UI로 풀어내는 데 집중하였습니다. 이를 통해 <span class="hl">실무 적응형 퍼블리싱 역량</span>을 강화하였습니다.'
  ],
  tags: ['Hybrid App', 'Responsive Web', 'Bootstrap'],
  meta: [
      { label: 'Role', value: 'UI Publishing' },
      { label: 'Stack', value: 'HTML, CSS, JavaScript' },
      { label: 'Contribution', value: 'Publishing 70%' },
      { label: 'Platform', value: 'Hybrid App (iOS/Android)' },
      
    ],
  },
  {
    size: 'small',
    title: 'TOMATO ERP',
    subtitle: 'ERP Solution',
    image: '/img/works/erp_thum.png',
    modalImage: '/img/works/erp_wrap.png',
    
    description: [
    '마트 운영 전반을 관리하는 <span class="hl">전사적 자원 관리(ERP) 솔루션</span>의 UI를 구축하였습니다. 공급사 발주, 정산 등 방대한 물류 데이터를 효율적으로 시각화하는 데 집중하였습니다.',
    '<span class="hl">부트스트랩 프레임워크 </span>기반의 일관성 있는 컴포넌트 설계로 운영자의 업무 효율성을 극대화했습니다.',
    '기존 코드의 <span class="hl">안정적인 유지보수와 신규 기능의 유연한 확장</span>을 병행하며, 비즈니스 로직의 이해를 바탕으로 실무 환경에 최적화된 안정적인 시스템 인터페이스를 완성하였습니다.'
  ],
    tags: ['ERP', 'Admin UI', 'Bootstrap',],
    meta: [
      { label: 'Role', value: 'UI Publishing' },
      { label: 'Stack', value: 'HTML, CSS, JavaScript' },
      { label: 'Contribution', value: 'Publishing 70%' },
      { label: 'Framework', value: 'Bootstrap-based Customizing' },
      
    ],
  },
  {
    size: 'wide',
    title: '개인 포트폴리오 사이트',
    subtitle: 'Self-Branding · UI/UX Design · Publishing',
    image: '/img/works/pf_thum.png',
    modalImage: '/img/works/pf_wrap.png',
    description: [
      '기획, 디자인, 개발 전 과정을 단독 수행한 셀프 브랜딩 프로젝트입니다. <span class="hl">노션(Notion)의 직관적인 인터페이스</span>를 모티브로 삼아 프로젝트를 한눈에 파악할 수 있는 미니멀 UI를 설계했습니다.',

      '책넘기기 모션, 각 아이템 등장 효과 등<span class="hl">가벼운 인터랙션을 곳곳에 배치</span>하여 퍼블리셔로서의 섬세한 구현 능력을 시각적으로 표현하였습니다.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Notion'],

    meta: [
      { label: 'Project',  value: 'Self-Portfolio Design & Dev' },
      { label: 'Concept',  value: 'Notion-Inspired Minimalist' },
      { label: 'Role',     value: 'Planning, Design, Publishing (100%)' },
      { label: 'Focus',    value: 'User Experience & Readability' },
    ],
  },
];

// ── 레이아웃 순서 정의 ──
// type: 'single'           → projects[index] 단독 카드
// type: 'mixed-small-top'  → small 2개(위) + wide(아래)
// type: 'mixed-wide-top'   → wide(위) + small 2개(아래)
//
// 원하는 순서: tall → mixed → tall → mixed → mixed(wide 1행, small 2행) → tall
const layout = [
    // mixed (small 위, wide 아래)
    { type: 'single', index: 0 },                          // tall
     { type: 'mixed-wide-top',  wide: 1, smalls: [2, 3] },  // mixed (wide 위, small 아래)  ← 예시, 인덱스 조정하세요
   
   { type: 'single', index: 4 },                          // tall
  { type: 'double-square', squares: [5, 6]},  // 정사각형 2개 세로로
  { type: 'mixed-small-top', smalls: [7, 8], wide: 9 },
  
  
   
  
  
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
  document.documentElement.style.overflow = 'hidden'; // body → html
};




const modalInnerRef = ref(null);
const modalLeftRef = ref(null);

// 모달 열릴 때마다 스크롤 이벤트 등록
watch(activeIndex, (val) => {
  if (val !== null) {
    // DOM 업데이트 후 실행
    setTimeout(() => {
      const right = document.querySelector('.modal-right');
      const left = document.querySelector('.modal-left');
      if (!right || !left) return;

      right.addEventListener('scroll', () => {
        // 우측 스크롤량의 40%만 좌측에 적용 (느리게)
        left.scrollTop = right.scrollTop * 2;
      });
      /* left.addEventListener('scroll', () => {
        // 좌측 스크롤량의 40%만 우측에 적용 (느리게)
        right.scrollTop = left.scrollTop * 0.4;
      }); */
    }, 50);
  }
});

const closeModal = () => {
  activeIndex.value = null;
  document.documentElement.style.overflow = ''; // body → html
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
  padding: 12vh 15vw;
  gap: 40px;
  background: #0a0a0a;
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
  gap: 40px;
  flex-shrink: 0;
  height: 100%;
}

/* ── small 2개 가로 묶음 ── */
.small-row {
  display: flex;
  flex-direction: row;
  gap: 40px;
  flex-shrink: 0;
  flex: 1; 
}

/* ── 카드 크기 변형 ──
   이미지의 사각형 분포를 참고:
   tall  = 세로 긴 카드  (1,2번 - 상단 두 개)
   small = 작은 정사각형 (3,4번 - 오른쪽 위 두 개)
   wide  = 가로 긴 카드  (5번 - 하단 큰 카드)
   square= 중간 정사각형 (6,7번 - 하단 오른쪽)
*/
.project-card--tall {
  width: 28vw;
  min-width: 400px;
  height: 100%   /* 두 줄 합친 전체 높이 */
}

.project-card--small {
  width: 16vw;
  min-width: 200px;
  height: 100%; 
}

.project-card--wide {
  width: 100%;
  flex: 1;
}

.project-card--square {
  width: 20vw;
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
  padding: 20px 20px 30px;
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
  margin-top: 10px;
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
  background: #fff;
  border: 1px solid #222;
  border-radius: 24px;
  width: 100%;
  height: 85vh;
  max-width: 85vw;
  max-height: 85vh;
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

/* 모달 좌측 - 스크롤바 숨기고 overflow 허용 */
.modal-left {
  width: 50%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;       
  scrollbar-width: none;     
}

.modal-left::-webkit-scrollbar, .modal-right::-webkit-scrollbar{
  display: none;           
}


.modal-img {
  width: 100%;
  height: auto;            
  min-height: 500px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  flex-shrink: 0;
  margin-top: 10px
}

.modal-tag {
  font-size: 0.62rem;
  color: #fff;
  border: 1px solid #222;
  padding: 4px 13px;
  border-radius: 20px;
  background: #141414;
  letter-spacing: 0.06em;

}

/* 모달 우측 */
.modal-right {
  flex: 1;
  padding: 50px ;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.modal-right-top{
  display: flex;
  flex-direction: column;
  gap: 20px;
}


.modal-title {
  font-size: clamp(1.8rem, 2.8vw, 2.5rem);
  font-weight: 800;
  color: #2e2e2e;
  letter-spacing: -0.04em;
  line-height: 1.1;
}


.modal-desc {
  font-size: 0.82rem;
  color: #5a5a5a;
  line-height: 1.85;
  padding: 20px 0;
  border-top: 1px solid #1a1a1a;
}

.modal-desc p {
  line-height: 1.8;
  margin-bottom: 20px;
  word-break: keep-all; /* 한글 줄바꿈이 예쁘게 되도록 설정 */
  color: #333;
}

/* v-html로 들어온 .hl 클래스 스타일링 */
:deep(.hl) {
  /* 형광펜 효과: 아래쪽 40% 영역에만 색상이 깔리는 스타일 */
  background: linear-gradient(to top, rgba(255, 253, 145, 0.7) 40%, transparent 40%);
  font-weight: 600;
  color: #000;
  padding: 0 2px;
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
  min-width: 0; 
}

.meta-label {
  font-size: 0.56rem;
  color: #6b6b6b;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
}

.meta-value {
  font-size: 0.8rem;
  color: #ddd;
  font-weight: 600;
  white-space: nowrap;       
  overflow: hidden;            
  text-overflow: ellipsis;
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
  margin-top: 20px;
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
  border: 1px solid #ddd;
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
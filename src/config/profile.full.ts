import type { ProfileConfig } from './types';
import HomeV2 from '../views/v2/HomeV2.vue';
import pfThum from '../assets/works/pf_thum.png';
import pfWrap from '../assets/works/pf_wrap.png';

export const profile: ProfileConfig = {
  isBlind: false,
  heroName: '차혜리',
  contact: {
    email: 'himy1114@naver.com',
    phone: '010-9230-4170',
    phoneHref: 'tel:+821092304170',
  },
  personalPortfolioProject: {
    size: 'wide',
    title: '개인 포트폴리오 사이트',
    subtitle: 'Self-Branding · UI/UX Design · Publishing',
    image: pfThum,
    modalImage: pfWrap,
    description: [
      '기획, 디자인, 개발 전 과정을 단독 수행한 셀프 브랜딩 프로젝트입니다. <span class="hl">노션(Notion)의 직관적인 인터페이스</span>를 모티브로 삼아 프로젝트를 한눈에 파악할 수 있는 미니멀 UI를 설계했습니다.',
      '책넘기기 모션, 각 아이템 등장 효과 등<span class="hl">가벼운 인터랙션을 곳곳에 배치</span>하여 퍼블리셔로서의 섬세한 구현 능력을 시각적으로 표현하였습니다.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Notion'],
    meta: [
      { label: 'Project', value: 'Self-Portfolio Design & Dev' },
      { label: 'Concept', value: 'Notion-Inspired Minimalist' },
      { label: 'Role', value: 'Planning, Design, Publishing (100%)' },
      { label: 'Focus', value: 'User Experience & Readability' },
    ],
  },
  extraRoutes: [
    {
      path: '/v2',
      name: 'HomeV2',
      component: HomeV2,
    },
  ],
};

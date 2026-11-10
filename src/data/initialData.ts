import { Project, SiteSettings, Showreel } from '../types/portfolio';

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'SUTIDEO SUNG',
  tagline: '영상과 사진으로, 장면의 가치를 기록합니다.',
  philosophyHeading: 'OUR PHILOSOPHY',
  philosophyText: `좋은 콘텐츠는 화려한 기술보다 정확한 시선에서 시작됩니다.

기획부터 촬영, 편집, 모션그래픽과 AI 비주얼까지,
브랜드가 전하고 싶은 이야기를 하나의 장면으로 설계합니다.`,
  contactEmail: 'contact@sutideosung.com',
  instagramUrl: 'https://instagram.com/ddd_huck',
  location: 'Seoul, Republic of Korea',
  footerText: 'SUTIDEO SUNG © ALL RIGHTS RESERVED.'
};

export const INITIAL_SHOWREEL: Showreel = {
  id: 'showreel-2026',
  videoUrl: '/videos/sample-showreel.mp4',
  posterUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80',
  isPublished: true
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'project-01',
    projectNumber: '01',
    title: 'THE SILENT ECHO',
    category: 'Commercial Film / Direction',
    year: '2026',
    shortDescription: '도심 속 정적과 공간의 조형미를 4K 시네마틱 무빙으로 담아낸 건축 비주얼 필름.',
    introduction: '공간이 품은 정적을 소리 없는 파동으로 재해석한 건축 시네마틱 프로젝트입니다. 빛과 그림자가 교차하는 순간을 포착하여 단순한 구조물이 아닌 살아 숨 쉬는 서사적 조형물로 완성했습니다.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    lpCoverUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=800&q=80',
    lpCoverPosition: { x: 50, y: 50, scale: 1 },
    centerLabelText: 'SUTIDEO 01 · THE SILENT ECHO',
    mainVideoUrl: '/videos/sample-cinematic.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    additionalMedia: [
      { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', caption: '건축물의 기하학적 대칭과 빛의 흐름' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', caption: '유리와 메탈릭 표면이 반사하는 저녁의 여운' }
    ],
    displayOrder: 1,
    isLpVisible: true,
    isPublished: true,
    contentBlocks: [
      {
        id: 'b-01',
        projectId: 'proj-01',
        blockType: 'heading',
        textContent: '빛의 조형과 여백의 미학',
        sortOrder: 1
      },
      {
        id: 'b-02',
        projectId: 'proj-01',
        blockType: 'paragraph',
        textContent: '렌즈를 통해 바라본 건축물은 침묵 속에서 끊임없이 변주합니다. 자연광의 미세한 각도 변화에 따라 선과 면이 만들어내는 입체감을 고감도 시네마 카메라로 담아냈습니다.',
        sortOrder: 2
      },
      {
        id: 'b-03',
        projectId: 'proj-01',
        blockType: 'two_column',
        mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
        mediaUrl2: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
        caption: '구조적 균형감과 미니멀한 내부 디테일',
        sortOrder: 3
      },
      {
        id: 'b-04',
        projectId: 'proj-01',
        blockType: 'quote',
        textContent: '“보이지 않는 여백을 조명할 때, 장면은 비로소 하나의 시가 된다.”',
        sortOrder: 4
      },
      {
        id: 'b-05',
        projectId: 'proj-01',
        blockType: 'image_caption',
        mediaUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
        caption: '피사체의 감정이 극대화되는 앰비언트 라이팅 씬',
        altText: '오피스 공간의 정적인 무드',
        sortOrder: 5
      }
    ],
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-02-01T12:00:00Z'
  },
  {
    id: 'proj-02',
    slug: 'project-02',
    projectNumber: '02',
    title: 'OBSIDIAN CHRONICLE',
    category: 'Product Visual / Macro Cinema',
    year: '2026',
    shortDescription: '흑요석의 텍스처와 금속의 차가운 광택을 극대화한 하이엔드 타임피스 프로덕트 필름.',
    introduction: '극한의 디테일을 추구한 프리미엄 타임피스 매크로 비주얼 프로젝트입니다. 0.1mm의 기계식 무브먼트의 박동과 옵시디언 다이얼의 결을 시네마토그래피로 구현했습니다.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    lpCoverUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&h=800&q=80',
    lpCoverPosition: { x: 50, y: 50, scale: 1 },
    centerLabelText: 'SUTIDEO 02 · OBSIDIAN CHRONICLE',
    mainVideoUrl: '/videos/sample-cinematic.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80',
    additionalMedia: [
      { id: 'm3', type: 'image', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80', caption: '텍스처 질감 극대화' }
    ],
    displayOrder: 2,
    isLpVisible: true,
    isPublished: true,
    contentBlocks: [
      {
        id: 'b-06',
        projectId: 'proj-02',
        blockType: 'heading',
        textContent: '정밀함의 정점, 미시 세계의 빛',
        sortOrder: 1
      },
      {
        id: 'b-07',
        projectId: 'proj-02',
        blockType: 'paragraph',
        textContent: '마이크로 프루브 렌즈와 전용 모션 컨트롤 리그를 활용하여 기존 카메라로는 접근할 수 없었던 미세한 톱니바퀴와 사파이어 글래스의 반사각을 유려하게 담았습니다.',
        sortOrder: 2
      },
      {
        id: 'b-08',
        projectId: 'proj-02',
        blockType: 'image_caption',
        mediaUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80',
        caption: '딥 블랙 배경에서 부각되는 금속 모서리의 스펙큘러 하이라이트',
        altText: '매크로 하이라이트',
        sortOrder: 3
      }
    ],
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-15T15:30:00Z'
  },
  {
    id: 'proj-03',
    slug: 'project-03',
    projectNumber: '03',
    title: 'AURA OF MOTION',
    category: 'Motion Graphics / 3D Art',
    year: '2026',
    shortDescription: '유체 역학과 키네틱 타이포그래피가 융합된 인터랙티브 브랜드 아이덴티티 무비.',
    introduction: '브랜드의 역동적인 생명력을 유체 시뮬레이션과 3D 공간 타이포그래피의 결합으로 표현한 실험적 아트워크입니다. 실사 촬영과 3D 컴퓨터 그래픽스의 경계를 허물었습니다.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    lpCoverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=800&q=80',
    lpCoverPosition: { x: 50, y: 50, scale: 1 },
    centerLabelText: 'SUTIDEO 03 · AURA OF MOTION',
    mainVideoUrl: '/videos/sample-cinematic.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    additionalMedia: [],
    displayOrder: 3,
    isLpVisible: true,
    isPublished: true,
    contentBlocks: [
      {
        id: 'b-09',
        projectId: 'proj-03',
        blockType: 'heading',
        textContent: '형태가 소멸하고 다시 태어나는 유기적 리듬',
        sortOrder: 1
      },
      {
        id: 'b-10',
        projectId: 'proj-03',
        blockType: 'paragraph',
        textContent: '수백만 개의 파티클과 점성 시뮬레이션을 통해 정형화되지 않은 비정형 오브젝트의 생명력을 직관적으로 형상화했습니다.',
        sortOrder: 2
      },
      {
        id: 'b-11',
        projectId: 'proj-03',
        blockType: 'image_caption',
        mediaUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
        caption: '점성과 광택이 상호작용하는 씬 렌더링 프레임',
        altText: '유체 시뮬레이션 프레임',
        sortOrder: 3
      }
    ],
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-03-05T11:20:00Z'
  },
  {
    id: 'proj-04',
    slug: 'project-04',
    projectNumber: '04',
    title: 'NOCTURNE SEOUL',
    category: 'Cinematography / Editorial',
    year: '2025',
    shortDescription: '비 내리는 서울의 밤, 네온과 안개 속에 감춰진 도시의 서정성을 담은 다큐멘터리 에세이.',
    introduction: '네온사인의 번짐과 젖은 아스팔트에 반사되는 서울의 밤 풍경. 화려함 뒤에 가려진 도시인의 고요한 발걸음을 35mm 아나모픽 렌즈의 특유의 플레어로 기록했습니다.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80',
    lpCoverUrl: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&h=800&q=80',
    lpCoverPosition: { x: 50, y: 50, scale: 1 },
    centerLabelText: 'SUTIDEO 04 · NOCTURNE SEOUL',
    mainVideoUrl: '/videos/sample-cinematic.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1600&q=80',
    additionalMedia: [],
    displayOrder: 4,
    isLpVisible: true,
    isPublished: true,
    contentBlocks: [
      {
        id: 'b-12',
        projectId: 'proj-04',
        blockType: 'heading',
        textContent: '시선의 온도, 밤의 색채',
        sortOrder: 1
      },
      {
        id: 'b-13',
        projectId: 'proj-04',
        blockType: 'paragraph',
        textContent: '가장 익숙한 골목이 젖은 노면과 낮은 조도 속에서 전혀 새로운 영화적 무대로 탈바꿈합니다. 콘트라스트를 억제하고 중간 톤의 그라데이션을 섬세하게 살려냈습니다.',
        sortOrder: 2
      },
      {
        id: 'b-14',
        projectId: 'proj-04',
        blockType: 'quote',
        textContent: '“어둠 속에서 비로소 피어나는 도시의 진정한 온도를 렌즈에 담는다.”',
        sortOrder: 3
      }
    ],
    createdAt: '2025-11-12T14:00:00Z',
    updatedAt: '2025-12-01T17:00:00Z'
  },
  {
    id: 'proj-05',
    slug: 'project-05',
    projectNumber: '05',
    title: 'SYNTHETIC GENESIS',
    category: 'AI Visual Production / Concept',
    year: '2026',
    shortDescription: '초현실적 자연 생태계와 미래 기계 문명의 공존을 탐구한 생성형 AI 융합 필름.',
    introduction: '최첨단 생성형 비주얼 모델과 인간 디렉터의 심층 프롬프트 엔지니어링이 빚어낸 미래 신화. 유전적 변이를 거친 식물군과 바이오메카닉 조형물이 어우러진 비주얼 쇼케이스입니다.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    lpCoverUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&h=800&q=80',
    lpCoverPosition: { x: 50, y: 50, scale: 1 },
    centerLabelText: 'SUTIDEO 05 · SYNTHETIC GENESIS',
    mainVideoUrl: '/videos/sample-cinematic.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=80',
    additionalMedia: [],
    displayOrder: 5,
    isLpVisible: true,
    isPublished: true,
    contentBlocks: [
      {
        id: 'b-15',
        projectId: 'proj-05',
        blockType: 'heading',
        textContent: '알고리즘과 직관의 협업',
        sortOrder: 1
      },
      {
        id: 'b-16',
        projectId: 'proj-05',
        blockType: 'paragraph',
        textContent: '단순한 이미지 생성을 넘어 프레임 간 일관성(Consistency)과 3차원 공간감을 완벽히 제어하기 위해 커스텀 LoRA와 디퓨전 제어 기술을 직접 파이프라인에 구축했습니다.',
        sortOrder: 2
      }
    ],
    createdAt: '2026-02-20T11:00:00Z',
    updatedAt: '2026-03-02T19:00:00Z'
  },
  {
    id: 'proj-06',
    slug: 'project-06',
    projectNumber: '06',
    title: 'TERRA INCOGNITA',
    category: 'Brand Film / Aerial Cinema',
    year: '2025',
    shortDescription: '화산 지대와 검은 모래 해변의 압도적인 질감을 FPV 고속 비행으로 포착한 아웃도어 캠페인.',
    introduction: '자연의 가장 거친 날것의 숨결을 시네마틱 FPV 드론과 초망원 카메라의 대비로 표현했습니다. 문명의 손길이 닿지 않은 대지의 힘을 화면 가득 담아냈습니다.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    lpCoverUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&h=800&q=80',
    lpCoverPosition: { x: 50, y: 50, scale: 1 },
    centerLabelText: 'SUTIDEO 06 · TERRA INCOGNITA',
    mainVideoUrl: '/videos/sample-cinematic.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
    additionalMedia: [],
    displayOrder: 6,
    isLpVisible: true,
    isPublished: true,
    contentBlocks: [
      {
        id: 'b-17',
        projectId: 'proj-06',
        blockType: 'heading',
        textContent: '지평선을 가르는 비행의 감각',
        sortOrder: 1
      },
      {
        id: 'b-18',
        projectId: 'proj-06',
        blockType: 'paragraph',
        textContent: '초속 30m로 절벽을 타고 하강하는 FPV 드론 촬영을 통해 보는 이에게 직접 대지를 활공하는 듯한 압도적 몰입감을 선사합니다.',
        sortOrder: 2
      }
    ],
    createdAt: '2025-10-05T13:00:00Z',
    updatedAt: '2025-11-01T10:00:00Z'
  },
  {
    id: 'proj-07',
    slug: 'project-07',
    projectNumber: '07',
    title: 'THE ARTISAN’S HANDS',
    category: 'Documentary / Photography',
    year: '2025',
    shortDescription: '오랜 세월 금속을 다듬어온 장인의 손길과 도구의 마모를 집요하게 기록한 에디토리얼 포토 시리즈.',
    introduction: '하나의 사물이 완성되기까지 거치는 침묵과 숙련의 시간. 대형 포맷 카메라의 해상력으로 장인의 지문과 공구에 남은 세월의 흔적을 담았습니다.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    lpCoverUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&h=800&q=80',
    lpCoverPosition: { x: 50, y: 50, scale: 1 },
    centerLabelText: 'SUTIDEO 07 · THE ARTISAN’S HANDS',
    mainVideoUrl: '/videos/sample-cinematic.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
    additionalMedia: [],
    displayOrder: 7,
    isLpVisible: true,
    isPublished: true,
    contentBlocks: [
      {
        id: 'b-19',
        projectId: 'proj-07',
        blockType: 'heading',
        textContent: '손끝에 깃든 영속의 시간',
        sortOrder: 1
      },
      {
        id: 'b-20',
        projectId: 'proj-07',
        blockType: 'paragraph',
        textContent: '흑백 톤의 묵직한 콘트라스트를 통해 기술이 흉내 낼 수 없는 인간 손길의 숭고함을 표현했습니다.',
        sortOrder: 2
      }
    ],
    createdAt: '2025-08-14T09:00:00Z',
    updatedAt: '2025-09-02T16:00:00Z'
  }
];

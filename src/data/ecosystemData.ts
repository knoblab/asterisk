export interface MonochromeToken {
  name: string;
  koreanName: string;
  cssVar: string;
  hex: string;
  darkHex: string;
  role: string;
  isBase: boolean;
  contrastText: string;
  darkContrastText: string;
}

export const monochromeTokens: MonochromeToken[] = [
  {
    name: "Black",
    koreanName: "기본 텍스트 · 테두리",
    cssVar: "--color-black",
    hex: "#000000",
    darkHex: "#F7F6F2",
    role: "본문 텍스트, 워드마크, 1px 기본 실선 테두리, 강조 배경",
    isBase: true,
    contrastText: "#F7F6F2",
    darkContrastText: "#000000",
  },
  {
    name: "Carbon",
    koreanName: "주요 버튼 호버 · 다크 표면",
    cssVar: "--color-carbon",
    hex: "#1C1C1E",
    darkHex: "#EBE9E1",
    role: "주요 버튼 호버 상태 및 어두운 카드 표면",
    isBase: false,
    contrastText: "#F7F6F2",
    darkContrastText: "#000000",
  },
  {
    name: "Graphite",
    koreanName: "보조 텍스트",
    cssVar: "--color-graphite",
    hex: "#48484A",
    darkHex: "#A0A19B",
    role: "설명문, 부제, 태그 테두리",
    isBase: false,
    contrastText: "#F7F6F2",
    darkContrastText: "#000000",
  },
  {
    name: "Muted",
    koreanName: "메타데이터 · 시간 표기",
    cssVar: "--color-telemetry",
    hex: "#8E8E93",
    darkHex: "#77777A",
    role: "날짜, 시간, 글 번호 등 보조 정보",
    isBase: false,
    contrastText: "#000000",
    darkContrastText: "#F7F6F2",
  },
  {
    name: "Silver",
    koreanName: "보조 구분선",
    cssVar: "--color-silver",
    hex: "#D1D1D6",
    darkHex: "#2C2C2E",
    role: "내부 목록 구분선, 비활성 테두리",
    isBase: false,
    contrastText: "#000000",
    darkContrastText: "#F7F6F2",
  },
  {
    name: "Surface",
    koreanName: "보조 배경",
    cssVar: "--color-vellum",
    hex: "#EBE9E1",
    darkHex: "#18191C",
    role: "카드 내부 영역, 표 헤더, 호버 배경",
    isBase: false,
    contrastText: "#000000",
    darkContrastText: "#F7F6F2",
  },
  {
    name: "Paper",
    koreanName: "기본 배경",
    cssVar: "--color-paper",
    hex: "#F7F6F2",
    darkHex: "#000000",
    role: "전체 페이지 기본 배경 및 반전 텍스트",
    isBase: true,
    contrastText: "#000000",
    darkContrastText: "#F7F6F2",
  },
];

export interface ServiceDetail {
  id: "cnsh-life" | "community";
  title: string;
  domain: string;
  url: string;
  repoName: string;
  repoUrl: string;
  tier: string;
  trackType: "Life Track" | "Space Track";
  license: string;
  tagline: string;
  description: string;
  modules: {
    name: string;
    description: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: "cnsh-life",
    title: "cnsh.life",
    domain: "cnsh.life",
    url: "https://cnsh.life",
    repoName: "kuchipatchi09/everytime",
    repoUrl: "https://github.com/kuchipatchi09/everytime",
    tier: "학교생활 포털",
    trackType: "Life Track",
    license: "GNU AGPL-3.0",
    tagline: "학교생활 유틸리티 · 실시간 시정 · NEIS 연동",
    description:
      "충남과학고 일과(수·금·일 특수 시정 포함)에 맞춘 학교생활 포털입니다. 로그인 없이 접속하자마자 현재 교시 남은 시간, NEIS 시간표, 조·중·석식 식단과 알레르기 정보, 방과후 편성, 학교 공지를 확인할 수 있습니다.",
    modules: [
      {
        name: "실시간 시정 & 천체 배경",
        description:
          "수·금·일 특수 시정표 카운트다운(NOW)과 충남과학고 좌표 기준 일출·일몰·달 위상·별자리 배경 표시",
      },
      {
        name: "NEIS 시간표 & 수업 교체",
        description:
          "학년·반별 NEIS 시간표 조회 및 주간 변경 사항 반영",
      },
      {
        name: "급식 식단 & 알레르기",
        description:
          "시간대에 맞춘 조·중·석식 자동 표시 및 1~18번 알레르기 유발 식품 안내",
      },
      {
        name: "방과후 편성 & 학교 공지",
        description:
          "요일·반별 방과후 수업 편성표와 학교 홈페이지 공지·가정통신문 연동",
      },
      {
        name: "면학실 자습 타이머 & PWA",
        description:
          "백색소음·빗소리 뽀모도로 타이머 및 모바일·태블릿 홈 화면 설치 지원",
      },
    ],
  },
  {
    id: "community",
    title: "cnsh.space",
    domain: "cnsh.space",
    url: "https://cnsh.space",
    repoName: "knoblab/asterisk-community-frontend",
    repoUrl: "https://github.com/knoblab/asterisk-community-frontend",
    tier: "재학생 커뮤니티",
    trackType: "Space Track",
    license: "MIT / Proprietary",
    tagline: "재학생 인증 커뮤니티 · 수식·미디어 · asterisk* AI",
    description:
      "Knoblab SSO로 재학생 인증을 거쳐 기수 배지를 받고 활동하는 충남과학고 전용 커뮤니티입니다. KaTeX 수식과 최대 45MB 동영상 스트리밍을 지원하며, 급식·시간표·과제 등 10종의 내부 도구를 연동한 asterisk* AI를 사용할 수 있습니다.",
    modules: [
      {
        name: "재학생 인증 & 게시판",
        description:
          "Knoblab SSO 연동(기수 배지 부여), 공지·자유·질문·정보·자료 등 목적별 게시판과 인기글",
      },
      {
        name: "KaTeX 수식 & 마크다운",
        description:
          "LaTeX 인라인·디스플레이 수식, GFM 표, 코드 블록 렌더링 지원",
      },
      {
        name: "45MB 비디오 스트리밍 & 보안",
        description:
          "클라이언트 썸네일 추출, Nginx Range Requests(HTTP 206) 기반 무인코딩 스트리밍 및 파일 매직 넘버 검증",
      },
      {
        name: "asterisk* AI & 내부 도구 연동",
        description:
          "Decisions 모델 라우터 기반 모델 선택 및 급식·시간표·게시글·이미지 분석 등 10종 도구 연동",
      },
    ],
  },
];

export interface ComparisonMatrixRow {
  dimension: string;
  lifeTrack: string;
  spaceTrack: string;
}

export interface SynergyPoint {
  title: string;
  description: string;
}

export interface TwoTrackStrategy {
  headline: string;
  summary: string;
  philosophy: string[];
  matrixRows: ComparisonMatrixRow[];
  synergies: SynergyPoint[];
}

export const twoTrackStrategyData: TwoTrackStrategy = {
  headline: "cnsh.life와 cnsh.space를 나눈 이유",
  summary:
    "시간표나 급식을 잠깐 확인하는 용도와 재학생끼리 글을 쓰고 자료를 나누는 커뮤니티는 필요한 로그인 방식과 구조가 다릅니다. asterisk*는 두 기능을 한 앱에 합치지 않고 목적에 맞게 두 서비스로 나눴습니다.",
  philosophy: [
    "쉬는 시간이나 이동 중에 급식·시간표를 확인할 때는 로그인 절차 없이 바로 열려야 합니다 (Life Track).",
    "질문 답변, 자료 공유, 기수 간 소통은 외부인 접근을 막는 재학생 인증과 수식·미디어 기능이 필요합니다 (Space Track).",
    "서비스는 나뉘어 있지만 같은 무채색 UI를 쓰고, asterisk* AI가 포털 데이터를 불러오는 방식으로 이어져 있습니다.",
  ],
  matrixRows: [
    {
      dimension: "서비스 및 도메인",
      lifeTrack: "cnsh.life (학교생활 포털)",
      spaceTrack: "cnsh.space (재학생 커뮤니티)",
    },
    {
      dimension: "주요 역할",
      lifeTrack: "로그인 없이 확인하는 시정표·시간표·급식·공지",
      spaceTrack: "재학생 게시판, 수식·자료 공유, AI 질의응답",
    },
    {
      dimension: "접근 및 인증",
      lifeTrack: "별도 로그인 없음 (PWA 오프라인 지원)",
      spaceTrack: "Knoblab SSO 재학생 기수 인증",
    },
    {
      dimension: "기술 구성",
      lifeTrack: "클라이언트 중심 SPA (NEIS·공공 API 연동)",
      spaceTrack: "풀스택 웹 + Nginx 동영상 스트리밍 + asterisk AI 모델 라우터",
    },
    {
      dimension: "주요 기능",
      lifeTrack: "수·금·일 특수 시정 카운트다운, 급식, 하늘 배경, 자습 타이머",
      spaceTrack: "KaTeX 수식, 동영상·이미지 업로드, 목적별 게시판, @asterisk AI",
    },
    {
      dimension: "AI 연동",
      lifeTrack: "급식·시간표·시정표 데이터 제공",
      spaceTrack: "Decisions 모델 라우터가 10종 내부 도구로 포털·커뮤니티 데이터를 불러와 답변",
    },
    {
      dimension: "라이선스",
      lifeTrack: "GNU AGPL-3.0",
      spaceTrack: "MIT (프론트엔드) / Proprietary (백엔드)",
    },
  ],
  synergies: [
    {
      title: "공통 모노크롬 디자인",
      description:
        "Paper(#F7F6F2)와 검정(#000000), 1px 실선 테두리, Asta Sans·Pretendard 서체를 양쪽에 공통 적용해 두 사이트를 오가도 화면 구성이 어색하지 않습니다.",
    },
    {
      title: "asterisk* AI 데이터 연동",
      description:
        "cnsh.space의 @asterisk AI는 cnsh.life의 급식·시간표 데이터를 내부 도구(school_meal, school_timetable)로 불러와 게시판 댓글이나 채팅에서 바로 답합니다.",
    },
    {
      title: "일과 확인과 커뮤니티의 역할 분담",
      description:
        "등교부터 수업·급식·방과후·자습 시간 확인은 cnsh.life가 맡고, 질문·자료 공유·동아리 소통은 cnsh.space에서 이뤄집니다.",
    },
  ],
};

export interface BrandChapter {
  num: string;
  title: string;
  quote?: string;
  quoteAuthor?: string;
  paragraphs: string[];
}

export const brandChapters: BrandChapter[] = [
  {
    num: "01",
    title: "숫자 42와 ASCII 별표(*)",
    quote:
      '"The Answer to the Ultimate Question of Life, the Universe, and Everything is... Forty-two."',
    quoteAuthor: "Douglas Adams, 《The Hitchhiker's Guide to the Galaxy》",
    paragraphs: [
      "더글러스 애덤스의 소설 《은하수를 여행하는 히치하이커를 위한 안내서》에서 삶과 우주, 모든 것의 해답으로 등장하는 숫자 42는 컴퓨터 ASCII 코드에서 별표 기호(*)에 해당합니다.",
    ],
  },
  {
    num: "02",
    title: "와일드카드(*)",
    paragraphs: [
      "프로그래밍에서 * 기호는 모든 조건을 가리키는 와일드카드(Everything)로 쓰입니다. 시간표와 급식을 확인하는 포털(cnsh.life)부터 학생 게시판(cnsh.space)까지 학교 생활에 필요한 여러 서비스를 하나로 묶는다는 뜻을 담았습니다.",
    ],
  },
  {
    num: "03",
    title: "각주 기호와 무채색 화면",
    paragraphs: [
      "문서에서 부연 설명을 달 때 쓰는 각주 기호(*)에서 착안해, 불필요한 장식 색상을 빼고 종이 색(#F7F6F2)과 검정(#000000), 1px 실선 위주로 화면을 구성했습니다.",
    ],
  },
];

export interface LicenseSpec {
  id: string;
  moduleName: string;
  repoLabel: string;
  repoUrl?: string;
  spdx: string;
  summary: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
}

export const licenseSpecs: LicenseSpec[] = [
  {
    id: "agpl",
    moduleName: "cnsh.life",
    repoLabel: "kuchipatchi09/everytime",
    repoUrl: "https://github.com/kuchipatchi09/everytime",
    spdx: "GNU AGPL-3.0",
    summary:
      "누구나 코드를 열람·수정할 수 있으며, 수정본을 웹 서비스(네트워크 서버)로 제공할 경우 전체 소스코드를 동일한 AGPL-3.0 라이선스로 공개해야 합니다.",
    permissions: ["상업적·사적 이용", "수정 및 재배포"],
    conditions: ["네트워크 서버 구동 시 소스 전체 공개", "동일 라이선스(AGPL-3.0) 유지"],
    limitations: ["보증 및 책임 없음", "상표권 불포함"],
  },
  {
    id: "mit",
    moduleName: "cnsh.space (Frontend)",
    repoLabel: "knoblab/asterisk-community-frontend",
    repoUrl: "https://github.com/knoblab/asterisk-community-frontend",
    spdx: "MIT License",
    summary:
      "원작자 저작권 표기와 라이선스 전문을 유지하면 자유롭게 수정·재배포할 수 있습니다.",
    permissions: ["사용·수정·재배포", "상업적·사적 이용"],
    conditions: ["저작권 및 MIT 라이선스 고지 포함"],
    limitations: ["보증 및 책임 없음"],
  },
  {
    id: "proprietary",
    moduleName: "cnsh.space (Backend) & Brand",
    repoLabel: "Knoblab Private / Brand Assets",
    spdx: "Proprietary",
    summary:
      "커뮤니티 백엔드 서버(인증·DB·보안)와 asterisk* 로고·워드마크 자산은 학생 개인정보 보호 및 사칭 방지를 위해 비공개로 운영됩니다.",
    permissions: ["공식 웹 서비스 이용", "출처 표기 후 비상업적 인용"],
    conditions: ["Knoblab 계정 이용약관 준수"],
    limitations: ["무단 API 호출 및 역공학 금지", "공식 서비스 사칭 및 로고 변형 금지"],
  },
];

export const fontLicensesList = [
  {
    name: "Asta Sans",
    copyright: "Copyright (c) 2024 The Asta Sans Project Authors",
    license: "SIL OFL 1.1",
    role: "워드마크, 영문 제목, 숫자 표기",
  },
  {
    name: "Pretendard",
    copyright: "Copyright (c) 2021 Kil Hyung-jin",
    license: "SIL OFL 1.1",
    role: "한국어 본문 및 UI 전반",
  },
];

export interface CreditRoleItem {
  title: string;
  description: string;
}

export interface CreditProfile {
  id: string;
  name: string;
  subtitle: string;
  githubHandle: string;
  githubUrl: string;
  email?: string;
  logoPath?: string;
  signatureColor?: string;
  summary: string;
  roles: CreditRoleItem[];
}

export const creditsList: CreditProfile[] = [
  {
    id: "knoblab",
    name: "Knoblab",
    subtitle: "asterisk* 창안 · 커뮤니티 총괄 및 호스팅",
    githubHandle: "knoblab",
    githubUrl: "https://github.com/knoblab",
    email: "contact@knoblab.xyz",
    logoPath: "/knoblab.svg",
    signatureColor: "#556042",
    summary:
      "asterisk* 브랜드 기획과 디자인 설계, 커뮤니티 풀스택 개발 및 서버 호스팅을 담당합니다.",
    roles: [
      {
        title: "asterisk* 최초 구상",
        description: "ASCII 42(*)에서 착안한 프로젝트 이름과 통합 브랜드 기획",
      },
      {
        title: "asterisk* 컨셉 및 디자인 설계",
        description: "워드마크, 무채색 색상 체계, 공통 UI 컴포넌트 디자인",
      },
      {
        title: "cnsh.space 프론트·백엔드 헤드 개발",
        description: "커뮤니티 웹 클라이언트, 통합 로그인(SSO), @asterisk AI 서버 개발",
      },
      {
        title: "커뮤니티 서버 호스팅 운영",
        description: "서버 인프라 구축, 데이터베이스 및 네트워크 관리",
      },
      {
        title: "asterisk cnsh.life 개발 참여",
        description: "학교생활 포털 기능 개발 및 디자인 시스템 적용",
      },
    ],
  },
  {
    id: "kuchipatchi09",
    name: "황석현",
    subtitle: "asterisk cnsh.life 창안 · 포털 헤드 개발",
    githubHandle: "kuchipatchi09",
    githubUrl: "https://github.com/kuchipatchi09",
    summary:
      "충남과학고 학교생활 포털 cnsh.life를 처음 기획하고 전체 시스템을 총괄 개발했습니다.",
    roles: [
      {
        title: "asterisk cnsh.life 최초 구상 및 기획",
        description: "충남과학고 학생용 시간표·급식·일정 통합 포털 최초 기획",
      },
      {
        title: "asterisk cnsh.life 헤드 개발",
        description: "포털 프론트엔드 및 백엔드 전체 구조 설계·개발",
      },
      {
        title: "충남과학고 특수 시정 & NEIS 연동",
        description: "수·금·일 특수 일과표 로직과 학급별 시간표·급식·방과후 연동",
      },
      {
        title: "실시간 교시 브리핑 & 천체 배경 구현",
        description: "현재 교시 카운트다운(NOW) 및 시간대별 하늘·별자리 렌더링",
      },
      {
        title: "자습 타이머 · 공지 크롤링 · PWA 구성",
        description: "백색소음 타이머, 학교 홈페이지 공지 연동, 모바일 웹앱 지원",
      },
    ],
  },
  {
    id: "gitkimcl",
    name: "김준섭",
    subtitle: "코드 검증 · 디버깅 및 안정성 개선",
    githubHandle: "gitkimcl",
    githubUrl: "https://github.com/gitkimcl",
    summary:
      "기존 코드 검토와 버그 수정, 예외 처리를 맡아 서비스 안정성을 높였습니다.",
    roles: [
      {
        title: "기존 코드 검증 및 리뷰",
        description: "핵심 로직을 검토하고 오류가 날 만한 부분을 사전에 점검",
      },
      {
        title: "버그 추적 및 수정",
        description: "실사용 중 발생한 기능 오류 원인을 분석하고 패치",
      },
      {
        title: "학사 데이터 연동 오류 교정",
        description: "시간표·일정·급식 데이터 파싱 과정의 예외 케이스 수정",
      },
      {
        title: "브라우저·모바일 환경 호환성 점검",
        description: "다양한 기기와 화면 크기에서 발생하는 UI 깨짐 및 동작 오류 해결",
      },
      {
        title: "서비스 안정성 테스트 및 QA",
        description: "배포 전후 기능 동작 확인 및 안정성 점검",
      },
    ],
  },
];

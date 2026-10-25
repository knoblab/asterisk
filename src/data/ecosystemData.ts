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
    license: "GNU AGPL-3.0",
    tagline: "시간표 · 급식 · 방과후 · 타이머",
    description:
      "충남과학고 일과표(수·금·일 특수 시정 포함)를 바탕으로 현재 교시 진행 상황, 급식, 방과후, 학교 공지를 한 화면에서 보여줍니다.",
    modules: [
      {
        name: "실시간 시정 & 천체 배경",
        description: "현재 교시 남은 시간 표시 및 시간대별 하늘·천체 배경 전환",
      },
      {
        name: "NEIS 시간표 & 특수 일과",
        description: "학급별 시간표 조회 및 수·금·일 일과표 자동 반영",
      },
      {
        name: "급식 식단 & 방과후",
        description: "조·중·석식 메뉴와 알레르기 정보, 주간 방과후 일정 확인",
      },
      {
        name: "자습 타이머 & 웹앱(PWA)",
        description: "백색소음 타이머 및 모바일 홈 화면 추가 지원",
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
    license: "MIT / Proprietary",
    tagline: "재학생 게시판 & @asterisk AI",
    description:
      "Knoblab 통합 계정으로 인증된 충남과학고 학생 전용 게시판입니다. 댓글에서 @asterisk를 호출해 급식이나 학사 일정을 바로 물어볼 수 있습니다.",
    modules: [
      {
        name: "재학생 인증 & 기수 배지",
        description: "Knoblab 통합 로그인 연동 및 입학 기수(33기 등) 표시",
      },
      {
        name: "카테고리별 게시판",
        description: "질문·자료·정보·잡담 등 8개 게시판 및 인기글 분류",
      },
      {
        name: "@asterisk AI 응답",
        description: "댓글 멘션 시 급식·일정·게시글을 조회해 자동 답변",
      },
      {
        name: "파일 검증 & 보안",
        description: "첨부파일 시그니처(매직 넘버) 검사 및 비인가 요청 차단",
      },
    ],
  },
];

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
      "기존 코드베이스 검증과 버그 수정, 예외 상황 처리를 전담해 서비스 안정성을 높였습니다.",
    roles: [
      {
        title: "기존 코드 검증 및 리뷰",
        description: "작성된 핵심 로직을 검토하고 잠재적 오류 지점을 사전에 파악",
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
        description: "배포 전후 기능 동작 검증 및 런타임 안정성 확보",
      },
    ],
  },
];

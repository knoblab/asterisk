export interface AiModelSpec {
  id: string;
  name: string;
  provider: string;
  role: string;
  description: string;
  badge?: string;
  features: string[];
}

export interface AiToolSpec {
  id: string;
  category: string;
  categoryLabel: string;
  badgeName: string;
  description: string;
  name?: string;
  summary?: string;
  trigger?: string;
}

export interface AiPipelineStep {
  step: string;
  title: string;
  desc: string;
}

export const aiPipelineSteps: AiPipelineStep[] = [
  {
    step: "01",
    title: "맥락(State) 직렬화",
    desc: "질문 텍스트뿐만 아니라 게시글 본문, 대화 흐름, 질문자 정보를 최대 4,000자의 맥락으로 압축 구성합니다.",
  },
  {
    step: "02",
    title: "Jev 복합 의사결정",
    desc: "의사결정 전용 경량 엔진 Jev(jev-1.14.0)가 단일 호출로 최적의 언어 모델과 필요한 내부 도구 목록을 100~200ms 만에 확정합니다.",
  },
  {
    step: "03",
    title: "자체 도구 동시 실행",
    desc: "판정된 도구(급식·시간표·클래스룸·아카이브 등)를 실시간 병렬 실행하고, 기준 시각(현재 시간)을 함께 주입합니다.",
  },
  {
    step: "04",
    title: "컨텍스트 기반 정밀 생성",
    desc: "외부 최신 정보나 실제 학교 데이터를 시스템 프롬프트에 주입하여, 생성 모델의 환각(Hallucination)을 사전에 차단합니다.",
  },
  {
    step: "05",
    title: "게시글 각주 자동 연결",
    desc: "답변 본문에서 언급된 교내 커뮤니티 글 제목을 감지해 /post/7자리코드 원문 링크와 각주([^1])를 자동으로 연결합니다.",
  },
  {
    step: "06",
    title: "실시간 투명성 공개",
    desc: "진행 상태(모델 선택 중 → 생각 중 → 답변 작성 중)를 실시간 표시하며, 답변 하단의 정보(ⓘ) 버튼으로 사용된 모델과 도구를 누구나 확인할 수 있습니다.",
  },
];

export const aiCandidateModels: AiModelSpec[] = [
  {
    id: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    provider: "Anthropic",
    badge: "기본 주력 (트래픽 90%+)",
    role: "일상 대화 · 티키타카 · 실시간 웹 검색 & 자체 도구 종합 질의",
    description:
      "자연스러운 한국어 대화 톤과 부드러운 공감 능력을 갖춘 기본 주력 모델입니다. 외부 웹 검색과 자체 내부 도구 데이터를 종합하여 가장 빠르고 깔끔한 답변을 작성합니다.",
    features: [
      "자체 내부 도구(급식/시간표/과제 등) 결합 질의 처리",
      "실시간 웹 검색(web_search) 연동 지원",
      "자연스럽고 편안한 대화체 문장 구성",
    ],
  },
  {
    id: "gemini-3.8-flash-high",
    name: "Gemini 3.8 Flash (High)",
    provider: "Google",
    badge: "심층 추론 · 디버깅",
    role: "심층 논리 검증 · 고난도 프로그래밍 · 에러 분석",
    description:
      "높은 사고 수준(Thinking Level: HIGH)과 구글 지식 엔진을 기반으로, 복잡한 코드 에러 원인 분석이나 심층 논리 반박, 수식 검증을 전담합니다.",
    features: [
      "복잡한 에러 로그 추적 및 시스템 디버깅",
      "심층 논리 오류 팩트체크 및 반박",
      "Google Search 접지(Grounding) 연동",
    ],
  },
  {
    id: "gpt-6-luna",
    name: "GPT-6 Luna",
    provider: "OpenAI",
    badge: "요약 · 데이터 구조화",
    role: "게시글 장문 3줄 요약 · 표(Table) 정형화",
    description:
      "구조화된 텍스트 처리 능력을 바탕으로, 장문 게시글의 핵심 요약이나 여러 댓글 의견의 표(Markdown Table) 정리를 깔끔하게 수행합니다.",
    features: [
      "긴 본문 핵심 3줄 압축 요약",
      "게시글 및 댓글 내용의 표(Table) 변환",
      "정형 데이터 분류 및 목록화",
    ],
  },
  {
    id: "gemma-4",
    name: "Gemma 4",
    provider: "Google (Open Weights)",
    badge: "Fail-safe 폴백",
    role: "게이트웨이 장애 시 무중단 서비스 제공",
    description:
      "상위 API 게이트웨이 지연이나 네트워크 장애 발생 시 즉각 호출되는 최종 방어선 모델입니다. 모든 내부 도구 데이터를 자율 선별하여 서비스 중단 없이 답변을 생성합니다.",
    features: [
      "Jev 타임아웃/오류 발생 시 100% 무중단 폴백",
      "모든 도구 데이터 중 필요한 항목 자율 선별 추론",
      "안정적인 커뮤니티 상시 운영 보장",
    ],
  },
];

export const aiInternalTools: AiToolSpec[] = [
  // 학교 생활
  {
    id: "school_meal",
    category: "school",
    categoryLabel: "학교 생활",
    badgeName: "급식 조회",
    name: "급식 조회",
    description: "오늘/내일 아침·점심·저녁 급식 및 영양·알레르기 안내",
    summary: "조·중·석식 식단 및 알레르기 유발 정보 안내",
    trigger: "'급식', '오늘 학식', '내일 점심 메뉴', '석식 뭐 나와' 등 식단 질의 감지 시",
  },
  {
    id: "school_timetable",
    category: "school",
    categoryLabel: "학교 생활",
    badgeName: "시간표 조회",
    name: "시간표 조회",
    description: "학급별 실시간 시간표 및 오늘 학교 일과/야자 시간",
    summary: "학급별 시간표 실시간 조회 및 충남과학고 특수 일과표",
    trigger: "'시간표', '오늘 1-2 시간표', '지금 몇 교시야', '일과표' 등 시간표/일과 질의 시",
  },

  // 학업 연동
  {
    id: "google_classroom",
    category: "academic",
    categoryLabel: "학업 연동",
    badgeName: "클래스룸 과제",
    name: "클래스룸 과제",
    description: "연동된 구글 클래스룸 미제출 과제 및 마감 기한 조회",
    summary: "미제출 과제 및 수행평가 실시간 마감 기한 조회",
    trigger: "'남은 과제', '미제출 수행평가', '내일까지 과제 뭐 있어' 등 과제 질의 시",
  },
  {
    id: "google_calendar_reminder",
    category: "academic",
    categoryLabel: "학업 연동",
    badgeName: "캘린더 일정",
    name: "캘린더 일정",
    description: "구글 캘린더 일정 조회, 원클릭 승인 등록 및 알림",
    summary: "구글 캘린더 일정 조회 및 원클릭 일정 추가",
    trigger: "'캘린더에 일정 등록해줘', '내일 3시 회의 일정 추가' 등 일정 관련 요청 시",
  },

  // 커뮤니티
  {
    id: "community_all_posts",
    category: "community",
    categoryLabel: "커뮤니티",
    badgeName: "커뮤니티 요약",
    name: "커뮤니티 요약",
    description: "최신 인기글 및 공지사항 실시간 열람/요약",
    summary: "공지 가중치 및 키워드 기반 커뮤니티 글·댓글 검색",
    trigger: "'인기글 요약해줘', '최신 공지사항 정리', '게시판에 올라온 글' 등 요청 시",
  },
  {
    id: "user_history",
    category: "community",
    categoryLabel: "커뮤니티",
    badgeName: "내 활동 요약",
    name: "내 활동 요약",
    description: "내가 작성한 게시글 및 댓글 목록, 추천 통계 요약",
    summary: "질문자 본인이 작성한 최근 글과 댓글 이력 요약",
    trigger: "'내가 쓴 글 목록', '내 활동 요약', '내가 작성한 글 뭐 있어' 등 요청 시",
  },

  // 지식/아카이브
  {
    id: "archive_search",
    category: "archive",
    categoryLabel: "지식/아카이브",
    badgeName: "선배 노하우",
    name: "선배 노하우",
    description: "충남과학고 선배들의 과목 팁, 기출/수행평가 수기 검색",
    summary: "졸업 선배 기수 가중치 기반 공부법·과목 족보 발굴",
    trigger: "'선배들 팁', 'AP선대 공부법', 'R&E 주제 조언', '기출 족보' 등 질문 시",
  },

  // 멀티모달
  {
    id: "image_analysis",
    category: "multimodal",
    categoryLabel: "멀티모달",
    badgeName: "이미지 분석",
    name: "이미지 분석",
    description: "클립 버튼 또는 Ctrl+V로 이미지 첨부 후 OCR 및 시각 분석",
    summary: "게시글 및 채팅 첨부 사진·도표·문서 OCR 판독",
    trigger: "게시글에 이미지가 포함되어 있거나 이미지 관련 질의('사진', 'OCR', '글자') 시",
  },

  // 실시간 정보
  {
    id: "web_search",
    category: "realtime",
    categoryLabel: "실시간 정보",
    badgeName: "실시간 검색",
    name: "실시간 검색",
    description: "실시간 외부 웹 검색, 최신 뉴스, 날씨 정보 탐색",
    summary: "외부 검색 엔진 연동 실시간 정보 검색",
    trigger: "외부 최신 뉴스, 실시간 날씨, 최신 과학 기술 정보 질의 시",
  },

  // 유틸리티
  {
    id: "current_time",
    category: "utility",
    categoryLabel: "유틸리티",
    badgeName: "시각 · D-Day",
    name: "시각 · D-Day",
    description: "KST 기준 실시간 시각, 오늘 요일, 경과일 및 D-Day 계산",
    summary: "한국 표준시(KST) 연·월·일·시·분·초 기준점 제공",
    trigger: "날짜/시간 질의 및 급식/시간표/과제 도구 실행 시 무조건 강제 동반 실행",
  },
];

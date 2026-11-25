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
    title: "맥락 정리",
    desc: "질문 내용과 게시글 본문, 이전 대화, 질문자 정보를 최대 4,000자 분량의 컨텍스트로 묶습니다.",
  },
  {
    step: "02",
    title: "라우팅 판단",
    desc: "경량 라우터 모델 Gemini Decision 1이 한 번의 호출로 사용할 모델과 필요한 내부 도구를 100~200ms 안에 결정합니다.",
  },
  {
    step: "03",
    title: "내부 도구 병렬 호출",
    desc: "선택된 도구(급식·시간표·클래스룸·아카이브 등)를 동시에 실행하고, 현재 시각(KST) 정보를 함께 붙입니다.",
  },
  {
    step: "04",
    title: "데이터 기반 답변 생성",
    desc: "조회한 학교 데이터와 외부 검색 결과를 프롬프트에 함께 넣어 사실과 다른 답변(환각)을 줄입니다.",
  },
  {
    step: "05",
    title: "게시글 각주 연결",
    desc: "답변에서 언급된 커뮤니티 게시글 제목을 찾아 /post/7자리코드 링크와 각주([^1])를 자동으로 붙입니다.",
  },
  {
    step: "06",
    title: "진행 상태 및 모델 표시",
    desc: "모델 선택·생각 중·답변 작성 단계를 화면에 표시하고, 답변 하단 정보(ⓘ) 버튼에서 사용된 모델과 도구를 확인할 수 있습니다.",
  },
];

export const aiCandidateModels: AiModelSpec[] = [
  {
    id: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    provider: "Anthropic",
    badge: "기본 모델 (트래픽 90%+)",
    role: "일상 대화 · 웹 검색 · 내부 도구 종합 질의",
    description:
      "자연스러운 한국어 대화에 강한 기본 모델입니다. 웹 검색과 학교 내부 도구 결과를 묶어 대부분의 질문에 빠르게 답합니다.",
    features: [
      "급식·시간표·과제 등 내부 도구 결합 질의",
      "실시간 웹 검색(web_search) 연동",
      "자연스러운 대화형 답변 생성",
    ],
  },
  {
    id: "gemini-4-hydrogen",
    name: "Gemini 4 Hydrogen",
    provider: "Google",
    badge: "심층 추론 · 디버깅",
    role: "코드 디버깅 · 수식 검증 · 논리 검토",
    description:
      "Thinking Level: HIGH 설정을 사용해 복잡한 코드 오류 분석, 수식 풀이 검증, 긴 논리 검토가 필요한 질문에 배정됩니다.",
    features: [
      "에러 로그 분석 및 코드 디버깅",
      "수식 풀이 및 논리 오류 검토",
      "Google Search 그라운딩 연동",
    ],
  },
  {
    id: "gpt-6-luna",
    name: "GPT-6 Luna",
    provider: "OpenAI",
    badge: "요약 · 표 정리",
    role: "장문 게시글 3줄 요약 · 표(Table) 정리",
    description:
      "긴 게시글의 핵심을 3줄로 요약하거나, 여러 댓글 의견을 마크다운 표로 정리해야 할 때 사용합니다.",
    features: [
      "긴 게시글 핵심 3줄 요약",
      "게시글·댓글 내용의 마크다운 표 변환",
      "항목 분류 및 목록 정리",
    ],
  },
  {
    id: "gemma-4",
    name: "Gemma 4",
    provider: "Google (Open Weights)",
    badge: "장애 대체(Fallback)",
    role: "상위 API 장애 시 대체 응답",
    description:
      "상위 API 지연이나 라우팅 오류가 발생했을 때 대신 호출되는 예비 모델입니다. 수집된 내부 도구 데이터에서 필요한 내용을 골라 응답을 이어갑니다.",
    features: [
      "Gemini Decision 1 타임아웃·오류 발생 시 자동 대체 호출",
      "내부 도구 데이터 중 필요한 항목 선별",
      "장애 상황에서도 기본 응답 유지",
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
    summary: "선배 기수 글 기반 공부법·과목 자료 검색",
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
    description: "외부 웹 검색으로 최신 뉴스·날씨·일반 정보 조회",
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
    trigger: "날짜·시간 질문 및 급식·시간표·과제 도구 실행 시 함께 호출",
  },
];

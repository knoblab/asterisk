import React, { useState } from "react";
import {
  aiPipelineSteps,
  aiCandidateModels,
  aiInternalTools,
  type AiToolSpec,
} from "../data/asteriskAiData";

interface AsteriskAiTabProps {
  renderWithCenteredStar: (text: string) => React.ReactNode;
}

export const AsteriskAiTab: React.FC<AsteriskAiTabProps> = ({
  renderWithCenteredStar,
}) => {
  const [selectedToolCategory, setSelectedToolCategory] = useState<
    "all" | "academic" | "community" | "multimodal"
  >("all");
  const [activeModelId, setActiveModelId] = useState<string>(
    aiCandidateModels[0].id
  );

  const filteredTools =
    selectedToolCategory === "all"
      ? aiInternalTools
      : aiInternalTools.filter((t) => t.category === selectedToolCategory);

  const activeModel =
    aiCandidateModels.find((m) => m.id === activeModelId) ||
    aiCandidateModels[0];

  return (
    <div className="page-transition-wrap" style={{ paddingTop: "36px" }}>
      {/* 1. What is asterisk* AI */}
      <section className="section-end-double">
        <div className="brand-story-title-row">
          <h2>
            What is asterisk<span className="ast-star">*</span> AI
          </h2>
          <span className="brand-story-title-sub">
            커뮤니티 전용 지능형 어시스턴트 · Jev 라우터 &amp; 자체 도구 생태계
          </span>
        </div>

        <div className="brand-chapters-container">
          <article className="brand-chapter-block">
            <div className="brand-chapter-meta">
              <span>개요 및 인터페이스</span>
              <span className="brand-chapter-submeta">cnsh.space 연동</span>
            </div>

            <div className="brand-chapter-content">
              <h3>
                {renderWithCenteredStar(
                  "학교 생활 데이터와 커뮤니티 맥락을 스스로 이해하는 맞춤형 AI, asterisk* AI"
                )}
              </h3>
              <div className="brand-prose-wrap">
                <p>
                  <strong>
                    asterisk<span className="ast-star">*</span> AI
                  </strong>
                  는 충남과학고등학교 재학생 전용 커뮤니티(
                  <strong>cnsh.space</strong>)에 탑재된 맞춤형 인공지능입니다.
                  단순한 범용 대화 챗봇과 달리, 질문이 들어왔을 때 백엔드의 경량
                  의사결정 엔진 <strong>Jev(jev-1.14.0)</strong>가 질문의
                  성격을 실시간 분석하여 최적의 언어 모델을 선택하고,
                  학교생활과 커뮤니티에 특화된 <strong>자체 도구</strong>를
                  동적으로 실행하여 정확한 사실에 기반해 답변합니다.
                </p>
              </div>

              {/* 듀얼 인터페이스 카드 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "14px",
                  marginTop: "8px",
                }}
              >
                <div className="module-card">
                  <div>
                    <span className="eyebrow">INTERFACE 01</span>
                    <div className="module-card-title" style={{ marginTop: "4px" }}>
                      댓글 @asterisk 멘션 호출
                    </div>
                  </div>
                  <p className="module-card-desc">
                    게시글 본문이나 대댓글에서 <code>@asterisk</code>를 멘션하면
                    해당 글의 본문, 이전 댓글 맥락, 첨부 이미지(최대 5장)를
                    자동으로 파악해 인라인 대댓글로 답변을 남깁니다.
                  </p>
                  <div className="module-card-source">
                    대화체 줄글 답변 · 20초 쿨다운 · 원클릭 재생성
                  </div>
                </div>

                <div className="module-card">
                  <div>
                    <span className="eyebrow">INTERFACE 02</span>
                    <div className="module-card-title" style={{ marginTop: "4px" }}>
                      cnsh.space 1:1 전용 대화
                    </div>
                  </div>
                  <p className="module-card-desc">
                    특정 게시글을 질문 대상으로 핀(Pin) 고정하거나, 클립보드(Ctrl+V)로
                    이미지를 바로 붙여넣어 첨부할 수 있습니다. 개인 활동 기록 및
                    빠른 질문 칩(급식, 시간표, 과제 등)을 제공합니다.
                  </p>
                  <div className="module-card-source">
                    UID별 세션 암호화 격리 · 게시글 포커스 지원
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 2. Jev 모델 선택 (지능형 모델 라우터) */}
      <section className="section-end-double">
        <div className="brand-section-head">
          <div>
            <h2>Jev Decision Engine (모델 선택)</h2>
            <p>
              단일 모델 고정 대신 100~200ms 만에 최적의 모델과 도구를 동시 판정
            </p>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-telemetry)",
            }}
          >
            Engine: jev-1.14.0
          </span>
        </div>

        <div className="brand-prose-wrap" style={{ marginBottom: "24px" }}>
          <p>
            일반적인 LLM 서비스는 모든 질문을 하나의 거대 모델로 일괄 처리하지만,
            asterisk AI는 답변 생성 직전에 가벼운 의사결정 모델인{" "}
            <strong>Jev</strong>를 먼저 실행합니다. 질문 맥락을 기반으로 모델
            선택(<code>choice</code>)과 도구 필요 확률(<code>noul</code>)을 단일
            요청으로 평가하여, 지연 시간과 비용을 줄이고 작업별 강점을
            극대화합니다.
          </p>
        </div>

        {/* 인터랙티브 모델 탐색기 */}
        <div className="ai-model-explorer-grid">
          {/* 좌측 모델 탭 */}
          <div className="ai-model-tabs-col">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--color-telemetry)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              CANDIDATE MODELS
            </div>
            <div className="ai-model-list-stack">
              {aiCandidateModels.map((m) => {
                const isSelected = m.id === activeModel.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`ai-model-selector-btn ${
                      isSelected ? "active" : ""
                    }`}
                    onClick={() => setActiveModelId(m.id)}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span className="ai-model-name-text">{m.name}</span>
                      <span className="ai-model-provider-text">
                        {m.provider}
                      </span>
                    </div>
                    {m.badge && (
                      <span
                        className={`ast-badge ${
                          isSelected ? "badge-popular" : "badge-pinned"
                        }`}
                        style={{ height: "20px", fontSize: "10px" }}
                      >
                        {m.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 우측 활성 모델 상세 카드 */}
          <div className="ai-model-detail-card">
            <div className="ai-model-detail-header">
              <div>
                <span className="eyebrow">{activeModel.provider}</span>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 600, marginTop: "4px" }}>
                  {activeModel.name}
                </h3>
              </div>
              {activeModel.badge && (
                <span className="ast-badge-solid" style={{ height: "22px" }}>
                  {activeModel.badge}
                </span>
              )}
            </div>

            <div className="ai-model-role-box">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  opacity: 0.7,
                }}
              >
                JEV SELECTION ROLE
              </span>
              <p style={{ fontSize: "13.5px", fontWeight: 500, marginTop: "4px" }}>
                {activeModel.role}
              </p>
            </div>

            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--color-graphite)" }}>
              {activeModel.description}
            </p>

            <div style={{ borderTop: "1px solid var(--color-silver)", paddingTop: "14px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                KEY CHARACTERISTICS
              </div>
              <ul className="license-clause-list">
                {activeModel.features.map((feat, i) => (
                  <li key={i}>
                    <span>·</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 6단계 파이프라인 */}
        <div style={{ marginTop: "36px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--color-black)",
              marginBottom: "12px",
            }}
          >
            END-TO-END PIPELINE (호출부터 답변 생성까지)
          </div>
          <div className="ai-pipeline-grid">
            {aiPipelineSteps.map((step) => (
              <div key={step.step} className="module-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {step.step}
                  </span>
                  <span className="eyebrow">STAGE</span>
                </div>
                <div className="module-card-title">{step.title}</div>
                <p className="module-card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 자체 도구 이용 (Internal Tools) */}
      <section className="section-end-double" style={{ marginBottom: 0 }}>
        <div className="brand-section-head">
          <div>
            <h2>Proprietary Internal Tools (자체 도구 생태계)</h2>
            <p>
              충남과학고 학사 및 커뮤니티 데이터에 특화된 10종의 맞춤형 내부 도구
            </p>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button
              type="button"
              className={`board-filter-btn ${
                selectedToolCategory === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedToolCategory("all")}
            >
              전체 ({aiInternalTools.length})
            </button>
            <button
              type="button"
              className={`board-filter-btn ${
                selectedToolCategory === "academic" ? "active" : ""
              }`}
              onClick={() => setSelectedToolCategory("academic")}
            >
              학사 · 일과 (4)
            </button>
            <button
              type="button"
              className={`board-filter-btn ${
                selectedToolCategory === "community" ? "active" : ""
              }`}
              onClick={() => setSelectedToolCategory("community")}
            >
              커뮤니티 · 아카이브 (5)
            </button>
            <button
              type="button"
              className={`board-filter-btn ${
                selectedToolCategory === "multimodal" ? "active" : ""
              }`}
              onClick={() => setSelectedToolCategory("multimodal")}
            >
              시각 분석 (1)
            </button>
          </div>
        </div>

        {/* 2가지 핵심 설계 원칙 하이라이트 */}
        <div className="ai-rules-banner-grid">
          <div className="module-card">
            <span className="eyebrow">CORE RULE 01</span>
            <div className="module-card-title">
              시간 기준점 자동 동기화 (Time Binding)
            </div>
            <p className="module-card-desc">
              급식(<code>school_meal</code>), 시간표(<code>school_timetable</code>),
              클래스룸(<code>google_classroom</code>) 도구가 활성화되면, 현재
              한국 시각(KST)을 제공하는 <code>current_time</code> 도구가 무조건 함께
              강제 실행되어 날짜 오판과 환각을 방지합니다.
            </p>
          </div>
          <div className="module-card">
            <span className="eyebrow">CORE RULE 02</span>
            <div className="module-card-title">
              커뮤니티 원문 각주 자동 연결 (Auto Footnotes)
            </div>
            <p className="module-card-desc">
              답변 생성 후 사후 처리 파이프라인에서 커뮤니티 게시글 제목을 자동
              감지하여 <code>[글 제목](/post/7자리코드)</code> 링크와 각주(
              <code>[^1]</code>)를 본문에 자동으로 부착해 원문 열람을 돕습니다.
            </p>
          </div>
        </div>

        {/* 도구 카드 그리드 */}
        <div className="ai-tools-grid">
          {filteredTools.map((tool: AiToolSpec) => (
            <article key={tool.id} className="ai-tool-card">
              <div className="ai-tool-card-head">
                <div>
                  <span className="eyebrow">{tool.categoryLabel}</span>
                  <h3 className="ai-tool-name">{tool.name}</h3>
                </div>
                <code className="ai-tool-id-tag">{tool.id}</code>
              </div>

              <div className="ai-tool-summary-row">{tool.summary}</div>

              <p className="ai-tool-desc">{tool.description}</p>

              <div className="ai-tool-trigger-box">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    opacity: 0.7,
                  }}
                >
                  트리거 기준
                </span>
                <p style={{ fontSize: "11.5px", color: "var(--color-graphite)", marginTop: "2px" }}>
                  {tool.trigger}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AsteriskAiTab;

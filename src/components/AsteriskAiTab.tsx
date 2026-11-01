import React, { useState } from "react";
import {
  aiPipelineSteps,
  aiCandidateModels,
  aiInternalTools,
} from "../data/asteriskAiData";

interface AsteriskAiTabProps {
  renderWithCenteredStar: (text: string) => React.ReactNode;
}

export const AsteriskAiTab: React.FC<AsteriskAiTabProps> = ({
  renderWithCenteredStar,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "academic" | "community" | "multimodal"
  >("all");

  const filteredTools =
    selectedCategory === "all"
      ? aiInternalTools
      : aiInternalTools.filter((t) => t.category === selectedCategory);

  return (
    <div className="page-transition-wrap" style={{ paddingTop: "36px" }}>
      {/* 1. What is asterisk* AI */}
      <section className="section-end-double">
        <div className="brand-story-title-row">
          <h2>
            What is asterisk<span className="ast-star">*</span> AI
          </h2>
        </div>

        <div className="brand-chapters-container">
          <article className="brand-chapter-block">
            <div className="brand-chapter-meta">
              <span>개요 및 호출 방식</span>
              <span className="brand-chapter-submeta">cnsh.space</span>
            </div>

            <div className="brand-chapter-content">
              <h3>
                {renderWithCenteredStar(
                  "커뮤니티와 학교 생활 데이터를 연동하는 맞춤형 인공지능, asterisk* AI"
                )}
              </h3>
              <div className="brand-prose-wrap">
                <p>
                  <strong>
                    asterisk<span className="ast-star">*</span> AI
                  </strong>
                  는 재학생 커뮤니티(cnsh.space)에서 동작하는 어시스턴트입니다.
                  질문이 들어오면 경량 의사결정 엔진 <strong>Jev</strong>가
                  질문 맥락에 맞는 언어 모델을 분기하고, 급식·시간표·과제 등
                  학내 자체 도구를 실시간 호출하여 답변합니다.
                </p>
              </div>

              <div className="service-features-clean">
                <div className="service-feature-item">
                  <div className="service-feature-name">
                    댓글 @asterisk 멘션
                  </div>
                  <p className="service-feature-desc">
                    게시글 본문이나 대댓글에서 @asterisk를 호출하면 해당 글의 본문,
                    댓글 흐름, 첨부 이미지를 참조해 인라인 대댓글로 답변합니다.
                  </p>
                </div>
                <div className="service-feature-item">
                  <div className="service-feature-name">
                    1:1 대화 및 게시글 지정
                  </div>
                  <p className="service-feature-desc">
                    전용 채팅창에서 특정 게시글을 지정해 분석을 요청하거나,
                    클립보드(Ctrl+V)로 이미지를 직접 첨부해 질문할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 2. Jev 모델 선택 */}
      <section className="section-end-double">
        <div className="brand-section-head">
          <h2>Jev 모델 선택</h2>
        </div>

        <div className="matrix-table-wrap" style={{ marginBottom: "28px" }}>
          <table className="matrix-table">
            <thead>
              <tr>
                <th>모델</th>
                <th>제공사</th>
                <th>주요 역할</th>
                <th>선택 기준</th>
              </tr>
            </thead>
            <tbody>
              {aiCandidateModels.map((m) => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.name}</strong>
                    {m.badge && (
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-telemetry)",
                          marginTop: "2px",
                        }}
                      >
                        {m.badge}
                      </div>
                    )}
                  </td>
                  <td style={{ fontFamily: "var(--font-mono)" }}>
                    {m.provider}
                  </td>
                  <td>{m.role}</td>
                  <td>{m.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="brand-chapters-container">
          <article className="brand-chapter-block with-subtle-sep">
            <div className="brand-chapter-meta">
              <span>처리 파이프라인</span>
              <span className="brand-chapter-submeta">6 Stages</span>
            </div>

            <div className="brand-chapter-content">
              <h3>질문 분석부터 답변 생성까지의 처리 흐름</h3>
              <div className="service-features-clean">
                {aiPipelineSteps.map((step) => (
                  <div key={step.step} className="service-feature-item">
                    <div className="service-feature-name">
                      {step.step} · {step.title}
                    </div>
                    <p className="service-feature-desc">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. 자체 도구 생태계 */}
      <section className="section-end-double" style={{ marginBottom: 0 }}>
        <div className="brand-section-head">
          <h2>자체 도구 생태계</h2>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button
              type="button"
              className={`board-filter-btn ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              전체
            </button>
            <button
              type="button"
              className={`board-filter-btn ${
                selectedCategory === "academic" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("academic")}
            >
              학사 · 일과
            </button>
            <button
              type="button"
              className={`board-filter-btn ${
                selectedCategory === "community" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("community")}
            >
              커뮤니티
            </button>
            <button
              type="button"
              className={`board-filter-btn ${
                selectedCategory === "multimodal" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("multimodal")}
            >
              시각 분석
            </button>
          </div>
        </div>

        <div className="matrix-table-wrap">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>도구명</th>
                <th>분류</th>
                <th>기능 설명</th>
                <th>트리거 조건</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((tool) => (
                <tr key={tool.id}>
                  <td>
                    <strong>{tool.name}</strong>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--color-telemetry)",
                        marginTop: "2px",
                      }}
                    >
                      {tool.id}
                    </div>
                  </td>
                  <td style={{ fontFamily: "var(--font-mono)" }}>
                    {tool.categoryLabel}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                      {tool.summary}
                    </div>
                    <div
                      style={{
                        fontSize: "12.5px",
                        color: "var(--color-graphite)",
                        lineHeight: 1.55,
                      }}
                    >
                      {tool.description}
                    </div>
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      color: "var(--color-graphite)",
                      lineHeight: 1.5,
                    }}
                  >
                    {tool.trigger}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AsteriskAiTab;

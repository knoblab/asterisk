import React, { useState, useEffect } from "react";
import {
  monochromeTokens,
  servicesData,
  brandChapters,
  licenseSpecs,
  fontLicensesList,
  creditsList,
  type MonochromeToken,
} from "./data/ecosystemData";

type ActiveTab = "overview" | "design" | "license" | "credits";

/**
 * 텍스트 내의 '*' 기호를 수직 정중앙 정렬된 .ast-star 스팬으로 변환
 */
const renderWithCenteredStar = (text: string): React.ReactNode => {
  if (!text.includes("*")) return text;
  const parts = text.split("*");
  return parts.map((part, idx) => (
    <React.Fragment key={idx}>
      {part}
      {idx < parts.length - 1 && <span className="ast-star">*</span>}
    </React.Fragment>
  ));
};

const CopyIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <rect width="14" height="14" x="8" y="8" rx="0" ry="0" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ExternalArrowIcon: React.FC<{ size?: number }> = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const MenuIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const CloseIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BrandHeroFullscreen: React.FC = () => (
  <section className="brand-hero-fullscreen">
    <div className="brand-hero-main-row">
      <div className="brand-hero-left">
        <h1>
          The Answer to
          <br />
          Campus Life,
          <br />
          and Everything.
        </h1>
      </div>
      <div className="brand-hero-right">
        <div className="brand-hero-wordmark">
          <div>aste</div>
          <div className="brand-hero-wordmark-bottom">
            <span>risk</span>
            <span className="brand-hero-asterisk">*</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeColor, setActiveColor] = useState<MonochromeToken>(
    monochromeTokens[0]
  );
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const [demoCategory, setDemoCategory] = useState<string>("전체");
  const [demoSkyToggle, setDemoSkyToggle] = useState<boolean>(true);
  const [demoNotifToggle, setDemoNotifToggle] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkTheme]);

  const switchView = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyText = (val: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(val).catch(() => {});
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = val;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch {
        // ignore
      }
      document.body.removeChild(textArea);
    }
    setCopiedHex(val);
    window.setTimeout(() => {
      setCopiedHex((prev) => (prev === val ? null : prev));
    }, 2000);
  };

  const resolvedHex = isDarkTheme ? activeColor.darkHex : activeColor.hex;
  const resolvedContrast = isDarkTheme
    ? activeColor.darkContrastText
    : activeColor.contrastText;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {copiedHex && (
        <div className="brand-toast" role="status" aria-live="polite">
          <div
            className="brand-toast-swatch"
            style={{
              background: copiedHex.startsWith("#") ? copiedHex : "#000000",
            }}
          />
          <span>
            COPIED: <strong>{copiedHex}</strong>
          </span>
        </div>
      )}

      {/* Header */}
      <header>
        <div className="head head-desktop">
          <button
            type="button"
            className="brand asterisk-brand"
            onClick={() => switchView("overview")}
            aria-label="asterisk* 홈으로 이동"
          >
            <div className="asterisk-wordmark">
              <div>aste</div>
              <div className="asterisk-wordmark-bottom">
                <span>risk</span>
                <span className="asterisk-wordmark-star">*</span>
              </div>
            </div>
          </button>

          <nav className="desktop-nav" aria-label="주요 메뉴">
            <button
              type="button"
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => switchView("overview")}
            >
              소개
            </button>
            <button
              type="button"
              className={activeTab === "design" ? "active" : ""}
              onClick={() => switchView("design")}
            >
              디자인 시스템
            </button>
            <button
              type="button"
              className={activeTab === "license" ? "active" : ""}
              onClick={() => switchView("license")}
            >
              라이선스
            </button>
            <button
              type="button"
              className={activeTab === "credits" ? "active" : ""}
              onClick={() => switchView("credits")}
            >
              크레딧
            </button>
          </nav>

          <div className="nav-controls-right">
            <a
              href="https://cnsh.life"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-ext-pill"
            >
              <span>cnsh.life</span>
              <ExternalArrowIcon size={11} />
            </a>
            <a
              href="https://asterisk-community.knoblab.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-ext-pill"
            >
              <span>community</span>
              <ExternalArrowIcon size={11} />
            </a>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="head head-mobile">
          <div className="head-mobile-left" />
          <div className="head-mobile-center">
            <button
              type="button"
              className="brand asterisk-brand-mobile"
              onClick={() => switchView("overview")}
              aria-label="asterisk* 홈으로 이동"
            >
              <span className="asterisk-wordmark-inline">
                asterisk<span className="asterisk-wordmark-star">*</span>
              </span>
            </button>
          </div>
          <div className="head-mobile-right">
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <MenuIcon size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? "" : "hidden"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="drawer-panel">
          <div>
            <div className="drawer-head">
              <div className="drawer-brand-title">
                <span>
                  asterisk<span className="ast-star">*</span>
                </span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="메뉴 닫기"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <nav className="drawer-nav">
              <button
                type="button"
                className={`drawer-nav-item ${
                  activeTab === "overview" ? "active" : ""
                }`}
                onClick={() => switchView("overview")}
              >
                <span className="drawer-label">소개</span>
              </button>
              <button
                type="button"
                className={`drawer-nav-item ${
                  activeTab === "design" ? "active" : ""
                }`}
                onClick={() => switchView("design")}
              >
                <span className="drawer-label">디자인 시스템</span>
              </button>
              <button
                type="button"
                className={`drawer-nav-item ${
                  activeTab === "license" ? "active" : ""
                }`}
                onClick={() => switchView("license")}
              >
                <span className="drawer-label">라이선스</span>
              </button>
              <button
                type="button"
                className={`drawer-nav-item ${
                  activeTab === "credits" ? "active" : ""
                }`}
                onClick={() => switchView("credits")}
              >
                <span className="drawer-label">크레딧</span>
              </button>
            </nav>

            <div className="drawer-ext-links" style={{ marginTop: "20px" }}>
              <a
                href="https://cnsh.life"
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-ext-item"
              >
                <span>cnsh.life</span>
                <ExternalArrowIcon size={12} />
              </a>
              <a
                href="https://asterisk-community.knoblab.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-ext-item"
              >
                <span>asterisk community</span>
                <ExternalArrowIcon size={12} />
              </a>
            </div>
          </div>

          <div className="drawer-footer">
            <span>
              asterisk<span className="ast-star">*</span>
            </span>
            <span>CNSH · Knoblab</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <div className="brand-view-wrap">
          {/* ==============================================================
              VIEW 1: 소개 (WHAT IS ASTERISK* -> STORY -> CORE SERVICES)
              ============================================================== */}
          {activeTab === "overview" && (
            <div className="page-transition-wrap">
              <BrandHeroFullscreen />

              {/* 1. What is asterisk* */}
              <section className="section-end-double">
                <div className="brand-story-title-row">
                  <h2>
                    What is asterisk<span className="ast-star">*</span>
                  </h2>
                </div>

                <div className="brand-chapters-container">
                  <article className="brand-chapter-block">
                    <div className="brand-chapter-meta">
                      <span>충남과학고등학교 웹 서비스</span>
                      <span className="brand-chapter-submeta">
                        cnsh.life · asterisk community
                      </span>
                    </div>

                    <div className="brand-chapter-content">
                      <h3>
                        학교생활 포털과 재학생 커뮤니티를 아우르는 프로젝트, asterisk
                        <span className="ast-star">*</span>
                      </h3>
                      <div className="brand-prose-wrap">
                        <p>
                          <strong>
                            asterisk<span className="ast-star">*</span>
                          </strong>
                          는 충남과학고등학교(CNSH) 학생들을 위한 웹 서비스
                          브랜드입니다. 시간표·급식·방과후·실시간 일과를 확인하는 포털{" "}
                          <strong>cnsh.life</strong>와 재학생 전용 게시판{" "}
                          <strong>asterisk community</strong>를 운영하며, 두 서비스에
                          동일한 디자인 시스템을 적용하고 있습니다.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </section>

              {/* 2. The Story of asterisk* */}
              <section className="section-end-double">
                <div className="brand-story-title-row">
                  <h2>
                    The Story of asterisk<span className="ast-star">*</span>
                  </h2>
                </div>

                <div className="brand-chapters-container">
                  {brandChapters.map((ch) => (
                    <article key={ch.num} className="brand-chapter-block">
                      <div className="brand-chapter-meta">
                        <span>{ch.num}</span>
                        {ch.quoteAuthor && (
                          <span className="brand-chapter-submeta">
                            {ch.quoteAuthor}
                          </span>
                        )}
                      </div>
                      <div className="brand-chapter-content">
                        <h3>{renderWithCenteredStar(ch.title)}</h3>
                        {ch.quote && (
                          <div className="brand-quote-inline">{ch.quote}</div>
                        )}
                        <div className="brand-prose-wrap">
                          {ch.paragraphs.map((p, idx) => (
                            <p key={idx}>{renderWithCenteredStar(p)}</p>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* 3. Core Services */}
              <section className="section-end-double" style={{ marginBottom: 0 }}>
                <div className="brand-story-title-row">
                  <h2>Core Services</h2>
                </div>

                <div className="brand-chapters-container">
                  {servicesData.map((srv) => (
                    <article
                      key={srv.id}
                      className="brand-chapter-block with-subtle-sep"
                    >
                      <div className="brand-chapter-meta">
                        <span>{srv.tier}</span>
                        <span className="brand-chapter-submeta">
                          {srv.domain}
                        </span>
                      </div>

                      <div className="brand-chapter-content">
                        <h3>
                          {srv.title} — {srv.tagline}
                        </h3>
                        <p
                          style={{
                            fontSize: "14.5px",
                            lineHeight: 1.65,
                            color: "var(--color-graphite)",
                          }}
                        >
                          {srv.description}
                        </p>

                        <div className="service-features-clean">
                          {srv.modules.map((mod) => (
                            <div key={mod.name} className="service-feature-item">
                              <div className="service-feature-name">
                                {mod.name}
                              </div>
                              <p className="service-feature-desc">
                                {mod.description}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="service-editorial-actions">
                          <a
                            href={srv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary-action"
                          >
                            <span>{srv.title} 바로가기</span>
                            <ExternalArrowIcon size={13} />
                          </a>
                          <a
                            href={srv.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary-action"
                          >
                            <span>GitHub</span>
                            <ExternalArrowIcon size={12} />
                          </a>
                          {srv.id === "community" && (
                            <a
                              href="https://status.knoblab.xyz/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="status-mini-pill"
                              title="asterisk community 서버 상태 확인"
                            >
                              <span>서버 상태</span>
                              <ExternalArrowIcon size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ==============================================================
              VIEW 2: 디자인 시스템 (DESIGN SYSTEM)
              ============================================================== */}
          {activeTab === "design" && (
            <div
              className="page-transition-wrap"
              style={{ paddingTop: "36px" }}
            >
              {/* Color & Theme System */}
              <section className="section-end-double">
                <div className="brand-section-head">
                  <h2>Color &amp; Theme System</h2>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <button
                      type="button"
                      className={`board-filter-btn ${
                        !isDarkTheme ? "active" : ""
                      }`}
                      onClick={() => setIsDarkTheme(false)}
                    >
                      LIGHT (:root)
                    </button>
                    <button
                      type="button"
                      className={`board-filter-btn ${
                        isDarkTheme ? "active" : ""
                      }`}
                      onClick={() => setIsDarkTheme(true)}
                    >
                      DARK ([data-theme=&apos;dark&apos;])
                    </button>
                  </div>
                </div>

                <div
                  className="brand-colors-grid"
                  style={{ marginBottom: "20px" }}
                >
                  <div
                    className="brand-color-main-card"
                    style={{
                      backgroundColor: resolvedHex,
                      color: resolvedContrast,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          opacity: 0.8,
                          marginBottom: "24px",
                        }}
                      >
                        <span>{activeColor.cssVar}</span>
                        <span>{isDarkTheme ? "DARK MODE" : "LIGHT MODE"}</span>
                      </div>
                      <h3>{activeColor.name}</h3>
                      <p className="brand-color-korean-name">
                        {activeColor.koreanName}
                      </p>
                      <p className="brand-color-desc">{activeColor.role}</p>
                    </div>

                    <div className="brand-color-bottom-bar">
                      <div>
                        <span
                          style={{
                            fontSize: "11px",
                            opacity: 0.7,
                            display: "block",
                          }}
                        >
                          {isDarkTheme ? "DARK HEX" : "LIGHT HEX"} (
                          {isDarkTheme
                            ? `Light: ${activeColor.hex}`
                            : `Dark: ${activeColor.darkHex}`}
                          )
                        </span>
                        <span style={{ fontSize: "1.4rem" }}>{resolvedHex}</span>
                      </div>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          type="button"
                          className="brand-copy-action-btn"
                          onClick={(e) =>
                            handleCopyText(`var(${activeColor.cssVar})`, e)
                          }
                        >
                          <span>VAR</span>
                        </button>
                        <button
                          type="button"
                          className="brand-copy-action-btn"
                          onClick={(e) => handleCopyText(resolvedHex, e)}
                        >
                          {copiedHex === resolvedHex ? (
                            <CheckIcon size={14} />
                          ) : (
                            <CopyIcon size={14} />
                          )}
                          <span>HEX</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="brand-color-list-card">
                    <div>
                      <div className="brand-color-list-title">
                        MONOCHROME PALETTE (7 STEPS)
                      </div>
                      <div
                        className="brand-color-items-stack"
                        style={{ marginTop: "12px" }}
                      >
                        {monochromeTokens.map((token, idx) => {
                          const isSelected =
                            activeColor.cssVar === token.cssVar;
                          const itemHex = isDarkTheme
                            ? token.darkHex
                            : token.hex;
                          return (
                            <div
                              key={token.cssVar}
                              className={`brand-color-row-item ${
                                isSelected ? "active" : ""
                              }`}
                              onClick={() => setActiveColor(token)}
                            >
                              <div className="brand-color-row-left">
                                <span
                                  style={{
                                    opacity: 0.6,
                                    width: "18px",
                                    fontSize: "11px",
                                  }}
                                >
                                  0{idx + 1}
                                </span>
                                <div
                                  className="brand-chip-sq"
                                  style={{ backgroundColor: itemHex }}
                                />
                                <span style={{ fontWeight: 600 }}>
                                  {token.cssVar}
                                </span>
                              </div>
                              <div className="brand-color-row-right">
                                <span>{itemHex}</span>
                                <button
                                  type="button"
                                  className="brand-icon-btn"
                                  title="HEX 복사"
                                  onClick={(e) => handleCopyText(itemHex, e)}
                                >
                                  {copiedHex === itemHex ? (
                                    <CheckIcon size={14} />
                                  ) : (
                                    <CopyIcon size={14} />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="brand-swatches-grid">
                  {monochromeTokens.map((token) => {
                    const cellHex = isDarkTheme ? token.darkHex : token.hex;
                    const cellText = isDarkTheme
                      ? token.darkContrastText
                      : token.contrastText;
                    return (
                      <div
                        key={token.cssVar}
                        className="brand-swatch-cell"
                        style={{
                          backgroundColor: cellHex,
                          color: cellText,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setActiveColor(token);
                          handleCopyText(cellHex);
                        }}
                      >
                        <div className="brand-swatch-cell-hex">{cellHex}</div>
                        <div className="brand-swatch-cell-name">
                          <strong>{token.name}</strong>
                          <div style={{ opacity: 0.75, fontSize: "9.5px" }}>
                            {token.koreanName}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Typography & Wordmark */}
              <section className="section-end-double">
                <div className="brand-section-head">
                  <h2>Typography &amp; Wordmark</h2>
                </div>

                <div className="brand-typo-section">
                  <div className="brand-typo-row">
                    <div className="brand-typo-label">
                      <div
                        style={{
                          fontWeight: 700,
                          color: "var(--color-black)",
                          marginBottom: "4px",
                        }}
                      >
                        워드마크 규격
                      </div>
                      <div>.asterisk-wordmark</div>
                      <div>.asterisk-wordmark-inline</div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      <div className="module-card">
                        <span className="eyebrow">데스크톱 2줄 워드마크</span>
                        <div
                          className="asterisk-wordmark"
                          style={{ fontSize: "42px", margin: "12px 0" }}
                        >
                          <div>aste</div>
                          <div className="asterisk-wordmark-bottom">
                            <span>risk</span>
                            <span className="asterisk-wordmark-star">*</span>
                          </div>
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "var(--color-graphite)",
                          }}
                        >
                          weight: 300 · star: 0.85em (수직 중앙) · line-height:
                          0.85
                        </div>
                      </div>

                      <div className="module-card">
                        <span className="eyebrow">모바일 1줄 워드마크</span>
                        <div style={{ margin: "18px 0" }}>
                          <span
                            className="asterisk-wordmark-inline"
                            style={{ fontSize: "36px" }}
                          >
                            asterisk
                            <span className="asterisk-wordmark-star">*</span>
                          </span>
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "var(--color-graphite)",
                          }}
                        >
                          weight: 300 · star: 0.85em (수직 중앙) · line-height:
                          1.0
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="brand-typo-row">
                    <div className="brand-typo-label">
                      <div
                        style={{
                          fontWeight: 700,
                          color: "var(--color-black)",
                          marginBottom: "4px",
                        }}
                      >
                        서체 및 굵기
                      </div>
                      <div>Asta Sans · Pretendard</div>
                    </div>
                    <div className="brand-typo-body">
                      <div className="brand-weights-demo">
                        <div
                          style={{
                            fontWeight: 300,
                            fontSize: "1.5rem",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          300 Light — 페이지 제목 및 디스플레이
                        </div>
                        <div style={{ fontWeight: 400 }}>
                          400 Regular — 본문 및 게시글 텍스트 (14.5px / 1.75)
                        </div>
                        <div style={{ fontWeight: 600 }}>
                          600 SemiBold — 카드 제목 및 주요 라벨 (asterisk
                          <span className="ast-star">*</span>)
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          700 Bold Tabular — 08:40 ~ 09:30 · 25:00 · #0042
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Surface Modes */}
              <section className="section-end-double">
                <div className="brand-section-head">
                  <h2>Surface Modes</h2>
                </div>

                <div className="ds-surface-grid" style={{ marginBottom: 0 }}>
                  <div className="ds-surface-card mode-paper">
                    <div>
                      <span className="eyebrow" style={{ color: "#48484A" }}>
                        DEFAULT LIGHT
                      </span>
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          marginTop: "6px",
                        }}
                      >
                        Paper Light
                      </h3>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11.5px",
                        color: "#48484A",
                      }}
                    >
                      bg: #F7F6F2 (--color-paper)
                      <br />
                      border: 1px solid #000000
                    </div>
                  </div>

                  <div className="ds-surface-card mode-dark">
                    <div>
                      <span className="eyebrow" style={{ color: "#A0A19B" }}>
                        DARK / NOW CARD
                      </span>
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          marginTop: "6px",
                        }}
                      >
                        Carbon Dark
                      </h3>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11.5px",
                        color: "#A0A19B",
                      }}
                    >
                      bg: #000000 · surface: #18191C
                      <br />
                      ink: #F7F6F2 ([data-theme=&apos;dark&apos;])
                    </div>
                  </div>

                  <div className="ds-surface-card mode-glass">
                    <div className="ds-glass-inner">
                      <div>
                        <span className="eyebrow" style={{ color: "#111111" }}>
                          SKY BACKGROUND
                        </span>
                        <h3
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: 600,
                            marginTop: "6px",
                          }}
                        >
                          Translucent Glass
                        </h3>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11.5px",
                          color: "#1C1C1E",
                        }}
                      >
                        rgba(242, 246, 247, 0.72)
                        <br />
                        backdrop-filter: blur(14px)
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* UI Components */}
              <section className="section-end-double" style={{ marginBottom: 0 }}>
                <div className="brand-section-head">
                  <h2>UI Components</h2>
                </div>

                <div className="ds-primitives-grid" style={{ marginBottom: "24px" }}>
                  <div className="ds-primitive-box">
                    <div className="ds-primitive-head">
                      <span>BUTTONS &amp; AUTH</span>
                      <span>2px radius</span>
                    </div>
                    <div className="ds-primitive-stage">
                      <button type="button" className="btn-primary-action">
                        Primary (.primary)
                      </button>
                      <button type="button" className="btn-secondary-action">
                        Secondary (.secondary)
                      </button>
                      <button type="button" className="btn-knoblab-sso">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 400 400"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M 200 100 L 200 40 A 160 160 0 0 0 40 200 L 100 200 A 100 100 0 0 1 200 100 Z" />
                          <path d="M 200 200 L 100 200 A 100 100 0 0 0 200 300 Z" />
                          <rect x="200" y="100" width="100" height="100" />
                          <path d="M 200 300 L 200 360 A 160 160 0 0 0 360 200 L 300 200 A 100 100 0 0 1 200 300 Z" />
                        </svg>
                        <span>Knoblab 통합 ID 로그인</span>
                      </button>
                    </div>
                  </div>

                  <div className="ds-primitive-box">
                    <div className="ds-primitive-head">
                      <span>BADGES &amp; TAGS</span>
                      <span>22px Height</span>
                    </div>
                    <div className="ds-primitive-stage">
                      <span className="badge-pinned">공지</span>
                      <span className="badge-popular">인기</span>
                      <span className="tag">질문</span>
                      <span className="author-generation-badge">33기</span>
                      <span className="top-class-badge">1학년 1반</span>
                      <span className="market-status-badge">
                        <span className="market-status-dot" />
                        <span>LIVE</span>
                      </span>
                    </div>
                  </div>

                  <div className="ds-primitive-box">
                    <div className="ds-primitive-head">
                      <span>CATEGORY FILTER</span>
                      <span>.board-filter-btn</span>
                    </div>
                    <div className="ds-primitive-stage">
                      {["전체", "질문", "자료", "정보", "공지", "잡담"].map(
                        (cat) => (
                          <button
                            key={cat}
                            type="button"
                            className={`board-filter-btn ${
                              demoCategory === cat ? "active" : ""
                            }`}
                            onClick={() => setDemoCategory(cat)}
                          >
                            {cat}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="ds-primitive-box">
                    <div className="ds-primitive-head">
                      <span>SWITCH &amp; SEARCH</span>
                      <span>.toggle-switch · .board-search-input</span>
                    </div>
                    <div
                      className="ds-primitive-stage"
                      style={{ justifyContent: "space-between", width: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <label
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <span className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={demoSkyToggle}
                              onChange={(e) =>
                                setDemoSkyToggle(e.target.checked)
                              }
                            />
                            <span className="toggle-slider" />
                          </span>
                          <span>하늘 배경</span>
                        </label>

                        <label
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <span className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={demoNotifToggle}
                              onChange={(e) =>
                                setDemoNotifToggle(e.target.checked)
                              }
                            />
                            <span className="toggle-slider" />
                          </span>
                          <span>다크 모드</span>
                        </label>
                      </div>

                      <input
                        type="text"
                        className="board-search-input"
                        placeholder="검색어 입력..."
                      />
                    </div>
                  </div>
                </div>

                <div className="ds-primitives-grid" style={{ marginBottom: 0 }}>
                  <div className="specimen-now-card">
                    <div className="specimen-now-top">
                      <span>
                        <span className="specimen-now-dot" />
                        NOW · 3교시 수업 중
                      </span>
                      <span style={{ fontVariantNumeric: "tabular-nums" }}>
                        64%
                      </span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11.5px",
                          color: "var(--color-telemetry)",
                          marginBottom: "4px",
                        }}
                      >
                        10:40 — 11:30 · 고급물리학
                      </div>
                      <div
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 300,
                          letterSpacing: "-0.04em",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        18분 12초 남음
                      </div>
                    </div>
                    <div>
                      <div className="specimen-progress">
                        <span style={{ width: "64%" }} />
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-silver)",
                          marginTop: "10px",
                        }}
                      >
                        NEXT → <strong>점심시간 (12:20 — 13:20)</strong>
                      </div>
                    </div>
                  </div>

                  <div className="specimen-board-box">
                    <div className="specimen-board-head">
                      <span>NO</span>
                      <span>TITLE</span>
                      <span>AUTHOR</span>
                      <span style={{ textAlign: "right" }}>LIKE</span>
                    </div>
                    <div className="specimen-board-row">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11.5px",
                          color: "var(--color-telemetry)",
                        }}
                      >
                        0042
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          minWidth: 0,
                        }}
                      >
                        <span className="badge-popular">인기</span>
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: 500,
                          }}
                        >
                          @asterisk 오늘 석식 메뉴 알려줘
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span style={{ fontSize: "12px" }}>재학생</span>
                        <span className="author-generation-badge">33기</span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          textAlign: "right",
                        }}
                      >
                        +12
                      </span>
                    </div>
                    <div className="specimen-ai-reply">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                        }}
                      >
                        <span className="badge-pinned">
                          @asterisk<span className="ast-star">*</span> AI
                        </span>
                      </div>
                      <div
                        style={{ color: "var(--color-black)", lineHeight: 1.5 }}
                      >
                        오늘 충남과학고 석식(18:00~18:50)은 수제등심돈까스, 크림스프,
                        배추김치입니다. (892 kcal)
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==============================================================
              VIEW 3: 라이선스 (LICENSE)
              ============================================================== */}
          {activeTab === "license" && (
            <div
              className="page-transition-wrap"
              style={{ paddingTop: "36px" }}
            >
              {/* Governance Matrix Table */}
              <section className="section-end-double">
                <div className="brand-section-head">
                  <h2>저장소 및 라이선스 현황</h2>
                </div>

                <div className="matrix-table-wrap">
                  <table className="matrix-table">
                    <thead>
                      <tr>
                        <th>구성 요소</th>
                        <th>역할 및 범위</th>
                        <th>저장소</th>
                        <th>라이선스</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>cnsh.life</strong>
                        </td>
                        <td>학교생활 포털 (시간표·급식·방과후·타이머)</td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>
                          <a
                            href="https://github.com/kuchipatchi09/everytime"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              textUnderlineOffset: "3px",
                            }}
                          >
                            kuchipatchi09/everytime ↗
                          </a>
                        </td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>
                          <strong>GNU AGPL-3.0</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>asterisk community (FE)</strong>
                        </td>
                        <td>학생 커뮤니티 웹 클라이언트</td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>
                          <a
                            href="https://github.com/knoblab/asterisk-community-frontend"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              textUnderlineOffset: "3px",
                            }}
                          >
                            knoblab/asterisk-community-frontend ↗
                          </a>
                        </td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>
                          <strong>MIT License</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>asterisk community (BE)</strong>
                        </td>
                        <td>학생 인증, DB, 보안 및 @asterisk AI 서버</td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>
                          Knoblab Private
                        </td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>
                          <strong>Proprietary</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            asterisk<span className="ast-star">*</span> Brand &amp;
                            Assets
                          </strong>
                        </td>
                        <td>워드마크, 로고(SVG) 및 브랜드 자산</td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>
                          <a
                            href="https://github.com/knoblab/asterisk"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              textUnderlineOffset: "3px",
                            }}
                          >
                            knoblab/asterisk ↗
                          </a>
                        </td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>
                          <strong>All Rights Reserved</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Software License Specifications */}
              <section className="section-end-double">
                <div className="brand-section-head">
                  <h2>세부 이용 조건</h2>
                </div>

                <div className="brand-chapters-container">
                  {licenseSpecs.map((spec) => (
                    <article
                      key={spec.id}
                      className="brand-chapter-block with-subtle-sep"
                    >
                      <div className="brand-chapter-meta">
                        <span className="service-tier-tag">{spec.spdx}</span>
                        <span
                          className="brand-chapter-submeta"
                          style={{ marginTop: "4px" }}
                        >
                          {spec.repoLabel}
                        </span>
                      </div>

                      <div className="brand-chapter-content">
                        <h3>{renderWithCenteredStar(spec.moduleName)}</h3>
                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: 1.65,
                            color: "var(--color-graphite)",
                          }}
                        >
                          {renderWithCenteredStar(spec.summary)}
                        </p>

                        <div className="license-clauses-grid">
                          <div className="license-clause-box">
                            <div className="license-clause-head">허용 사항</div>
                            <ul className="license-clause-list">
                              {spec.permissions.map((item, i) => (
                                <li key={i}>
                                  <span>·</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="license-clause-box">
                            <div className="license-clause-head">준수 조건</div>
                            <ul className="license-clause-list">
                              {spec.conditions.map((item, i) => (
                                <li key={i}>
                                  <span>·</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="license-clause-box">
                            <div className="license-clause-head">제한 사항</div>
                            <ul className="license-clause-list">
                              {spec.limitations.map((item, i) => (
                                <li key={i}>
                                  <span>·</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Font Licenses */}
              <section className="section-end-double" style={{ marginBottom: 0 }}>
                <div className="brand-section-head">
                  <h2>서체 라이선스</h2>
                </div>

                <div className="service-modules-grid">
                  {fontLicensesList.map((font) => (
                    <div key={font.name} className="module-card">
                      <div className="module-card-title">
                        {font.name} ({font.license})
                      </div>
                      <p className="module-card-desc">
                        {font.role} · {font.copyright}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ==============================================================
              VIEW 4: 크레딧 (CREDITS)
              ============================================================== */}
          {activeTab === "credits" && (
            <div
              className="page-transition-wrap"
              style={{ paddingTop: "36px" }}
            >
              <section className="section-end-double" style={{ marginBottom: 0 }}>
                <div className="brand-section-head">
                  <h2>Credits</h2>
                </div>

                <div className="credits-grid">
                  {creditsList.map((member) => {
                    const isKnoblab = member.id === "knoblab";
                    return (
                      <article
                        key={member.id}
                        className={`credit-profile-card ${
                          isKnoblab ? "is-knoblab" : ""
                        }`}
                      >
                        <div className="credit-card-top">
                          <div className="credit-head-bar">
                            <div className="credit-brand-header">
                              {member.logoPath && (
                                <div className="credit-knoblab-symbol">
                                  <img
                                    src={member.logoPath}
                                    alt={`${member.name} 로고`}
                                  />
                                </div>
                              )}

                              <div className="credit-name-wrap">
                                <h3>{member.name}</h3>
                                <div className="credit-subtitle">
                                  {renderWithCenteredStar(member.subtitle)}
                                </div>
                              </div>
                            </div>

                            <div className="credit-links-inline">
                              <a
                                href={member.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`credit-contact-pill ${
                                  isKnoblab
                                    ? "knoblab-primary-pill"
                                    : "primary-black-pill"
                                }`}
                              >
                                <span>@{member.githubHandle}</span>
                                <ExternalArrowIcon size={11} />
                              </a>

                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="credit-contact-pill"
                                >
                                  <span>{member.email}</span>
                                  <ExternalArrowIcon size={11} />
                                </a>
                              )}
                            </div>
                          </div>

                          <p className="credit-summary-text">
                            {renderWithCenteredStar(member.summary)}
                          </p>
                        </div>

                        <div className="credit-roles-list">
                          {member.roles.map((role) => (
                            <div key={role.title} className="credit-role-row">
                              <span className="credit-role-title">
                                {renderWithCenteredStar(role.title)}
                              </span>
                              <p className="credit-role-desc">
                                {renderWithCenteredStar(role.description)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-copy">
            <b>
              asterisk<span className="ast-star">*</span> — 충남과학고등학교 웹
              서비스
            </b>
            <span>
              © {new Date().getFullYear()} asterisk
              <span className="ast-star">*</span> &amp; Knoblab.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => switchView("overview")}
              style={{
                background: "none",
                border: 0,
                padding: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              소개
            </button>
            <button
              type="button"
              onClick={() => switchView("design")}
              style={{
                background: "none",
                border: 0,
                padding: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              디자인 시스템
            </button>
            <button
              type="button"
              onClick={() => switchView("license")}
              style={{
                background: "none",
                border: 0,
                padding: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              라이선스
            </button>
            <button
              type="button"
              onClick={() => switchView("credits")}
              style={{
                background: "none",
                border: 0,
                padding: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              크레딧
            </button>
            <a
              href="https://status.knoblab.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="status-mini-pill"
              title="asterisk community 서버 상태"
            >
              <span>status</span>
              <ExternalArrowIcon size={10} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

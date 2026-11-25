import React, { useState, useEffect } from "react";
import {
  monochromeTokens,
  servicesData,
  twoTrackStrategyData,
  brandChapters,
  licenseSpecs,
  fontLicensesList,
  creditsList,
  type MonochromeToken,
} from "./data/ecosystemData";
import {
  designTokenCategories,
  designTokensCatalog,
  type DesignTokenCategoryId,
  type DesignTokenItem,
} from "./data/designTokens";
import { AsteriskAiTab } from "./components/AsteriskAiTab";

type ActiveTab = "overview" | "ai" | "design" | "license" | "credits" | "terms" | "privacy";

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

const tabToPath = (tab: ActiveTab): string => {
  return tab === "overview" ? "/" : `/${tab}`;
};

const getTabFromLocation = (): ActiveTab => {
  if (typeof window === "undefined") return "overview";

  // 1. Pathname check (e.g. /ai, /design, /license, /credits, /overview)
  const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");
  if (path === "ai") return "ai";
  if (path === "design") return "design";
  if (path === "license") return "license";
  if (path === "credits") return "credits";
  if (path === "terms") return "terms";
  if (path === "privacy") return "privacy";
  if (path === "overview") return "overview";

  // 2. Query parameter check (e.g. ?ai, ?/ai, ?tab=ai, ?license, etc.)
  if (window.location.search && window.location.search.length > 1) {
    const rawSearch = window.location.search.slice(1).toLowerCase();
    const cleanSearch = rawSearch.startsWith("/")
      ? rawSearch.slice(1)
      : rawSearch;
    const firstParam = cleanSearch.split("&")[0].split("=")[0];

    if (firstParam === "ai") return "ai";
    if (firstParam === "design") return "design";
    if (firstParam === "license") return "license";
    if (firstParam === "credits") return "credits";
    if (firstParam === "terms") return "terms";
    if (firstParam === "privacy") return "privacy";
    if (firstParam === "overview") return "overview";

    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get("tab")?.toLowerCase();
    if (tabParam === "ai") return "ai";
    if (tabParam === "design") return "design";
    if (tabParam === "license") return "license";
    if (tabParam === "credits") return "credits";
    if (tabParam === "terms") return "terms";
    if (tabParam === "privacy") return "privacy";
    if (tabParam === "overview") return "overview";
  }

  // 3. Hash fallback (e.g. #ai, #/ai, #license)
  if (window.location.hash) {
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, "");
    if (hash === "ai") return "ai";
    if (hash === "design") return "design";
    if (hash === "license") return "license";
    if (hash === "credits") return "credits";
    if (hash === "terms") return "terms";
    if (hash === "privacy") return "privacy";
    if (hash === "overview") return "overview";
  }

  return "overview";
};

const renderTokenSwatch = (token: DesignTokenItem, isDarkTheme: boolean): React.ReactNode => {
  if (token.previewType === "color" || token.previewType === "surface") {
    const bg = isDarkTheme
      ? token.previewDarkColor || token.previewColor
      : token.previewColor;
    if (!bg) return null;
    return <span className="ds-token-swatch" style={{ background: bg }} />;
  }
  if (token.previewType === "radius") {
    return (
      <span
        className="ds-token-swatch is-radius"
        style={{ borderRadius: `var(${token.cssVar})` }}
      />
    );
  }
  if (token.previewType === "shadow") {
    return (
      <span
        className="ds-token-swatch is-shadow"
        style={{ boxShadow: `var(${token.cssVar})` }}
      />
    );
  }
  return null;
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() =>
    getTabFromLocation()
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeColor, setActiveColor] = useState<MonochromeToken>(
    monochromeTokens[0]
  );
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [isTokensOpen, setIsTokensOpen] = useState<boolean>(false);
  const [tokenCategory, setTokenCategory] = useState<DesignTokenCategoryId>("all");

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

  // Sync tab with URL navigation and PopState / HashChange
  useEffect(() => {
    const initialTab = getTabFromLocation();
    const cleanPath = tabToPath(initialTab);
    if (window.location.search) {
      window.history.replaceState(
        { tab: initialTab },
        "",
        cleanPath + window.location.hash
      );
    }

    const handlePopState = () => {
      const tab = getTabFromLocation();
      setActiveTab(tab);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  // Update document title per active tab
  useEffect(() => {
    const titles: Record<ActiveTab, string> = {
      overview: "asterisk* — The Answer to Campus Life, and Everything.",
      ai: "asterisk* AI — The Answer to Campus Life, and Everything.",
      design: "디자인 시스템 — asterisk*",
      license: "라이선스 — asterisk*",
      credits: "크레딧 — asterisk*",
      terms: "서비스 이용약관 — asterisk*",
      privacy: "개인정보 처리방침 — asterisk*",
    };
    document.title = titles[activeTab] || titles.overview;
  }, [activeTab]);

  const switchView = (tab: ActiveTab, updateHistory: boolean = true) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (updateHistory) {
      const targetPath = tabToPath(tab);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, "", targetPath);
      }
    }
  };

  const handleCopyText = (val: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(val).catch(() => { });
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
    setCopiedValue(val);
    window.setTimeout(() => {
      setCopiedValue((prev) => (prev === val ? null : prev));
    }, 2000);
  };

  const resolvedHex = isDarkTheme ? activeColor.darkHex : activeColor.hex;
  const resolvedContrast = isDarkTheme
    ? activeColor.darkContrastText
    : activeColor.contrastText;

  const filteredDesignTokens =
    tokenCategory === "all"
      ? designTokensCatalog
      : designTokensCatalog.filter((t) => t.category === tokenCategory);

  const externalBaseUrl =
    typeof window !== "undefined" &&
      !["localhost", "127.0.0.1"].includes(window.location.hostname)
      ? window.location.origin
      : "https://asterisk.knoblab.xyz";

  const cdnTokensUrl =
    "https://cdn.jsdelivr.net/gh/knoblab/asterisk@main/src/design-system/tokens.css";

  const integrationSnippets = [
    {
      id: "tokens-only",
      title: "1. CSS 변수만 안전하게 불러오기 (권장)",
      tag: "ZERO-POLLUTION",
      description:
        "전역 요소 리셋 없이 순수 CSS 커스텀 프로퍼티(:root)만 불러옵니다. Tailwind CSS 또는 기존 스타일시트가 있는 외부 웹(cnsh.life, cnsh.space 등)에 충돌 없이 바로 적용할 수 있습니다.",
      code: `<link rel="stylesheet" href="${externalBaseUrl}/ds/tokens.css" />`,
    },
    {
      id: "full-bundle",
      title: "2. 풀 키트 한 번에 불러오기 (토큰 + 기본 + UI + 서체)",
      tag: "ONE-LINE BUNDLE",
      description:
        "단일 평탄화 번들(/ds/asterisk.css)과 웹폰트(/ds/fonts.css)를 로드하면 버튼, 배지, 필터, 토글, 매트릭스 표 등 디자인 탭 공용 UI 클래스를 즉시 사용할 수 있습니다.",
      code: `<link rel="stylesheet" href="${externalBaseUrl}/ds/fonts.css" />\n<link rel="stylesheet" href="${externalBaseUrl}/ds/asterisk.css" />`,
    },
    {
      id: "css-import-cdn",
      title: "3. CSS @import 및 jsDelivr GitHub CDN",
      tag: "CDN / @IMPORT",
      description:
        "CSS 파일 최상단에서 @import 하거나 GitHub main 브랜치와 동기화된 jsDelivr 글로벌 CDN을 통해 불러올 수 있습니다.",
      code: `@import url("${externalBaseUrl}/ds/tokens.css");\n/* 또는 GitHub CDN */\n@import url("${cdnTokensUrl}");`,
    },
    {
      id: "theme-and-json",
      title: "4. 다크 모드 전환 & JSON 토큰 연동",
      tag: "DARK / AUTO / JSON",
      description:
        "수동 토글(data-theme='dark')과 OS 자동 추종(data-theme='auto')을 모두 지원합니다. JavaScript나 Tailwind 설정에는 /ds/tokens.json을 fetch해 연동하세요.",
      code: `<!-- 수동 다크 모드 / OS 자동 추종 -->\n<html data-theme="dark">\n<html data-theme="auto">\n\n// JSON 토큰 명세 엔드포인트\nfetch("${externalBaseUrl}/ds/tokens.json")`,
    },
  ];

  const toastSwatchBg =
    copiedValue &&
      (copiedValue.startsWith("#") ||
        copiedValue.startsWith("rgb") ||
        copiedValue.startsWith("linear-gradient"))
      ? copiedValue
      : "var(--color-black)";

  const toastLabel =
    copiedValue && copiedValue.length > 64
      ? `${copiedValue.slice(0, 61)}...`
      : copiedValue;

  return (
    <div className="shell">
      {copiedValue && (
        <div className="brand-toast" role="status" aria-live="polite">
          <div
            className="brand-toast-swatch"
            style={{ background: toastSwatchBg }}
          />
          <span>
            COPIED: <strong>{toastLabel}</strong>
          </span>
        </div>
      )}

      {/* Header */}
      <header>
        <div className="head head-desktop">
          <a
            href="/"
            className="brand asterisk-brand"
            onClick={(e) => {
              e.preventDefault();
              switchView("overview");
            }}
            aria-label="asterisk* 홈으로 이동"
          >
            <div className="asterisk-wordmark">
              <div>aste</div>
              <div className="asterisk-wordmark-bottom">
                <span>risk</span>
                <span className="asterisk-wordmark-star">*</span>
              </div>
            </div>
          </a>

          <nav className="desktop-nav" aria-label="주요 메뉴">
            <a
              href="/"
              className={activeTab === "overview" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                switchView("overview");
              }}
            >
              소개
            </a>
            <a
              href="/ai"
              className={activeTab === "ai" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                switchView("ai");
              }}
            >
              AI
            </a>
            <a
              href="/design"
              className={activeTab === "design" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                switchView("design");
              }}
            >
              디자인 시스템
            </a>
            <a
              href="/license"
              className={activeTab === "license" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                switchView("license");
              }}
            >
              라이선스
            </a>
            <a
              href="/credits"
              className={activeTab === "credits" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                switchView("credits");
              }}
            >
              크레딧
            </a>
          </nav>

          <div className="nav-controls-right">
            <a href="https://cnsh.life" className="nav-ext-pill">
              <span>cnsh.life</span>
              <ExternalArrowIcon size={11} />
            </a>
            <a href="https://cnsh.space" className="nav-ext-pill">
              <span>cnsh.space</span>
              <ExternalArrowIcon size={11} />
            </a>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="head head-mobile">
          <div className="head-mobile-left" />
          <div className="head-mobile-center">
            <a
              href="/"
              className="brand asterisk-brand-mobile"
              onClick={(e) => {
                e.preventDefault();
                switchView("overview");
              }}
              aria-label="asterisk* 홈으로 이동"
            >
              <span className="asterisk-wordmark-inline">
                asterisk<span className="asterisk-wordmark-star">*</span>
              </span>
            </a>
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
              <a
                href="/"
                className={`drawer-nav-item ${activeTab === "overview" ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  switchView("overview");
                }}
              >
                <span className="drawer-label">소개</span>
              </a>
              <a
                href="/ai"
                className={`drawer-nav-item ${activeTab === "ai" ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  switchView("ai");
                }}
              >
                <span className="drawer-label">AI</span>
              </a>
              <a
                href="/design"
                className={`drawer-nav-item ${activeTab === "design" ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  switchView("design");
                }}
              >
                <span className="drawer-label">디자인 시스템</span>
              </a>
              <a
                href="/license"
                className={`drawer-nav-item ${activeTab === "license" ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  switchView("license");
                }}
              >
                <span className="drawer-label">라이선스</span>
              </a>
              <a
                href="/credits"
                className={`drawer-nav-item ${activeTab === "credits" ? "active" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  switchView("credits");
                }}
              >
                <span className="drawer-label">크레딧</span>
              </a>
            </nav>

            <div className="drawer-ext-links">
              <a href="https://cnsh.life" className="drawer-ext-item">
                <span>cnsh.life</span>
                <ExternalArrowIcon size={12} />
              </a>
              <a href="https://cnsh.space" className="drawer-ext-item">
                <span>cnsh.space</span>
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

      <main>
        <div className="brand-view-wrap">
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
                      <span>충남과학고 웹 서비스</span>
                      <span className="brand-chapter-submeta">
                        cnsh.life · cnsh.space
                      </span>
                    </div>

                    <div className="brand-chapter-content">
                      <h3>
                        {renderWithCenteredStar(
                          "학교생활 포털과 재학생 커뮤니티를 함께 운영하는 프로젝트, asterisk*"
                        )}
                      </h3>
                      <div className="brand-prose-wrap">
                        <p>
                          <strong>
                            asterisk<span className="ast-star">*</span>
                          </strong>
                          는 충남과학고등학교 학생들을 위한 학교생활 정보 통합 플랫폼입니다.
                        </p>
                        <p>
                          로그인 없이 시간표·급식·시정표를 바로 확인하는 학교생활 포털{" "}
                          <strong>cnsh.life</strong>와, 재학생 인증을 거쳐 질문과 자료를
                          나누고 AI 기능을 쓰는 커뮤니티{" "}
                          <strong>cnsh.space</strong>로 나뉘어 운영됩니다.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </section>

              {/* 2. Two-Track Architecture (Life & Space) */}
              <section className="section-end-double">
                <div className="brand-story-title-row">
                  <h2>Two-Track Architecture</h2>
                </div>

                <div className="brand-chapters-container">
                  <article className="brand-chapter-block">
                    <div className="brand-chapter-meta">
                      <span>서비스 분리 구조</span>
                      <span className="brand-chapter-submeta">
                        cnsh.life · cnsh.space
                      </span>
                    </div>

                    <div className="brand-chapter-content">
                      <h3>
                        {renderWithCenteredStar(
                          "바로 여는 학교생활 포털과 재학생 전용 커뮤니티"
                        )}
                      </h3>
                      <div className="brand-prose-wrap">
                        <p>{twoTrackStrategyData.summary}</p>
                        {twoTrackStrategyData.philosophy.map((para, pIdx) => (
                          <p key={pIdx}>{renderWithCenteredStar(para)}</p>
                        ))}
                      </div>

                      {/* 비교 매트릭스 표 */}
                      <div className="brand-subsection-block">
                        <div className="brand-subsection-label">서비스 비교</div>
                        <div className="matrix-table-wrap">
                          <table className="matrix-table">
                            <thead>
                              <tr>
                                <th style={{ width: "22%" }}>구분</th>
                                <th style={{ width: "39%" }}>
                                  cnsh.life
                                </th>
                                <th style={{ width: "39%" }}>
                                  cnsh.space
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {twoTrackStrategyData.matrixRows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  <td>
                                    <strong className="matrix-col-dim-title">
                                      {row.dimension}
                                    </strong>
                                  </td>
                                  <td>{renderWithCenteredStar(row.lifeTrack)}</td>
                                  <td>{renderWithCenteredStar(row.spaceTrack)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 시너지 3대 포인트 */}
                      <div>
                        <div className="brand-subsection-label is-spacious">
                          공통 기반 및 연계
                        </div>
                        <div className="service-features-clean">
                          {twoTrackStrategyData.synergies.map((syn, sIdx) => (
                            <div key={sIdx} className="service-feature-item">
                              <div className="service-feature-name">
                                {renderWithCenteredStar(syn.title)}
                              </div>
                              <p className="service-feature-desc">
                                {renderWithCenteredStar(syn.description)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </section>

              {/* 3. The Story of asterisk* */}
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

              {/* 4. Core Services */}
              <section className="section-end-double is-last">
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
                        <div className="service-track-stack">
                          <span
                            className={`service-track-badge ${srv.trackType === "Life Track"
                              ? "ast-badge ast-badge-solid"
                              : "ast-badge ast-badge-outline"
                              }`}
                          >
                            {srv.trackType}
                          </span>
                          <span>{srv.tier}</span>
                        </div>
                        <span className="brand-chapter-submeta">
                          {srv.domain}
                        </span>
                      </div>

                      <div className="brand-chapter-content">
                        <h3>
                          {renderWithCenteredStar(srv.title)} — {srv.tagline}
                        </h3>
                        <p className="service-summary-desc">{srv.description}</p>

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
                          <a href={srv.url} className="btn-primary-action">
                            <span>{renderWithCenteredStar(srv.title)} 바로가기</span>
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
                              title="cnsh.space 서버 상태 확인"
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
              VIEW 2: ASTERISK* AI (JEV ROUTER & INTERNAL TOOLS)
              ============================================================== */}
          {activeTab === "ai" && (
            <AsteriskAiTab renderWithCenteredStar={renderWithCenteredStar} />
          )}

          {/* ==============================================================
              VIEW 3: 디자인 시스템 (DESIGN SYSTEM)
              ============================================================== */}
          {activeTab === "design" && (
            <div className="page-transition-wrap with-top-gap">
              {/* Color & Theme System */}
              <section className="section-end-double">
                <div className="brand-section-head">
                  <h2>Color &amp; Theme System</h2>
                  <div className="ds-theme-toggle-row">
                    <button
                      type="button"
                      className={`board-filter-btn ${!isDarkTheme ? "active" : ""
                        }`}
                      onClick={() => setIsDarkTheme(false)}
                    >
                      LIGHT (:root)
                    </button>
                    <button
                      type="button"
                      className={`board-filter-btn ${isDarkTheme ? "active" : ""
                        }`}
                      onClick={() => setIsDarkTheme(true)}
                    >
                      DARK ([data-theme=&apos;dark&apos;])
                    </button>
                  </div>
                </div>

                <div className="brand-colors-grid">
                  <div
                    className="brand-color-main-card"
                    style={
                      {
                        backgroundColor: resolvedHex,
                        color: resolvedContrast,
                        "--card-bg": resolvedHex,
                        "--card-fg": resolvedContrast,
                      } as React.CSSProperties
                    }
                  >
                    <div>
                      <div className="brand-color-meta-row">
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
                        <span className="brand-color-hex-label">
                          {isDarkTheme ? "DARK HEX" : "LIGHT HEX"} (
                          {isDarkTheme
                            ? `Light: ${activeColor.hex}`
                            : `Dark: ${activeColor.darkHex}`}
                          )
                        </span>
                        <span className="brand-color-hex-value">{resolvedHex}</span>
                      </div>
                      <div className="brand-color-actions">
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
                          {copiedValue === resolvedHex ? (
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
                      <div className="brand-color-items-stack">
                        {monochromeTokens.map((token, idx) => {
                          const isSelected =
                            activeColor.cssVar === token.cssVar;
                          const itemHex = isDarkTheme
                            ? token.darkHex
                            : token.hex;
                          return (
                            <div
                              key={token.cssVar}
                              className={`brand-color-row-item ${isSelected ? "active" : ""
                                }`}
                              onClick={() => setActiveColor(token)}
                            >
                              <div className="brand-color-row-left">
                                <span className="brand-color-index">
                                  0{idx + 1}
                                </span>
                                <div
                                  className="brand-chip-sq"
                                  style={{ backgroundColor: itemHex }}
                                />
                                <span className="brand-color-var-label">
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
                                  {copiedValue === itemHex ? (
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
                        }}
                        onClick={() => {
                          setActiveColor(token);
                          handleCopyText(cellHex);
                        }}
                      >
                        <div className="brand-swatch-cell-hex">{cellHex}</div>
                        <div className="brand-swatch-cell-name">
                          <strong>{token.name}</strong>
                          <div className="brand-swatch-cell-sub">
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
                      <div className="brand-typo-label-title">워드마크 규격</div>
                      <div>.asterisk-wordmark</div>
                      <div>.asterisk-wordmark-inline</div>
                    </div>
                    <div className="brand-wordmark-grid">
                      <div className="module-card">
                        <span className="eyebrow">데스크톱 2줄 워드마크</span>
                        <div className="asterisk-wordmark brand-wordmark-preview-desktop">
                          <div>aste</div>
                          <div className="asterisk-wordmark-bottom">
                            <span>risk</span>
                            <span className="asterisk-wordmark-star">*</span>
                          </div>
                        </div>
                        <div className="brand-wordmark-spec">
                          weight: var(--font-weight-light) · star:
                          var(--wordmark-star-size) · line-height:
                          var(--leading-wordmark)
                        </div>
                      </div>

                      <div className="module-card">
                        <span className="eyebrow">모바일 1줄 워드마크</span>
                        <div className="brand-wordmark-preview-inline-wrap">
                          <span className="asterisk-wordmark-inline brand-wordmark-preview-inline">
                            asterisk
                            <span className="asterisk-wordmark-star">*</span>
                          </span>
                        </div>
                        <div className="brand-wordmark-spec">
                          weight: var(--font-weight-light) · star:
                          var(--wordmark-star-size) · line-height:
                          var(--leading-none)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="brand-typo-row">
                    <div className="brand-typo-label">
                      <div className="brand-typo-label-title">서체 및 굵기</div>
                      <div>Asta Sans · Pretendard</div>
                    </div>
                    <div className="brand-typo-body">
                      <div className="brand-weights-demo">
                        <div className="brand-weight-light-sample">
                          300 Light — 페이지 제목 및 디스플레이
                        </div>
                        <div className="brand-weight-regular-sample">
                          400 Regular — 본문 및 게시글 텍스트 (14.5px / 1.75)
                        </div>
                        <div className="brand-weight-semibold-sample">
                          600 SemiBold — 카드 제목 및 주요 라벨 (asterisk
                          <span className="ast-star">*</span>)
                        </div>
                        <div className="brand-weight-bold-sample">
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

                <div className="ds-surface-grid">
                  <div className="ds-surface-card mode-paper">
                    <div>
                      <span className="eyebrow ds-surface-eyebrow-paper">
                        DEFAULT LIGHT
                      </span>
                      <h3 className="ds-surface-title">Paper Light</h3>
                    </div>
                    <div className="ds-surface-spec ds-surface-spec-paper">
                      bg: #F7F6F2 (--surface-paper-bg)
                      <br />
                      fg: #000000 · border: var(--border-main)
                    </div>
                  </div>

                  <div className="ds-surface-card mode-dark">
                    <div>
                      <span className="eyebrow ds-surface-eyebrow-dark">
                        DARK / NOW CARD
                      </span>
                      <h3 className="ds-surface-title">Carbon Dark</h3>
                    </div>
                    <div className="ds-surface-spec ds-surface-spec-dark">
                      bg: #000000 (--surface-dark-bg) · surface: #18191C
                      <br />
                      ink: #F7F6F2 ([data-theme=&apos;dark&apos;])
                    </div>
                  </div>

                  <div className="ds-surface-card mode-glass">
                    <div className="ds-glass-inner">
                      <div>
                        <span className="eyebrow ds-surface-eyebrow-glass">
                          SKY BACKGROUND
                        </span>
                        <h3 className="ds-surface-title">Translucent Glass</h3>
                      </div>
                      <div className="ds-surface-spec ds-surface-spec-glass">
                        rgba(242, 246, 247, 0.72) (--surface-glass-bg)
                        <br />
                        backdrop-filter: var(--surface-glass-blur)
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* UI Components */}
              <section className="section-end-double">
                <div className="brand-section-head">
                  <h2>UI Components</h2>
                </div>

                <div className="ds-primitives-grid">
                  <div className="ds-primitive-box">
                    <div className="ds-primitive-head">
                      <span>BUTTONS &amp; AUTH</span>
                      <span>var(--btn-radius) · 2px</span>
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
                      <span>var(--badge-height) · 22px</span>
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
                            className={`board-filter-btn ${demoCategory === cat ? "active" : ""
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
                    <div className="ds-primitive-stage is-split">
                      <div className="ds-toggle-group">
                        <label className="ds-toggle-label">
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

                        <label className="ds-toggle-label">
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

                <div className="ds-primitives-grid is-last">
                  <div className="specimen-now-card">
                    <div className="specimen-now-top">
                      <span>
                        <span className="specimen-now-dot" />
                        NOW · 3교시 수업 중
                      </span>
                      <span className="specimen-now-pct">64%</span>
                    </div>
                    <div>
                      <div className="specimen-now-sub">
                        10:40 — 11:30 · 고급물리학
                      </div>
                      <div className="specimen-now-countdown">
                        18분 12초 남음
                      </div>
                    </div>
                    <div>
                      <div className="specimen-progress">
                        <span style={{ width: "64%" }} />
                      </div>
                      <div className="specimen-now-next">
                        NEXT → <strong>점심시간 (12:20 — 13:20)</strong>
                      </div>
                    </div>
                  </div>

                  <div className="specimen-board-box">
                    <div className="specimen-board-head">
                      <span>NO</span>
                      <span>TITLE</span>
                      <span>AUTHOR</span>
                      <span className="specimen-board-like-head">LIKE</span>
                    </div>
                    <div className="specimen-board-row">
                      <span className="specimen-board-no">0042</span>
                      <div className="specimen-board-title-wrap">
                        <span className="badge-popular">인기</span>
                        <span className="specimen-board-title-text">
                          @asterisk 오늘 석식 메뉴 알려줘
                        </span>
                      </div>
                      <div className="specimen-board-author-wrap">
                        <span className="specimen-board-author-name">
                          재학생
                        </span>
                        <span className="author-generation-badge">33기</span>
                      </div>
                      <span className="specimen-board-like-count">+12</span>
                    </div>
                    <div className="specimen-ai-reply">
                      <div className="specimen-ai-reply-head">
                        <span className="badge-pinned">
                          @asterisk<span className="ast-star">*</span> AI
                        </span>
                      </div>
                      <div className="specimen-ai-reply-body">
                        오늘 충남과학고 석식(18:00~18:50)은 수제등심돈까스, 크림스프,
                        배추김치입니다. (892 kcal)
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Design Tokens Reference */}
              <section className="section-end-double">
                <div className="brand-section-head">
                  <h2>Design Tokens Reference</h2>
                  <div className="ds-tokens-head-controls">
                    <p>
                      {isTokensOpen
                        ? `${filteredDesignTokens.length} tokens · 클릭 시 var(--...) 복사`
                        : `${designTokensCatalog.length} tokens · ${designTokenCategories.length - 1} categories`}
                    </p>
                    <button
                      type="button"
                      className={`board-filter-btn ${isTokensOpen ? "active" : ""}`}
                      aria-expanded={isTokensOpen}
                      aria-controls="design-tokens-panel"
                      onClick={() => setIsTokensOpen((prev) => !prev)}
                    >
                      {isTokensOpen
                        ? "접기 −"
                        : `펼쳐보기 (${designTokensCatalog.length}) +`}
                    </button>
                  </div>
                </div>

                {!isTokensOpen ? (
                  <button
                    type="button"
                    className="ds-tokens-collapsed-bar"
                    aria-expanded={false}
                    aria-controls="design-tokens-panel"
                    onClick={() => setIsTokensOpen(true)}
                  >
                    <span className="ds-tokens-collapsed-meta">
                      {designTokensCatalog.length}개 토큰 ·{" "}
                      {designTokenCategories.length - 1}개 카테고리 (시맨틱 컬러 ·
                      서피스 · 타이포 · 여백 · 그림자 · 모션 · 컴포넌트)
                    </span>
                    <span className="ds-tokens-collapsed-cta">
                      클릭하여 열기 +
                    </span>
                  </button>
                ) : (
                  <div id="design-tokens-panel" className="ds-tokens-panel">
                    <div className="ds-token-filters">
                      {designTokenCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          className={`board-filter-btn ${
                            tokenCategory === cat.id ? "active" : ""
                          }`}
                          onClick={() => setTokenCategory(cat.id)}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div className="matrix-table-wrap">
                      <table className="matrix-table">
                        <thead>
                          <tr>
                            <th style={{ width: "26%" }}>토큰 (CSS VARIABLE)</th>
                            <th style={{ width: "22%" }}>LIGHT (:root)</th>
                            <th style={{ width: "20%" }}>DARK OVERRIDE</th>
                            <th style={{ width: "24%" }}>용도</th>
                            <th style={{ width: "8%" }}>복사</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDesignTokens.map((token) => {
                            const varExpr = `var(${token.cssVar})`;
                            return (
                              <tr key={token.cssVar}>
                                <td>
                                  <div className="matrix-col-label">토큰</div>
                                  <div className="ds-token-name-cell">
                                    {renderTokenSwatch(token, isDarkTheme)}
                                    <span className="ds-token-code">
                                      {token.cssVar}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <div className="matrix-col-label">LIGHT (:root)</div>
                                  <span className="ds-token-val">
                                    {token.lightValue}
                                  </span>
                                </td>
                                <td>
                                  <div className="matrix-col-label">DARK OVERRIDE</div>
                                  <span
                                    className={`ds-token-val ${
                                      token.darkValue ? "" : "ds-token-muted"
                                    }`}
                                  >
                                    {token.darkValue || "—"}
                                  </span>
                                </td>
                                <td>
                                  <div className="matrix-col-label">용도</div>
                                  <span className="tool-desc-text">
                                    {token.role}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="ds-token-copy-btn"
                                    onClick={(e) => handleCopyText(varExpr, e)}
                                    title={`${varExpr} 복사`}
                                  >
                                    {copiedValue === varExpr ? (
                                      <CheckIcon size={12} />
                                    ) : (
                                      <CopyIcon size={12} />
                                    )}
                                    <span>VAR</span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>

              {/* External Web Integration */}
              <section className="section-end-double is-last">
                <div className="brand-section-head">
                  <h2>External Web Integration</h2>
                  <p>CORS (*) · Zero-Pollution CSS &amp; JSON</p>
                </div>

                <div className="ds-integration-grid">
                  {integrationSnippets.map((item) => (
                    <article key={item.id} className="ds-snippet-card">
                      <div>
                        <div className="ds-snippet-head">
                          <h3 className="ds-snippet-title">{item.title}</h3>
                          <span className="ast-badge ast-badge-vellum">
                            {item.tag}
                          </span>
                        </div>
                        <p className="ds-snippet-desc">
                          {item.description}
                        </p>
                      </div>

                      <pre className="ds-snippet-pre">{item.code}</pre>

                      <div className="ds-primitive-stage is-split">
                        <div className="ds-endpoint-list">
                          {item.id === "theme-and-json" && (
                            <>
                              <a
                                href="/ds/tokens.css"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ds-endpoint-pill"
                              >
                                /ds/tokens.css ↗
                              </a>
                              <a
                                href="/ds/asterisk.css"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ds-endpoint-pill"
                              >
                                /ds/asterisk.css ↗
                              </a>
                              <a
                                href="/ds/tokens.json"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ds-endpoint-pill"
                              >
                                /ds/tokens.json ↗
                              </a>
                            </>
                          )}
                        </div>
                        <button
                          type="button"
                          className="ds-token-copy-btn"
                          onClick={(e) => handleCopyText(item.code, e)}
                        >
                          {copiedValue === item.code ? (
                            <CheckIcon size={12} />
                          ) : (
                            <CopyIcon size={12} />
                          )}
                          <span>COPY SNIPPET</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ==============================================================
              VIEW 4: 라이선스 (LICENSE)
              ============================================================== */}
          {activeTab === "license" && (
            <div className="page-transition-wrap with-top-gap">
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
                        <td className="font-mono-cell">
                          <a
                            href="https://github.com/kuchipatchi09/everytime"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="matrix-ext-link"
                          >
                            kuchipatchi09/everytime ↗
                          </a>
                        </td>
                        <td className="font-mono-cell">
                          <strong>GNU AGPL-3.0</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>cnsh.space (FE)</strong>
                        </td>
                        <td>학생 커뮤니티 웹 클라이언트</td>
                        <td className="font-mono-cell">
                          <a
                            href="https://github.com/knoblab/asterisk-community-frontend"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="matrix-ext-link"
                          >
                            knoblab/asterisk-community-frontend ↗
                          </a>
                        </td>
                        <td className="font-mono-cell">
                          <strong>MIT License</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>cnsh.space (BE)</strong>
                        </td>
                        <td>학생 인증, DB, 보안 및 @asterisk AI 서버</td>
                        <td className="font-mono-cell">Knoblab Private</td>
                        <td className="font-mono-cell">
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
                        <td className="font-mono-cell">
                          <a
                            href="https://github.com/knoblab/asterisk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="matrix-ext-link"
                          >
                            knoblab/asterisk ↗
                          </a>
                        </td>
                        <td className="font-mono-cell">
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
                        <span className="brand-chapter-submeta with-top-gap">
                          {spec.repoLabel}
                        </span>
                      </div>

                      <div className="brand-chapter-content">
                        <h3>{renderWithCenteredStar(spec.moduleName)}</h3>
                        <p className="license-summary-desc">
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
              <section className="section-end-double is-last">
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
              VIEW 5: 크레딧 (CREDITS)
              ============================================================== */}
          {activeTab === "credits" && (
            <div className="page-transition-wrap with-top-gap">
              <section className="section-end-double is-last">
                <div className="brand-section-head">
                  <h2>Credits</h2>
                </div>

                <div className="credits-grid">
                  {creditsList.map((member) => {
                    const isKnoblab = member.id === "knoblab";
                    return (
                      <article
                        key={member.id}
                        className={`credit-profile-card ${isKnoblab ? "is-knoblab" : ""
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
                                className={`credit-contact-pill ${isKnoblab
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

          {/* ==============================================================
              VIEW 6: 이용약관 (TERMS)
              ============================================================== */}
          {activeTab === "terms" && (
            <div className="page-transition-wrap with-legal-gap">
              <div className="legal-iframe-bar">
                <button
                  type="button"
                  onClick={() => switchView("overview")}
                  className="legal-iframe-back"
                >
                  ← 소개로 돌아가기
                </button>
                <a
                  href="/terms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-iframe-ext"
                >
                  새 창으로 열기 ↗
                </a>
              </div>
              <iframe
                src="/terms/index.html"
                title="asterisk* 서비스 이용약관"
                className="legal-iframe-frame"
              />
            </div>
          )}

          {/* ==============================================================
              VIEW 7: 개인정보 처리방침 (PRIVACY)
              ============================================================== */}
          {activeTab === "privacy" && (
            <div className="page-transition-wrap with-legal-gap">
              <div className="legal-iframe-bar">
                <button
                  type="button"
                  onClick={() => switchView("overview")}
                  className="legal-iframe-back"
                >
                  ← 소개로 돌아가기
                </button>
                <a
                  href="/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-iframe-ext"
                >
                  새 창으로 열기 ↗
                </a>
              </div>
              <iframe
                src="/privacy/index.html"
                title="asterisk* 개인정보 처리방침"
                className="legal-iframe-frame"
              />
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

          <div className="footer-links-row">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                switchView("overview");
              }}
              className="footer-nav-link"
            >
              소개
            </a>
            <a
              href="/ai"
              onClick={(e) => {
                e.preventDefault();
                switchView("ai");
              }}
              className="footer-nav-link"
            >
              AI
            </a>
            <a
              href="/design"
              onClick={(e) => {
                e.preventDefault();
                switchView("design");
              }}
              className="footer-nav-link"
            >
              디자인 시스템
            </a>
            <a
              href="/license"
              onClick={(e) => {
                e.preventDefault();
                switchView("license");
              }}
              className="footer-nav-link"
            >
              라이선스
            </a>
            <a
              href="/credits"
              onClick={(e) => {
                e.preventDefault();
                switchView("credits");
              }}
              className="footer-nav-link"
            >
              크레딧
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                switchView("terms");
              }}
              className="footer-nav-link"
            >
              이용약관
            </a>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                switchView("privacy");
              }}
              className="footer-nav-link"
            >
              개인정보처리방침
            </a>
            <a
              href="https://status.knoblab.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="status-mini-pill"
              title="cnsh.space 서버 상태"
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

import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    color: var(--primary-text-color, #f4f7fb);
    --dhc-card-bg: color-mix(in srgb, var(--card-background-color, #171925) 82%, transparent);
    --dhc-panel-bg: color-mix(in srgb, var(--card-background-color, #171925) 68%, transparent);
    --dhc-border: color-mix(in srgb, var(--divider-color, #738099) 40%, transparent);
    --dhc-muted: var(--secondary-text-color, #aeb7c8);
    --dhc-red: #ef6f8e;
    --dhc-red-soft: #f27c98;
    --dhc-blue: #6d8ed6;
    --dhc-green: var(--success-color, #54c76d);
    --dhc-yellow: var(--warning-color, #f4bf45);
    --dhc-shadow: 0 18px 48px rgba(0, 0, 0, 0.26);
    --dhc-radius: var(--ha-card-border-radius, 30px);
    font-family: var(--primary-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  }

  ha-card {
    position: relative;
    overflow: hidden;
    padding: clamp(20px, 3vw, 30px);
    border-radius: var(--dhc-radius);
    border: 1px solid var(--dhc-border);
    background:
      radial-gradient(circle at 18% 22%, rgba(239, 111, 142, 0.14), transparent 36%),
      radial-gradient(circle at 88% 28%, rgba(109, 142, 214, 0.18), transparent 38%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 32%),
      var(--dhc-card-bg);
    box-shadow: var(--dhc-shadow);
    backdrop-filter: blur(22px) saturate(1.2);
  }

  .header,
  .flow,
  .metrics,
  .secondary,
  .diagnostics {
    position: relative;
    z-index: 1;
  }

  .header {
    display: block;
  }

  .status-icon svg,
  .metric-icon svg,
  .mini-icon svg,
  .diagnostic-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  h2 {
    margin: 0;
    font-size: clamp(28px, 7vw, 42px);
    line-height: 1;
    font-weight: 760;
    letter-spacing: 0;
  }

  .flow {
    margin: clamp(20px, 3vw, 28px) 0 clamp(16px, 2.5vw, 24px);
  }

  .flow-readings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 14px;
  }

  .reading.return {
    text-align: right;
  }

  .label {
    color: var(--dhc-red);
    text-transform: uppercase;
    font-size: clamp(12px, 2.8vw, 15px);
    font-weight: 780;
    letter-spacing: 0.04em;
  }

  .return .label {
    color: var(--dhc-blue);
  }

  .value {
    margin-top: 7px;
    color: var(--dhc-red);
    font-size: clamp(26px, 8vw, 42px);
    line-height: 1;
    font-weight: 780;
  }

  .return .value {
    color: var(--dhc-blue);
  }

  .plant {
    min-width: 0;
    position: relative;
  }

  .plant svg {
    width: 100%;
    height: auto;
    display: block;
    overflow: hidden;
  }

  .pipe-base {
    stroke-linecap: round;
    stroke-width: 42;
    opacity: 1;
  }

  .pipe-hot {
    stroke: url(#hotGradient);
    filter: drop-shadow(0 0 16px var(--supply-bg));
  }

  .pipe-cold {
    stroke: url(#coldGradient);
    filter: drop-shadow(0 0 16px var(--return-bg));
  }

  .house-group {
    opacity: 0.74;
  }

  .house {
    fill: color-mix(in srgb, var(--dhc-card-bg) 48%, transparent);
    stroke: color-mix(in srgb, var(--dhc-muted) 42%, transparent);
    stroke-width: 2.4;
  }

  .radiator,
  .heat-wave {
    color: color-mix(in srgb, var(--dhc-muted) 82%, white);
  }

  .pipe-line,
  .spark {
    stroke: rgba(255, 255, 255, 0.78);
    stroke-linecap: round;
    animation: drift 3.8s linear infinite;
  }

  .pipe-line {
    stroke-width: 2;
  }

  .spark {
    stroke-width: 4;
    stroke-dasharray: 0.1 27;
  }

  .arrow {
    fill: rgba(255, 255, 255, 0.9);
    filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.42));
    animation: pulse 2.8s ease-in-out infinite;
  }

  .return-arrow {
    transform-origin: 645px 94px;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 1fr));
    gap: clamp(12px, 1.8vw, 20px);
  }

  .panel {
    min-width: 0;
    border: 1px solid var(--dhc-border);
    border-radius: 26px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.022)), var(--dhc-panel-bg);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .metric {
    min-height: 112px;
    padding: clamp(16px, 2vw, 22px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .metric.delta {
    align-items: center;
    text-align: center;
    border-color: color-mix(in srgb, var(--severity-color, var(--dhc-green)) 32%, var(--dhc-border));
  }

  .metric-label,
  .mini-label,
  .diagnostic-label {
    color: var(--dhc-muted);
    text-transform: uppercase;
    font-size: clamp(12px, 2.4vw, 15px);
    font-weight: 720;
    letter-spacing: 0.045em;
  }

  .delta-value {
    margin-top: 12px;
    color: var(--severity-color, var(--dhc-green));
    font-size: clamp(42px, 10vw, 64px);
    line-height: 0.98;
    font-weight: 820;
  }

  .delta-status {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 18px;
    color: var(--severity-color, var(--dhc-green));
    font-size: clamp(17px, 4vw, 23px);
    font-weight: 700;
  }

  .delta-status svg {
    width: 29px;
    height: 29px;
    fill: currentColor;
  }

  .metric-value {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-top: 20px;
    font-size: clamp(30px, 4vw, 44px);
    line-height: 1;
    font-weight: 720;
  }

  .metric-icon {
    width: 38px;
    height: 38px;
    color: color-mix(in srgb, var(--dhc-muted) 90%, white);
  }

  .sparkline,
  .bars {
    width: min(100%, 210px);
    height: 44px;
    margin-top: 20px;
    color: var(--dhc-blue);
    opacity: 0.8;
  }

  .secondary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 175px), 1fr));
    gap: 0;
    margin-top: clamp(14px, 2vw, 22px);
    padding: 18px 22px;
  }

  .mini {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px;
    align-items: center;
    min-width: 0;
    padding: 0 16px;
    border-left: 1px solid color-mix(in srgb, var(--dhc-border) 70%, transparent);
  }

  .mini:first-child {
    border-left: 0;
  }

  .mini-icon {
    width: 36px;
    height: 36px;
    color: color-mix(in srgb, var(--dhc-muted) 86%, white);
  }

  .mini-value {
    margin-top: 7px;
    font-size: clamp(21px, 3vw, 32px);
    line-height: 1;
    font-weight: 700;
  }

  .diagnostics {
    display: grid;
    grid-template-columns: minmax(240px, 1.45fr) repeat(2, minmax(170px, 1fr));
    gap: 0;
    margin-top: clamp(14px, 2vw, 22px);
    padding: 22px;
    align-items: center;
    --severity-color: var(--dhc-green);
  }

  .diagnostics.severity-good {
    --severity-color: var(--dhc-green);
  }

  .diagnostics.severity-excellent {
    --severity-color: var(--dhc-green);
  }

  .diagnostics.severity-warning {
    --severity-color: var(--dhc-yellow);
  }

  .diagnostics.severity-critical {
    --severity-color: var(--dhc-red);
  }

  .diagnostics.severity-unknown {
    --severity-color: var(--dhc-muted);
  }

  .summary {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    align-items: center;
    min-width: 0;
    padding-right: 24px;
  }

  .status-icon {
    width: 70px;
    height: 70px;
    color: var(--severity-color);
    border: 4px solid color-mix(in srgb, var(--severity-color) 70%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--severity-color) 16%, transparent);
  }

  .summary-title {
    color: var(--severity-color);
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 780;
    line-height: 1.08;
  }

  .summary-text {
    margin-top: 8px;
    color: var(--dhc-muted);
    font-size: clamp(15px, 1.9vw, 18px);
    line-height: 1.35;
  }

  .diagnostic {
    min-width: 0;
    padding: 0 26px;
    border-left: 1px solid color-mix(in srgb, var(--dhc-border) 70%, transparent);
  }

  .diagnostic-head {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    align-items: center;
  }

  .diagnostic-icon {
    width: 37px;
    height: 37px;
    color: color-mix(in srgb, var(--dhc-muted) 84%, white);
  }

  .diagnostic-value {
    margin-top: 10px;
    color: var(--severity-color);
    font-size: clamp(27px, 4vw, 38px);
    line-height: 1;
    font-weight: 780;
  }

  .diagnostic-sub {
    margin-top: 5px;
    color: var(--severity-color);
    font-size: clamp(15px, 2vw, 20px);
  }

  .bar {
    position: relative;
    height: 9px;
    margin-top: 18px;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--dhc-muted) 18%, transparent);
  }

  .bar::before {
    content: "";
    display: block;
    width: var(--score);
    height: 100%;
    border-radius: inherit;
    background: var(--severity-color);
    box-shadow: 0 0 14px color-mix(in srgb, var(--severity-color) 65%, transparent);
  }

  .bar::after {
    content: "";
    position: absolute;
    top: 1px;
    left: calc(var(--score) - 4px);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.65);
  }

  .flow-readings {
    align-items: start;
  }

  .reading {
    min-width: 0;
  }

  .label {
    font-size: 12px;
  }

  .value {
    font-size: clamp(24px, 7.8vw, 36px);
  }

  .diagnostics {
    display: block;
    margin-top: 14px;
    padding: 15px 16px;
    border: 1px solid color-mix(in srgb, var(--severity-color) 34%, var(--dhc-border));
    border-radius: 24px;
    background: linear-gradient(145deg, color-mix(in srgb, var(--severity-color) 10%, transparent), rgba(255, 255, 255, 0.025)), var(--dhc-panel-bg);
  }

  .summary {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    align-items: center;
    padding: 0;
  }

  .status-icon {
    width: 38px;
    height: 38px;
    border-width: 2px;
  }

  .summary-title {
    font-size: clamp(17px, 4.8vw, 21px);
  }

  .summary-text {
    margin-top: 4px;
    font-size: clamp(12px, 3.4vw, 14px);
    line-height: 1.32;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
    gap: 10px;
    margin-top: 12px;
  }

  .stat {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
    min-width: 0;
    padding: 11px 12px;
    border: 1px solid var(--dhc-border);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.04);
  }

  .stat-icon {
    width: 22px;
    height: 22px;
    color: color-mix(in srgb, var(--dhc-muted) 86%, white);
  }

  .stat-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .stat-text {
    display: grid;
    min-width: 0;
  }

  .stat-label {
    color: var(--dhc-muted);
    font-size: 10px;
    font-weight: 760;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .stat-value {
    margin-top: 2px;
    font-size: 15px;
    font-weight: 740;
    white-space: nowrap;
  }

  @keyframes drift {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -96;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.72;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
      transform: translateX(4px);
    }
  }

  @keyframes pulseBack {
    0%,
    100% {
      opacity: 0.72;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
      transform: translateX(-4px);
    }
  }

  @media (max-width: 760px) {
    ha-card {
      padding: 18px;
      border-radius: 22px;
    }

    .flow-readings {
      gap: 12px;
    }

    .plant svg {
      min-height: 116px;
    }

    .diagnostics {
      grid-template-columns: 1fr;
    }

    .mini {
      border-left: 0;
      padding: 0 8px;
    }

    .summary,
    .diagnostic {
      padding: 0;
      border-left: 0;
    }

    .diagnostic {
      margin-top: 22px;
    }
  }

`;

export const editorStyles = css`
  :host {
    display: block;
    padding: 12px 0;
  }

  .section {
    margin: 18px 0 8px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .field {
    display: block;
    margin: 10px 0;
  }

  ha-textfield,
  ha-entity-picker {
    display: block;
    width: 100%;
  }

  .toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin: 12px 0;
  }
`;

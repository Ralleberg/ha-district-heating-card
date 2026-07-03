import { LitElement, html, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./editor";
import { icons } from "./icons";
import { cardStyles } from "./styles";
import {
  computeDeltaT,
  efficiency,
  formatValue,
  lastUpdated,
  mergeConfig,
  numericState,
  unit,
} from "./utils";
import type { DistrictHeatingCardConfig, HomeAssistant, LovelaceCardEditor } from "./types";

const CARD_VERSION = "0.1.0";

@customElement("ha-district-heating-card")
export class HaDistrictHeatingCard extends LitElement {
  static override styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: DistrictHeatingCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("district-heating-card-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<DistrictHeatingCardConfig> {
    return {
      type: "custom:ha-district-heating-card",
      name: "Fjernvarme",
      min_delta_t: 20,
      good_delta_t: 30,
      max_return_temp: 45,
      good_return_temp: 35,
    };
  }

  public setConfig(config: DistrictHeatingCardConfig): void {
    this.config = mergeConfig(config);
  }

  public getCardSize(): number {
    return 6;
  }

  protected override render() {
    if (!this.config) {
      return html``;
    }

    const supply = numericState(this.hass, this.config.supply_temp_entity);
    const returned = numericState(this.hass, this.config.return_temp_entity);
    const deltaT = computeDeltaT(this.hass, this.config);
    const result = efficiency(this.config, deltaT, returned);
    const severityClass = `severity-${result.severity}`;
    const updated = lastUpdated(this.hass, this.config);

    return html`
      <ha-card>
        <div class="header">
          <div class="title">
            <span class="title-icon">${icons.flame}</span>
            <div>
              <h2>${this.config.name ?? "Fjernvarme"}</h2>
              ${this.config.show_status !== false ? html`<div class="mode">Aktuel drift</div>` : null}
            </div>
          </div>
          ${updated ? html`<div class="updated">${icons.clock}<span>Opdateret ${updated}</span></div>` : null}
        </div>

        <section class="flow" aria-label="Fjernvarme flow">
          ${this.renderReading("Fremløb", formatValue(supply, unit(this.hass, this.config.supply_temp_entity, "°C")), "Fra fjernvarmen")}
          ${this.renderPlant()}
          ${this.renderReading("Returløb", formatValue(returned, unit(this.hass, this.config.return_temp_entity, "°C")), "Til fjernvarmen", true)}
        </section>

        <section class="metrics">
          <div class="panel metric delta" style=${`--severity-color: ${this.severityColor(result.severity)}`}>
            <div class="metric-label">Temperaturforskel (&Delta;T)</div>
            <div class="delta-value">${formatValue(deltaT, "°C")}</div>
            <div class="delta-status">${icons.leaf}<span>${result.deltaLabel === "Ukendt" ? "Mangler data" : "God udnyttelse"}</span></div>
          </div>

          ${this.config.power_entity ? this.renderMetric("Effekt", "power_entity", "kW", icons.flame, this.renderSparkline()) : null}
          ${this.config.energy_today_entity ? this.renderMetric("Energi i dag", "energy_today_entity", "kWh", icons.drop, this.renderBars()) : null}
        </section>

        ${this.config.show_secondary === false ? null : this.renderSecondary(deltaT)}
        ${this.config.show_diagnostics === false ? null : this.renderDiagnostics(result, returned, deltaT, severityClass)}
      </ha-card>
    `;
  }

  private renderReading(label: string, value: string, caption: string, isReturn = false) {
    return html`
      <div class=${`reading ${isReturn ? "return" : ""}`}>
        <div class="label">${label}</div>
        <div class="value">${value}</div>
        <div class="caption">${caption}</div>
      </div>
    `;
  }

  private renderPlant() {
    return html`
      <div class="plant">
        <svg viewBox="0 0 760 250" role="img" aria-label="Fjernvarmerør gennem huset">
          <defs>
            <linearGradient id="hotGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#b53129" />
              <stop offset="44%" stop-color="#ff725f" />
              <stop offset="100%" stop-color="#8f2c2c" />
            </linearGradient>
            <linearGradient id="coldGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#143d84" />
              <stop offset="50%" stop-color="#55a5ff" />
              <stop offset="100%" stop-color="#1a55b7" />
            </linearGradient>
          </defs>

          <line class="pipe-base pipe-hot" x1="22" y1="108" x2="276" y2="108" />
          <line class="pipe-base pipe-cold" x1="484" y1="108" x2="738" y2="108" />

          <path class="house" d="M334 92V54l-35 1c-10 0-14-13-6-19L380 7a20 20 0 0 1 24 0l87 29c8 6 4 19-6 19h-35v118c0 11-9 20-20 20h-76c-11 0-20-9-20-20V92Z" />

          <g class="radiator" fill="currentColor" opacity="0.84">
            <rect x="351" y="118" width="16" height="66" rx="8" />
            <rect x="381" y="118" width="16" height="66" rx="8" />
            <rect x="411" y="118" width="16" height="66" rx="8" />
            <rect x="441" y="122" width="9" height="58" rx="5" />
            <rect x="345" y="136" width="112" height="10" rx="5" />
          </g>

          <g class="heat-wave" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.86">
            <path d="M371 87c-14-17 14-22 0-39" />
            <path d="M399 87c-14-17 14-22 0-39" />
            <path d="M427 87c-14-17 14-22 0-39" />
          </g>

          <g opacity="0.9">
            <line class="pipe-line" x1="36" y1="88" x2="106" y2="88" stroke-dasharray="46 44" />
            <line class="pipe-line" x1="124" y1="113" x2="228" y2="113" stroke-dasharray="72 55" />
            <line class="spark" x1="52" y1="131" x2="264" y2="131" />
            <polygon class="arrow" points="221,91 259,108 221,125" />

            <line class="pipe-line" x1="504" y1="88" x2="586" y2="88" stroke-dasharray="46 44" />
            <line class="pipe-line" x1="604" y1="113" x2="714" y2="113" stroke-dasharray="72 55" />
            <line class="spark" x1="500" y1="131" x2="724" y2="131" />
            <polygon class="arrow" points="674,91 712,108 674,125" />
          </g>
        </svg>
      </div>
    `;
  }

  private renderMetric(
    label: string,
    key: keyof DistrictHeatingCardConfig,
    fallbackUnit: string,
    icon: unknown,
    visual: unknown,
  ) {
    const entityId = this.config?.[key];
    const value = typeof entityId === "string" ? numericState(this.hass, entityId) : undefined;
    const labelUnit = typeof entityId === "string" ? unit(this.hass, entityId, fallbackUnit) : fallbackUnit;

    return html`
      <div class="panel metric">
        <div class="metric-label">${label}</div>
        <div class="metric-value">
          <span class="metric-icon">${icon}</span>
          <span>${formatValue(value, labelUnit)}</span>
        </div>
        ${visual}
      </div>
    `;
  }

  private renderSecondary(deltaT: number | undefined) {
    return html`
      <section class="panel secondary">
        ${this.config?.outdoor_temp_entity ? this.renderMini("Udetemperatur", "outdoor_temp_entity", "°C", icons.sun) : null}
        ${this.config?.indoor_temp_entity ? this.renderMini("Indetemperatur", "indoor_temp_entity", "°C", icons.home) : null}
        ${this.config?.yearly_energy_entity ? this.renderMini("Forbrug i år", "yearly_energy_entity", "MWh", icons.chart) : null}
        ${this.config?.average_delta_t_entity
          ? this.renderMini("Gennemsnitlig ΔT", "average_delta_t_entity", "°C", icons.gauge)
          : this.renderMiniValue("Aktuel ΔT", formatValue(deltaT, "°C"), icons.gauge)}
      </section>
    `;
  }

  private renderMini(label: string, key: keyof DistrictHeatingCardConfig, fallbackUnit: string, icon: unknown) {
    const entityId = this.config?.[key];
    const value = typeof entityId === "string" ? numericState(this.hass, entityId) : undefined;
    const labelUnit = typeof entityId === "string" ? unit(this.hass, entityId, fallbackUnit) : fallbackUnit;
    return this.renderMiniValue(label, formatValue(value, labelUnit), icon);
  }

  private renderMiniValue(label: unknown, value: string, icon: unknown) {
    return html`
      <div class="mini">
        <span class="mini-icon">${icon}</span>
        <div>
          <div class="mini-label">${label}</div>
          <div class="mini-value">${value}</div>
        </div>
      </div>
    `;
  }

  private renderDiagnostics(result: ReturnType<typeof efficiency>, returnTemp: number | undefined, deltaT: number | undefined, severityClass: string) {
    const statusIcon = result.severity === "critical" || result.severity === "warning" ? icons.alert : icons.check;
    return html`
      <section class=${`panel diagnostics ${severityClass}`}>
        <div class="summary">
          <span class="status-icon">${statusIcon}</span>
          <div>
            <div class="summary-title">${result.title}</div>
            <div class="summary-text">${result.message}</div>
          </div>
        </div>

        ${this.renderDiagnostic("Returtemperatur", formatValue(returnTemp, "°C"), result.returnLabel, result.returnScore, icons.drop)}
        ${this.renderDiagnostic("Afkøling (&Delta;T)", formatValue(deltaT, "°C"), result.deltaLabel, result.deltaScore, icons.flame)}
      </section>
    `;
  }

  private renderDiagnostic(label: string, value: string, sub: string, score: number, icon: unknown) {
    return html`
      <div class="diagnostic">
        <div class="diagnostic-head">
          <span class="diagnostic-icon">${icon}</span>
          <span class="diagnostic-label">${label}</span>
        </div>
        <div class="diagnostic-value">${value}</div>
        <div class="diagnostic-sub">${sub}</div>
        <div class="bar" style=${`--score: ${Math.round(score)}%`}></div>
      </div>
    `;
  }

  private renderSparkline() {
    return svg`
      <svg class="sparkline" viewBox="0 0 220 54" aria-hidden="true">
        <path d="M4 44 22 34 39 39 57 27 75 25 93 36 110 29 128 31 146 18 164 24 182 30 200 21 216 15" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 44 22 34 39 39 57 27 75 25 93 36 110 29 128 31 146 18 164 24 182 30 200 21 216 15V54H4Z" fill="currentColor" opacity="0.18" />
      </svg>
    `;
  }

  private renderBars() {
    return svg`
      <svg class="bars" viewBox="0 0 220 54" aria-hidden="true">
        ${[14, 31, 47, 25, 40, 17, 21, 35, 18, 29, 42, 24].map((height, index) => {
          const x = 8 + index * 17;
          return svg`<rect x=${x} y=${52 - height} width="9" height=${height} rx="3" fill="currentColor" opacity=${index % 3 === 0 ? "0.55" : "0.9"} />`;
        })}
      </svg>
    `;
  }

  private severityColor(severity: string): string {
    switch (severity) {
      case "excellent":
      case "good":
        return "var(--dhc-green)";
      case "warning":
        return "var(--dhc-yellow)";
      case "critical":
        return "var(--dhc-red)";
      default:
        return "var(--dhc-muted)";
    }
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, string | boolean>>;
  }

  interface HTMLElementTagNameMap {
    "ha-district-heating-card": HaDistrictHeatingCard;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "ha-district-heating-card",
  name: "District Heating Card",
  description: "Modern district heating visualization with Delta T and efficiency diagnostics.",
  preview: true,
});

console.info(
  `%c HA District Heating Card %c ${CARD_VERSION} `,
  "color: white; background: #1f6feb; font-weight: 700;",
  "color: #1f6feb; background: transparent; font-weight: 700;",
);

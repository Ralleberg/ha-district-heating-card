import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./editor";
import { icons } from "./icons";
import { cardStyles } from "./styles";
import {
  alphaHex,
  computeDeltaT,
  efficiency,
  flowColor,
  formatValue,
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
    return 4;
  }

  protected override render() {
    if (!this.config) {
      return html``;
    }

    const supply = numericState(this.hass, this.config.supply_temp_entity);
    const returned = numericState(this.hass, this.config.return_temp_entity);
    const deltaT = computeDeltaT(this.hass, this.config);
    const averageDeltaT = numericState(this.hass, this.config.average_delta_t_entity);
    const indoorTemp = numericState(this.hass, this.config.indoor_temp_entity);
    const outdoorTemp = numericState(this.hass, this.config.outdoor_temp_entity);
    const assessmentConfig = this.adjustAssessmentForHeatDemand(this.config, indoorTemp, outdoorTemp);
    const result = efficiency(assessmentConfig, averageDeltaT ?? deltaT, returned);
    const severityClass = `severity-${result.severity}`;
    const supplyColor = flowColor(
      supply,
      this.config.supply_color_low_temp ?? 50,
      this.config.supply_color_high_temp ?? 75,
      this.config.supply_color_low ?? "#f28aa0",
      this.config.supply_color_high ?? "#8f2438",
    );
    const returnColor = flowColor(
      returned,
      this.config.return_color_low_temp ?? 0,
      this.config.return_color_high_temp ?? 35,
      this.config.return_color_low ?? "#f4f7fb",
      this.config.return_color_high ?? "#3f6ed6",
    );
    const style = [
      `--supply-color: ${supplyColor}`,
      `--supply-bg: ${alphaHex(supplyColor, 0.68)}`,
      `--return-color: ${returnColor}`,
      `--return-bg: ${alphaHex(returnColor, 0.68)}`,
      `--severity-color: ${this.severityColor(result.severity)}`,
    ].join(";");

    return html`
      <ha-card style=${style}>
        <section class="flow" aria-label="Fjernvarme flow">
          <div class="flow-readings">
            ${this.renderReading("Fremløb", formatValue(supply, unit(this.hass, this.config.supply_temp_entity, "°C")))}
            ${this.renderReading("Returløb", formatValue(returned, unit(this.hass, this.config.return_temp_entity, "°C")), true)}
          </div>
          ${this.renderPlant()}
        </section>

        ${this.renderDiagnostics(result, deltaT, severityClass)}
        ${this.renderStats()}
      </ha-card>
    `;
  }

  private renderReading(label: string, value: string, isReturn = false) {
    return html`
      <div class=${`reading ${isReturn ? "return" : ""}`}>
        <div class="label">${label}</div>
        <div class="value">${value}</div>
      </div>
    `;
  }

  private renderPlant() {
    return html`
      <div class="plant">
        <svg viewBox="0 0 760 210" role="img" aria-label="Fjernvarmerør gennem huset">
          <defs>
            <linearGradient id="hotGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="var(--supply-bg)" />
              <stop offset="52%" stop-color="var(--supply-color)" />
              <stop offset="100%" stop-color="var(--supply-bg)" />
            </linearGradient>
            <linearGradient id="coldGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="var(--return-bg)" />
              <stop offset="50%" stop-color="var(--return-color)" />
              <stop offset="100%" stop-color="var(--return-bg)" />
            </linearGradient>
          </defs>

          <line class="pipe-base pipe-hot" x1="22" y1="64" x2="738" y2="64" />
          <line class="pipe-base pipe-cold" x1="22" y1="147" x2="738" y2="147" />

          <g class="house-group">
            <path class="house" d="M331 90V54h-32c-9 0-13-12-6-17l88-31a20 20 0 0 1 22 0l88 31c7 5 3 17-6 17h-32v103c0 11-9 20-20 20h-82c-11 0-20-9-20-20V90Z" />

            <g class="radiator" fill="currentColor" opacity="0.84">
              <rect x="350" y="110" width="13" height="55" rx="7" />
              <rect x="375" y="110" width="13" height="55" rx="7" />
              <rect x="400" y="110" width="13" height="55" rx="7" />
              <rect x="425" y="114" width="8" height="47" rx="4" />
              <rect x="344" y="126" width="96" height="8" rx="4" />
            </g>

            <g class="heat-wave" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity="0.86">
              <path d="M365 91c-13-16 13-21 0-37" />
              <path d="M392 91c-13-16 13-21 0-37" />
              <path d="M419 91c-13-16 13-21 0-37" />
            </g>
          </g>

          <g opacity="0.9">
            <line class="pipe-line hot-line" x1="52" y1="45" x2="728" y2="45" stroke-dasharray="42 48" />
            <line class="pipe-line hot-line" x1="30" y1="76" x2="704" y2="76" stroke-dasharray="12 34 52 42" />
            <line class="spark hot-line" x1="44" y1="64" x2="716" y2="64" />
            <polygon class="arrow supply-arrow" points="632,42 671,64 632,86" />

            <line class="pipe-line cold-line" x1="32" y1="128" x2="710" y2="128" stroke-dasharray="42 48" />
            <line class="pipe-line cold-line" x1="54" y1="159" x2="730" y2="159" stroke-dasharray="12 34 52 42" />
            <line class="spark cold-line" x1="44" y1="147" x2="716" y2="147" />
            <polygon class="arrow return-arrow" points="128,125 89,147 128,169" />
          </g>
        </svg>
      </div>
    `;
  }

  private renderStat(label: string, key: keyof DistrictHeatingCardConfig, fallbackUnit: string, icon: unknown) {
    const entityId = this.config?.[key];
    const value = typeof entityId === "string" ? numericState(this.hass, entityId) : undefined;
    const labelUnit = typeof entityId === "string" ? unit(this.hass, entityId, fallbackUnit) : fallbackUnit;

    return html`
      <div class="stat">
        <span class="stat-icon">${icon}</span>
        <span class="stat-text">
          <span class="stat-label">${label}</span>
          <span class="stat-value">${formatValue(value, labelUnit)}</span>
        </span>
      </div>
    `;
  }

  private renderStats() {
    const stats = [
      this.config?.power_entity ? this.renderStat("Effekt", "power_entity", "kW", icons.flame) : null,
      this.config?.energy_today_entity ? this.renderStat("I dag", "energy_today_entity", "kWh", icons.drop) : null,
      this.config?.yearly_energy_entity ? this.renderStat("I år", "yearly_energy_entity", "MWh", icons.chart) : null,
    ].filter(Boolean);

    if (stats.length === 0) {
      return null;
    }

    return html`
      <section class="stats">${stats}</section>
    `;
  }

  private renderDiagnostics(result: ReturnType<typeof efficiency>, deltaT: number | undefined, severityClass: string) {
    const statusIcon = result.severity === "critical" || result.severity === "warning" ? icons.alert : icons.check;
    return html`
      <section class=${`diagnostics ${severityClass}`}>
        <div class="summary">
          <span class="status-icon">${statusIcon}</span>
          <div>
            <div class="summary-title">${result.title}</div>
            <div class="summary-text">${formatValue(deltaT, "°C")} afkøling · ${result.message}</div>
          </div>
        </div>
      </section>
    `;
  }

  private adjustAssessmentForHeatDemand(
    config: DistrictHeatingCardConfig,
    indoorTemp: number | undefined,
    outdoorTemp: number | undefined,
  ): DistrictHeatingCardConfig {
    if (indoorTemp === undefined || outdoorTemp === undefined) {
      return config;
    }

    const heatDemand = indoorTemp - outdoorTemp;
    if (heatDemand < 8) {
      return {
        ...config,
        min_delta_t: (config.min_delta_t ?? 20) * 0.8,
        good_delta_t: (config.good_delta_t ?? 30) * 0.85,
      };
    }

    if (heatDemand > 22) {
      return {
        ...config,
        max_return_temp: (config.max_return_temp ?? 45) - 3,
        good_return_temp: (config.good_return_temp ?? 35) - 2,
      };
    }

    return config;
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

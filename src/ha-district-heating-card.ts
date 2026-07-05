import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./editor";
import { icons } from "./icons";
import { languageFromHass, translate } from "./i18n";
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
import type { DistrictHeatingCardConfig, HistoryPoint, HomeAssistant, LovelaceCardEditor } from "./types";

const CARD_VERSION = "0.1.0";

@customElement("ha-district-heating-card")
export class HaDistrictHeatingCard extends LitElement {
  static override styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: DistrictHeatingCardConfig;
  @state() private historyAverages: { indoor?: number; outdoor?: number } = {};
  private historyKey?: string;

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
    const language = languageFromHass(this.hass);
    const indoorTemp = this.historyAverages.indoor ?? numericState(this.hass, this.config.indoor_temp_entity);
    const outdoorTemp = this.historyAverages.outdoor ?? numericState(this.hass, this.config.outdoor_temp_entity);
    const assessment = this.adjustAssessmentForContext(this.config, indoorTemp, outdoorTemp);
    const assessmentConfig = assessment.config;
    const result = efficiency(assessmentConfig, averageDeltaT ?? deltaT, returned, language);
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
        <section class="flow" aria-label=${translate(language, "flowAria")}>
          <div class="flow-readings">
            ${this.renderReading(translate(language, "supply"), formatValue(supply, unit(this.hass, this.config.supply_temp_entity, "°C")), this.config.supply_temp_entity)}
            ${this.renderReading(translate(language, "return"), formatValue(returned, unit(this.hass, this.config.return_temp_entity, "°C")), this.config.return_temp_entity, true)}
          </div>
          ${this.renderPlant(language)}
        </section>

        ${this.renderDiagnostics(result, deltaT, severityClass, language, assessment.noteKey)}
        ${this.renderStats(language)}
      </ha-card>
    `;
  }

  protected override updated(): void {
    this.fetchHistoryAverages();
  }

  private renderReading(label: string, value: string, entityId: string | undefined, isReturn = false) {
    return html`
      <button class=${`reading ${isReturn ? "return" : ""}`} ?disabled=${!entityId} @click=${() => this.showMoreInfo(entityId)}>
        <div class="label">${label}</div>
        <div class="value">${value}</div>
      </button>
    `;
  }

  private renderPlant(language = languageFromHass(this.hass)) {
    return html`
      <div class="plant">
        <svg viewBox="0 0 760 180" role="img" aria-label=${translate(language, "plantAria")}>
          <line class="pipe-glow pipe-hot" x1="24" y1="94" x2="360" y2="94" />
          <line class="pipe-glow pipe-cold" x1="400" y1="94" x2="736" y2="94" />
          <line class="pipe-base pipe-hot" x1="24" y1="94" x2="360" y2="94" />
          <line class="pipe-base pipe-cold" x1="400" y1="94" x2="736" y2="94" />

          <g class="house-group">
            <path class="house" d="M331 78V45h-32c-9 0-13-12-6-17l88-31a20 20 0 0 1 22 0l88 31c7 5 3 17-6 17h-32v103c0 11-9 20-20 20h-82c-11 0-20-9-20-20V78Z" />

            <g class="radiator" fill="currentColor" opacity="0.84">
              <rect x="350" y="98" width="13" height="55" rx="7" />
              <rect x="375" y="98" width="13" height="55" rx="7" />
              <rect x="400" y="98" width="13" height="55" rx="7" />
              <rect x="425" y="102" width="8" height="47" rx="4" />
              <rect x="344" y="114" width="96" height="8" rx="4" />
            </g>

            <g class="heat-wave" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity="0.86">
              <path d="M365 82c-13-16 13-21 0-37" />
              <path d="M392 82c-13-16 13-21 0-37" />
              <path d="M419 82c-13-16 13-21 0-37" />
            </g>
          </g>

          <g class="water-flow">
            <path class="wave supply-wave wave-a" d="M42 89 C64 76 84 112 106 98 S150 76 172 94 S216 111 238 93 S282 77 304 95 S330 105 352 92" />
            <path class="wave supply-wave wave-b" d="M38 101 C62 112 82 78 106 91 S150 112 174 92 S218 78 242 95 S286 111 344 92" />
            <g class="bubbles supply-bubbles">
              <circle cx="68" cy="89" r="3.2" />
              <circle cx="108" cy="102" r="2.3" />
              <circle cx="151" cy="86" r="2.7" />
              <circle cx="204" cy="101" r="3" />
              <circle cx="253" cy="88" r="2.2" />
              <circle cx="306" cy="101" r="2.8" />
            </g>
            <polygon class="arrow supply-arrow" points="214,72 252,94 214,116" />

            <path class="wave return-wave wave-a" d="M410 89 C434 76 454 112 478 98 S522 76 546 94 S590 111 614 93 S658 77 680 95 S704 105 724 92" />
            <path class="wave return-wave wave-b" d="M410 101 C434 112 454 78 478 91 S522 112 546 92 S590 78 614 95 S658 111 724 92" />
            <g class="bubbles return-bubbles">
              <circle cx="440" cy="101" r="2.8" />
              <circle cx="489" cy="87" r="2.2" />
              <circle cx="532" cy="102" r="3.1" />
              <circle cx="586" cy="88" r="2.6" />
              <circle cx="637" cy="101" r="2.4" />
              <circle cx="694" cy="88" r="3" />
            </g>
            <polygon class="arrow return-arrow" points="626,72 664,94 626,116" />
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
          <button class="stat-value" ?disabled=${typeof entityId !== "string"} @click=${() => this.showMoreInfo(typeof entityId === "string" ? entityId : undefined)}>
            ${formatValue(value, labelUnit)}
          </button>
        </span>
      </div>
    `;
  }

  private renderStats(language = languageFromHass(this.hass)) {
    const stats = [
      this.config?.power_entity ? this.renderStat(translate(language, "power"), "power_entity", "kW", icons.flame) : null,
      this.config?.energy_today_entity ? this.renderStat(translate(language, "today"), "energy_today_entity", "kWh", icons.drop) : null,
      this.config?.yearly_energy_entity ? this.renderStat(translate(language, "year"), "yearly_energy_entity", "MWh", icons.chart) : null,
    ].filter(Boolean);

    if (stats.length === 0) {
      return null;
    }

    return html`
      <section class="stats">${stats}</section>
    `;
  }

  private renderDiagnostics(
    result: ReturnType<typeof efficiency>,
    deltaT: number | undefined,
    severityClass: string,
    language = languageFromHass(this.hass),
    noteKey?: "seasonalLowLoad" | "seasonalModerateLoad" | "seasonalHighLoad",
  ) {
    const statusIcon = result.severity === "critical" || result.severity === "warning" ? icons.alert : icons.check;
    const deltaEntity = this.config?.delta_t_entity;
    return html`
      <section class=${`diagnostics ${severityClass}`} @click=${() => this.showMoreInfo(deltaEntity)}>
        <div class="summary">
          <span class="status-icon">${statusIcon}</span>
          <div>
            <div class="summary-title">${result.title}</div>
            <div class="summary-text">${formatValue(deltaT, "°C")} ${translate(language, "cooling")} · ${result.message}</div>
            ${noteKey ? html`<div class="summary-note">${translate(language, noteKey)}</div>` : null}
          </div>
        </div>
      </section>
    `;
  }

  private adjustAssessmentForContext(
    config: DistrictHeatingCardConfig,
    indoorTemp: number | undefined,
    outdoorTemp: number | undefined,
  ): {
    config: DistrictHeatingCardConfig;
    noteKey?: "seasonalLowLoad" | "seasonalModerateLoad" | "seasonalHighLoad";
  } {
    if (indoorTemp === undefined || outdoorTemp === undefined) {
      return { config };
    }

    const heatDemand = indoorTemp - outdoorTemp;
    const seasonFactor = this.seasonalDemandFactor(outdoorTemp, heatDemand);
    const baseMinDeltaT = config.min_delta_t ?? 20;
    const baseGoodDeltaT = config.good_delta_t ?? 30;
    const nextConfig: DistrictHeatingCardConfig = {
      ...config,
      min_delta_t: Math.max(8, baseMinDeltaT * seasonFactor),
      good_delta_t: Math.max(12, baseGoodDeltaT * seasonFactor),
    };

    if (heatDemand > 22 || seasonFactor >= 0.95) {
      return {
        config: {
          ...nextConfig,
          max_return_temp: (config.max_return_temp ?? 45) - 3,
          good_return_temp: (config.good_return_temp ?? 35) - 2,
        },
        noteKey: "seasonalHighLoad",
      };
    }

    if (seasonFactor <= 0.68) {
      return { config: nextConfig, noteKey: "seasonalLowLoad" };
    }

    if (seasonFactor < 0.9) {
      return { config: nextConfig, noteKey: "seasonalModerateLoad" };
    }

    return { config: nextConfig };
  }

  private seasonalDemandFactor(outdoorTemp: number, heatDemand: number): number {
    const month = new Date().getMonth();
    const isSummer = month >= 4 && month <= 8;
    const isShoulder = month === 2 || month === 3 || month === 9 || month === 10;

    let factor = isSummer ? 0.62 : isShoulder ? 0.78 : 1;

    if (outdoorTemp >= 17 || heatDemand < 6) {
      factor = Math.min(factor, 0.58);
    } else if (outdoorTemp >= 12 || heatDemand < 10) {
      factor = Math.min(factor, 0.68);
    } else if (outdoorTemp >= 7 || heatDemand < 14) {
      factor = Math.min(factor, 0.82);
    }

    if (outdoorTemp <= 0 || heatDemand > 22) {
      factor = Math.max(factor, 1);
    }

    return factor;
  }

  private async fetchHistoryAverages(): Promise<void> {
    if (!this.hass?.callWS || !this.config) {
      return;
    }

    const entityIds = [this.config.indoor_temp_entity, this.config.outdoor_temp_entity].filter(Boolean) as string[];
    if (entityIds.length === 0) {
      return;
    }

    const bucket = Math.floor(Date.now() / (30 * 60 * 1000));
    const nextKey = `${entityIds.join("|")}:${bucket}`;
    if (this.historyKey === nextKey) {
      return;
    }
    this.historyKey = nextKey;

    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

    try {
      const history = await this.hass.callWS<Record<string, HistoryPoint[]>>({
        type: "history/history_during_period",
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        entity_ids: entityIds,
        minimal_response: true,
        no_attributes: true,
      });

      this.historyAverages = {
        indoor: this.averageHistory(history, this.config.indoor_temp_entity, startTime, endTime),
        outdoor: this.averageHistory(history, this.config.outdoor_temp_entity, startTime, endTime),
      };
    } catch (_error) {
      this.historyAverages = {};
    }
  }

  private averageHistory(
    history: Record<string, HistoryPoint[]>,
    entityId: string | undefined,
    startTime: Date,
    endTime: Date,
  ): number | undefined {
    if (!entityId) {
      return undefined;
    }

    const points = (history[entityId] ?? [])
      .map((point) => ({
        value: Number.parseFloat(String(point.s ?? point.state ?? "").replace(",", ".")),
        time: this.historyPointTime(point),
      }))
      .filter((point) => Number.isFinite(point.value) && point.time !== undefined)
      .sort((left, right) => (left.time ?? 0) - (right.time ?? 0)) as Array<{ value: number; time: number }>;

    if (points.length === 0) {
      return numericState(this.hass, entityId);
    }

    const sampleInterval = 30 * 60 * 1000;
    const samples: number[] = [];
    let cursor = 0;

    for (let sampleTime = startTime.getTime(); sampleTime <= endTime.getTime(); sampleTime += sampleInterval) {
      while (cursor < points.length - 1 && points[cursor + 1].time <= sampleTime) {
        cursor += 1;
      }

      const sample = points[cursor].time <= sampleTime ? points[cursor] : points[0];
      samples.push(sample.value);
    }

    return samples.reduce((sum, value) => sum + value, 0) / samples.length;
  }

  private historyPointTime(point: HistoryPoint): number | undefined {
    if (typeof point.lu === "number") {
      return point.lu > 1_000_000_000_000 ? point.lu : point.lu * 1000;
    }

    const timestamp = point.last_updated ?? point.last_changed;
    if (!timestamp) {
      return undefined;
    }

    const parsed = new Date(timestamp).getTime();
    return Number.isFinite(parsed) ? parsed : undefined;
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

  private showMoreInfo(entityId: string | undefined): void {
    if (!entityId) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
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

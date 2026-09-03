import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./editor";
import { icons } from "./icons";
import { languageFromHass, translate } from "./i18n";
import { cardStyles } from "./styles";
import {
  alphaHex,
  expectedReturnColor,
  flowColor,
  formatValue,
  mergeConfig,
  numericState,
  unit,
} from "./utils";
import type { DistrictHeatingCardConfig, HomeAssistant, LovelaceCardEditor } from "./types";

const CARD_VERSION = "1.1.0";

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
    return 2;
  }

  protected override render() {
    if (!this.config) {
      return html``;
    }

    const supply = numericState(this.hass, this.config.supply_temp_entity);
    const returned = numericState(this.hass, this.config.return_temp_entity);
    const expectedReturn = numericState(this.hass, this.config.expected_return_temp_entity);
    const language = languageFromHass(this.hass);
    const supplyColor = flowColor(
      supply,
      this.config.supply_color_low_temp ?? 50,
      this.config.supply_color_high_temp ?? 75,
      this.config.supply_color_low ?? "#f28aa0",
      this.config.supply_color_high ?? "#8f2438",
    );
    const returnColor = expectedReturnColor(
      returned,
      expectedReturn,
      flowColor(
        returned,
        this.config.return_color_low_temp ?? 0,
        this.config.return_color_high_temp ?? 35,
        this.config.return_color_low ?? "#f4f7fb",
        this.config.return_color_high ?? "#3f6ed6",
      ),
    );
    const style = [
      `--supply-color: ${supplyColor}`,
      `--supply-bg: ${alphaHex(supplyColor, 0.68)}`,
      `--return-color: ${returnColor}`,
      `--return-bg: ${alphaHex(returnColor, 0.68)}`,
    ].join(";");

    return html`
      <ha-card style=${style}>
        <div class="card">
          <section class="flow" aria-label=${translate(language, "flowAria")}>
            <div class="flow-readings">
              ${this.renderReading(translate(language, "supply"), formatValue(supply, unit(this.hass, this.config.supply_temp_entity, "°C")), this.config.supply_temp_entity)}
              ${this.renderReading(translate(language, "return"), formatValue(returned, unit(this.hass, this.config.return_temp_entity, "°C")), this.config.return_temp_entity, true)}
            </div>
            ${this.renderPlant(language)}
          </section>

          ${this.config.show_secondary ? this.renderStats(language) : null}
        </div>
      </ha-card>
    `;
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
        <svg viewBox="0 16 760 146" role="img" aria-label=${translate(language, "plantAria")}>
          <line class="pipe-glow pipe-hot" x1="24" y1="94" x2="380" y2="94" />
          <line class="pipe-glow pipe-cold" x1="380" y1="94" x2="736" y2="94" />
          <line class="pipe-base pipe-hot" x1="24" y1="94" x2="380" y2="94" />
          <line class="pipe-base pipe-cold" x1="380" y1="94" x2="736" y2="94" />

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
            <path class="wave supply-wave wave-a" d="M42 89 C66 76 88 112 112 98 S160 76 184 94 S232 111 256 93 S304 77 328 95 S352 105 376 92" />
            <path class="wave supply-wave wave-b" d="M38 101 C64 112 86 78 112 91 S160 112 186 92 S234 78 260 95 S308 111 374 92" />
            <g class="bubbles supply-bubbles">
              <circle cx="68" cy="89" r="3.2" />
              <circle cx="108" cy="102" r="2.3" />
              <circle cx="158" cy="86" r="2.7" />
              <circle cx="214" cy="101" r="3" />
              <circle cx="268" cy="88" r="2.2" />
              <circle cx="326" cy="101" r="2.8" />
            </g>
            <g class="arrow supply-arrow" transform="translate(202 94)">
              <polygon points="-19,-22 19,0 -19,22" />
            </g>

            <path class="wave return-wave wave-a" d="M384 89 C408 76 430 112 454 98 S502 76 526 94 S574 111 598 93 S646 77 670 95 S710 105 734 92" />
            <path class="wave return-wave wave-b" d="M384 101 C410 112 432 78 458 91 S506 112 532 92 S580 78 606 95 S654 111 734 92" />
            <g class="bubbles return-bubbles">
              <circle cx="414" cy="101" r="2.8" />
              <circle cx="466" cy="87" r="2.2" />
              <circle cx="520" cy="102" r="3.1" />
              <circle cx="578" cy="88" r="2.6" />
              <circle cx="638" cy="101" r="2.4" />
              <circle cx="704" cy="88" r="3" />
            </g>
            <g class="arrow return-arrow" transform="translate(558 94)">
              <polygon points="-19,-22 19,0 -19,22" />
            </g>
          </g>
        </svg>
      </div>
    `;
  }

  private renderStat(label: string, entityId: string | undefined, fallbackUnit: string, icon: unknown) {
    const value = numericState(this.hass, entityId);
    const labelUnit = unit(this.hass, entityId, fallbackUnit);

    return html`
      <button class="stat" ?disabled=${!entityId} @click=${() => this.showMoreInfo(entityId)}>
        <span class="stat-icon">${icon}</span>
        <span class="stat-text">
          <span class="stat-label">${label}</span>
          <span class="stat-value">${formatValue(value, labelUnit)}</span>
        </span>
      </button>
    `;
  }

  private renderStats(language = languageFromHass(this.hass)) {
    const dailyPowerEntity = this.config?.daily_power_entity ?? this.config?.energy_today_entity;
    const ytdPowerEntity = this.config?.ytd_power_entity ?? this.config?.yearly_energy_entity;
    const dailyCostEntity = this.config?.daily_cost_entity ?? this.config?.consumption_day_entity;
    const ytdCostEntity = this.config?.ytd_cost_entity ?? this.config?.consumption_ytd_entity;
    const hasStats = [dailyPowerEntity, ytdPowerEntity, dailyCostEntity, ytdCostEntity].some(Boolean);

    if (!hasStats) {
      return null;
    }

    return html`
      <section class="stats">
        <div class="stat-row">
          ${this.renderStat(translate(language, "dailyPower"), dailyPowerEntity, "kWh", icons.flame)}
          ${this.renderStat(translate(language, "ytdPower"), ytdPowerEntity, "kWh", icons.chart)}
          ${this.renderStat(translate(language, "dailyCost"), dailyCostEntity, "DKK", icons.drop)}
          ${this.renderStat(translate(language, "ytdCost"), ytdCostEntity, "DKK", icons.chart)}
        </div>
      </section>
    `;
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

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { languageFromHass, translate } from "./i18n";
import { DEFAULT_CONFIG } from "./utils";
import { editorStyles } from "./styles";
import type { DistrictHeatingCardConfig, HomeAssistant } from "./types";

type ConfigKey = keyof DistrictHeatingCardConfig;

@customElement("district-heating-card-editor")
export class DistrictHeatingCardEditor extends LitElement {
  static override styles = editorStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: DistrictHeatingCardConfig;

  public setConfig(config: DistrictHeatingCardConfig): void {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  protected override render() {
    if (!this.config) {
      return html``;
    }
    const language = languageFromHass(this.hass);

    return html`
      <div class="section">${translate(language, "editorTemperatures")}</div>
      ${this.entityPicker(translate(language, "editorSupplyTemp"), "supply_temp_entity", true)}
      ${this.entityPicker(translate(language, "editorReturnTemp"), "return_temp_entity", true)}
      ${this.entityPicker(translate(language, "editorDeltaT"), "delta_t_entity")}

      <div class="section">${translate(language, "editorOptionalMetrics")}</div>
      ${this.entityPicker(translate(language, "power"), "power_entity")}
      ${this.entityPicker(translate(language, "editorEnergyToday"), "energy_today_entity")}
      ${this.entityPicker(translate(language, "editorYearlyEnergy"), "yearly_energy_entity")}

      <div class="section">${translate(language, "editorAssessmentInput")}</div>
      ${this.entityPicker(translate(language, "editorOutdoorTemp"), "outdoor_temp_entity")}
      ${this.entityPicker(translate(language, "editorIndoorTemp"), "indoor_temp_entity")}
      ${this.entityPicker(translate(language, "editorAverageDeltaT"), "average_delta_t_entity")}

      <div class="section">${translate(language, "editorEfficiency")}</div>
      ${this.numberField(translate(language, "editorMinDeltaT"), "min_delta_t")}
      ${this.numberField(translate(language, "editorGoodDeltaT"), "good_delta_t")}
      ${this.numberField(translate(language, "editorMaxReturnTemp"), "max_return_temp")}
      ${this.numberField(translate(language, "editorGoodReturnTemp"), "good_return_temp")}

      <div class="section">${translate(language, "editorSupplyScale")}</div>
      ${this.numberField(translate(language, "editorLightColorAt"), "supply_color_low_temp")}
      ${this.textField(translate(language, "editorLightColor"), "supply_color_low")}
      ${this.numberField(translate(language, "editorDarkColorAt"), "supply_color_high_temp")}
      ${this.textField(translate(language, "editorDarkColor"), "supply_color_high")}

      <div class="section">${translate(language, "editorReturnScale")}</div>
      ${this.numberField(translate(language, "editorLightColorAt"), "return_color_low_temp")}
      ${this.textField(translate(language, "editorLightColor"), "return_color_low")}
      ${this.numberField(translate(language, "editorBlueColorAt"), "return_color_high_temp")}
      ${this.textField(translate(language, "editorBlueColor"), "return_color_high")}
    `;
  }

  private entityPicker(label: string, key: ConfigKey, required = false) {
    return html`
      <ha-entity-picker
        class="field"
        .hass=${this.hass}
        .label=${label}
        .value=${this.config?.[key] ?? ""}
        .required=${required}
        allow-custom-entity
        @value-changed=${(event: CustomEvent) => this.updateConfig(key, event.detail.value)}
      ></ha-entity-picker>
    `;
  }

  private textField(label: string, key: ConfigKey) {
    return html`
      <label class="native-field">
        <span>${label}</span>
        <input
          type="color"
          .value=${String(this.config?.[key] ?? "#ffffff")}
          @input=${(event: InputEvent) => this.updateConfig(key, this.eventValue(event))}
          @change=${(event: Event) => this.updateConfig(key, this.eventValue(event))}
        />
      </label>
    `;
  }

  private numberField(label: string, key: ConfigKey) {
    return html`
      <label class="native-field">
        <span>${label}</span>
        <input
        type="number"
        step="0.1"
        .value=${String(this.config?.[key] ?? "")}
        @input=${(event: InputEvent) => this.updateNumberConfig(key, this.eventValue(event))}
        @change=${(event: Event) => this.updateNumberConfig(key, this.eventValue(event))}
        />
      </label>
    `;
  }

  private eventValue(event: Event): string {
    return String((event.target as HTMLInputElement).value ?? "");
  }

  private updateNumberConfig(key: ConfigKey, rawValue: unknown): void {
    const value = Number.parseFloat(String(rawValue ?? "").replace(",", "."));
    this.updateConfig(key, Number.isFinite(value) ? value : undefined);
  }

  private updateConfig(key: ConfigKey, value: unknown): void {
    if (!this.config) {
      return;
    }

    const nextConfig: Partial<DistrictHeatingCardConfig> = {
      ...this.config,
      [key]: value === "" ? undefined : value,
    };

    Object.keys(nextConfig).forEach((configKey) => {
      if (nextConfig[configKey as ConfigKey] === undefined) {
        delete nextConfig[configKey as ConfigKey];
      }
    });

    this.config = nextConfig as DistrictHeatingCardConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "district-heating-card-editor": DistrictHeatingCardEditor;
  }
}

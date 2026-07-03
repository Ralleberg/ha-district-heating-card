import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

    return html`
      <div class="section">Temperaturer</div>
      ${this.entityPicker("Fremløbstemperatur", "supply_temp_entity", true)}
      ${this.entityPicker("Returtemperatur", "return_temp_entity", true)}
      ${this.entityPicker("Delta T", "delta_t_entity")}

      <div class="section">Valgfrie driftstal</div>
      ${this.entityPicker("Effekt", "power_entity")}
      ${this.entityPicker("Energi i dag", "energy_today_entity")}
      ${this.entityPicker("Forbrug i år", "yearly_energy_entity")}

      <div class="section">Input til vurdering</div>
      ${this.entityPicker("Udetemperatur", "outdoor_temp_entity")}
      ${this.entityPicker("Indetemperatur", "indoor_temp_entity")}
      ${this.entityPicker("Gennemsnitlig Delta T", "average_delta_t_entity")}

      <div class="section">Effektivitet</div>
      ${this.numberField("Minimum Delta T", "min_delta_t")}
      ${this.numberField("God Delta T", "good_delta_t")}
      ${this.numberField("Maks returtemperatur", "max_return_temp")}
      ${this.numberField("God returtemperatur", "good_return_temp")}

      <div class="section">Fremløb farveskala</div>
      ${this.numberField("Lys farve ved °C", "supply_color_low_temp")}
      ${this.textField("Lys farve", "supply_color_low")}
      ${this.numberField("Mørk farve ved °C", "supply_color_high_temp")}
      ${this.textField("Mørk farve", "supply_color_high")}

      <div class="section">Returløb farveskala</div>
      ${this.numberField("Lys farve ved °C", "return_color_low_temp")}
      ${this.textField("Lys farve", "return_color_low")}
      ${this.numberField("Blå farve ved °C", "return_color_high_temp")}
      ${this.textField("Blå farve", "return_color_high")}
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

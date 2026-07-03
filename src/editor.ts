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
      ${this.textField("Titel", "name")}

      <div class="section">Temperaturer</div>
      ${this.entityPicker("Fremløbstemperatur", "supply_temp_entity", true)}
      ${this.entityPicker("Returtemperatur", "return_temp_entity", true)}
      ${this.entityPicker("Delta T", "delta_t_entity")}

      <div class="section">Valgfrie målinger</div>
      ${this.entityPicker("Effekt", "power_entity")}
      ${this.entityPicker("Energi i dag", "energy_today_entity")}
      ${this.entityPicker("Forbrug i år", "yearly_energy_entity")}
      ${this.entityPicker("Udetemperatur", "outdoor_temp_entity")}
      ${this.entityPicker("Indetemperatur", "indoor_temp_entity")}
      ${this.entityPicker("Gennemsnitlig Delta T", "average_delta_t_entity")}

      <div class="section">Effektivitet</div>
      ${this.numberField("Minimum Delta T", "min_delta_t")}
      ${this.numberField("God Delta T", "good_delta_t")}
      ${this.numberField("Maks returtemperatur", "max_return_temp")}
      ${this.numberField("God returtemperatur", "good_return_temp")}

      <div class="section">Visning</div>
      ${this.toggle("Vis driftsstatus", "show_status")}
      ${this.toggle("Vis ekstra målinger", "show_secondary")}
      ${this.toggle("Vis effektivitetspanel", "show_diagnostics")}
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
      <ha-textfield
        class="field"
        .label=${label}
        .value=${this.config?.[key] ?? ""}
        @input=${(event: InputEvent) => this.updateConfig(key, (event.currentTarget as HTMLInputElement).value)}
      ></ha-textfield>
    `;
  }

  private numberField(label: string, key: ConfigKey) {
    return html`
      <ha-textfield
        class="field"
        type="number"
        .label=${label}
        .value=${String(this.config?.[key] ?? "")}
        @input=${(event: InputEvent) => {
          const value = Number.parseFloat((event.currentTarget as HTMLInputElement).value);
          this.updateConfig(key, Number.isFinite(value) ? value : undefined);
        }}
      ></ha-textfield>
    `;
  }

  private toggle(label: string, key: ConfigKey) {
    return html`
      <div class="toggle">
        <span>${label}</span>
        <ha-switch
          .checked=${this.config?.[key] !== false}
          @change=${(event: Event) => this.updateConfig(key, (event.currentTarget as HTMLInputElement).checked)}
        ></ha-switch>
      </div>
    `;
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

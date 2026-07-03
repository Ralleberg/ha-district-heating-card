export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  localize?: (key: string, ...args: unknown[]) => string;
}

export interface DistrictHeatingCardConfig {
  type: string;
  name?: string;
  supply_temp_entity?: string;
  return_temp_entity?: string;
  delta_t_entity?: string;
  power_entity?: string;
  energy_today_entity?: string;
  yearly_energy_entity?: string;
  outdoor_temp_entity?: string;
  indoor_temp_entity?: string;
  average_delta_t_entity?: string;
  min_delta_t?: number;
  good_delta_t?: number;
  max_return_temp?: number;
  good_return_temp?: number;
  supply_color_low_temp?: number;
  supply_color_high_temp?: number;
  supply_color_low?: string;
  supply_color_high?: string;
  return_color_low_temp?: number;
  return_color_high_temp?: number;
  return_color_low?: string;
  return_color_high?: string;
  show_status?: boolean;
  show_secondary?: boolean;
  show_diagnostics?: boolean;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: DistrictHeatingCardConfig): void;
}

export type Severity = "excellent" | "good" | "warning" | "critical" | "unknown";

export interface EfficiencyResult {
  severity: Severity;
  title: string;
  message: string;
  deltaLabel: string;
  returnLabel: string;
  deltaScore: number;
  returnScore: number;
}

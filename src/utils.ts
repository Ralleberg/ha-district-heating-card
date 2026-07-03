import { translate } from "./i18n";
import type { DistrictHeatingCardConfig, EfficiencyResult, HassEntity, HomeAssistant, Severity, TranslationLanguage } from "./types";

const UNAVAILABLE_STATES = new Set(["unknown", "unavailable", "none", ""]);

export const DEFAULT_CONFIG = {
  min_delta_t: 20,
  good_delta_t: 30,
  max_return_temp: 45,
  good_return_temp: 35,
  supply_color_low_temp: 50,
  supply_color_high_temp: 75,
  supply_color_low: "#f28aa0",
  supply_color_high: "#8f2438",
  return_color_low_temp: 0,
  return_color_high_temp: 35,
  return_color_low: "#f4f7fb",
  return_color_high: "#3f6ed6",
  show_status: true,
  show_secondary: true,
  show_diagnostics: true,
} satisfies Partial<DistrictHeatingCardConfig>;

export function mergeConfig(config: DistrictHeatingCardConfig): Required<Pick<DistrictHeatingCardConfig,
  | "min_delta_t"
  | "good_delta_t"
  | "max_return_temp"
  | "good_return_temp"
  | "supply_color_low_temp"
  | "supply_color_high_temp"
  | "supply_color_low"
  | "supply_color_high"
  | "return_color_low_temp"
  | "return_color_high_temp"
  | "return_color_low"
  | "return_color_high"
  | "show_status"
  | "show_secondary"
  | "show_diagnostics"
>> & DistrictHeatingCardConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
  };
}

export function entity(hass: HomeAssistant | undefined, entityId: string | undefined): HassEntity | undefined {
  if (!hass || !entityId) {
    return undefined;
  }

  return hass.states[entityId];
}

export function numericState(hass: HomeAssistant | undefined, entityId: string | undefined): number | undefined {
  const state = entity(hass, entityId)?.state?.trim().toLowerCase();
  if (!state || UNAVAILABLE_STATES.has(state)) {
    return undefined;
  }

  const parsed = Number.parseFloat(state.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function unit(hass: HomeAssistant | undefined, entityId: string | undefined, fallback: string): string {
  const measurementUnit = entity(hass, entityId)?.attributes.unit_of_measurement;
  return typeof measurementUnit === "string" && measurementUnit.length > 0 ? measurementUnit : fallback;
}

export function formatValue(value: number | undefined, unitLabel: string, fractionDigits = 1): string {
  if (value === undefined) {
    return "--";
  }

  return `${value.toFixed(fractionDigits)} ${unitLabel}`;
}

export function computeDeltaT(hass: HomeAssistant | undefined, config: DistrictHeatingCardConfig): number | undefined {
  const explicitDelta = numericState(hass, config.delta_t_entity);
  if (explicitDelta !== undefined) {
    return explicitDelta;
  }

  const supply = numericState(hass, config.supply_temp_entity);
  const returned = numericState(hass, config.return_temp_entity);
  if (supply === undefined || returned === undefined) {
    return undefined;
  }

  return supply - returned;
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.min(Math.max(value, min), max);
}

export function efficiency(
  config: DistrictHeatingCardConfig,
  deltaT: number | undefined,
  returnTemp: number | undefined,
  language: TranslationLanguage = "da",
): EfficiencyResult {
  const merged = mergeConfig(config);

  if (deltaT === undefined || returnTemp === undefined) {
    return {
      severity: "unknown",
      title: translate(language, "missingData"),
      message: translate(language, "missingMessage"),
      deltaLabel: translate(language, "unknown"),
      returnLabel: translate(language, "unknown"),
      deltaScore: 0,
      returnScore: 0,
    };
  }

  const deltaScore = clamp(((deltaT - merged.min_delta_t) / (merged.good_delta_t - merged.min_delta_t || 1)) * 100);
  const returnScore = clamp(((merged.max_return_temp - returnTemp) / (merged.max_return_temp - merged.good_return_temp || 1)) * 100);
  const score = deltaScore * 0.55 + returnScore * 0.45;
  const severity = severityFromScore(score, deltaT, returnTemp, merged.min_delta_t, merged.max_return_temp);
  const message = efficiencyMessage(language, severity, deltaT, returnTemp, merged.min_delta_t, merged.good_delta_t, merged.max_return_temp, merged.good_return_temp);

  const copy = {
    excellent: {
      title: translate(language, "excellentTitle"),
    },
    good: {
      title: translate(language, "goodTitle"),
    },
    warning: {
      title: translate(language, "warningTitle"),
    },
    critical: {
      title: translate(language, "criticalTitle"),
    },
    unknown: {
      title: translate(language, "missingData"),
    },
  } satisfies Record<Severity, Pick<EfficiencyResult, "title">>;

  return {
    severity,
    ...copy[severity],
    message,
    deltaLabel: deltaT >= merged.good_delta_t ? translate(language, "veryGood") : deltaT >= merged.min_delta_t ? translate(language, "good") : translate(language, "low"),
    returnLabel: returnTemp <= merged.good_return_temp ? translate(language, "veryGood") : returnTemp <= merged.max_return_temp ? translate(language, "good") : translate(language, "high"),
    deltaScore,
    returnScore,
  };
}

function efficiencyMessage(
  language: TranslationLanguage,
  severity: Severity,
  deltaT: number,
  returnTemp: number,
  minDeltaT: number,
  goodDeltaT: number,
  maxReturnTemp: number,
  goodReturnTemp: number,
): string {
  const lowDelta = deltaT < minDeltaT;
  const highReturn = returnTemp > maxReturnTemp;
  const notGoodDelta = deltaT < goodDeltaT;
  const notGoodReturn = returnTemp > goodReturnTemp;
  const values = {
    minDeltaT: minDeltaT.toFixed(1),
    goodDeltaT: goodDeltaT.toFixed(1),
    maxReturnTemp: maxReturnTemp.toFixed(1),
    goodReturnTemp: goodReturnTemp.toFixed(1),
  };

  if (lowDelta && highReturn) {
    return translate(language, "lowDeltaHighReturn", values);
  }

  if (lowDelta) {
    return translate(language, "lowDelta", values);
  }

  if (highReturn) {
    return translate(language, "highReturn", values);
  }

  if (severity === "excellent") {
    return translate(language, "excellentMessage", values);
  }

  if (severity === "good") {
    return translate(language, "goodMessage", values);
  }

  if (notGoodDelta && notGoodReturn) {
    return translate(language, "notGoodBoth", values);
  }

  if (notGoodDelta) {
    return translate(language, "notGoodDelta", values);
  }

  if (notGoodReturn) {
    return translate(language, "notGoodReturn", values);
  }

  return translate(language, "withinLimits", values);
}

export function flowColor(
  value: number | undefined,
  lowTemp: number,
  highTemp: number,
  lowColor: string,
  highColor: string,
): string {
  if (value === undefined) {
    return lowColor;
  }

  const ratio = clamp((value - lowTemp) / (highTemp - lowTemp || 1), 0, 1);
  return mixHex(lowColor, highColor, ratio);
}

export function alphaHex(color: string, alpha: number): string {
  const rgb = parseHex(color);
  if (!rgb) {
    return color;
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp(alpha, 0, 1)})`;
}

function mixHex(left: string, right: string, ratio: number): string {
  const from = parseHex(left);
  const to = parseHex(right);
  if (!from || !to) {
    return ratio < 0.5 ? left : right;
  }

  const r = Math.round(from.r + (to.r - from.r) * ratio);
  const g = Math.round(from.g + (to.g - from.g) * ratio);
  const b = Math.round(from.b + (to.b - from.b) * ratio);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function parseHex(color: string): { r: number; g: number; b: number } | undefined {
  const normalized = color.trim().replace("#", "");
  const expanded = normalized.length === 3
    ? normalized.split("").map((part) => `${part}${part}`).join("")
    : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    return undefined;
  }

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
}

function toHex(value: number): string {
  return value.toString(16).padStart(2, "0");
}

function severityFromScore(score: number, deltaT: number, returnTemp: number, minDeltaT: number, maxReturnTemp: number): Severity {
  if (deltaT < minDeltaT * 0.75 || returnTemp > maxReturnTemp * 1.2) {
    return "critical";
  }

  if (score >= 86) {
    return "excellent";
  }

  if (score >= 62) {
    return "good";
  }

  if (score >= 38) {
    return "warning";
  }

  return "critical";
}

export function lastUpdated(hass: HomeAssistant | undefined, config: DistrictHeatingCardConfig): string | undefined {
  const candidates = [
    entity(hass, config.supply_temp_entity)?.last_updated,
    entity(hass, config.return_temp_entity)?.last_updated,
    entity(hass, config.delta_t_entity)?.last_updated,
  ].filter(Boolean) as string[];

  const newest = candidates
    .map((candidate) => new Date(candidate))
    .filter((date) => Number.isFinite(date.getTime()))
    .sort((left, right) => right.getTime() - left.getTime())[0];

  if (!newest) {
    return undefined;
  }

  return newest.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

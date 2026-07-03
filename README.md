# ha-district-heating-card

A modern Home Assistant Lovelace card for district heating systems. It visualizes supply and return temperatures, Delta T cooling, optional energy metrics and an automatic efficiency assessment in a responsive SCADA/HMI inspired design.

## Features

- Animated red supply pipe and blue return pipe.
- Large Delta T display.
- Automatic Delta T calculation from supply minus return when no Delta T entity is configured.
- Efficiency assessment based on Delta T and return temperature.
- Optional power, daily energy, yearly energy, indoor temperature, outdoor temperature and average Delta T sensors.
- Visual editor for selecting entities and tuning thresholds.
- Theme-aware Lit/TypeScript implementation.
- HACS-compatible release workflow.

## Installation

### HACS

1. Add this repository as a custom HACS frontend repository.
2. Install `District Heating Card`.
3. Add the resource if Home Assistant does not add it automatically:

```yaml
url: /hacsfiles/ha-district-heating-card/ha-district-heating-card.js
type: module
```

### Manual

1. Download `ha-district-heating-card.js` from the latest GitHub release.
2. Copy it to `www/community/ha-district-heating-card/`.
3. Add this Lovelace resource:

```yaml
url: /local/community/ha-district-heating-card/ha-district-heating-card.js
type: module
```

## Example

```yaml
type: custom:ha-district-heating-card
name: Fjernvarme
supply_temp_entity: sensor.fjernvarme_fremlob
return_temp_entity: sensor.fjernvarme_returlob
power_entity: sensor.fjernvarme_effekt
energy_today_entity: sensor.fjernvarme_energi_i_dag
yearly_energy_entity: sensor.fjernvarme_forbrug_aar
outdoor_temp_entity: sensor.udetemperatur
indoor_temp_entity: sensor.indetemperatur
average_delta_t_entity: sensor.fjernvarme_delta_t_gennemsnit
min_delta_t: 20
good_delta_t: 30
max_return_temp: 45
good_return_temp: 35
```

If `delta_t_entity` is omitted, the card calculates Delta T as:

```text
supply_temp_entity - return_temp_entity
```

## Configuration

| Option | Required | Default | Description |
| --- | --- | --- | --- |
| `type` | Yes |  | `custom:ha-district-heating-card` |
| `name` | No | `Fjernvarme` | Card title |
| `supply_temp_entity` | Yes |  | Supply temperature sensor |
| `return_temp_entity` | Yes |  | Return temperature sensor |
| `delta_t_entity` | No |  | Optional Delta T sensor |
| `power_entity` | No |  | Current power sensor |
| `energy_today_entity` | No |  | Energy used today |
| `yearly_energy_entity` | No |  | Yearly energy usage |
| `outdoor_temp_entity` | No |  | Outdoor temperature |
| `indoor_temp_entity` | No |  | Indoor temperature |
| `average_delta_t_entity` | No |  | Average Delta T |
| `min_delta_t` | No | `20` | Lowest acceptable Delta T |
| `good_delta_t` | No | `30` | Delta T considered good |
| `max_return_temp` | No | `45` | Highest acceptable return temperature |
| `good_return_temp` | No | `35` | Return temperature considered good |
| `show_status` | No | `true` | Show current operation indicator |
| `show_secondary` | No | `true` | Show optional lower metric row |
| `show_diagnostics` | No | `true` | Show efficiency diagnostics |

## Development

```bash
npm install
npm run build
```

The built Home Assistant module is written to:

```text
ha-district-heating-card.js
```

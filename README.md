# District Heating Card

![District Heating Card](assets/district-heating-card-preview.png)

<p align="center">

<a href="https://github.com/Ralleberg/ha-district-heating-card/releases">
  <img src="https://img.shields.io/github/v/release/Ralleberg/ha-district-heating-card?style=for-the-badge" alt="Latest Release">
</a>

<a href="https://github.com/Ralleberg/ha-district-heating-card/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/Ralleberg/ha-district-heating-card?style=for-the-badge" alt="License">
</a>

<a href="https://github.com/Ralleberg/ha-district-heating-card/releases">
  <img src="https://img.shields.io/github/downloads/Ralleberg/ha-district-heating-card/total?style=for-the-badge" alt="Downloads">
</a>

<a href="https://www.home-assistant.io/">
  <img src="https://img.shields.io/badge/Home%20Assistant-Dashboard%20Card-41BDF5?style=for-the-badge&logo=homeassistant" alt="Home Assistant">
</a>

</p>

<p align="center">

<a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=Ralleberg&repository=ha-district-heating-card&category=dashboard">
<img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Add to HACS">
</a>

</p>

---

## Overview

**District Heating Card** is a modern Home Assistant Lovelace card for visualizing district heating systems in a clean, SCADA-inspired interface.

The card combines supply and return temperatures, Delta T cooling performance and optional energy metrics into a single dashboard component, making it easy to monitor both comfort and heating efficiency at a glance.

Designed to be vendor-neutral, the card works with any district heating installation that exposes the relevant Home Assistant entities.

---

# Features

- 🔥 Animated supply flow
- ❄️ Animated return flow
- 📈 Large Delta T display
- ♻️ Automatic efficiency assessment
- 🏠 Indoor and outdoor temperature support
- ⚡ Optional power display
- 📅 Daily energy consumption
- 📆 Yearly energy consumption
- 📊 Average Delta T support
- 🧠 Automatic Delta T calculation when no Delta T sensor is available
- 🌡️ Automatic seasonal efficiency assessment using Home Assistant history
- 🖱️ Clickable values opening Home Assistant more-info dialogs
- 🎨 Theme-aware design
- 📱 Responsive layout
- 🌍 Danish and English translations
- 🚀 HACS compatible

---

# Installation

## HACS (Recommended)

Click below to add the repository directly to HACS.

<p align="center">

<a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=Ralleberg&repository=ha-district-heating-card&category=dashboard">
<img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Add to HACS">
</a>

</p>

After adding the repository:

1. Open **HACS**
2. Install **District Heating Card**
3. Refresh your browser
4. Add the card to your dashboard

---

## Manual Installation

Download the latest release and copy

```

ha-district-heating-card.js

```

to

```

/config/www/community/ha-district-heating-card/

```

Then add the resource:

```yaml
url: /local/community/ha-district-heating-card/ha-district-heating-card.js
type: module
```

Refresh your browser afterwards.

---

# Example Configuration

```yaml
type: custom:ha-district-heating-card

name: District Heating

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

If `delta_t_entity` is not configured, the card automatically calculates:

```text
Delta T = Supply Temperature − Return Temperature
```

---

# Configuration

## Required Entities

| Entity | Description |
|----------|-------------|
| `supply_temp_entity` | Supply temperature |
| `return_temp_entity` | Return temperature |

---

## Optional Entities

| Entity | Description |
|----------|-------------|
| `delta_t_entity` | Measured Delta T |
| `power_entity` | Current heating power |
| `energy_today_entity` | Daily energy consumption |
| `yearly_energy_entity` | Yearly energy consumption |
| `outdoor_temp_entity` | Outdoor temperature |
| `indoor_temp_entity` | Indoor temperature |
| `average_delta_t_entity` | Average Delta T |

---

## Thresholds

| Option | Default | Description |
|----------|----------|-------------|
| `min_delta_t` | 20 | Lowest acceptable Delta T |
| `good_delta_t` | 30 | Good Delta T |
| `max_return_temp` | 45 | Highest acceptable return temperature |
| `good_return_temp` | 35 | Good return temperature |

---

## Pipe Colors

Both supply and return flow colors can be customized to match your installation or Home Assistant theme.

| Option | Default |
|----------|----------|
| `supply_color_low` | `#f28aa0` |
| `supply_color_high` | `#8f2438` |
| `return_color_low` | `#f4f7fb` |
| `return_color_high` | `#3f6ed6` |

---

# How Efficiency Is Calculated

The card combines multiple indicators to estimate district heating performance.

These include:

- Delta T cooling
- Return temperature
- Outdoor temperature
- Indoor temperature
- Seasonal operating conditions
- Home Assistant history (when available)

When Home Assistant recorder statistics are available, the card evaluates heating performance using rolling 24-hour averages ending at the latest district heating update, providing a more stable efficiency assessment than instantaneous values alone.

---

# Development

Install dependencies:

```bash
npm install
```

Run a production build:

```bash
npm run build
```

The compiled dashboard card is written to:

```text
ha-district-heating-card.js
```

---

# Contributing

Contributions are always welcome.

Bug reports, feature requests and pull requests are greatly appreciated.

---

# License

Released under the **MIT License**.
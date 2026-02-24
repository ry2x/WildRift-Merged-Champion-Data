# WildRift Merged Champion Data API

[![npm version](https://img.shields.io/npm/v/wildrift-merged-champion-types.svg)](https://www.npmjs.com/package/wildrift-merged-champion-types)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An API that integrates champion data from League of Legends: Wild Rift and League of Legends.
Automatically updates daily with support for multiple languages ✨

A type definition package is also available on npm: [wildrift-merged-champion-types](https://www.npmjs.com/package/wildrift-merged-champion-types).

## Overview

This API integrates data from the following sources:

- 👾 Riot Games Data Dragon API - LOL champion information
- 🎮 Chinese Wild Rift API - Wild Rift champion information

## Endpoints 🎯

### Base URL

```url
https://ry2x.github.io/WildRift-Merged-Champion-Data
```

### Fetching Champion Data

Get champion data in various languages ✨

```url
GET /data_{lang}.json
```

**Supported Language Codes**:

- 🇺🇸 en_US - English
- 🇯🇵 ja_JP - Japanese
- 🇰🇷 ko_KR - Korean
- 🇨🇳 zh_CN - Simplified Chinese
- 🇹🇼 zh_TW - Traditional Chinese
- 🇪🇸 es_ES - Spanish
- 🇫🇷 fr_FR - French
- 🇩🇪 de_DE - German
- 🇮🇹 it_IT - Italian
- 🇵🇱 pl_PL - Polish
- 🇧🇷 pt_BR - Portuguese
- 🇷🇺 ru_RU - Russian
- 🇹🇷 tr_TR - Turkish
- 🇹🇭 th_TH - Thai
- 🇻🇳 vi_VN - Vietnamese

### Usage Example

```javascript
// Fetch English data
fetch('https://ry2x.github.io/WildRift-Merged-Champion-Data/data_en_US.json');
```

### Requesting New Languages 🌍

To request support for additional languages:

1. **Create a GitHub Issue**

   - Add the "New Language Request" label
   - Specify the desired language
   - [Create an issue here](https://github.com/ry2x/WildRift-Merged-Champion-Data/issues/new)

2. **Submit a Pull Request**
   - Add your desired language code to the `TARGET_LANGUAGES` array in `config.json`
   - Include language details in the PR description

```json
{
  "TARGET_LANGUAGES": [
    "en_US",
    "ja_JP"
    // Add your desired language here!
  ]
}
```

## Data Update Process 🔄

This API's data is automatically updated daily using GitHub Actions.

### Update Schedule

- 🕐 Runs daily at 00:00 UTC
- 🔄 Fetches latest data from Riot Games Data Dragon and Wild Rift APIs
- 📦 Generates JSON files for each language
- 🚀 Auto-deploys to GitHub Pages

### Update Flow

1. **Data Fetching**

   - Check latest version from Riot Games Data Dragon API
   - Fetch champion data from both LOL and Wild Rift

2. **Data Integration**

   - Merge LOL and Wild Rift data
   - Convert champion information to `MergedChamp` format

3. **File Generation**

   - Generate JSON files for each language
   - Save as `data_{lang}.json` to [gh-pages](https://github.com/ry2x/WildRift-Merged-Champion-Data/tree/gh-pages) branch

4. **Deployment**
   - Auto-deploy to GitHub Pages
   - Updates reflect immediately

### Monitoring Updates

- 🔍 Check update status in [Actions](https://github.com/ry2x/WildRift-Merged-Champion-Data/actions) tab
- 💡 Failed updates automatically retry
- ⚠️ Issues auto-generated for errors

## Response Structure 📦

Each language JSON file returns an array of champion data.

### Response Type Definition

```typescript
type Response = MergedChamp[];

interface MergedChamp {
  id: string; // Champion ID (e.g., "Ahri")
  hero_id: number; // Wild Rift hero ID
  key: number; // LOL champion key
  name: string; // Champion name
  title: string; // Champion title
  describe: string; // Champion description
  roles: Roles[]; // Champion roles
  type: string; // Champion type
  is_wr: boolean; // Available in Wild Rift
  lanes: Lanes[]; // Recommended lanes
  is_free: boolean; // Currently free-to-play
  difficult: number; // Difficulty (1-3)
  damage: number; // Attack power (1-3)
  survive: number; // Survivability (1-3)
  utility: number; // Utility (1-3)
}

type Lanes = 'Mid' | 'Jungle' | 'Top' | 'Support' | 'AD';
type Roles = 'Fighter' | 'Mage' | 'Assassin' | 'Marksman' | 'Support' | 'Tank';
```

### Response Example

```json
[
  {
    "id": "Ahri",
    "hero_id": 103,
    "key": 103,
    "name": "Ahri",
    "title": "the Nine-Tailed Fox",
    "describe": "A fox-like vastaya who can manipulate magical energies",
    "roles": ["Mage", "Assassin"],
    "type": "AP",
    "is_wr": true,
    "lanes": ["Mid"],
    "is_free": false,
    "difficult": 2,
    "damage": 3,
    "survive": 2,
    "utility": 2
  }
  // ... other champion data
]
```

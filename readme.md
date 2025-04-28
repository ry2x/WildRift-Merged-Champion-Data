# WildRift Merged Champion Data API

> English version is from [here](https://github.com/ry2x/WildRift-Merged-Champion-Data/blob/master/readme_en.md)

League of Legends: Wild RiftとLeague of Legendsのチャンピオンデータを統合したAPIです。
毎日自動的にデータが更新され、複数の言語をサポートしています✨

## 概要

このAPIは以下のデータソースを統合しています：

- 👾 Riot Games Data Dragon API - LOLのチャンピオン情報
- 🎮 中国Wild Rift API - Wild Riftのチャンピオン情報

## エンドポイント 🎯

### ベースURL

```
https://ry2x.github.io/WildRift-Merged-Champion-Data
```

### チャンピオンデータの取得

各言語のチャンピオンデータを取得できます✨

```
GET /data_{lang}.json
```

**サポートされている言語コード**：

- 🇺🇸 en_US - English
- 🇯🇵 ja_JP - 日本語
- 🇰🇷 ko_KR - 한국어
- 🇨🇳 zh_CN - 简体中文
- 🇹🇼 zh_TW - 繁體中文
- 🇪🇸 es_ES - Español
- 🇫🇷 fr_FR - Français
- 🇩🇪 de_DE - Deutsch
- 🇮🇹 it_IT - Italiano
- 🇵🇱 pl_PL - Polski
- 🇧🇷 pt_BR - Português
- 🇷🇺 ru_RU - Русский
- 🇹🇷 tr_TR - Türkçe
- 🇹🇭 th_TH - ไทย
- 🇻🇳 vi_VN - Tiếng Việt

### 使用例

```
// 日本語のデータを取得
fetch('https://ry2x.github.io/WildRift-Merged-Champion-Data/data_ja_JP.json')
```

### 新しい言語のリクエスト 🌍

他の言語の追加を希望する場合は、以下のいずれかの方法で対応可能です：

1. **GitHub Issueを作成**

   - 「New Language Request」のラベルをつけて、希望する言語を記載してください✨
   - [Issue作成はこちら](https://github.com/ry2x/WildRift-Merged-Champion-Data/issues/new)

2. **Pull Requestを送る**
   - `config.json`の`TARGET_LANGUAGES`配列に希望する言語コードを追加
   - PRの説明に追加言語の詳細を記載してください💫

```json
{
  "TARGET_LANGUAGES": [
    "en_US",
    "ja_JP"
    // あなたの希望する言語をここに追加！
  ]
}
```

## データ更新の仕組み 🔄

このAPIのデータは、GitHub Actionsを使って毎日自動的に更新されています💫

### 更新タイミング

- 🕐 毎日00:00 UTC（日本時間09:00）に実行
- 🔄 Riot Games Data DragonとWild Rift APIから最新データを取得
- 📦 各言語のJSONファイルを生成
- 🚀 GitHub Pagesに自動デプロイ

### 更新の流れ

1. **データの取得**

   - Riot Games Data Dragon APIから最新バージョンを確認
   - LOLとWild Riftの両方からチャンピオンデータを取得

2. **データの統合**

   - LOLとWild Riftのデータをマージ
   - 各チャンピオンの情報を`MergedChamp`の形式に変換

3. **ファイルの生成**

   - 各言語ごとにJSONファイルを生成
   - [gh-pages](https://github.com/ry2x/WildRift-Merged-Champion-Data/tree/gh-pages)ブランチへ`data_{lang}.json`として保存

4. **デプロイ**

   - GitHub Pagesに自動デプロイ
   - 更新されたデータが即座に反映

### 更新状況の確認

- 🔍 [Actions](https://github.com/ry2x/WildRift-Merged-Champion-Data/actions)タブで更新状況を確認できます
- 💡 更新に失敗した場合は自動的に再試行されます
- ⚠️ エラーが発生した場合はIssueが自動生成されます

## レスポンスの構造 📦

各言語のJSONファイルは、チャンピオンデータの配列を返却します💫

### レスポンス型定義

```typescript
type Response = MergedChamp[];

interface MergedChamp {
  id: string; // チャンピオンID (例: "Ahri")
  hero_id: number; // Wild Rift用のヒーローID
  key: number; // LOL用のチャンピオンキー
  name: string; // チャンピオン名
  title: string; // チャンピオンタイトル
  describe: string; // チャンピオン説明
  roles: Roles[]; // チャンピオンの役割
  type: string; // チャンピオンタイプ
  is_wr: boolean; // Wild Riftに実装されているか
  lanes: Lanes[]; // 推奨レーン
  is_free: boolean; // 無料開放中かどうか
  difficult: number; // 難易度 (1-3)
  damage: number; // 攻撃力 (1-3)
  survive: number; // 生存力 (1-3)
  utility: number; // ユーティリティ (1-3)
}

type Lanes = 'Mid' | 'Jungle' | 'Top' | 'Support' | 'AD';
type Roles = 'Fighter' | 'Mage' | 'Assassin' | 'Marksman' | 'Support' | 'Tank';
```

### レスポンス例

```json
[
  {
    "id": "Ahri",
    "hero_id": 103,
    "key": 103,
    "name": "アーリ",
    "title": "九尾の狐",
    "describe": "魅惑的な魔力を操る九尾の狐",
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
  // ... 他のチャンピオンデータ
]
```

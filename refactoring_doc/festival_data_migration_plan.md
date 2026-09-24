# festival_data 形式変更に伴う移行実施計画書（シンプル化・コード削減版）

## 1. 概要と方針

ユーザーによる Excel データの正規化・改善に伴い、**「ワークアラウンド（小手先の補正コード）を追加するのではなく、不要なコードを徹底的に削ぎ落としてシンプルにする」** 方針で移行を実施します。

---

## 2. データの最新状態とコード削減方針

| 項目 | 以前の想定・ワークアラウンド | 最新データでの根本解決とコード削減 |
| :--- | :--- | :--- |
| **芸能ID & 写真** | コード内で `geino-miyase` $\leftrightarrow$ `geinou` のエイリアス補正を書く | **IDが `celeb` に統一されたため、画像ファイルを `celeb.png` にリネーム**。<br>$\to$ コード側のエイリアス補正を完全排除。 |
| **模擬店ブース** | 同一ID（お嬢様サークル）のマージ処理コードを書く | **Excel上で `food-ojosama-circle2` にIDが分離された**。<br>$\to$ マージ処理コードは一切不要。通常の1件として純粋に処理。 |
| **画像表記揺れ** | `modules/festival-data.ts` 内で合唱部・吹奏楽部の長音表記揺れエイリアス補正（約20行） | **画像ファイル側をデータID（`stage-konsei-gassho-bu.png`等）にリネーム**。<br>$\to$ モジュール内のエイリアス補正コードを**全削除**。 |
| **SubCategory** | 各所で `subCategory` を生成・参照するコード | **【方針B】`subCategory` を完全撤廃**。<br>$\to$ 型定義、生成ロジック、UIバッジを**全削除**。 |
| **場内マップ判定** | `e.room?.includes('8-101')` などの泥臭い文字列判定 | **`location` シートの `building` と `floor` で直接判定**。<br>$\to$ 長大な正規表現・文字列判定コードを**全削除**。 |

---

## 3. ファイル構造と命名規約

- **JSONファイル名**: シート名と完全一致
  - `mogiten.json`
  - `bunkakan.json`
  - `music.json`
  - `geinou.json`
  - `location.json`
  - `timetable.json`
  - *(旧 `food-booths.json`, `exhibitions.json`, `performances.json` は削除)*
- **タイムテーブルデータ層**:
  - `schedule.ts` $\to$ **`timetable.ts`** にリネーム

---

## 4. 実施作業ステップ

### Step 1: 写真ファイルのリネーム（コード補正の全廃）
1. `public/images/events/geinou.png` $\to` `celeb.png` に変更。
2. 表記揺れ画像のリネーム:
   - `stage-konsei-gasshou-bu.png` $\to$ `stage-konsei-gassho-bu.png`
   - `stage-suisougaku-bu.png` $\to$ `stage-suisogaku-bu.png`
3. お嬢様サークル2用の画像用意:
   - `food-ojosama-circle2.png`（`food-ojosama-circle.png` をコピー）

### Step 2: `modules/festival-data.ts` の大掃除・シンプル化
1. 新シート名（`mogiten`, `bunkakan`, `music`, `geinou`, `location`, `timetable`）を各JSONへそのまま出力。
2. `scanEventImages` 内の「表記揺れエイリアス」「同一団体のフォールバック紐付け」コードを**すべて削除**（画像ファイル名とIDが完全一致するため不要）。

### Step 3: `app/data/timetable.ts`（旧 `schedule.ts`）の実装
1. `timetable.json` をロード。
2. `locationId` からレーン（`outdoor`, `indoor`, `chapel`, `gym`, `bldg1`）を直接マップ。
3. `day`（`1`, `2`）を `DAY1` / `DAY2` に正規化。

### Step 4: `app/data/events.ts` のシンプル化
1. 新JSON（`mogiten`, `bunkakan`, `music`, `geinou`, `location`）をロード。
2. `LocationItem` を用いて、`locationId` から会場名・建物・フロアを付与。
3. `subCategory` を型および生成処理から**全削除**。
4. `timetable` スロットにタイトル・団体名・会場名をIDベースでセット。

### Step 5: `app/data/map-buildings.ts` のクリーン化
1. 建物・フロア判定を `e.building === '8号館' && e.floor === 2` 等の直接判定に簡素化。
2. `getEventsByTentNo` を `e.locationId === 'loc-tent-XX'` で直接判定に簡素化。

### Step 6: UIコンポーネントの調整（不要コード削除）
1. `EventCard.vue`: `sub-chip-header` を削除。
2. `events/[id].vue`: `sub-badge` および `{{ event.categoryRaw }} / {{ event.subCategory }}` を削除。
3. `events/index.vue`: `subCategory` による検索コードを削除。
4. `schedule.vue`: `~/data/timetable` からのインポートに更新。

### Step 7: ビルド & 静的生成（SSG）検証
1. `npm run build` を実行。
2. 警告0件で全ページが完全に生成されることを確認。

# タイムテーブルページ (`app/pages/schedule.vue`) 要約 & リファクタリング指針

本ドキュメントは、タイムテーブル画面（`/schedule`）の実装仕様、設計思想、インタラクション設計、および今後のリファクタリングポイントをまとめたものです。

---

## 1. ページ概要 & 主な機能

- **目的:** 2日間のステージ企画・音楽ライブ・演舞など全33プログラムのタイムテーブルを直感的に閲覧・検索可能にする。
- **表示形態:** **タイムグリッド表示専用**（以前検討された「リスト形式」はユーザー体験の統一とシンプル化のため完全撤廃済み）。
- **会場レーン構成（全5会場に完全分離）:**
  1. **屋外ステージ**（体育館横 芝生広場）
  2. **屋内ステージ**（SCC 4階 ベンネットホール）
  3. **チャペル**（礼拝堂）
  4. **体育館**（よさこい演舞等）
  5. **1号館前**（セブンイレブン棟前：合気道演武等）

---

## 2. 実装されたコア設計 & UI/UX

### 2.1 境界線を跨ぐ1時間グリッドデザイン
- 時間軸は 10:00 〜 18:00（1時間あたり 110px、1分あたり 約1.83px）。
- 従来の「枠に押し込めるデザイン」ではなく、開始時刻・終了時刻に合わせてグリッド線を跨いで正確な縦幅で描画。
- **見切れ防止マージン:**
  - `GRID_OFFSET_TOP = 40px`、`GRID_OFFSET_BOTTOM = 100px` を確保し、10:00 と 18:00 のラベルが見切れない安全領域を担保。

### 2.2 横スクロールのスコープ制御 ＆ Sticky時間軸
- **問題と対策:**
  CSS Grid のデフォルト（`min-width: auto`）により親コンテナが押し広げられて画面全体が横スクロールする問題を防止。
  - 親ラッパー（`.page-container`, `.grid-view-wrapper`, `.timetable-grid-section`）に `min-width: 0; max-width: 100%; overflow: hidden;` を適用。
  - **横スクロールが発生するのはタイムテーブル本体（`.timetable-scroll-container`）の内部のみに限定**。
- **Sticky 時間軸:**
  左端の時間軸列（`time-axis-lane` およびヘッダーの `time-header-cell`）に `position: sticky; left: 0;` を適用し、どの会場列まで横スクロールしても現在時刻が常に左側に固定表示される。

### 2.3 プログラムブロックの展開（ポップアップ）制御
- **`is-compact` フラグの撤廃と `min-height` 設計:**
  - 各カードにインラインスタイルで `height: [計算高]px; min-height: [計算高]px;` を設定。
  - ホバー時（`:hover`）およびタップアクティブ時（`.is-active`）に `height: auto !important; overflow: visible !important;` を適用。
  - **長時間アイテム（よさこい等 120分 = 200px）:**
    中身のテキスト量が少なくても `min-height: 200px` が効くため、高さが縮小せず本来のスケールを完全維持。
  - **短時間アイテム（パイプオルガン演奏等 15分 = 34px）:**
    `height: auto !important` により、中身（時間・タイトル・出演者・詳細ボタン＝約105px）に合わせて自然に縦展開。
- **「詳細を見る →」ボタンの初期非表示 ＆ アニメーション出現:**
  - 初期状態（非ホバー・非アクティブ）: `max-height: 0; opacity: 0; transform: translateY(6px); pointer-events: none;` で完全に非表示。
  - 展開時: `max-height: 48px; opacity: 1; transform: translateY(0); pointer-events: auto;` で下からスッとスライド＆フェードイン。
- **デバイス別の操作ロジック:**
  - **PC（マウス端末 / `(hover: hover) and (pointer: fine)`）:**
    カーソルを乗せるとホバー展開。クリックすると **1発で即座に対象企画の詳細ページへ遷移**。
  - **スマホ・タブレット（タッチ端末）:**
    タップで対象カードが最前面（`z-index: 50`）に展開・固定。もう一度タップまたはボタン押下で詳細へ遷移。
    **背景や他のカードをタップすると自動的に展開解除**（`window.addEventListener('click', closeActiveSlot)`）。

---

## 3. リファクタリング時の留意点

1. **コンポーネントの分割:**
   現在 `schedule.vue` が 700行を超えているため、以下の粒度でコンポーネント化を推奨：
   - `components/schedule/ScheduleDayTabs.vue`: 日程切り替えタブ
   - `components/schedule/ScheduleGrid.vue`: グリッド背景線・時間軸・会場列のレイアウト
   - `components/schedule/ScheduleSlotCard.vue`: 個々の企画カード（展開ロジック・アニメーション）
2. **CSS プロパティの重複指定の禁止:**
   `height: auto !important` の前後に不要なベンダープレフィックス（`-moz-fit-content` 等）を付与しないこと（Vite ミニファイで標準プロパティが削除される危険があるため）。
3. **時間計算ロジックの共通化:**
   `getSlotTop` や `getSlotHeight` などの計算ロジックは `app/data/schedule.ts` または Composable（`useScheduleGrid.ts`）に切り出すことで、テスト容易性を向上させる。

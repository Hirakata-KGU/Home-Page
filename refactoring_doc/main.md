# プロジェクト全体アーキテクチャ & リファクタリング指針 (main.md)

本ドキュメントは、学園祭公式ホームページ（Nuxt 4.5.2 SSG）の開発における全体設計、データフロー、モジュール設計、および今後のリファクタリングに向けた重要事項をまとめたものです。

---

## 1. 全体アーキテクチャと基本方針

- **フレームワーク:** Nuxt 4.5.2 (Nitro 2.13.4, Vite 8.2.2, Vue 3.5.42)
- **レンダリング方式:** **SSG（完全静的サイト生成 / GitHub Pages想定）**
  - SSR（サーバーサイドレンダリング）やサーバー専用APIは使用せず、`nuxt generate` / `nitro.prerender` ですべてのHTML・JSONを静的出力。
  - クライアント専用API（`window`, `matchMedia`, `localStorage` など）は `onMounted` または `import.meta.client` ガード内で安全に実行。
- **モバイルファースト設計:** 来場者・学生がスマートフォンから閲覧する比率が圧倒的に高いため、片手での操作性・横スクロール制御・表示速度を最優先。
- **スタイリング方針:** 原則 Tailwind CSS ユーティリティクラスを主軸とし、タイムテーブルや複雑なアニメーション等の再利用・保守性を重視する箇所は `<style scoped>` を併用。

---

## 2. データパイプライン設計（Excel → JSON → TypeScript）

### 2.1 Nuxtモジュールによる自動変換 (`modules/festival-data.ts`)
マスターデータである `app/data/hirakata_festival_data.xlsx` から、ビルド時および開発時（watchモード含む）に自動で4つの独立したJSONを生成・保存します。

- **入力:** `app/data/hirakata_festival_data.xlsx`
- **出力先:** `app/data/`
  1. `food-booths.json` (模擬店・グルメ企画)
  2. `exhibitions.json` (文化系・展示企画)
  3. `performances.json` (音楽ライブ・ステージ出演企画)
  4. `timetable.json` (タイムテーブル・時間枠スロット情報)

### 2.2 責務の分離 (`schedule.ts` と `events.ts`)
初期実装では `events.ts` に全企画データとタイムテーブル処理が同居していましたが、保守性と単一責任の原則に基づき責務を明確に分離しました：

- **`app/data/schedule.ts`**:
  - `timetable.json` を直接インポート。
  - 会場カテゴリー定義（`VenueCategory`: `'outdoor' | 'indoor' | 'chapel' | 'gym' | 'bldg1'`）。
  - タイムテーブル専用の型定義（`TimetableSlot`, `ScheduleDayData` 等）。
  - 2日間のタイムラインデータ生成、スロットの位置計算補助関数。
- **`app/data/events.ts`**:
  - 4つのJSON（模擬店・展示・パフォーマンス・タイムテーブル）を突合し、全59企画の一覧データおよび詳細データ（`FestivalEvent`）を構築。
  - `schedule.ts` のユーティリティや型定義を参照してタイムテーブル情報をマッピング。

---

## 3. ビルド・最適化における注意点とトラブルシューティング

### 3.1 CSS ミニファイ（Vite / PostCSS）のベンダープレフィックス上書き問題
- **事象:**
  CSSで `height: fit-content !important; height: -moz-fit-content !important;` のように記述すると、同一セレクタ内で後に書かれたプロパティが優先され、ビルド成果物のHTML/CSSに Firefox専用の `-moz-fit-content` のみが残ってしまい、Chrome / Safari / Edge でスタイルが無効化される不具合が発生した。
- **リファクタリング原則:**
  - `height` などの重要プロパティを上書き展開する際は、ベンダープレフィックスの安易な多重定義を避け、標準値（`height: auto !important` 等）を使用すること。
  - ビルド成果物（`.output/public/**/*.html`）の CSS が意図通り展開されているかを定期的にチェックすること。

### 3.2 開発環境（Dev）と本番静的プレビュー（Preview）のキャッシュ混在
- **事象:**
  `npm run dev` を開いていたブラウザでそのまま `npm run preview`（`.output/public` の配信）を開くと、ブラウザキャッシュやService Workerにより開発用ファイル（`/_nuxt/pages/schedule.vue?t=...`）を取得しようとして 404 エラーになり、Vue のハイドレーション（JavaScript実行）が停止する。
- **運用指針:**
  - 生成物（SSG）の動作確認時は、必ずシークレットウィンドウ（InPrivate ブラウズ）またはハードリロード（`Ctrl + Shift + R`）で確認を行う。

### 3.3 Nuxt / Nitro ビルド時の EBUSY ロック
- **事象:**
  `npm run preview` やローカルWebサーバー（`serve`）を起動したまま `npm run build` / `npm run generate` を実行すると、Windows 環境では `.output` ディレクトリがプロセスに掴まれて `EBUSY: resource busy or locked, rmdir` エラーが発生する。
- **運用指針:**
  - 再ビルド・再生成を行う前に、プレビュー用ローカルサーバープロセスを停止すること。

### 3.4 レスポンシブ幾何学クリッピングとSafariのはみ出し防止（CSS Tips）
- **Safariの角丸オーバーフローバグ:**
  - `rounded-2xl` などの `border-radius` と `overflow: hidden` を持つカード要素内で、子要素が `transform`（`rotate`, `scale` 等）や `clip-path` を伴う場合、Safari（特にiOS Safari）では角丸の外側に子要素が突き抜けて描画される既知の不具合がある。
  - **解決策:** 親要素に `overflow: hidden; isolation: isolate; -webkit-mask-image: -webkit-radial-gradient(white, black);` を設定することで、全ブラウザで確実に角丸内部に描画が制限される。
- **幾何学フレームの回転と内部コンテンツの直立維持 (Counter-Rotation):**
  - 多角形（8角形等）の枠のみを回転させ、内部の写真やアイコン・文字を水平・直立に保ちたい場合、外側のクリップ要素に `rotate(X deg)`、直下の子ラッパーに `-rotate(X deg)` を適用することで回転を完全に相殺可能。
  - 正方形に内接する多角形は内接円半径が変わらないため、等倍（100%）で枠内を完全にカバーできる。

---

## 4. 今後のリファクタリング検討事項

1. **データバリデーションの強化:**
   `xlsx` から抽出したデータの型チェック（Zod や Valibot 等の軽量スキーマバリデーター）をモジュール内に組み込み、Excelの入力ミス（時間フォーマットの乱れ、空文字等）をビルド時に検知できるようにする。
2. **コンポーネントの再分割:**
   `schedule.vue` の肥大化を防ぐため、タイムグリッド本体（`TimetableGrid.vue`）やスロットカード（`TimetableBlock.vue`）をコンポーネントとして切り出す。
3. **アクセシビリティ (a11y) の向上:**
   タイムテーブルのキーボードナビゲーション（Tab 移動、Enter / Space での展開）、WAI-ARIA 属性（`aria-expanded`, `aria-controls`）の完全対応。

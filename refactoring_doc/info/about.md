# 平潟祭について ページ リファクタリング概要 (about.md)

このドキュメントは、`app/pages/info/about.vue`（「平潟祭について」ページ）における機能改修、UX改善、UI設計、および将来のリファクタリングに向けた設計指針をまとめたものです。

---

## 1. 概要 & 関連ファイル

- **対象ページ:** [`app/pages/info/about.vue`](file:///c:/Users/tkytw/Desktop/github/Home-Page/app/pages/info/about.vue)
- **写真アセット:** `public/images/2025/`
  - `gate.jpg`（正門ゲート・装飾）
  - `okugai-stage.jpg`（野外ステージ）
  - `LINE_ALBUM_2025 広報部門_260914_202.jpg`（キャンパス風景）
  - `LINE_ALBUM_2026.6.23_260914_10.jpg`（ステージパフォーマンス）
  - `S__41058357_0.jpg`（模擬店・企画の様子）
  - `Gemini_Generated_Image_pxxa5fpxxa5fpxxa.jpg`（夕景・ライトアップ）
- **利用モジュール・ライブラリ:**
  - `@nuxt/image` (`<NuxtImg>`)
  - Vue 3 (`ref`, `onMounted`, `onBeforeUnmount`, `<transition-group>`)
  - Tailwind CSS

---

## 2. 改修の経緯とユーザー要件の変遷

### ① 初期状態の課題
- 初期の「平潟祭について」ページには、テーマ「sprout」に関するAI生成の創作ポエムや、架空のハイライト文章（熱狂の音楽ステージ、多彩な模擬店・グルメ等）が長文で掲載されていた。
- 実際の学園祭公式HPとして実用的ではなく、よりシンプルかつ公式感のある構成への刷新が求められた。

### ② 要件1: 構成の大幅変更 & 創作文章の全廃
- **創作文章の排除:** 冗長なテキストや不自然な長文を撤廃し、クリーンなレイアウトに整理。
- **第1セクション（委員長挨拶）:**
  - 委員長の近影写真を配置できる専用スペース（縦型比率のプレースホルダー枠）と、役職・氏名（「実行委員長 〇〇 〇〇」）・挨拶文を掲載できる枠を新設。
  - 写真や文章が確定した際に簡単に差し替えられる実用的なスロット構造を採用。
- **第2セクション（昨年度の様子）:**
  - `public/images/2025/` にある実際の学園祭写真（6枚）を掲載するセクションを新設。
- **第3セクション（開催概要）:**
  - 既存の「開催概要（名称・テーマ・日時・会場・入場料・主催の表＋企画一覧/アクセスへのリンクボタン）」はそのまま維持。

### ③ 要件2: 写真セクションの枠線・文章の削除とマーキー化
- 写真セクションにあった `.section` 共通の白いカード枠や上部グリーンボーダー、および「昨年度（2025年度）の様子」「Memories of 2025」の見出しテキストをすべて削除。
- 枠に囚われず、写真そのものが右から左へ滑らかに流れていく無限ループスクロール（マーキーアニメーション）を実装。

### ④ 要件3: 写真を1枚ずつ大きく順番に表示する大判スライドショーへ変更
- 流れるマーキーから、写真を1枚ずつ大きくダイナミックに見せるスライドショー形式へと要望が変更。
- **サイズ感:** 最大幅 `1000px`、アスペクト比 `16:10`（スマホ時は `4:3`）の大型フレームで迫力ある写真表示を実現。
- **切り替え演出:** 4秒周期で滑らかにクロスフェード（0.8秒）する自動再生スライドショー。
- **手動操作:** 写真の邪魔をしない半透明グラスモーフィズムの矢印ボタン（前へ/次へ）と、下部にドットインジケーターを設置。ホバー時は自動再生を一時停止する配慮を追加。
- **余計な要素の排除:** セクション枠線や見出しテキストは一切置かず、写真のみが鎮座するデザインを維持。

### ⑤ 要件4: `@nuxt/image`（`<NuxtImg>`）の適用
- 写真スライドショーの画像タグを通常の `<img>` から `@nuxt/image` の `<NuxtImg>` コンポーネントへ置き換え。
- 次世代フォーマット `format="webp"` と、デバイス幅に応じた配信解像度 `sizes="xs:100vw sm:100vw md:1000px"` を指定し、SSGプリレンダリング時の最適化（IPX生成）とロード高速化を実現。

---

## 3. 実装詳細 & 設計仕様

### ① 委員長挨拶セクション（`.greeting-card`）
```vue
<div class="greeting-card">
  <!-- 写真スペース -->
  <div class="greeting-photo-wrapper">
    <!-- 写真確定時は以下のNuxtImgタグを使用 -->
    <!-- <NuxtImg src="/images/greeting/leader.jpg" alt="第77回 平潟祭実行委員長" format="webp" class="greeting-photo" /> -->
    <div class="greeting-photo-placeholder">
      <svg class="w-12 h-12 text-sprout/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="placeholder-text">写真スペース</span>
      <span class="placeholder-subtext">（委員長近影）</span>
    </div>
  </div>

  <!-- 文章スペース -->
  <div class="greeting-content">
    <div class="greeting-header">
      <span class="greeting-role">第77回 平潟祭実行委員会</span>
      <h3 class="greeting-name">実行委員長 〇〇 〇〇</h3>
    </div>
    <div class="greeting-body">
      <p>ここに実行委員長からの挨拶文が入ります。</p>
      <p>平潟祭への想いや、ご来場いただく皆様へのメッセージを掲載できます。</p>
    </div>
  </div>
</div>
```
- **レスポンシブ:**
  - PC: 横並び（写真幅 190px × 高さ 250px、右側に文章）。
  - スマホ（`<= 680px`）: 縦並び中央揃え（写真幅 160px × 高さ 210px、下部に文章・左揃え）。

### ② 大判写真スライドショー（`.memories-slideshow-container`）
- **タイマー管理とSSG/ライフサイクル保護:**
  - SSR（サーバーサイドプリレンダリング）時に `setInterval` が誤動作しないよう、`typeof window !== 'undefined'` チェックを内包。
  - コンポーネント破棄時（ページ遷移時）に `onBeforeUnmount` で確実に `clearInterval(slideTimer)` を呼び出し、メモリリークを防止。
- **クロスフェードトランジション:**
  - Vue の `<transition-group name="fade">` を使用。
  - `.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }` で滑らかな画像切り替えを実現。
- **UIコンポーネント:**
  - 矢印ボタン: `backdrop-filter: blur(6px)` を効かせた半透明ホワイトボタン。ホバー時に `scale(1.08)` でフィードバック。
  - ドットインジケーター: アクティブなドットは長円（幅24px）にスムーズに伸縮アニメーション。

---

## 4. 将来のリファクタリングに向けた設計指針

1. **委員長写真・挨拶文の正式反映:**
   - 委員長の写真ファイル（例: `public/images/about/leader.jpg`）が提供された際は、`greeting-photo-placeholder` をコメントアウトし、用意されている `<NuxtImg>` タグのコメントを解除するだけで即時反映可能です。
   - 氏名・挨拶文は `greeting-name` と `greeting-body` 内のテキストを書き換えるだけで対応できます。
2. **写真データの外部データ化（分離）:**
   - 現在コンポーネント内にインライン定義されている `memories2025` 配列は、写真の追加や入れ替えが頻繁に行われる場合、`app/data/about-memories.ts` 等の別ファイルへ抽出・外部データ化することを推奨します。
3. **スライドショーの汎用コンポーネント化（`UiSlideshow.vue`）:**
   - 他のページ（トップページのギャラリーや企画詳細ページなど）でも大判スライドショーを再利用する要件が出た場合、`images` 配列と `interval` などを props で受け取る共通コンポーネント（`app/components/ui/Slideshow.vue`）として切り出すと保守性が向上します。

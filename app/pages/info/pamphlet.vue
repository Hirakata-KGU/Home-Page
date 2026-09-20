<script setup lang="ts">
useSeoMeta({
  title: '電子パンフレット｜平潟祭 2026',
  description: '第77回 平潟祭の公式電子パンフレット。企画一覧、タイムテーブル、キャンパスマップをスマートフォンやPCからいつでもご確認いただけます。',
});

// ※アイコンSVG提供後に配置予定
const pamphletHighlights = [
  {
    title: 'キャンパスマップ & 模擬店配置図',
    desc: '正門からメインストリート、文化館・音楽館まで、すべての企画・ブースの位置を網羅。',
  },
  {
    title: '両日タイムテーブル',
    desc: '屋内ホール・野外芝生広場ステージなどの開演時間を一目でチェック可能。',
  },
  {
    title: '全企画・出演団体紹介',
    desc: 'ステージ出演者や各サークル・展示団体の見どころ・プロフィールを詳しく掲載。',
  },
  {
    title: 'ご来場案内 & キャンパスガイド',
    desc: '本部テント、救護所、授乳室、喫煙所、ゴミステーションなどの安心安全な設備案内。',
  },
];
</script>

<template>
  <div>
    <!-- 絵文字不使用（※アイコンSVG提供後に配置予定） -->
    <LayoutPageHeader
      title="電子パンフレット"
      sub-title="Official Digital Pamphlet"
      :breadcrumbs="[{ name: '電子パンフレット' }]"
    />

    <div class="page-container">
      <!-- Main Pamphlet Card -->
      <section class="section">
        <div class="pamphlet-hero">
          <div class="pamphlet-preview-box">
            <div class="pamphlet-cover">
              <span class="cover-badge">2026年度版</span>
              <!-- アイコンSVG提供後に配置予定 -->
              <h3 class="cover-title">第77回 平潟祭<br><span>SPROUT</span></h3>
              <p class="cover-date">2026.10.31(Sat) - 11.1(Sun)</p>
              <span class="cover-univ">関東学院大学 金沢八景キャンパス</span>
            </div>
          </div>

          <div class="pamphlet-info">
            <div class="inline-flex items-center gap-2 bg-sprout-bg text-sprout-forest text-xs font-bold px-3 py-1.5 rounded-full border border-sprout-border mb-3">
              <span>PDF形式 / スマートフォン対応</span>
            </div>
            <h2 class="text-2xl lg:text-3xl font-extrabold text-sprout-title mb-4">
              平潟祭公式パンフレットを<br class="hidden sm:inline">スマホで持ち歩こう
            </h2>
            <p class="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
              当日のキャンパスマップ、企画タイムスケジュール、模擬店一覧、参加団体紹介などが1冊にまとまった公式ガイドブックです。
              ペーパーレスでいつでも快適にご覧いただけます。
            </p>

            <!-- Download / Viewer Actions -->
            <div class="action-box">
              <div class="status-notice">
                <span class="pulse-dot"></span>
                <span class="text-xs sm:text-sm font-bold text-sprout-dark">
                  2026年度版パンフレットは学祭直前に公開予定です
                </span>
              </div>
              <div class="flex flex-wrap gap-3 mt-4">
                <button
                  type="button"
                  class="btn btn-primary opacity-80 cursor-not-allowed"
                  disabled
                  title="公開まで今しばらくお待ちください"
                >
                  PDFダウンロード（準備中）
                </button>
                <NuxtLink to="/events" class="btn btn-secondary">
                  Web版 企画一覧を見る →
                </NuxtLink>
              </div>
              <p class="text-xs text-text-light mt-3">
                ※公開開始後は、ここからPDFのダウンロードおよびブラウザでのプレビュー閲覧が可能になります。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contents Overview -->
      <section class="section">
        <div class="section-header">
          <!-- アイコンSVG提供後に配置予定 -->
          <div class="section-title">
            <h2>パンフレット収録コンテンツ</h2>
            <p>What's Inside</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="(item, idx) in pamphletHighlights"
            :key="idx"
            class="p-5 rounded-xl bg-sprout-bg border border-sprout-border/30 flex items-start gap-4"
          >
            <!-- アイコンSVG提供後に配置予定 -->
            <div>
              <h3 class="font-extrabold text-sprout-title text-base mb-1">{{ item.title }}</h3>
              <p class="text-sm text-text-muted leading-relaxed m-0">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Navigation links -->
      <section class="section quick-nav-section">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 class="font-bold text-xl text-sprout-title mb-2">Webサイトでも最新情報を公開中！</h3>
            <p class="text-sm text-text-muted">タイムテーブルやマップはWebページ上でも随時ご確認いただけます。</p>
          </div>
          <div class="flex gap-3 flex-wrap">
            <NuxtLink to="/schedule" class="btn btn-primary">
              タイムテーブル →
            </NuxtLink>
            <NuxtLink to="/map" class="btn btn-secondary">
              場内マップ →
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: var(--max-width);
  margin: -32px auto 80px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
  display: grid;
  gap: 32px;
}

.pamphlet-hero {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 40px;
  align-items: center;
}

.pamphlet-preview-box {
  display: flex;
  justify-content: center;
}

.pamphlet-cover {
  width: 260px;
  height: 360px;
  background: linear-gradient(145deg, #2C5E3B 0%, #1B3A24 100%);
  border-radius: 16px;
  box-shadow: 0 16px 36px rgba(27, 58, 36, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  border: 4px solid #DFF794;
  text-align: center;
  color: white;
}

.cover-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #DFF794;
  color: #1B3A24;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 99px;
}

.cover-title {
  font-size: 22px;
  font-weight: 900;
  line-height: 1.3;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.cover-title span {
  color: #DFF794;
  font-size: 18px;
  display: block;
}

.cover-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 8px;
}

.cover-univ {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
}

.action-box {
  background: var(--sprout-bg);
  border: 1px solid var(--sprout-border);
  border-radius: 14px;
  padding: 20px 24px;
}

.status-notice {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background-color: var(--sun-gold);
  border-radius: 50%;
  box-shadow: 0 0 0 rgba(245, 158, 11, 0.4);
  animation: pulseDot 1.8s infinite;
}

@keyframes pulseDot {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.6);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(245, 158, 11, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
  }
}

.quick-nav-section {
  background: linear-gradient(135deg, var(--sprout-bg) 0%, #ffffff 100%);
  border-left: 6px solid var(--sprout);
}

@media (max-width: 900px) {
  .pamphlet-hero {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .pamphlet-preview-box {
    margin-bottom: 16px;
  }

  .action-box {
    text-align: left;
  }
}
</style>

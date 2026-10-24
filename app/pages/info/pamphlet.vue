<script setup lang="ts">
useSeoMeta({
  title: '電子パンフレット｜平潟祭 2026',
  ogTitle: '電子パンフレット｜平潟祭 2026',
  description: '第77回 平潟祭の公式電子パンフレット。企画一覧、タイムテーブル、キャンパスマップをスマートフォンやPCからいつでもご確認いただけます。',
  ogDescription: '第77回 平潟祭の公式電子パンフレット。企画一覧、タイムテーブル、キャンパスマップをスマートフォンやPCからいつでもご確認いただけます。',
  ogUrl: 'https://www.hirakatasai.net/info/pamphlet',
});

// public/ 配下のPDF。baseURL を考慮してリンクを生成
const pdfUrl = `${useRuntimeConfig().app.baseURL.replace(/\/$/, '')}/hirakatasai2026-pamphlet.pdf`;

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
              <p class="cover-title">第77回 平潟祭<br><span>SPROUT</span></p>
              <p class="cover-date">2026.10.31(Sat) - 11.1(Sun)</p>
              <span class="cover-univ">関東学院大学 金沢八景キャンパス</span>
            </div>
          </div>

          <div class="pamphlet-info">
            <div class="inline-flex items-center gap-2 bg-sprout-bg text-sprout-forest text-xs font-bold px-3 py-1.5 rounded-full border border-sprout-border mb-3">
              <span>PDF形式 / スマートフォン対応</span>
            </div>
            <h2 class="text-fluid-h2 font-extrabold text-sprout-title mb-4">
              平潟祭公式パンフレットを<br class="hidden sm:inline">スマホで持ち歩こう
            </h2>
            <p class="text-text-muted text-fluid-lead leading-relaxed mb-6">
              当日のキャンパスマップ、企画タイムスケジュール、模擬店一覧、参加団体紹介などが1冊にまとまった公式ガイドブックです。
              ペーパーレスでいつでも快適にご覧いただけます。
            </p>

            <!-- Download / Viewer Actions -->
            <div class="action-box">
              <div class="flex flex-wrap gap-3 mt-4">
                <a :href="pdfUrl" target="_blank" rel="noopener" class="btn btn-primary">
                  パンフレットを開く（PDF）
                </a>
                <a :href="pdfUrl" download="hirakatasai2026-pamphlet.pdf" class="btn btn-secondary">
                  ダウンロード
                </a>
                <NuxtLink to="/events" class="btn btn-secondary">
                  Web版 企画一覧を見る →
                </NuxtLink>
              </div>
            </div>
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

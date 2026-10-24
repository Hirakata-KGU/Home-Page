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
      <!-- Main Pamphlet Card (案A: カード上部フルワイド・ヘッダー型) -->
      <section class="section pamphlet-card">
        <!-- 上部：横長表紙バナー（フルワイド） -->
        <div class="pamphlet-banner-wrap">
          <NuxtImg
            src="/images/pamphlet-cover.png"
            alt="第77回 平潟祭 SPROUT 公式パンフレット表紙"
            width="2400"
            height="842"
            format="webp"
            quality="90"
            sizes="xs:100vw sm:100vw md:1000px"
            class="pamphlet-banner-img"
          />
        </div>

        <!-- 下部：説明・アクションエリア -->
        <div class="pamphlet-body">
          <div class="pamphlet-info">
            <h2 class="text-fluid-h2 font-extrabold text-sprout-title mb-3">
              平潟祭パンフレット（電子版）
            </h2>
            <p class="text-text-muted text-fluid-lead leading-relaxed mb-6">
              当日のキャンパスマップ、企画タイムスケジュール、模擬店一覧、参加団体紹介などが1冊にまとまった公式ガイドブックです。
              ペーパーレスでいつでも快適にご覧いただけます。
            </p>

            <!-- Download / Viewer Actions -->
            <div class="action-box">
              <div class="flex flex-wrap justify-center sm:justify-start gap-3">
                <a :href="pdfUrl" target="_blank" rel="noopener" class="btn btn-primary">
                  パンフレットを開く（PDF）
                </a>
                <a :href="pdfUrl" download="hirakatasai2026-pamphlet.pdf" class="btn btn-secondary">
                  ダウンロード
                </a>
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

.pamphlet-card {
  padding: 0;
  overflow: hidden;
}

.pamphlet-banner-wrap {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid var(--border, #e5e8e0);
  overflow: hidden;
}

.pamphlet-banner-img {
  width: 100%;
  height: auto;
  aspect-ratio: 2400 / 842;
  object-fit: cover;
  display: block;
}

.pamphlet-body {
  padding: clamp(24px, 3.5vw, 40px);
}

.action-box {
  background: var(--sprout-bg);
  border: 1px solid var(--sprout-border);
  border-radius: 14px;
  padding: 20px 24px;
}

@media (max-width: 640px) {
  .pamphlet-body {
    text-align: center;
  }
}
</style>

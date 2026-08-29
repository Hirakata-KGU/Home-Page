<script setup lang="ts">
useSeoMeta({
  title: '交通アクセス・周辺地図｜平潟祭 2026',
  description: '関東学院大学 金沢八景キャンパスへのアクセス情報。京急線・シーサイドライン金沢八景駅からの徒歩・バスルート、Google Maps。',
});
</script>

<template>
  <div>
    <LayoutPageHeader
      title="アクセス・交通案内"
      sub-title="Access & Location"
      icon="🚉"
      :breadcrumbs="[{ name: 'アクセス' }]"
    />

    <div class="page-container">
      <!-- Access Main Section -->
      <SectionsAccessSection />

      <!-- Campus Map Section Link -->
      <section class="section map-link-section">
        <div class="map-link-content">
          <div>
            <h3>キャンパス内のマップはこちら</h3>
            <p>模擬店ストリート、屋内・屋外ステージ、文化館・音楽館の配置をご確認いただけます。</p>
          </div>
          <NuxtLink to="/map" class="btn btn-primary">場内マップを見る 🗺️</NuxtLink>
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

.map-link-section {
  background: linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 100%);
  border-left: 6px solid var(--olive);
}

.map-link-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.map-link-content h3 {
  font-size: 22px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
}

.map-link-content p {
  font-size: 14px;
  color: var(--muted);
}

@media (max-width: 768px) {
  .map-link-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>

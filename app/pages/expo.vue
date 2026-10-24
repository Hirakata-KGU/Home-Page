<script setup lang="ts">
import { computed } from 'vue';
import { allEvents } from '~/data/events';

useSeoMeta({
  title: '関東学院大学 EXPO部｜第77回 平潟祭 2026',
  ogTitle: '関東学院大学 EXPO部｜第77回 平潟祭 2026',
  description: 'EXPO部は、本学と横浜市が2027年3月19日から開催される横浜グリーンエクスポに向け、大学生等が主体となって盛り上げるために発足したコミュニティです。平潟祭での出店・企画をご紹介します。',
  ogDescription: 'EXPO部は、本学と横浜市が2027年3月19日から開催される横浜グリーンエクスポに向け、大学生等が主体となって盛り上げるために発足したコミュニティです。平潟祭での出店・企画をご紹介します。',
  ogImage: 'https://www.hirakatasai.net/images/kgu_expo_logo.png',
  ogUrl: 'https://www.hirakatasai.net/expo',
});

const expoEvents = computed(() => {
  return allEvents.filter((e) => e.categories.includes('expo'));
});
</script>

<template>
  <div class="w-full overflow-x-hidden">
    <!-- ページヘッダー -->
    <LayoutPageHeader
      title="関東学院大学 EXPO部"
      sub-title="KGU EXPO × Yokohama GREEN EXPO"
      :breadcrumbs="[{ name: '関東学院大学 EXPO部' }]"
    />

    <div class="page-container">
      <!-- ヒーロー・EXPO部紹介セクション -->
      <section class="section expo-hero-section">
        <div class="hero-top-row">
          <div class="expo-logo-wrapper">
            <NuxtImg
              src="/images/kgu_expo_logo.png"
              alt="関東学院大学 EXPO部 ロゴ"
              width="960"
              height="324"
              format="webp"
              loading="eager"
              fetchpriority="high"
              class="expo-logo-img object-contain"
            />
          </div>
          <div class="hero-title-area">
            <h1 class="hero-title">
              関東学院大学 EXPO部 ／ 横浜市
            </h1>

          </div>
        </div>

        <div class="expo-intro-card">
          <div class="intro-text">
            <p>
              EXPO部は、本学と横浜市が2027年3月19日から神奈川県横浜市（旧 上瀬谷通信施設）で開催される横浜グリーンエクスポに向け、大学生等が主体となってエクスポを盛り上げるために発足したコミュニティです。
            </p>
            <p>
              学生自身が興味のあることや得意なことを起点に、地球やこれからの暮らしにアプローチして、自分たちの手で企画を創っていきます。
            </p>
            <p>
              本学では、平潟祭をはじめとしてエクスポPR活動や学生目線での広報発信など、学生ならではの発想によるさまざまな企画を展開予定です。
            </p>
          </div>

          <div class="flex gap-5">
            <div class="mt-6 flex flex-wrap gap-4">
              <a
                href="/hirakatasai2026-pamphlet.pdf#page=8"
                target="_blank"
                rel="noopener noreferrer"
                class="external-link-btn"
              >
                <span>電子パンフレットで閲覧</span>
              </a>
            </div>
            <div class="mt-6 flex flex-wrap gap-4">
              <a
                href="https://next-gen.city.yokohama.lg.jp/expobu"
                target="_blank"
                rel="noopener noreferrer"
                class="external-link-btn"
              >
                <span>EXPO部 WEBページ（横浜市）</span>
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 平潟祭企画一覧 -->
      <section class="section">
        <div class="section-header">
          <div class="section-title">
            <h2>関東学院大学 EXPO部企画</h2>
            <p>KGU EXPO Div Events</p>
          </div>
        </div>

        <div class="events-grid">
          <UiEventCard
            v-for="event in expoEvents"
            :key="event.id"
            :event="event"
            show-description
            location-fallback="場所・詳細は後日公開"
          />
        </div>
      </section>

      <!-- 公式マスコットグリーティング -->
      <section class="section">
        <div class="section-header">
          <div class="section-title">
            <h2>公式マスコット グリーティング</h2>
            <p>Official Mascot Greeting</p>
          </div>
        </div>

        <h3 class="mascot-title">
          公式マスコットキャラクター「トゥンクトゥンク」がやって来る！
        </h3>

        <div class="mascot-schedule-box">
          <div class="schedule-item">
            <span class="schedule-label">登場日時</span>
            <span class="schedule-value">10/31（土） 11:00～11:30頃</span>
          </div>
        </div>
      </section>

      <!-- フッター前導線 -->
      <div class="flex justify-center gap-4 mt-2 flex-wrap">
        <NuxtLink to="/events" class="btn btn-primary">
          企画一覧を見る →
        </NuxtLink>
        <NuxtLink to="/map" class="btn btn-secondary">
          場内マップを見る →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: var(--max-width);
  margin: -32px auto 80px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 36px;
  box-sizing: border-box;
}

.page-container > * {
  min-width: 0;
  max-width: 100%;
}

/* ヒーロー紹介セクション */
.expo-hero-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-top-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}

@media (min-width: 768px) {
  .hero-top-row {
    flex-direction: row;
    text-align: left;
    gap: 32px;
  }
}

.expo-logo-wrapper {
  width: clamp(240px, 20vw, 300px);
  aspect-ratio: 1920/648;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 24px;
  padding: 8px;
  flex-shrink: 0;
}

.expo-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hero-title-area {
  flex: 1;
}

.hero-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(66, 132, 90, 0.12);
  color: var(--sprout-forest);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.hero-title {
  font-size: clamp(22px, 3.2vw, 32px);
  font-weight: 900;
  color: var(--sprout-title);
  line-height: 1.3;
  margin: 0 0 8px;
}

.hero-subtext {
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 700;
  color: var(--text-muted);
  margin: 0;
}

.expo-intro-card {
  background: var(--sprout-bg);
  border-radius: 16px;
  padding: clamp(20px, 2.8vw, 32px);
  border: 1px solid rgba(66, 132, 90, 0.2);
}

.intro-text {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.9;
  color: var(--text-main);
}

.intro-text p {
  margin: 0;
}

.external-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 9999px;
  background: var(--sprout-moss);
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(46, 125, 50, 0.4);
  transition: all 0.2s ease;
  color: var(--sprout);
}

.external-link-btn:hover {
  background: var(--sprout-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(46, 125, 50, 0.35);
  color: white
}

/* 企画カードグリッド */
.events-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 640px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* マスコットカード */
.mascot-card {
  background: linear-gradient(135deg, #f3faf4 0%, #e8f5ec 100%);
  border-radius: 20px;
  padding: clamp(24px, 3.5vw, 36px);
  border: 2px dashed rgba(66, 132, 90, 0.4);
}

.mascot-badge-row {
  margin-bottom: 8px;
}

.mascot-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  background: var(--sprout-forest);
  color: white;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.mascot-title {
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 900;
  color: var(--sprout-title);
  line-height: 1.35;
  margin: 0 0 16px;
}

.mascot-schedule-box {
  background: white;
  border-radius: 12px;
  padding: 14px 20px;
  border: 1px solid rgba(66, 132, 90, 0.2);
  margin-bottom: 16px;
  width: fit-content;
  max-width: 100%;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.schedule-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--sprout-forest);
  background: rgba(66, 132, 90, 0.1);
  padding: 2px 8px;
  border-radius: 6px;
}

.schedule-value {
  font-size: clamp(15px, 1.4vw, 18px);
  font-weight: 800;
  color: var(--text-main);
}

.mascot-text {
  font-size: clamp(14px, 1.1vw, 15px);
  line-height: 1.8;
  color: var(--text-main);
  margin: 0;
}
</style>

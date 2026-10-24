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

// EXPO関連企画4件のID一覧（表示順）
const expoEventIds = [
  'expo-cafe',
  'expo-walk-rally',
  'expo-tekken',
  'expo-photo-spot',
];

const expoEvents = computed(() => {
  return expoEventIds
    .map((id) => allEvents.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
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

          <div class="mt-6 flex flex-wrap gap-4">
            <a
              href="https://next-gen.city.yokohama.lg.jp/expobu"
              target="_blank"
              rel="noopener noreferrer"
              class="external-link-btn group"
            >
              <span>EXPO部 WEBページ（横浜市）へ</span>
              <svg class="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- 平潟祭企画一覧 -->
      <section class="section">
        <div class="section-header">
          <div class="section-title">
            <h2>平潟祭 EXPO部企画</h2>
            <p>KGU EXPO Div Events</p>
          </div>
        </div>

        <div class="events-grid">
          <article
            v-for="event in expoEvents"
            :key="event.id"
            class="expo-event-card"
          >
            <NuxtLink
              :to="'/events/' + event.id"
              class="event-card-inner group"
            >
              <!-- 企画画像・フォールバック -->
              <div class="card-media-wrapper">
                <NuxtImg
                  v-if="event.imageUrl"
                  :src="event.imageUrl"
                  :alt="event.title"
                  loading="lazy"
                  format="webp"
                  sizes="xs:100vw sm:50vw md:400px"
                  class="card-img group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  v-else
                  class="card-fallback-box"
                >
                  <svg class="w-12 h-12 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                  </svg>
                </div>

                <!-- バッジ群 -->
                <div class="card-badges">
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="(catKey, idx) in (event.categories || [event.category])"
                      :key="catKey"
                      class="category-chip"
                      :class="'cat-' + catKey"
                    >
                      {{ (event.categoryLabels && event.categoryLabels[idx]) || event.categoryLabel }}
                    </span>
                  </div>
                  <span class="day-chip">{{ event.dayLabel }}</span>
                </div>
              </div>

              <!-- カード本文 -->
              <div class="card-body">
                <div v-if="event.organizer" class="card-organizer">
                  {{ event.organizer }}
                </div>
                <h3 class="card-title group-hover:text-(--sprout-forest) transition-colors">
                  {{ event.title }}
                </h3>

                <!-- 開催場所 -->
                <div class="card-meta-row">
                  <svg class="w-4 h-4 text-(--sprout-moss) shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span v-if="event.locationName" class="font-bold text-[13px] text-(--sprout-title)">
                    {{ event.locationName }}
                  </span>
                  <span v-else class="text-[12px] font-semibold text-(--text-muted) italic">
                    場所・詳細は後日公開
                  </span>
                </div>

                <!-- 概要・PR文 -->
                <p v-if="event.description" class="card-desc">
                  {{ event.description }}
                </p>

                <!-- リンクボタン風ラベル -->
                <div class="card-action">
                  <span class="action-btn">
                    <span>企画詳細を見る</span>
                    <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </NuxtLink>
          </article>
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
  color: white;
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

.expo-event-card {
  border-radius: 16px;
  background: white;
  border: 1px solid var(--border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.25s ease;
}

.expo-event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(46, 125, 50, 0.15);
  border-color: rgba(66, 132, 90, 0.4);
}

.event-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.card-media-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f0f4f0;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-fallback-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0d7a57 0%, #10b981 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  pointer-events: none;
  z-index: 2;
}

.category-chip {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.category-chip.cat-expo {
  background: #0d7a57;
}

.category-chip.cat-food {
  background: #b89345;
}

.day-chip {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-organizer {
  font-size: 12px;
  font-weight: 800;
  color: var(--sprout-forest);
  margin-bottom: 6px;
}

.card-title {
  font-size: 17px;
  font-weight: 900;
  color: var(--text-main);
  line-height: 1.4;
  margin: 0 0 10px;
}

.card-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.card-desc {
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-action {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 800;
  color: var(--sprout-moss);
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

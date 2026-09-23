<script setup lang="ts">
import type { EventItem } from '~/data/events';

defineProps<{
  event: EventItem;
}>();
</script>

<template>
  <NuxtLink
    :to="`/events/${event.id}`"
    class="event-card"
  >
    <!-- カード上部画像メディアエリア -->
    <div class="card-media-wrapper">
      <!-- 写真ありの場合 -->
      <div
        v-if="event.imageUrl"
        class="card-image-box"
      >
        <NuxtImg
          :src="event.imageUrl"
          class="card-ambient-bg"
          aria-hidden="true"
          loading="lazy"
          format="webp"
          quality="60"
        />
        <NuxtImg
          :src="event.imageUrl"
          :alt="`${event.title} - ${event.organizer}`"
          loading="lazy"
          decoding="async"
          sizes="sm:100vw md:50vw lg:380px"
          format="webp"
          quality="80"
          class="card-img"
        />
      </div>

      <!-- 写真なしの場合（カテゴリグラデーション＋カテゴリSVGアイコン） -->
      <div
        v-else
        class="card-fallback-box"
        :style="{ background: event.gradient || 'linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%)' }"
      >
        <div class="fallback-icon-wrap">
          <!-- 模擬店アイコン -->
          <svg v-if="event.category === 'food'" class="w-12 h-12 text-white/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
          <!-- 文化館アイコン -->
          <svg v-else-if="event.category === 'culture'" class="w-12 h-12 text-white/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
          </svg>
          <!-- 音楽館アイコン -->
          <svg v-else-if="event.category === 'music'" class="w-12 h-12 text-white/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <!-- 芸能アイコン -->
          <svg v-else class="w-12 h-12 text-white/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      </div>

      <!-- オーバーレイバッジ（カテゴリ＆日程） -->
      <div class="card-overlay-badges">
        <div class="header-badges">
          <span class="category-chip" :class="'cat-' + event.category">{{ event.categoryLabel }}</span>
          <span v-if="event.subCategory" class="sub-chip-header">{{ event.subCategory }}</span>
        </div>
        <span class="day-chip">{{ event.dayLabel }}</span>
      </div>
    </div>

    <!-- カードコンテンツ -->
    <div class="event-content">
      <div class="event-organizer-row">
        <span class="organizer-badge">{{ event.organizer }}</span>
      </div>

      <h3 class="event-title">{{ event.title }}</h3>

      <!-- タイムテーブル連携枠プレビュー -->
      <div v-if="event.timetableSlots && event.timetableSlots.length > 0" class="event-tt-preview">
        <span class="tt-tag">
          タイムテーブル出演あり ({{ event.timetableSlots.length }}枠)
        </span>
      </div>

      <!-- フッター情報 -->
      <div class="event-footer">
        <div class="event-location">
          <svg class="w-3.5 h-3.5 inline-block mr-1 text-olive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{{ event.locationName }}</span>
        </div>
        <span class="event-more-link">詳細を見る →</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.event-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.event-card:hover {
  transform: translateY(-5px);
  border-color: var(--olive);
  box-shadow: var(--shadow-md);
}

.card-media-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-alt, #f5f5f4);
}

.card-image-box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 常時敷き詰めるアンビエント背景（横長・縦長問わず余白を美しいぼかしで満たす） */
.card-ambient-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.25);
  opacity: 0.6;
  pointer-events: none;
  user-select: none;
}

/* 前面の本体写真：全体が見切れることなく中央に表示 */
.card-img {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  margin: auto;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.event-card:hover .card-img {
  transform: scale(1.05);
}

.card-fallback-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fallback-icon-wrap {
  opacity: 0.85;
  transition: transform 0.3s ease;
}

.event-card:hover .fallback-icon-wrap {
  transform: scale(1.1);
}

.card-overlay-badges {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.2) 65%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

.header-badges {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.category-chip {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  color: white;
  letter-spacing: 0.02em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.category-chip.cat-food {
  background: #b89345;
}

.category-chip.cat-culture {
  background: var(--olive, #2f5b34);
}

.category-chip.cat-music {
  background: #1e3d26;
}

.category-chip.cat-entertainment {
  background: #d48806;
}

.sub-chip-header {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  color: #2b2b2b;
  backdrop-filter: blur(4px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.day-chip {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  backdrop-filter: blur(4px);
  white-space: nowrap;
}

.event-content {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.event-organizer-row {
  margin-bottom: 8px;
}

.organizer-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: var(--olive);
  background: rgba(47, 91, 52, 0.08);
  padding: 3px 10px;
  border-radius: 6px;
}

.event-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 12px;
  line-height: 1.4;
}

.event-tt-preview {
  margin-bottom: 12px;
}

.tt-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #1e3d26;
  background: #eaf3eb;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(47, 91, 52, 0.2);
}

.event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  font-size: 12px;
  margin-top: auto;
}

.event-location {
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
}

.event-more-link {
  font-weight: 800;
  color: var(--olive);
  transition: transform 0.2s ease;
}

.event-card:hover .event-more-link {
  transform: translateX(4px);
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { allEvents } from '~/data/events';

const route = useRoute();
const eventId = computed(() => route.params.id as string);

const event = computed(() => {
  return allEvents.find((e) => e.id === eventId.value);
});

const mapUrl = computed(() => {
  if (!event.value) return '/map';
  const ev = event.value;
  const room = ev.room || '';
  const loc = ev.locationName || '';

  if (room.startsWith('3-') || loc.includes('3号館')) return '/map?tab=no3';
  if (room.startsWith('6-') || loc.includes('6号館')) return '/map?tab=no6';
  if (room.startsWith('7-') || loc.startsWith('7-') || loc.includes('7号館') || loc.includes('音楽館')) return '/map?tab=no7';
  if (room.startsWith('8-') || loc.startsWith('8-') || loc.includes('8号館') || loc.includes('文化館')) return '/map?tab=no8';
  if (loc.includes('SCC') || loc.includes('屋内ステージ') || room.includes('SCC') || room.includes('屋内ステージ')) return '/map?tab=scc';

  return '/map';
});

useSeoMeta({
  title: () => event.value ? `${event.value.title}（${event.value.organizer}）｜平潟祭 2026` : '企画詳細｜平潟祭 2026',
  description: () => event.value ? `${event.value.title} - ${event.value.description}` : '平潟祭2026 企画詳細ページ',
});
</script>

<template>
  <div>
    <!-- ページヘッダー（絵文字不使用） -->
    <LayoutPageHeader
      :title="event ? event.title : '企画詳細'"
      :sub-title="event ? event.categoryLabel : 'Event Details'"
      :breadcrumbs="[
        { name: '企画一覧', path: '/events' },
        { name: event ? event.title : '詳細' },
      ]"
    />

    <div class="page-container">
      <div v-if="event" class="event-detail-wrapper">
        <!-- メイン詳細カード -->
        <article class="section detail-main-card">
          <!-- 上部バッジ群 -->
          <div class="meta-badges">
            <span class="category-badge" :class="'cat-' + event.category">
              {{ event.categoryLabel }}
            </span>
            <span v-if="event.subCategory" class="sub-badge">
              {{ event.subCategory }}
            </span>
            <span class="day-badge">
              {{ event.dayLabel }}
            </span>
            <span v-if="event.tentNo" class="tent-badge">
              テントNo.{{ event.tentNo }}
            </span>
            <span v-if="event.room" class="room-badge">
              教室: {{ event.room }}
            </span>
          </div>

          <div class="organizer-header">
            <span class="organizer-label">出店・出演団体</span>
            <h3 class="organizer-name">{{ event.organizer }}</h3>
          </div>

          <h2 class="detail-title">{{ event.title }}</h2>

          <!-- 企画写真（メインビジュアル: 高さは写真に合わせて自動変動・上限付き、余白には常時ぼかし背景を表示） -->
          <div
            v-if="event.imageUrl"
            class="detail-featured-media"
          >
            <NuxtImg
              :src="event.imageUrl"
              class="ambient-bg"
              aria-hidden="true"
              loading="lazy"
            />
            <NuxtImg
              :src="event.imageUrl"
              :alt="`${event.title} - ${event.organizer}`"
              class="featured-photo"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              sizes="sm:100vw md:900px"
            />
          </div>

          <!-- 基本情報グリッド -->
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">開催場所</span>
              <span class="info-value location-highlight">
                <svg class="w-4 h-4 inline-block mr-1 text-olive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {{ event.locationName }}
              </span>
            </div>

            <div class="info-item">
              <span class="info-label">参加日程</span>
              <span class="info-value">{{ event.participationDays }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">開催時間帯</span>
              <span class="info-value">{{ event.timeRange }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">カテゴリ区分</span>
              <span class="info-value">{{ event.categoryRaw }} / {{ event.subCategory }}</span>
            </div>
          </div>

          <!-- 企画概要・PR文 -->
          <div class="detail-section">
            <h3 class="section-heading">企画概要・PR</h3>
            <p class="description-text">{{ event.description }}</p>
          </div>

          <!-- 模擬店専用：販売メニュー・価格情報 -->
          <div v-if="event.salesInfo" class="detail-section sales-section">
            <h3 class="section-heading">販売メニュー・価格情報</h3>
            <div class="sales-card">
              <div class="sales-content">
                {{ event.salesInfo }}
              </div>
            </div>
          </div>

          <!-- 音楽館・ステージ専用：タイムテーブル出演スケジュール -->
          <div v-if="event.timetableSlots && event.timetableSlots.length > 0" class="detail-section timetable-section">
            <h3 class="section-heading">ステージ出演スケジュール</h3>
            <p class="section-subtext">以下のタイムテーブル枠に出演を予定しています。</p>
            <div class="timetable-slot-list">
              <div
                v-for="(slot, idx) in event.timetableSlots"
                :key="idx"
                class="timetable-slot-card"
              >
                <div class="slot-day-badge">{{ slot.day }}</div>
                <div class="slot-body">
                  <div class="slot-time">{{ slot.time }}</div>
                  <div class="slot-venue">会場: {{ slot.venue }}</div>
                  <div class="slot-title">{{ slot.title }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- タグ一覧 -->
          <div v-if="event.tags && event.tags.length" class="tags-row">
            <span v-for="tag in event.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>

          <!-- アクション導線ボタン -->
          <div class="action-buttons">
            <NuxtLink :to="mapUrl" class="btn btn-primary">
              場内マップで場所を確認 →
            </NuxtLink>
            <NuxtLink
              v-if="event.timetableSlots && event.timetableSlots.length > 0"
              :to="`/schedule?event=${event.id}`"
              class="btn btn-secondary"
            >
              タイムテーブルで時間を見る →
            </NuxtLink>
            <NuxtLink to="/events" class="btn btn-outline">
              企画一覧へ戻る
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Not Found -->
      <section v-else class="section not-found">
        <h2>企画が見つかりませんでした</h2>
        <p>指定された企画は存在しないか、移動した可能性があります。</p>
        <NuxtLink to="/events" class="btn btn-primary">企画一覧へ戻る</NuxtLink>
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

.event-detail-wrapper {
  display: grid;
  gap: 32px;
}

.detail-main-card {
  padding: 40px;
  background: white;
  border-radius: 20px;
  border: 1px solid var(--border);
}

.meta-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.category-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 800;
  color: white;
}

.cat-food {
  background: #b89345;
}

.cat-culture {
  background: var(--olive);
}

.cat-music {
  background: #1e3d26;
}

.cat-entertainment {
  background: linear-gradient(135deg, #d48806 0%, #b37400 100%);
}

.sub-badge {
  background: var(--accent);
  color: var(--text);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid var(--border);
}

.day-badge {
  background: #f0f0f0;
  color: var(--text);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
}

.tent-badge, .room-badge {
  background: #eef5ee;
  color: var(--olive);
  border: 1px solid rgba(47, 91, 52, 0.25);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
}

.organizer-header {
  margin-bottom: 8px;
}

.organizer-label {
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
}

.organizer-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--olive);
  margin-top: 2px;
}

.detail-title {
  font-size: 30px;
  font-weight: 900;
  color: var(--text);
  margin-bottom: 20px;
  line-height: 1.3;
}

.detail-featured-media {
  position: relative;
  margin-bottom: 32px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border);
  background: var(--bg-alt, #fafaf9);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 常時敷き詰められるアンビエント背景（上下・左右の余白を写真の色味で満たす） */
.ambient-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(28px);
  transform: scale(1.25);
  opacity: 0.6;
  pointer-events: none;
  user-select: none;
}

/* 前面の本体写真（全体が見切れることなく表示され、高さ上限内で写真に合わせて自動伸縮） */
.featured-photo {
  position: relative;
  z-index: 2;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  display: block;
  margin: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.12));
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 20px;
  background: var(--bg-alt, #fafaf9);
  border-radius: 12px;
  border: 1px solid var(--border);
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}

.info-value {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}

.location-highlight {
  color: var(--olive);
}

.detail-section {
  margin-bottom: 32px;
}

.section-heading {
  font-size: 18px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--border);
  display: flex;
  align-items: center;
}

.section-subtext {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 14px;
}

.description-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text);
  white-space: pre-line;
}

/* 模擬店メニュー */
.sales-card {
  background: #fefdfa;
  border: 1.5px dashed #c9a85a;
  border-radius: 12px;
  padding: 20px 24px;
}

.sales-content {
  font-size: 15px;
  line-height: 1.8;
  color: #333;
  white-space: pre-line;
  font-weight: 500;
}

/* タイムテーブルスロット */
.timetable-slot-list {
  display: grid;
  gap: 12px;
}

.timetable-slot-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #f4f8f5;
  border: 1px solid rgba(47, 91, 52, 0.2);
  border-radius: 12px;
}

.slot-day-badge {
  background: var(--olive);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.slot-body {
  flex: 1;
}

.slot-time {
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
}

.slot-venue {
  font-size: 13px;
  font-weight: 600;
  color: var(--olive);
}

.slot-title {
  font-size: 13px;
  color: var(--muted);
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.tag {
  font-size: 12px;
  color: var(--muted);
  background: var(--accent);
  padding: 4px 10px;
  border-radius: 6px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.btn-outline {
  background: white;
  border: 2px solid var(--border);
  color: var(--text);
  font-weight: 700;
}

.btn-outline:hover {
  border-color: var(--olive);
  color: var(--olive);
}

.not-found {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
}

@media (max-width: 640px) {
  .detail-main-card {
    padding: 24px 16px;
  }
  .detail-title {
    font-size: 22px;
  }
  .action-buttons {
    flex-direction: column;
  }
  .action-buttons .btn {
    width: 100%;
    text-align: center;
  }
  .timetable-slot-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

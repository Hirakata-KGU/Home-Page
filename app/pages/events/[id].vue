<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { allEvents } from '~/data/events';

const route = useRoute();
const eventId = computed(() => route.params.id as string);

const event = computed(() => {
  return allEvents.find((e) => e.id === eventId.value);
});

useSeoMeta({
  title: () => event.value ? `${event.value.title}｜平潟祭 2026` : '企画詳細｜平潟祭 2026',
  description: () => event.value ? event.value.description : '平潟祭2026 企画詳細ページ',
});
</script>

<template>
  <div>
    <!-- Breadcrumb & Header -->
    <LayoutPageHeader
      :title="event ? event.title : '企画詳細'"
      :sub-title="event ? event.categoryLabel : 'Event Details'"
      :icon="event ? event.icon : '🎪'"
      :breadcrumbs="[
        { name: '企画一覧', path: '/events' },
        { name: event ? event.title : '詳細' },
      ]"
    />

    <div class="page-container">
      <div v-if="event" class="event-detail-wrapper">
        <!-- Main Detail Card -->
        <section class="section detail-main-card">
          <div class="meta-badges">
            <span class="category-badge">{{ event.categoryLabel }}</span>
            <span class="day-badge">{{ event.dayLabel }}</span>
          </div>

          <h2 class="detail-title">{{ event.title }}</h2>

          <!-- Event Meta Info Grid -->
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">📍 開催場所</span>
              <span class="info-value">{{ event.locationName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">⏰ 開催時間</span>
              <span class="info-value">{{ event.timeRange }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">👥 主催・出演団体</span>
              <span class="info-value">{{ event.organizer }}</span>
            </div>
          </div>

          <!-- Description -->
          <div class="detail-section">
            <h3>企画概要</h3>
            <p class="description-text">{{ event.description }}</p>
          </div>

          <!-- Highlights / Details -->
          <div v-if="event.details && event.details.length" class="detail-section">
            <h3>見どころ・詳細案内</h3>
            <ul class="highlights-list">
              <li v-for="(item, idx) in event.details" :key="idx">
                <span class="check-icon">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Tags -->
          <div v-if="event.tags && event.tags.length" class="tags-row">
            <span v-for="tag in event.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <NuxtLink to="/map" class="btn btn-primary">
              🗺️ 場内マップで場所を確認
            </NuxtLink>
            <NuxtLink to="/schedule" class="btn btn-secondary">
              📅 タイムテーブルで確認
            </NuxtLink>
          </div>
        </section>

        <!-- Back to list -->
        <div class="back-link-wrapper">
          <NuxtLink to="/events" class="back-link">← 企画一覧に戻る</NuxtLink>
        </div>
      </div>

      <!-- Not Found -->
      <section v-else class="section not-found">
        <div class="not-found-icon">❓</div>
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
  gap: 24px;
}

.detail-main-card {
  padding: 40px;
}

.meta-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.category-badge {
  background: var(--accent-2);
  color: var(--olive);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 800;
}

.day-badge {
  background: var(--accent);
  color: var(--text);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
}

.detail-title {
  font-size: 28px;
  font-weight: 900;
  color: var(--olive);
  line-height: 1.3;
  margin-bottom: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  background: linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 100%);
  padding: 24px;
  border-radius: 16px;
  border-left: 6px solid var(--olive);
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--muted);
}

.info-value {
  font-size: 16px;
  font-weight: 800;
  color: var(--olive-dark);
}

.detail-section {
  margin-bottom: 28px;
}

.detail-section h3 {
  font-size: 18px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--accent-2);
}

.description-text {
  font-size: 16px;
  line-height: 1.9;
  color: var(--text);
}

.highlights-list {
  list-style: none;
  display: grid;
  gap: 12px;
}

.highlights-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
  line-height: 1.6;
}

.check-icon {
  color: var(--olive);
  font-weight: 900;
  flex-shrink: 0;
}

.tags-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.tag {
  background: var(--accent);
  color: var(--olive);
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.back-link-wrapper {
  text-align: center;
}

.back-link {
  font-weight: 800;
  color: var(--olive);
  text-decoration: none;
  font-size: 15px;
}

.back-link:hover {
  text-decoration: underline;
}

/* Not Found */
.not-found {
  text-align: center;
  padding: 60px 24px;
}

.not-found-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.not-found h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
}

.not-found p {
  color: var(--muted);
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .detail-main-card {
    padding: 24px;
  }

  .detail-title {
    font-size: 22px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .btn {
    text-align: center;
  }
}
</style>

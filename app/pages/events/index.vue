<script setup lang="ts">
import { ref, computed } from 'vue';
import { allEvents, categoryList, type EventCategory, type EventDay } from '~/data/events';

useSeoMeta({
  title: '企画・出し物・模擬店一覧｜平潟祭 2026',
  description: '平潟祭2026の全企画・模擬店・ステージ・展示・ワークショップ一覧。カテゴリや日程で簡単検索＆絞り込み！',
});

const selectedCategory = ref<'all' | EventCategory>('all');
const selectedDay = ref<'all' | EventDay>('all');
const searchQuery = ref('');

const filteredEvents = computed(() => {
  return allEvents.filter((event) => {
    // カテゴリフィルター
    if (selectedCategory.value !== 'all' && event.category !== selectedCategory.value) {
      return false;
    }
    // 日程フィルター
    if (selectedDay.value !== 'all') {
      if (event.day !== 'both' && event.day !== selectedDay.value) {
        return false;
      }
    }
    // キーワード検索
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const matchTitle = event.title.toLowerCase().includes(q);
      const matchDesc = event.description.toLowerCase().includes(q);
      const matchOrg = event.organizer.toLowerCase().includes(q);
      const matchLoc = event.locationName.toLowerCase().includes(q);
      const matchTags = event.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchOrg && !matchLoc && !matchTags) {
        return false;
      }
    }
    return true;
  });
});
</script>

<template>
  <div>
    <LayoutPageHeader
      title="企画・模擬店一覧"
      sub-title="Event Programs & Stalls"
      icon="🎪"
      :breadcrumbs="[{ name: '企画一覧' }]"
    />

    <div class="page-container">
      <!-- Search & Filter Controls -->
      <section class="section filter-section">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="企画名、サークル名、場所（SCC、文化館など）、キーワードで検索..."
            class="search-input"
          />
          <button
            v-if="searchQuery"
            class="clear-btn"
            aria-label="検索条件をクリア"
            @click="searchQuery = ''"
          >
            ✕
          </button>
        </div>

        <!-- Category Tabs -->
        <div class="category-tabs" role="tablist">
          <button
            v-for="cat in categoryList"
            :key="cat.key"
            class="tab-btn"
            :class="{ active: selectedCategory === cat.key }"
            role="tab"
            :aria-selected="selectedCategory === cat.key"
            @click="selectedCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Day Filter -->
        <div class="day-filter">
          <span class="filter-label">日程:</span>
          <button
            class="day-btn"
            :class="{ active: selectedDay === 'all' }"
            @click="selectedDay = 'all'"
          >
            すべて
          </button>
          <button
            class="day-btn"
            :class="{ active: selectedDay === 'day1' }"
            @click="selectedDay = 'day1'"
          >
            10/31（土）Day 1
          </button>
          <button
            class="day-btn"
            :class="{ active: selectedDay === 'day2' }"
            @click="selectedDay = 'day2'"
          >
            11/1（日）Day 2
          </button>
        </div>

        <div class="results-count">
          該当企画: <strong>{{ filteredEvents.length }}</strong> 件
        </div>
      </section>

      <!-- Events Grid -->
      <div v-if="filteredEvents.length > 0" class="events-grid">
        <NuxtLink
          v-for="event in filteredEvents"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="event-card"
        >
          <div
            class="event-image"
            :style="event.gradient ? { background: event.gradient } : {}"
          >
            <span class="icon-emoji">{{ event.icon }}</span>
          </div>

          <div class="event-content">
            <div class="event-meta-top">
              <span class="event-category">{{ event.categoryLabel }}</span>
              <span class="event-day-badge">{{ event.dayLabel }}</span>
            </div>

            <h3 class="event-title">{{ event.title }}</h3>
            <p class="event-desc">{{ event.description }}</p>

            <div class="event-footer">
              <div class="event-location">📍 {{ event.locationName }}</div>
              <span class="event-more-link">詳細を見る →</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- No Results -->
      <section v-else class="section no-results">
        <div class="no-results-icon">🔎</div>
        <h3>該当する企画が見つかりませんでした</h3>
        <p>検索条件やカテゴリを変更してお試しください。</p>
        <button
          class="btn btn-primary reset-btn"
          @click="selectedCategory = 'all'; selectedDay = 'all'; searchQuery = ''"
        >
          すべての条件をリセット
        </button>
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

.filter-section {
  padding: 28px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-icon {
  position: absolute;
  left: 16px;
  font-size: 18px;
  color: var(--muted);
}

.search-input {
  width: 100%;
  padding: 14px 44px;
  border-radius: 50px;
  border: 2px solid var(--border);
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--olive);
  box-shadow: 0 0 0 3px rgba(47, 91, 52, 0.15);
}

.clear-btn {
  position: absolute;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 16px;
  color: var(--muted);
  cursor: pointer;
}

.category-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.tab-btn {
  padding: 10px 20px;
  border-radius: 50px;
  border: 2px solid var(--border);
  background: white;
  cursor: pointer;
  font-weight: 800;
  color: var(--muted);
  font-size: 14px;
  transition: all 0.25s ease;
}

.tab-btn:hover {
  border-color: var(--olive);
  color: var(--olive);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
  color: white;
  border-color: transparent;
  box-shadow: var(--shadow-sm);
}

.day-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.filter-label {
  font-weight: 800;
  font-size: 13px;
  color: var(--muted);
}

.day-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--accent);
  color: var(--text);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.day-btn:hover {
  border-color: var(--olive);
}

.day-btn.active {
  background: var(--olive);
  color: white;
  border-color: var(--olive);
}

.results-count {
  margin-top: 16px;
  font-size: 13px;
  color: var(--muted);
  text-align: right;
}

.results-count strong {
  color: var(--olive);
  font-size: 16px;
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.event-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--border);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.event-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--olive);
}

.event-image {
  height: 160px;
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  color: white;
}

.event-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.event-meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}

.event-category {
  background: var(--accent-2);
  color: var(--olive);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
}

.event-day-badge {
  background: var(--accent);
  color: var(--muted);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.event-title {
  font-size: 19px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
  line-height: 1.4;
}

.event-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
}

.event-footer {
  padding-top: 12px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
}

.event-location {
  color: var(--text);
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-more-link {
  color: var(--olive);
  font-weight: 800;
  white-space: nowrap;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 60px 24px;
}

.no-results-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.no-results h3 {
  font-size: 20px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
}

.no-results p {
  color: var(--muted);
  margin-bottom: 24px;
}

.reset-btn {
  margin: 0 auto;
}

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { allEvents, categoryList, type EventCategory, type EventDay, type EventItem } from '~/data/events';

useSeoMeta({
  title: '企画・模擬店・展示一覧｜平潟祭 2026',
  description: '平潟祭2026の全59企画（模擬店・グルメ、文化館展示、音楽館・ステージライブ、芸能ステージ）一覧。カテゴリや日程、団体名で簡単検索！',
});

const route = useRoute();
const router = useRouter();

// URLクエリのパース＆正規化ヘルパー
const normalizeCategory = (cat: unknown): 'all' | EventCategory => {
  if (typeof cat !== 'string') return 'all';
  const c = cat.toLowerCase().trim();
  if (c === 'food' || c === 'gourmet' || c === '模擬店' || c === 'グルメ') return 'food';
  if (c === 'culture' || c === '文化館' || c === '展示') return 'culture';
  if (c === 'music' || c === 'stage' || c === '音楽館' || c === 'ステージ') return 'music';
  if (c === 'entertainment' || c === 'geino' || c === '芸能' || c === 'talkshow') return 'entertainment';
  return 'all';
};

const normalizeDay = (day: unknown): 'all' | EventDay => {
  if (typeof day !== 'string') return 'all';
  const d = day.toLowerCase().trim();
  if (d === 'day1' || d === '1' || d === '1日目') return 'day1';
  if (d === 'day2' || d === '2' || d === '2日目') return 'day2';
  if (d === 'both' || d === '両日') return 'both';
  return 'all';
};

// クエリパラメータから初期値を復元
const selectedCategory = ref<'all' | EventCategory>(
  normalizeCategory(route.query.category || route.query.cat)
);
const selectedSubCategory = ref<string>(
  (typeof (route.query.subCategory || route.query.sub) === 'string'
    ? (route.query.subCategory || route.query.sub) as string
    : 'all')
);
const selectedDay = ref<'all' | EventDay>(normalizeDay(route.query.day));
const searchQuery = ref<string>(
  typeof (route.query.q || route.query.search) === 'string'
    ? ((route.query.q || route.query.search) as string)
    : ''
);

// URLクエリの同期処理
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let isSyncingFromRoute = false;

const syncUrlQuery = (debounce = false) => {
  if (!import.meta.client || isSyncingFromRoute) return;

  const update = () => {
    const query: Record<string, string> = {};

    if (searchQuery.value.trim()) {
      query.q = searchQuery.value.trim();
    }
    if (selectedCategory.value !== 'all') {
      query.category = selectedCategory.value;
    }
    if (selectedSubCategory.value !== 'all') {
      query.sub = selectedSubCategory.value;
    }
    if (selectedDay.value !== 'all') {
      query.day = selectedDay.value;
    }

    router.replace({ query });
  };

  if (debounce) {
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(update, 300);
  } else {
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    update();
  }
};

// カテゴリ変更時にサブカテゴリをリセット
const onSelectCategory = (catKey: 'all' | EventCategory) => {
  selectedCategory.value = catKey;
  selectedSubCategory.value = 'all';
};

// 現在選択されているカテゴリに応じたサブカテゴリのリスト
const availableSubCategories = computed(() => {
  const eventsInCat = selectedCategory.value === 'all'
    ? allEvents
    : allEvents.filter(e => e.category === selectedCategory.value);

  const map = new Map<string, number>();
  for (const ev of eventsInCat) {
    if (ev.subCategory) {
      map.set(ev.subCategory, (map.get(ev.subCategory) || 0) + 1);
    }
  }

  const items: { name: string; count: number }[] = [];
  for (const [name, count] of map.entries()) {
    items.push({ name, count });
  }
  return items;
});

// 各メインカテゴリの件数（categoryListに基づいて動的集計）
const categoryCounts = computed(() => {
  const counts: Record<string, number> = { all: allEvents.length };
  for (const cat of categoryList) {
    if (cat.key !== 'all') {
      counts[cat.key] = allEvents.filter(e => e.category === cat.key).length;
    }
  }
  return counts;
});

// フィルタリング処理
const filteredEvents = computed(() => {
  return allEvents.filter((event) => {
    // カテゴリフィルター
    if (selectedCategory.value !== 'all' && event.category !== selectedCategory.value) {
      return false;
    }

    // サブカテゴリフィルター
    if (selectedSubCategory.value !== 'all' && event.subCategory !== selectedSubCategory.value) {
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
      const matchSub = event.subCategory.toLowerCase().includes(q);
      const matchSales = event.salesInfo ? event.salesInfo.toLowerCase().includes(q) : false;
      const matchTags = event.tags.some((t) => t.toLowerCase().includes(q));

      if (!matchTitle && !matchDesc && !matchOrg && !matchLoc && !matchSub && !matchSales && !matchTags) {
        return false;
      }
    }

    return true;
  });
});

// 全条件リセット
const resetFilters = () => {
  selectedCategory.value = 'all';
  selectedSubCategory.value = 'all';
  selectedDay.value = 'all';
  searchQuery.value = '';
};

// フィルター変更の監視（URLへ同期）
watch([selectedCategory, selectedSubCategory, selectedDay], () => {
  syncUrlQuery(false);
});

watch(searchQuery, () => {
  syncUrlQuery(true);
});

// ブラウザの戻る/進むや外部リンクによるURL変化を監視・状態へ反映
watch(
  () => route.query,
  (newQuery) => {
    isSyncingFromRoute = true;
    const nextCat = normalizeCategory(newQuery.category || newQuery.cat);
    const nextSub = (typeof (newQuery.subCategory || newQuery.sub) === 'string'
      ? (newQuery.subCategory || newQuery.sub) as string
      : 'all');
    const nextDay = normalizeDay(newQuery.day);
    const nextQ = typeof (newQuery.q || newQuery.search) === 'string'
      ? ((newQuery.q || newQuery.search) as string)
      : '';

    if (selectedCategory.value !== nextCat) selectedCategory.value = nextCat;
    if (selectedSubCategory.value !== nextSub) selectedSubCategory.value = nextSub;
    if (selectedDay.value !== nextDay) selectedDay.value = nextDay;
    if (searchQuery.value !== nextQ) searchQuery.value = nextQ;

    setTimeout(() => {
      isSyncingFromRoute = false;
    }, 50);
  }
);
</script>

<template>
  <div>
    <!-- ページヘッダー（絵文字不使用） -->
    <LayoutPageHeader
      title="企画・出店・展示一覧"
      sub-title="Festival Programs & Stalls"
      :breadcrumbs="[{ name: '企画一覧' }]"
    />

    <div class="page-container">
      <!-- 検索・フィルターエリア -->
      <section class="section filter-section shadow-sm">
        <!-- 検索入力 -->
        <div class="search-box">
          <svg class="search-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="企画名、サークル・団体名、場所（テント、教室番号）、メニューで検索..."
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

        <!-- メインカテゴリタブ -->
        <div class="filter-group">
          <div class="filter-label">カテゴリ:</div>
          <div class="category-tabs" role="tablist">
            <button
              v-for="cat in categoryList"
              :key="cat.key"
              class="tab-btn"
              :class="{ active: selectedCategory === cat.key }"
              role="tab"
              :aria-selected="selectedCategory === cat.key"
              @click="onSelectCategory(cat.key)"
            >
              <span>{{ cat.label }}</span>
              <span class="tab-count">{{ categoryCounts[cat.key] }}</span>
            </button>
          </div>
        </div>

        <!-- サブカテゴリ（絞り込みチップ） -->
        <div v-if="availableSubCategories.length > 1" class="filter-group sub-category-group">
          <div class="filter-label">ジャンル / 形態:</div>
          <div class="sub-chip-list">
            <button
              class="sub-chip"
              :class="{ active: selectedSubCategory === 'all' }"
              @click="selectedSubCategory = 'all'"
            >
              すべて
            </button>
            <button
              v-for="sub in availableSubCategories"
              :key="sub.name"
              class="sub-chip"
              :class="{ active: selectedSubCategory === sub.name }"
              @click="selectedSubCategory = sub.name"
            >
              {{ sub.name }} ({{ sub.count }})
            </button>
          </div>
        </div>

        <!-- 日程フィルター -->
        <div class="filter-group day-filter-group">
          <div class="filter-label">開催日:</div>
          <div class="day-filter">
            <button
              class="day-btn"
              :class="{ active: selectedDay === 'all' }"
              @click="selectedDay = 'all'"
            >
              両日・すべて
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
        </div>

        <!-- 該当件数 & アクティブ条件リセット -->
        <div class="filter-footer">
          <div class="results-count">
            該当企画: <strong>{{ filteredEvents.length }}</strong> 件 / 全 59 件
          </div>
          <button
            v-if="selectedCategory !== 'all' || selectedSubCategory !== 'all' || selectedDay !== 'all' || searchQuery"
            class="reset-text-btn"
            @click="resetFilters"
          >
            条件をすべてクリア
          </button>
        </div>
      </section>

      <!-- 企画一覧グリッド -->
      <div v-if="filteredEvents.length > 0" class="events-grid">
        <NuxtLink
          v-for="event in filteredEvents"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="event-card"
        >
          <!-- カード上部ヘッダー（グラデーションバー） -->
          <div
            class="event-card-header"
            :style="{ background: event.gradient || 'linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%)' }"
          >
            <div class="header-badges">
              <span class="category-chip">{{ event.categoryLabel }}</span>
              <span class="sub-chip-header">{{ event.subCategory }}</span>
            </div>
            <span class="day-chip">{{ event.dayLabel }}</span>
          </div>

          <!-- カードコンテンツ -->
          <div class="event-content">
            <div class="event-organizer-row">
              <span class="organizer-badge">{{ event.organizer }}</span>
            </div>

            <h3 class="event-title">{{ event.title }}</h3>

            <p class="event-desc">{{ event.description }}</p>

            <!-- 模擬店の販売メニュー情報プレビュー -->
            <div v-if="event.salesInfo" class="event-sales-preview">
              <div class="sales-preview-label">メニュー・価格:</div>
              <div class="sales-preview-text">{{ event.salesInfo }}</div>
            </div>

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
      </div>

      <!-- 検索該当なしの場合 -->
      <section v-else class="section no-results">
        <h3>該当する企画が見つかりませんでした</h3>
        <p>条件を変更して再度お試しいただくか、リセットボタンを押してください。</p>
        <button
          class="btn btn-primary reset-btn"
          @click="resetFilters"
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
  padding: 24px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
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
  color: var(--muted);
}

.search-input {
  width: 100%;
  padding: 12px 44px;
  border-radius: 50px;
  border: 2px solid var(--border);
  font-size: 14px;
  font-family: inherit;
  transition: all 0.25s ease;
  background: var(--bg-alt, #fafaf9);
}

.search-input:focus {
  outline: none;
  background: white;
  border-color: var(--olive);
  box-shadow: 0 0 0 3px rgba(47, 91, 52, 0.12);
}

.clear-btn {
  position: absolute;
  right: 14px;
  background: transparent;
  border: none;
  font-size: 15px;
  color: var(--muted);
  cursor: pointer;
  padding: 4px;
}

.filter-group {
  margin-bottom: 16px;
}

.filter-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--muted);
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.category-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 50px;
  border: 2px solid var(--border);
  background: white;
  cursor: pointer;
  font-weight: 700;
  color: var(--muted);
  font-size: 13px;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  border-color: var(--olive);
  color: var(--olive);
}

.tab-btn.active {
  background: var(--olive);
  color: white;
  border-color: var(--olive);
  box-shadow: var(--shadow-sm);
}

.tab-count {
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.06);
  color: inherit;
  font-weight: 800;
}

.tab-btn.active .tab-count {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

.sub-chip-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.sub-chip {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--accent);
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sub-chip:hover {
  border-color: var(--olive);
}

.sub-chip.active {
  background: var(--olive-light, #4a7f52);
  color: white;
  border-color: var(--olive-light, #4a7f52);
}

.day-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.day-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: white;
  color: var(--text);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.day-btn:hover {
  border-color: var(--olive);
}

.day-btn.active {
  background: var(--text, #222);
  color: white;
  border-color: var(--text, #222);
}

.filter-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  font-size: 13px;
}

.results-count {
  color: var(--muted);
}

.results-count strong {
  color: var(--olive);
  font-size: 16px;
}

.reset-text-btn {
  background: none;
  border: none;
  color: var(--olive);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
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

.event-card-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.header-badges {
  display: flex;
  gap: 6px;
  align-items: center;
}

.category-chip {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  letter-spacing: 0.02em;
}

.sub-chip-header {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.9;
}

.day-chip {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
}

.event-content {
  padding: 20px;
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
  font-size: 18px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 8px;
  line-height: 1.4;
}

.event-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.event-sales-preview {
  background: #fdfbf7;
  border: 1px dashed rgba(201, 168, 90, 0.5);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 12px;
}

.sales-preview-label {
  font-size: 11px;
  font-weight: 800;
  color: #997825;
  margin-bottom: 2px;
}

.sales-preview-text {
  font-size: 12px;
  color: #555;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

.no-results {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
}

.no-results h3 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 8px;
}

.no-results p {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 20px;
}

.reset-btn {
  padding: 10px 24px;
  border-radius: 50px;
}

@media (max-width: 640px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
  .filter-section {
    padding: 16px;
  }
}
</style>

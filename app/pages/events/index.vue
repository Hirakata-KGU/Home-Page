<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { allEvents, categoryList, type EventCategory, type EventDay, type EventItem } from '~/data/events';

useSeoMeta({
  title: '企画一覧｜平潟祭 2026',
  description: '平潟祭2026の全5企画（模擬店・グルメ、文化館展示、音楽館・ステージライブ、芸能ステージ）一覧。カテゴリや日程、団体名で簡単検索！',
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

// カテゴリ変更
const onSelectCategory = (catKey: 'all' | EventCategory) => {
  selectedCategory.value = catKey;
};

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
  selectedDay.value = 'all';
  searchQuery.value = '';
};

// フィルター変更の監視（URLへ同期）
watch([selectedCategory, selectedDay], () => {
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
    const nextDay = normalizeDay(newQuery.day);
    const nextQ = typeof (newQuery.q || newQuery.search) === 'string'
      ? ((newQuery.q || newQuery.search) as string)
      : '';

    if (selectedCategory.value !== nextCat) selectedCategory.value = nextCat;
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
            v-if="selectedCategory !== 'all' || selectedDay !== 'all' || searchQuery"
            class="reset-text-btn"
            @click="resetFilters"
          >
            条件をすべてクリア
          </button>
        </div>
      </section>

      <!-- 企画一覧グリッド -->
      <div v-if="filteredEvents.length > 0" class="events-grid">
        <UiEventCard
          v-for="event in filteredEvents"
          :key="event.id"
          :event="event"
        />
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

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getBuildingDataList } from '~/data/map-buildings';
import CampusOverallMap from '~/components/map/CampusOverallMap.vue';
import EventCard from '~/components/ui/EventCard.vue';
import { foodBooths } from '~/data/events';

useSeoMeta({
  title: '場内マップ・模擬店・施設案内｜平潟祭 2026',
  description: '平潟祭2026のキャンパス全体マップ、模擬店エリア（全24テント）、3号館、6号館、7号館（音楽館）、8号館（文化館）、屋内ステージ（SCC）の配置および各階企画案内。',
});

type TabKey = 'all' | 'no3' | 'no6' | 'no7' | 'no8' | 'scc';

const route = useRoute();
const router = useRouter();

const validTabs: TabKey[] = ['all', 'no3', 'no6', 'no7', 'no8', 'scc'];
const initialTab = (route.query.tab as TabKey);
const currentTab = ref<TabKey>(validTabs.includes(initialTab) ? initialTab : 'all');

watch(() => route.query.tab, (newTab) => {
  if (newTab && validTabs.includes(newTab as TabKey)) {
    currentTab.value = newTab as TabKey;
  }
});

const setTab = (key: TabKey) => {
  currentTab.value = key;
  router.replace({ query: key === 'all' ? {} : { tab: key } });
};

const tabs: { key: TabKey; label: string; sub: string }[] = [
  { key: 'all', label: '全体マップ', sub: 'Campus & Tents' },
  { key: 'no3', label: '3号館', sub: 'No.3' },
  { key: 'no6', label: '6号館', sub: 'No.6' },
  { key: 'no7', label: '7号館', sub: 'Music Hall' },
  { key: 'no8', label: '8号館', sub: 'Culture Hall' },
  { key: 'scc', label: '屋内ステージ', sub: 'SCC 4F' },
];

const buildingDataList = getBuildingDataList();

const currentBuilding = computed(() => {
  if (currentTab.value === 'all') return null;
  return buildingDataList[currentTab.value] || null;
});

const handleSelectBuildingFromMap = (buildingId: 'no3' | 'no6' | 'no7' | 'no8' | 'scc') => {
  setTab(buildingId);
  // 画面トップまたはセクショントップへスムーズスクロール
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 280, behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="map-page">
    <LayoutPageHeader
      title="場内マップ・施設案内"
      sub-title="Campus & Building Maps"
      :breadcrumbs="[{ name: '場内マップ' }]"
    />

    <div class="page-container">
      <!-- ナビゲーションタブ -->
      <section class="section nav-section">
        <div class="tab-list-wrapper" role="tablist" aria-label="場内エリア切り替え">
          <button
            v-for="t in tabs"
            :key="t.key"
            class="map-tab-btn"
            :class="{ 'is-active': currentTab === t.key }"
            role="tab"
            :aria-selected="currentTab === t.key"
            @click="setTab(t.key)"
          >
            <span class="tab-main-label">{{ t.label }}</span>
            <span class="tab-sub-label">{{ t.sub }}</span>
          </button>
        </div>
      </section>

      <!-- 1. 全体マップタブ -->
      <Transition name="fade-fast" mode="out-in">
        <section v-if="currentTab === 'all'" key="tab-all" class="map-content-section">
          <div class="section-heading text-center mb-6">
            <h2 class="text-2xl sm:text-3xl font-black text-[#2f5b34]">
              キャンパス全体 ＆ 模擬店エリア
            </h2>
            <p class="text-sm sm:text-base text-[#6b7280] mt-1 font-medium">
              Overall Campus & Food Stalls Map
            </p>
          </div>

          <!-- 全体マップ本体 -->
          <CampusOverallMap @select-building="handleSelectBuildingFromMap" />

          <!-- 模擬店テント一覧クイックリスト -->
          <div class="stalls-quick-list mt-12 pt-8 border-t border-gray-200">
            <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h3 class="text-xl font-extrabold text-[#2f5b34]">
                  模擬店テント出店一覧（全22店舗 ＋ 企業ブース）
                </h3>
                <p class="text-xs sm:text-sm text-[#6b7280] mt-0.5">
                  マップ上のテント、または下記の一覧から企画詳細をご確認いただけます。
                </p>
              </div>
              <NuxtLink
                to="/events"
                class="text-xs sm:text-sm font-bold text-[#2f5b34] hover:underline flex items-center gap-1"
              >
                全企画一覧を見る →
              </NuxtLink>
            </div>

            <div class="stalls-grid">
              <div
                v-for="stall in foodBooths"
                :key="stall.id"
                class="stall-item-card"
              >
                <NuxtLink :to="`/events/${stall.id}`" class="stall-link">
                  <div class="stall-tent-badge">
                    {{ stall.tentNo ? (String(stall.tentNo).includes('テント') ? stall.tentNo : `テントNo.${stall.tentNo}`) : '模擬店' }}
                  </div>
                  <div class="stall-info">
                    <h4 class="stall-item-title">{{ stall.item }}</h4>
                    <p class="stall-group-name">{{ stall.groupName }}</p>
                  </div>
                  <span class="stall-arrow">→</span>
                </NuxtLink>
              </div>

              <!-- 企業テント -->
              <div class="stall-item-card company-item">
                <div class="stall-link cursor-default">
                  <div class="stall-tent-badge company-badge">企業1</div>
                  <div class="stall-info">
                    <h4 class="stall-item-title">企業協賛ブース①</h4>
                    <p class="stall-group-name">協賛企業による特別体験・PRコーナー</p>
                  </div>
                </div>
              </div>
              <div class="stall-item-card company-item">
                <div class="stall-link cursor-default">
                  <div class="stall-tent-badge company-badge">企業2</div>
                  <div class="stall-info">
                    <h4 class="stall-item-title">企業協賛ブース②</h4>
                    <p class="stall-group-name">協賛企業による特別体験・PRコーナー</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. 建物別タブ（3号館、6号館、7号館、8号館、SCC） -->
        <section v-else-if="currentBuilding" :key="`tab-${currentBuilding.id}`" class="building-detail-section">
          <!-- 建物案内ヘッダー -->
          <div class="building-header-card">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="building-badge-pill">{{ currentBuilding.subName }}</div>
                <h2 class="text-2xl sm:text-3xl font-black text-[#2f5b34] mt-2">
                  {{ currentBuilding.name }} フロア案内
                </h2>
                <p class="text-sm sm:text-base text-[#4b5563] mt-2 leading-relaxed max-w-2xl">
                  {{ currentBuilding.description }}
                </p>
              </div>

              <button
                type="button"
                class="back-to-map-btn"
                @click="setTab('all')"
              >
                ← 全体マップに戻る
              </button>
            </div>
          </div>

          <!-- 階層（フロア）ごとの企画カード一覧 -->
          <div class="floors-container mt-8 space-y-10">
            <div
              v-for="fl in currentBuilding.floors"
              :key="fl.floor"
              class="floor-block"
            >
              <!-- フロア見出し -->
              <div class="floor-heading-row">
                <div class="floor-badge-tag">{{ fl.floor }}</div>
                <div>
                  <h3 class="text-lg sm:text-xl font-extrabold text-[#2f5b34]">
                    {{ fl.floorLabel }}
                  </h3>
                  <p v-if="fl.description" class="text-xs sm:text-sm text-[#6b7280] mt-0.5">
                    {{ fl.description }}
                  </p>
                </div>
              </div>

              <!-- そのフロアのEventCard一覧 -->
              <div v-if="fl.events.length > 0" class="events-grid-responsive mt-4">
                <EventCard
                  v-for="ev in fl.events"
                  :key="ev.id"
                  :event="ev"
                />
              </div>
              <div v-else class="empty-floor-box mt-4">
                <p class="text-sm text-[#9ca3af]">このフロアの一般公開企画はありません。</p>
              </div>
            </div>
          </div>
        </section>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: var(--max-width, 1200px);
  margin: -32px auto 80px;
  padding: 0 16px;
  position: relative;
  z-index: 10;
  display: grid;
  gap: 24px;
}

@media (min-width: 640px) {
  .page-container {
    padding: 0 24px;
    gap: 32px;
  }
}

.nav-section {
  padding: 8px 0;
}

.tab-list-wrapper {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
  justify-content: flex-start;
}

@media (min-width: 768px) {
  .tab-list-wrapper {
    justify-content: center;
    gap: 12px;
  }
}

.map-tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 12px;
  border: 1.5px solid var(--border, #e5e5e5);
  background: white;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;
  min-width: 100px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.map-tab-btn:hover {
  border-color: var(--olive, #2f5b34);
  color: var(--olive, #2f5b34);
  transform: translateY(-1px);
}

.map-tab-btn.is-active {
  background: linear-gradient(135deg, var(--olive, #2f5b34) 0%, var(--olive-light, #4a7f52) 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(47, 91, 52, 0.25);
}

.tab-main-label {
  font-size: 14px;
  font-weight: 800;
}

.tab-sub-label {
  font-size: 10px;
  font-weight: 600;
  opacity: 0.75;
}

.is-active .tab-sub-label {
  opacity: 0.9;
}

/* 建物ヘッダーカード */
.building-header-card {
  background: linear-gradient(135deg, #ffffff 0%, #f6faed 100%);
  border: 1px solid var(--border, #e5e5e5);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.building-badge-pill {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  color: var(--olive, #2f5b34);
  background: rgba(47, 91, 52, 0.1);
  padding: 3px 10px;
  border-radius: 20px;
}

.back-to-map-btn {
  align-self: flex-start;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 800;
  color: var(--olive, #2f5b34);
  background: white;
  border: 1.5px solid var(--olive, #2f5b34);
  border-radius: 50px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.back-to-map-btn:hover {
  background: var(--olive, #2f5b34);
  color: white;
}

/* フロアブロック */
.floor-block {
  background: white;
  border: 1px solid var(--border, #e5e5e5);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

@media (min-width: 640px) {
  .floor-block {
    padding: 28px;
  }
}

.floor-heading-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1.5px solid #f0f0f0;
}

.floor-badge-tag {
  background: linear-gradient(135deg, var(--olive, #2f5b34) 0%, #4a7f52 100%);
  color: white;
  font-size: 18px;
  font-weight: 900;
  padding: 6px 14px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(47, 91, 52, 0.2);
}

.events-grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

@media (min-width: 640px) {
  .events-grid-responsive {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }
}

.empty-floor-box {
  background: #fdfbf7;
  padding: 24px;
  text-align: center;
  border-radius: 8px;
  border: 1px dashed #e5e5e5;
}

/* 模擬店クイックリスト */
.stalls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.stall-item-card {
  background: white;
  border: 1px solid var(--border, #e5e5e5);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.stall-item-card:hover {
  border-color: var(--olive, #2f5b34);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.stall-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.stall-tent-badge {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 800;
  color: #c9a063;
  background: #fbf8f2;
  border: 1px solid #c9a063;
  padding: 3px 8px;
  border-radius: 6px;
}

.stall-tent-badge.company-badge {
  color: var(--olive, #2f5b34);
  background: #f1f8f2;
  border-color: var(--olive, #2f5b34);
}

.stall-info {
  flex: 1;
  min-width: 0;
}

.stall-item-title {
  font-size: 14px;
  font-weight: 800;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stall-group-name {
  font-size: 11px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stall-arrow {
  font-size: 12px;
  font-weight: 800;
  color: var(--olive, #2f5b34);
}

/* トランジション */
.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>

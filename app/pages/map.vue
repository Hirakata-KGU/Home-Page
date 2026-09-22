<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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

// URLクエリの変更（ブラウザの戻る・進むボタン含む）を検知してタブを同期
watch(() => route.query.tab, (newTab) => {
  if (newTab && validTabs.includes(newTab as TabKey)) {
    currentTab.value = newTab as TabKey;
  } else {
    // クエリがない場合は全体マップに戻る
    currentTab.value = 'all';
  }
});

// タブを切り替え、履歴に積む (router.push)
const setTab = (key: TabKey, isPush = true) => {
  if (currentTab.value === key && (route.query.tab || 'all') === key) return;
  currentTab.value = key;
  const query = key === 'all' ? {} : { tab: key };
  if (isPush) {
    router.push({ path: '/map', query });
  } else {
    router.replace({ path: '/map', query });
  }
};

const tabs: { key: TabKey; label: string; sub: string; title: string }[] = [
  { key: 'all', label: '全体マップ', sub: 'キャンパス＆模擬店', title: '全体マップ' },
  { key: 'no3', label: '社会連携館', sub: '3号館', title: '社会連携館 (3号館)' },
  { key: 'scc', label: '屋内ステージ', sub: 'SCC 4F', title: '屋内ステージ (SCC 4F)' },
  { key: 'no7', label: '音楽館', sub: '7号館', title: '音楽館 (7号館)' },
  { key: 'no8', label: '文化館 (8号館)', sub: '8号館', title: '文化館 (8号館)' },
  { key: 'no6', label: '文化館 (6号館)', sub: '6号館', title: '文化館 (6号館)' },
];

const currentTabInfo = computed(() => tabs.find(t => t.key === currentTab.value));

const buildingDataList = getBuildingDataList();

const currentBuilding = computed(() => {
  if (currentTab.value === 'all') return null;
  return buildingDataList[currentTab.value] || null;
});

const handleSelectBuildingFromMap = (buildingId: 'no3' | 'no6' | 'no7' | 'no8' | 'scc') => {
  setTab(buildingId, true);
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 260, behavior: 'smooth' });
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

    <div class="page-container pb-20">
      <!-- 1. マップ選択box -->
      <nav class="map-nav-wrapper pb-6 sm:pb-8" aria-label="場内エリア切り替え">
        <div class="tab-grid" role="tablist">
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
      </nav>

      <!-- 2. 全体マップタブ -->
      <Transition name="fade-fast" mode="out-in">
        <section v-if="currentTab === 'all'" key="tab-all" class="map-content-section">
          <!-- その下の文字 -->
          <div class="section-heading-box pb-4 sm:pb-6">
            <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-[#2f5b34]">
              {{ currentTabInfo?.title }}
            </h2>
            <p class="text-xs sm:text-sm text-[#6b7280] mt-1 font-medium">
              キャンパス ＆ 模擬店エリア
            </p>
          </div>

          <!-- 地図説明 ＆ 地図（全体マップは最初の幅 max-width: 820px） -->
          <CampusOverallMap @select-building="handleSelectBuildingFromMap" />
        </section>

        <!-- 3. 建物別タブ（3号館、6号館、7号館、8号館、SCC） -->
        <section v-else-if="currentBuilding" :key="`tab-${currentBuilding.id}`" class="building-detail-section">
          <!-- 建物案内見出し（ボタン表記と統一） -->
          <div class="section-heading-box pb-4 sm:pb-6">
            <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-[#2f5b34]">
              {{ currentTabInfo?.title }}
            </h2>
            <p class="text-xs sm:text-sm text-[#6b7280] mt-1 font-medium max-w-2xl mx-auto">
              {{ currentBuilding.description }}
            </p>
          </div>

          <!-- 階層（フロア）ごとの企画カード一覧 -->
          <div class="floors-container mt-6 space-y-8">
            <div
              v-for="fl in currentBuilding.floors"
              :key="fl.floor"
              class="floor-block"
            >
              <!-- フロア見出し（サブの薄い文字は削除） -->
              <div class="floor-heading-row">
                <div class="floor-badge-tag">{{ fl.floor }}</div>
                <div>
                  <h3 class="text-base sm:text-lg font-extrabold text-[#2f5b34]">
                    {{ fl.floorLabel }}
                  </h3>
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
                <p class="text-xs sm:text-sm text-[#9ca3af]">このフロアの一般公開企画はありません。</p>
              </div>
            </div>
          </div>
        </section>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  width: 100%;
  display: flex;
  overflow-x: hidden;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 0 50px 0;
}

/* ページ全体の共通コンテナ */
.page-container {
  max-width: 1400px;
  padding: 0 16px;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

/* 1. マップ選択box（最大幅1400px） */
.map-nav-wrapper {
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  box-sizing: border-box;
}

.tab-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* スマホは3列×2行でピッタリ収まる */
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .tab-grid {
    grid-template-columns: repeat(6, 1fr); /* PC・タブレットは6列均等 */
    gap: 10px;
  }
}

.map-tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 6px;
  border-radius: 12px;
  border: 1.5px solid var(--border, #e5e5e5);
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
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
  box-shadow: 0 3px 10px rgba(47, 91, 52, 0.25);
}

.tab-main-label {
  font-size: 13px;
  font-weight: 800;
  line-height: 1.2;
}

.tab-sub-label {
  font-size: 9.5px;
  font-weight: 600;
  opacity: 0.75;
  margin-top: 2px;
  white-space: nowrap;
}

.is-active .tab-sub-label {
  opacity: 0.95;
}

/* 2. その下の文字（見出し：最大幅1400px） */
.section-heading-box {
  text-align: center;
  margin: 4px auto 16px;
  width: 100%;
  max-width: 1400px;
}

/* 全体マップセクション（地図は最初の幅 max-width: 820px） */
.map-content-section {
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* 3. 建物詳細セクション（企画一覧は広々 max-width: 1400px） */
.building-detail-section {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}

.floor-block {
  background: white;
  border: 1px solid var(--border, #e5e5e5);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .floor-block {
    padding: 24px;
  }
}

.floor-heading-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1.5px solid #f0f0f0;
}

.floor-badge-tag {
  background: linear-gradient(135deg, var(--olive, #2f5b34) 0%, #4a7f52 100%);
  color: white;
  font-size: 16px;
  font-weight: 900;
  padding: 4px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(47, 91, 52, 0.2);
}

.events-grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 16px;
}

.empty-floor-box {
  background: #fdfbf7;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  border: 1px dashed #e5e5e5;
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

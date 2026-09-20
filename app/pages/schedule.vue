<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  parallelScheduleData,
  getVenueCategory,
  type VenueCategory,
  type TimetableSlot,
} from '~/data/schedule';

useSeoMeta({
  title: 'タイムテーブル｜平潟祭 2026',
  description: '平潟祭2026のステージ＆音楽タイムテーブル。屋外ステージ、屋内ステージ（SCC 4階）、チャペル、体育館、1号館前の全33出演プログラムを一覧掲載！',
});

const activeDayId = ref<'day1' | 'day2'>('day1');

// 5会場の定義
const venueLanes: { key: VenueCategory; label: string; sub: string; colClass: string }[] = [
  { key: 'outdoor', label: '屋外ステージ', sub: '', colClass: 'outdoor-col' },
  { key: 'indoor', label: '屋内ステージ', sub: 'SCC 4F', colClass: 'indoor-col' },
  { key: 'chapel', label: 'チャペル', sub: '', colClass: 'chapel-col' },
  { key: 'gym', label: '体育館', sub: '', colClass: 'gym-col' },
  { key: 'bldg1', label: '1号館前', sub: '', colClass: 'bldg1-col' },
];

// タップ（クリック）で展開・固定されているスロットID（スマホ用）
const activeSlotId = ref<string | null>(null);

// マウス操作可能か（ホバー対応端末かどうか）
const isHoverDevice = ref(false);

// タイムグリッドの基本設定（1時間ごと）
const START_HOUR = 10; // 10:00
const END_HOUR = 18;   // 18:00
const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const HOUR_HEIGHT = 110; // 1時間あたりのピクセル高さ
const MINUTE_HEIGHT = HOUR_HEIGHT / 60; // 1分あたりのピクセル高さ

// 10:00 と 18:00 の見切れ防止用上下余白
const GRID_OFFSET_TOP = 40;
const GRID_OFFSET_BOTTOM = 100;
const TOTAL_HEIGHT = (END_HOUR - START_HOUR) * HOUR_HEIGHT + GRID_OFFSET_TOP + GRID_OFFSET_BOTTOM; // 約936px

// スロットの位置計算（top）
const getSlotTop = (slot: TimetableSlot): number => {
  const startMin = Number(slot.startMinutes);
  const baseMin = START_HOUR * 60; // 600
  return (startMin - baseMin) * MINUTE_HEIGHT + GRID_OFFSET_TOP;
};

// スロットの高さ計算（height）
const getSlotHeight = (slot: TimetableSlot): number => {
  const durMin = Number(slot.durationMinutes);
  return Math.max(34, durMin * MINUTE_HEIGHT - 6);
};

// 会場ごとのスロット分類
const getSlotsForVenue = (slots: TimetableSlot[], venueKey: VenueCategory): TimetableSlot[] => {
  return slots.filter((s) => getVenueCategory(s.venue) === venueKey);
};

// カードクリック時のハンドラー
const handleSlotClick = (e: MouseEvent, slot: TimetableSlot) => {
  e.stopPropagation();

  // マウス端末（ホバー状態）の場合、1クリックで即座に企画詳細へ遷移
  if (isHoverDevice.value) {
    navigateTo(`/events/${slot.id}`);
    return;
  }

  // タッチ端末の場合：すでに展開中なら詳細へ遷移、未展開なら展開・固定
  if (activeSlotId.value === slot.slotId) {
    navigateTo(`/events/${slot.id}`);
  } else {
    activeSlotId.value = slot.slotId;
  }
};

// ほかの場所をクリックした時の解除ハンドラー
const closeActiveSlot = () => {
  activeSlotId.value = null;
};

onMounted(() => {
  if (import.meta.client) {
    isHoverDevice.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    window.addEventListener('click', closeActiveSlot);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('click', closeActiveSlot);
  }
});
</script>

<template>
  <div @click="closeActiveSlot">
    <!-- ページヘッダー（絵文字不使用） -->
    <LayoutPageHeader
      title="タイムテーブル"
      sub-title="Timetable 2026.10.31 - 11.1"
      :breadcrumbs="[{ name: 'タイムテーブル' }]"
    />

    <div class="page-container">
      <!-- 操作コントロールセクション -->
      <section class="section controls-section shadow-sm" @click.stop>
        <div class="controls-header">
          <!-- 日程タブ -->
          <div class="day-tabs" role="tablist">
            <button
              v-for="day in parallelScheduleData"
              :key="day.id"
              class="tab-btn"
              :class="{ active: activeDayId === day.id }"
              role="tab"
              :aria-selected="activeDayId === day.id"
              @click="activeDayId = day.id; activeSlotId = null;"
            >
              {{ day.dayName }}（{{ day.dateLabel }}）
            </button>
          </div>

          <!-- パンフレット案内 -->
          <div class="header-right-tools">
            <NuxtLink to="/pamphlet" class="pamphlet-link-badge">
              電子パンフレットを見る →
            </NuxtLink>
          </div>
        </div>

        <p class="hint-text">
          ※ 画面を左右にスクロールして全5会場のタイムテーブルをご覧いただけます。<br />
          ※ プログラムにカーソルを合わせるかタップすると最前面へ展開されます（他の場所をクリックすると解除されます）。
        </p>
      </section>

      <!-- タイムグリッド表（全5会場並列・横スクロール可能） -->
      <div class="grid-view-wrapper">
        <section
          v-for="day in parallelScheduleData"
          v-show="activeDayId === day.id"
          :key="day.id"
          class="section timetable-grid-section shadow-sm"
        >
          <!-- 横スクロールコンテナ -->
          <div class="timetable-scroll-container">
            <div class="timetable-grid" :style="{ height: TOTAL_HEIGHT + 'px' }">
              <!-- グリッドヘッダー（固定）: 時間(70px) + 5会場(各minmax(180px, 1fr)) -->
              <div class="grid-header">
                <div class="time-header-cell">時間</div>
                <div
                  v-for="venue in venueLanes"
                  :key="venue.key"
                  class="venue-header-cell"
                  :class="venue.colClass"
                >
                  <h3>{{ venue.label }}</h3>
                  <p>{{ venue.sub }}</p>
                </div>
              </div>

              <!-- グリッド本体 -->
              <div class="grid-body" :style="{ height: (TOTAL_HEIGHT - 54) + 'px' }">
                <!-- 背景の1時間ごと水平グリッド線（全体を横断） -->
                <div class="grid-background-lines">
                  <div
                    v-for="hour in HOURS"
                    :key="hour"
                    class="hour-line-node"
                    :style="{ top: ((hour - START_HOUR) * HOUR_HEIGHT + GRID_OFFSET_TOP) + 'px' }"
                  >
                    <div class="hour-line"></div>
                    <!-- 30分の補助点線 -->
                    <div
                      v-if="hour < END_HOUR"
                      class="half-hour-line"
                      :style="{ top: (HOUR_HEIGHT / 2) + 'px' }"
                    ></div>
                  </div>
                </div>

                <!-- 左端：時間軸レーン -->
                <div class="time-axis-lane">
                  <div
                    v-for="hour in HOURS"
                    :key="hour"
                    class="time-axis-node"
                    :style="{ top: ((hour - START_HOUR) * HOUR_HEIGHT + GRID_OFFSET_TOP) + 'px' }"
                  >
                    <span class="time-label-pill">{{ hour }}:00</span>
                  </div>
                </div>

                <!-- 各会場レーン（5列） -->
                <div
                  v-for="venue in venueLanes"
                  :key="venue.key"
                  class="venue-lane"
                  :class="venue.key + '-lane'"
                >
                  <div
                    v-for="slot in getSlotsForVenue(day.allSlots, venue.key)"
                    :key="slot.slotId"
                    class="program-block"
                    :class="[
                      venue.key + '-block',
                      {
                        'is-special': slot.isSpecial,
                        'is-active': activeSlotId === slot.slotId
                      }
                    ]"
                    :style="{
                      top: getSlotTop(slot) + 'px',
                      height: getSlotHeight(slot) + 'px',
                      minHeight: getSlotHeight(slot) + 'px'
                    }"
                    @click="handleSlotClick($event, slot)"
                  >
                    <div v-if="slot.isSpecial" class="special-badge">注目企画</div>
                    <div class="block-time">{{ slot.time }}</div>
                    <h4 class="block-title">{{ slot.title }}</h4>
                    <div class="block-performer">{{ slot.groupName }}</div>

                    <!-- 展開時（ホバー/タップ時）にスムーズに出現する詳細ボタン -->
                    <div class="block-action-row">
                      <NuxtLink :to="`/events/${slot.id}`" class="block-detail-btn" @click.stop>
                        詳細を見る →
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


      <!-- フッター案内 -->
      <section class="section bottom-nav-section" @click.stop>
        <div class="bottom-nav-grid">
          <div class="nav-card">
            <h4>会場の場所を調べる</h4>
            <p>屋外ステージ、SCC 4階ホール、チャペル、体育館、1号館前の位置をマップで確認できます。</p>
            <NuxtLink to="/map" class="btn btn-outline">キャンパスマップを見る →</NuxtLink>
          </div>
          <div class="nav-card">
            <h4>全59企画を見る</h4>
            <p>模擬店・グルメ、文化館展示、音楽館ライブなど全企画をチェック！</p>
            <NuxtLink to="/events" class="btn btn-primary">企画一覧を見る →</NuxtLink>
          </div>
        </div>
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
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

.controls-section {
  padding: 24px 28px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
}

.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.day-tabs {
  display: flex;
  gap: 10px;
}

.tab-btn {
  padding: 10px 24px;
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
  background: var(--olive);
  color: white;
  border-color: var(--olive);
  box-shadow: var(--shadow-sm);
}

.header-right-tools {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pamphlet-link-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--olive);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(47, 91, 52, 0.3);
  background: #f7faf7;
}

.hint-text {
  font-size: 12px;
  color: var(--muted);
  margin-top: 8px;
  line-height: 1.6;
}

/* ====================================================
   1. タイムグリッド表（全会場並列・横スクロール対応）
   ==================================================== */
.grid-view-wrapper {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.timetable-grid-section {
  padding: 0;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.timetable-scroll-container {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

.timetable-grid {
  min-width: 960px;
  width: 100%;
  position: relative;
  background: white;
}

/* ヘッダー: 時間(70px) + 5会場(各minmax(170px, 1fr)) */
.grid-header {
  display: grid;
  grid-template-columns: 70px repeat(5, minmax(170px, 1fr));
  background: #243526;
  color: white;
  position: sticky;
  top: 0;
  z-index: 25;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.time-header-cell {
  padding: 14px 6px;
  text-align: center;
  font-weight: 800;
  font-size: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  left: 0;
  background: #243526;
  z-index: 30;
}

.venue-header-cell {
  padding: 12px 8px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.venue-header-cell:last-child {
  border-right: none;
}

.venue-header-cell h3 {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 2px;
  letter-spacing: 0.02em;
}

.venue-header-cell p {
  font-size: 10px;
  opacity: 0.85;
}

/* グリッド本体 */
.grid-body {
  position: relative;
  display: grid;
  grid-template-columns: 70px repeat(5, minmax(170px, 1fr));
}

/* 1時間ごとの背景グリッド線（全体を横断） */
.grid-background-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.hour-line-node {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
}

.hour-line {
  position: absolute;
  left: 70px;
  right: 0;
  border-top: 1px solid #e5e7eb;
}

.half-hour-line {
  position: absolute;
  left: 70px;
  right: 0;
  border-top: 1px dashed #f0f0f2;
}

/* 左端：時間軸レーン（横スクロール時に左端固定） */
.time-axis-lane {
  position: sticky;
  left: 0;
  background: #fbfbfa;
  border-right: 1px solid #e5e7eb;
  z-index: 20;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.04);
}

.time-axis-node {
  position: absolute;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
}

.time-label-pill {
  font-size: 11px;
  font-weight: 800;
  color: #555;
  background: #f0f0ed;
  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 各会場レーン */
.venue-lane {
  position: relative;
  border-right: 1px solid #e5e7eb;
  z-index: 5;
}

.venue-lane:last-child {
  border-right: none;
}

/* 各プログラムカード */
.program-block {
  position: absolute;
  left: 3px;
  right: 3px;
  border-radius: 8px;
  padding: 6px 8px;
  color: inherit;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 8;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

/* ホバーまたはアクティブ時の展開：
   min-height に普段の高さが指定されているため、
   height: fit-content にすると：
   - 長時間アイテム（よさこい等）: 中身が小さくても min-height が効いて元の高さをキープ
   - 短時間アイテム（パイプオルガン等）: 中身に合わせて自然に縦展開
*/
.program-block:hover,
.program-block.is-active {
  z-index: 50 !important;
  height: fit-content !important;
  height: -moz-fit-content !important;
  overflow: visible;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.program-block.is-active {
  outline: 2px solid var(--olive);
  outline-offset: 1px;
}

/* 会場ごとのテーマカラー */
.outdoor-block {
  background: #f0f8f0;
  border: 1px solid #b7deb8;
  border-left: 3.5px solid #2f5b34;
}

.indoor-block {
  background: #fdfbf3;
  border: 1px solid #ebd9b0;
  border-left: 3.5px solid #c9a85a;
}

.chapel-block {
  background: #f7f3fb;
  border: 1px solid #dbcde8;
  border-left: 3.5px solid #734b8c;
}

.gym-block {
  background: #eef7f6;
  border: 1px solid #b2dfdb;
  border-left: 3.5px solid #00796b;
}

.bldg1-block {
  background: #f5f6f8;
  border: 1px solid #cfd8dc;
  border-left: 3.5px solid #455a64;
}

/* 注目企画（宮世琉弥トークショーなど） */
.program-block.is-special {
  background: linear-gradient(135deg, #fff9e6 0%, #ffeed1 100%);
  border: 2px solid #e5ad35;
  border-left: 4.5px solid #d48806;
  box-shadow: 0 3px 10px rgba(212, 136, 6, 0.2);
  z-index: 15;
}

.special-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 9px;
  font-weight: 800;
  color: white;
  background: #d48806;
  padding: 1px 4px;
  border-radius: 3px;
  margin-bottom: 2px;
}

.block-time {
  font-size: 10px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 1px;
  letter-spacing: 0.02em;
}

.indoor-block .block-time {
  color: #997825;
}

.chapel-block .block-time {
  color: #734b8c;
}

.gym-block .block-time {
  color: #00796b;
}

.bldg1-block .block-time {
  color: #455a64;
}

.block-title {
  font-size: 11px;
  font-weight: 800;
  line-height: 1.3;
  color: var(--text);
  margin-bottom: 2px;
}

.block-performer {
  font-size: 10px;
  color: var(--muted);
  line-height: 1.25;
  transition: opacity 0.2s ease;
}

/* 普段は「詳細を見る」ボタンを非表示（高さ0・透明・下方向に微小オフセット） */
.block-action-row {
  max-height: 0;
  opacity: 0;
  transform: translateY(6px);
  overflow: hidden;
  margin-top: 0;
  pointer-events: none;
  text-align: right;
  transition: max-height 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.22s ease 0.04s,
              transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              margin-top 0.25s ease;
}

/* ホバーまたはアクティブ時に滑らかにアニメーション出現 */
.program-block:hover .block-action-row,
.program-block.is-active .block-action-row {
  max-height: 40px;
  opacity: 1;
  transform: translateY(0);
  margin-top: 6px;
  pointer-events: auto;
}

.block-detail-btn {
  font-size: 10px;
  font-weight: 800;
  color: var(--olive);
  padding: 3px 8px;
  transition: all 0.2s ease;
}



/* フッター案内 */
.bottom-nav-section {
  padding: 28px;
  background: #f8faf8;
  border-radius: 16px;
  border: 1px solid var(--border);
}

.bottom-nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.nav-card h4 {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 6px;
  color: var(--olive);
}

.nav-card p {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 16px;
  line-height: 1.6;
}


@media (max-width: 768px) {
  .controls-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header-right-tools {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>

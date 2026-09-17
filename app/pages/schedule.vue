<script setup lang="ts">
import { ref } from 'vue';
import {
  parallelScheduleData,
  venueCategoryList,
  getVenueCategory,
  type VenueCategory,
  type TimetableSlot,
} from '~/data/schedule';

useSeoMeta({
  title: 'タイムテーブル｜平潟祭 2026',
  description: '平潟祭2026のステージ＆音楽タイムテーブル。屋外ステージ、屋内ステージ（SCC 4階）、チャペル、体育館の全33出演プログラムを一覧掲載！',
});

const activeDayId = ref<'day1' | 'day2'>('day1');
const selectedVenue = ref<'all' | VenueCategory>('all');
const viewMode = ref<'grid' | 'timeline'>('grid');

// タイムグリッドの基本設定（1時間ごと）
const START_HOUR = 10; // 10:00
const END_HOUR = 18;   // 18:00
const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const HOUR_HEIGHT = 115; // 1時間あたりのピクセル高さ
const MINUTE_HEIGHT = HOUR_HEIGHT / 60; // 1分あたりのピクセル高さ
const TOTAL_HEIGHT = (END_HOUR - START_HOUR) * HOUR_HEIGHT; // 全体の高さ (8時間 * 115px = 920px)

// スロットの位置計算（top）
const getSlotTop = (slot: TimetableSlot): number => {
  const startMin = Number(slot.startMinutes);
  const baseMin = START_HOUR * 60; // 600
  return Math.max(0, (startMin - baseMin) * MINUTE_HEIGHT);
};

// スロットの高さ計算（height）
const getSlotHeight = (slot: TimetableSlot): number => {
  const durMin = Number(slot.durationMinutes);
  return Math.max(42, durMin * MINUTE_HEIGHT - 6);
};

// 会場ごとのスロット分類
const getSlotsForVenue = (slots: TimetableSlot[], venueKey: VenueCategory): TimetableSlot[] => {
  return slots.filter((s) => getVenueCategory(s.venue) === venueKey);
};

// タイムライン用フィルター
const getFilteredSlots = (allSlots: TimetableSlot[]) => {
  if (selectedVenue.value === 'all') return allSlots;
  return allSlots.filter((s) => getVenueCategory(s.venue) === selectedVenue.value);
};
</script>

<template>
  <div>
    <!-- ページヘッダー（絵文字不使用） -->
    <LayoutPageHeader
      title="タイムテーブル"
      sub-title="Timetable 2026.10.31 - 11.1"
      :breadcrumbs="[{ name: 'タイムテーブル' }]"
    />

    <div class="page-container">
      <!-- 操作コントロールセクション -->
      <section class="section controls-section shadow-sm">
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
              @click="activeDayId = day.id"
            >
              {{ day.dayName }}（{{ day.dateLabel }}）
            </button>
          </div>

          <!-- ビュー切替 & パンフレット案内 -->
          <div class="header-right-tools">
            <div class="view-switch-group">
              <button
                class="view-btn"
                :class="{ active: viewMode === 'grid' }"
                @click="viewMode = 'grid'"
              >
                タイムグリッド表
              </button>
              <button
                class="view-btn"
                :class="{ active: viewMode === 'timeline' }"
                @click="viewMode = 'timeline'"
              >
                リスト形式
              </button>
            </div>

            <NuxtLink to="/pamphlet" class="pamphlet-link-badge">
              電子パンフレットを見る →
            </NuxtLink>
          </div>
        </div>

        <!-- 会場絞り込みチップ（リスト形式用） -->
        <div v-if="viewMode === 'timeline'" class="venue-filter-row">
          <span class="venue-filter-label">会場絞り込み:</span>
          <div class="venue-chips">
            <button
              v-for="v in venueCategoryList"
              :key="v.key"
              class="venue-chip"
              :class="{ active: selectedVenue === v.key }"
              @click="selectedVenue = v.key"
            >
              {{ v.label }}
            </button>
          </div>
        </div>

        <p class="hint-text">
          ※ 1時間ごとにグリッド線が引かれています。時間は開始〜終了時刻に合わせて枠線を跨いで表示されます。
          各プログラムをクリックすると企画詳細ページをご確認いただけます。
        </p>
      </section>

      <!-- 1. 1時間グリッド・タイムテーブル（実時間ブロック跨ぎ配置） -->
      <div v-if="viewMode === 'grid'" class="grid-view-wrapper">
        <section
          v-for="day in parallelScheduleData"
          v-show="activeDayId === day.id"
          :key="day.id"
          class="section timetable-grid-section shadow-sm"
        >
          <div class="grid-scroll-container">
            <div class="timetable-grid" :style="{ '--grid-total-height': TOTAL_HEIGHT + 'px' }">
              <!-- グリッドヘッダー（固定） -->
              <div class="grid-header">
                <div class="time-header-cell">時間</div>
                <div class="venue-header-cell outdoor-col">
                  <h3>屋外ステージ</h3>
                  <p>体育館横 芝生広場</p>
                </div>
                <div class="venue-header-cell indoor-col">
                  <h3>屋内ステージ</h3>
                  <p>SCC 4階 ベネットホール</p>
                </div>
                <div class="venue-header-cell chapel-col">
                  <h3>チャペル</h3>
                  <p>礼拝堂（パイプオルガン他）</p>
                </div>
                <div class="venue-header-cell other-col">
                  <h3>体育館・1号館前</h3>
                  <p>体育館 / 1号館前</p>
                </div>
              </div>

              <!-- グリッド本体（時間軸背景 + レーン） -->
              <div class="grid-body" :style="{ height: TOTAL_HEIGHT + 'px' }">
                <!-- 背景の1時間ごと水平グリッド線（全体を横断） -->
                <div class="grid-background-lines">
                  <div
                    v-for="(hour, idx) in HOURS.slice(0, -1)"
                    :key="hour"
                    class="hour-block"
                    :style="{ height: HOUR_HEIGHT + 'px' }"
                  >
                    <!-- 30分の補助点線 -->
                    <div class="half-hour-line" :style="{ top: (HOUR_HEIGHT / 2) + 'px' }"></div>
                  </div>
                </div>

                <!-- 左端：時間軸カラム -->
                <div class="time-axis-lane">
                  <div
                    v-for="hour in HOURS"
                    :key="hour"
                    class="time-axis-node"
                    :style="{ top: ((hour - START_HOUR) * HOUR_HEIGHT) + 'px' }"
                  >
                    <span class="time-label-pill">{{ hour }}:00</span>
                  </div>
                </div>

                <!-- レーン1: 屋外ステージ -->
                <div class="venue-lane outdoor-lane">
                  <NuxtLink
                    v-for="slot in getSlotsForVenue(day.allSlots, 'outdoor')"
                    :key="slot.slotId"
                    :to="`/events/${slot.id}`"
                    class="program-block outdoor-block"
                    :class="{ 'is-special': slot.isSpecial }"
                    :style="{
                      top: getSlotTop(slot) + 'px',
                      height: getSlotHeight(slot) + 'px'
                    }"
                  >
                    <div class="block-time">{{ slot.time }}</div>
                    <h4 class="block-title">{{ slot.title }}</h4>
                    <div class="block-performer">{{ slot.groupName }}</div>
                    <span class="block-link-hint">詳細 →</span>
                  </NuxtLink>
                </div>

                <!-- レーン2: 屋内ステージ -->
                <div class="venue-lane indoor-lane">
                  <NuxtLink
                    v-for="slot in getSlotsForVenue(day.allSlots, 'indoor')"
                    :key="slot.slotId"
                    :to="`/events/${slot.id}`"
                    class="program-block indoor-block"
                    :class="{ 'is-special': slot.isSpecial }"
                    :style="{
                      top: getSlotTop(slot) + 'px',
                      height: getSlotHeight(slot) + 'px'
                    }"
                  >
                    <div v-if="slot.isSpecial" class="special-badge">注目企画</div>
                    <div class="block-time">{{ slot.time }}</div>
                    <h4 class="block-title">{{ slot.title }}</h4>
                    <div class="block-performer">{{ slot.groupName }}</div>
                    <span class="block-link-hint">詳細 →</span>
                  </NuxtLink>
                </div>

                <!-- レーン3: チャペル -->
                <div class="venue-lane chapel-lane">
                  <NuxtLink
                    v-for="slot in getSlotsForVenue(day.allSlots, 'chapel')"
                    :key="slot.slotId"
                    :to="`/events/${slot.id}`"
                    class="program-block chapel-block"
                    :class="{ 'is-special': slot.isSpecial }"
                    :style="{
                      top: getSlotTop(slot) + 'px',
                      height: getSlotHeight(slot) + 'px'
                    }"
                  >
                    <div class="block-time">{{ slot.time }}</div>
                    <h4 class="block-title">{{ slot.title }}</h4>
                    <div class="block-performer">{{ slot.groupName }}</div>
                    <span class="block-link-hint">詳細 →</span>
                  </NuxtLink>
                </div>

                <!-- レーン4: 体育館・1号館前 -->
                <div class="venue-lane other-lane">
                  <NuxtLink
                    v-for="slot in getSlotsForVenue(day.allSlots, 'other')"
                    :key="slot.slotId"
                    :to="`/events/${slot.id}`"
                    class="program-block other-block"
                    :class="{ 'is-special': slot.isSpecial }"
                    :style="{
                      top: getSlotTop(slot) + 'px',
                      height: getSlotHeight(slot) + 'px'
                    }"
                  >
                    <span class="venue-tag-inline">{{ slot.venue }}</span>
                    <div class="block-time">{{ slot.time }}</div>
                    <h4 class="block-title">{{ slot.title }}</h4>
                    <div class="block-performer">{{ slot.groupName }}</div>
                    <span class="block-link-hint">詳細 →</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 2. リスト形式（スマホ等でシンプルに閲覧したい場合） -->
      <div v-else class="timeline-view-wrapper">
        <section
          v-for="day in parallelScheduleData"
          v-show="activeDayId === day.id"
          :key="day.id"
          class="section timeline-section shadow-sm"
        >
          <div class="timeline-header-info">
            <h3>{{ day.dayName }} タイムライン（全 {{ getFilteredSlots(day.allSlots).length }} プログラム）</h3>
          </div>

          <div v-if="getFilteredSlots(day.allSlots).length > 0" class="timeline-list">
            <NuxtLink
              v-for="item in getFilteredSlots(day.allSlots)"
              :key="item.slotId"
              :to="`/events/${item.id}`"
              class="timeline-card"
              :class="{ 'is-special': item.isSpecial }"
            >
              <!-- 時間カラム -->
              <div class="timeline-time-col">
                <div class="timeline-time-badge">{{ item.time }}</div>
                <span class="timeline-duration">{{ item.durationMinutes }}分</span>
              </div>

              <!-- 内容カラム -->
              <div class="timeline-content-col">
                <div class="timeline-meta-row">
                  <span class="timeline-venue-badge" :class="'venue-' + getVenueCategory(item.venue)">
                    {{ item.venue }}
                  </span>
                  <span v-if="item.isSpecial" class="special-tag">注目企画</span>
                </div>
                <h4 class="timeline-title">{{ item.title }}</h4>
                <div class="timeline-performer">{{ item.groupName }}</div>
              </div>

              <div class="timeline-arrow-col">
                <span class="arrow-btn">詳細 →</span>
              </div>
            </NuxtLink>
          </div>

          <div v-else class="empty-timeline">
            <p>選択された会場のプログラムはありません。</p>
          </div>
        </section>
      </div>

      <!-- フッターナビゲーション案内 -->
      <section class="section bottom-nav-section">
        <div class="bottom-nav-grid">
          <div class="nav-card">
            <h4>会場の場所を調べる</h4>
            <p>屋外ステージ、SCC 4階ホール、チャペル、体育館の位置をマップで確認できます。</p>
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

.view-switch-group {
  display: inline-flex;
  background: var(--bg-alt, #f0f0f0);
  padding: 3px;
  border-radius: 30px;
  border: 1px solid var(--border);
}

.view-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: white;
  color: var(--text);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

.venue-filter-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  margin-bottom: 12px;
}

.venue-filter-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--muted);
}

.venue-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.venue-chip {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: white;
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.venue-chip:hover {
  border-color: var(--olive);
}

.venue-chip.active {
  background: var(--text, #222);
  color: white;
  border-color: var(--text, #222);
}

.hint-text {
  font-size: 12px;
  color: var(--muted);
  margin-top: 8px;
  line-height: 1.6;
}

/* ====================================================
   1. タイムグリッド表（実時間ブロック・線を越えるデザイン）
   ==================================================== */
.timetable-grid-section {
  padding: 0;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  overflow: hidden;
}

.grid-scroll-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.timetable-grid {
  min-width: 900px;
  position: relative;
  background: white;
}

/* ヘッダー */
.grid-header {
  display: grid;
  grid-template-columns: 80px 1.1fr 1.1fr 1fr 1fr;
  background: #243526;
  color: white;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.time-header-cell {
  padding: 16px 8px;
  text-align: center;
  font-weight: 800;
  font-size: 13px;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.venue-header-cell {
  padding: 14px 16px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.venue-header-cell:last-child {
  border-right: none;
}

.venue-header-cell h3 {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 3px;
  letter-spacing: 0.02em;
}

.venue-header-cell p {
  font-size: 11px;
  opacity: 0.85;
}

/* グリッド本体 */
.grid-body {
  position: relative;
  display: grid;
  grid-template-columns: 80px 1.1fr 1.1fr 1fr 1fr;
}

/* 1時間ごとの背景グリッド線（絶対配置で全列を横断） */
.grid-background-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.hour-block {
  border-top: 1px solid #e5e7eb;
  position: relative;
  box-sizing: border-box;
}

.hour-block:first-child {
  border-top: none;
}

.half-hour-line {
  position: absolute;
  left: 80px; /* 時間軸の右側から横断 */
  right: 0;
  border-top: 1px dashed #f0f0f2;
}

/* 左端：時間軸レーン */
.time-axis-lane {
  position: relative;
  background: #fbfbfa;
  border-right: 1px solid #e5e7eb;
  z-index: 10;
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
  font-size: 12px;
  font-weight: 800;
  color: #555;
  background: #f0f0ed;
  padding: 3px 8px;
  border-radius: 10px;
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

/* 各プログラムカード（実時間ブロック跨ぎ配置） */
.program-block {
  position: absolute;
  left: 5px;
  right: 5px;
  border-radius: 8px;
  padding: 8px 12px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);
  z-index: 8;
}

.program-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  z-index: 15;
}

/* 会場ごとのテーマカラー */
.outdoor-block {
  background: #f0f8f0;
  border: 1px solid #b7deb8;
  border-left: 4px solid #2f5b34;
}

.outdoor-block:hover {
  border-color: #2f5b34;
}

.indoor-block {
  background: #fdfbf3;
  border: 1px solid #ebd9b0;
  border-left: 4px solid #c9a85a;
}

.indoor-block:hover {
  border-color: #c9a85a;
}

.chapel-block {
  background: #f7f3fb;
  border: 1px solid #dbcde8;
  border-left: 4px solid #734b8c;
}

.chapel-block:hover {
  border-color: #734b8c;
}

.other-block {
  background: #f2f7f7;
  border: 1px solid #c0dede;
  border-left: 4px solid #317070;
}

.other-block:hover {
  border-color: #317070;
}

/* 注目企画（宮世琉弥トークショーなど） */
.program-block.is-special {
  background: linear-gradient(135deg, #fff9e6 0%, #ffeed1 100%);
  border: 2px solid #e5ad35;
  border-left: 5px solid #d48806;
  box-shadow: 0 4px 12px rgba(212, 136, 6, 0.25);
  z-index: 12;
}

.special-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 10px;
  font-weight: 800;
  color: white;
  background: #d48806;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 3px;
}

.venue-tag-inline {
  display: inline-block;
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  color: #317070;
  background: rgba(49, 112, 112, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  margin-bottom: 3px;
}

.block-time {
  font-size: 11px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 2px;
  letter-spacing: 0.02em;
}

.indoor-block .block-time {
  color: #997825;
}

.chapel-block .block-time {
  color: #734b8c;
}

.other-block .block-time {
  color: #317070;
}

.block-title {
  font-size: 13px;
  font-weight: 800;
  line-height: 1.35;
  color: var(--text);
  margin-bottom: 2px;
}

.block-performer {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.3;
}

.block-link-hint {
  font-size: 10px;
  font-weight: 700;
  color: var(--olive);
  margin-top: auto;
  text-align: right;
  opacity: 0.9;
}

/* ====================================================
   2. リスト形式（タイムライン）
   ==================================================== */
.timeline-section {
  padding: 24px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
}

.timeline-header-info {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.timeline-header-info h3 {
  font-size: 17px;
  font-weight: 800;
  color: var(--text);
}

.timeline-list {
  display: grid;
  gap: 12px;
}

.timeline-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: white;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.timeline-card:hover {
  transform: translateX(4px);
  border-color: var(--olive);
  box-shadow: var(--shadow-sm);
}

.timeline-card.is-special {
  background: #fdfbf3;
  border-color: #e5ad35;
}

.timeline-time-col {
  min-width: 110px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.timeline-time-badge {
  font-size: 13px;
  font-weight: 800;
  color: var(--olive);
}

.timeline-duration {
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
}

.timeline-content-col {
  flex: 1;
}

.timeline-meta-row {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
}

.timeline-venue-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.venue-outdoor {
  background: #eef6ee;
  color: #2b6131;
}

.venue-indoor {
  background: #fcf6e8;
  color: #8c6b1b;
}

.venue-chapel {
  background: #f7f3fb;
  color: #734b8c;
}

.venue-other {
  background: #f2f7f7;
  color: #317070;
}

.special-tag {
  font-size: 10px;
  font-weight: 800;
  background: #e5ad35;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
}

.timeline-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 2px;
}

.timeline-performer {
  font-size: 13px;
  color: var(--muted);
}

.timeline-arrow-col {
  font-size: 13px;
  font-weight: 800;
  color: var(--olive);
}

.empty-timeline {
  text-align: center;
  padding: 40px;
  color: var(--muted);
  font-size: 14px;
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
    justify-content: space-between;
  }
  .timeline-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .timeline-arrow-col {
    align-self: flex-end;
  }
}
</style>

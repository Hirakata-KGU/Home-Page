<script setup lang="ts">
import { ref } from 'vue';
import { parallelScheduleData } from '~/data/schedule';

useSeoMeta({
  title: 'タイムテーブル｜平潟祭 2026',
  description: '平潟祭2026の2日間のタイムテーブル。屋内ステージ（SCC 4F）と屋外ステージ（芝生広場）の進行表を並列で一覧表示！',
});

const activeDayId = ref<'day1' | 'day2'>('day1');
</script>

<template>
  <div>
    <LayoutPageHeader
      title="タイムテーブル"
      sub-title="Timetable 2026.10.31 - 11.1"
      icon="📅"
      :breadcrumbs="[{ name: 'タイムテーブル' }]"
    />

    <div class="page-container">
      <!-- Day Switch & Controls -->
      <section class="section controls-section">
        <div class="controls-header">
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
              {{ day.dayName }}
            </button>
          </div>

          <div class="pdf-download-badge">
            <span class="badge-icon">📄</span>
            <div>
              <span class="badge-text">印刷用タイムテーブルPDF</span>
              <a href="https://example.com/timetable.pdf" target="_blank" rel="noopener noreferrer" class="badge-link">ダウンロード ↗</a>
            </div>
          </div>
        </div>

        <p class="hint-text">
          💡 プログラムをクリックすると、詳しい出演者情報や企画詳細ページを開くことができます。
        </p>
      </section>

      <!-- Parallel Timetable Board -->
      <section
        v-for="day in parallelScheduleData"
        v-show="activeDayId === day.id"
        :key="day.id"
        class="section timetable-board"
      >
        <div class="board-header">
          <div class="time-col-header">時間帯</div>
          <div class="stage-col-header indoor-header">
            <div class="stage-icon">🏢</div>
            <div>
              <h3>屋内ステージ</h3>
              <p>SCC 4階ホール（座席あり）</p>
            </div>
          </div>
          <div class="stage-col-header outdoor-header">
            <div class="stage-icon">🎪</div>
            <div>
              <h3>屋外ステージ</h3>
              <p>体育館横 芝生広場（野外）</p>
            </div>
          </div>
          <div class="stage-col-header other-header">
            <div class="stage-icon">🎵</div>
            <div>
              <h3>音楽館・その他</h3>
              <p>7号館・8号館・模擬店</p>
            </div>
          </div>
        </div>

        <!-- Time Slots Rows -->
        <div class="board-body">
          <div
            v-for="(slot, idx) in day.slots"
            :key="idx"
            class="timetable-row"
          >
            <!-- Time Column -->
            <div class="time-cell">
              <div class="time-main">{{ slot.timeLabel }}</div>
            </div>

            <!-- Indoor Stage Column -->
            <div class="stage-cell indoor-cell">
              <template v-if="slot.indoor">
                <NuxtLink
                  v-if="slot.indoor.eventId"
                  :to="`/events/${slot.indoor.eventId}`"
                  class="program-card clickable indoor-card"
                  :class="{ special: slot.indoor.isSpecial }"
                >
                  <div class="program-time">{{ slot.indoor.timeRange }}</div>
                  <h4 class="program-title">{{ slot.indoor.title }}</h4>
                  <p v-if="slot.indoor.performer" class="program-performer">{{ slot.indoor.performer }}</p>
                  <span class="view-detail-hint">詳細を見る →</span>
                </NuxtLink>
                <div v-else class="program-card indoor-card" :class="{ special: slot.indoor.isSpecial }">
                  <div class="program-time">{{ slot.indoor.timeRange }}</div>
                  <h4 class="program-title">{{ slot.indoor.title }}</h4>
                  <p v-if="slot.indoor.performer" class="program-performer">{{ slot.indoor.performer }}</p>
                </div>
              </template>
            </div>

            <!-- Outdoor Stage Column -->
            <div class="stage-cell outdoor-cell">
              <template v-if="slot.outdoor">
                <NuxtLink
                  v-if="slot.outdoor.eventId"
                  :to="`/events/${slot.outdoor.eventId}`"
                  class="program-card clickable outdoor-card"
                  :class="{ special: slot.outdoor.isSpecial }"
                >
                  <div class="program-time">{{ slot.outdoor.timeRange }}</div>
                  <h4 class="program-title">{{ slot.outdoor.title }}</h4>
                  <p v-if="slot.outdoor.performer" class="program-performer">{{ slot.outdoor.performer }}</p>
                  <span class="view-detail-hint">詳細を見る →</span>
                </NuxtLink>
                <div v-else class="program-card outdoor-card" :class="{ special: slot.outdoor.isSpecial }">
                  <div class="program-time">{{ slot.outdoor.timeRange }}</div>
                  <h4 class="program-title">{{ slot.outdoor.title }}</h4>
                  <p v-if="slot.outdoor.performer" class="program-performer">{{ slot.outdoor.performer }}</p>
                </div>
              </template>
            </div>

            <!-- Other Venues Column -->
            <div class="stage-cell other-cell">
              <template v-if="slot.other">
                <NuxtLink
                  v-if="slot.other.eventId"
                  :to="`/events/${slot.other.eventId}`"
                  class="program-card clickable other-card"
                >
                  <div class="program-time">{{ slot.other.timeRange }}</div>
                  <h4 class="program-title">{{ slot.other.title }}</h4>
                  <p v-if="slot.other.performer" class="program-performer">{{ slot.other.performer }}</p>
                  <span class="view-detail-hint">詳細を見る →</span>
                </NuxtLink>
                <div v-else class="program-card other-card">
                  <div class="program-time">{{ slot.other.timeRange }}</div>
                  <h4 class="program-title">{{ slot.other.title }}</h4>
                  <p v-if="slot.other.performer" class="program-performer">{{ slot.other.performer }}</p>
                </div>
              </template>
            </div>
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
  padding: 24px 32px;
}

.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.day-tabs {
  display: flex;
  gap: 12px;
}

.tab-btn {
  padding: 12px 32px;
  border-radius: 50px;
  border: 2px solid var(--border);
  background: white;
  cursor: pointer;
  font-weight: 800;
  color: var(--muted);
  font-size: 16px;
  transition: all 0.3s ease;
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

.pdf-download-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--accent-2);
  padding: 10px 18px;
  border-radius: 12px;
}

.badge-icon {
  font-size: 24px;
}

.badge-text {
  display: block;
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
}

.badge-link {
  font-size: 13px;
  font-weight: 800;
  color: var(--olive);
  text-decoration: none;
}

.badge-link:hover {
  text-decoration: underline;
}

.hint-text {
  font-size: 13px;
  color: var(--muted);
  font-weight: 600;
}

/* Timetable Board */
.timetable-board {
  padding: 0;
  overflow: hidden;
}

.board-header {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  background: linear-gradient(135deg, var(--olive-dark) 0%, var(--olive) 100%);
  color: white;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.time-col-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  padding: 20px 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.stage-col-header {
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.stage-col-header:last-child {
  border-right: none;
}

.stage-icon {
  font-size: 28px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stage-col-header h3 {
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 2px;
}

.stage-col-header p {
  font-size: 11px;
  opacity: 0.85;
}

/* Rows */
.board-body {
  display: grid;
}

.timetable-row {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  border-bottom: 1px solid var(--border);
  min-height: 110px;
}

.timetable-row:last-child {
  border-bottom: none;
}

.time-cell {
  background: var(--accent);
  border-right: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
}

.time-main {
  font-size: 18px;
  font-weight: 900;
  color: var(--olive);
}

.stage-cell {
  padding: 12px;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.stage-cell:last-child {
  border-right: none;
}

/* Program Card */
.program-card {
  height: 100%;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
  position: relative;
}

.program-card.indoor-card {
  background: linear-gradient(135deg, #ffffff 0%, var(--accent-2) 100%);
  border-left: 5px solid var(--olive);
}

.program-card.outdoor-card {
  background: linear-gradient(135deg, #ffffff 0%, #fcf6e6 100%);
  border-left: 5px solid var(--gold);
}

.program-card.other-card {
  background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
  border-left: 5px solid var(--muted);
}

.program-card.special {
  box-shadow: 0 4px 12px rgba(47, 91, 52, 0.12);
}

.program-card.clickable {
  cursor: pointer;
}

.program-card.clickable:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.program-time {
  font-size: 11px;
  font-weight: 800;
  color: var(--muted);
  margin-bottom: 4px;
}

.program-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--olive);
  line-height: 1.4;
  margin-bottom: 4px;
}

.program-performer {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.3;
  margin-top: auto;
}

.view-detail-hint {
  font-size: 11px;
  font-weight: 800;
  color: var(--olive);
  margin-top: 6px;
  display: inline-block;
}

@media (max-width: 1024px) {
  .board-header {
    grid-template-columns: 80px 1fr 1fr 1fr;
  }

  .timetable-row {
    grid-template-columns: 80px 1fr 1fr 1fr;
  }

  .stage-col-header h3 {
    font-size: 14px;
  }

  .program-title {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .board-header,
  .timetable-row {
    grid-template-columns: 70px 1fr 1fr;
  }

  .other-header,
  .other-cell {
    display: none;
  }

  .controls-header {
    flex-direction: column;
    align-items: stretch;
  }

  .day-tabs {
    width: 100%;
  }

  .tab-btn {
    flex: 1;
    padding: 10px 16px;
    font-size: 14px;
  }
}
</style>

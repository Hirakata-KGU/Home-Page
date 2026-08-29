<script setup lang="ts">
import { ref } from 'vue';
import { scheduleData } from '~/data/schedule';

const activeDayId = ref('day1');
</script>

<template>
  <section id="schedule" class="section">
    <div class="section-header">
      <div class="section-icon">📅</div>
      <div class="section-title">
        <h2>タイムテーブル</h2>
        <p>Schedule 2026.10.31-11.1</p>
      </div>
    </div>

    <div class="schedule-controls">
      <div class="tabs" role="tablist">
        <button
          v-for="day in scheduleData"
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

      <div class="qr-container">
        <img
          class="qr-code"
          src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://example.com/timetable.pdf"
          alt="タイムテーブルQR"
        />
        <div class="qr-text">
          <div>詳細PDFは</div>
          <a href="https://example.com/timetable.pdf" target="_blank" rel="noopener noreferrer">こちら</a>
        </div>
      </div>
    </div>

    <div class="schedule-area">
      <transition-group name="fade">
        <template v-for="day in scheduleData" :key="day.id">
          <div v-show="activeDayId === day.id" class="schedule-day">
            <div
              v-for="(slot, idx) in day.items"
              :key="idx"
              class="time-slot"
            >
              <div class="time-info">
                <div class="time-value">{{ slot.time }}</div>
                <div v-if="slot.label" class="time-label">{{ slot.label }}</div>
              </div>
              <div class="event-info">
                <h4>{{ slot.title }}</h4>
                <p>{{ slot.description }}</p>
                <span class="event-location">📍 {{ slot.location }}</span>
              </div>
            </div>
          </div>
        </template>
      </transition-group>
    </div>
  </section>
</template>

<style scoped>
.schedule-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.tabs {
  display: flex;
  gap: 12px;
  background: var(--accent);
  padding: 6px;
  border-radius: 50px;
}

.tab-btn {
  padding: 12px 32px;
  border-radius: 50px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 800;
  color: var(--muted);
  font-size: 16px;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
  color: white;
  box-shadow: var(--shadow-sm);
}

.qr-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--accent);
  padding: 12px 20px;
  border-radius: 12px;
}

.qr-code {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}

.qr-text {
  font-size: 13px;
  color: var(--muted);
  font-weight: 700;
}

.qr-text a {
  color: var(--olive);
  text-decoration: none;
  font-weight: 800;
}

.qr-text a:hover {
  text-decoration: underline;
}

.schedule-area {
  position: relative;
  overflow: hidden;
}

.schedule-day {
  width: 100%;
}

.time-slot {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 24px;
  padding: 24px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
  border-radius: 12px;
  border-left: 6px solid var(--olive);
  align-items: center;
  transition: all 0.3s ease;
}

.time-slot:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-md);
}

.time-info {
  text-align: center;
}

.time-value {
  font-size: 28px;
  font-weight: 900;
  color: var(--olive);
  line-height: 1;
  margin-bottom: 4px;
}

.time-label {
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
}

.event-info h4 {
  font-size: 18px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
}

.event-info p {
  font-size: 14px;
  color: var(--muted);
}

.event-location {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  background: var(--accent-2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  color: var(--olive);
}

/* Tab Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .time-slot {
    grid-template-columns: 100px 1fr;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .schedule-controls {
    flex-direction: column;
  }

  .tabs {
    width: 100%;
  }

  .tab-btn {
    flex: 1;
    padding: 12px 16px;
    font-size: 14px;
  }

  .time-slot {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .event-location {
    justify-content: center;
  }
}
</style>

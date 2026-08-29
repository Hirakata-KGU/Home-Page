<script setup lang="ts">
import { eventItems } from '~/data/events';
</script>

<template>
  <section id="events" class="section">
    <div class="section-header">
      <div class="section-icon">🎪</div>
      <div class="section-title">
        <h2>企画一覧</h2>
        <p>Event Programs</p>
      </div>
    </div>

    <div class="events-grid">
      <div
        v-for="event in eventItems"
        :key="event.id"
        class="event-card"
      >
        <div
          class="event-image"
          :style="event.gradient ? { background: event.gradient } : {}"
        >
          {{ event.icon }}
        </div>
        <div class="event-content">
          <span class="event-category">{{ event.category }}</span>
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.event-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--border);
  transition: all 0.3s ease;
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--olive);
}

.event-image {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  color: white;
}

.event-content {
  padding: 24px;
}

.event-category {
  display: inline-block;
  background: var(--accent-2);
  color: var(--olive);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 12px;
}

.event-card h3 {
  font-size: 20px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 12px;
}

.event-card p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}
</style>

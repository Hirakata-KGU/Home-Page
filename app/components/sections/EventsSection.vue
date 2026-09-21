<script setup lang="ts">
import { eventItems } from '~/data/events';
</script>

<template>
  <section id="events" class="section">
    <div class="section-header">
      <!-- アイコンSVG提供後に配置予定 -->
      <div class="section-title">
        <h2>企画一覧</h2>
        <p>Event Programs</p>
      </div>
    </div>

    <div class="events-grid">
      <NuxtLink
        v-for="event in eventItems.slice(0, 6)"
        :key="event.id"
        :to="`/events/${event.id}`"
        class="event-card group block no-underline"
      >
        <div
          class="event-image relative overflow-hidden"
          :style="event.gradient ? { background: event.gradient } : {}"
        >
          <template v-if="event.imageUrl">
            <NuxtImg
              :src="event.imageUrl"
              aria-hidden="true"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover filter blur-[20px] scale-125 opacity-60 pointer-events-none select-none"
            />
            <NuxtImg
              :src="event.imageUrl"
              :alt="event.title"
              loading="lazy"
              decoding="async"
              sizes="sm:100vw md:350px"
              class="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </template>
          <span v-else class="text-white/90 text-sm font-bold tracking-wider">{{ event.categoryLabel }}</span>
        </div>
        <div class="event-content">
          <span class="event-category">{{ event.categoryLabel }}</span>
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </NuxtLink>
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

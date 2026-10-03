<script setup lang="ts">
import { useCountdown } from '~/composables/useCountdown';

interface Props {
  targetDate?: string;
}

const props = withDefaults(defineProps<Props>(), {
  targetDate: '2026-10-31T10:00:00',
});

const { days, hours, minutes, isFinished } = useCountdown(props.targetDate);
</script>

<template>
  <div class="flex flex-row flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 gap-y-2">
    <div v-if="isFinished" class="text-[clamp(1.5rem,5vw,2rem)]">開催中！</div>
    <div v-if="!isFinished" class="countdown-label">開催まであと</div>
    <div v-if="!isFinished" class="countdown-timer">
      <div class="countdown-item">
        <div class="countdown-value">{{ days }}</div>
        <div class="countdown-unit">日</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">{{ hours }}</div>
        <div class="countdown-unit">時間</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">{{ minutes }}</div>
        <div class="countdown-unit">分</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown-label {
  font-size: clamp(0.9rem, 3.4vw, 1.1rem);
  color: var(--muted);
  font-weight: 700;
  white-space: nowrap;
}

.countdown-timer {
  display: flex;
  gap: clamp(0.625rem, 3vw, 1rem);
  justify-content: center;
}

.countdown-item {
  text-align: center;
}

.countdown-value {
  font-size: clamp(1.75rem, 7vw, 2.5rem);
  font-weight: 900;
  color: var(--olive);
  line-height: 1;
}

.countdown-unit {
  font-size: clamp(0.7rem, 2.8vw, 0.85rem);
  color: var(--muted);
  font-weight: 700;
  margin-top: 4px;
}

/* PC: タイトルより小さく保ちつつ幅に応じて縮小 */
@media (min-width: 1024px) {
  .countdown-label {
    font-size: clamp(1rem, 1.4vw, 1.25rem);
  }

  .countdown-timer {
    gap: clamp(0.75rem, 1.4vw, 1.25rem);
  }

  .countdown-value {
    font-size: clamp(2rem, 2.8vw, 3rem);
  }

  .countdown-unit {
    font-size: clamp(0.75rem, 1vw, 1rem);
  }
}
</style>


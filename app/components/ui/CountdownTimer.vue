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
  <div class="flex flex-row justify-center items-center gap-6">
    <div v-if="isFinished" class="text-[24px]">開催中！</div>
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
.countdown {
  margin-bottom: 24px;
}

.countdown-label {
  font-size: 18px;
  color: var(--muted);
  font-weight: 700;
}

.countdown-timer {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.countdown-item {
  text-align: center;
}

.countdown-value {
  font-size: 36px;
  font-weight: 900;
  color: var(--olive);
  line-height: 1;
}

.countdown-unit {
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
  margin-top: 4px;
}
</style>

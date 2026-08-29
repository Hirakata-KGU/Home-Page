import { ref, onMounted, onUnmounted } from 'vue';

export function useCountdown(targetDateStr: string = '2026-10-31T10:00:00') {
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  const isFinished = ref(false);

  let timerId: ReturnType<typeof setInterval> | null = null;

  const calculateRemaining = () => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance <= 0) {
      days.value = 0;
      hours.value = 0;
      minutes.value = 0;
      seconds.value = 0;
      isFinished.value = true;
      if (timerId) clearInterval(timerId);
      return;
    }

    days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
  };

  onMounted(() => {
    calculateRemaining();
    timerId = setInterval(calculateRemaining, 1000);
  });

  onUnmounted(() => {
    if (timerId) {
      clearInterval(timerId);
    }
  });

  return {
    days,
    hours,
    minutes,
    seconds,
    isFinished,
  };
}

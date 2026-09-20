<script setup lang="ts">
interface Props {
  color?: string;
  maxWidth?: string;
}

withDefaults(defineProps<Props>(), {
  color: '#42845A',
  maxWidth: '824px',
});
</script>

<template>
  <div class="ornament-line-wrapper" :style="{ maxWidth: maxWidth }">
    <!-- Left 3 dots -->
    <div class="dots dots-left">
      <span v-for="n in 3" :key="n" class="dot" :style="{ backgroundColor: color }"></span>
    </div>

    <!-- Center Line -->
    <div class="line-bar" :style="{ borderColor: color }"></div>

    <!-- Right 3 dots -->
    <div class="dots dots-right">
      <span v-for="n in 3" :key="n" class="dot" :style="{ backgroundColor: color }"></span>
    </div>
  </div>
</template>

<style scoped>
.ornament-line-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin: 12px auto;
  position: relative;
}

.dots {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: block;
}

.line-bar {
  flex: 1;
  height: 0;
  border-top: 5px solid;
  border-radius: 2px;
}
</style>

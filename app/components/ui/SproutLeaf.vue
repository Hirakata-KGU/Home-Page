<script setup lang="ts">
interface Props {
  stemColor?: string;
  leafLeftColor?: string;
  leafRightColor?: string;
  width?: number;
  height?: number;
}

withDefaults(defineProps<Props>(), {
  stemColor: '#9AC467',
  leafLeftColor: '#DFF794',
  leafRightColor: '#B9DD7B',
  width: 34,
  height: 54,
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 36 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="sprout-leaf-svg"
  >
    <!-- Stem -->
    <path
      d="M18 54V22"
      :stroke="stemColor"
      stroke-width="2.2"
      stroke-linecap="round"
    />
    <!-- Left Leaf -->
    <path
      d="M18 26C14 18 4 15 2 20C0 26 12 31 18 26Z"
      :fill="leafLeftColor"
      transform="rotate(-8 18 26)"
    />
    <!-- Right Leaf -->
    <path
      d="M18 26C22 18 32 15 34 20C36 26 24 31 18 26Z"
      :fill="leafRightColor"
      transform="rotate(8 18 26)"
    />
  </svg>
</template>

<style scoped>
.sprout-leaf-svg {
  display: inline-block;
  vertical-align: bottom;
  pointer-events: none;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
  transition: transform 0.3s ease;
}
.sprout-leaf-svg:hover {
  transform: scale(1.15) translateY(-3px);
}
</style>

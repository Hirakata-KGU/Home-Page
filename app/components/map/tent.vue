<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  label?: string;
  strokeColor?: string;
  isActive?: boolean;
  interactive?: boolean;
  rotate?: number;
}

const props = withDefaults(defineProps<Props>(), {
  label: '1',
  strokeColor: '#c9a063',
  isActive: false,
  interactive: true,
  rotate: 0,
});

const emit = defineEmits<{
  (e: 'select'): void;
  (e: 'hover-enter'): void;
  (e: 'hover-leave'): void;
}>();

// フォントサイズ (SVG viewBox基準)
const fontSize = computed(() => {
  const len = String(props.label).length;
  return len >= 4 ? '5px' : len >= 3 ? '5.8px' : '7.5px';
});
</script>

<template>
  <div
    class="tent-wrapper"
    :class="{
      'is-active': isActive,
      'is-clickable': interactive,
    }"
    :style="{
      '--tent-rotate': `${props.rotate}deg`,
    }"
    @pointerenter="(e: PointerEvent) => e.pointerType !== 'touch' && emit('hover-enter')"
    @pointerleave="(e: PointerEvent) => e.pointerType !== 'touch' && emit('hover-leave')"
    @click.stop="interactive && emit('select')"
  >
    <svg
      viewBox="0 0 20.786667 15.096"
      xmlns="http://www.w3.org/2000/svg"
      class="tent-svg"
      role="button"
      :aria-label="props.label"
      tabindex="0"
      @keydown.enter="interactive && emit('select')"
      @keydown.space.prevent="interactive && emit('select')"
    >
      <rect
        x="0.8"
        y="0.8"
        width="19.186"
        height="13.496"
        rx="2"
        class="tent-rect"
        :stroke="props.strokeColor"
      />
      <text
        x="10.393"
        y="8.2"
        text-anchor="middle"
        dominant-baseline="central"
        class="tent-label-text"
        :style="{ fontSize }"
      >
        {{ props.label }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.tent-wrapper {
  position: relative;
  display: inline-block;
  user-select: none;
  touch-action: manipulation;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  transform: rotate(var(--tent-rotate, 0deg));
}

.tent-wrapper.is-clickable {
  cursor: pointer;
}

.tent-wrapper::after {
  content: '';
  position: absolute;
  inset: -6px;
  background: transparent;
  pointer-events: auto;
}

.tent-svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
}

.tent-rect {
  fill: #f6faed;
  stroke-width: 1.5;
  transition: fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease;
}

.tent-wrapper:hover .tent-svg,
.tent-wrapper.is-active .tent-svg {
  transform: scale(1.18);
  filter: drop-shadow(0 2px 5px rgba(47, 91, 52, 0.35));
}

.tent-wrapper:hover .tent-rect,
.tent-wrapper.is-active .tent-rect {
  fill: #e8f5e9;
  stroke: var(--olive, #2f5b34);
  stroke-width: 2;
}

.tent-label-text {
  fill: #2f5b34;
  font-family: inherit;
  font-weight: 900;
  pointer-events: none;
}
</style>
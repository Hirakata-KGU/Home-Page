<script lang="ts" setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import type { EventItem } from '~/data/events';
import EventCard from '~/components/ui/EventCard.vue';

interface Props {
  tentNo?: string | number;
  company?: boolean;
  event?: EventItem | null;
  events?: EventItem[];
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  showCardOnHover?: boolean;
  interactive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tentNo: '1',
  company: false,
  event: null,
  events: () => [],
  placement: 'auto',
  showCardOnHover: true,
  interactive: true,
});

const emit = defineEmits<{
  (e: 'select', tentNo: string | number): void;
}>();

const isOpen = ref(false);
const tentRef = ref<HTMLElement | null>(null);

// 表示対象のイベント一覧
const targetEvents = computed<EventItem[]>(() => {
  if (props.events && props.events.length > 0) {
    return props.events;
  }
  if (props.event) {
    return [props.event];
  }
  return [];
});

const hasEvents = computed(() => targetEvents.value.length > 0);

// 表示テキスト
const displayText = computed(() => {
  if (props.company) {
    return `企業${props.tentNo}`;
  }
  return String(props.tentNo);
});

// フォントサイズ
const fontSize = computed(() => {
  if (props.company) {
    return '4.5px';
  }
  const str = String(props.tentNo);
  if (str.length >= 4) return '5px';
  if (str.length >= 3) return '5.8px';
  return '7.5px';
});

// ポップオーバー位置のクラス
const placementClass = computed(() => {
  if (props.placement !== 'auto') {
    return `placement-${props.placement}`;
  }
  return 'placement-top';
});

const toggleOpen = () => {
  if (!props.interactive || !hasEvents.value) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    emit('select', props.tentNo);
  }
};

// PC（マウス環境）でのホバー操作
const handleMouseEnter = () => {
  if (typeof window === 'undefined') return;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;

  if (!props.interactive || !props.showCardOnHover || !hasEvents.value) return;
  isOpen.value = true;
};

const handleMouseLeave = () => {
  if (typeof window === 'undefined') return;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;

  if (!props.interactive || !props.showCardOnHover) return;
  isOpen.value = false;
};

const handleDocumentClick = (e: MouseEvent | TouchEvent) => {
  if (!isOpen.value) return;
  const target = e.target as Node;
  if (tentRef.value && !tentRef.value.contains(target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('touchstart', handleDocumentClick, { passive: true });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
  document.removeEventListener('touchstart', handleDocumentClick);
});
</script>

<template>
  <div
    ref="tentRef"
    class="tent-wrapper"
    :class="{
      'is-active': isOpen,
      'is-clickable': interactive && hasEvents,
      'is-company': company
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.stop="toggleOpen"
  >
    <!-- テント本体 SVG -->
    <svg
      viewBox="0 0 20.786667 15.096"
      xmlns="http://www.w3.org/2000/svg"
      class="tent-svg"
      role="button"
      :aria-label="company ? `企業テント ${tentNo}` : `テント ${tentNo}`"
      tabindex="0"
      @keydown.enter="toggleOpen"
      @keydown.space.prevent="toggleOpen"
    >
      <rect
        x="0.8"
        y="0.8"
        width="19.186"
        height="13.496"
        rx="2"
        class="tent-rect"
        :class="{ 'company-rect': company }"
      />
      <text
        x="10.393"
        y="8.2"
        text-anchor="middle"
        dominant-baseline="central"
        class="tent-label-text"
        :class="{ 'company-text': company }"
        :style="{ fontSize }"
      >
        {{ displayText }}
      </text>
    </svg>

    <!-- ポップオーバー: EventCard のみを表示 -->
    <Transition name="fade-scale">
      <div
        v-if="isOpen && hasEvents"
        class="tent-card-popover"
        :class="placementClass"
        @click.stop
      >
        <div class="popover-cards-wrap">
          <div
            v-for="ev in targetEvents"
            :key="ev.id"
            class="popover-card-item"
          >
            <EventCard :event="ev" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tent-wrapper {
  position: relative;
  display: inline-block;
  user-select: none;
  touch-action: manipulation;
}

.tent-wrapper.is-clickable {
  cursor: pointer;
}

/* タップしやすくするための見えないタッチターゲット拡大エリア */
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
  stroke: #c9a063;
  stroke-width: 1.5;
  transition: fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease;
}

.tent-rect.company-rect {
  fill: #f1f8f2;
  stroke: #4a7f52;
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
  letter-spacing: -0.02em;
}

.tent-label-text.company-text {
  fill: #1e3d26;
  font-weight: 800;
}

/* ポップオーバー：周囲の箱・枠線・パディングを無くし、EventCard 自体のみを表示 */
.tent-card-popover {
  position: absolute;
  z-index: 200;
  width: min(300px, 80vw);
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
  pointer-events: auto;
}

/* PC配置 */
@media (min-width: 641px) {
  .tent-card-popover.placement-top {
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
  }

  .tent-card-popover.placement-bottom {
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
  }

  .tent-card-popover.placement-left {
    right: calc(100% + 6px);
    top: 50%;
    transform: translateY(-50%);
  }

  .tent-card-popover.placement-right {
    left: calc(100% + 6px);
    top: 50%;
    transform: translateY(-50%);
  }
}

/* スマホ閲覧時: 画面端での見切れを防止するため画面下部にフローティング表示 */
@media (max-width: 640px) {
  .tent-card-popover {
    position: fixed;
    bottom: 24px;
    left: 16px;
    right: 16px;
    top: auto;
    width: auto;
    max-width: 360px;
    margin: 0 auto;
    z-index: 1000;
    filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.25));
  }
}

.popover-cards-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 380px;
  overflow-y: auto;
}

/* トランジション */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
}

@media (min-width: 641px) {
  .placement-top.fade-scale-enter-from,
  .placement-top.fade-scale-leave-to {
    transform: translateX(-50%) scale(0.94);
  }

  .placement-bottom.fade-scale-enter-from,
  .placement-bottom.fade-scale-leave-to {
    transform: translateX(-50%) scale(0.94);
  }

  .placement-left.fade-scale-enter-from,
  .placement-left.fade-scale-leave-to {
    transform: translateY(-50%) scale(0.94);
  }

  .placement-right.fade-scale-enter-from,
  .placement-right.fade-scale-leave-to {
    transform: translateY(-50%) scale(0.94);
  }
}

@media (max-width: 640px) {
  .fade-scale-enter-from,
  .fade-scale-leave-to {
    transform: translateY(12px) scale(0.96);
  }
}
</style>
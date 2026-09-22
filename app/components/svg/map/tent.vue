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

// フォントサイズ調整
const fontSize = computed(() => {
  if (props.company) {
    return '4px';
  }
  const str = String(props.tentNo);
  if (str.length >= 4) return '4.5px';
  if (str.length >= 3) return '5.2px';
  return '6.8px';
});

// ポップオーバー位置のクラス
const placementClass = computed(() => {
  if (props.placement !== 'auto') {
    return `placement-${props.placement}`;
  }
  // auto の場合はデフォルトで top
  return 'placement-top';
});

const toggleOpen = () => {
  if (!props.interactive || !hasEvents.value) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    emit('select', props.tentNo);
  }
};

const handleMouseEnter = () => {
  if (!props.interactive || !props.showCardOnHover || !hasEvents.value) return;
  isOpen.value = true;
};

const handleMouseLeave = () => {
  if (!props.interactive || !props.showCardOnHover) return;
  isOpen.value = false;
};

const handleDocumentClick = (e: MouseEvent) => {
  if (!isOpen.value) return;
  if (tentRef.value && !tentRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
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
        x="0.9"
        y="0.9"
        width="18.986"
        height="13.296"
        rx="1.5"
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

    <!-- ポップオーバー: EventCard (左 / 右 / 上 / 下) -->
    <Transition name="fade-scale">
      <div
        v-if="isOpen && hasEvents"
        class="tent-card-popover"
        :class="placementClass"
        @click.stop
      >
        <div class="popover-close-row">
          <span class="popover-badge">
            {{ company ? `企業テント ${tentNo}` : `模擬店テント No.${tentNo}` }}
          </span>
          <button
            class="popover-close-btn"
            type="button"
            aria-label="閉じる"
            @click.stop="isOpen = false"
          >
            ✕
          </button>
        </div>

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
}

.tent-wrapper.is-clickable {
  cursor: pointer;
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
  stroke-width: 1.4;
  transition: fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease;
}

.tent-rect.company-rect {
  fill: #f1f8f2;
  stroke: #4a7f52;
}

.tent-wrapper:hover .tent-svg,
.tent-wrapper.is-active .tent-svg {
  transform: scale(1.12);
  filter: drop-shadow(0 2px 4px rgba(47, 91, 52, 0.3));
}

.tent-wrapper:hover .tent-rect,
.tent-wrapper.is-active .tent-rect {
  fill: #e8f5e9;
  stroke: var(--olive, #2f5b34);
  stroke-width: 1.8;
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

/* ポップオーバーの配置 */
.tent-card-popover {
  position: absolute;
  z-index: 100;
  width: min(320px, 86vw);
  background: white;
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border, #e5e5e5);
  padding: 10px;
}

/* 上配置 (デフォルト) */
.tent-card-popover.placement-top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

/* 下配置 */
.tent-card-popover.placement-bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

/* 左配置 */
.tent-card-popover.placement-left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

/* 右配置 */
.tent-card-popover.placement-right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.popover-close-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 0 4px;
}

.popover-badge {
  font-size: 11px;
  font-weight: 800;
  color: var(--olive, #2f5b34);
  background: rgba(47, 91, 52, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.popover-close-btn {
  background: transparent;
  border: none;
  font-size: 14px;
  color: #888;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  line-height: 1;
}

.popover-close-btn:hover {
  color: #333;
  background: #f0f0f0;
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
  transform: scale(0.92);
}

.placement-top.fade-scale-enter-from,
.placement-top.fade-scale-leave-to {
  transform: translateX(-50%) scale(0.92);
}

.placement-bottom.fade-scale-enter-from,
.placement-bottom.fade-scale-leave-to {
  transform: translateX(-50%) scale(0.92);
}

.placement-left.fade-scale-enter-from,
.placement-left.fade-scale-leave-to {
  transform: translateY(-50%) scale(0.92);
}

.placement-right.fade-scale-enter-from,
.placement-right.fade-scale-leave-to {
  transform: translateY(-50%) scale(0.92);
}
</style>
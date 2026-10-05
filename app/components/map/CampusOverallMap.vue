<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import MapBase from '~/components/map/map-base.vue';
import No3Svg from '~/components/map/no3.vue';
import No6Svg from '~/components/map/no6.vue';
import No7Svg from '~/components/map/no7.vue';
import No8Svg from '~/components/map/no8.vue';
import SccSvg from '~/components/map/scc.vue';
import ChickSvg from '~/components/map/chick.vue';
import GymSvg from '~/components/map/gym.vue';
import TearoomSvg from '~/components/map/tearoom.vue';
import TentItem from '~/components/map/tent.vue';
import { getEventsByTentNo, getEventsByLocationId } from '~/data/map-buildings';
import EventCard from '~/components/ui/EventCard.vue';

const emit = defineEmits<{
  (e: 'select-building', buildingId: 'no3' | 'no6' | 'no7' | 'no8' | 'scc'): void;
}>();

// スクロールコンテナの参照
const scrollContainerRef = ref<HTMLElement | null>(null);

// アヒル（遊び心）関連の状態
const isChickSwimming = ref(false);
const showChickBubble = ref(false);
const chickQuackText = ref('ぴちゃぴちゃ！');

const { start: startSwimmingTimer } = useTimeoutFn(() => {
  isChickSwimming.value = false;
}, 1200, { immediate: false });

const { start: startBubbleTimer } = useTimeoutFn(() => {
  showChickBubble.value = false;
}, 1500, { immediate: false });

const quackMessages = ['ぴちゃぴちゃ！', 'ピヨッ♪', 'クワッ！', 'すいすい〜', '🐣✨'];
let quackIndex = 0;

function triggerChickClick() {
  isChickSwimming.value = true;
  startSwimmingTimer();

  chickQuackText.value = quackMessages[quackIndex % quackMessages.length];
  quackIndex++;
  showChickBubble.value = true;
  startBubbleTimer();
}

// テント配置データ (ViewBox 385 x 580 基準のパーセント値: 手動微調整値を数学的アフィン変換で継承)
const tentList = [
  { strokeColor: '#4a7f52', id: 'tc1', label: '企画1', company: true, left: 48.52, top: 75.02, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#4a7f52', id: 'tc2', label: '企画2', company: true, left: 48.52, top: 59.85, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't1', label: '1', company: false, left: 48.52, top: 73.25, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't2', label: '2', company: false, left: 48.52, top: 71.4, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't3', label: '3', company: false, left: 48.52, top: 69.54, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't4', label: '4', company: false, left: 48.52, top: 67.69, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't5', label: '5', company: false, left: 48.52, top: 65.92, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't6', label: '6', company: false, left: 55.99, top: 57.74, width: 5.16, height: 2.4, placement: 'right' as const },
  { strokeColor: '#c9a063', id: 't7', label: '7', company: false, left: 55.99, top: 55.89, width: 5.16, height: 2.4, placement: 'right' as const },
  { strokeColor: '#c9a063', id: 't8', label: '8', company: false, left: 48.52, top: 58.08, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't9', label: '9', company: false, left: 48.52, top: 56.23, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't10', label: '10', company: false, left: 48.52, top: 54.37, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't11', label: '11', company: false, left: 48.52, top: 51.17, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't12', label: '12', company: false, left: 48.52, top: 49.31, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't13', label: '13', company: false, left: 48.52, top: 44.85, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't14', label: '14', company: false, left: 48.52, top: 42.99, width: 5.16, height: 2.4, placement: 'left' as const },
  { strokeColor: '#c9a063', id: 't15', label: '15', company: false, left: 55.99, top: 44.93, width: 5.16, height: 2.4, placement: 'right' as const },
  { strokeColor: '#c9a063', id: 't16', label: '16', company: false, left: 55.99, top: 43.08, width: 5.16, height: 2.4, placement: 'right' as const },
  { strokeColor: '#c9a063', id: 't17', label: '17', company: false, left: 55.99, top: 41.22, width: 5.16, height: 2.4, placement: 'right' as const },
  { strokeColor: '#c9a063', id: 't18', label: '18', company: false, left: 55.99, top: 39.45, width: 5.16, height: 2.4, placement: 'right' as const },
  { strokeColor: '#c9a063', id: 't19', label: '19', company: false, left: 57.00, top: 24.62, width: 5.16, height: 2.4, rotate: 0, placement: 'bottom' as const },
  { strokeColor: '#c9a063', id: 't20', label: '20', company: false, left: 61.60, top: 24.40, width: 5.16, height: 2.4, rotate: -8, placement: 'bottom' as const },
  { strokeColor: '#c9a063', id: 't21', label: '21', company: false, left: 66.20, top: 23.40, width: 5.16, height: 2.4, rotate: -25, placement: 'bottom' as const },
  { strokeColor: '#c9a063', id: 't22', label: '22', company: false, left: 70.00, top: 21.50, width: 5.16, height: 2.4, rotate: -50, placement: 'bottom' as const },
];

const hoveredBuilding = ref<string | null>(null);

// 選択中またはホバー中のポップオーバー管理（テント24基 + 茶室）
interface PopoverItem {
  strokeColor?: string;
  id: string;
  label: string;
  company?: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  placement: 'left' | 'right' | 'top' | 'bottom' | 'bottom-left';
}

const teaRoomItem: PopoverItem = {
  id: 'tea-room',
  label: '茶室',
  company: false,
  left: 83.73,
  top: 1.64,
  width: 2.58,
  height: 2.53,
  placement: 'bottom-left',
};

const activeTent = ref<PopoverItem | null>(null);
const isPinned = ref(false);

const activeTentEvents = computed(() => {
  if (!activeTent.value) return [];
  if (activeTent.value.id === 'tea-room') {
    return getEventsByLocationId('loc-sado-room');
  }
  return getEventsByTentNo(activeTent.value.label);
});

const { start: scheduleHide, stop: clearHideTimer } = useTimeoutFn(() => {
  activeTent.value = null;
}, 50, { immediate: false });

const closeTent = () => {
  clearHideTimer();
  activeTent.value = null;
  isPinned.value = false;
};

const toggleTent = (tent: PopoverItem) => {
  clearHideTimer();
  const events = getEventsByTentNo(tent.label);
  if (events.length === 0) return;
  if (activeTent.value?.id === tent.id && isPinned.value) {
    closeTent();
  } else {
    activeTent.value = tent;
    isPinned.value = true;
  }
};

const handleTentMouseEnter = (tent: PopoverItem) => {
  if (isPinned.value) return;
  clearHideTimer();
  const events = getEventsByTentNo(tent.label);
  if (events.length > 0) {
    activeTent.value = tent;
  }
};

const handleTentMouseLeave = (tent: PopoverItem) => {
  if (isPinned.value) return;
  if (activeTent.value?.id === tent.id) {
    scheduleHide();
  }
};

const toggleTeaRoom = () => {
  clearHideTimer();
  if (activeTent.value?.id === teaRoomItem.id && isPinned.value) {
    closeTent();
  } else {
    activeTent.value = teaRoomItem;
    isPinned.value = true;
  }
};

const handleTeaRoomMouseEnter = () => {
  hoveredBuilding.value = 'tearoom';
  if (isPinned.value) return;
  clearHideTimer();
  activeTent.value = teaRoomItem;
};

const handleTeaRoomMouseLeave = () => {
  hoveredBuilding.value = null;
  if (isPinned.value) return;
  if (activeTent.value?.id === teaRoomItem.id) {
    scheduleHide();
  }
};

// スマホで開いた際に中央のメインストリートが見えるよう初期スクロール
onMounted(() => {
  if (scrollContainerRef.value) {
    const el = scrollContainerRef.value;
    if (el.scrollWidth > el.clientWidth) {
      // 中央（メインストリート付近）にスクロール
      el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.46;
    }
  }
});
</script>

<template>
  <div class="overall-map-container">
    <!-- PC・スマホ共通：カード固定表示中にどこをタップ/クリックしても解除できる透明バックドロップ -->
    <div
      v-if="activeTent && isPinned"
      class="fixed inset-0 z-[990]"
      aria-hidden="true"
      @click="closeTent"
    />

    <!-- 地図の外枠フレーム（画面幅ぴったり、外枠からはみ出る部分はoverflow: hiddenで完全非描画） -->
    <div class="map-outer-frame">
      <!-- 内部スクロールコンテナ（中身の地図を小さくせず、指で左右スクロール可能） -->
      <div ref="scrollContainerRef" class="map-scroll-viewport">
        <!-- 中身の地図キャンバス（スマホでもmin-widthを保持し小さくならない） -->
        <div class="map-canvas">
          <div class="map-aspect-ratio-box">
            <!-- 1. ベースマップSVG（背景、道、その他建物） -->
            <div class="map-base-layer">
              <MapBase class="w-full h-full block" />
            </div>

            <!-- 2. 建物オーバーレイレイヤー（選択可能建物） -->
            <div class="map-buildings-layer">
              <!-- 3号館 -->
              <div
                class="interactive-building building-no3"
                :class="{ 'is-hovered': hoveredBuilding === 'no3' }"
                style="left: 61.16%; top: 65.18%; width: 20.40%; height: 14.87%;"
                role="button"
                tabindex="0"
                aria-label="社会連携館 (3号館) の企画一覧を開く"
                @mouseenter="hoveredBuilding = 'no3'"
                @mouseleave="hoveredBuilding = null"
                @click="emit('select-building', 'no3')"
              >
                <No3Svg class="building-svg-element" />
                <div class="building-pin pin-no3">
                  <span class="pin-badge">社会連携館 (3号館)</span>
                </div>
              </div>

              <!-- 6号館 -->
              <div
                class="interactive-building building-no6"
                :class="{ 'is-hovered': hoveredBuilding === 'no6' }"
                style="left: 73.56%; top: 26.28%; width: 26.02%; height: 8.77%;"
                role="button"
                tabindex="0"
                aria-label="文化館 (6号館) の企画一覧を開く"
                @mouseenter="hoveredBuilding = 'no6'"
                @mouseleave="hoveredBuilding = null"
                @click="emit('select-building', 'no6')"
              >
                <No6Svg class="building-svg-element" />
                <div class="building-pin pin-no6 pt-5">
                  <span class="pin-badge">文化館 (6号館)</span>
                </div>
              </div>

              <!-- 7号館 -->
              <div
                class="interactive-building building-no7"
                :class="{ 'is-hovered': hoveredBuilding === 'no7' }"
                style="left: 61.65%; top: 39.80%; width: 17.26%; height: 20.75%;"
                role="button"
                tabindex="0"
                aria-label="音楽館 (7号館) の企画一覧を開く"
                @mouseenter="hoveredBuilding = 'no7'"
                @mouseleave="hoveredBuilding = null"
                @click="emit('select-building', 'no7')"
              >
                <No7Svg class="building-svg-element" />
                <div class="building-pin pin-no7">
                  <span class="pin-badge">音楽館 (7号館)</span>
                </div>
              </div>

              <!-- 8号館 -->
              <div
                class="interactive-building building-no8"
                :class="{ 'is-hovered': hoveredBuilding === 'no8' }"
                style="left: 76.59%; top: 18.16%; width: 22.96%; height: 7.37%;"
                role="button"
                tabindex="0"
                aria-label="文化館 (8号館) の企画一覧を開く"
                @mouseenter="hoveredBuilding = 'no8'"
                @mouseleave="hoveredBuilding = null"
                @click="emit('select-building', 'no8')"
              >
                <No8Svg class="building-svg-element" />
                <div class="building-pin pin-no8">
                  <span class="pin-badge">文化館 (8号館)</span>
                </div>
              </div>

              <!-- SCC (屋内ステージ) -->
              <div
                class="interactive-building building-scc"
                :class="{ 'is-hovered': hoveredBuilding === 'scc' }"
                style="left: 28.44%; top: 28.38%; width: 23.31%; height: 11.58%;"
                role="button"
                tabindex="0"
                aria-label="屋内ステージ (SCC) の企画一覧を開く"
                @mouseenter="hoveredBuilding = 'scc'"
                @mouseleave="hoveredBuilding = null"
                @click="emit('select-building', 'scc')"
              >
                <SccSvg class="building-svg-element" />
                <div class="building-pin pin-scc">
                  <span class="pin-badge">屋内ステージ (SCC)</span>
                </div>
              </div>

              <!-- 体育館（クリックでタイムテーブルへ） -->
              <NuxtLink
                to="/schedule?venue=体育館"
                class="interactive-building building-gym"
                :class="{ 'is-hovered': hoveredBuilding === 'gym' }"
                style="left: -7.70%; top: 75.64%; width: 24.79%; height: 16.53%;"
                aria-label="体育館のタイムテーブルを見る"
                @mouseenter="hoveredBuilding = 'gym'"
                @mouseleave="hoveredBuilding = null"
              >
                <GymSvg class="building-svg-element" />
                <div class="building-pin pin-gym">
                  <span class="pin-badge">体育館</span>
                </div>
              </NuxtLink>

              <!-- 茶室（ホバー・タップでイベントカード出現） -->
              <div
                class="interactive-building building-tearoom"
                :class="{ 'is-hovered': hoveredBuilding === 'tearoom' || activeTent?.id === 'tea-room' }"
                style="left: 83.73%; top: 1.64%; width: 2.58%; height: 2.53%;"
                role="button"
                tabindex="0"
                aria-label="茶室の企画を見る"
                @mouseenter="handleTeaRoomMouseEnter"
                @mouseleave="handleTeaRoomMouseLeave"
                @click="toggleTeaRoom"
              >
                <TearoomSvg class="building-svg-element" />
                <div class="building-pin pin-tearoom">
                  <span class="pin-badge">茶室</span>
                </div>
              </div>

              <!-- チャペル（クリックでタイムテーブルへ） -->
              <NuxtLink
                to="/schedule?venue=チャペル"
                class="interactive-stage stage-chapel"
                style="left: 13.05%; top: 54.88%; width: 15.13%; height: 6.74%;"
                aria-label="チャペルのタイムテーブルを見る"
              >
                <div class="stage-pin-badge">
                  <span>チャペル</span>
                </div>
              </NuxtLink>

              <!-- 屋外ステージ（クリックでタイムテーブルへ） -->
              <NuxtLink
                to="/schedule?venue=屋外ステージ"
                class="interactive-stage stage-outdoor"
                style="left: 29.96%; top: 42.24%; width: 16.91%; height: 6.74%;"
                aria-label="屋外ステージのタイムテーブルを見る"
              >
                <div class="stage-pin-badge is-outdoor">
                  <span>屋外ステージ</span>
                </div>
              </NuxtLink>

              <!-- アヒル（遊び心要素: 6号館左側の池エリア） -->
              <div
                class="interactive-chick-wrapper"
                :class="{ 'is-swimming': isChickSwimming }"
                style="left: 62.21%; top: 29.38%; width: 5.47%; height: 3.33%;"
                role="button"
                tabindex="0"
                aria-label="水辺のアヒル"
                title="水辺のアヒル（ホバーやタップでぴちゃぴちゃ動くよ）"
                @mouseenter="isChickSwimming = true"
                @mouseleave="isChickSwimming = false"
                @click="triggerChickClick"
              >
                <!-- 水面の波紋エフェクト -->
                <div class="water-ripple ripple-1" />
                <div class="water-ripple ripple-2" />
                <div class="water-splash splash-l" />
                <div class="water-splash splash-r" />

                <!-- アヒル本体SVG -->
                <ChickSvg class="chick-svg-element" />

                <!-- クリック/タップ時の吹き出し -->
                <Transition name="pop-bubble">
                  <div v-if="showChickBubble" class="chick-bubble">
                    <span>{{ chickQuackText }}</span>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- 3. 模擬店テントオーバーレイレイヤー（24基） -->
            <div class="map-tents-layer">
              <div
                v-for="t in tentList"
                :key="t.id"
                class="tent-pos-wrapper"
                :style="{
                  left: `${t.left}%`,
                  top: `${t.top}%`,
                  width: `${t.width}%`,
                  height: `${t.height}%`
                }"
              >
                <TentItem
                  :label="t.label"
                  :stroke-color="t.strokeColor"
                  :is-active="activeTent?.id === t.id"
                  :rotate="t.rotate"
                  class="w-full h-full"
                  @select="toggleTent(t)"
                  @hover-enter="handleTentMouseEnter(t)"
                  @hover-leave="handleTentMouseLeave(t)"
                />
              </div>
            </div>

            <div class="map-tents-layer">
              <TentItem 
                label="本部"
                stroke-color="#000000"
                :interactive="false"
                :style="{ left: '56.66%', top: '83.53%', width: '7.12%', height: '4.21%' }"
                class="tent-pos-wrapper"
              />
            </div>

            <!-- 単一のポップオーバーレイヤー（デザイン・位置・アニメーションは完全同一） -->
            <div
              v-if="activeTent && activeTentEvents.length > 0"
              class="tent-pos-wrapper"
              :style="{
                left: `${activeTent.left}%`,
                top: `${activeTent.top}%`,
                width: `${activeTent.width}%`,
                height: `${activeTent.height}%`,
                pointerEvents: 'none',
                zIndex: 1000
              }"
            >
              <Transition name="fade-scale" appear>
                <div
                  class="tent-card-popover"
                  :class="`placement-${activeTent.placement}`"
                  style="pointer-events: auto;"
                  @mouseenter="!isPinned && clearHideTimer()"
                  @mouseleave="!isPinned && scheduleHide()"
                  @click.stop
                >
                  <div class="popover-cards-wrap">
                    <div
                      v-for="ev in activeTentEvents"
                      :key="ev.id"
                      class="popover-card-item"
                    >
                      <EventCard :event="ev" />
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overall-map-container {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}


/* 地図の外枠フレーム:
   - 画面幅（max-width: 820px）に合わせて収まる
   - overflow: hidden により、外枠からはみ出る部分は一切描画されない！
*/
.map-outer-frame {
  position: relative;
  width: 100%;
  border-radius: 16px;
  background: #fdfbf7;
  border: 1px solid var(--border, #e5e5e5);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden; /* 外枠からはみ出る部分は完全に非描画（マスク） */
}

/* 内部スクロールビューポート:
   - 外枠の中で左右にスクロール可能
*/
.map-scroll-viewport {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(47, 91, 52, 0.25) transparent;
}

.map-scroll-viewport::-webkit-scrollbar {
  height: 6px;
}

.map-scroll-viewport::-webkit-scrollbar-thumb {
  background: rgba(47, 91, 52, 0.25);
  border-radius: 4px;
}

/* 中身の地図キャンバス:
   - 横幅が狭くなっても中身の地図は小さくしない！（min-width: 600px）
   - PCでは外枠幅に合わせて自然に広がる
*/
.map-canvas {
  position: relative;
  width: 100%;
  min-width: 700px; /* 中身の地図を小さくしない基準幅 */
  margin: 0 auto;
}

@media (min-width: 820px) {
  .map-canvas {
    min-width: 100%;
  }
}

/* アスペクト比 385 : 580 (約 1 : 1.5065) */
.map-aspect-ratio-box {
  position: relative;
  width: 100%;
  padding-bottom: 150.65%;
}

.map-base-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.map-buildings-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.interactive-building {
  position: absolute;
  cursor: pointer;
  color: #6f6e6e;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.building-svg-element {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08));
  transition: filter 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.interactive-building:hover .building-svg-element,
.interactive-building:focus-visible .building-svg-element,
.interactive-building.is-hovered .building-svg-element {
  color: #2f5b34;
  filter: drop-shadow(0 0 8px rgba(47, 91, 52, 0.45));
  transform: scale(1.02);
}

/* 建物ピン */
.building-pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
}

.pin-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  color: #1e3d26;
  font-size: 17px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 6px;
  border: 1px solid rgba(47, 91, 52, 0.3);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  white-space: nowrap;
}

.pin-gym {
  top: 50%;
  left: 65.5%;
}

.building-tearoom {
  position: absolute;
  z-index: 995;
}

.pin-tearoom {
  top: 100%;
  left: 50%;
  transform: translate(-50%, 6px);
  pointer-events: auto;
  cursor: pointer;
}

.pin-tearoom::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -8px;
  right: -8px;
  bottom: -6px;
  background: transparent;
  pointer-events: auto;
}

.interactive-building:hover .pin-badge,
.interactive-building.is-hovered .pin-badge {
  background: var(--olive, #2f5b34);
  color: white;
  border-color: transparent;
}

/* ステージ・チャペル インタラクティブピン */
.interactive-stage {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  z-index: 12;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.stage-pin-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: #ffffff;
  color: #8b5cf6;
  border: 1.5px solid #8b5cf6;
  font-size: 17px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.2);
  white-space: nowrap;
  transition: all 0.2s ease;
}

.stage-pin-badge.is-outdoor {
  color: #c9a063;
  border-color: #c9a063;
  box-shadow: 0 2px 6px rgba(201, 160, 99, 0.25);
}

.interactive-stage:hover .stage-pin-badge {
  transform: scale(1.08);
  background: #8b5cf6;
  color: white;
}

.interactive-stage:hover .stage-pin-badge.is-outdoor {
  background: #c9a063;
  color: white;
}

.map-tents-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 995;
}

.tent-pos-wrapper {
  position: absolute;
  pointer-events: auto;
}

/* アヒル（遊び心要素） */
.interactive-chick-wrapper {
  position: absolute;
  z-index: 15;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  user-select: none;
  touch-action: manipulation;
}

.chick-svg-element {
  width: 100%;
  height: 100%;
  display: block;
  transform-origin: 50% 85%;
  animation: duckFloat 2.4s ease-in-out infinite alternate;
  filter: drop-shadow(0 2px 3px rgba(0, 50, 100, 0.25));
  transition: transform 0.15s ease;
}

/* 通常時の水面ぷかぷか */
@keyframes duckFloat {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-2px) rotate(2deg);
  }
  100% {
    transform: translateY(1px) rotate(-2deg);
  }
}

/* ホバー時 / タップ時: ぴちゃぴちゃ動く */
.interactive-chick-wrapper:hover .chick-svg-element,
.interactive-chick-wrapper.is-swimming .chick-svg-element {
  animation: pichaPicha 0.25s ease-in-out infinite alternate !important;
}

@keyframes pichaPicha {
  0% {
    transform: translateY(-4px) rotate(-10deg) scale(1.06, 0.94);
  }
  50% {
    transform: translateY(2px) rotate(3deg) scale(0.95, 1.05);
  }
  100% {
    transform: translateY(-5px) rotate(10deg) scale(1.08, 0.92);
  }
}

/* 水面の波紋 */
.interactive-chick-wrapper .water-ripple {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 40%);
  width: 140%;
  height: 70%;
  border-radius: 50%;
  border: 1.5px solid rgba(56, 189, 248, 0.7);
  pointer-events: none;
  opacity: 0;
}

.interactive-chick-wrapper:hover .ripple-1,
.interactive-chick-wrapper.is-swimming .ripple-1 {
  animation: pichaRipple 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
}

.interactive-chick-wrapper:hover .ripple-2,
.interactive-chick-wrapper.is-swimming .ripple-2 {
  animation: pichaRipple 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite 0.3s;
}

@keyframes pichaRipple {
  0% {
    transform: translate(-50%, 40%) scale(0.3);
    opacity: 0.9;
    border-color: rgba(56, 189, 248, 0.9);
  }
  100% {
    transform: translate(-50%, 40%) scale(2.4);
    opacity: 0;
    border-color: rgba(56, 189, 248, 0);
  }
}

/* 水しぶき (Splash drops) */
.interactive-chick-wrapper .water-splash {
  position: absolute;
  bottom: 20%;
  width: 4px;
  height: 4px;
  background: #38bdf8;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.interactive-chick-wrapper .splash-l {
  left: 8%;
}

.interactive-chick-wrapper .splash-r {
  right: 8%;
}

.interactive-chick-wrapper:hover .splash-l,
.interactive-chick-wrapper.is-swimming .splash-l {
  animation: splashLeft 0.4s ease-out infinite;
}

.interactive-chick-wrapper:hover .splash-r,
.interactive-chick-wrapper.is-swimming .splash-r {
  animation: splashRight 0.4s ease-out infinite 0.15s;
}

@keyframes splashLeft {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-10px, -12px) scale(0.2);
    opacity: 0;
  }
}

@keyframes splashRight {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(10px, -12px) scale(0.2);
    opacity: 0;
  }
}

/* 吹き出し */
.chick-bubble {
  position: absolute;
  bottom: 115%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  color: #b45309;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 9999px;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border: 1.5px solid #fde68a;
  pointer-events: none;
  z-index: 40;
}

.chick-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: #fde68a transparent transparent transparent;
}

.pop-bubble-enter-active,
.pop-bubble-leave-active {
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pop-bubble-enter-from,
.pop-bubble-leave-to {
  opacity: 0;
  transform: translate(-50%, 6px) scale(0.7);
}

/* ポップオーバー：周囲の箱・枠線・パディングを無くし、EventCard 自体のみを表示（以前と完全同一デザイン） */
.tent-card-popover {
  position: absolute;
  z-index: 1000;
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

  .tent-card-popover.placement-bottom-left {
    right: calc(100% + 2px);
    top: 0;
    transform: none;
  }

  .tent-card-popover.placement-bottom-left::before {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    width: 14px;
    height: 100%;
    background: transparent;
    pointer-events: auto;
  }
}

/* スマホ閲覧時: 画面端での見切れを防止するため画面下部にフローティング表示（dvwによる動的スケーリング） */
@media (max-width: 640px) {
  .tent-card-popover {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    top: auto;
    width: clamp(240px, 72dvw, 300px);
    margin: 0;
    z-index: 1000;
    filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.22));
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
  .placement-top.fade-scale-leave-to,
  .placement-bottom.fade-scale-enter-from,
  .placement-bottom.fade-scale-leave-to {
    transform: translateX(-50%) scale(0.94);
  }

  .placement-left.fade-scale-enter-from,
  .placement-left.fade-scale-leave-to,
  .placement-right.fade-scale-enter-from,
  .placement-right.fade-scale-leave-to {
    transform: translateY(-50%) scale(0.94);
  }

  .placement-bottom-left.fade-scale-enter-from,
  .placement-bottom-left.fade-scale-leave-to {
    transform: translateX(10px) scale(0.94);
  }
}

@media (max-width: 640px) {
  .fade-scale-enter-from,
  .fade-scale-leave-to {
    transform: translate(-50%, 12px) scale(0.96);
  }
}
</style>

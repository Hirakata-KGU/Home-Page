<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MapBase from '~/components/svg/map/map-base.vue';
import No3Svg from '~/components/svg/map/no3.vue';
import No6Svg from '~/components/svg/map/no6.vue';
import No7Svg from '~/components/svg/map/no7.vue';
import No8Svg from '~/components/svg/map/no8.vue';
import SccSvg from '~/components/svg/map/scc.vue';
import TentItem from '~/components/svg/map/tent.vue';
import { getEventsByTentNo } from '~/data/map-buildings';

const emit = defineEmits<{
  (e: 'select-building', buildingId: 'no3' | 'no6' | 'no7' | 'no8' | 'scc'): void;
}>();

// スクロールコンテナの参照
const scrollContainerRef = ref<HTMLElement | null>(null);

// テント配置データ (ViewBox 457.29 x 652.38 基準のパーセント値)
const tentList = [
  { id: 'tc1', tentNo: '1', company: true, left: 43.85, top: 69.9, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 'tc2', tentNo: '2', company: true, left: 43.85, top: 51.9, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't1', tentNo: '1', company: false, left: 43.85, top: 67.8, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't2', tentNo: '2', company: false, left: 43.85, top: 65.6, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't3', tentNo: '3', company: false, left: 43.85, top: 63.4, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't4', tentNo: '4', company: false, left: 43.85, top: 61.2, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't5', tentNo: '5', company: false, left: 43.85, top: 59.1, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't6', tentNo: '6', company: false, left: 52.25, top: 49.4, width: 5.8, height: 2.85, placement: 'right' as const },
  { id: 't7', tentNo: '7', company: false, left: 52.25, top: 47.2, width: 5.8, height: 2.85, placement: 'right' as const },
  { id: 't8', tentNo: '8', company: false, left: 43.85, top: 49.8, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't9', tentNo: '9', company: false, left: 43.85, top: 47.6, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't10', tentNo: '10', company: false, left: 43.85, top: 45.4, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't11', tentNo: '11', company: false, left: 43.85, top: 42.6, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't12', tentNo: '12', company: false, left: 43.85, top: 40.4, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't13', tentNo: '13', company: false, left: 43.85, top: 34.1, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't14', tentNo: '14', company: false, left: 43.85, top: 31.9, width: 5.8, height: 2.85, placement: 'left' as const },
  { id: 't15', tentNo: '15', company: false, left: 52.25, top: 34.2, width: 5.8, height: 2.85, placement: 'right' as const },
  { id: 't16', tentNo: '16', company: false, left: 52.25, top: 32.0, width: 5.8, height: 2.85, placement: 'right' as const },
  { id: 't17', tentNo: '17', company: false, left: 52.25, top: 29.8, width: 5.8, height: 2.85, placement: 'right' as const },
  { id: 't18', tentNo: '18', company: false, left: 52.25, top: 27.7, width: 5.8, height: 2.85, placement: 'right' as const },
  { id: 't19', tentNo: '19', company: false, left: 55.20, top: 10.1, width: 5.8, height: 2.85, placement: 'bottom' as const },
  { id: 't20', tentNo: '20', company: false, left: 60.10, top: 9.5, width: 5.8, height: 2.85, placement: 'bottom' as const },
  { id: 't21', tentNo: '21', company: false, left: 65.00, top: 7.8, width: 5.8, height: 2.85, placement: 'bottom' as const },
  { id: 't22', tentNo: '22', company: false, left: 68.20, top: 4.2, width: 5.8, height: 2.85, placement: 'bottom' as const },
];

const hoveredBuilding = ref<string | null>(null);

// スマホで開いた際に中央のメインストリートが見えるよう初期スクロール
onMounted(() => {
  if (scrollContainerRef.value) {
    const el = scrollContainerRef.value;
    if (el.scrollWidth > el.clientWidth) {
      // 中央（やや左寄りのメインストリート付近）にスクロール
      el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.42;
    }
  }
});
</script>

<template>
  <div class="overall-map-container">
    <!-- 地図説明ガイド（外枠と横幅を統一） -->
    <div class="map-instruction">
      <div class="instruction-item">
        <span class="instruction-dot tent-dot"></span>
        <span><strong>模擬店テント:</strong> タップで詳細</span>
      </div>
      <div class="instruction-item">
        <span class="instruction-dot building-dot"></span>
        <span><strong>各建物:</strong> 企画一覧へ</span>
      </div>
      <div class="instruction-item">
        <span class="instruction-dot stage-dot"></span>
        <span><strong>ステージ・チャペル:</strong> タイムテーブルへ</span>
      </div>
    </div>

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
                style="left: 58.05%; top: 58.22%; width: 22.92%; height: 17.64%;"
                role="button"
                tabindex="0"
                aria-label="3号館の企画一覧を開く"
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
                style="left: 71.99%; top: 12.07%; width: 29.24%; height: 10.40%;"
                role="button"
                tabindex="0"
                aria-label="6号館の企画一覧を開く"
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
                style="left: 58.60%; top: 28.11%; width: 19.39%; height: 24.62%;"
                role="button"
                tabindex="0"
                aria-label="7号館（音楽館）の企画一覧を開く"
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
                style="left: 75.39%; top: 2.43%; width: 25.80%; height: 8.74%;"
                role="button"
                tabindex="0"
                aria-label="8号館（文化館）の企画一覧を開く"
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
                style="left: 21.29%; top: 14.56%; width: 26.19%; height: 13.74%;"
                role="button"
                tabindex="0"
                aria-label="屋内ステージ（SCC）の企画一覧を開く"
                @mouseenter="hoveredBuilding = 'scc'"
                @mouseleave="hoveredBuilding = null"
                @click="emit('select-building', 'scc')"
              >
                <SccSvg class="building-svg-element" />
                <div class="building-pin pin-scc">
                  <span class="pin-badge">屋内ステージ (SCC)</span>
                </div>
              </div>

              <!-- チャペル（クリックでタイムテーブルへ） -->
              <NuxtLink
                to="/schedule?venue=チャペル"
                class="interactive-stage stage-chapel"
                style="left: 4%; top: 46%; width: 17%; height: 8%;"
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
                style="left: 23%; top: 31%; width: 19%; height: 8%;"
                aria-label="屋外ステージのタイムテーブルを見る"
              >
                <div class="stage-pin-badge is-outdoor">
                  <span>屋外ステージ</span>
                </div>
              </NuxtLink>
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
                  :tent-no="t.tentNo"
                  :company="t.company"
                  :events="getEventsByTentNo(t.tentNo)"
                  :placement="t.placement"
                  class="w-full h-full"
                />
              </div>
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
  max-width: 820px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* 地図説明ガイド */
.map-instruction {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 0 auto 14px;
  padding: 10px 16px;
  background: white;
  border-radius: 50px;
  border: 1px solid var(--border, #e5e5e5);
  font-size: 12px;
  color: #4b5563;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  width: 100%;
  box-sizing: border-box;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.instruction-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}

.instruction-dot.tent-dot {
  background: #f6faed;
  border: 1.5px solid #c9a063;
}

.instruction-dot.building-dot {
  background: #2f5b34;
}

.instruction-dot.stage-dot {
  background: #8b5cf6;
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

/* アスペクト比 457.29 : 652.38 (約 1 : 1.4266) */
.map-aspect-ratio-box {
  position: relative;
  width: 100%;
  padding-bottom: 142.66%;
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
}

.tent-pos-wrapper {
  position: absolute;
  pointer-events: auto;
}

@media (max-width: 640px) {
  .map-instruction {
    font-size: 11px;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 12px;
  }
}
</style>

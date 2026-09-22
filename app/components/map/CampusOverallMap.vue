<script setup lang="ts">
import { ref } from 'vue';
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

// テント配置データ (ViewBox 457.29 x 652.38 基準のパーセント値)
const tentList = [
  { id: 't1', tentNo: '1', company: false, left: 44.75, top: 68.24, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't2', tentNo: '2', company: false, left: 44.75, top: 66.07, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't3', tentNo: '3', company: false, left: 44.75, top: 63.89, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't4', tentNo: '4', company: false, left: 44.75, top: 61.71, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't5', tentNo: '5', company: false, left: 44.75, top: 59.54, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't6', tentNo: '6', company: false, left: 53.11, top: 49.89, width: 4.13, height: 2.02, placement: 'right' as const },
  { id: 't7', tentNo: '7', company: false, left: 53.11, top: 47.71, width: 4.13, height: 2.02, placement: 'right' as const },
  { id: 't8', tentNo: '8', company: false, left: 44.75, top: 50.25, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't9', tentNo: '9', company: false, left: 44.75, top: 48.08, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't10', tentNo: '10', company: false, left: 44.75, top: 45.9, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't11', tentNo: '11', company: false, left: 44.75, top: 43.07, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't12', tentNo: '12', company: false, left: 44.75, top: 40.89, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't13', tentNo: '13', company: false, left: 44.75, top: 34.57, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't14', tentNo: '14', company: false, left: 44.75, top: 32.4, width: 4.13, height: 2.02, placement: 'left' as const },
  { id: 't15', tentNo: '15', company: false, left: 53.11, top: 34.73, width: 4.13, height: 2.02, placement: 'right' as const },
  { id: 't16', tentNo: '16', company: false, left: 53.11, top: 32.56, width: 4.13, height: 2.02, placement: 'right' as const },
  { id: 't17', tentNo: '17', company: false, left: 53.11, top: 30.38, width: 4.13, height: 2.02, placement: 'right' as const },
  { id: 't18', tentNo: '18', company: false, left: 53.11, top: 28.21, width: 4.13, height: 2.02, placement: 'right' as const },
  { id: 't19', tentNo: '19', company: false, left: 56.08, top: 10.62, width: 4.13, height: 2.02, placement: 'right' as const },
  { id: 't20', tentNo: '20', company: false, left: 60.97, top: 10.03, width: 4.13, height: 2.02, placement: 'bottom' as const },
  { id: 't21', tentNo: '21', company: false, left: 65.89, top: 8.31, width: 4.13, height: 2.02, placement: 'bottom' as const },
  { id: 't22', tentNo: '22', company: false, left: 69.07, top: 4.71, width: 4.13, height: 2.02, placement: 'bottom' as const },
  { id: 'tc1', tentNo: '1', company: true, left: 40.68, top: 70.42, width: 4.13, height: 2.02, placement: 'top' as const },
  { id: 'tc2', tentNo: '2', company: true, left: 44.75, top: 52.43, width: 4.13, height: 2.02, placement: 'left' as const },
];

// 建物配置データ (ViewBox 457.29 x 652.38 基準のパーセント値)
const buildingList = [
  {
    id: 'scc' as const,
    name: '屋内ステージ (SCC)',
    badge: 'SCC 4F',
    left: 21.29,
    top: 14.56,
    width: 26.19,
    height: 13.74,
  },
  {
    id: 'no8' as const,
    name: '8号館 (文化館)',
    badge: '8号館',
    left: 75.39,
    top: 2.43,
    width: 25.80,
    height: 8.74,
  },
  {
    id: 'no6' as const,
    name: '6号館',
    badge: '6号館',
    left: 71.99,
    top: 12.07,
    width: 29.24,
    height: 10.40,
  },
  {
    id: 'no7' as const,
    name: '7号館 (音楽館)',
    badge: '7号館',
    left: 58.60,
    top: 28.11,
    width: 19.39,
    height: 24.62,
  },
  {
    id: 'no3' as const,
    name: '3号館',
    badge: '3号館',
    left: 58.05,
    top: 58.22,
    width: 22.92,
    height: 17.64,
  },
];

const hoveredBuilding = ref<string | null>(null);
</script>

<template>
  <div class="overall-map-container">
    <!-- マップ操作ガイド -->
    <div class="map-instruction">
      <div class="instruction-item">
        <span class="instruction-dot tent-dot"></span>
        <span><strong>模擬店テント:</strong> タップ / ホバーで企画カードを表示</span>
      </div>
      <div class="instruction-item">
        <span class="instruction-dot building-dot"></span>
        <span><strong>各建物:</strong> タップで各階の企画一覧へジャンプ</span>
      </div>
    </div>

    <!-- マップビューポートラッパー -->
    <div class="map-viewport">
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
              <span class="pin-badge">3号館</span>
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
            <div class="building-pin pin-no6">
              <span class="pin-badge">6号館</span>
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
              <span class="pin-badge">7号館 (音楽館)</span>
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
              <span class="pin-badge">8号館 (文化館)</span>
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
</template>

<style scoped>
.overall-map-container {
  width: 100%;
  position: relative;
}

.map-instruction {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  padding: 10px 16px;
  background: white;
  border-radius: 50px;
  border: 1px solid var(--border, #e5e5e5);
  font-size: 13px;
  color: #4b5563;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.instruction-dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.instruction-dot.tent-dot {
  background: #f6faed;
  border: 2px solid #c9a063;
}

.instruction-dot.building-dot {
  background: #2f5b34;
}

.map-viewport {
  position: relative;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background: #fdfbf7;
  border: 1px solid var(--border, #e5e5e5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

/* アスペクト比 457.29 : 652.38 (約 1 : 1.4266) */
.map-aspect-ratio-box {
  position: relative;
  width: 100%;
  padding-bottom: 142.66%; /* 652.3764 / 457.29067 * 100 */
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
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: filter 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.interactive-building:hover .building-svg-element,
.interactive-building:focus-visible .building-svg-element,
.interactive-building.is-hovered .building-svg-element {
  color: #2f5b34;
  filter: drop-shadow(0 0 8px rgba(47, 91, 52, 0.5)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15));
  transform: scale(1.02);
}

/* 建物ラベルピン */
.building-pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
  transition: transform 0.2s ease;
}

.pin-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  color: #1e3d26;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(47, 91, 52, 0.3);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}

.interactive-building:hover .pin-badge,
.interactive-building.is-hovered .pin-badge {
  background: var(--olive, #2f5b34);
  color: white;
  border-color: transparent;
  transform: scale(1.08);
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
  .pin-badge {
    font-size: 9px;
    padding: 2px 5px;
  }
  
  .map-instruction {
    font-size: 11px;
    gap: 10px;
    padding: 8px 12px;
  }
}
</style>

<script setup lang="ts">
interface LeafItem {
  id: string
  name: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  left: number   // X座標 (px)
  top: number    // Y座標 (px)
  width: number  // 横幅 (px)
  height: number // 縦幅 (px)
}

const leaves: LeafItem[] = [
  // --- Hill 1 (最奥の丘) ---
  { id: 'leaf-0-11', name: 5, left: 1877, top: 50, width: 29.22, height: 56 },
  { id: 'leaf-0-8',  name: 12, left: 1370, top: 97, width: 23.2,  height: 58 },
  { id: 'leaf-0-4',  name: 3, left: 765,  top: 0,  width: 34.67, height: 52 },
  { id: 'leaf-0-3',  name: 8, left: 503,  top: 55, width: 40.0,  height: 60 },

  // --- Hill 2 ---
  { id: 'leaf-1-13', name: 6, left: 1837, top: 110, width: 15.14, height: 58 },
  { id: 'leaf-1-11', name: 14, left: 1511, top: 135, width: 34.42, height: 58 },
  { id: 'leaf-1-8',  name: 16, left: 1214, top: 84, width: 22.0,  height: 55 },
  { id: 'leaf-1-3',  name: 6, left: 434,  top: 125, width: 17.28, height: 58 },
  { id: 'leaf-1-1',  name: 3, left: 188,  top: 90, width: 36.42, height: 57 },

  // --- Hill 3 ---
  { id: 'leaf-2-14', name: 6,  left: 1756, top: 174, width: 14.0,  height: 67 },
  { id: 'leaf-2-13', name: 1,  left: 1642, top: 163, width: 38.67, height: 58 },
  { id: 'leaf-2-7',  name: 5,  left: 1007,  top: 205, width: 20.38, height: 63 },
  { id: 'leaf-2-2',  name: 3,  left: 293,  top: 120, width: 42.67, height: 64 },
  { id: 'leaf-2-1',  name: 14, left: 116,  top: 135, width: 27.45, height: 61 },

  // --- Hill 4 (最前面の丘) ---
  { id: 'leaf-3-13', name: 5, left: 1866, top: 200, width: 44.87, height: 86 },
  { id: 'leaf-3-11', name: 3, left: 1585, top: 255, width: 34.0,  height: 51 },
  { id: 'leaf-3-9',  name: 3, left: 1269, top: 230, width: 42.67, height: 64 },
  { id: 'leaf-3-6',  name: 11, left: 853,  top: 170, width: 36.8,  height: 92 },
  { id: 'leaf-3-4',  name: 6, left: 631,  top: 170, width: 24.21, height: 83 },
  { id: 'leaf-3-0',  name: 8, left: 47,   top: 225, width: 50.67, height: 76 },
]
</script>

<template>
  <section class="relative w-full min-h-fit h-[calc(100dvh-60px)] max-h-[1200px] bg-sprout-bg overflow-hidden flex flex-col justify-center items-center">
    <!-- Top Geometric Border Decorations (Group 3: top-right) -->
    <div
      class="absolute pointer-events-none z-[1] -top-24 -right-20 w-[340px] h-[340px] opacity-25 sm:-top-32 sm:-right-24 sm:w-[480px] sm:h-[480px] sm:opacity-35 lg:-top-40 lg:-right-28 lg:w-[650px] lg:h-[650px] lg:opacity-40 transition-all duration-300"
      aria-hidden="true"
    >
      <div
        v-for="scale in [1, 0.92, 0.84]"
        :key="scale"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        :style="{ width: `${scale * 100}%`, height: `${scale * 100}%` }"
      >
        <Svg8 class="w-full h-full"></Svg8>
      </div>
    </div>

    <!-- Bottom Geometric Border Decorations (Group 2: bottom-left) -->
    <div
      class="absolute pointer-events-none z-[1] -bottom-24 -left-24 w-[360px] h-[360px] opacity-25 sm:-bottom-36 sm:-left-32 sm:w-[500px] sm:h-[500px] sm:opacity-35 lg:bottom-[-200px] lg:-left-40 lg:w-[680px] lg:h-[680px] lg:opacity-40 transition-all duration-300"
      aria-hidden="true"
    >
      <div
        v-for="scale in [1, 0.92, 0.84]"
        :key="scale"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        :style="{ width: `${scale * 100}%`, height: `${scale * 100}%` }"
      >
        <Svg8 class="w-full h-full"></Svg8>
      </div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full h-fit max-w-[1600px] px-6 lg:px-10 flex flex-col lg:flex-row pt-20 lg:pt-0 items-center justify-between pb-[300px] lg:pb-[150px]">
      <!-- Title Block (left: 163px, top: 288px) -->
      <div class="flex-1 max-w-[824px] text-center lg:text-left">
        <div class="flex items-end justify-center gap-6 font-sans font-bold text-2xl lg:text-[32px] leading-tight text-sprout-title mb-2">
          <span>第77回</span>
          <h1 class="font-sans font-bold text-[48px] sm:text-[64px] xl:text-[72px] leading-[1.15] text-sprout-title m-0 tracking-tight">
          平潟祭 2026
          </h1>
        </div>

        <!-- Ornament Line -->
        <UiOrnamentLine color="#42845A" max-width="100%" />

        <!-- Tagline & Quick CTA -->
        <div class="mt-6">
          <UiCountdownTimer target-date="2026-10-31T10:00:00" class="mb-5 w-full" />
        </div>
      </div>

      <!-- Date & Badge Block (Group 1: right side) -->
      <div class="relative w-[calc(480px*0.62)] h-[calc(480px*0.62)] flex items-center justify-center scale-[0.62] min-[380px]:w-[calc(480px*0.68)] min-[380px]:h-[calc(480px*0.68)] min-[380px]:scale-[0.68] sm:w-[calc(480px*0.85)] sm:h-[calc(480px*0.85)] sm:scale-[0.85] lg:w-[calc(480px*0.9)] lg:h-[calc(480px*0.9)] lg:scale-[0.9] xl:w-[480px] xl:h-[480px] xl:scale-100 transition-transform">
        <!-- Polygon 1 -->
        <Svg8 :style="{ width: '480px', height: '480px' }" class="absolute -rotate-[22.5deg]"></Svg8>
        <!-- Polygon 2 -->
        <Svg8 :style="{ width: '443px', height: '443px' }" class="absolute"></Svg8>
        <!-- Polygon 3 (Fill) -->
        <Svg8 :style="{ width: '409px', height: '409px' }" class="absolute -rotate-[22.5deg] drop-shadow-[0_12px_36px_rgba(67,124,98,0.25)]" fill-color="var(--theme-sprout-light)"></Svg8>
        <!-- Polygon 4 (Inner Border) -->
        <Svg8 :style="{ width: '395px', height: '395px' }" class="absolute -rotate-[22.5deg]"></Svg8>

        <!-- Inside Badge Content -->
        <div class="relative z-10 flex flex-col items-center justify-center text-center text-sprout-bg font-sans select-none">
          <span class="text-[32px] font-bold leading-tight mb-0.5">2026</span>
          <div class="text-[44px] lg:text-[54px] font-bold text-white leading-tight drop-shadow-[0_4px_4px_rgba(92,92,92,0.25)] flex items-center gap-3">
            <span>10/31</span>
            <span>11/1</span>
          </div>
          <div class="w-8 h-0 border-t-2 border-sprout-bg my-1.5"></div>
          <span class="text-[28px] font-bold leading-tight mb-2">10:00 ~ 17:00</span>

          <div class="flex items-center gap-2 mt-1">
            <svg
              class="w-9 h-9 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="#F8F8ED"
              />
            </svg>
            <div class="flex flex-col text-left">
              <span class="text-base font-medium leading-tight">関東学院大学</span>
              <span class="text-xl font-bold leading-tight">金沢八景キャンパス</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4 Layers of Green Hills & Sprout Leaves (bottom) -->
    <div class="absolute -bottom-[2px] left-0 w-full h-fit pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
      <!-- Hill -->
      <SvgWave class="w-full mt-10 transform translate-y-[1px]" preserveAspectRatio="none"></SvgWave>
      <div
      v-for="leaf in leaves"
      :key="leaf.id"
      class="absolute bottom-0 left-0 pointer-events-none"
      :style="{
        left: `${(leaf.left / 1920) * 100}%`,
        top: `${(leaf.top / 370) * 100}%`,
        width: `clamp(${leaf.width*1.2}px, ${(leaf.width / 1400) * 100}vw, ${leaf.width*2}px)`,
        height: `${(leaf.height /240) * 100}%`,
      }"
    >
      <SvgLeafIcon
        :name="leaf.name"
        class="w-full h-full drop-shadow-sm"
      />
    </div>
    </div>
  </section>
</template>

<style scoped>
.leaves-hill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.leaves-hill :deep(.sprout-leaf-svg) {
  position: absolute;
}
</style>



<script setup lang="ts">
// Top Section
</script>

<template>
  <section class="relative w-full min-h-[920px] bg-sprout-bg overflow-hidden flex flex-col justify-start items-center pt-10 lg:pt-16 pb-[240px] lg:pb-0">
    <!-- Top Geometric Border Decorations (Group 3: top-right) -->
    <div class="absolute pointer-events-none opacity-40 -top-40 -right-28 w-[650px] h-[650px] z-[1]" aria-hidden="true">
      <div class="box-border absolute border border-sprout-border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px]"></div>
      <div class="box-border absolute border border-sprout-border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"></div>
      <div class="box-border absolute border border-sprout-border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px]"></div>
    </div>

    <!-- Bottom Geometric Border Decorations (Group 2: bottom-left) -->
    <div class="absolute pointer-events-none opacity-40 top-[380px] -left-40 w-[680px] h-[680px] z-[1]" aria-hidden="true">
      <div class="box-border absolute border border-sprout-border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px]"></div>
      <div class="box-border absolute border border-sprout-border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[630px] h-[630px]"></div>
      <div class="box-border absolute border border-sprout-border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px]"></div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-[1600px] px-6 lg:px-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
      <!-- Title Block (left: 163px, top: 288px) -->
      <div class="flex-1 max-w-[824px] text-center lg:text-left">
        <div class="flex items-center justify-center lg:justify-start gap-6 font-sans font-bold text-2xl lg:text-[32px] leading-tight text-sprout-title mb-2">
          <span>第77回</span>
          <span>『SPROUT』</span>
        </div>
        <h1 class="font-sans font-bold text-[48px] sm:text-[64px] lg:text-[96px] leading-[1.15] text-sprout-title m-0 tracking-tight">
          平潟祭 2026
        </h1>
        <!-- Ornament Line -->
        <UiOrnamentLine color="#42845A" max-width="100%" />

        <!-- Tagline & Quick CTA -->
        <div class="mt-6">
          <UiCountdownTimer target-date="2026-10-31T10:00:00" class="mb-5" />
          <div class="flex gap-4 flex-wrap justify-center lg:justify-start">
            <NuxtLink to="/events" class="btn btn-primary">企画を探す 🎪</NuxtLink>
            <NuxtLink to="/schedule" class="btn btn-secondary">タイムテーブル 📅</NuxtLink>
            <NuxtLink to="/map" class="btn btn-secondary">場内マップ 🗺️</NuxtLink>
          </div>
        </div>
      </div>

      <!-- Date & Badge Block (Group 1: right side) -->
      <div class="shrink-0 w-[320px] sm:w-[440px] lg:w-[540px] h-[320px] sm:h-[440px] lg:h-[540px] relative flex items-center justify-center">
        <div class="relative w-[500px] h-[500px] flex items-center justify-center scale-[0.68] sm:scale-[0.85] lg:scale-100 transition-transform">
          <!-- Polygon 1 -->
          <div class="absolute box-border w-[480px] h-[480px] border-[1.5px] border-sprout-border -rotate-[22.5deg]"></div>
          <!-- Polygon 2 -->
          <div class="absolute box-border w-[440px] h-[440px] border-[1.5px] border-sprout-border"></div>
          <!-- Polygon 3 (Fill) -->
          <div class="absolute box-border w-[410px] h-[410px] bg-sprout-light -rotate-[22.5deg] shadow-[0_12px_36px_rgba(67,124,98,0.25)]"></div>
          <!-- Polygon 4 (Inner Border) -->
          <div class="absolute box-border w-[396px] h-[396px] border-[3px] border-sprout-border-light -rotate-[22.5deg]"></div>

          <!-- Inside Badge Content -->
          <div class="relative z-10 flex flex-col items-center justify-center text-center text-sprout-bg font-sans select-none">
            <span class="text-[32px] font-bold text-sprout-bg leading-tight mb-0.5">2026</span>
            <div class="text-[44px] lg:text-[54px] font-bold text-white leading-tight drop-shadow-[0_4px_4px_rgba(92,92,92,0.25)] flex items-center gap-3">
              <span>10/31</span>
              <span>11/1</span>
            </div>
            <div class="w-8 h-0 border-t-2 border-sprout-bg my-1.5"></div>
            <span class="text-[28px] font-bold text-sprout-bg leading-tight mb-2">10:00 ~ 17:00</span>

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
                <span class="text-base font-medium text-sprout-bg leading-tight">関東学院大学</span>
                <span class="text-xl font-bold text-sprout-bg leading-tight">金沢八景キャンパス</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4 Layers of Green Hills & Sprout Leaves (bottom) -->
    <div class="absolute bottom-0 left-0 w-full h-[280px] pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
      <!-- Hill 1 (Back, #B9DD7B) -->
      <div class="absolute bottom-0 left-0 w-full h-[260px] z-[1]">
        <svg class="w-full h-full block" viewBox="0 0 1920 180" preserveAspectRatio="none">
          <path d="M0,70 Q480,10 960,50 T1920,30 L1920,180 L0,180 Z" fill="#B9DD7B" />
        </svg>
        <div class="leaves-hill">
          <UiSproutLeaf style="left: 26%; top: 38px;" stem-color="#9AC467" leaf-left-color="#DFF794" leaf-right-color="#B9DD7B" :width="38" :height="56" />
          <UiSproutLeaf style="left: 40%; top: 22px;" stem-color="#9AC467" leaf-left-color="#DFF794" leaf-right-color="#B9DD7B" :width="34" :height="52" />
          <UiSproutLeaf style="left: 71%; top: 40px;" stem-color="#9AC467" leaf-left-color="#B9DD7B" leaf-right-color="#9AC467" :width="30" :height="48" />
          <UiSproutLeaf style="left: 95%; top: 30px;" stem-color="#9AC467" leaf-left-color="#DFF794" leaf-right-color="#9AC467" :width="32" :height="50" />
        </div>
      </div>

      <!-- Hill 2 (#88BD76) -->
      <div class="absolute bottom-0 left-0 w-full h-[200px] z-[2]">
        <svg class="w-full h-full block" viewBox="0 0 1920 160" preserveAspectRatio="none">
          <path d="M0,80 Q520,130 1100,60 T1920,70 L1920,160 L0,160 Z" fill="#88BD76" />
        </svg>
        <div class="leaves-hill">
          <UiSproutLeaf style="left: 10%; top: 45px;" stem-color="#69A362" leaf-left-color="#AED690" leaf-right-color="#88BD76" :width="36" :height="54" />
          <UiSproutLeaf style="left: 23%; top: 55px;" stem-color="#69A362" leaf-left-color="#88BD76" leaf-right-color="#88BD76" :width="28" :height="46" />
          <UiSproutLeaf style="left: 63%; top: 35px;" stem-color="#69A362" leaf-left-color="#88BD76" leaf-right-color="#88BD76" :width="30" :height="48" />
          <UiSproutLeaf style="left: 79%; top: 48px;" stem-color="#69A362" leaf-left-color="#AED690" leaf-right-color="#88BD76" :width="34" :height="52" />
          <UiSproutLeaf style="left: 92%; top: 42px;" stem-color="#69A362" leaf-left-color="#88BD76" leaf-right-color="#88BD76" :width="26" :height="44" />
        </div>
      </div>

      <!-- Hill 3 (#619D6E) -->
      <div class="absolute bottom-0 left-0 w-full h-[150px] z-[3]">
        <svg class="w-full h-full block" viewBox="0 0 1920 140" preserveAspectRatio="none">
          <path d="M0,60 Q600,10 1200,70 T1920,50 L1920,140 L0,140 Z" fill="#619D6E" />
        </svg>
        <div class="leaves-hill">
          <UiSproutLeaf style="left: 6%; top: 38px;" stem-color="#42845A" leaf-left-color="#619D6E" leaf-right-color="#87B787" :width="30" :height="50" />
          <UiSproutLeaf style="left: 15%; top: 32px;" stem-color="#42845A" leaf-left-color="#87B787" leaf-right-color="#619D6E" :width="38" :height="58" />
          <UiSproutLeaf style="left: 46%; top: 45px;" stem-color="#42845A" leaf-left-color="#619D6E" leaf-right-color="#619D6E" :width="28" :height="48" />
          <UiSproutLeaf style="left: 85%; top: 35px;" stem-color="#42845A" leaf-left-color="#87B787" leaf-right-color="#619D6E" :width="36" :height="54" />
          <UiSproutLeaf style="left: 91%; top: 42px;" stem-color="#42845A" leaf-left-color="#619D6E" leaf-right-color="#619D6E" :width="26" :height="44" />
        </div>
      </div>

      <!-- Hill 4 (Front, #437C62) -->
      <div class="absolute bottom-0 left-0 w-full h-[100px] z-[4]">
        <svg class="w-full h-full block" viewBox="0 0 1920 120" preserveAspectRatio="none">
          <path d="M0,45 Q700,90 1350,30 T1920,40 L1920,120 L0,120 Z" fill="#437C62" />
        </svg>
        <div class="leaves-hill">
          <UiSproutLeaf style="left: 2%; top: 25px;" stem-color="#24624E" leaf-left-color="#69957B" leaf-right-color="#437C62" :width="44" :height="68" />
          <UiSproutLeaf style="left: 33%; top: 35px;" stem-color="#24624E" leaf-left-color="#437C62" leaf-right-color="#437C62" :width="32" :height="54" />
          <UiSproutLeaf style="left: 44%; top: 20px;" stem-color="#24624E" leaf-left-color="#437C62" leaf-right-color="#437C62" :width="36" :height="60" />
          <UiSproutLeaf style="left: 66%; top: 28px;" stem-color="#24624E" leaf-left-color="#69957B" leaf-right-color="#437C62" :width="40" :height="62" />
          <UiSproutLeaf style="left: 82%; top: 32px;" stem-color="#24624E" leaf-left-color="#69957B" leaf-right-color="#437C62" :width="34" :height="52" />
          <UiSproutLeaf style="left: 97%; top: 22px;" stem-color="#24624E" leaf-left-color="#69957B" leaf-right-color="#24624E" :width="42" :height="66" />
        </div>
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



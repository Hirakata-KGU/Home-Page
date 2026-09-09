<script setup lang="ts">
// Figma design: Top Section
</script>

<template>
  <section class="figma-top-hero">
    <!-- Top Geometric Border Decorations (Group 3: top-right) -->
    <div class="deco-group group-top-right" aria-hidden="true">
      <div class="deco-polygon poly-1"></div>
      <div class="deco-polygon poly-2"></div>
      <div class="deco-polygon poly-3"></div>
    </div>

    <!-- Bottom Geometric Border Decorations (Group 2: bottom-left) -->
    <div class="deco-group group-bottom-left" aria-hidden="true">
      <div class="deco-polygon poly-1"></div>
      <div class="deco-polygon poly-2"></div>
      <div class="deco-polygon poly-3"></div>
    </div>

    <!-- Main Container -->
    <div class="hero-container">
      <!-- Title Block (left: 163px, top: 288px) -->
      <div class="title-block">
        <div class="title-sub-row">
          <span class="edition-text">第77回</span>
          <span class="theme-text">『SPROUT』</span>
        </div>
        <h1 class="main-title">平潟祭 2026</h1>
        <!-- Figma Line -->
        <UiFigmaLine color="#42845A" max-width="100%" />

        <!-- Tagline & Quick CTA -->
        <div class="hero-actions">
          <UiCountdownTimer target-date="2026-10-31T10:00:00" class="hero-countdown" />
          <div class="cta-row">
            <NuxtLink to="/events" class="btn btn-primary">企画を探す 🎪</NuxtLink>
            <NuxtLink to="/schedule" class="btn btn-secondary">タイムテーブル 📅</NuxtLink>
            <NuxtLink to="/map" class="btn btn-secondary">場内マップ 🗺️</NuxtLink>
          </div>
        </div>
      </div>

      <!-- Date & Badge Block (Group 1: right side) -->
      <div class="badge-block">
        <div class="polygon-stack">
          <div class="badge-poly poly-outer-1"></div>
          <div class="badge-poly poly-outer-2"></div>
          <div class="badge-poly poly-fill-3"></div>
          <div class="badge-poly poly-inner-4"></div>

          <!-- Inside Badge Content -->
          <div class="badge-content">
            <span class="badge-year">2026</span>
            <div class="badge-date">
              <span>10/31</span>
              <span class="date-sep"></span>
              <span>11/1</span>
            </div>
            <div class="badge-arrow"></div>
            <span class="badge-time">10:00 ~ 17:00</span>

            <div class="badge-location">
              <svg
                class="location-pin"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                  fill="#F8F8ED"
                />
              </svg>
              <div class="loc-text">
                <span class="univ-name">関東学院大学</span>
                <span class="campus-name">金沢八景キャンパス</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4 Layers of Green Hills & Sprout Leaves (bottom) -->
    <div class="hills-container" aria-hidden="true">
      <!-- Hill 1 (Back, #B9DD7B) -->
      <div class="hill-layer hill-1">
        <svg class="hill-svg" viewBox="0 0 1920 180" preserveAspectRatio="none">
          <path d="M0,70 Q480,10 960,50 T1920,30 L1920,180 L0,180 Z" fill="#B9DD7B" />
        </svg>
        <div class="leaves-hill leaves-hill-1">
          <UiSproutLeaf style="left: 26%; top: 38px;" stem-color="#9AC467" leaf-left-color="#DFF794" leaf-right-color="#B9DD7B" :width="38" :height="56" />
          <UiSproutLeaf style="left: 40%; top: 22px;" stem-color="#9AC467" leaf-left-color="#DFF794" leaf-right-color="#B9DD7B" :width="34" :height="52" />
          <UiSproutLeaf style="left: 71%; top: 40px;" stem-color="#9AC467" leaf-left-color="#B9DD7B" leaf-right-color="#9AC467" :width="30" :height="48" />
          <UiSproutLeaf style="left: 95%; top: 30px;" stem-color="#9AC467" leaf-left-color="#DFF794" leaf-right-color="#9AC467" :width="32" :height="50" />
        </div>
      </div>

      <!-- Hill 2 (#88BD76) -->
      <div class="hill-layer hill-2">
        <svg class="hill-svg" viewBox="0 0 1920 160" preserveAspectRatio="none">
          <path d="M0,80 Q520,130 1100,60 T1920,70 L1920,160 L0,160 Z" fill="#88BD76" />
        </svg>
        <div class="leaves-hill leaves-hill-2">
          <UiSproutLeaf style="left: 10%; top: 45px;" stem-color="#69A362" leaf-left-color="#AED690" leaf-right-color="#88BD76" :width="36" :height="54" />
          <UiSproutLeaf style="left: 23%; top: 55px;" stem-color="#69A362" leaf-left-color="#88BD76" leaf-right-color="#88BD76" :width="28" :height="46" />
          <UiSproutLeaf style="left: 63%; top: 35px;" stem-color="#69A362" leaf-left-color="#88BD76" leaf-right-color="#88BD76" :width="30" :height="48" />
          <UiSproutLeaf style="left: 79%; top: 48px;" stem-color="#69A362" leaf-left-color="#AED690" leaf-right-color="#88BD76" :width="34" :height="52" />
          <UiSproutLeaf style="left: 92%; top: 42px;" stem-color="#69A362" leaf-left-color="#88BD76" leaf-right-color="#88BD76" :width="26" :height="44" />
        </div>
      </div>

      <!-- Hill 3 (#619D6E) -->
      <div class="hill-layer hill-3">
        <svg class="hill-svg" viewBox="0 0 1920 140" preserveAspectRatio="none">
          <path d="M0,60 Q600,10 1200,70 T1920,50 L1920,140 L0,140 Z" fill="#619D6E" />
        </svg>
        <div class="leaves-hill leaves-hill-3">
          <UiSproutLeaf style="left: 6%; top: 38px;" stem-color="#42845A" leaf-left-color="#619D6E" leaf-right-color="#87B787" :width="30" :height="50" />
          <UiSproutLeaf style="left: 15%; top: 32px;" stem-color="#42845A" leaf-left-color="#87B787" leaf-right-color="#619D6E" :width="38" :height="58" />
          <UiSproutLeaf style="left: 46%; top: 45px;" stem-color="#42845A" leaf-left-color="#619D6E" leaf-right-color="#619D6E" :width="28" :height="48" />
          <UiSproutLeaf style="left: 85%; top: 35px;" stem-color="#42845A" leaf-left-color="#87B787" leaf-right-color="#619D6E" :width="36" :height="54" />
          <UiSproutLeaf style="left: 91%; top: 42px;" stem-color="#42845A" leaf-left-color="#619D6E" leaf-right-color="#619D6E" :width="26" :height="44" />
        </div>
      </div>

      <!-- Hill 4 (Front, #437C62) -->
      <div class="hill-layer hill-4">
        <svg class="hill-svg" viewBox="0 0 1920 120" preserveAspectRatio="none">
          <path d="M0,45 Q700,90 1350,30 T1920,40 L1920,120 L0,120 Z" fill="#437C62" />
        </svg>
        <div class="leaves-hill leaves-hill-4">
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
.figma-top-hero {
  position: relative;
  width: 100%;
  min-height: 920px;
  background: var(--figma-bg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 60px;
}

/* Background Geometric Frames */
.deco-group {
  position: absolute;
  pointer-events: none;
  opacity: 0.45;
  z-index: 1;
}

.group-top-right {
  top: -160px;
  right: -120px;
  width: 650px;
  height: 650px;
}

.group-bottom-left {
  top: 380px;
  left: -160px;
  width: 680px;
  height: 680px;
}

.deco-polygon {
  box-sizing: border-box;
  position: absolute;
  border: 1px solid var(--figma-border);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.group-top-right .poly-1 { width: 650px; height: 650px; }
.group-top-right .poly-2 { width: 600px; height: 600px; }
.group-top-right .poly-3 { width: 550px; height: 550px; }

.group-bottom-left .poly-1 { width: 680px; height: 680px; }
.group-bottom-left .poly-2 { width: 630px; height: 630px; }
.group-bottom-left .poly-3 { width: 580px; height: 580px; }

/* Main Content Layout */
.hero-container {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 1600px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

/* Title Block */
.title-block {
  flex: 1;
  max-width: 824px;
  text-align: left;
}

.title-sub-row {
  display: flex;
  align-items: center;
  gap: 24px;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: var(--figma-title);
  margin-bottom: 8px;
}

.main-title {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: clamp(48px, 6vw, 96px);
  line-height: 1.15;
  color: var(--figma-title);
  margin: 0;
  letter-spacing: -1px;
}

.hero-actions {
  margin-top: 24px;
}

.hero-countdown {
  margin-bottom: 20px;
}

.cta-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* Badge Block */
.badge-block {
  flex-shrink: 0;
  width: 540px;
  height: 540px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.polygon-stack {
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-poly {
  position: absolute;
  box-sizing: border-box;
}

.poly-outer-1 {
  width: 480px;
  height: 480px;
  border: 1.5px solid var(--figma-border);
  transform: rotate(-22.5deg);
}

.poly-outer-2 {
  width: 440px;
  height: 440px;
  border: 1.5px solid var(--figma-border);
}

.poly-fill-3 {
  width: 410px;
  height: 410px;
  background: var(--figma-sprout-1);
  transform: rotate(-22.5deg);
  box-shadow: 0 12px 36px rgba(67, 124, 98, 0.25);
}

.poly-inner-4 {
  width: 396px;
  height: 396px;
  border: 3px solid var(--figma-border-light);
  transform: rotate(-22.5deg);
}

/* Content inside rotating stack */
.badge-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--figma-bg);
  font-family: 'Noto Sans JP', sans-serif;
  user-select: none;
}

.badge-year {
  font-size: 32px;
  font-weight: 700;
  color: var(--figma-bg);
  line-height: 1.1;
  margin-bottom: 2px;
}

.badge-date {
  font-size: clamp(38px, 4vw, 54px);
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.15;
  text-shadow: 0px 4px 4px rgba(92, 92, 92, 0.25);
  display: flex;
  align-items: center;
  gap: 12px;
}

.badge-arrow {
  width: 32px;
  height: 0;
  border-top: 2px solid var(--figma-bg);
  margin: 6px 0;
}

.badge-time {
  font-size: 28px;
  font-weight: 700;
  color: var(--figma-bg);
  line-height: 1.2;
  margin-bottom: 8px;
}

.badge-location {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.location-pin {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.loc-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.univ-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--figma-bg);
  line-height: 1.2;
}

.campus-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--figma-bg);
  line-height: 1.2;
}

/* 4 Layers of Hills */
.hills-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 280px;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.hill-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.hill-svg {
  display: block;
  width: 100%;
  height: 100%;
}

.hill-1 { height: 260px; z-index: 1; }
.hill-2 { height: 200px; z-index: 2; }
.hill-3 { height: 150px; z-index: 3; }
.hill-4 { height: 100px; z-index: 4; }

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

/* Responsive */
@media (max-width: 1200px) {
  .hero-container {
    flex-direction: column-reverse;
    text-align: center;
    gap: 32px;
    padding-top: 20px;
  }

  .title-block {
    text-align: center;
  }

  .title-sub-row {
    justify-content: center;
    font-size: 24px;
  }

  .cta-row {
    justify-content: center;
  }

  .badge-block {
    width: 440px;
    height: 440px;
  }

  .polygon-stack {
    width: 420px;
    height: 420px;
    transform: scale(0.85);
  }

  .figma-top-hero {
    min-height: auto;
    padding-bottom: 240px;
  }
}

@media (max-width: 600px) {
  .polygon-stack {
    transform: scale(0.68);
  }

  .badge-block {
    width: 320px;
    height: 320px;
  }

  .title-sub-row {
    font-size: 18px;
    gap: 12px;
  }

  .figma-top-hero {
    padding-top: 30px;
    padding-bottom: 200px;
  }
}
</style>


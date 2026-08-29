<template>
  <div class="site-wrapper">
    <NuxtRouteAnnouncer />
    <LayoutTheHeader />
    <LayoutNoticeBanner />
    <main class="site-main">
      <slot />
    </main>
    <LayoutTheFooter />
  </div>
</template>

<style scoped>
.site-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-main {
  flex: 1;
}
</style>

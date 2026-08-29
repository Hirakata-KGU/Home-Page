<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    <LayoutTheHeader />
    <LayoutNoticeBanner />
    <NuxtPage />
    <LayoutTheFooter />
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

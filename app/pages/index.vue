<template>
  <div>
    <!-- Hero Section -->
    <SectionsHeroSection />

    <!-- Main Content -->
    <main>
      <div class="main-grid">
        <!-- About Section -->
        <SectionsAboutSection />

        <!-- Events Section -->
        <SectionsEventsSection />

        <!-- Schedule Section -->
        <SectionsScheduleSection />

        <!-- Access Section -->
        <SectionsAccessSection />

        <!-- Campus Map Section -->
        <SectionsCampusMapSection />

        <!-- Photo Gallery Section -->
        <SectionsGallerySection />

        <!-- SNS Section -->
        <SectionsSnsSection />
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  max-width: var(--max-width);
  margin: -60px auto 80px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (max-width: 768px) {
  main {
    margin-top: -40px;
  }
}
</style>

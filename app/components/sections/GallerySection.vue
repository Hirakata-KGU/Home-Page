<script setup lang="ts">
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400&q=70',
    alt: 'ライブステージの様子',
  },
  {
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=70',
    alt: '模擬店の賑わい',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=70',
    alt: '会場全景',
  },
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=70',
    alt: '音楽パフォーマンス',
  },
  {
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=400&q=70',
    alt: '来場者の笑顔',
  },
  {
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&q=70',
    alt: '夕暮れの会場',
  },
];
</script>

<template>
  <section class="section">
    <div class="section-header">
      <div class="section-icon">📸</div>
      <div class="section-title">
        <h2>過去の平潟祭</h2>
        <p>Photo Gallery</p>
      </div>
    </div>

    <div class="gallery-grid">
      <div
        v-for="(item, idx) in galleryImages"
        :key="idx"
        class="gallery-item"
      >
        <img :src="item.src" :alt="item.alt" loading="lazy" />
      </div>
    </div>

    <p class="gallery-caption">
      過去の平潟祭の様子です。2026年も皆様のご来場をお待ちしています！
    </p>
  </section>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-caption {
  text-align: center;
  margin-top: 24px;
  color: var(--muted);
}
</style>

<script setup lang="ts">
interface Breadcrumb {
  name: string;
  path?: string;
}

interface Props {
  title: string;
  subTitle: string;
  breadcrumbs?: Breadcrumb[];
  icon?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="page-header">
    <div class="container">
      <nav v-if="breadcrumbs && breadcrumbs.length" class="breadcrumb" aria-label="パンくずリスト">
        <NuxtLink to="/">ホーム</NuxtLink>
        <template v-for="(crumb, idx) in breadcrumbs" :key="idx">
          <span class="separator">/</span>
          <NuxtLink v-if="crumb.path" :to="crumb.path">{{ crumb.name }}</NuxtLink>
          <span v-else class="current">{{ crumb.name }}</span>
        </template>
      </nav>

      <div class="header-content">
        <span v-if="icon" class="header-icon">{{ icon }}</span>
        <div>
          <h1>{{ title }}</h1>
          <p class="subtitle">{{ subTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  background: linear-gradient(135deg, rgba(27, 94, 32, 0.96) 0%, rgba(46, 125, 50, 0.92) 100%);
  color: white;
  padding: 44px 0 60px;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top right, rgba(165, 214, 167, 0.3) 0%, transparent 60%),
    radial-gradient(circle at bottom left, rgba(251, 191, 36, 0.15) 0%, transparent 50%);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.breadcrumb a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: white;
  text-decoration: underline;
}

.separator {
  color: rgba(255, 255, 255, 0.4);
}

.current {
  color: var(--sun-gold-light);
  font-weight: 700;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 2;
}

.header-icon {
  font-size: 36px;
  width: 68px;
  height: 68px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

h1 {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 13px;
  color: var(--sun-gold-light);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .page-header {
    padding: 32px 0 48px;
  }

  h1 {
    font-size: 24px;
  }

  .header-icon {
    width: 52px;
    height: 52px;
    font-size: 26px;
  }
}
</style>

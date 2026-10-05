<script setup lang="ts">
import { computed } from 'vue';

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

const props = defineProps<Props>();
const route = useRoute();
const siteUrl = 'https://www.hirakatasai.net';

// パンくずリスト構造化データ（JSON-LD）
const breadcrumbLd = computed(() => {
  const itemList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: `${siteUrl}/`,
    },
  ];

  if (props.breadcrumbs && props.breadcrumbs.length > 0) {
    props.breadcrumbs.forEach((crumb, index) => {
      const crumbPath = crumb.path
        ? (crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`)
        : route.path;
      const cleanPath = crumbPath === '/' ? '' : crumbPath.replace(/\/$/, '');
      const itemUrl = `${siteUrl}${cleanPath || '/'}`;

      itemList.push({
        '@type': 'ListItem',
        position: index + 2,
        name: crumb.name,
        item: itemUrl,
      });
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
  };
});

useHead(() => {
  if (!props.breadcrumbs || props.breadcrumbs.length === 0) return {};
  return {
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbLd.value),
      },
    ],
  };
});
</script>

<template>
  <div class="w-full flex flex-col text-white relative">
    <div class="w-full flex flex-col bg-sprout-moss pt-5 px-5 items-center justify-center z-20">
      <div class="w-full max-w-[1136px] justify-start">
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
    <!-- 反転した4層の波 (rotate 180deg: 緑の四角の背面に潜り込ませて隙間線を防止) -->
    <div class="w-full h-[120px] leading-none -mt-7" aria-hidden="true">
      <SvgWave class="w-full rotate-180" preserveAspectRatio="none" />
    </div>
  </div>
</template>

<style scoped>
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
  color: #ffffff;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.breadcrumb a:hover {
  color: #f1f8f4;
  transform: translateY(-3px);
}

.separator {
  color: rgba(255, 255, 255, 0.7);
}

.current {
  color: #fffdaa;
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
  font-size: clamp(26px, 3.5vw, 36px);
  width: clamp(52px, 6.5vw, 68px);
  height: clamp(52px, 6.5vw, 68px);
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
  font-size: clamp(1.5rem, 3.2vw + 0.5rem, 2rem);
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 13px;
  color: #fffdaa;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
</style>

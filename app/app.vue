<script setup lang="ts">
import { computed } from 'vue';

const route = useRoute();
const siteUrl = 'https://www.hirakatasai.net';

// Canonical URL（末尾スラッシュの正規化）
const canonicalUrl = computed(() => {
  const cleanPath = route.path === '/' ? '' : route.path.replace(/\/$/, '');
  return `${siteUrl}${cleanPath || '/'}`;
});

// Googleサイトリンク候補として評価される主要ナビゲーション要素（JSON-LD）
const siteNavigationLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': '主要ナビゲーション',
  'itemListElement': [
    {
      '@type': 'SiteNavigationElement',
      'position': 1,
      'name': '企画一覧',
      'description': '模擬店、ステージパフォーマンス、展示などの企画一覧',
      'url': `${siteUrl}/events`,
    },
    {
      '@type': 'SiteNavigationElement',
      'position': 2,
      'name': 'タイムテーブル',
      'description': '各会場・ステージのタイムスケジュール',
      'url': `${siteUrl}/schedule`,
    },
    {
      '@type': 'SiteNavigationElement',
      'position': 3,
      'name': '場内マップ',
      'description': 'キャンパス全体マップおよび各号館の配置図',
      'url': `${siteUrl}/map`,
    },
    {
      '@type': 'SiteNavigationElement',
      'position': 4,
      'name': '平潟祭について',
      'description': '第77回 平潟祭の開催概要と委員長挨拶',
      'url': `${siteUrl}/info/about`,
    },
    {
      '@type': 'SiteNavigationElement',
      'position': 5,
      'name': '電子パンフレット',
      'description': '学園祭公式電子パンフレット',
      'url': `${siteUrl}/info/pamphlet`,
    },
    {
      '@type': 'SiteNavigationElement',
      'position': 6,
      'name': 'よくある質問',
      'description': '来場者向けFAQ・よくあるご質問',
      'url': `${siteUrl}/info/faq`,
    },
  ],
};

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(siteNavigationLd),
    },
  ],
}));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

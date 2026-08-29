// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      title: '平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '2026年10月31日(土)・11月1日(日)開催！関東学院大学 金沢八景キャンパスの学園祭「平潟祭」公式サイト。音楽ライブ、模擬店、展示、ステージパフォーマンスなど盛りだくさん。',
        },
        { property: 'og:title', content: '平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭' },
        {
          property: 'og:description',
          content: '2026年10月31日(土)・11月1日(日)開催！関東学院大学 金沢八景キャンパスの学園祭「平潟祭」公式サイト。',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.hirakatasai.net/' },
        { property: 'og:image', content: 'https://www.hirakatasai.net/images/hirakata-logo.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@shin_hirakata' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700;900&display=swap',
        },
      ],
    },
  },

  css: [
    '~/assets/css/variables.css',
    '~/assets/css/main.css',
  ],

  nitro: {
    preset: 'github-pages',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
})

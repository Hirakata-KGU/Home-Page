// https://nuxt.com/docs/api/configuration/nuxt-config
import { process } from 'std-env'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', './modules/festival-data', '@nuxt/image', '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Noto+Sans+JP': [400, 700],
      'Noto+Serif+JP': [700],
    },
    display: 'swap',
    download: true,
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
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
        // ファビコン・アプリアイコン
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  image: {
    format: ['webp'],
    quality: 80,
  },

  css: [
    '~/assets/css/variables.css',
    '~/assets/css/main.css',
  ],

  nitro: { //Nuxtを動かすサーバーエンジン 静的サイトの出力も行う
    preset: 'github-pages',
    prerender: {
      crawlLinks: true, // "/"から始まり、リンク先として見つかったページを芋づる式にすべて静的 HTML として書き出す
    },
  },
})
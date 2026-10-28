<script setup lang="ts">

useSeoMeta({
  title: 'ご協賛一覧｜平潟祭 2026',
  ogTitle: 'ご協賛一覧｜平潟祭 2026',
  description: '平潟祭2026にご協賛いただいている企業・団体の皆様をご紹介します。',
  ogDescription: '平潟祭2026にご協賛いただいている企業・団体の皆様をご紹介します。',
  ogUrl: 'https://www.hirakatasai.net/info/sponsors',
});

interface Sponsor {
  id: string;
  name: string;
  logo?: string;
  url?: string;
};

const sponsors: Sponsor[] = [
  { id: 'docomo-cs', name: '株式会社ドコモCS' },
  { id: 'kg-church', name: '関東学院教会' },
  { id: 'aututu-myanmar', name: 'アウトゥトゥミャンマー支援' },
  { id: 'kyoei', name: '株式会社キョウエイ' },
  { id: 'otsuka-shokai', name: '株式会社大塚商会' },
  { id: 'kanto-gakuin-service', name: '関学サービス' },
  { id: 'seven-eleven-kgu', name: 'セブンイレブン 関東学院大学店' },
  { id: 'kanagawa-driving-school', name: '神奈川ドライビングスクール' },
  { id: 'suntory-beverage-solution', name: 'サントリービバレッジソリューション株式会社' },
  { id: 'kaikatsu-frontier', name: '株式会社快活フロンティア' },
  { id: 'able', name: '株式会社エイブル' },
  { id: 'show-shukatsu', name: 'SHOW就活株式会社' },
];

const baseURL = useRuntimeConfig().app.baseURL.replace(/\/$/, '');
const pamphletSponsorsUrl = `${baseURL}/hirakatasai2026-pamphlet.pdf#page=15`;

</script>

<template>
  <div class="min-h-screen bg-sprout-bg">
    <!-- Page Header -->
    <LayoutPageHeader
      title="ご協賛一覧"
      sub-title="Sponsors"
      :breadcrumbs="[{ name: 'ご協賛一覧' }]"
    />

    <!-- 他ページ（FAQ・about・contact）と共通の最大幅 1200px コンテナ -->
    <main class="max-w-[1200px] mx-auto px-6 -mt-8 mb-20 relative z-10 flex flex-col gap-8">
      <div class="bg-white rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] shadow-sm border border-sprout-border/20">
        <!-- 謝辞メッセージ -->
        <div class="text-center mb-8">
          <h2 class="text-xl sm:text-2xl font-bold text-sprout-title mb-3">
            ご協賛企業・団体
          </h2>
          <p class="text-sm sm:text-base text-text-main leading-relaxed max-w-[680px] mx-auto mb-2">
            第77回 平潟祭の開催にあたり、多大なるご支援・ご協賛を賜りました企業・団体の皆様に、心より深く御礼申し上げます。
          </p>
          <p class="text-xs text-text-muted m-0">
            （敬称略・順不同）
          </p>
        </div>

        <div class="w-full h-px bg-sprout-border/20 mb-8"></div>

        <!-- 名前だけの羅列（四角・カード・ホバーなし） -->
        <div class="max-w-[1040px] mx-auto">
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 list-none p-0 m-0">
            <li
              v-for="sponsor in sponsors"
              :key="sponsor.id"
              class="text-sprout-dark font-medium text-[15px] sm:text-[16px] leading-relaxed flex items-start gap-2.5"
            >
              <span class="text-sprout-border select-none text-[18px] leading-none shrink-0 mt-0.5">・</span>
              <span class="break-words">{{ sponsor.name }}</span>
            </li>
          </ul>
        </div>

        <div class="w-full h-px bg-sprout-border/20 mt-10 mb-8"></div>

        <!-- 電子パンフレット協賛紹介ページ導線 -->
        <div class="mb-8 text-center">
          <NuxtLink
            :to="pamphletSponsorsUrl"
            external
            class="pamphlet-link-badge"
          >
            電子パンフレットで協賛企業ご紹介を見る →
          </NuxtLink>
        </div>

        <!-- お問い合わせ導線 -->
        <div class="text-center flex flex-col items-center gap-3">
          <p class="text-xs sm:text-sm text-text-muted m-0">
            ご協賛に関するお問い合わせは、お問い合わせ窓口よりお願いいたします。
          </p>
          <NuxtLink
            to="/info/contact"
            class="inline-flex justify-center items-center px-6 py-2.5 bg-sprout-border hover:bg-[#356b48] text-white font-bold rounded-full no-underline text-sm shadow-sm transition-colors"
          >
            お問い合わせはこちら
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.pamphlet-link-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--olive, #2f5b34);
  text-decoration: none;
  padding: 8px 20px;
  border-radius: 20px;
  border: 1px solid rgba(47, 91, 52, 0.3);
  background: #f7faf7;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.pamphlet-link-badge:hover {
  background: var(--olive, #2f5b34);
  color: white;
  border-color: var(--olive, #2f5b34);
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(47, 91, 52, 0.2);
}
</style>

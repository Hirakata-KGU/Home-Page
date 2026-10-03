<script setup lang="ts">
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import ChickSvg from '~/components/map/chick.vue';

useSeoMeta({
  title: '第77回 平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭 公式サイト',
  ogTitle: '第77回 平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭 公式サイト',
  description: '2026年10月31日(土)・11月1日(日)開催！第77回 平潟祭 『SPROUT』 関東学院大学 金沢八景キャンパスの学園祭公式サイト。音楽ライブ、模擬店、展示、ステージパフォーマンスなど多数開催。',
  ogDescription: '2026年10月31日(土)・11月1日(日)開催！第77回 平潟祭 『SPROUT』 関東学院大学 金沢八景キャンパスの学園祭公式サイト。音楽ライブ、模擬店、展示、ステージパフォーマンスなど多数開催。',
  ogUrl: 'https://www.hirakatasai.net/',
});

// TOPページ専用の構造化データ（WebSite & Event）
const topStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.hirakatasai.net/#website',
      'url': 'https://www.hirakatasai.net/',
      'name': '第77回 平潟祭 2026',
      'alternateName': ['平潟祭', '平潟祭 2026', 'Hirakata Festival', '関東学院大学 平潟祭'],
      'description': '関東学院大学 金沢八景キャンパスの学園祭「平潟祭」公式サイト。',
      'inLanguage': 'ja',
    },
    {
      '@type': 'Event',
      '@id': 'https://www.hirakatasai.net/#event',
      'name': '第77回 平潟祭 『SPROUT』',
      'description': '2026年10月31日(土)・11月1日(日)開催！関東学院大学 金沢八景キャンパスの学園祭「平潟祭」。音楽ライブ、模擬店、展示、ステージパフォーマンスなど盛りだくさん。',
      'startDate': '2026-10-31T10:00:00+09:00',
      'endDate': '2026-11-01T18:00:00+09:00',
      'eventStatus': 'https://schema.org/EventScheduled',
      'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
      'location': {
        '@type': 'Place',
        'name': '関東学院大学 金沢八景キャンパス',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '金沢区六浦東1-50-1',
          'addressLocality': '横浜市',
          'addressRegion': '神奈川県',
          'postalCode': '236-8501',
          'addressCountry': 'JP',
        },
      },
      'image': 'https://www.hirakatasai.net/images/hirakata-logo.png',
      'organizer': {
        '@type': 'Organization',
        'name': '平潟祭実行委員会',
        'url': 'https://www.hirakatasai.net/',
      },
    },
  ],
};

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(topStructuredData),
    },
  ],
});

// 0. ヒーローセクション装飾データ
interface LeafItem {
  id: string;
  name: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
  left: number;   // X座標 (px)
  top: number;    // Y座標 (px)
  width: number;  // 横幅 (px)
  height: number; // 縦幅 (px)
}

const leaves: LeafItem[] = [
  // --- Hill 1 (最奥の丘) ---
  { id: 'leaf-0-11', name: 5, left: 1877, top: 50, width: 29.22, height: 56 },
  { id: 'leaf-0-8',  name: 12, left: 1370, top: 97, width: 23.2,  height: 58 },
  { id: 'leaf-0-4',  name: 3, left: 765,  top: 0,  width: 34.67, height: 52 },
  { id: 'leaf-0-3',  name: 8, left: 503,  top: 55, width: 40.0,  height: 60 },

  // --- Hill 2 ---
  { id: 'leaf-1-13', name: 6, left: 1837, top: 110, width: 15.14, height: 58 },
  { id: 'leaf-1-11', name: 14, left: 1511, top: 135, width: 34.42, height: 58 },
  { id: 'leaf-1-8',  name: 16, left: 1214, top: 84, width: 22.0,  height: 55 },
  { id: 'leaf-1-3',  name: 6, left: 434,  top: 125, width: 17.28, height: 58 },
  { id: 'leaf-1-1',  name: 3, left: 188,  top: 90, width: 36.42, height: 57 },

  // --- Hill 3 ---
  { id: 'leaf-2-14', name: 6,  left: 1756, top: 174, width: 14.0,  height: 67 },
  { id: 'leaf-2-13', name: 1,  left: 1642, top: 163, width: 38.67, height: 58 },
  { id: 'leaf-2-7',  name: 5,  left: 1007,  top: 205, width: 20.38, height: 63 },
  { id: 'leaf-2-2',  name: 3,  left: 293,  top: 120, width: 42.67, height: 64 },
  { id: 'leaf-2-1',  name: 14, left: 116,  top: 135, width: 27.45, height: 61 },

  // --- Hill 4 (最前面の丘) ---
  { id: 'leaf-3-13', name: 5, left: 1866, top: 200, width: 44.87, height: 86 },
  { id: 'leaf-3-11', name: 3, left: 1585, top: 255, width: 34.0,  height: 51 },
  { id: 'leaf-3-9',  name: 3, left: 1269, top: 230, width: 42.67, height: 64 },
  { id: 'leaf-3-6',  name: 11, left: 853,  top: 170, width: 36.8,  height: 92 },
  { id: 'leaf-3-4',  name: 6, left: 631,  top: 170, width: 24.21, height: 83 },
  { id: 'leaf-3-0',  name: 8, left: 47,   top: 225, width: 50.67, height: 76 },
];

// 1. 企画カードデータ（芸能ステージ・ステージパフォーマンス・模擬店グルメ・文化館展示の4つ）
interface FeaturedEventItem {
  id: string;
  title: string;
  badge: string;
  image: string;
  desc: string;
  to: string;
}

const featuredEvents: FeaturedEventItem[] = [
  {
    id: 'geino',
    title: '芸能ステージ',
    badge: 'SCC 4F ベンネットホール',
    image: '/images/events/celeb.png',
    desc: '宮世琉弥トークショー（全席指定・有料チケット制）',
    to: '/events/celeb',
  },
  {
    id: 'stage',
    title: 'ステージパフォーマンス',
    badge: '屋内 & 屋外ステージ',
    image: '/images/top/okugai-stage.jpg',
    desc: '屋内、屋外で共におこなわれるステージパフォーマンス。ダンス、バンド演奏、演劇など、学生たちの熱いパフォーマンスをお楽しみください！',
    to: '/events?category=music',
  },
  {
    id: 'food',
    title: '模擬店グルメ',
    badge: 'メインストリート',
    image: '/images/top/mogiten.jpg',
    desc: '各サークル・学科が趣向を凝らした焼きそば、焼き鳥、スイーツなど美味しい屋台が大集合！',
    to: '/events?category=food',
  },
  {
    id: 'culture',
    title: '文化館・展示',
    badge: '社会連携館・6号館・8号館',
    image: '/images/top/bunkakan.jpg',
    desc: '美術・写真展示、体験型ワークショップなど、学生たちの創造力が光る文化館展示をお楽しみください！',
    to: '/events?category=culture',
  },
];

// カルーセル状態管理（Swiper）
const activeIndex = ref(0);
let swiperInstance: SwiperClass | null = null;

const currentFeaturedEvent = computed(() => {
  return featuredEvents[activeIndex.value] || featuredEvents[0];
});

const onSwiper = (swiper: SwiperClass) => {
  swiperInstance = swiper;
};

const onSlideChange = (swiper: SwiperClass) => {
  activeIndex.value = swiper.realIndex;
};

// カードクリック時の処理
const handleCardClick = (index: number, to: string) => {
  if (activeIndex.value !== index) {
    swiperInstance?.slideTo(index);
  } else {
    navigateTo(to);
  }
};

const goToSlide = (index: number) => {
  swiperInstance?.slideTo(index);
};

// Google Maps 遅延ロード（初期化時の約400KiBのJS読み込みとリフローを完全防止）
const mapContainerRef = ref<HTMLElement | null>(null);
const isMapLoaded = ref(false);

const loadMap = () => {
  isMapLoaded.value = true;
};

const { stop: stopMapObserver } = useIntersectionObserver(
  mapContainerRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadMap();
      stopMapObserver();
    }
  },
  { rootMargin: '300px' }
);

// 2. ご案内カードデータ（電子パンフレット・平潟祭について・よくある質問）
interface GuideCardItem {
  id: string;
  title: string;
  to: string;
  image?: string; // 写真パス（指定時はNuxtImgで表示）
  isChick?: boolean; // chick.vueを使用
}

const guideItems: GuideCardItem[] = [
  {
    id: 'pamphlet',
    title: '電子パンフレット',
    to: '/info/pamphlet',
    image: '', // 写真未定：後日画像パス（例: '/images/pamphlet.jpg'）を指定すれば即時反映
  },
  {
    id: 'about',
    title: '平潟祭について',
    to: '/info/about',
    image: '/images/2025/S__41058357_0.jpg',
  },
  {
    id: 'faq',
    title: 'よくある質問',
    to: '/info/faq',
    isChick: true,
  },
];

// 3. ご来場にあたって
const visitorGuidelines = [
  {
    title: '入場無料・事前予約不要',
    desc: '平潟祭はどなたでも自由にご入場いただけます。地域の皆さま、受験生、卒業生の方々もぜひお越しください。',
  },
  {
    title: '公共交通機関のご利用',
    desc: '来場者用駐車場はございません。京急線「金沢八景駅」またはシーサイドラインからの徒歩・バスをご利用ください。',
  },
  {
    title: '本部テント',
    desc: '正門付近に本部テントを設置しております。落とし物や迷子、体調不良の際はお気軽にお声がけください。',
  },
  {
    title : '模擬店のお支払方法',
    desc : '模擬店では、現金とd払いのみご利用いただけます。その他電子マネーやクレジットカードはご利用いただけませんので、あらかじめご了承ください。',
  }
];
</script>

<template>
  <div class="flex flex-col items-center p-0 relative w-full bg-sprout-bg overflow-x-hidden">
    <!-- 1. Top (Hero Section) -->
    <section class="relative w-full min-h-fit h-auto lg:h-[calc(100vh-80px)] max-h-[1200px] bg-sprout-bg overflow-hidden flex flex-col justify-center items-center">
      <!-- Top Geometric Border Decorations (Group 3: top-right) -->
      <div
        class="absolute pointer-events-none z-[1] -top-24 -right-20 w-[340px] h-[340px] opacity-25 sm:-top-32 sm:-right-24 sm:w-[480px] sm:h-[480px] sm:opacity-35 lg:-top-40 lg:-right-28 lg:w-[650px] lg:h-[650px] lg:opacity-40 transition-all duration-300"
        aria-hidden="true"
      >
        <div
          v-for="scale in [1, 0.92, 0.84]"
          :key="scale"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          :style="{ width: `${scale * 100}%`, height: `${scale * 100}%` }"
        >
          <Svg8 class="w-full h-full"></Svg8>
        </div>
      </div>

      <!-- Bottom Geometric Border Decorations (Group 2: bottom-left) -->
      <div
        class="absolute pointer-events-none z-[1] -bottom-24 -left-24 w-[360px] h-[360px] opacity-25 sm:-bottom-36 sm:-left-32 sm:w-[500px] sm:h-[500px] sm:opacity-35 lg:bottom-[-200px] lg:-left-40 lg:w-[680px] lg:h-[680px] lg:opacity-40 transition-all duration-300"
        aria-hidden="true"
      >
        <div
          v-for="scale in [1, 0.92, 0.84]"
          :key="scale"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          :style="{ width: `${scale * 100}%`, height: `${scale * 100}%` }"
        >
          <Svg8 class="w-full h-full"></Svg8>
        </div>
      </div>

      <!-- Main Container -->
      <div class="relative z-10 w-full h-fit max-w-[1600px] px-6 lg:px-10 flex flex-col lg:flex-row pt-20 lg:pt-0 items-center justify-around pb-[300px] lg:pb-[150px]">
        <!-- Title Block (left: 163px, top: 288px) -->
        <div class="flex-1 max-w-[824px] text-center lg:text-left">
          <div class="flex items-end justify-center gap-6 font-sans font-bold text-[clamp(1rem,1.8vw,2rem)] leading-tight text-sprout-title mb-2">
            <span>第77回</span>
            <h1 class="font-sans font-bold text-fluid-hero leading-[1.15] text-sprout-title m-0 tracking-tight">
            平潟祭 2026
            </h1>
          </div>

          <!-- Ornament Line -->
          <UiOrnamentLine color="#42845A" max-width="100%" />

          <!-- Tagline & Quick CTA -->
          <div class="mt-6">
            <UiCountdownTimer target-date="2026-10-31T10:00:00" class="mb-5 w-full" />
          </div>
        </div>

        <!-- Date & Badge Block (Group 1: right side) -->
        <div class="relative w-[calc(480px*0.62)] h-[calc(480px*0.62)] flex items-center justify-center scale-[0.62] min-[380px]:w-[calc(480px*0.68)] min-[380px]:h-[calc(480px*0.68)] min-[380px]:scale-[0.68] sm:w-[calc(480px*0.85)] sm:h-[calc(480px*0.85)] sm:scale-[0.85] lg:w-[calc(480px*0.9)] lg:h-[calc(480px*0.9)] lg:scale-[0.9] xl:w-[480px] xl:h-[480px] xl:scale-100 transition-transform">
          <!-- Polygon 1 -->
          <Svg8 :style="{ width: '480px', height: '480px' }" class="absolute -rotate-[22.5deg]"></Svg8>
          <!-- Polygon 2 -->
          <Svg8 :style="{ width: '443px', height: '443px' }" class="absolute"></Svg8>
          <!-- Polygon 3 (Fill) -->
          <Svg8 :style="{ width: '409px', height: '409px' }" class="absolute -rotate-[22.5deg] drop-shadow-[0_12px_36px_rgba(67,124,98,0.25)]" fill-color="var(--theme-sprout-light)"></Svg8>
          <!-- Polygon 4 (Inner Border) -->
          <Svg8 :style="{ width: '395px', height: '395px' }" class="absolute -rotate-[22.5deg]"></Svg8>

          <!-- Inside Badge Content -->
          <div class="relative z-10 flex flex-col items-center justify-center text-center text-sprout-bg font-sans select-none">
            <span class="text-[32px] font-bold leading-tight mb-0.5">2026</span>
            <div class="text-[44px] lg:text-[54px] font-bold text-white leading-tight drop-shadow-[0_4px_4px_rgba(92,92,92,0.25)] flex items-center gap-3">
              <span>10/31</span>
              <span>11/1</span>
            </div>
            <div class="w-8 h-0 border-t-2 border-sprout-bg my-1.5"></div>
            <span class="text-[28px] font-bold leading-tight mb-2">10:00 ~ 17:00</span>

            <div class="flex items-center gap-2 mt-1">
              <svg
                class="w-9 h-9 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                  fill="#F8F8ED"
                />
              </svg>
              <div class="flex flex-col text-left">
                <span class="text-base font-medium leading-tight">関東学院大学</span>
                <span class="text-xl font-bold leading-tight">金沢八景キャンパス</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4 Layers of Green Hills & Sprout Leaves (bottom) -->
      <div class="absolute -bottom-[2px] left-0 w-full h-fit pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
        <!-- Hill -->
        <SvgWave class="w-full mt-10 transform translate-y-[1px]" preserveAspectRatio="none"></SvgWave>
        <div
          v-for="leaf in leaves"
          :key="leaf.id"
          class="absolute bottom-0 left-0 pointer-events-none"
          :style="{
            left: `${(leaf.left / 1920) * 100}%`,
            top: `${(leaf.top / 370) * 100}%`,
            width: `clamp(${leaf.width*1.2}px, ${(leaf.width / 1400) * 100}vw, ${leaf.width*2}px)`,
            height: `${(leaf.height /240) * 100}%`,
          }"
        >
          <SvgLeafIcon
            :name="leaf.name"
            class="w-full h-full drop-shadow-sm"
          />
        </div>
      </div>
    </section>

    <!-- 2. 企画セクション (背景: #437C62: -mt-[2px]でHeroSection最下部の波と確実にオーバーラップさせて隙間線を防止) -->
    <section class="w-full bg-sprout-moss py-8 px-0 relative z-[5] overflow-hidden -mt-[2px]" id="events">
      <div class="w-full flex flex-col items-center">
        <!-- Title -->
        <UiSectionTitle title="企画" text-color="text-sprout-accent" ornament-color="#DFF794" />

        <!-- 4 Cards Horizontal Swipeable Carousel (3:4 Vertical Photos with Blurred Backdrop) -->
        <div class="relative w-full mt-4 mb-6">
          <Swiper
            :modules="[Autoplay]"
            :slides-per-view="'auto'"
            :centered-slides="true"
            :space-between="16"
            :breakpoints="{
              640: {
                spaceBetween: 24,
              },
            }"
            :autoplay="{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
            :grab-cursor="true"
            class="events-swiper w-full py-4 select-none"
            @swiper="onSwiper"
            @slide-change="onSlideChange"
          >
            <SwiperSlide
              v-for="(item, idx) in featuredEvents"
              :key="item.id"
              class="!w-auto flex items-center justify-center"
            >
              <div
                role="button"
                tabindex="0"
                :aria-label="item.title"
                class="cursor-pointer transition-transform duration-300 h-[clamp(270px,50vh,720px)] aspect-[3/4] select-none outline-none focus-visible:ring-2 focus-visible:ring-sprout-accent"
                :class="activeIndex === idx ? 'scale-100 z-20' : 'scale-90 sm:scale-95 z-10'"
                @click="handleCardClick(idx, item.to)"
                @keydown.enter="handleCardClick(idx, item.to)"
              >
                <div
                  class="relative w-full h-full rounded-2xl overflow-hidden border-2 transition-[border-color,box-shadow] duration-300 shadow-xl select-none"
                  :class="activeIndex === idx ? 'border-sprout-accent shadow-[0_12px_36px_rgba(0,0,0,0.45)] ring-2 ring-sprout-accent/50' : 'border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.2)]'"
                >
                  <!-- ぼかした背景写真（軽量サムネイルをぼかしてFirefox等の描画負荷を大幅軽減） -->
                  <NuxtImg
                    :src="item.image"
                    aria-hidden="true"
                    loading="lazy"
                    draggable="false"
                    width="30"
                    height="40"
                    format="webp"
                    quality="10"
                    class="absolute inset-0 w-full h-full object-cover filter blur-md scale-110 opacity-80 pointer-events-none select-none"
                  />

                  <!-- 前面写真（適正解像度とWebP圧縮で高速描画） -->
                  <NuxtImg
                    :src="item.image"
                    :alt="item.title"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    sizes="xs:260px sm:280px md:300px"
                    format="webp"
                    quality="80"
                    class="relative z-10 w-full h-full object-contain transition-transform duration-300 pointer-events-none select-none"
                    :class="{ 'hover:scale-105': activeIndex === idx }"
                  />

                  <!-- バッジ（左上） -->
                  <div class="absolute top-3 left-3 z-30">
                    <span class="inline-block bg-sprout-dark/95 text-sprout-accent text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-sprout-accent/40 shadow-sm">
                      {{ item.badge }}
                    </span>
                  </div>

                  <!-- 詳細を見るインジケーター（アクティブ時のみ右下に表示） -->
                  <div
                    v-if="activeIndex === idx"
                    class="absolute bottom-3 right-3 z-30"
                  >
                    <span class="inline-flex items-center gap-1 bg-sprout-dark/95 text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-sprout-accent/40 shadow transition-colors">
                      <span>詳細を見る</span>
                      <span>→</span>
                    </span>
                  </div>

                  <!-- 真ん中以外のものは薄く白くするオーバーレイ（backdrop-filterを使わず軽量化） -->
                  <div
                    class="absolute inset-0 z-20 transition-opacity duration-300 pointer-events-none"
                    :class="activeIndex === idx ? 'bg-transparent opacity-0' : 'bg-white/60 opacity-100'"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <!-- Indicator Dots -->
          <div class="flex items-center justify-center gap-2 mt-4">
            <button
              v-for="(item, idx) in featuredEvents"
              :key="idx"
              type="button"
              class="h-2 rounded-full transition-all duration-300 border-none cursor-pointer p-0"
              :class="activeIndex === idx ? 'w-8 bg-sprout-accent shadow-sm' : 'w-2 bg-white/40 hover:bg-white/70'"
              :aria-label="`${item.title}を表示`"
              @click="goToSlide(idx)"
            />
          </div>
        </div>

        <!-- 説明文（現在真ん中にある企画の題名と説明を表記） -->
        <div class="text-center flex flex-col items-center gap-2.5 max-w-[800px] px-6 min-h-[110px]">
          <Transition name="event-desc-fade" mode="out-in">
            <div :key="currentFeaturedEvent.id" class="flex flex-col items-center gap-2.5">
              <h3 class="font-sans font-extrabold text-fluid-h2 text-white tracking-wide m-0">
                {{ currentFeaturedEvent.title }}
              </h3>
              <p class="font-sans font-medium text-fluid-lead leading-relaxed text-white/95 max-w-[650px] m-0">
                {{ currentFeaturedEvent.desc }}
              </p>
            </div>
          </Transition>
        </div>

        <!-- ボタン3つ横並び (場内マップ・タイムテーブル・企画一覧) -->
        <div class="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mt-6 w-full max-w-[800px] px-6">
          <NuxtLink
            to="/map"
            class="flex-1 min-w-[clamp(130px,18vw,180px)] max-w-[210px] h-[clamp(46px,5vw,50px)] bg-white hover:bg-sprout-bg text-sprout-title font-sans font-bold text-[clamp(0.875rem,1.1vw,1rem)] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 no-underline border-2 border-transparent hover:border-sprout-accent transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-sprout-border shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
            </svg>
            <span>場内マップ</span>
          </NuxtLink>

          <NuxtLink
            to="/schedule"
            class="flex-1 min-w-[clamp(130px,18vw,180px)] max-w-[210px] h-[clamp(46px,5vw,50px)] bg-white hover:bg-sprout-bg text-sprout-title font-sans font-bold text-[clamp(0.875rem,1.1vw,1rem)] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 no-underline border-2 border-transparent hover:border-sprout-accent transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-sprout-border shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>タイムテーブル</span>
          </NuxtLink>

          <NuxtLink
            to="/events"
            class="btn-gold flex-1 min-w-[clamp(130px,18vw,180px)] max-w-[210px] h-[clamp(46px,5vw,50px)] font-sans font-bold text-[clamp(0.875rem,1.1vw,1rem)] rounded-full shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.45)] flex items-center justify-center gap-2 no-underline transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>企画一覧</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 3〜5. 下部コンテンツ群 (ご案内・ご来場にあたって・アクセス：共通ラッパーでセクション境界の途切れを防止) -->
    <div class="w-full bg-sprout-bg relative z-[6] overflow-hidden -mt-[2px]">
      <!-- 反転した4層の波 (rotate 180deg: -mt-[2px]およびtranslateで上の企画セクションと同色オーバーラップ) -->
      <div class="w-full h-fit leading-none pb-16 relative z-10 -mt-[2px]" aria-hidden="true">
        <SvgWave class="w-full block rotate-180 transform scale-y-[1.02] -translate-y-[1px]" preserveAspectRatio="none" />
      </div>

      <!-- 背景幾何学装飾 (HeroSection風: 巨大な三重八角形を左右交互に3箇所のみダイナミックに配置) -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <!-- 1. ご案内エリア (左側見切れ: 三重八角形) -->
        <div class="absolute top-[100px] -left-28 sm:-left-44 lg:-left-56 w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] lg:w-[650px] lg:h-[650px] -rotate-12 opacity-35">
          <div
            v-for="scale in [1, 0.92, 0.84]"
            :key="scale"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            :style="{ width: `${scale * 100}%`, height: `${scale * 100}%` }"
          >
            <Svg8 class="w-full h-full" stroke-color="#42845A" :stroke-width="1.8" />
          </div>
        </div>

        <!-- 2. ご来場にあたってエリア (右側見切れ: 三重八角形) -->
        <div class="absolute top-[50%] -right-28 sm:-right-44 lg:-right-56 -translate-y-1/2 w-[400px] h-[400px] sm:w-[560px] sm:h-[560px] lg:w-[660px] lg:h-[660px] rotate-[34.5deg] opacity-35">
          <div
            v-for="scale in [1, 0.92, 0.84]"
            :key="scale"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            :style="{ width: `${scale * 100}%`, height: `${scale * 100}%` }"
          >
            <Svg8 class="w-full h-full" stroke-color="#42845A" :stroke-width="1.8" />
          </div>
        </div>

        <!-- 3. アクセスエリア (左下見切れ: 三重八角形) -->
        <div class="absolute bottom-0 -left-28 sm:-left-44 lg:-left-56 w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] lg:w-[650px] lg:h-[650px] -rotate-[15deg] opacity-35">
          <div
            v-for="scale in [1, 0.92, 0.84]"
            :key="scale"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            :style="{ width: `${scale * 100}%`, height: `${scale * 100}%` }"
          >
            <Svg8 class="w-full h-full" stroke-color="#42845A" :stroke-width="1.8" />
          </div>
        </div>
      </div>

      <!-- 3. ご案内セクション -->
      <section class="w-full pb-16 relative z-10" id="guide">
        <div class="section-container">
          <!-- Title -->
          <UiSectionTitle title="ご案内" />

          <!-- 3 Cards Flex Wrap (電子パンフレット・平潟祭について・よくある質問) -->
          <div class="flex flex-wrap justify-center gap-[clamp(16px,2.5vw,32px)] w-full max-w-[1140px] mb-8">
            <NuxtLink
              v-for="item in guideItems"
              :key="item.id"
              :to="item.to"
              class="group guide-nav-card relative w-[clamp(280px,30vw,300px)] aspect-[4/3] bg-white rounded-2xl flex flex-col justify-end p-[clamp(20px,2.5vw,28px)] no-underline shadow-[0_4px_20px_rgba(46,125,50,0.08)] hover:shadow-[0_12px_32px_rgba(46,125,50,0.18)] border-2 border-sprout-border/20 hover:border-sprout-border transition-all duration-300 hover:-translate-y-1.5 select-none"
            >
              <!-- 右上: svg8でクリッピングされた写真 / ビジュアル（8角形クリップのみ10度回転・中身の写真は直立維持・カード外はみ出し防止） -->
              <div
                class="absolute -top-[clamp(50px,1.5%,16px)] -right-[clamp(30px,2.5%,16px)] w-[clamp(190px,85%,370px)] aspect-square rotate-[10deg] pointer-events-none transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[12deg] will-change-transform"
                aria-hidden="true"
              >
                <!-- svg8形状でクリッピングされた写真領域（8角形のみ10度回転） -->
                <div class="w-full h-full overflow-hidden bg-sprout-bg flex items-center justify-center guide-svg8-clip">
                  <!-- 写真・中身コンテナ（拡大を排し、-10度で打ち消して写真は回転させず直立を維持） -->
                  <div class="w-full h-full -rotate-[10deg] group-hover:-rotate-[12deg] transition-transform duration-300 will-change-transform flex items-center justify-center">
                    <!-- 1. 写真がある場合（平潟祭について、または電子パンフレットの写真追加時） -->
                    <NuxtImg
                      v-if="item.image"
                      :src="item.image"
                      :alt="item.title"
                      loading="lazy"
                      decoding="async"
                      format="webp"
                      quality="80"
                      class="w-full h-full object-cover select-none pointer-events-none"
                    />
                    <!-- 2. よくある質問 (chick.vue + 左上に？) -->
                    <div
                      v-else-if="item.isChick"
                      class="w-full h-full bg-[#fdfbe8] relative flex items-center justify-center p-3 select-none"
                    >
                      <!-- アヒルの左上辺りの「？」マーク -->
                      <span
                        class="absolute top-[23%] left-[22%] font-sans font-black text-[clamp(18px,3.5vw,26px)] text-[#d86414] -rotate-12 select-none pointer-events-none drop-shadow-sm leading-none"
                        aria-hidden="true"
                      >
                        ?
                      </span>
                      <ChickSvg class="w-[48%] h-[48%] drop-shadow-sm select-none" />
                    </div>
                    <!-- 3. 写真未定時（電子パンフレット等の準備中プレースホルダー） -->
                    <div
                      v-else
                      class="w-full h-full bg-[#edf4ed] flex flex-col items-center justify-center gap-2 p-3 text-sprout-moss/75 select-none"
                    >
                      <svg class="w-[clamp(28px,5vw,38px)] h-[clamp(28px,5vw,38px)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span class="text-[clamp(10px,1.8vw,12px)] font-bold tracking-wider text-sprout-moss/80">準備中</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 左下: タイトル（写真が重なっても読みやすい白フチ・外線付き） -->
              <div class="relative z-20">
                <h3 class="guide-card-title font-sans font-extrabold text-[clamp(1.15rem,2.1vw,1.45rem)] text-sprout-title tracking-wide transition-colors duration-200 group-hover:text-sprout-border m-0 leading-tight">
                  {{ item.title }}
                </h3>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 4. ご来場にあたってセクション -->
      <section class="w-full pt-2 pb-16 relative z-10" id="about">
        <div class="section-container">
          <!-- Title -->
          <UiSectionTitle title="ご来場にあたって" />

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-[1121px]">
            <div v-for="(guide, gIdx) in visitorGuidelines" :key="gIdx" class="guide-card">
              <h4 class="guide-card-title">{{ guide.title }}</h4>
              <p class="guide-card-desc">{{ guide.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. アクセスセクション -->
      <section class="w-full pt-2 pb-20 relative z-10" id="access">
        <div class="section-container">
          <!-- Title -->
          <UiSectionTitle title="アクセス" />

          <div class="w-full max-w-[1121px] bg-white rounded-2xl p-[clamp(1.5rem,3.5vw,2.5rem)] shadow-[0_6px_24px_rgba(46,125,50,0.08)] border-2 border-sprout-border/30">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <!-- Access Info Column -->
              <div class="flex flex-col gap-6">
                <div>
                  <span class="inline-block bg-sprout-bg text-sprout-title text-xs font-bold px-3 py-1 rounded-full border border-sprout-border mb-2">会場</span>
                  <h3 class="text-fluid-h3 font-extrabold text-sprout-title mb-1">関東学院大学 金沢八景キャンパス</h3>
                  <p class="text-text-muted text-sm">〒236-8501 神奈川県横浜市金沢区六浦東1-50-1</p>
                </div>

                <!-- Train -->
                <div class="border-t border-gray-100 pt-4">
                  <h4 class="font-bold text-base text-sprout-title mb-2">
                    電車でお越しの方
                  </h4>
                  <ul class="text-sm text-text-muted leading-relaxed space-y-1.5 pl-5 list-disc">
                    <li><strong>金沢八景駅（京急本線・シーサイドライン）</strong>より徒歩約15分</li>
                    <li><strong>追浜駅（京急本線）</strong>より徒歩約20分</li>
                    <li>キャンパスまで横浜駅から約35分、品川駅から約55分</li>
                  </ul>
                </div>

                <!-- Bus -->
                <div class="border-t border-gray-100 pt-4">
                  <h4 class="font-bold text-base text-sprout-title mb-2">
                    バスでお越しの方
                  </h4>
                  <ul class="text-sm text-text-muted leading-relaxed space-y-1.5 pl-5 list-disc">
                    <li><strong>京急バス「関東学院正門」</strong>下車すぐ</li>
                    <li class="marker:content-['※_']"><strong class="text-black">日曜日及び祝日には運行されません。</strong></li>
                  </ul>
                </div>

                <!-- Car -->
                <div class="border-t border-gray-100 pt-4">

                  <p class="text-sm text-text-muted leading-relaxed bg-sprout-bg/60 p-3 rounded-lg border-l-4 border-amber-500">
                    <strong class="font-bold text-black">※ 来場者用駐車場はございません。</strong><br>
                    公共交通機関をご利用ください。
                  </p>
                </div>
              </div>

              <!-- Map Column -->
              <div
                ref="mapContainerRef"
                class="w-full h-full min-h-[clamp(340px,38vw,420px)] rounded-xl overflow-hidden shadow-sm border border-sprout-border/30 flex relative bg-gray-50"
              >
                <!-- 遅延マウントされる Google Maps iframe -->
                <iframe
                  v-if="isMapLoaded"
                  class="w-full h-full min-h-[clamp(340px,38vw,420px)] border-0"
                  src="https://www.google.com/maps?q=35.323287,139.623311&z=15&output=embed"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="関東学院大学 金沢八景キャンパス 地図"
                />
                <!-- 未ロード時のプレースホルダー（軽量スケルトン表示） -->
                <div
                  v-else
                  class="w-full h-full min-h-[clamp(340px,38vw,420px)] flex flex-col items-center justify-center p-6 text-center bg-sprout-bg/30 cursor-pointer group"
                  @click="loadMap"
                >
                  <div class="w-12 h-12 rounded-full bg-sprout-forest/10 flex items-center justify-center text-sprout-forest mb-3 group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p class="text-sm font-bold text-sprout-forest mb-1">Google マップを読み込み中...</p>
                  <p class="text-xs text-text-muted">（タップして今すぐ表示）</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Swiperコンテナのカード影・拡大用のはみ出し表示許可 */
:deep(.events-swiper) {
  overflow: visible;
}

/* 企画説明文の切り替えアニメーション（スムーズ＆高速） */
.event-desc-fade-enter-active,
.event-desc-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.event-desc-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
/* ご案内カードの8角形クリッピング */
.guide-svg8-clip {
  clip-path: polygon(50% 0.12%, 85.27% 14.73%, 99.88% 50%, 85.27% 85.27%, 50% 99.88%, 14.73% 85.27%, 0.12% 50%, 14.73% 14.73%);
  -webkit-clip-path: polygon(50% 0.12%, 85.27% 14.73%, 99.88% 50%, 85.27% 85.27%, 50% 99.88%, 14.73% 85.27%, 0.12% 50%, 14.73% 14.73%);
}

/* カード外へのはみ出し描画を確実に防止（Safari対応） */
.guide-nav-card {
  overflow: hidden;
  isolation: isolate;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* タイトルが写真に被っても綺麗に文字が浮き立つソフトな白シャドー */
.guide-card-title {
  text-shadow:
    0 0 5px rgba(255, 255, 255, 0.95),
    0 0 12px rgba(255, 255, 255, 0.9),
    0 0 24px rgba(255, 255, 255, 0.8),
    0 2px 6px rgba(255, 255, 255, 0.7);
}
</style>

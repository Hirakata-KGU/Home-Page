<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue';

useSeoMeta({
  title: '平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭',
  description: '2026年10月31日(土)・11月1日(日)開催！第77回 平潟祭 『SPROUT』 関東学院大学 金沢八景キャンパスの学園祭公式サイト。',
});

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
    badge: 'SCC 4F メインアリーナ',
    image: '/images/events/stage-geino-miyase.jpg',
    desc: '',
    to: '/events/stage-geino-miyase',
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
    desc: '各サークル・学科が趣向を凝らした焼きそば、たこ焼き、スイーツなど美味しい屋台が大集合！',
    to: '/events?category=food',
  },
  {
    id: 'culture',
    title: '文化館・展示',
    badge: '文化館・音楽館',
    image: '/images/top/bunkakan.jpg',
    desc: '美術・写真展示、体験型ワークショップなど、学生たちの創造力が光る文化館展示をお楽しみください！',
    to: '/events?category=culture',
  },
];

// カルーセル状態管理
const activeIndex = ref(0);
const scrollContainer = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

// マウスドラッグ（長押しスクロール）状態管理
const isMouseDown = ref(false);
let isMouseDownState = false;
let preventClick = false;
let startX = 0;
let scrollStartLeft = 0;
let movedDistance = 0;

const currentFeaturedEvent = computed(() => {
  return featuredEvents[activeIndex.value] || featuredEvents[0];
});

// スクロール時に最も中央に近いカードを判定してアクティブ更新
const onScroll = () => {
  const container = scrollContainer.value;
  if (!container) return;
  const containerCenter = container.scrollLeft + container.clientWidth / 2;
  let minDiff = Infinity;
  let closestIndex = activeIndex.value;

  cardRefs.value.forEach((el, index) => {
    if (!el) return;
    const elCenter = el.offsetLeft + el.offsetWidth / 2;
    const diff = Math.abs(containerCenter - elCenter);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = index;
    }
  });

  if (closestIndex !== activeIndex.value) {
    activeIndex.value = closestIndex;
  }
};

// 指定したインデックスのカードを中央へスムーズスクロール
const scrollToItem = (index: number) => {
  if (index < 0 || index >= featuredEvents.length) return;
  activeIndex.value = index;
  const el = cardRefs.value[index];
  if (el && scrollContainer.value) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }
};

// ドラッグ後の誤クリックをキャプチャフェーズで完全に阻止
const onContainerClickCapture = (e: MouseEvent) => {
  if (preventClick || movedDistance > 5) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
};

// マウスドラッグスクロール処理
const onMouseDown = (e: MouseEvent) => {
  if (e.button !== 0) return;
  const container = scrollContainer.value;
  if (!container) return;

  isMouseDownState = true;
  isMouseDown.value = true;
  preventClick = false;
  startX = e.clientX;
  scrollStartLeft = container.scrollLeft;
  movedDistance = 0;

  // ドラッグ中はスムーズスクロールやスナップを解除してマウスに完全追従
  container.style.scrollSnapType = 'none';
  container.style.scrollBehavior = 'auto';

  if (import.meta.client) {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
};

const onMouseMove = (e: MouseEvent) => {
  if (!isMouseDownState) return;
  const container = scrollContainer.value;
  if (!container) return;

  const dx = e.clientX - startX;
  movedDistance = Math.abs(dx);

  if (movedDistance > 5) {
    preventClick = true;
    container.scrollLeft = scrollStartLeft - dx;
  }
};

const onMouseUp = () => {
  if (import.meta.client) {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  if (!isMouseDownState) return;
  isMouseDownState = false;
  isMouseDown.value = false;
  const container = scrollContainer.value;

  if (container) {
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollBehavior = 'smooth';

    if (preventClick) {
      onScroll();
      scrollToItem(activeIndex.value);
    }
  }

  // クリックイベントが終了するまで preventClick を true に維持
  if (preventClick) {
    setTimeout(() => {
      preventClick = false;
      movedDistance = 0;
    }, 200);
  }
};

// カードクリック時の処理
const handleCardClick = (index: number, to: string) => {
  // ドラッグした直後の場合は一切の処理を防止
  if (preventClick || movedDistance > 5) {
    return;
  }

  // 芸能ステージの場合は常に詳細ページへ直接遷移
  if (featuredEvents[index].id === 'geino') {
    navigateTo(to);
    return;
  }

  // それ以外のカードで中央にない場合は中央へスクロール
  if (activeIndex.value !== index) {
    scrollToItem(index);
  } else {
    // 既に中央にある場合は該当一覧へ遷移
    navigateTo(to);
  }
};

// 矢印ボタンの長押し（ホールド）スクロール対応
let holdTimer: ReturnType<typeof setInterval> | null = null;
const startHoldScroll = (direction: 'prev' | 'next') => {
  if (direction === 'prev') prevItem();
  else nextItem();

  holdTimer = setInterval(() => {
    if (direction === 'prev') prevItem();
    else nextItem();
  }, 450);
};

const stopHoldScroll = () => {
  if (holdTimer) {
    clearInterval(holdTimer);
    holdTimer = null;
  }
};

const prevItem = () => {
  if (activeIndex.value > 0) {
    scrollToItem(activeIndex.value - 1);
  } else {
    scrollToItem(featuredEvents.length - 1);
  }
};

const nextItem = () => {
  if (activeIndex.value < featuredEvents.length - 1) {
    scrollToItem(activeIndex.value + 1);
  } else {
    scrollToItem(0);
  }
};

onMounted(() => {
  nextTick(() => {
    scrollToItem(0);
  });
});

onBeforeUnmount(() => {
  stopHoldScroll();
  if (import.meta.client) {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }
});

// 2. ご案内カードデータ（電子パンフレット・平潟祭について・よくある質問 ※アイコンSVG提供後に配置予定）
const guideItems = [
  {
    title: '電子パンフレット',
    badge: 'Guidebook',
    desc: '当日のタイムスケジュール、キャンパスマップ、出店・企画リストが1冊にまとまった公式電子ガイドです。',
    to: '/info/pamphlet',
    linkText: 'パンフレットを見る',
  },
  {
    title: '平潟祭について',
    badge: 'About SPROUT',
    desc: '2026年度テーマ「sprout（スプラウト）」に込められた想いや、平潟祭の歴史・開催概要をご紹介します。',
    to: '/info/about',
    linkText: '平潟祭を知る',
  },
  {
    title: 'よくある質問',
    badge: 'FAQ',
    desc: '入場方法、事前予約、雨天時の開催、取材申請など、皆様から多く寄せられる質問と回答を掲載しています。',
    to: '/info/faq',
    linkText: 'よくある質問を見る',
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
    <SectionsHeroSection />

    <!-- 2. 企画セクション (背景: #437C62: -mt-[2px]でHeroSection最下部の波と確実にオーバーラップさせて隙間線を防止) -->
    <section class="w-full bg-sprout-moss py-12 sm:py-16 px-0 relative z-[5] overflow-hidden -mt-[2px]" id="events">
      <div class="w-full flex flex-col items-center">
        <!-- Title -->
        <UiSectionTitle title="企画" text-color="text-sprout-accent" ornament-color="#DFF794" />

        <!-- 4 Cards Horizontal Swipeable Carousel (3:4 Vertical Photos with Blurred Backdrop) -->
        <div class="relative w-full max-w-[1400px] mt-4 mb-6">
          <!-- Navigation Arrow (Prev) 長押し対応 -->
          <button
            type="button"
            class="hidden sm:flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-sprout-dark/60 hover:bg-sprout-dark text-white backdrop-blur-md items-center justify-center transition-all shadow-lg hover:scale-105 border border-white/20 cursor-pointer select-none"
            aria-label="前の企画へ"
            @mousedown.prevent="startHoldScroll('prev')"
            @mouseup="stopHoldScroll"
            @mouseleave="stopHoldScroll"
            @click="prevItem"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Navigation Arrow (Next) 長押し対応 -->
          <button
            type="button"
            class="hidden sm:flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-sprout-dark/60 hover:bg-sprout-dark text-white backdrop-blur-md items-center justify-center transition-all shadow-lg hover:scale-105 border border-white/20 cursor-pointer select-none"
            aria-label="次の企画へ"
            @mousedown.prevent="startHoldScroll('next')"
            @mouseup="stopHoldScroll"
            @mouseleave="stopHoldScroll"
            @click="nextItem"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Scroll / Swipe Container (マウス長押しドラッグ対応) -->
          <div
            ref="scrollContainer"
            class="events-scroll-container flex flex-row items-center gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar select-none"
            :class="isMouseDown ? 'cursor-grabbing' : 'cursor-grab'"
            @scroll.passive="onScroll"
            @mousedown="onMouseDown"
            @click.capture="onContainerClickCapture"
            @dragstart.prevent
          >
            <div
              v-for="(item, idx) in featuredEvents"
              :key="item.id"
              :ref="(el) => { if (el) cardRefs[idx] = el as HTMLElement; }"
              role="button"
              tabindex="0"
              :aria-label="item.title"
              class="shrink-0 snap-center cursor-pointer transition-all duration-300 h-[clamp(270px,50dvh,720px)] aspect-[3/4] select-none outline-none focus-visible:ring-2 focus-visible:ring-sprout-accent"
              :class="activeIndex === idx ? 'scale-100 z-20' : 'scale-90 sm:scale-95 z-10'"
              @click="handleCardClick(idx, item.to)"
              @keydown.enter="handleCardClick(idx, item.to)"
              @dragstart.prevent
            >
              <div
                class="relative w-full h-full rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-xl select-none"
                :class="activeIndex === idx ? 'border-sprout-accent shadow-[0_12px_36px_rgba(0,0,0,0.45)] ring-2 ring-sprout-accent/50' : 'border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.2)]'"
              >
                <!-- ぼかした背景写真（枠いっぱいに伸ばす） -->
                <NuxtImg
                  :src="item.image"
                  aria-hidden="true"
                  loading="lazy"
                  draggable="false"
                  class="absolute inset-0 w-full h-full object-cover filter blur-md scale-110 opacity-75 pointer-events-none select-none"
                />

                <!-- 前面写真（枠外にはみ出ないよう object-contain で配置） -->
                <NuxtImg
                  :src="item.image"
                  :alt="item.title"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  sizes="xs:260px sm:280px md:300px"
                  class="relative z-10 w-full h-full object-contain drop-shadow transition-transform duration-300 pointer-events-none select-none"
                  :class="{ 'hover:scale-105': activeIndex === idx }"
                />

                <!-- バッジ（左上） -->
                <div class="absolute top-3 left-3 z-30">
                  <span class="inline-block bg-sprout-dark/85 backdrop-blur-md text-sprout-accent text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-sprout-accent/40 shadow-sm">
                    {{ item.badge }}
                  </span>
                </div>

                <!-- 詳細を見るインジケーター（アクティブ時のみ右下に表示） -->
                <div
                  v-if="activeIndex === idx"
                  class="absolute bottom-3 right-3 z-30"
                >
                  <span class="inline-flex items-center gap-1 bg-sprout-dark/85 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-sprout-accent/40 shadow transition-colors">
                    <span>詳細を見る</span>
                    <span>→</span>
                  </span>
                </div>

                <!-- 真ん中以外のものは薄く白くするオーバーレイ -->
                <div
                  class="absolute inset-0 z-20 transition-all duration-300 pointer-events-none"
                  :class="activeIndex === idx ? 'bg-transparent opacity-0' : 'bg-white/55 backdrop-brightness-110 opacity-100'"
                />
              </div>
            </div>
          </div>

          <!-- Indicator Dots -->
          <div class="flex items-center justify-center gap-2 mt-4">
            <button
              v-for="(item, idx) in featuredEvents"
              :key="idx"
              type="button"
              class="h-2 rounded-full transition-all duration-300 border-none cursor-pointer p-0"
              :class="activeIndex === idx ? 'w-8 bg-sprout-accent shadow-sm' : 'w-2 bg-white/40 hover:bg-white/70'"
              :aria-label="`${item.title}を表示`"
              @click="scrollToItem(idx)"
            />
          </div>
        </div>

        <!-- 説明文（現在真ん中にある企画の題名と説明を表記） -->
        <div class="text-center flex flex-col items-center gap-2.5 max-w-[800px] px-6 min-h-[110px] transition-all duration-300">
          <h3 class="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide m-0">
            {{ currentFeaturedEvent.title }}
          </h3>
          <p class="font-sans font-medium text-sm sm:text-base lg:text-lg leading-relaxed text-white/95 max-w-[650px] m-0">
            {{ currentFeaturedEvent.desc }}
          </p>
        </div>

        <!-- ボタン3つ横並び (場内マップ・タイムテーブル・企画一覧) -->
        <div class="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mt-6 w-full max-w-[800px] px-6">
          <NuxtLink
            to="/map"
            class="flex-1 min-w-[130px] sm:min-w-[170px] max-w-[210px] h-[46px] sm:h-[50px] bg-white hover:bg-sprout-bg text-sprout-title font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 no-underline border-2 border-transparent hover:border-sprout-accent transition-all duration-200 hover:-translate-y-0.5"
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
            class="flex-1 min-w-[130px] sm:min-w-[170px] max-w-[210px] h-[46px] sm:h-[50px] bg-white hover:bg-sprout-bg text-sprout-title font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 no-underline border-2 border-transparent hover:border-sprout-accent transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-sprout-border shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>タイムテーブル</span>
          </NuxtLink>

          <NuxtLink
            to="/events"
            class="btn-gold flex-1 min-w-[130px] sm:min-w-[170px] max-w-[210px] h-[46px] sm:h-[50px] font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.45)] flex items-center justify-center gap-2 no-underline transition-all duration-200 hover:-translate-y-0.5"
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

          <!-- 3 Cards Grid (電子パンフレット・平潟祭について・よくある質問 ※絵文字不使用) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1126px] mb-8">
            <NuxtLink
              v-for="(item, idx) in guideItems"
              :key="idx"
              :to="item.to"
              class="group bg-white rounded-2xl p-7 min-h-[210px] flex flex-col justify-between no-underline shadow-[0_4px_20px_rgba(46,125,50,0.08)] hover:shadow-[0_12px_32px_rgba(46,125,50,0.18)] border-2 border-sprout-border/20 hover:border-sprout-border transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div class="inline-block bg-sprout-bg text-sprout-title text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 border border-sprout-border-light">
                  {{ item.badge }}
                </div>
                <div class="flex items-center gap-2 mb-2.5">
                  <!-- アイコンSVG提供後に配置予定 -->
                  <h3 class="text-xl font-extrabold text-sprout-title m-0">{{ item.title }}</h3>
                </div>
                <p class="text-[13px] leading-relaxed text-text-muted mb-4">{{ item.desc }}</p>
              </div>
              <div class="flex items-center justify-between text-[13px] font-bold text-sprout-border border-t border-gray-100 pt-3">
                <span>{{ item.linkText }}</span>
                <span class="transition-transform group-hover:translate-x-1">→</span>
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

          <div class="w-full max-w-[1121px] bg-white rounded-2xl p-6 sm:p-10 shadow-[0_6px_24px_rgba(46,125,50,0.08)] border-2 border-sprout-border/30">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <!-- Access Info Column -->
              <div class="flex flex-col gap-6">
                <div>
                  <span class="inline-block bg-sprout-bg text-sprout-title text-xs font-bold px-3 py-1 rounded-full border border-sprout-border mb-2">会場</span>
                  <h3 class="text-xl sm:text-2xl font-extrabold text-sprout-title mb-1">関東学院大学 金沢八景キャンパス</h3>
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
              <div class="w-full h-full min-h-[340px] sm:min-h-[420px] rounded-xl overflow-hidden shadow-sm border border-sprout-border/30 flex">
                <iframe
                  class="w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
                  src="https://www.google.com/maps?q=35.323287,139.623311&z=15&output=embed"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="関東学院大学 金沢八景キャンパス 地図"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* カルーセルのスクロールバー非表示 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* スワイプコンテナの左右パディング（カードの可変幅に応じて端のカードも正確に中央スナップ） */
.events-scroll-container {
  padding-left: calc(50% - clamp(101px, 15dvh, 158px));
  padding-right: calc(50% - clamp(101px, 15dvh, 158px));
}
</style>

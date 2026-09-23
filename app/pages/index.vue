<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue';
import ChickSvg from '~/components/svg/map/chick.vue';

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
    badge: 'SCC 4F ベンネットホール',
    image: '/images/events/stage-geino-miyase.jpg',
    desc: '宮世琉弥トークショー（全席指定・有料チケット制）',
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
const isDragging = ref(false);

const currentFeaturedEvent = computed(() => {
  return featuredEvents[activeIndex.value] || featuredEvents[0];
});

// ポインタースクロール / ドラッグ制御
let isPointerDown = false;
let hasDragged = false;
let startX = 0;
let scrollStart = 0;
let lastX = 0;
let lastTime = 0;
let velocity = 0;
let targetIndex: number | null = null;
let scrollRaf: number | null = null;
let scrollTimer: ReturnType<typeof setTimeout> | null = null;

// 自動切り替えタイマー（6秒ごと）
const AUTO_PLAY_INTERVAL = 6000;
let autoPlayTimer: ReturnType<typeof setTimeout> | null = null;

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
    autoPlayTimer = null;
  }
};

const startAutoPlay = () => {
  stopAutoPlay();
  if (!import.meta.client) return;
  autoPlayTimer = setTimeout(() => {
    const nextIndex = (activeIndex.value + 1) % featuredEvents.length;
    scrollToItem(nextIndex);
    startAutoPlay();
  }, AUTO_PLAY_INTERVAL);
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
};

const onPointerDown = (e: PointerEvent) => {
  if (e.button !== 0 && e.pointerType === 'mouse') return;
  const container = scrollContainer.value;
  if (!container) return;

  if (cardMetrics.length === 0 || cardMetrics[0]?.center === 0) {
    updateCardMetrics();
  }

  stopAutoPlay();
  isPointerDown = true;
  hasDragged = false;
  startX = e.clientX;
  lastX = e.clientX;
  lastTime = performance.now();
  scrollStart = container.scrollLeft;
  velocity = 0;
  targetIndex = null;
};

const onPointerMove = (e: PointerEvent) => {
  if (!isPointerDown) return;
  const container = scrollContainer.value;
  if (!container) return;

  const dx = e.clientX - startX;
  if (!hasDragged && Math.abs(dx) > 5) {
    hasDragged = true;
    isDragging.value = true;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    container.style.scrollSnapType = 'none';
    container.style.scrollBehavior = 'auto';
  }

  if (hasDragged) {
    container.scrollLeft = scrollStart - dx;
    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 0) {
      velocity = (e.clientX - lastX) / dt;
    }
    lastX = e.clientX;
    lastTime = now;
  }
};

const onPointerUp = (e: PointerEvent) => {
  if (!isPointerDown) return;
  isPointerDown = false;
  const container = scrollContainer.value;
  if (!container) return;

  if (hasDragged) {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollBehavior = 'smooth';

    if (velocity < -0.25 && activeIndex.value < featuredEvents.length - 1) {
      scrollToItem(activeIndex.value + 1);
    } else if (velocity > 0.25 && activeIndex.value > 0) {
      scrollToItem(activeIndex.value - 1);
    } else {
      updateActiveIndex();
      scrollToItem(activeIndex.value);
    }
    setTimeout(() => {
      hasDragged = false;
      isDragging.value = false;
    }, 60);
  } else {
    isDragging.value = false;
  }
  startAutoPlay();
};

// カード位置キャッシュ（スクロールごとのoffsetLeft再計算によるリフロー/カクつきを完全防止）
let cardMetrics: { center: number; width: number }[] = [];

const updateCardMetrics = () => {
  cardMetrics = cardRefs.value.map((el) => {
    if (!el) return { center: 0, width: 300 };
    return {
      center: el.offsetLeft + el.offsetWidth / 2,
      width: el.offsetWidth,
    };
  });
};

// スクロール時に最も中央に近いカードを判定（チラつき防止＆レイアウト再計算なしで高速化）
const updateActiveIndex = () => {
  const container = scrollContainer.value;
  if (!container) return;
  const center = container.scrollLeft + container.clientWidth / 2;

  if (cardMetrics.length === 0 || cardMetrics[0]?.center === 0) {
    updateCardMetrics();
  }

  // 目標カードへ移動中は、目標が中央近く（カード幅の45%以内）に来るまで切り替えない（チラつき防止）
  if (targetIndex !== null && cardMetrics[targetIndex]) {
    const { center: targetCenter, width: targetWidth } = cardMetrics[targetIndex];
    if (Math.abs(center - targetCenter) < targetWidth * 0.45) {
      activeIndex.value = targetIndex;
      targetIndex = null;
    }
    return;
  }

  let minDiff = Infinity;
  let closest = activeIndex.value;
  for (let i = 0; i < cardMetrics.length; i++) {
    const metric = cardMetrics[i];
    if (!metric) continue;
    const diff = Math.abs(center - metric.center);
    if (diff < minDiff) {
      minDiff = diff;
      closest = i;
    }
  }
  activeIndex.value = closest;
};

const onScroll = () => {
  if (scrollRaf !== null) return;
  scrollRaf = requestAnimationFrame(() => {
    updateActiveIndex();
    scrollRaf = null;
  });
};

// 指定したカードを中央へスムーズスクロール
const scrollToItem = (index: number) => {
  if (index < 0 || index >= featuredEvents.length) return;
  const container = scrollContainer.value;
  if (!container) return;

  targetIndex = index;
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  if (cardMetrics.length === 0 || cardMetrics[0]?.center === 0) {
    updateCardMetrics();
  }

  const metric = cardMetrics[index];
  const targetCenter = metric ? metric.center : (cardRefs.value[index]?.offsetLeft ?? 0) + (cardRefs.value[index]?.offsetWidth ?? 0) / 2;
  const targetLeft = targetCenter - container.clientWidth / 2;
  container.scrollTo({
    left: targetLeft,
    behavior: 'smooth',
  });

  // スクロール完了時（または到着時）に確実にアクティブを同期
  scrollTimer = setTimeout(() => {
    targetIndex = null;
    activeIndex.value = index;
    scrollTimer = null;
  }, 350);
};

// カードクリック時の処理
const handleCardClick = (index: number, to: string) => {
  if (hasDragged) return;

  startAutoPlay();
  if (activeIndex.value !== index) {
    scrollToItem(index);
  } else {
    navigateTo(to);
  }
};

// Google Maps 遅延ロード（初期化時の約400KiBのJS読み込みとリフローを完全防止）
const mapContainerRef = ref<HTMLElement | null>(null);
const isMapLoaded = ref(false);
let mapObserver: IntersectionObserver | null = null;

const loadMap = () => {
  isMapLoaded.value = true;
  if (mapObserver) {
    mapObserver.disconnect();
    mapObserver = null;
  }
};

onMounted(() => {
  if (import.meta.client) {
    // 1. カルーセル: 初期マウント時の同期的ジオメトリ計測を避け、描画完了後のアイドル時に安全にキャッシュ＆自動再生開始
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        updateCardMetrics();
        startAutoPlay();
      }, { timeout: 1200 });
    } else {
      setTimeout(() => {
        updateCardMetrics();
        startAutoPlay();
      }, 300);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', updateCardMetrics, { passive: true });

    // 2. Google Maps: アクセスセクション付近（300px手前）までスクロールした際に初めてiframeをロード
    if ('IntersectionObserver' in window && mapContainerRef.value) {
      mapObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            loadMap();
          }
        },
        { rootMargin: '300px' }
      );
      mapObserver.observe(mapContainerRef.value);
    } else {
      // IntersectionObserver非対応環境フォールバック
      isMapLoaded.value = true;
    }
  }
});

onBeforeUnmount(() => {
  stopAutoPlay();
  if (scrollRaf !== null) {
    cancelAnimationFrame(scrollRaf);
  }
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }
  if (mapObserver) {
    mapObserver.disconnect();
    mapObserver = null;
  }
  if (import.meta.client) {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('resize', updateCardMetrics);
  }
});

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
    <SectionsHeroSection />

    <!-- 2. 企画セクション (背景: #437C62: -mt-[2px]でHeroSection最下部の波と確実にオーバーラップさせて隙間線を防止) -->
    <section class="w-full bg-sprout-moss py-8 px-0 relative z-[5] overflow-hidden -mt-[2px]" id="events">
      <div class="w-full flex flex-col items-center">
        <!-- Title -->
        <UiSectionTitle title="企画" text-color="text-sprout-accent" ornament-color="#DFF794" />

        <!-- 4 Cards Horizontal Swipeable Carousel (3:4 Vertical Photos with Blurred Backdrop) -->
        <div class="relative w-full mt-4 mb-6">
          <!-- Scroll / Swipe Container (マウス長押しドラッグ・タッチスワイプ対応) -->
          <div
            ref="scrollContainer"
            class="events-scroll-container flex flex-row items-center gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar select-none"
            :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
            @scroll.passive="onScroll"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
            @mouseenter="stopAutoPlay"
            @mouseleave="startAutoPlay"
            @dragstart.prevent
          >
            <div
              v-for="(item, idx) in featuredEvents"
              :key="item.id"
              :ref="(el) => { if (el) cardRefs[idx] = el as HTMLElement; }"
              role="button"
              tabindex="0"
              :aria-label="item.title"
              class="shrink-0 snap-center cursor-pointer transition-transform duration-300 h-[clamp(270px,50dvh,720px)] aspect-[3/4] select-none outline-none focus-visible:ring-2 focus-visible:ring-sprout-accent"
              :class="activeIndex === idx ? 'scale-100 z-20' : 'scale-90 sm:scale-95 z-10'"
              @click="handleCardClick(idx, item.to)"
              @keydown.enter="handleCardClick(idx, item.to)"
              @dragstart.prevent
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
              @click="scrollToItem(idx); startAutoPlay();"
            />
          </div>
        </div>

        <!-- 説明文（現在真ん中にある企画の題名と説明を表記） -->
        <div class="text-center flex flex-col items-center gap-2.5 max-w-[800px] px-6 min-h-[110px]">
          <Transition name="event-desc-fade" mode="out-in">
            <div :key="currentFeaturedEvent.id" class="flex flex-col items-center gap-2.5">
              <h3 class="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide m-0">
                {{ currentFeaturedEvent.title }}
              </h3>
              <p class="font-sans font-medium text-sm sm:text-base lg:text-lg leading-relaxed text-white/95 max-w-[650px] m-0">
                {{ currentFeaturedEvent.desc }}
              </p>
            </div>
          </Transition>
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
              <div
                ref="mapContainerRef"
                class="w-full h-full min-h-[340px] sm:min-h-[420px] rounded-xl overflow-hidden shadow-sm border border-sprout-border/30 flex relative bg-gray-50"
              >
                <!-- 遅延マウントされる Google Maps iframe -->
                <iframe
                  v-if="isMapLoaded"
                  class="w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
                  src="https://www.google.com/maps?q=35.323287,139.623311&z=15&output=embed"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="関東学院大学 金沢八景キャンパス 地図"
                />
                <!-- 未ロード時のプレースホルダー（軽量スケルトン表示） -->
                <div
                  v-else
                  class="w-full h-full min-h-[340px] sm:min-h-[420px] flex flex-col items-center justify-center p-6 text-center bg-sprout-bg/30 cursor-pointer group"
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
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  touch-action: pan-y pinch-zoom;
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

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

useSeoMeta({
  title: '平潟祭について｜第77回 平潟祭 2026',
  description: '第77回 平潟祭の委員長挨拶、昨年度（2025年度）の様子、開催概要をご紹介します。',
});

// 2025年度 学園祭の写真データ
const memories2025 = [
  {
    src: '/images/2025/gate.jpg',
    alt: '2025年度 入場ゲート・装飾',
  },
  {
    src: '/images/2025/okugai-stage.jpg',
    alt: '2025年度 野外ステージ',
  },
  {
    src: '/images/2025/LINE_ALBUM_2025 広報部門_260914_202.jpg',
    alt: '2025年度 キャンパス風景',
  },
  {
    src: '/images/2025/LINE_ALBUM_2026.6.23_260914_10.jpg',
    alt: '2025年度 ステージパフォーマンス',
  },
  {
    src: '/images/2025/S__41058357_0.jpg',
    alt: '2025年度 企画・模擬店',
  },
  {
    src: '/images/2025/Gemini_Generated_Image_pxxa5fpxxa5fpxxa.jpg',
    alt: '2025年度 夕景・ライトアップ',
  },
];

// 写真を1枚ずつ大きく表示するスライドショー制御
const currentSlide = ref(0);
let slideTimer: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % memories2025.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + memories2025.length) % memories2025.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetTimer();
};

const startTimer = () => {
  if (typeof window !== 'undefined') {
    slideTimer = setInterval(() => {
      nextSlide();
    }, 6000);
  }
};

const resetTimer = () => {
  if (slideTimer) {
    clearInterval(slideTimer);
    startTimer();
  }
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  if (slideTimer) {
    clearInterval(slideTimer);
  }
});
</script>

<template>
  <div>
    <LayoutPageHeader
      title="平潟祭について"
      sub-title="About Hirakata Festival"
      :breadcrumbs="[{ name: '平潟祭について' }]"
    />

    <div class="page-container">
<!-- 写真スライドショー（枠・見出しなし、1枚ずつ大きく順番に表示） -->
      <div
        class="memories-slideshow-container"
        @mouseenter="slideTimer && clearInterval(slideTimer)"
        @mouseleave="resetTimer"
      >
        <div class="slideshow-frame">
          <transition-group name="fade">
            <div
              v-for="(item, idx) in memories2025"
              v-show="currentSlide === idx"
              :key="item.src"
              class="slide-image-wrapper"
            >
              <NuxtImg
                :src="item.src"
                :alt="item.alt"
                loading="lazy"
                format="webp"
                sizes="xs:100vw sm:100vw md:1000px"
                class="slide-image"
              />
            </div>
          </transition-group>

          <!-- 矢印ナビゲーション -->
          <button
            class="slide-nav-btn prev"
            aria-label="前の写真"
            @click="prevSlide(); resetTimer();"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            class="slide-nav-btn next"
            aria-label="次の写真"
            @click="nextSlide(); resetTimer();"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- ドットインジケーター -->
          <div class="slide-indicators">
            <button
              v-for="(_, idx) in memories2025"
              :key="idx"
              class="indicator-dot"
              :class="{ active: currentSlide === idx }"
              :aria-label="`写真 ${idx + 1} へ`"
              @click="goToSlide(idx)"
            />
          </div>
        </div>
      </div>


      <!-- 委員長挨拶セクション -->
      <section class="section">
        <div class="section-header">
          <div class="section-title">
            <h2>委員長挨拶</h2>
            <p>Chairman Greeting</p>
          </div>
        </div>

        <div class="greeting-text">
          <p>
            第77回平潟祭にご来場いただき、誠にありがとうございます。<br>
            また、平潟祭にご協力いただいた関係者の皆様に厚くお礼申し上げます。
          </p>
          <p>
            第77回の平潟祭のテーマは「SPROUT」です。
          </p>
          <p>
            「SPROUT」には「芽吹く」という意味があります。
          </p>
          <p>
            これまでの76回の平潟祭の開催を通して、先輩方が積み上げてきた経験や想いを大切に受け継ぎ、その土台の上に、今年度の私たちだからこそ生み出せる新たなものを芽吹かせたいという思いから、このテーマに決定いたしました。
          </p>
          <p>
            そして、目まぐるしく変化していく時代に合わせ、私たち自身も変化していくとともに、これまで先輩方が築き上げてきたものを受け継ぎながら、これからの時代に当たり前となる新たなものを芽吹かせるという意味も込められています。
          </p>
          <p>
            団体による様々な模擬店や演奏、展示に加え、芸能ステージなど、盛りだくさんの内容となっています！
          </p>
          <p>
            ぜひ、77回目の平潟祭をお楽しみください！
          </p>
        </div>
      </section>


      <!-- Festival Outline（開催概要：そのまま維持） -->
      <section class="section">
        <div class="section-header">
          <div class="section-title">
            <h2>開催概要</h2>
            <p>Festival Outline</p>
          </div>
        </div>

        <div class="outline-table-wrapper">
          <table class="outline-table">
            <tbody>
              <tr>
                <th>名称</th>
                <td>第77回 平潟祭（ひらかたさい）</td>
              </tr>
              <tr>
                <th>テーマ</th>
                <td>SPROUT（スプラウト）</td>
              </tr>
              <tr>
                <th>開催日時</th>
                <td>
                  2026年10月31日(土) 10:00〜17:00<br>
                  2026年11月1日(日) 10:00〜17:00
                </td>
              </tr>
              <tr>
                <th>会場</th>
                <td>
                  関東学院大学 金沢八景キャンパス<br>
                  〒236-8501 神奈川県横浜市金沢区六浦東1-50-1
                </td>
              </tr>
              <tr>
                <th>入場料</th>
                <td>無料（事前予約不要・どなたでも自由にご入場いただけます）</td>
              </tr>
              <tr>
                <th>主催</th>
                <td>平潟祭実行委員会</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center gap-4 mt-8 flex-wrap">
          <NuxtLink to="/events" class="btn btn-primary">
            企画一覧を見る →
          </NuxtLink>
          <NuxtLink to="/#access" class="btn btn-secondary">
            アクセス情報はこちら →
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: var(--max-width);
  margin: -32px auto 80px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
  display: grid;
  gap: 40px;
}

/* 委員長挨拶テキスト */
.greeting-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 16px;
  line-height: 2.1;
  color: var(--text);
  max-width: 860px;
}

.greeting-text p {
  margin: 0;
}

/* 写真スライドショー（枠・見出しなし、1枚ずつ大きく順番に表示） */
.memories-slideshow-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4px 0;
}

.slideshow-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
  background: #000000;
}

.slide-image-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* フェード切り替えトランジション */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 矢印ナビゲーションボタン */
.slide-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #1a2e1c;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.slide-nav-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.08);
}

.slide-nav-btn.prev {
  left: 16px;
}

.slide-nav-btn.next {
  right: 16px;
}

/* インジケータードット */
.slide-indicators {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.35);
  padding: 6px 12px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator-dot.active {
  background: #ffffff;
  width: 24px;
  border-radius: 10px;
}

/* 開催概要テーブル */
.outline-table-wrapper {
  overflow-x: auto;
}

.outline-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

.outline-table th,
.outline-table td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  text-align: left;
}

.outline-table th {
  width: 25%;
  background: var(--sprout-bg);
  color: var(--sprout-title);
  font-weight: 800;
  white-space: nowrap;
}

.outline-table td {
  color: var(--text);
  line-height: 1.7;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .slideshow-frame {
    aspect-ratio: 4 / 3;
    border-radius: 14px;
  }

  .slide-nav-btn {
    width: 38px;
    height: 38px;
  }

  .slide-nav-btn.prev {
    left: 10px;
  }

  .slide-nav-btn.next {
    right: 10px;
  }

  .indicator-dot {
    width: 8px;
    height: 8px;
  }

  .indicator-dot.active {
    width: 18px;
  }
}

@media (max-width: 680px) {
  .greeting-text {
    font-size: 15px;
    line-height: 1.9;
    gap: 16px;
  }

  .outline-table th,
  .outline-table td {
    padding: 12px 14px;
    font-size: 13px;
  }

  .outline-table th {
    width: 32%;
  }
}
</style>

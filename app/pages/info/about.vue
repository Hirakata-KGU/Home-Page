<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

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
</script>

<template>
  <div class="w-full overflow-x-hidden">
    <LayoutPageHeader
      title="平潟祭について"
      sub-title="About Hirakata Festival"
      :breadcrumbs="[{ name: '平潟祭について' }]"
    />

    <div class="page-container">
      <!-- 写真スライドショー -->
      <section class="w-full min-w-0">
        <Swiper
          :modules="[Autoplay, EffectFade, Navigation, Pagination]"
          :effect="'fade'"
          :loop="true"
          :autoplay="{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          :navigation="true"
          :pagination="{ clickable: true }"
          class="memories-swiper w-full aspect-[16/10] max-sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-black"
        >
          <SwiperSlide
            v-for="item in memories2025"
            :key="item.src"
            class="w-full h-full"
          >
            <NuxtImg
              :src="item.src"
              :alt="item.alt"
              loading="lazy"
              format="webp"
              sizes="xs:100vw sm:100vw md:1000px"
              class="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </section>


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
  width: 100%;
  max-width: var(--max-width);
  margin: -32px auto 80px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 40px;
  box-sizing: border-box;
}

.page-container > * {
  min-width: 0;
  max-width: 100%;
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

/* 写真スライドショー（Swiper標準テーマ設定） */
.memories-swiper {
  --swiper-theme-color: #ffffff;
  --swiper-navigation-size: 26px;
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

<script setup lang="ts">
useSeoMeta({
  title: '平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭',
  description: '2026年10月31日(土)・11月1日(日)開催！第77回 平潟祭 『SPROUT』 関東学院大学 金沢八景キャンパスの学園祭公式サイト。',
});

// 企画カードデータ（Frame 4 Rectangle 2, 1, 3）
const featuredEvents = [
  {
    title: 'ステージパフォーマンス',
    badge: '屋内 & 屋外',
    desc: 'SCC4階ホールのスペシャルライブ＆芝生広場の軽音・ダンス！熱気あふれるステージをお届け。',
    to: '/events',
    icon: '🎤',
  },
  {
    title: '模擬店グルメ',
    badge: 'メインストリート',
    desc: '各サークル・学科が趣向を凝らした焼きそば、たこ焼き、スイーツなど美味しい屋台が大集合！',
    to: '/events',
    icon: '🍲',
  },
  {
    title: '文化・展示・体験',
    badge: '文化館・音楽館',
    desc: '研究発表、美術・写真展示、体験型ワークショップなど、学生の日頃の成果が咲き誇る。',
    to: '/events',
    icon: '🎨',
  },
];

// タイムテーブル概要
const scheduleHighlights = [
  {
    stage: '屋内ステージ（SCC 4階ホール）',
    title: 'ゲストライブ・オープニング・お笑い企画',
    time: '10/31(土) & 11/1(日) 10:30 開演 〜 16:30 終演',
    gradient: 'from-sprout-title to-sprout-dark border-sprout-border',
  },
  {
    stage: '野外ステージ（芝生広場）',
    title: '青空軽音楽ライブ & ダンスパフォーマンス',
    time: '10/31(土) & 11/1(日) 10:00 スタート 〜 17:00 フィナーレ',
    gradient: 'from-sprout-border to-sprout-title border-sprout-border-light',
  },
];

// ご来場にあたって
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
    title: '総合案内・救護所',
    desc: '正門ロータリー付近に本部テントを設置しております。落とし物や迷子、体調不良の際はお気軽にお声がけください。',
  },
  {
    title: 'キャンパス内全面禁煙',
    desc: 'キャンパス内は指定の喫煙所を除き全面禁煙です。ゴミの分別回収にご協力をお願いいたします。',
  },
];
</script>

<template>
  <div class="flex flex-col items-center p-0 relative w-full bg-sprout-bg overflow-x-hidden">
    <!-- 1. Top (Hero Section) -->
    <SectionsHeroSection />

    <!-- 2. Frame 4: 企画セクション (背景: #437C62) -->
    <section class="w-full bg-sprout-moss py-16 px-0 relative z-[5]" id="events-frame">
      <div class="section-container">
        <!-- Title -->
        <UiSectionTitle title="企画" text-color="text-sprout-accent" ornament-color="#DFF794" />

        <!-- 3 Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1126px] mb-8">
          <NuxtLink
            v-for="(item, idx) in featuredEvents"
            :key="idx"
            :to="item.to"
            class="group bg-white rounded-2xl p-7 min-h-[200px] flex flex-col justify-between no-underline shadow-[0_8px_24px_rgba(27,58,36,0.18)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)] border-2 border-transparent hover:border-sprout-light transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              <div class="inline-block bg-sprout-bg text-sprout-title text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 border border-sprout-border-light">
                {{ item.badge }}
              </div>
              <div class="flex items-center gap-2.5 mb-2.5">
                <span class="text-2xl">{{ item.icon }}</span>
                <h3 class="text-xl font-extrabold text-sprout-title m-0">{{ item.title }}</h3>
              </div>
              <p class="text-[13px] leading-relaxed text-text-muted mb-4">{{ item.desc }}</p>
            </div>
            <div class="flex items-center justify-between text-[13px] font-bold text-sprout-border border-t border-gray-100 pt-2.5">
              <span>詳細を見る</span>
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </NuxtLink>
        </div>

        <!-- 説明文 & ボタン -->
        <div class="text-center flex flex-col items-center gap-5 max-w-[800px]">
          <p class="font-sans font-bold text-base sm:text-lg lg:text-xl leading-relaxed text-white">
            音楽ライブ、模擬店グルメ、展示発表、参加型イベントなど盛りだくさん！<br>
            学生たちの情熱が芽吹き、咲き誇る特別な2日間をお楽しみください。
          </p>
          <NuxtLink to="/events" class="btn btn-gold px-9 py-3.5 text-base">
            全企画・模擬店一覧を見る 🎪
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 3. Frame 5: タイムテーブルセクション (背景: #F8F8ED + 上部反転波) -->
    <section class="w-full bg-sprout-bg pb-16 relative z-[6]" id="schedule-frame">
      <!-- 反転した4層の波 (rotate 180deg) -->
      <div class="w-full h-fit leading-none" aria-hidden="true">
        <SvgWave class="w-full rotate-180" preserveAspectRatio="none"></SvgWave>>
      </div>

      <div class="section-container">
        <!-- Title -->
        <UiSectionTitle title="タイムテーブル" />

        <!-- Schedule Preview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-7 w-full max-w-[1000px] mb-8">
          <div
            v-for="(card, cIdx) in scheduleHighlights"
            :key="cIdx"
            :class="['schedule-preview-card', card.gradient]"
          >
            <div class="schedule-preview-badge">
              {{ card.stage }}
            </div>
            <h4 class="text-[19px] font-extrabold mb-2">{{ card.title }}</h4>
            <p class="text-[13px] opacity-90 flex-1 mb-4">{{ card.time }}</p>
            <NuxtLink to="/schedule" class="schedule-preview-link">
              進行表をチェック →
            </NuxtLink>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink to="/schedule" class="btn btn-primary px-9 py-3.5 text-base">
            2日間の全タイムテーブルを見る 📅
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. Frame 8: 場内マップセクション (背景: #F8F8ED) -->
    <section class="w-full bg-sprout-bg py-10 lg:py-16 relative z-[6]" id="map-frame">
      <div class="section-container">
        <!-- Title -->
        <UiSectionTitle title="場内マップ" />

        <!-- Map Image -->
        <div class="w-full max-w-[1121px] mb-8">
          <div class="relative rounded-2xl overflow-hidden shadow-lg border-[3px] border-sprout-border bg-white">
            <img
              src="https://univ.kanto-gakuin.ac.jp/wp-content/themes/gakuin/images/img_map_kanazawa.jpg"
              alt="関東学院大学 金沢八景キャンパス 平潟祭 会場マップ"
              class="w-full h-auto block"
            />
            <div class="absolute top-4 left-4 bg-sprout-dark/85 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[13px] font-bold border border-sprout-border">
              <span>金沢八景キャンパス 全体マップ</span>
            </div>
          </div>
        </div>

        <!-- Map Navigation Buttons -->
        <div class="flex gap-4 flex-wrap justify-center">
          <NuxtLink to="/map" class="btn btn-primary">
            全体・模擬店マップを見る 🗺️
          </NuxtLink>
          <NuxtLink to="/map" class="btn btn-secondary">
            音楽館・文化館マップ 🏢
          </NuxtLink>
          <NuxtLink to="/access" class="btn btn-secondary">
            アクセス・交通案内 🚉
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5. Visitor Guidelines (ご来場案内) -->
    <section class="w-full bg-sprout-bg pt-5 pb-20" id="about">
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
  </div>
</template>



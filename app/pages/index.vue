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
</script>

<template>
  <div class="flex flex-col items-center p-0 relative w-full bg-sprout-bg overflow-x-hidden">
    <!-- 1. Top (Hero Section) -->
    <SectionsHeroSection />

    <!-- 2. Frame 4: 企画セクション (背景: #437C62) -->
    <section class="w-full bg-sprout-moss py-16 px-0 relative z-[5]" id="events-frame">
      <div class="w-full max-w-[1200px] px-6 mx-auto flex flex-col items-center">
        <!-- Group 5: Title & Line -->
        <div class="flex flex-col items-center justify-center w-full max-w-[824px] mb-8 text-center">
          <h2 class="font-sans font-bold text-4xl lg:text-5xl leading-tight text-sprout-accent mb-1">企画</h2>
          <UiOrnamentLine color="#DFF794" max-width="824px" />
        </div>

        <!-- Frame 7: 3 Cards Grid (Rectangle 2, 1, 3) -->
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

        <!-- 説明文 (上の企画の説明文とか) -->
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
      <!-- Group 6: 反転した4層の波 (rotate 180deg) -->
      <div class="relative w-full h-[100px] overflow-hidden mb-10 leading-none" aria-hidden="true">
        <!-- Wave 1 (#B9DD7B) -->
        <div class="absolute top-0 left-0 w-full h-[100px] z-[1]">
          <svg viewBox="0 0 1920 100" preserveAspectRatio="none" class="w-full h-full block">
            <path d="M0,0 L1920,0 L1920,30 Q1440,80 960,40 T0,60 Z" fill="#B9DD7B" />
          </svg>
        </div>
        <!-- Wave 2 (#88BD76) -->
        <div class="absolute top-0 left-0 w-full h-[85px] z-[2]">
          <svg viewBox="0 0 1920 85" preserveAspectRatio="none" class="w-full h-full block">
            <path d="M0,0 L1920,0 L1920,25 Q1380,75 800,30 T0,40 Z" fill="#88BD76" />
          </svg>
        </div>
        <!-- Wave 3 (#619D6E) -->
        <div class="absolute top-0 left-0 w-full h-[65px] z-[3]">
          <svg viewBox="0 0 1920 65" preserveAspectRatio="none" class="w-full h-full block">
            <path d="M0,0 L1920,0 L1920,20 Q1200,60 600,20 T0,30 Z" fill="#619D6E" />
          </svg>
        </div>
        <!-- Wave 4 (#437C62) -->
        <div class="absolute top-0 left-0 w-full h-[45px] z-[4]">
          <svg viewBox="0 0 1920 45" preserveAspectRatio="none" class="w-full h-full block">
            <path d="M0,0 L1920,0 L1920,15 Q960,45 0,15 Z" fill="#437C62" />
          </svg>
        </div>
      </div>

      <div class="w-full max-w-[1200px] px-6 mx-auto flex flex-col items-center">
        <!-- Group 6: Title & Line -->
        <div class="flex flex-col items-center justify-center w-full max-w-[824px] mb-8 text-center">
          <h2 class="font-sans font-bold text-4xl lg:text-5xl leading-tight text-sprout-title mb-1">タイムテーブル</h2>
          <UiOrnamentLine color="#42845A" max-width="824px" />
        </div>

        <!-- Schedule Preview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-7 w-full max-w-[1000px] mb-8">
          <div class="p-7 rounded-[18px] text-white flex flex-col shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 bg-gradient-to-br from-sprout-title to-sprout-dark border border-sprout-border">
            <div class="inline-block self-start bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3">
              屋内ステージ（SCC 4階ホール）
            </div>
            <h4 class="text-[19px] font-extrabold mb-2">ゲストライブ・オープニング・お笑い企画</h4>
            <p class="text-[13px] opacity-90 flex-1 mb-4">10/31(土) & 11/1(日) 10:30 開演 〜 16:30 終演</p>
            <NuxtLink to="/schedule" class="text-sm font-extrabold text-sprout-accent no-underline hover:underline">
              屋内進行表をチェック →
            </NuxtLink>
          </div>

          <div class="p-7 rounded-[18px] text-white flex flex-col shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 bg-gradient-to-br from-sprout-border to-sprout-title border border-sprout-border-light">
            <div class="inline-block self-start bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3">
              野外ステージ（芝生広場）
            </div>
            <h4 class="text-[19px] font-extrabold mb-2">青空軽音楽ライブ & ダンスパフォーマンス</h4>
            <p class="text-[13px] opacity-90 flex-1 mb-4">10/31(土) & 11/1(日) 10:00 スタート 〜 17:00 フィナーレ</p>
            <NuxtLink to="/schedule" class="text-sm font-extrabold text-sprout-accent no-underline hover:underline">
              野外進行表をチェック →
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
      <div class="w-full max-w-[1200px] px-6 mx-auto flex flex-col items-center">
        <!-- Group 5: Title & Line -->
        <div class="flex flex-col items-center justify-center w-full max-w-[824px] mb-8 text-center">
          <h2 class="font-sans font-bold text-4xl lg:text-5xl leading-tight text-sprout-title mb-1">場内マップ</h2>
          <UiOrnamentLine color="#42845A" max-width="824px" />
        </div>

        <!-- Image 1: 1121px x 797px -->
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
      <div class="w-full max-w-[1200px] px-6 mx-auto flex flex-col items-center">
        <div class="flex flex-col items-center justify-center w-full max-w-[824px] mb-8 text-center">
          <h2 class="font-sans font-bold text-4xl lg:text-5xl leading-tight text-sprout-title mb-1">ご来場にあたって</h2>
          <UiOrnamentLine color="#42845A" max-width="824px" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-[1121px]">
          <div class="bg-white p-6 rounded-xl border-l-[5px] border-sprout-border shadow-sm">
            <h4 class="text-base font-extrabold text-sprout-title mb-2">入場無料・事前予約不要</h4>
            <p class="text-[13px] text-text-muted leading-relaxed m-0">平潟祭はどなたでも自由にご入場いただけます。地域の皆さま、受験生、卒業生の方々もぜひお越しください。</p>
          </div>
          <div class="bg-white p-6 rounded-xl border-l-[5px] border-sprout-border shadow-sm">
            <h4 class="text-base font-extrabold text-sprout-title mb-2">公共交通機関のご利用</h4>
            <p class="text-[13px] text-text-muted leading-relaxed m-0">来場者用駐車場はございません。京急線「金沢八景駅」またはシーサイドラインからの徒歩・バスをご利用ください。</p>
          </div>
          <div class="bg-white p-6 rounded-xl border-l-[5px] border-sprout-border shadow-sm">
            <h4 class="text-base font-extrabold text-sprout-title mb-2">総合案内・救護所</h4>
            <p class="text-[13px] text-text-muted leading-relaxed m-0">正門ロータリー付近に本部テントを設置しております。落とし物や迷子、体調不良の際はお気軽にお声がけください。</p>
          </div>
          <div class="bg-white p-6 rounded-xl border-l-[5px] border-sprout-border shadow-sm">
            <h4 class="text-base font-extrabold text-sprout-title mb-2">キャンパス内全面禁煙</h4>
            <p class="text-[13px] text-text-muted leading-relaxed m-0">キャンパス内は指定の喫煙所を除き全面禁煙です。ゴミの分別回収にご協力をお願いいたします。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



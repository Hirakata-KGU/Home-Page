<script setup lang="ts">
useSeoMeta({
  title: '平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭',
  description: '2026年10月31日(土)・11月1日(日)開催！第77回 平潟祭 『SPROUT』 関東学院大学 金沢八景キャンパスの学園祭公式サイト。',
});

// 1. 企画カードデータ（※アイコンSVG提供後に配置予定）
const featuredEvents = [
  {
    title: 'ステージパフォーマンス',
    badge: '屋内 & 屋外',
    desc: 'SCC4階ホールのスペシャルライブ＆芝生広場の軽音・ダンス！熱気あふれるステージをお届け。',
    to: '/events',
  },
  {
    title: '模擬店グルメ',
    badge: 'メインストリート',
    desc: '各サークル・学科が趣向を凝らした焼きそば、たこ焼き、スイーツなど美味しい屋台が大集合！',
    to: '/events',
  },
  {
    title: '文化・展示・体験',
    badge: '文化館・音楽館',
    desc: '研究発表、美術・写真展示、体験型ワークショップなど、学生の日頃の成果が咲き誇る。',
    to: '/events',
  },
];

// 2. ご案内カードデータ（電子パンフレット・平潟祭について・よくある質問 ※アイコンSVG提供後に配置予定）
const guideItems = [
  {
    title: '電子パンフレット',
    badge: 'Guidebook',
    desc: '当日のタイムスケジュール、キャンパスマップ、出店・企画リストが1冊にまとまった公式電子ガイドです。',
    to: '/pamphlet',
    linkText: 'パンフレットを見る',
  },
  {
    title: '平潟祭について',
    badge: 'About SPROUT',
    desc: '2026年度テーマ「sprout（スプラウト）」に込められた想いや、平潟祭の歴史・開催概要をご紹介します。',
    to: '/about',
    linkText: '平潟祭を知る',
  },
  {
    title: 'よくある質問',
    badge: 'FAQ',
    desc: '入場方法、事前予約、雨天時の開催、取材申請など、皆様から多く寄せられる質問と回答を掲載しています。',
    to: '/faq',
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

    <!-- 2. 企画セクション (背景: #437C62) -->
    <section class="w-full bg-sprout-moss py-12 px-0 relative z-[5]" id="events">
      <div class="section-container">
        <!-- Title -->
        <UiSectionTitle title="企画" text-color="text-sprout-accent" ornament-color="#DFF794" />

        <!-- 3 Cards Grid (絵文字不使用) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1126px] mb-8">
          <NuxtLink
            v-for="(item, idx) in featuredEvents"
            :key="idx"
            :to="item.to"
            class="group bg-white rounded-2xl p-7 min-h-[190px] flex flex-col justify-between no-underline shadow-[0_8px_24px_rgba(27,58,36,0.18)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)] border-2 border-transparent hover:border-sprout-light transition-all duration-300 hover:-translate-y-1.5"
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
            <div class="flex items-center justify-between text-[13px] font-bold text-sprout-border border-t border-gray-100 pt-2.5">
              <span>詳細を見る</span>
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </NuxtLink>
        </div>

        <!-- 説明文 & ボタン (絵文字不使用) -->
        <div class="text-center flex flex-col items-center gap-5 max-w-[800px]">
          <p class="font-sans font-bold text-base sm:text-lg lg:text-xl leading-relaxed text-white">
            音楽ライブ、模擬店グルメ、展示発表、参加型イベントなど盛りだくさん！<br>
            学生たちの情熱が芽吹き、咲き誇る特別な2日間をお楽しみください。
          </p>
          <NuxtLink to="/events" class="btn btn-gold px-9 py-3.5 text-base">
            全企画・模擬店一覧を見る
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 3. ご案内セクション (背景: #F8F8ED + 上部反転波) -->
    <section class="w-full bg-sprout-bg pb-16 relative z-[6]" id="guide">
      <!-- 反転した4層の波 (rotate 180deg) -->
      <div class="w-full h-fit leading-none" aria-hidden="true">
        <SvgWave class="w-full rotate-180" preserveAspectRatio="none" />
      </div>

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

    <!-- 4. ご来場にあたってセクション (背景: #F8F8ED) -->
    <section class="w-full bg-sprout-bg pt-2 pb-16 relative z-[6]" id="about">
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

    <!-- 5. アクセスセクション (背景: 白または淡い緑 ※絵文字不使用) -->
    <section class="w-full bg-sprout-bg pt-2 pb-20 relative z-[6]" id="access">
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
                  <li><strong>京急本線「金沢八景駅」</strong>より徒歩約15分</li>
                  <li><strong>シーサイドライン「金沢八景駅」</strong>より徒歩約15分</li>
                  <li>横浜駅から京急線快速特急で約20分、品川駅から約40分</li>
                </ul>
              </div>

              <!-- Bus -->
              <div class="border-t border-gray-100 pt-4">
                <h4 class="font-bold text-base text-sprout-title mb-2">
                  バスでお越しの方
                </h4>
                <ul class="text-sm text-text-muted leading-relaxed space-y-1.5 pl-5 list-disc">
                  <li><strong>京急バス「関東学院正門」</strong>下車すぐ（金沢八景駅東口より約5分）</li>
                </ul>
              </div>

              <!-- Car -->
              <div class="border-t border-gray-100 pt-4">
                <h4 class="font-bold text-base text-sprout-title mb-2">
                  お車でお越しの方
                </h4>
                <p class="text-sm text-text-muted leading-relaxed bg-sprout-bg/60 p-3 rounded-lg border-l-4 border-amber-500">
                  <strong>来場者用駐車場はございません。</strong><br>
                  近隣道路の混雑緩和のため、公共交通機関（京急線・バス）をご利用ください。
                </p>
              </div>

              <!-- Official Access Page Button -->
              <div class="pt-2">
                <a
                  href="https://univ.kanto-gakuin.ac.jp/about-university/location.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary text-sm px-6 py-3"
                >
                  大学公式アクセスページ →
                </a>
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
</template>

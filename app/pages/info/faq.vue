<script setup lang="ts">
useSeoMeta({
  title: 'よくあるご質問（FAQ）｜平潟祭 2026',
  description: '平潟祭2026に関するよくあるご質問。アクセス・駐車場、キャンパス内の施設などについてご案内します。',
});

// FAQカテゴリと質問一覧（絵文字不使用）
const faqCategories = [
  {
    category: 'ご来場・入場について',
    items: [
      {
        q: '体調不良の際はどうすればよいですか？',
        a: '正門近くの「本部テント」までお越しいただくか、近くの実行委員にお声がけください。'
      },
      {
        q: '入場料はかかりますか？事前予約は必要ですか？',
        a: '平潟祭は入場無料・事前予約不要です。一般の方、受験生、近隣住民の皆様、卒業生など、どなたでも自由にご入場いただけます。',
      },
      {
        q: '途中退場や再入場は可能ですか？',
        a: '可能です。開催時間内であれば自由に入退場いただけます。',
      },
      {
        q: '来場者用の駐車場や駐輪場はありますか？',
        a: '来場者用の駐車場、駐輪場はございません。公共交通機関（京急線・シーサイドライン）をご利用ください。',
      },
      {
        q: '最寄り駅からの行き方を教えてください。',
        a: '京急本線「金沢八景駅」またはシーサイドライン「金沢八景駅」より徒歩約15分です。土曜日に限り、金沢八景駅東口より京急バス「関東学院正門」行き（乗車約5分）もご利用いただけます。',
      },
    ],
  },
  {
    category: '模擬店・飲食・お支払いについて',
    items: [
      {
        q: '模擬店でのお支払いに電子マネーやクレジットカードは使えますか？',
        a: '模擬店では、現金とd払いのみご利用いただけます。その他電子マネーやクレジットカードはご利用いただけませんので、あらかじめご了承ください。',
      },
      {
        q: '飲食スペースや休憩所はありますか？',
        a: '3号館1階のローズにて、休憩・飲食スペースを設けております。また、ベンチもご利用いただけます。',
      },
    ],
  },
  {
    category: '施設・落とし物・その他',
    items: [
      {
        q: '落とし物や迷子の問い合わせはどこに行けばいいですか？',
        a: '正門「本部テント」にて落とし物の受付・保管を行っております。また、お困りの際はお近くの実行委員スタッフにお声がけください。',
      },
      {
        q: '取材や撮影を行いたい場合はどうすればよいですか？',
        a: '公式SNSより、お問い合わせください。',
      },
    ],
  },
];
</script>

<template>
  <div class="min-h-screen bg-sprout-bg">
    <!-- Page Header（絵文字不使用・※アイコンSVG提供後に配置予定） -->
    <LayoutPageHeader
      title="よくあるご質問"
      sub-title="Frequently Asked Questions"
      :breadcrumbs="[{ name: 'よくあるご質問' }]"
    />

    <div class="max-w-[1200px] mx-auto px-6 -mt-8 mb-20 relative z-10 flex flex-col gap-10">


      <!-- FAQ Categories Grid / List (Tailwind) -->
      <div class="flex flex-col gap-8">
        <section
          v-for="(cat, cIdx) in faqCategories"
          :key="cIdx"
          class="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-sprout-border/20"
        >
          <!-- Category Header -->
          <div class="flex items-center gap-3 pb-4 mb-6 border-b-2 border-sprout-bg">
            <!-- アイコンSVG提供後に配置予定 -->
            <h2 class="text-xl sm:text-2xl font-extrabold text-sprout-title m-0">
              {{ cat.category }}
            </h2>
          </div>

          <!-- Question & Answer Items -->
          <div class="flex flex-col gap-5">
            <div
              v-for="(item, iIdx) in cat.items"
              :key="iIdx"
              class="bg-sprout-bg/60 rounded-xl p-5 sm:p-6 border-l-4 border-sprout-border bg-sprout-bg shadow-md"
            >
              <h3 class="text-base sm:text-lg font-bold text-sprout-title mb-2.5 flex items-start gap-2.5">
                <span class="text-sprout-border font-black shrink-0">Q.</span>
                <span>{{ item.q }}</span>
              </h3>
              <div class="text-sm sm:text-base text-text-muted leading-relaxed pl-6 flex items-start gap-2.5">
                <span class="text-amber-600 font-black shrink-0 -ml-6">A.</span>
                <p class="m-0">{{ item.a }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

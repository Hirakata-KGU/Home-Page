<script setup lang="ts">
useSeoMeta({
  title: 'よくあるご質問（FAQ）｜平潟祭 2026',
  description: '平潟祭2026に関するよくあるご質問。入場料、事前予約、雨天時の開催、アクセス・駐車場、キャンパス内の施設などについてご案内します。',
});

// FAQカテゴリと質問一覧（絵文字不使用）
const faqCategories = [
  {
    category: 'ご来場・入場について',
    items: [
      {
        q: '入場料はかかりますか？事前予約は必要ですか？',
        a: '平潟祭は入場無料・事前予約不要です。一般の方、受験生、近隣住民の皆様、卒業生など、どなたでも自由にご入場いただけます。',
      },
      {
        q: '雨天の場合は開催されますか？',
        a: '雨天決行です。ただし、荒天（台風・大雨警報等）に伴い安全確保が困難と判断された場合は、屋外企画の中止やプログラムの変更を行う場合があります。最新情報は公式X（@shin_hirakata）にて随時お知らせいたします。',
      },
      {
        q: '途中退場や再入場は可能ですか？',
        a: '可能です。開催時間内であれば自由に入退場いただけます。',
      },
      {
        q: '車椅子やベビーカーでの来場は可能ですか？',
        a: 'ご来場いただけます。キャンパス内にはスロープやエレベーターが整備されております。介助が必要な際やご不明な点は、正門前の本部テントスタッフまでお気軽にお声がけください。',
      },
    ],
  },
  {
    category: 'アクセス・駐車場について',
    items: [
      {
        q: '来場者用の駐車場や駐輪場はありますか？',
        a: '来場者用の駐車場はございません。公共交通機関（京急線・シーサイドライン・路線バス）をご利用ください。自転車・バイクでお越しの方には臨時駐輪場を設けておりますので、誘導看板やスタッフの指示に従ってご利用ください。',
      },
      {
        q: '最寄り駅からの行き方を教えてください。',
        a: '京急本線「金沢八景駅」またはシーサイドライン「金沢八景駅」より徒歩約15分です。金沢八景駅東口より京急バス「関東学院正門」行き（乗車約5分）もご利用いただけます。',
      },
    ],
  },
  {
    category: '模擬店・飲食・お支払いについて',
    items: [
      {
        q: '模擬店でのお支払いに電子マネーやクレジットカードは使えますか？',
        a: '各店舗により異なりますが、手作り模擬店では現金のみの取り扱いとなる店舗が多くございます。一部キッチンカーではキャッシュレス決済に対応している場合がありますが、あらかじめ現金をご用意いただくことをおすすめいたします。',
      },
      {
        q: '飲食スペースや休憩所はありますか？',
        a: 'メインストリート周辺やSCC（学生センター）内、芝生広場などに休憩・飲食スペースを設けております。ゴミの分別回収にご協力をお願いいたします。',
      },
    ],
  },
  {
    category: '施設・落とし物・その他',
    items: [
      {
        q: '落とし物や迷子の問い合わせはどこに行けばいいですか？',
        a: '正門ロータリー前の「総合案内・本部テント」にて落とし物の受付・保管を行っております。お困りの際はお近くの実行委員スタッフにお声がけください。',
      },
      {
        q: '授乳室やおむつ交換台はありますか？',
        a: 'SCC（学生センター）内に授乳・おむつ交換スペースをご用意しております。ご利用の際は本部テントまたはインフォメーションまでお申し出ください。',
      },
      {
        q: '学内での喫煙は可能ですか？',
        a: 'キャンパス内は指定の喫煙所を除き全面禁煙です。受動喫煙防止と環境保全のため、指定場所以外での喫煙（加熱式タバコ含む）は固くお断りいたします。',
      },
      {
        q: '取材や撮影を行いたい場合はどうすればよいですか？',
        a: '報道機関や学外団体による取材・撮影には事前の申請が必要です。公式SNSのDMまたはお問い合わせ窓口より、媒体名・企画趣旨・人数を明記の上ご連絡ください。',
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
      <!-- Intro Section -->
      <section class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-t-4 border-sprout-border">
        <p class="text-base sm:text-lg text-text-muted leading-relaxed m-0">
          平潟祭に関する皆様からよくいただくご質問とその回答をまとめました。<br class="hidden sm:inline">
          こちらに掲載のないご不明な点がございましたら、お気軽に
          <NuxtLink to="/contact" class="text-sprout-forest font-bold underline hover:text-sprout-border">
            お問い合わせ窓口
          </NuxtLink>
          までご連絡ください。
        </p>
      </section>

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
              class="bg-sprout-bg/60 rounded-xl p-5 sm:p-6 border-l-4 border-sprout-border transition-all hover:bg-sprout-bg hover:shadow-sm"
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

      <!-- Contact Banner -->
      <section class="bg-gradient-to-r from-sprout-title to-sprout-forest text-white rounded-2xl p-8 sm:p-10 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-xl sm:text-2xl font-bold mb-2">他にご質問やお困りごとはございますか？</h3>
          <p class="text-sm sm:text-base text-white/80 m-0">
            公式SNS（X / Instagram）のダイレクトメッセージでも随時ご質問を受け付けております。
          </p>
        </div>
        <NuxtLink to="/contact" class="btn btn-gold shrink-0 px-8 py-3.5 text-base">
          お問い合わせはこちら →
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

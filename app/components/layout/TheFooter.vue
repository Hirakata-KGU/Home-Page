<script setup lang="ts">
const footerSections = [
  {
    title: 'TOP',
    columns: [
      [{ label: 'ホームページ', to: '/' }]
    ]
  },
  {
    title: '企画',
    columns: [
      [
        { label: '企画一覧', to: '/events' },
        { label: 'タイムテーブル', to: '/schedule' }
      ],
      [
        { label: '全体・模擬店マップ', to: '/map' },
        { label: '音楽館マップ', to: '/map' },
        { label: '文化館マップ', to: '/map' },
        { label: '3号館マップ', to: '/map' }
      ]
    ]
  },
  {
    title: 'ご案内',
    columns: [
      [
        { label: 'アクセス', to: '/#access' },
        { label: '電子パンフレット', to: '/pamphlet' },
        { label: '平潟祭について', to: '/about' },
        { label: 'FAQ', to: '/faq' },
        { label: 'お問い合わせ', to: '/contact' }
      ]
    ]
  }
];
</script>

<template>
  <footer class="w-full relative overflow-hidden mt-0 p-0">
    <svg width="1248" height="105" viewBox="0 0 1248 105" fill="#1B3A24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <path d="M0 105L29.64 90.9879C59.41 77.2453 118.69 49.2212 178.1 30.8978C237.51 12.5743 296.79 3.41257 356.2 1.25687C415.61 -0.898831 438.83 -0.394002 498.5 3.64794C558.04 7.68988 653.9 22.6283 713.44 34.7541C773.11 46.8799 832.39 59.9998 891.8 70.5088C951.21 80.7484 1010.49 80.7484 1069.9 74.5508C1129.31 68.0837 1188.59 55.6883 1218.36 49.2212L1248 43.0236V105H1218.36C1188.59 105 1129.31 105 1069.9 105C1010.49 105 951.21 105 891.8 105C832.39 105 773.11 105 713.44 105C653.9 105 594.1 105 534.56 105C474.89 105 415.61 105 356.2 105C296.79 105 237.51 105 178.1 105C118.69 105 59.41 105 29.64 105H0Z"/>
    </svg>

    <div class="flex flex-col justify-center items-center px-2 pt-1 pb-10 w-full bg-sprout-dark">
      <div class="flex flex-col items-center gap-8 w-full max-w-[1136px]">
        <!-- Navigation Columns -->
        <div class="flex flex-col items-center lg:flex-row justify-between w-full gap-8">
          <!-- Col 1: Brand -->
          <div class="w-fit lg:w-[280px] shrink-0 items-center">
            <div class="flex flex-col items-center gap-2">
              <div class="w-20 h-20 bg-sprout-light rounded-full flex items-center justify-center p-2.5 shadow-md">
                <img src="/images/hirakata-logo.png" alt="平潟祭ロゴ" class="w-full h-full object-contain" />
              </div>
              <span class="font-serif font-bold text-2xl leading-[34px] text-white">平潟祭 2026</span>
              <span class="text-xs text-white/70">関東学院大学 金沢八景キャンパス</span>
            </div>
          </div>

          <div class="flex w-full justify-around max-w-[800px]">
            <div
              v-for="sec in footerSections"
              :key="sec.title"
              class="flex flex-col items-start gap-3 w-fit"
            >
              <div class="w-full">
                <span class="font-sans font-bold text-sm leading-[18px] text-sprout-light tracking-wider">{{ sec.title }}</span>
                <div class="w-full h-0 border-t border-sprout-border"></div>
              </div>
              <div class="flex flex-col sm:flex-row gap-3 w-fit">
                <ul
                  v-for="(col, cIdx) in sec.columns"
                  :key="cIdx"
                  class="list-none p-0 m-0 flex flex-col gap-3 w-fit sm:w-[140px]"
                >
                  <li v-for="link in col" :key="link.label">
                    <NuxtLink :to="link.to" class="font-sans font-normal pr-1 text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 hover:pr-0 transition-all">
                      {{ link.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- TOP -->
        </div>



        <!-- Bottom Line & Copyright -->
        <div class="flex flex-col gap-3.5 w-[95%]">
          <div class="w-full h-0 border-t border-sprout-border"></div>
          <div class="flex justify-between items-center">
            <span class="font-sans font-normal text-xs leading-[14px] text-sprout-accent">
              © 2026 平潟祭実行委員会 All rights reserved.
            </span>
                    <!-- Social Icons Row -->
        <div class="flex gap-3 self-start">
          <a
            href="https://x.com/shin_hirakata?s=21&t=XXyLV91kkOMKW_oin9wA0w"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-social-btn"
            aria-label="公式X"
          >
            <SvgX class="w-4 h-4 fill-white" />
          </a>
          <a
            href="https://www.instagram.com/hirakatasai?igsh=MWRvYmxxa3FjYnhvcg=="
            target="_blank"
            rel="noopener noreferrer"
            class="footer-social-btn"
            aria-label="公式Instagram"
          >
            <SvgInstagram class="w-4 h-4" stroke-color="#FFFFFF" />
          </a>
        </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style>
  /* Footer Navigation */
  .footer-social-btn {
    @apply inline-flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-sprout-light hover:text-sprout-dark text-white rounded-full no-underline text-base transition-colors;
  }
</style>
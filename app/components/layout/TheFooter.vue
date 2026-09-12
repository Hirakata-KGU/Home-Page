<template>
  <footer class="w-full bg-sprout-dark relative overflow-hidden mt-0 p-0">
    <!-- Top Transition / Vector Arch -->
    <div class="w-full h-10 overflow-hidden leading-none" aria-hidden="true">
      <svg viewBox="0 0 1920 60" preserveAspectRatio="none" class="w-full h-10 block">
        <path d="M0,0 Q960,60 1920,0 L1920,60 L0,60 Z" fill="#1B3A24" />
      </svg>
    </div>

    <div class="flex flex-col justify-center items-center px-6 pt-5 pb-10 w-full">
      <div class="flex flex-col items-center gap-8 w-full max-w-[1136px]">
        <!-- Columns -->
        <div class="flex flex-col lg:flex-row justify-between items-start w-full gap-8">
          <!-- Col 1: Brand -->
          <div class="w-full lg:w-[280px] shrink-0">
            <div class="flex flex-col items-start gap-2">
              <div class="w-20 h-20 bg-sprout-light rounded-full flex items-center justify-center p-2.5 shadow-md">
                <img src="/images/hirakata-logo.png" alt="平潟祭ロゴ" class="w-full h-full object-contain" />
              </div>
              <span class="font-serif font-bold text-2xl leading-[34px] text-white">平潟祭 2026</span>
              <span class="text-xs text-white/70">関東学院大学 金沢八景キャンパス</span>
            </div>
          </div>

          <!-- Col 2: TOP -->
          <div class="flex flex-col items-start gap-3 w-full lg:w-[140px]">
            <div class="flex flex-col gap-1 w-full">
              <span class="font-sans font-bold text-sm leading-[18px] text-sprout-light tracking-wider">TOP</span>
              <div class="w-full h-0 border-t border-sprout-border"></div>
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <NuxtLink to="/" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                  ホームページ
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Col 3: 企画 (2 sub-columns) -->
          <div class="flex flex-col items-start gap-3 w-full lg:w-[336px]">
            <div class="flex flex-col gap-1 w-full">
              <span class="font-sans font-bold text-sm leading-[18px] text-sprout-light tracking-wider">企画</span>
              <div class="w-full h-0 border-t border-sprout-border"></div>
            </div>
            <div class="flex flex-col sm:flex-row gap-6 w-full">
              <ul class="list-none p-0 m-0 flex flex-col gap-3">
                <li>
                  <NuxtLink to="/events" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                    企画一覧
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/schedule" class="font-sans font-normal text-[13px] leading-4 pr-1 text-white no-underline hover:text-sprout-accent hover:pl-1 hover:pr-0 transition-all">
                    タイムテーブル
                  </NuxtLink>
                </li>
              </ul>
              <ul class="list-none p-0 m-0 flex flex-col gap-3">
                <li>
                  <NuxtLink to="/map" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                    全体・模擬店マップ
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/map" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                    音楽館マップ
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/map" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                    文化館マップ
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/map" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                    3号館マップ
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Col 4: ご案内 -->
          <div class="flex flex-col items-start gap-3 w-full lg:w-[180px]">
            <div class="flex flex-col gap-1 w-full">
              <span class="font-sans font-bold text-sm leading-[18px] text-sprout-light tracking-wider">ご案内</span>
              <div class="w-full h-0 border-t border-sprout-border"></div>
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <NuxtLink to="/access" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                  アクセス
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/#about" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                  平潟祭について
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                  協賛について
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="font-sans font-normal text-[13px] leading-4 text-white no-underline hover:text-sprout-accent hover:pl-1 transition-all">
                  お問い合わせ
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Social Icons Row -->
        <div class="flex gap-3 self-start">
          <a
            href="https://x.com/shin_hirakata?s=21&t=XXyLV91kkOMKW_oin9wA0w"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-sprout-light hover:text-sprout-dark text-white rounded-full no-underline text-base transition-colors"
            aria-label="公式X"
          >
            𝕏
          </a>
          <a
            href="https://www.instagram.com/hirakatasai?igsh=MWRvYmxxa3FjYnhvcg=="
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-sprout-light hover:text-sprout-dark text-white rounded-full no-underline text-base transition-colors"
            aria-label="公式Instagram"
          >
            📷
          </a>
        </div>

        <!-- Bottom Line & Copyright -->
        <div class="flex flex-col gap-3.5 w-full">
          <div class="w-full h-0 border-t border-sprout-border"></div>
          <div class="flex justify-between items-center">
            <span class="font-sans font-normal text-xs leading-[14px] text-sprout-accent">
              © 2026 平潟祭実行委員会 All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
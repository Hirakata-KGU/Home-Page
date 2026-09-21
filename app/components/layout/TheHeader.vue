<script setup lang="ts">
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// ナビゲーション項目（企画関連はまとめずに個別に配置）
const mainNavItems = [
  { name: 'TOP', to: '/' },
  { name: '企画一覧', to: '/events' },
  { name: 'タイムテーブル', to: '/schedule' },
  { name: '場内マップ', to: '/map' },
];

// ご案内メニュー（ホバーでドロップダウン展開、アクセスは index.vue#access に遷移）
const guideSubItems = [
  { name: '電子パンフレット', to: '/info/pamphlet'},
  { name: '平潟祭について', to: '/info/about'},
  { name: 'よくある質問', to: '/info/faq'},
  { name: 'アクセス', to: '/#access'},
];
</script>

<template>
  <header class="sticky top-0 w-full h-[80px] bg-white shadow-header z-[1000] flex justify-center items-center">
    <div class="w-full max-w-[1920px] h-full px-6 lg:px-[51px] flex flex-row justify-between items-center gap-8">
      <!-- Left: Brand -->
      <NuxtLink to="/" class="flex flex-row items-center gap-[15px] h-[80px] no-underline shrink-0" @click="closeMobileMenu">
        <div class="w-[68px] h-[68px] flex items-center justify-center">
          <img src="/images/hirakata-logo.png" alt="平潟祭ロゴ" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col justify-center items-start">
          <span class="font-sans font-light text-[17px] leading-[20px] text-black">第77回</span>
          <span class="font-serif font-semibold text-[30px] leading-[28px] text-black tracking-[1px]">平潟祭</span>
        </div>
      </NuxtLink>

      <!-- Center: Menu-Links（企画はまとめず展開、ご案内のみドロップダウン） -->
      <nav class="hidden lg:flex flex-row items-center gap-7 h-[80px]" aria-label="ヘッダーメニュー">
        <!-- TOP, 企画一覧, タイムテーブル, 場内マップ -->
        <NuxtLink
          v-for="item in mainNavItems"
          :key="item.to"
          :to="item.to"
          class="group flex flex-col items-center justify-center gap-1 no-underline h-[80px] relative transition-opacity"
          :class="{ 'is-active': $route.path === item.to }"
        >
          <span
            class="font-sans text-[15px] leading-[22px] text-sprout-forest transition-colors"
            :class="$route.path === item.to ? 'font-bold text-sprout-border' : 'font-medium group-hover:text-sprout-border'"
          >
            {{ item.name }}
          </span>
          <span
            class="w-[14px] h-[2.5px] bg-sprout-border rounded-[1px] transition-all duration-200"
            :class="$route.path === item.to ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'"
          ></span>
        </NuxtLink>

        <!-- ご案内 (ホバーでドロップダウン展開、アクセスは index.vue#access に遷移) -->
        <div class="group flex flex-col items-center justify-center gap-1 no-underline h-[80px] relative transition-opacity">
          <button
            type="button"
            class="flex items-center gap-1.5 bg-transparent border-none p-0 cursor-pointer text-sprout-forest transition-colors font-sans text-[15px] leading-[22px]"
            :class="['/info/about', '/info/pamphlet', '/info/faq'].includes($route.path) ? 'font-bold text-sprout-border' : 'font-medium group-hover:text-sprout-border'"
          >
            <span>ご案内</span>
            <!-- CSS chevron arrow (絵文字不使用) -->
            <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <!-- 下線インジケータ（他アイテムと完全に同じ位置・gapで配置） -->
          <span
            class="w-[14px] h-[2.5px] bg-sprout-border rounded-[1px] transition-all duration-200"
            :class="['/info/about', '/info/pamphlet', '/info/faq'].includes($route.path) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'"
          ></span>

          <!-- ドロップダウンメニュー（絵文字不使用） -->
          <div class="dropdown-menu">
            <div class="dropdown-container">
              <NuxtLink
                v-for="sub in guideSubItems"
                :key="sub.name"
                :to="sub.to"
                class="dropdown-item"
              >
                <!-- アイコン用スロット（※アイコンSVG提供後に配置予定） -->
                <div class="flex flex-col">
                  <span class="dropdown-item-title">{{ sub.name }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>

      <!-- Right: お問い合わせボタン（絵文字不使用） -->
      <div class="hidden lg:block shrink-0">
        <NuxtLink to="/info/contact" class="btn-pill-green">
          <span>お問い合わせ</span>
        </NuxtLink>
      </div>

      <!-- Mobile Menu Hamburger Button (SVG/CSSアイコン使用、絵文字不使用) -->
      <button
        class="lg:hidden flex flex-col justify-center items-center gap-1.5 w-[44px] h-[44px] bg-sprout-border hover:bg-[#356b48] text-white rounded-lg cursor-pointer border-none transition-colors"
        :aria-expanded="isMobileMenuOpen"
        aria-label="メニューを開閉"
        @click="toggleMobileMenu"
      >
        <span v-if="!isMobileMenuOpen" class="w-5 h-0.5 bg-white rounded-full"></span>
        <span v-if="!isMobileMenuOpen" class="w-5 h-0.5 bg-white rounded-full"></span>
        <span v-if="!isMobileMenuOpen" class="w-5 h-0.5 bg-white rounded-full"></span>
        <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Mobile Drawer (絵文字不使用) -->
    <transition name="drawer">
      <nav
        v-if="isMobileMenuOpen"
        class="lg:hidden flex flex-col bg-white absolute top-[80px] left-0 w-full px-6 py-6 shadow-[0_12px_24px_rgba(0,0,0,0.15)] border-t border-[#ECECEC] gap-2 max-h-[calc(100vh-80px)] overflow-y-auto"
        aria-label="モバイルナビゲーション"
      >
        <NuxtLink
          v-for="item in mainNavItems"
          :key="item.to"
          :to="item.to"
          class="font-sans text-[16px] text-sprout-forest no-underline p-3 rounded-lg font-medium hover:bg-sprout-bg transition-colors"
          :class="{ 'bg-sprout-bg text-sprout-border font-bold': $route.path === item.to }"
          @click="closeMobileMenu"
        >
          {{ item.name }}
        </NuxtLink>

        <!-- ご案内 Group -->
        <div class="border-t border-gray-100 pt-2">
          <div class="p-2 text-xs font-bold text-text-muted tracking-wider">
            ご案内
          </div>
          <div class="pl-2 flex flex-col gap-1">
            <NuxtLink
              v-for="sub in guideSubItems"
              :key="sub.name"
              :to="sub.to"
              class="flex flex-col p-2.5 rounded-lg text-[15px] text-sprout-forest no-underline hover:bg-sprout-bg transition-colors"
              :class="{ 'text-sprout-border font-bold bg-sprout-bg/60': $route.path === sub.to }"
              @click="closeMobileMenu"
            >
              <span class="font-bold">{{ sub.name }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- お問い合わせ Button -->
        <div class="border-t border-gray-100 pt-3 mt-1">
          <NuxtLink
            to="/info/contact"
            class="flex justify-center items-center bg-sprout-border text-white font-sans font-bold text-[16px] p-3.5 rounded-full no-underline shadow-md hover:bg-[#356b48] transition-colors"
            @click="closeMobileMenu"
          >
            お問い合わせ
          </NuxtLink>
        </div>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
/* ドロップダウンメニューの共通スタイリング */
.dropdown-menu {
  @apply absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-[1100];
}

.dropdown-container {
  @apply bg-white rounded-2xl p-3 shadow-[0_12px_32px_rgba(27,58,36,0.18)] border border-sprout-border/20 min-w-[240px] flex flex-col gap-1.5 backdrop-blur-md;
}

.dropdown-item {
  @apply flex items-center p-3 rounded-xl no-underline transition-all duration-150 hover:bg-sprout-bg text-sprout-forest;
}

.dropdown-item-title {
  @apply font-bold text-[14px] text-sprout-title leading-tight;
}

.dropdown-item-desc {
  @apply text-[11px] text-text-muted mt-0.5;
}

.dropdown-item:hover .dropdown-item-title {
  @apply text-sprout-border;
}

/* モバイルドロワーアニメーション */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

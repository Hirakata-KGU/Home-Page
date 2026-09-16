<script setup lang="ts">
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const navItems = [
  { name: 'Home', to: '/' },
  { name: '企画一覧', to: '/events' },
  { name: 'タイムテーブル', to: '/schedule' },
  { name: '場内マップ', to: '/map' },
  { name: 'ご案内', to: '/access' },
];
</script>

<template>
  <header class="sticky top-0 w-full h-[80px] bg-white shadow-header z-[1000] flex justify-center items-center">
    <div class="w-full max-w-[1920px] h-full px-6 lg:px-[51px] flex flex-row justify-between items-center gap-8">
      <!-- Left: Brand (Frame 6) -->
      <NuxtLink to="/" class="flex flex-row items-center gap-[15px] h-[80px] no-underline shrink-0" @click="closeMobileMenu">
        <!-- 平実 1: Logo -->
        <div class="w-[76px] h-[76px] flex items-center justify-center">
          <img src="/images/hirakata-logo.png" alt="平実ロゴ" class="w-full h-full object-contain" />
        </div>
        <!-- Title text block -->
        <div class="flex flex-col justify-center items-start">
          <span class="font-sans font-light text-[18px] leading-[22px] text-black">第77回</span>
          <span class="font-serif font-semibold text-[32px] leading-[30px] text-black tracking-[1px]">平潟祭</span>
        </div>
      </NuxtLink>

      <!-- Center: Menu-Links -->
      <nav class="hidden lg:flex flex-row items-center gap-8 h-[80px]" aria-label="ヘッダーメニュー">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="group flex flex-col items-center justify-center gap-1 no-underline h-[100px] relative transition-opacity"
          :class="{ 'is-active': $route.path === item.to }"
        >
          <span
            class="font-sans text-[16px] leading-[24px] text-sprout-forest transition-colors"
            :class="$route.path === item.to ? 'font-bold' : 'font-medium group-hover:text-sprout-border'"
          >
            {{ item.name }}
          </span>
          <span
            class="w-[12px] h-[2px] bg-sprout-border rounded-[1px] transition-all duration-200"
            :class="$route.path === item.to ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'"
          ></span>
        </NuxtLink>
      </nav>

      <!-- Right: Button (Frame 9) -->
      <div class="hidden lg:block shrink-0">
        <NuxtLink to="/contact" class="btn-pill-green">
          <span>お問い合わせ</span>
        </NuxtLink>
      </div>

      <!-- Mobile Menu Hamburger Button -->
      <button
        class="lg:hidden flex items-center justify-center w-[44px] h-[44px] bg-sprout-border hover:bg-[#356b48] text-white rounded-lg text-2xl cursor-pointer border-none transition-colors"
        :aria-expanded="isMobileMenuOpen"
        aria-label="メニューを開閉"
        @click="toggleMobileMenu"
      >
        <span v-if="!isMobileMenuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <transition name="drawer">
      <nav v-if="isMobileMenuOpen" class="lg:hidden flex flex-col bg-white absolute top-[100px] left-0 w-full px-6 py-8 shadow-[0_10px_20px_rgba(0,0,0,0.15)] border-t border-[#ECECEC] gap-3" aria-label="モバイルナビゲーション">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="font-sans text-[18px] text-sprout-forest no-underline p-3 rounded-lg transition-colors"
          :class="$route.path === item.to ? 'bg-sprout-bg font-bold text-sprout-border' : 'font-medium hover:bg-sprout-bg'"
          @click="closeMobileMenu"
        >
          <span>{{ item.name }}</span>
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="flex justify-center items-center bg-sprout-border text-white font-sans font-medium text-[18px] p-3.5 rounded-full no-underline mt-2"
          @click="closeMobileMenu"
        >
          お問い合わせ
        </NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
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



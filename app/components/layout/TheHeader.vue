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
  <header class="figma-header">
    <div class="header-inner">
      <!-- Left: Brand (Frame 6) -->
      <NuxtLink to="/" class="header-brand" @click="closeMobileMenu">
        <!-- 平実 1: Logo -->
        <div class="brand-logo-container">
          <img src="/images/hirakata-logo.png" alt="平実ロゴ" class="brand-logo-img" />
        </div>
        <!-- Title text block -->
        <div class="brand-title-block">
          <span class="brand-edition">第77回</span>
          <span class="brand-name">平潟祭</span>
        </div>
      </NuxtLink>

      <!-- Center: Menu-Links -->
      <nav class="desktop-menu-links" aria-label="ヘッダーメニュー">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="menu-link-item"
          :class="{ 'is-active': $route.path === item.to }"
        >
          <span class="link-label">{{ item.name }}</span>
          <span class="active-indicator"></span>
        </NuxtLink>
      </nav>

      <!-- Right: Button (Frame 9) -->
      <div class="header-action">
        <NuxtLink to="/contact" class="contact-button-frame">
          <span class="contact-button-text">お問い合わせ</span>
        </NuxtLink>
      </div>

      <!-- Mobile Menu Hamburger Button -->
      <button
        class="mobile-menu-btn"
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
      <nav v-if="isMobileMenuOpen" class="mobile-drawer" aria-label="モバイルナビゲーション">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="mobile-nav-link"
          :class="{ 'mobile-active': $route.path === item.to }"
          @click="closeMobileMenu"
        >
          <span>{{ item.name }}</span>
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="mobile-contact-btn"
          @click="closeMobileMenu"
        >
          お問い合わせ
        </NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
/* Header Container */
.figma-header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100px;
  background: #FFFFFF;
  box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-inner {
  width: 100%;
  max-width: 1920px;
  height: 100%;
  padding: 0 51px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

/* Left Brand (Frame 6) */
.header-brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  height: 100px;
  text-decoration: none;
  flex-shrink: 0;
}

/* 平実 1 */
.brand-logo-container {
  width: 76px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Frame 6 (Text) */
.brand-title-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

/* 第77回 */
.brand-edition {
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}

/* 平潟祭 */
.brand-name {
  font-family: 'Noto Serif JP', serif;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 44px;
  color: #000000;
  letter-spacing: 1px;
}

/* Center Menu-Links */
.desktop-menu-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  height: 100px;
}

.menu-link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  height: 100px;
  position: relative;
  transition: opacity 0.2s ease;
}

.link-label {
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #2C5E3B;
  transition: all 0.2s ease;
}

/* Rectangle Indicator */
.active-indicator {
  width: 12px;
  height: 2px;
  background: #42845A;
  border-radius: 1px;
  opacity: 0;
  transform: scaleX(0);
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.menu-link-item:hover .link-label {
  color: #42845A;
}

.menu-link-item:hover .active-indicator {
  opacity: 0.6;
  transform: scaleX(1);
}

.menu-link-item.is-active .link-label {
  font-weight: 700;
}

.menu-link-item.is-active .active-indicator {
  opacity: 1;
  transform: scaleX(1);
}

/* Right Button (Frame 9) */
.header-action {
  flex-shrink: 0;
}

.contact-button-frame {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 28px;
  min-width: 160px;
  height: 52px;
  background: #42845A;
  border-radius: 71px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(66, 132, 90, 0.25);
}

.contact-button-frame:hover {
  background: #356b48;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(66, 132, 90, 0.35);
}

.contact-button-text {
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 24px;
  color: #FFFFFF;
}

/* Mobile Hamburger */
.mobile-menu-btn {
  display: none;
  background: #42845A;
  color: white;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  font-size: 24px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.mobile-menu-btn:hover {
  background: #356b48;
}

/* Mobile Drawer */
.mobile-drawer {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  padding: 20px 24px 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  border-top: 1px solid #ECECEC;
  gap: 12px;
}

.mobile-nav-link {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #2C5E3B;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.mobile-active {
  background: #F8F8ED;
  font-weight: 700;
  color: #42845A;
}

.mobile-contact-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #42845A;
  color: #FFFFFF;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 500;
  font-size: 18px;
  padding: 14px;
  border-radius: 50px;
  text-decoration: none;
  margin-top: 8px;
}

/* Drawer Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Breakpoints */
@media (max-width: 1100px) {
  .header-inner {
    padding: 0 24px;
    gap: 16px;
  }

  .desktop-menu-links {
    gap: 18px;
  }

  .link-label {
    font-size: 17px;
  }

  .contact-button-text {
    font-size: 17px;
  }

  .contact-button-frame {
    padding: 12px 20px;
    min-width: 140px;
  }
}

@media (max-width: 900px) {
  .desktop-menu-links,
  .header-action {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>


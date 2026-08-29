<script setup lang="ts">
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const navLinks = [
  { name: 'ホーム', to: '/' },
  { name: '企画一覧', to: '/events' },
  { name: 'タイムテーブル', to: '/schedule' },
  { name: '場内マップ', to: '/map' },
  { name: 'アクセス', to: '/access' },
  { name: 'お問い合わせ', to: '/contact' },
];
</script>

<template>
  <header>
    <div class="header-inner">
      <NuxtLink to="/" class="brand" @click="closeMobileMenu">
        <div class="brand-logo-wrapper">
          <img src="/images/hirakata-logo.png" alt="平潟祭ロゴ" class="brand-img" />
        </div>
        <div class="brand-text">
          <div class="title">平潟祭 2026</div>
          <div class="subtitle">Hirakata Festival</div>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" aria-label="メインナビゲーション">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-item"
          :class="{ 'contact-nav-item': link.to === '/contact' }"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
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

    <!-- Mobile Drawer Navigation -->
    <transition name="drawer">
      <nav v-if="isMobileMenuOpen" class="mobile-drawer" aria-label="モバイルナビゲーション">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="mobile-nav-link"
          :class="{ 'mobile-contact-link': link.to === '/contact' }"
          @click="closeMobileMenu"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  background: rgba(219, 255, 242, 0.98);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  z-index: 1000;
  box-shadow: var(--shadow-sm);
}

.header-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
}

.brand-logo-wrapper {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  padding: 4px;
}

.brand-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-text .title {
  font-weight: 900;
  color: var(--olive);
  font-size: 20px;
  letter-spacing: 0.5px;
}

.brand-text .subtitle {
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
}

.desktop-nav {
  display: flex;
  gap: 6px;
  align-items: center;
}

.nav-item {
  font-weight: 700;
  text-decoration: none;
  color: var(--muted);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.25s ease;
}

.nav-item:hover {
  color: var(--olive);
  background: var(--accent-2);
}

.nav-item.router-link-exact-active,
.nav-item.router-link-active:not([href="/"]) {
  color: var(--olive);
  background: var(--accent-2);
  font-weight: 800;
}

/* Contact button highlight */
.contact-nav-item {
  background: var(--olive);
  color: white !important;
  border-radius: 20px;
  padding: 8px 18px;
  margin-left: 6px;
}

.contact-nav-item:hover {
  background: var(--olive-light);
}

.contact-nav-item.router-link-exact-active {
  background: var(--olive-dark);
}

.mobile-menu-btn {
  display: none;
  background: var(--olive);
  color: white;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  font-size: 22px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.mobile-menu-btn:hover {
  background: var(--olive-light);
}

.mobile-drawer {
  display: flex;
  flex-direction: column;
  background: rgba(219, 255, 242, 0.99);
  border-top: 1px solid var(--border);
  padding: 12px 24px 24px;
  box-shadow: var(--shadow-md);
}

.mobile-nav-link {
  font-weight: 700;
  text-decoration: none;
  color: var(--olive);
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 15px;
  border-bottom: 1px solid rgba(47, 91, 52, 0.1);
  transition: all 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-exact-active {
  background: var(--accent-2);
  font-weight: 800;
}

.mobile-contact-link {
  background: var(--olive);
  color: white !important;
  border-radius: 8px;
  margin-top: 8px;
  text-align: center;
  border-bottom: none;
}

/* Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>

<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <!-- Theme Badge -->
        <div class="theme-pill">
          <span class="sprout-icon">🌱</span>
          <span class="theme-text">2026 Theme: <strong>sprout</strong></span>
        </div>

        <div class="date-badge">2026.10.31 SAT - 11.1 SUN</div>

        <h1>平潟祭 2026</h1>

        <p class="hero-tagline">
          芽吹く、情熱。咲き誇る、瞬間。<br>
          学生の「いま」と「未来」が交差する2日間。<br>
          金沢八景から、新しい学祭体験が芽吹きはじめる。
        </p>

        <div class="cta-buttons">
          <NuxtLink to="/events" class="btn btn-gold">企画を探す 🎪</NuxtLink>
          <NuxtLink to="/schedule" class="btn btn-hero-secondary">タイムテーブル 📅</NuxtLink>
          <NuxtLink to="/map" class="btn btn-hero-secondary">場内マップ 🗺️</NuxtLink>
        </div>
      </div>

      <div class="hero-badge">
        <div class="sprout-leaf-deco">🌱</div>
        <UiCountdownTimer target-date="2026-10-31T10:00:00" />
        <div class="hero-badge-logo">
          <img src="/images/hirakata-logo.png" alt="平潟祭ロゴ" />
        </div>
        <p class="campus-univ">関東学院大学</p>
        <p class="campus-name">金沢八景キャンパス</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  background:
    linear-gradient(135deg, rgba(27, 94, 32, 0.94) 0%, rgba(46, 125, 50, 0.88) 50%, rgba(30, 61, 38, 0.95) 100%),
    url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed;
  min-height: 85vh;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top right, rgba(165, 214, 167, 0.25) 0%, transparent 60%),
    radial-gradient(circle at bottom left, rgba(251, 191, 36, 0.15) 0%, transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 80px 24px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: center;
  width: 100%;
}

.theme-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 8px 18px;
  border-radius: 50px;
  margin-bottom: 16px;
  animation: fadeInUp 0.8s ease 0.1s both;
}

.sprout-icon {
  font-size: 18px;
}

.theme-text {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.theme-text strong {
  font-size: 16px;
  font-weight: 900;
  color: var(--sun-gold-light);
  letter-spacing: 1px;
}

.hero-text .date-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--sun-gold) 0%, var(--sun-gold-light) 100%);
  color: #1a2e1c;
  padding: 10px 22px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-text h1 {
  font-size: 58px;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 20px;
  animation: fadeInUp 0.8s ease 0.3s both;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-tagline {
  font-size: 19px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  margin-bottom: 32px;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.cta-buttons {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease 0.5s both;
}

.btn-hero-secondary {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: white;
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: white;
  transform: translateY(-2px);
}

.hero-badge {
  background: white;
  padding: 32px;
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: fadeInRight 0.8s ease 0.6s both;
  position: relative;
  border: 3px solid var(--sprout-bg);
}

.sprout-leaf-deco {
  position: absolute;
  top: -16px;
  right: 24px;
  font-size: 32px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
  animation: bounce 3s infinite;
}

.hero-badge-logo {
  width: 110px;
  height: 110px;
  margin: 0 auto 14px;
  background: linear-gradient(135deg, var(--sprout) 0%, var(--sprout-light) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  padding: 12px;
}

.hero-badge-logo img {
  width: 75%;
  height: 75%;
  object-fit: contain;
}

.campus-univ {
  color: var(--sprout-dark);
  font-weight: 900;
  font-size: 18px;
  margin-top: 4px;
}

.campus-name {
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-badge {
    max-width: 400px;
    margin: 0 auto;
  }

  .cta-buttons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 38px;
  }

  .hero-tagline {
    font-size: 15px;
  }
}
</style>

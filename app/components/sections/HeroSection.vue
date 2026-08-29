<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <div class="date-badge">2026.10.31 SAT - 11.1 SUN</div>
        <h1>平潟祭 2026</h1>
        <p>
          学生の「つながる」を形に。<br>
          音と文化が交差する2日間。<br>
          金沢八景から、新しい学祭体験を。
        </p>
        <div class="cta-buttons">
          <a href="#events" class="btn btn-primary">企画を見る</a>
          <a href="#schedule" class="btn btn-secondary">タイムテーブル</a>
        </div>
      </div>

      <div class="hero-badge">
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
    linear-gradient(135deg, rgba(47, 91, 52, 0.92) 0%, rgba(30, 61, 38, 0.88) 100%),
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
  background: radial-gradient(circle at top right, rgba(201, 168, 90, 0.15) 0%, transparent 60%);
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

.hero-text h1 {
  font-size: 58px;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 20px;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-text .date-badge {
  display: inline-block;
  background: rgba(201, 168, 90, 0.9);
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease 0.3s both;
}

.hero-text p {
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  margin-bottom: 32px;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease 0.5s both;
}

.hero-badge {
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: fadeInRight 0.8s ease 0.6s both;
}

.hero-badge-logo {
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
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
  color: var(--olive);
  font-weight: 800;
  font-size: 18px;
  margin-top: 8px;
}

.campus-name {
  color: var(--muted);
  font-size: 14px;
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
    font-size: 36px;
  }

  .hero-text p {
    font-size: 16px;
  }
}
</style>

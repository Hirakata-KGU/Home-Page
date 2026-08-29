<script setup lang="ts">
useSeoMeta({
  title: '平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭',
  description: '2026年10月31日(土)・11月1日(日)開催！関東学院大学 金沢八景キャンパスの学園祭「平潟祭」公式サイト。音楽ライブ、模擬店、展示、ステージパフォーマンスなど盛りだくさん。',
});

const pageCards = [
  {
    to: '/events',
    icon: '🎪',
    title: '企画・模擬店一覧',
    desc: '音楽ライブ、ダンス、模擬店グルメ、展示発表などをカテゴリ別に検索！',
    btnText: '企画を探す',
  },
  {
    to: '/schedule',
    icon: '📅',
    title: 'タイムテーブル',
    desc: '屋内ステージ・屋外ステージの並列タイムテーブルで進行表をチェック。',
    btnText: 'タイムテーブルへ',
  },
  {
    to: '/map',
    icon: '🗺️',
    title: '場内マップ',
    desc: 'キャンパス全体＆模擬店マップ、文化館・音楽館のフロアマップはこちら。',
    btnText: 'マップを見る',
  },
  {
    to: '/access',
    icon: '🚉',
    title: 'アクセス',
    desc: '金沢八景駅からの交通案内、バス・周辺地図情報。',
    btnText: 'アクセス案内へ',
  },
  {
    to: '/contact',
    icon: '✉️',
    title: 'お問い合わせ',
    desc: '公式X・Instagram、よくあるご質問はこちら。',
    btnText: 'お問い合わせへ',
  },
];
</script>

<template>
  <div>
    <!-- Hero Section with Countdown -->
    <SectionsHeroSection />

    <!-- Main Content Flow -->
    <div class="content-container">
      <!-- Navigation Hub -->
      <section class="section nav-hub-section">
        <div class="section-header">
          <div class="section-icon">✨</div>
          <div class="section-title">
            <h2>コンテンツ一覧</h2>
            <p>Contents & Guides</p>
          </div>
        </div>

        <div class="cards-grid">
          <NuxtLink
            v-for="card in pageCards"
            :key="card.to"
            :to="card.to"
            class="hub-card"
          >
            <div class="hub-card-icon">{{ card.icon }}</div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
            <div class="hub-card-link">
              <span>{{ card.btnText }}</span>
              <span class="arrow">→</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- About Section (Integrated) -->
      <SectionsAboutSection />

      <!-- Stage Highlights Banner -->
      <section class="section stage-banner-section">
        <div class="section-header">
          <div class="section-icon">🎤</div>
          <div class="section-title">
            <h2>注目のステージ企画</h2>
            <p>Main Stages Highlights</p>
          </div>
        </div>

        <div class="stage-banners-grid">
          <NuxtLink to="/events/special-guest-live" class="stage-banner indoor">
            <div class="stage-banner-badge">SCC 4階ホール</div>
            <h3>屋内ステージ</h3>
            <p>オープニングセレモニー、ゲスト音楽ライブ、お笑い企画、グランドフィナーレ等</p>
            <span class="banner-btn">注目企画の詳細を見る →</span>
          </NuxtLink>

          <NuxtLink to="/events/sunset-rock-fes" class="stage-banner outdoor">
            <div class="stage-banner-badge">体育館横 芝生広場</div>
            <h3>屋外（野外）ステージ</h3>
            <p>開放的な青空の下で楽しむ軽音楽フリーライブ＆ダンスパフォーマンス！</p>
            <span class="banner-btn">注目企画の詳細を見る →</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Photo Gallery Section (Integrated) -->
      <SectionsGallerySection />

      <!-- Visitor Guidelines Section -->
      <section class="section">
        <div class="section-header">
          <div class="section-icon">ℹ️</div>
          <div class="section-title">
            <h2>ご来場にあたってのお願い</h2>
            <p>Visitor Guidelines</p>
          </div>
        </div>

        <div class="guidelines-grid">
          <div class="guide-item">
            <h4>入場について</h4>
            <p>平潟祭は<strong>入場無料・事前予約不要</strong>です。どなたでもご自由にご来場いただけます。</p>
          </div>
          <div class="guide-item">
            <h4>交通手段について</h4>
            <p>来場者用駐車場はございません。ご来場の際は公共交通機関（電車・バス）をご利用ください。</p>
          </div>
          <div class="guide-item">
            <h4>喫煙・飲食について</h4>
            <p>キャンパス内は所定の喫煙所を除き全面禁煙です。飲食は模擬店エリアおよび指定の飲食スペースをご利用ください。</p>
          </div>
          <div class="guide-item">
            <h4>落とし物・お困りの場合</h4>
            <p>正門ロータリー前の「総合案内・本部テント」までお気軽にお越しください。救護スタッフも待機しております。</p>
          </div>
        </div>
      </section>

      <!-- SNS Section -->
      <SectionsSnsSection />
    </div>
  </div>
</template>

<style scoped>
.content-container {
  max-width: var(--max-width);
  margin: -60px auto 80px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
  display: grid;
  gap: 32px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.hub-card {
  background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
  border: 2px solid var(--border);
  border-radius: 16px;
  padding: 24px 20px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.hub-card:hover {
  transform: translateY(-6px);
  border-color: var(--olive);
  box-shadow: var(--shadow-lg);
}

.hub-card-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.hub-card h3 {
  font-size: 18px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 6px;
}

.hub-card p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
  flex: 1;
  margin-bottom: 16px;
}

.hub-card-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 800;
  font-size: 13px;
  color: var(--olive);
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.arrow {
  transition: transform 0.2s ease;
}

.hub-card:hover .arrow {
  transform: translateX(4px);
}

/* Stage Banners */
.stage-banners-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.stage-banner {
  padding: 32px;
  border-radius: 16px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.stage-banner.indoor {
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-dark) 100%);
}

.stage-banner.outdoor {
  background: linear-gradient(135deg, var(--olive-light) 0%, var(--olive) 100%);
}

.stage-banner:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stage-banner-badge {
  display: inline-block;
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
}

.stage-banner h3 {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 8px;
}

.stage-banner p {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.banner-btn {
  font-weight: 800;
  font-size: 14px;
  color: var(--gold-light);
}

/* Guidelines */
.guidelines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.guide-item {
  background: var(--accent-2);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid var(--olive);
}

.guide-item h4 {
  font-size: 16px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
}

.guide-item p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .content-container {
    margin-top: -40px;
  }

  .stage-banners-grid {
    grid-template-columns: 1fr;
  }
}
</style>

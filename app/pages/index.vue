<script setup lang="ts">
useSeoMeta({
  title: '平潟祭 2026｜関東学院大学 金沢八景キャンパス 学園祭',
  description: '2026年10月31日(土)・11月1日(日)開催！第77回 平潟祭 『SPROUT』 関東学院大学 金沢八景キャンパスの学園祭公式サイト。',
});

// 企画カードデータ（Frame 4 Rectangle 2, 1, 3）
const featuredEvents = [
  {
    title: 'ステージパフォーマンス',
    badge: '屋内 & 屋外',
    desc: 'SCC4階ホールのスペシャルライブ＆芝生広場の軽音・ダンス！熱気あふれるステージをお届け。',
    to: '/events',
    icon: '🎤',
  },
  {
    title: '模擬店グルメ',
    badge: 'メインストリート',
    desc: '各サークル・学科が趣向を凝らした焼きそば、たこ焼き、スイーツなど美味しい屋台が大集合！',
    to: '/events',
    icon: '🍲',
  },
  {
    title: '文化・展示・体験',
    badge: '文化館・音楽館',
    desc: '研究発表、美術・写真展示、体験型ワークショップなど、学生の日頃の成果が咲き誇る。',
    to: '/events',
    icon: '🎨',
  },
];
</script>

<template>
  <div class="figma-page-container">
    <!-- 1. Top (Hero Section) -->
    <SectionsHeroSection />

    <!-- 2. Frame 4: 企画セクション (背景: #437C62) -->
    <section class="frame-4-section" id="events-frame">
      <div class="frame-inner">
        <!-- Group 5: Title & Line -->
        <div class="group-5-title">
          <h2 class="section-heading heading-light">企画</h2>
          <UiFigmaLine color="#DFF794" max-width="824px" />
        </div>

        <!-- Frame 7: 3 Cards Grid (Rectangle 2, 1, 3) -->
        <div class="frame-7-grid">
          <NuxtLink
            v-for="(item, idx) in featuredEvents"
            :key="idx"
            :to="item.to"
            class="event-card-white"
          >
            <div class="card-badge">{{ item.badge }}</div>
            <div class="card-icon-title">
              <span class="card-icon">{{ item.icon }}</span>
              <h3 class="card-title">{{ item.title }}</h3>
            </div>
            <p class="card-desc">{{ item.desc }}</p>
            <div class="card-link-action">
              <span>詳細を見る</span>
              <span class="card-arrow">→</span>
            </div>
          </NuxtLink>
        </div>

        <!-- 説明文 (上の企画の説明文とか) -->
        <div class="frame-desc-wrapper">
          <p class="frame-desc-text">
            音楽ライブ、模擬店グルメ、展示発表、参加型イベントなど盛りだくさん！<br>
            学生たちの情熱が芽吹き、咲き誇る特別な2日間をお楽しみください。
          </p>
          <NuxtLink to="/events" class="btn btn-gold figma-action-btn">
            全企画・模擬店一覧を見る 🎪
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 3. Frame 5: タイムテーブルセクション (背景: #F8F8ED + 上部反転波) -->
    <section class="frame-5-section" id="schedule-frame">
      <!-- Group 6: 反転した4層の波 (rotate 180deg) -->
      <div class="inverted-hills-container" aria-hidden="true">
        <!-- Wave 1 (#B9DD7B) -->
        <div class="inv-hill inv-hill-1">
          <svg viewBox="0 0 1920 100" preserveAspectRatio="none" class="inv-svg">
            <path d="M0,0 L1920,0 L1920,30 Q1440,80 960,40 T0,60 Z" fill="#B9DD7B" />
          </svg>
        </div>
        <!-- Wave 2 (#88BD76) -->
        <div class="inv-hill inv-hill-2">
          <svg viewBox="0 0 1920 85" preserveAspectRatio="none" class="inv-svg">
            <path d="M0,0 L1920,0 L1920,25 Q1380,75 800,30 T0,40 Z" fill="#88BD76" />
          </svg>
        </div>
        <!-- Wave 3 (#619D6E) -->
        <div class="inv-hill inv-hill-3">
          <svg viewBox="0 0 1920 65" preserveAspectRatio="none" class="inv-svg">
            <path d="M0,0 L1920,0 L1920,20 Q1200,60 600,20 T0,30 Z" fill="#619D6E" />
          </svg>
        </div>
        <!-- Wave 4 (#437C62) -->
        <div class="inv-hill inv-hill-4">
          <svg viewBox="0 0 1920 45" preserveAspectRatio="none" class="inv-svg">
            <path d="M0,0 L1920,0 L1920,15 Q960,45 0,15 Z" fill="#437C62" />
          </svg>
        </div>
      </div>

      <div class="frame-inner">
        <!-- Group 6: Title & Line -->
        <div class="group-6-title">
          <h2 class="section-heading heading-dark">タイムテーブル</h2>
          <UiFigmaLine color="#42845A" max-width="824px" />
        </div>

        <!-- Schedule Preview Cards -->
        <div class="timetable-preview-grid">
          <div class="stage-card indoor">
            <div class="stage-tag">屋内ステージ（SCC 4階ホール）</div>
            <h4>ゲストライブ・オープニング・お笑い企画</h4>
            <p>10/31(土) & 11/1(日) 10:30 開演 〜 16:30 終演</p>
            <NuxtLink to="/schedule" class="stage-link">
              屋内進行表をチェック →
            </NuxtLink>
          </div>

          <div class="stage-card outdoor">
            <div class="stage-tag">野外ステージ（芝生広場）</div>
            <h4>青空軽音楽ライブ & ダンスパフォーマンス</h4>
            <p>10/31(土) & 11/1(日) 10:00 スタート 〜 17:00 フィナーレ</p>
            <NuxtLink to="/schedule" class="stage-link">
              野外進行表をチェック →
            </NuxtLink>
          </div>
        </div>

        <div class="section-center-action">
          <NuxtLink to="/schedule" class="btn btn-primary figma-action-btn">
            2日間の全タイムテーブルを見る 📅
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. Frame 8: 場内マップセクション (背景: #F8F8ED) -->
    <section class="frame-8-section" id="map-frame">
      <div class="frame-inner">
        <!-- Group 5: Title & Line -->
        <div class="group-5-title">
          <h2 class="section-heading heading-dark">場内マップ</h2>
          <UiFigmaLine color="#42845A" max-width="824px" />
        </div>

        <!-- Image 1: 1121px x 797px -->
        <div class="map-image-holder">
          <div class="map-image-card">
            <img
              src="https://univ.kanto-gakuin.ac.jp/wp-content/themes/gakuin/images/img_map_kanazawa.jpg"
              alt="関東学院大学 金沢八景キャンパス 平潟祭 会場マップ"
              class="figma-map-img"
            />
            <div class="map-card-badge-overlay">
              <span>金沢八景キャンパス 全体マップ</span>
            </div>
          </div>
        </div>

        <!-- Map Navigation Buttons -->
        <div class="map-actions-row">
          <NuxtLink to="/map" class="btn btn-primary">
            全体・模擬店マップを見る 🗺️
          </NuxtLink>
          <NuxtLink to="/map" class="btn btn-secondary">
            音楽館・文化館マップ 🏢
          </NuxtLink>
          <NuxtLink to="/access" class="btn btn-secondary">
            アクセス・交通案内 🚉
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5. Visitor Guidelines (ご来場案内) -->
    <section class="guidelines-section" id="about">
      <div class="frame-inner">
        <div class="group-5-title">
          <h2 class="section-heading heading-dark">ご来場にあたって</h2>
          <UiFigmaLine color="#42845A" max-width="824px" />
        </div>

        <div class="guidelines-grid">
          <div class="guide-box">
            <h4>入場無料・事前予約不要</h4>
            <p>平潟祭はどなたでも自由にご入場いただけます。地域の皆さま、受験生、卒業生の方々もぜひお越しください。</p>
          </div>
          <div class="guide-box">
            <h4>公共交通機関のご利用</h4>
            <p>来場者用駐車場はございません。京急線「金沢八景駅」またはシーサイドラインからの徒歩・バスをご利用ください。</p>
          </div>
          <div class="guide-box">
            <h4>総合案内・救護所</h4>
            <p>正門ロータリー付近に本部テントを設置しております。落とし物や迷子、体調不良の際はお気軽にお声がけください。</p>
          </div>
          <div class="guide-box">
            <h4>キャンパス内全面禁煙</h4>
            <p>キャンパス内は指定の喫煙所を除き全面禁煙です。ゴミの分別回収にご協力をお願いいたします。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Page Layout: Figma Specification */
.figma-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  position: relative;
  width: 100%;
  background: var(--figma-bg);
  overflow-x: hidden;
}

.frame-inner {
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Headings */
.section-heading {
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: clamp(36px, 4vw, 48px);
  line-height: 58px;
  text-align: center;
  margin-bottom: 4px;
}

.heading-light {
  color: var(--figma-accent);
}

.heading-dark {
  color: var(--figma-title);
}

.group-5-title,
.group-6-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 824px;
  margin-bottom: 32px;
}

/* 2. Frame 4: 企画セクション */
.frame-4-section {
  width: 100%;
  background: var(--figma-sprout-4); /* #437C62 */
  padding: 60px 0 70px;
  position: relative;
  z-index: 5;
}

.frame-7-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;
  max-width: 1126px;
  margin-bottom: 32px;
}

.event-card-white {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(27, 58, 36, 0.18);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  border: 2px solid transparent;
}

.event-card-white:hover {
  transform: translateY(-6px);
  border-color: var(--figma-sprout-1);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
}

.card-badge {
  display: inline-block;
  align-self: flex-start;
  background: var(--figma-bg);
  color: var(--figma-title);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
  border: 1px solid var(--figma-border-light);
}

.card-icon-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.card-icon {
  font-size: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--figma-title);
  margin: 0;
}

.card-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-muted);
  flex: 1;
  margin-bottom: 16px;
}

.card-link-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  color: var(--figma-border);
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.card-arrow {
  transition: transform 0.2s ease;
}

.event-card-white:hover .card-arrow {
  transform: translateX(5px);
}

/* 説明文 */
.frame-desc-wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 800px;
}

.frame-desc-text {
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.7;
  color: #FFFFFF;
}

/* 3. Frame 5: タイムテーブルセクション */
.frame-5-section {
  width: 100%;
  background: var(--figma-bg);
  padding: 0 0 60px;
  position: relative;
  z-index: 6;
}

/* Inverted Waves Transition (Group 6: rotate 180deg) */
.inverted-hills-container {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  margin-bottom: 40px;
  line-height: 0;
}

.inv-hill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.inv-svg {
  display: block;
  width: 100%;
  height: 100%;
}

.inv-hill-1 { height: 100px; z-index: 1; }
.inv-hill-2 { height: 85px; z-index: 2; }
.inv-hill-3 { height: 65px; z-index: 3; }
.inv-hill-4 { height: 45px; z-index: 4; }

.timetable-preview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 32px;
}

.stage-card {
  padding: 28px;
  border-radius: 18px;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.stage-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stage-card.indoor {
  background: linear-gradient(135deg, var(--figma-title) 0%, var(--figma-dark) 100%);
  border: 1px solid var(--figma-border);
}

.stage-card.outdoor {
  background: linear-gradient(135deg, var(--figma-border) 0%, var(--figma-title) 100%);
  border: 1px solid var(--figma-border-light);
}

.stage-tag {
  display: inline-block;
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
}

.stage-card h4 {
  font-size: 19px;
  font-weight: 800;
  margin-bottom: 8px;
}

.stage-card p {
  font-size: 13px;
  opacity: 0.9;
  flex: 1;
  margin-bottom: 16px;
}

.stage-link {
  font-size: 14px;
  font-weight: 800;
  color: var(--figma-accent);
  text-decoration: none;
}

.stage-link:hover {
  text-decoration: underline;
}

.section-center-action {
  text-align: center;
}

/* 4. Frame 8: 場内マップセクション */
.frame-8-section {
  width: 100%;
  background: var(--figma-bg);
  padding: 40px 0 70px;
  position: relative;
  z-index: 6;
}

.map-image-holder {
  width: 100%;
  max-width: 1121px;
  margin-bottom: 32px;
}

.map-image-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 3px solid var(--figma-border);
  background: white;
}

.figma-map-img {
  width: 100%;
  height: auto;
  display: block;
}

.map-card-badge-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(27, 58, 36, 0.85);
  backdrop-filter: blur(8px);
  color: #FFFFFF;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid var(--figma-border);
}

.map-actions-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 5. Guidelines Section */
.guidelines-section {
  width: 100%;
  background: var(--figma-bg);
  padding: 20px 0 80px;
}

.guidelines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1121px;
}

.guide-box {
  background: #FFFFFF;
  padding: 24px;
  border-radius: 14px;
  border-left: 5px solid var(--figma-border);
  box-shadow: var(--shadow-sm);
}

.guide-box h4 {
  font-size: 16px;
  font-weight: 800;
  color: var(--figma-title);
  margin-bottom: 8px;
}

.guide-box p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0;
}

.figma-action-btn {
  padding: 14px 36px;
  font-size: 16px;
}

/* Responsive */
@media (max-width: 1024px) {
  .frame-7-grid {
    grid-template-columns: 1fr;
  }

  .timetable-preview-grid {
    grid-template-columns: 1fr;
  }
}
</style>


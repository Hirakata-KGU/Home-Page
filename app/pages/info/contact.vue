<script setup lang="ts">
useSeoMeta({
  title: 'お問い合わせ・SNS｜平潟祭 2026',
  ogTitle: 'お問い合わせ・SNS｜平潟祭 2026',
  description: '平潟祭2026に関するお問い合わせ、公式SNS（X / Instagram）のご案内。実行委員会へのお問い合わせはこちらから。',
  ogDescription: '平潟祭2026に関するお問い合わせ、公式SNS（X / Instagram）のご案内。実行委員会へのお問い合わせはこちらから。',
  ogUrl: 'https://www.hirakatasai.net/info/contact',
});

const contactSns = [
  {
    name: 'X (旧Twitter)',
    id: '@shin_hirakata',
    url: 'https://x.com/shin_hirakata',
    type: 'x',
    gradient: 'linear-gradient(135deg, #111111 0%, #333333 100%)',
  },
  {
    name: 'Instagram',
    id: '@hirakatasai',
    url: 'https://www.instagram.com/hirakatasai',
    type: 'instagram',
    gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
  },
];
</script>

<template>
  <div>
    <!-- 絵文字不使用（※アイコンSVG提供後に配置予定） -->
    <LayoutPageHeader
      title="お問い合わせ"
      sub-title="Contact"
      :breadcrumbs="[{ name: 'お問い合わせ' }]"
    />

    <div class="page-container">
      <!-- SNS Contact Cards -->
      <section class="section">
        <div class="section-header">
          <!-- アイコンSVG提供後に配置予定 -->
          <div class="section-title">
            <h2>公式SNS・お問い合わせ</h2>
            <p>Official Social Media & Contact</p>
          </div>
        </div>

        <p class="section-intro">
          平潟祭に関するご質問、取材のお申し込み、落とし物・忘れ物に関するお問い合わせは、以下の公式SNS（X・Instagram）のダイレクトメッセージ（DM）にてお気軽にご連絡ください。
        </p>

        <div class="sns-cards-grid">
          <a 
            :href="sns.url"
            v-for="sns in contactSns"
            :key="sns.name"
            class="contact-sns-card"
          >
            <div class="sns-header-area" :style="{ background: sns.gradient }">
              <span class="sns-large-icon">
                <SvgX v-if="sns.type === 'x'" class="w-7 h-7 fill-white" />
                <SvgInstagram v-else-if="sns.type === 'instagram'" class="w-7 h-7" stroke-color="#FFFFFF" />
              </span>
              <div class="sns-title-group">
                <h3>{{ sns.name }}</h3>
                <span class="sns-handle">{{ sns.id }}</span>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: var(--max-width);
  margin: -32px auto 80px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
  display: grid;
  gap: 32px;
}

.section-intro {
  font-size: 15px;
  line-height: 1.8;
  color: var(--muted);
  margin-bottom: 28px;
}

.sns-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.contact-sns-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.contact-sns-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--olive);
}

.sns-header-area {
  padding: 24px;
  color: white;
  display: flex;
  align-items: center;
  gap: 16px;
}

.sns-large-icon {
  font-size: 36px;
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sns-title-group h3 {
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 2px;
}

.sns-handle {
  font-size: 13px;
  opacity: 0.9;
  font-weight: 700;
}

@media (max-width: 768px) {
  .sns-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>

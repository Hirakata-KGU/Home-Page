<script setup lang="ts">
const snsList = [
  {
    name: 'X (Twitter)',
    account: '@hirakata_fes',
    description: '最新情報を随時更新中',
    url: 'https://x.com/shin_hirakata?s=21&t=XXyLV91kkOMKW_oin9wA0w',
    icon: '𝕏',
  },
  {
    name: 'Instagram',
    account: '@hirakatasai',
    description: '写真・動画でお届け',
    url: 'https://www.instagram.com/hirakatasai?igsh=MWRvYmxxa3FjYnhvcg==',
    icon: '📷',
  },
  {
    name: 'YouTube',
    account: '平潟祭チャンネル',
    description: '過去の映像アーカイブ',
    url: 'https://www.youtube.com/',
    icon: '▶️',
  },
];
</script>

<template>
  <section id="sns" class="section">
    <div class="section-header">
      <div class="section-icon">📱</div>
      <div class="section-title">
        <h2>SNS・最新情報</h2>
        <p>Follow Us on Social Media</p>
      </div>
    </div>

    <div class="sns-links">
      <a
        v-for="sns in snsList"
        :key="sns.name"
        :href="sns.url"
        target="_blank"
        rel="noopener noreferrer"
        class="sns-card"
      >
        <div class="sns-icon">{{ sns.icon }}</div>
        <h3>{{ sns.name }}</h3>
        <p>
          {{ sns.description }}<br>
          {{ sns.account }}
        </p>
      </a>
    </div>

    <div class="sns-hashtag-banner">
      <p class="hashtag-title">ハッシュタグで投稿しよう！</p>
      <div class="hashtag-tags">
        <span class="tag">#平潟祭2026</span>
        <span class="tag">#関東学院大学</span>
        <span class="tag">#金沢八景</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sns-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.sns-card {
  background: linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 100%);
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.sns-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--olive);
}

.sns-icon {
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 32px;
  box-shadow: var(--shadow-sm);
}

.sns-card h3 {
  font-size: 18px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
}

.sns-card p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.sns-hashtag-banner {
  text-align: center;
  margin-top: 32px;
  padding: 24px;
  background: var(--accent-2);
  border-radius: 12px;
}

.hashtag-title {
  font-weight: 700;
  color: var(--olive);
  margin-bottom: 12px;
}

.hashtag-tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tag {
  background: white;
  color: var(--olive);
  font-weight: 700;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}
</style>

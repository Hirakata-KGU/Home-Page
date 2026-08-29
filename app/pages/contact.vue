<script setup lang="ts">
useSeoMeta({
  title: 'お問い合わせ・SNS｜平潟祭 2026',
  description: '平潟祭2026に関するお問い合わせ、公式SNS（X / Instagram）のご案内。実行委員会へのお問い合わせはこちらから。',
});

const contactSns = [
  {
    name: 'X (旧Twitter)',
    id: '@shin_hirakata',
    url: 'https://x.com/shin_hirakata?s=21&t=XXyLV91kkOMKW_oin9wA0w',
    icon: '𝕏',
    desc: '最新情報の速報発信、タイムテーブルの変更案内などを行っています。ダイレクトメッセージ（DM）でのお問い合わせも受け付けております。',
    btnText: 'Xで問い合わせ・フォロー',
    gradient: 'linear-gradient(135deg, #111111 0%, #333333 100%)',
  },
  {
    name: 'Instagram',
    id: '@hirakatasai',
    url: 'https://www.instagram.com/hirakatasai?igsh=MWRvYmxxa3FjYnhvcg==',
    icon: '📷',
    desc: '当日の様子や企画のハイライト写真を投稿・ストーリーで配信！DMでのお問い合わせやご質問もこちらからどうぞ。',
    btnText: 'Instagramで問い合わせ・フォロー',
    gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
  },
];
</script>

<template>
  <div>
    <LayoutPageHeader
      title="お問い合わせ"
      sub-title="Contact & Official Social Media"
      icon="✉️"
      :breadcrumbs="[{ name: 'お問い合わせ' }]"
    />

    <div class="page-container">
      <!-- SNS Contact Cards -->
      <section class="section">
        <div class="section-header">
          <div class="section-icon">💬</div>
          <div class="section-title">
            <h2>公式SNS・お問い合わせ窓口</h2>
            <p>Official Social Media & Direct Inquiries</p>
          </div>
        </div>

        <p class="section-intro">
          平潟祭に関するご質問、取材のお申し込み、落とし物・忘れ物に関するお問い合わせは、以下の公式SNS（X・Instagram）のダイレクトメッセージ（DM）にてお気軽にご連絡ください。
        </p>

        <div class="sns-cards-grid">
          <div
            v-for="sns in contactSns"
            :key="sns.name"
            class="contact-sns-card"
          >
            <div class="sns-header-area" :style="{ background: sns.gradient }">
              <span class="sns-large-icon">{{ sns.icon }}</span>
              <div class="sns-title-group">
                <h3>{{ sns.name }}</h3>
                <span class="sns-handle">{{ sns.id }}</span>
              </div>
            </div>

            <div class="sns-body-area">
              <p>{{ sns.desc }}</p>
              <a
                :href="sns.url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary sns-action-btn"
              >
                {{ sns.btnText }} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ & Other Inquiries -->
      <section class="section faq-section">
        <div class="section-header">
          <div class="section-icon">❓</div>
          <div class="section-title">
            <h2>よくあるご質問</h2>
            <p>Frequently Asked Questions</p>
          </div>
        </div>

        <div class="faq-list">
          <div class="faq-item">
            <h4>Q. 入場料や事前予約は必要ですか？</h4>
            <p>A. 入場無料・事前予約不要です。一般の方、受験生、近隣住民の皆様どなたでも自由にご来場いただけます。</p>
          </div>
          <div class="faq-item">
            <h4>Q. 雨天の場合は開催されますか？</h4>
            <p>A. 雨天決行です。荒天（台風・大雨警報等）によるプログラム変更や中止が発生する場合は、公式X（@shin_hirakata）にて随時告知いたします。</p>
          </div>
          <div class="faq-item">
            <h4>Q. 車での来場や駐車場はありますか？</h4>
            <p>A. 来場者用の駐車場はございません。公共交通機関（京急線・シーサイドライン・路線バス）をご利用ください。</p>
          </div>
          <div class="faq-item">
            <h4>Q. 取材や撮影の申請はどうすればよいですか？</h4>
            <p>A. メディア取材や学外団体による撮影をご希望の場合は、公式XまたはInstagramのDMにて「媒体名・企画趣旨・人数」を明記の上ご連絡ください。</p>
          </div>
        </div>
      </section>

      <!-- Committee Info -->
      <section class="section committee-card">
        <div class="committee-info">
          <h4>主催：平潟祭実行委員会</h4>
          <p>
            関東学院大学 金沢八景キャンパス<br>
            〒236-8501 神奈川県横浜市金沢区六浦東1-50-1<br>
            ※ 学祭当日は正門前「総合案内・本部テント」にスタッフが常駐しております。
          </p>
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
  border: 2px solid var(--border);
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

.sns-body-area {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 20px;
}

.sns-body-area p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
}

.sns-action-btn {
  text-align: center;
  width: 100%;
}

/* FAQ */
.faq-list {
  display: grid;
  gap: 16px;
}

.faq-item {
  background: var(--accent-2);
  padding: 20px 24px;
  border-radius: 12px;
  border-left: 5px solid var(--olive);
}

.faq-item h4 {
  font-size: 16px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 6px;
}

.faq-item p {
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
}

/* Committee Card */
.committee-card {
  background: linear-gradient(135deg, var(--accent) 0%, #ffffff 100%);
  border-left: 6px solid var(--gold);
}

.committee-info h4 {
  font-size: 17px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
}

.committee-info p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .sns-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>

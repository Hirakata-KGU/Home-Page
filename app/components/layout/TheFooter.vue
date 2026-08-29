<template>
  <footer>
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-about">
          <h3>平潟祭 2026</h3>
          <p>
            関東学院大学 金沢八景キャンパスで開催される秋の学園祭。<br>
            学生たちの熱い情熱と、地域とつながる特別な2日間をお届けします。
          </p>
          <p class="footer-address">
            〒236-8501 神奈川県横浜市金沢区六浦東1-50-1<br>
            主催：平潟祭実行委員会
          </p>
        </div>

        <div class="footer-section">
          <h4>ページ一覧</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/">ホーム（概要・ギャラリー）</NuxtLink></li>
            <li><NuxtLink to="/events">企画・模擬店一覧</NuxtLink></li>
            <li><NuxtLink to="/schedule">タイムテーブル</NuxtLink></li>
            <li><NuxtLink to="/map">場内マップ（全体・文化館・音楽館）</NuxtLink></li>
            <li><NuxtLink to="/access">アクセス</NuxtLink></li>
            <li><NuxtLink to="/contact">お問い合わせ</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>公式SNS・リンク</h4>
          <ul class="footer-links">
            <li>
              <a href="https://x.com/shin_hirakata?s=21&t=XXyLV91kkOMKW_oin9wA0w" target="_blank" rel="noopener noreferrer">
                公式 X (Twitter) ↗
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/hirakatasai?igsh=MWRvYmxxa3FjYnhvcg==" target="_blank" rel="noopener noreferrer">
                公式 Instagram ↗
              </a>
            </li>
            <li>
              <a href="https://univ.kanto-gakuin.ac.jp/" target="_blank" rel="noopener noreferrer">
                関東学院大学 公式サイト ↗
              </a>
            </li>
            <li>
              <a href="https://univ.kanto-gakuin.ac.jp/about-university/location.html" target="_blank" rel="noopener noreferrer">
                大学キャンパスマップ ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-socials">
          <a
            href="https://x.com/shin_hirakata?s=21&t=XXyLV91kkOMKW_oin9wA0w"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="X (Twitter)"
          >
            𝕏
          </a>
          <a
            href="https://www.instagram.com/hirakatasai?igsh=MWRvYmxxa3FjYnhvcg=="
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="Instagram"
          >
            📷
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="YouTube"
          >
            ▶️
          </a>
        </div>
        <div class="footer-copyright">
          © 2026 平潟祭実行委員会（関東学院大学）All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: transparent;
  color: white;
  padding: 60px 0 32px;
  margin-top: 80px;
}

.footer-content {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-about h3 {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 16px;
}

.footer-about p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin-bottom: 16px;
}

.footer-address {
  font-size: 13px;
  opacity: 0.8;
}

.footer-section h4 {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--gold-light);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.25s ease;
}

.footer-links a:hover {
  color: white;
  padding-left: 6px;
}

.footer-bottom {
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.footer-socials {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}

.social-link {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  font-size: 20px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--gold);
  transform: translateY(-4px);
}

.footer-copyright {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>

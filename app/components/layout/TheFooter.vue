<template>
  <footer class="figma-footer">
    <!-- Top Transition / Vector Arch -->
    <div class="footer-vector-top" aria-hidden="true">
      <svg viewBox="0 0 1920 60" preserveAspectRatio="none" class="footer-top-svg">
        <path d="M0,0 Q960,60 1920,0 L1920,60 L0,60 Z" fill="#1B3A24" />
      </svg>
    </div>

    <div class="footer-content-holder">
      <div class="footer-component">
        <!-- Columns -->
        <div class="footer-columns">
          <!-- Col 1: Brand -->
          <div class="brand-summary">
            <div class="footer-brand">
              <div class="brand-logo-frame">
                <img src="/images/hirakata-logo.png" alt="平潟祭ロゴ" class="brand-logo-img" />
              </div>
              <span class="brand-title">平潟祭 2026</span>
              <span class="brand-sub">関東学院大学 金沢八景キャンパス</span>
            </div>
          </div>

          <!-- Col 2: TOP -->
          <div class="footer-links-col links-col-1">
            <div class="col-header">
              <span class="col-title">TOP</span>
              <div class="col-line"></div>
            </div>
            <ul class="col-links">
              <li><NuxtLink to="/">ホームページ</NuxtLink></li>
            </ul>
          </div>

          <!-- Col 3: 企画 (2 sub-columns) -->
          <div class="footer-links-col links-col-2">
            <div class="col-header">
              <span class="col-title">企画</span>
              <div class="col-line"></div>
            </div>
            <div class="col-links-subgrid">
              <ul class="col-links">
                <li><NuxtLink to="/events">企画一覧</NuxtLink></li>
                <li><NuxtLink to="/schedule">タイムテーブル</NuxtLink></li>
              </ul>
              <ul class="col-links">
                <li><NuxtLink to="/map">全体・模擬店マップ</NuxtLink></li>
                <li><NuxtLink to="/map">音楽館マップ</NuxtLink></li>
                <li><NuxtLink to="/map">文化館マップ</NuxtLink></li>
                <li><NuxtLink to="/map">3号館マップ</NuxtLink></li>
              </ul>
            </div>
          </div>

          <!-- Col 4: ご案内 -->
          <div class="footer-links-col links-col-3">
            <div class="col-header">
              <span class="col-title">ご案内</span>
              <div class="col-line"></div>
            </div>
            <ul class="col-links">
              <li><NuxtLink to="/access">アクセス</NuxtLink></li>
              <li><NuxtLink to="/#about">平潟祭について</NuxtLink></li>
              <li><NuxtLink to="/contact">協賛について</NuxtLink></li>
              <li><NuxtLink to="/contact">お問い合わせ</NuxtLink></li>
            </ul>
          </div>
        </div>

        <!-- Social Icons Row -->
        <div class="footer-social-row">
          <a
            href="https://x.com/shin_hirakata?s=21&t=XXyLV91kkOMKW_oin9wA0w"
            target="_blank"
            rel="noopener noreferrer"
            class="sns-badge"
            aria-label="公式X"
          >
            𝕏
          </a>
          <a
            href="https://www.instagram.com/hirakatasai?igsh=MWRvYmxxa3FjYnhvcg=="
            target="_blank"
            rel="noopener noreferrer"
            class="sns-badge"
            aria-label="公式Instagram"
          >
            📷
          </a>
        </div>

        <!-- Bottom Line & Copyright -->
        <div class="footer-bottom">
          <div class="footer-line"></div>
          <div class="copyright-row">
            <span class="copyright-text">© 2026 平潟祭実行委員会 All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.figma-footer {
  width: 100%;
  background: #1B3A24;
  position: relative;
  overflow: hidden;
  margin-top: 0;
  padding: 0;
}

.footer-vector-top {
  width: 100%;
  height: 40px;
  line-height: 0;
  overflow: hidden;
}

.footer-top-svg {
  width: 100%;
  height: 40px;
  display: block;
}

.footer-content-holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 24px 40px;
  width: 100%;
}

.footer-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 1136px;
}

.footer-columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 32px;
}

/* Brand */
.brand-summary {
  width: 280px;
  flex-shrink: 0;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.brand-logo-frame {
  width: 80px;
  height: 80px;
  background: #B9DD7B;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.brand-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-title {
  font-family: 'Noto Serif JP', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  color: #FFFFFF;
}

.brand-sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

/* Links Columns */
.footer-links-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.links-col-1 {
  width: 140px;
}

.links-col-2 {
  width: 336px;
}

.links-col-3 {
  width: 180px;
}

.col-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.col-title {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #B9DD7B;
  letter-spacing: 0.5px;
}

.col-line {
  width: 100%;
  height: 0;
  border-top: 1px solid #42845A;
}

.col-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-links-subgrid {
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
}

.col-links a {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #FFFFFF;
  text-decoration: none;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.col-links a:hover {
  color: #DFF794;
  padding-left: 4px;
}

/* Social Icons */
.footer-social-row {
  display: flex;
  gap: 12px;
  align-self: flex-start;
}

.sns-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.2s ease;
}

.sns-badge:hover {
  background: #B9DD7B;
  color: #1B3A24;
}

/* Bottom & Copyright */
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}

.footer-line {
  width: 100%;
  height: 0;
  border-top: 1px solid #42845A;
}

.copyright-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright-text {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #DFF794;
}

/* Responsive */
@media (max-width: 960px) {
  .footer-columns {
    flex-direction: column;
    gap: 32px;
  }

  .brand-summary,
  .links-col-1,
  .links-col-2,
  .links-col-3 {
    width: 100%;
  }

  .col-links-subgrid {
    flex-direction: column;
    gap: 12px;
  }
}
</style>


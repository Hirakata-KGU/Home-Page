<template>
  <section id="access" class="section">
    <div class="section-header">
      <div class="section-icon">🚉</div>
      <div class="section-title">
        <h2>アクセス・交通案内</h2>
        <p>Access Information</p>
      </div>
    </div>

    <div class="access-grid">
      <div class="access-info">
        <h3>関東学院大学 金沢八景キャンパス</h3>
        <p class="access-address">〒236-8501 神奈川県横浜市金沢区六浦東1-50-1</p>

        <h3 class="access-subheading">電車でお越しの方</h3>
        <ul class="access-list">
          <li><strong>京急本線「金沢八景駅」</strong>より徒歩約15分</li>
          <li><strong>シーサイドライン「金沢八景駅」</strong>より徒歩約15分</li>
          <li>横浜駅から京急線で約20分、品川駅から約40分</li>
        </ul>

        <h3 class="access-subheading">バスでお越しの方</h3>
        <ul class="access-list">
          <li><strong>京急バス「関東学院正門」</strong>下車すぐ</li>
          <li>金沢八景駅東口より約5分</li>
        </ul>

        <h3 class="access-subheading">お車でお越しの方</h3>
        <p class="car-notice">
          <span class="car-icon">🚗</span>
          来場者用駐車場はございません。<br>
          <small class="car-warning">※当日は駐車場の混雑が予想されます。できる限り公共交通機関をご利用ください。</small>
        </p>

        <div class="access-btn-wrapper">
          <a
            href="https://univ.kanto-gakuin.ac.jp/about-university/location.html"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            公式アクセスページ
          </a>
        </div>
      </div>

      <div class="map-container">
        <iframe
          class="map-frame"
          src="https://www.google.com/maps?q=35.323287,139.623311&z=15&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="関東学院大学 金沢八景キャンパス 地図"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.access-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.access-info h3 {
  font-size: 20px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 16px;
}

.access-address {
  color: var(--muted);
  margin-bottom: 20px;
}

.access-subheading {
  margin-top: 32px;
  margin-bottom: 12px;
}

.access-list {
  list-style: none;
  padding: 0;
}

.access-list li {
  padding: 12px 0 12px 32px;
  position: relative;
  border-bottom: 1px solid var(--border);
  font-size: 15px;
  line-height: 1.7;
}

.access-list li::before {
  content: '🚉';
  position: absolute;
  left: 0;
  font-size: 20px;
}

.access-list li:last-child {
  border-bottom: none;
}

.car-notice {
  padding-left: 32px;
  position: relative;
  line-height: 1.8;
}

.car-icon {
  position: absolute;
  left: 0;
  font-size: 20px;
}

.car-warning {
  color: var(--muted);
}

.access-btn-wrapper {
  margin-top: 32px;
}

.map-container {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.map-frame {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border: 0;
}

@media (max-width: 1024px) {
  .access-grid {
    grid-template-columns: 1fr;
  }
}
</style>

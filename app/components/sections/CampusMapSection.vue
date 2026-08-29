<template>
  <section class="section">
    <div class="section-header">
      <div class="section-icon">🗺️</div>
      <div class="section-title">
        <h2>キャンパスマップ</h2>
        <p>Campus Map</p>
      </div>
    </div>

    <div class="campus-map-visual">
      <img
        src="https://univ.kanto-gakuin.ac.jp/wp-content/themes/gakuin/images/img_map_kanazawa.jpg"
        alt="関東学院大学 金沢八景キャンパス 学内マップ"
      />
      <div class="map-overlay">
        <a
          href="https://univ.kanto-gakuin.ac.jp/about-university/location.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          詳細マップを見る →
        </a>
      </div>
    </div>

    <div class="campus-guide-text">
      📍 <strong>屋内ステージ</strong>：SCC内4階<br>
      📍 <strong>野外ステージ</strong>：体育館横の芝生エリア<br>
      📍 <strong>模擬店エリア</strong>：キャンパス各所（主にメインストリート周辺）<br>
      📍 <strong>音楽館</strong>：7号館（メインストリート右手）<br>
      📍 <strong>文化館</strong>：8号館（展示・ワークショップエリア）<br>
      <small>※当日は案内スタッフが配置されます。お気軽にお声がけください。</small>
    </div>
  </section>
</template>

<style scoped>
.campus-map-visual {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  margin-bottom: 20px;
}

.campus-map-visual img {
  width: 100%;
  height: auto;
  display: block;
}

.map-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  padding: 24px;
  color: white;
}

.map-overlay a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 16px;
}

.map-overlay a:hover {
  color: var(--gold-light);
}

.campus-guide-text {
  color: var(--muted);
  line-height: 1.8;
  margin-top: 16px;
}
</style>

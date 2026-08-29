<template>
  <section id="about" class="section">
    <div class="section-header">
      <div class="section-icon">🌱</div>
      <div class="section-title">
        <h2>平潟祭について</h2>
        <p>About Hirakata Festival</p>
      </div>
    </div>

    <!-- Theme Sprout Special Block -->
    <div class="theme-sprout-block">
      <div class="theme-header">
        <span class="theme-icon-large">🌱</span>
        <div>
          <span class="theme-sub-label">2026年度 開催テーマ</span>
          <h3 class="theme-title">sprout（スプラウト）</h3>
        </div>
      </div>
      <p class="theme-statement">
        「sprout」には、<strong>「新芽」「芽生え」「成長のはじまり」</strong>という意味が込められています。<br>
        学生たちの一人ひとりの情熱や個性が芽吹き、仲間や地域の皆様とつながりながら大きく育ち、やがて鮮やかな花を咲かせる——。<br>
        金沢八景キャンパスという大地から、新しい未来への一歩が芽吹く2日間をお届けします。
      </p>
    </div>

    <div class="about-content">
      <div class="about-text">
        <p>
          平潟祭は、関東学院大学 金沢八景キャンパスで開催される学生主体の伝統ある学園祭です。毎年秋の2日間にわたって開催され、音楽ライブ、芸能パフォーマンス、模擬店、展示企画など、多彩なプログラムを展開しています。
        </p>
        <p>
          学生・教職員・地域の皆様が一体となって作り上げる、金沢八景の秋を彩るビッグイベントです。キャンパス全体が会場となり、様々な場所で同時多発的に企画が進行します。
        </p>
        <p>
          入場無料・予約不要で、どなたでもお気軽にお越しいただけます。家族連れ、お友達同士、地域の皆様など、幅広い世代の方々に楽しんでいただける内容となっています。
        </p>
      </div>

      <div class="about-highlights">
        <div class="highlight-card">
          <h3>🎵 音楽ステージ</h3>
          <p>屋内ホールのメインライブ、青空の下の野外軽音フェス、音楽館での上質アコースティックなど多彩な音楽空間。</p>
        </div>
        <div class="highlight-card">
          <h3>🍴 模擬店・グルメ</h3>
          <p>学生サークルによる約30店舗の手作り模擬店や、地元横浜の人気キッチンカーが大集結！</p>
        </div>
        <div class="highlight-card">
          <h3>🎨 展示・体験企画</h3>
          <p>文化館での美術・写真展示、研究発表、映画上映会、ワークショップ、スタンプラリーなど参加型企画も充実。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.theme-sprout-block {
  background: linear-gradient(135deg, var(--sprout-bg) 0%, var(--sprout-soft) 100%);
  border: 2px solid var(--sprout-pale);
  border-left: 6px solid var(--sprout);
  border-radius: 16px;
  padding: 28px 32px;
  margin-bottom: 36px;
}

.theme-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
}

.theme-icon-large {
  font-size: 36px;
  width: 52px;
  height: 52px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.theme-sub-label {
  display: inline-block;
  background: var(--sprout);
  color: white;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 12px;
  margin-bottom: 4px;
}

.theme-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--sprout-dark);
  letter-spacing: 1px;
}

.theme-statement {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text);
}

.theme-statement strong {
  color: var(--sprout-dark);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.about-text {
  font-size: 15px;
  line-height: 1.9;
}

.about-text p {
  margin-bottom: 16px;
}

.about-highlights {
  display: grid;
  gap: 16px;
}

.highlight-card {
  background: linear-gradient(135deg, var(--sprout-soft) 0%, #ffffff 100%);
  border: 1px solid var(--border);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid var(--sprout);
}

.highlight-card h3 {
  font-size: 17px;
  font-weight: 800;
  color: var(--sprout-dark);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.highlight-card p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .theme-sprout-block {
    padding: 20px;
  }

  .theme-title {
    font-size: 20px;
  }
}
</style>

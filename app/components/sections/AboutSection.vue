<template>
  <section id="about" class="section">
    <div class="section-header">
      <div class="section-icon">🎓</div>
      <div class="section-title">
        <h2>平潟祭について</h2>
        <p>About Hirakata Festival</p>
      </div>
    </div>

    <div class="about-content">
      <div class="about-text">
        <p>
          平潟祭は、関東学院大学 金沢八景キャンパスで開催される学生主体の学園祭です。毎年10月から11月の2日間にわたって開催され、音楽ライブ、芸能パフォーマンス、模擬店、展示企画など、多彩なプログラムを展開しています。
        </p>
        <p>
          「つながる」をテーマに、学生・教職員・地域の皆様が一体となって作り上げる、金沢八景の秋を彩るビッグイベントです。キャンパス全体が会場となり、様々な場所で同時多発的に企画が進行します。
        </p>
        <p>
          入場無料・予約不要で、どなたでもお気軽にお越しいただけます。家族連れ、お友達同士、カップルなど、幅広い世代の方々に楽しんでいただける内容となっています。
        </p>
      </div>

      <div class="about-highlights">
        <div class="highlight-card">
          <h3>🎵 音楽ステージ</h3>
          <p>メインステージでのゲストライブ、野外ステージでの軽音楽ライブ、音楽館でのアコースティックライブなど、多彩な音楽企画を展開。</p>
        </div>
        <div class="highlight-card">
          <h3>🍴 模擬店・グルメ</h3>
          <p>学生サークルによる手作り模擬店や、地元の人気フード出店など、バラエティ豊かなグルメが勢揃い。食べ歩きも楽しめます。</p>
        </div>
        <div class="highlight-card">
          <h3>🎨 展示・体験企画</h3>
          <p>文化館での作品展示、研究発表、ワークショップ、スタンプラリーなど、参加型の企画も充実しています。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.about-text {
  font-size: 16px;
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
  background: linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 100%);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid var(--olive);
}

.highlight-card h3 {
  font-size: 18px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.highlight-card p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>

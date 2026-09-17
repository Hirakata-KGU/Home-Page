<script setup lang="ts">
useSeoMeta({
  title: '平潟祭について・テーマ「sprout」｜平潟祭 2026',
  description: '第77回 平潟祭の開催概要と2026年度テーマ「sprout（スプラウト）」に込められた想い、見どころをご紹介します。',
});
</script>

<template>
  <div>
    <!-- 絵文字不使用（※アイコンSVG提供後に配置予定） -->
    <LayoutPageHeader
      title="平潟祭について"
      sub-title="About Hirakata Festival & Theme"
      :breadcrumbs="[{ name: '平潟祭について' }]"
    />

    <div class="page-container">
      <!-- 2026 Theme Section -->
      <section class="section">
        <div class="theme-sprout-block">
          <div class="theme-header">
            <!-- アイコンSVG提供後に配置予定 -->
            <div>
              <span class="theme-sub-label">2026年度 開催テーマ</span>
              <h2 class="theme-title">sprout（スプラウト）</h2>
            </div>
          </div>
          <p class="theme-statement">
            「sprout」には、<strong>「新芽」「芽生え」「成長のはじまり」</strong>という意味が込められています。<br>
            学生たちの一人ひとりの情熱や個性が芽吹き、仲間や地域の皆様とつながりながら大きく育ち、やがて鮮やかな花を咲かせる——。<br>
            金沢八景キャンパスという大地から、新しい未来への一歩が芽吹く特別な2日間をお届けします。
          </p>
        </div>

        <div class="about-grid">
          <div class="about-desc">
            <h3 class="text-xl font-extrabold text-sprout-title mb-4">金沢八景の秋を彩る、学生主体のビッグフェスティバル</h3>
            <p class="text-base leading-relaxed text-text-muted mb-4">
              平潟祭は、関東学院大学 金沢八景キャンパスで開催される伝統ある学園祭です。毎年秋の2日間にわたって開催され、音楽ライブ、芸能パフォーマンス、模擬店、展示発表など、多彩なプログラムを展開しています。
            </p>
            <p class="text-base leading-relaxed text-text-muted mb-4">
              学生・教職員・地域の皆様が一体となって作り上げる学園祭として、キャンパス全体が会場となり、様々な場所で同時多発的にワクワクする企画が進行します。
            </p>
            <p class="text-base leading-relaxed text-text-muted">
              入場無料・事前予約不要で、どなたでもお気軽にお越しいただけます。ご家族連れ、ご友人同士、地域の皆様、受験生など、幅広い世代の方々にお楽しみいただけます。
            </p>
          </div>

          <div class="highlights-container">
            <div class="highlight-item">
              <div>
                <h4 class="font-bold text-lg text-sprout-title mb-1">熱狂の音楽ステージ</h4>
                <p class="text-sm text-text-muted leading-relaxed">
                  屋内ホールでのスペシャルゲストライブや、青空の下の芝生広場での軽音楽・ダンスステージなど多彩な熱気をお届け！
                </p>
              </div>
            </div>

            <div class="highlight-item">
              <div>
                <h4 class="font-bold text-lg text-sprout-title mb-1">多彩な模擬店・グルメ</h4>
                <p class="text-sm text-text-muted leading-relaxed">
                  各サークル・学科による趣向を凝らした焼きそばやスイーツなどの屋台や、人気キッチンカーがメインストリートに大集結。
                </p>
              </div>
            </div>

            <div class="highlight-item">
              <div>
                <h4 class="font-bold text-lg text-sprout-title mb-1">文化展示・体験ワークショップ</h4>
                <p class="text-sm text-text-muted leading-relaxed">
                  研究発表、美術・写真展示、映画上映、スタンプラリーなど、日頃の学びと活動の成果が花開く企画が盛りだくさん。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Festival Outline -->
      <section class="section">
        <div class="section-header">
          <!-- アイコンSVG提供後に配置予定 -->
          <div class="section-title">
            <h2>開催概要</h2>
            <p>Festival Outline</p>
          </div>
        </div>

        <div class="outline-table-wrapper">
          <table class="outline-table">
            <tbody>
              <tr>
                <th>名称</th>
                <td>第77回 平潟祭（ひらかたさい）</td>
              </tr>
              <tr>
                <th>テーマ</th>
                <td>sprout（スプラウト）</td>
              </tr>
              <tr>
                <th>開催日時</th>
                <td>
                  2026年10月31日(土) 10:00〜17:00<br>
                  2026年11月1日(日) 10:00〜16:30
                </td>
              </tr>
              <tr>
                <th>会場</th>
                <td>
                  関東学院大学 金沢八景キャンパス<br>
                  〒236-8501 神奈川県横浜市金沢区六浦東1-50-1
                </td>
              </tr>
              <tr>
                <th>入場料</th>
                <td>無料（事前予約不要・どなたでも自由にご入場いただけます）</td>
              </tr>
              <tr>
                <th>主催</th>
                <td>平潟祭実行委員会</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center gap-4 mt-8 flex-wrap">
          <NuxtLink to="/events" class="btn btn-primary">
            企画一覧を見る →
          </NuxtLink>
          <NuxtLink to="/#access" class="btn btn-secondary">
            アクセス情報はこちら →
          </NuxtLink>
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

.theme-sprout-block {
  background: linear-gradient(135deg, var(--sprout-bg) 0%, #ffffff 100%);
  border: 2px solid var(--sprout-pale);
  border-left: 6px solid var(--sprout);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 36px;
}

.theme-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
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
  font-size: 26px;
  font-weight: 900;
  color: var(--sprout-dark);
  letter-spacing: 1px;
  margin: 0;
}

.theme-statement {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text);
}

.theme-statement strong {
  color: var(--sprout-dark);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 36px;
  align-items: start;
}

.highlights-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--sprout-bg);
  padding: 18px 20px;
  border-radius: 12px;
  border-left: 4px solid var(--sprout-border);
}

.outline-table-wrapper {
  overflow-x: auto;
}

.outline-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

.outline-table th,
.outline-table td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  text-align: left;
}

.outline-table th {
  width: 25%;
  background: var(--sprout-bg);
  color: var(--sprout-title);
  font-weight: 800;
  white-space: nowrap;
}

.outline-table td {
  color: var(--text);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>

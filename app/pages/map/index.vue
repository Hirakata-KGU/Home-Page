<script setup lang="ts">
import { ref } from 'vue';
import { mapData } from '~/data/maps';

useSeoMeta({
  title: '場内マップ・模擬店・施設案内｜平潟祭 2026',
  description: '平潟祭2026のキャンパス全体マップ、模擬店エリア、文化館（8号館）、音楽館（7号館）、屋内・屋外ステージの配置案内。クリックで企画詳細を確認できます。',
});

const currentTab = ref<'campus' | 'culture' | 'music'>('campus');
</script>

<template>
  <div>
    <LayoutPageHeader
      title="場内マップ・施設案内"
      sub-title="Campus & Building Maps"
      icon="🗺️"
      :breadcrumbs="[{ name: '場内マップ' }]"
    />

    <div class="page-container">
      <!-- Map Tab Selector -->
      <section class="section map-nav-section">
        <div class="map-tabs" role="tablist">
          <button
            class="tab-btn"
            :class="{ active: currentTab === 'campus' }"
            role="tab"
            :aria-selected="currentTab === 'campus'"
            @click="currentTab = 'campus'"
          >
            🗺️ キャンパス全体 ＆ 模擬店
          </button>
          <button
            class="tab-btn"
            :class="{ active: currentTab === 'culture' }"
            role="tab"
            :aria-selected="currentTab === 'culture'"
            @click="currentTab = 'culture'"
          >
            🎨 文化館（8号館）
          </button>
          <button
            class="tab-btn"
            :class="{ active: currentTab === 'music' }"
            role="tab"
            :aria-selected="currentTab === 'music'"
            @click="currentTab = 'music'"
          >
            🎵 音楽館（7号館）
          </button>
        </div>
      </section>

      <!-- Tab 1: Campus Overall & Stalls Map -->
      <section v-show="currentTab === 'campus'" class="section">
        <div class="section-header">
          <div class="section-icon">🏫</div>
          <div class="section-title">
            <h2>キャンパス全体 ＆ 模擬店エリア</h2>
            <p>Overall Campus & Food Stalls Map</p>
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
              大学公式キャンパスマップを見る ↗
            </a>
          </div>
        </div>

        <h3 class="zone-list-title">主要エリア・施設案内</h3>
        <p class="hint-text">💡 エリアカードをクリックすると、開催されている企画の詳細ページを開くことができます。</p>

        <div class="zones-grid">
          <template v-for="zone in mapData.campusZones" :key="zone.id">
            <NuxtLink
              v-if="zone.eventId"
              :to="`/events/${zone.eventId}`"
              class="zone-card clickable"
            >
              <div class="zone-card-icon">{{ zone.icon }}</div>
              <div class="zone-card-body">
                <span class="zone-location">{{ zone.location }}</span>
                <h4>{{ zone.name }}</h4>
                <p>{{ zone.description }}</p>
                <span class="zone-detail-link">開催企画の詳細を見る →</span>
              </div>
            </NuxtLink>
            <div v-else class="zone-card">
              <div class="zone-card-icon">{{ zone.icon }}</div>
              <div class="zone-card-body">
                <span class="zone-location">{{ zone.location }}</span>
                <h4>{{ zone.name }}</h4>
                <p>{{ zone.description }}</p>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- Tab 2: Culture Hall Map -->
      <section v-show="currentTab === 'culture'" class="section">
        <div class="section-header">
          <div class="section-icon">🎨</div>
          <div class="section-title">
            <h2>{{ mapData.cultureHall.buildingName }} フロア案内</h2>
            <p>Culture Hall Floors</p>
          </div>
        </div>

        <p class="building-desc">{{ mapData.cultureHall.description }}</p>

        <div class="floors-list">
          <div
            v-for="floor in mapData.cultureHall.floors"
            :key="floor.floor"
            class="floor-card"
          >
            <div class="floor-badge">{{ floor.floor }}</div>
            <div class="floor-content">
              <h3>{{ floor.name }}</h3>
              <ul class="floor-items">
                <li v-for="(item, idx) in floor.items" :key="idx">
                  <NuxtLink
                    v-if="item.eventId"
                    :to="`/events/${item.eventId}`"
                    class="floor-item-link"
                  >
                    ✓ {{ item.name }} <span class="arrow-tag">詳細 →</span>
                  </NuxtLink>
                  <span v-else>✓ {{ item.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 3: Music Hall Map -->
      <section v-show="currentTab === 'music'" class="section">
        <div class="section-header">
          <div class="section-icon">🎵</div>
          <div class="section-title">
            <h2>{{ mapData.musicHall.buildingName }} フロア案内</h2>
            <p>Music Hall Floors</p>
          </div>
        </div>

        <p class="building-desc">{{ mapData.musicHall.description }}</p>

        <div class="floors-list">
          <div
            v-for="floor in mapData.musicHall.floors"
            :key="floor.floor"
            class="floor-card"
          >
            <div class="floor-badge">{{ floor.floor }}</div>
            <div class="floor-content">
              <h3>{{ floor.name }}</h3>
              <ul class="floor-items">
                <li v-for="(item, idx) in floor.items" :key="idx">
                  <NuxtLink
                    v-if="item.eventId"
                    :to="`/events/${item.eventId}`"
                    class="floor-item-link"
                  >
                    ✓ {{ item.name }} <span class="arrow-tag">詳細 →</span>
                  </NuxtLink>
                  <span v-else>✓ {{ item.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Timetable Link Banner -->
      <section class="section timetable-link-banner">
        <div class="timetable-link-content">
          <div>
            <h3>ステージ進行やタイムテーブルはこちら</h3>
            <p>屋内ステージ・屋外ステージの並列タイムテーブルをチェック！</p>
          </div>
          <NuxtLink to="/schedule" class="btn btn-primary">タイムテーブルを見る 📅</NuxtLink>
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

.map-nav-section {
  padding: 16px 24px;
}

.map-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.tab-btn {
  padding: 14px 28px;
  border-radius: 50px;
  border: 2px solid var(--border);
  background: white;
  cursor: pointer;
  font-weight: 800;
  color: var(--muted);
  font-size: 15px;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  border-color: var(--olive);
  color: var(--olive);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
  color: white;
  border-color: transparent;
  box-shadow: var(--shadow-sm);
}

.campus-map-visual {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  margin-bottom: 32px;
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
}

.map-overlay a {
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 16px;
}

.map-overlay a:hover {
  color: var(--gold-light);
}

.zone-list-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 8px;
}

.hint-text {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 20px;
}

.zones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.zone-card {
  background: linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 100%);
  padding: 20px;
  border-radius: 12px;
  border-left: 5px solid var(--olive);
  display: flex;
  gap: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
}

.zone-card.clickable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--olive-dark);
}

.zone-card-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.zone-location {
  display: inline-block;
  background: white;
  color: var(--olive);
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 6px;
}

.zone-card-body h4 {
  font-size: 17px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 6px;
}

.zone-card-body p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}

.zone-detail-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 800;
  color: var(--olive);
}

.building-desc {
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 24px;
}

.floors-list {
  display: grid;
  gap: 20px;
}

.floor-card {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 20px;
  background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  align-items: start;
}

.floor-badge {
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
  color: white;
  font-size: 24px;
  font-weight: 900;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.floor-content h3 {
  font-size: 18px;
  font-weight: 800;
  color: var(--olive);
  margin-bottom: 12px;
}

.floor-items {
  list-style: none;
  display: grid;
  gap: 10px;
}

.floor-items li {
  font-size: 14px;
  color: var(--text);
  font-weight: 600;
}

.floor-item-link {
  color: var(--olive);
  text-decoration: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.floor-item-link:hover {
  text-decoration: underline;
}

.arrow-tag {
  font-size: 11px;
  background: var(--accent-2);
  padding: 2px 6px;
  border-radius: 4px;
}

.timetable-link-banner {
  background: linear-gradient(135deg, var(--olive) 0%, var(--olive-dark) 100%);
  color: white;
}

.timetable-link-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.timetable-link-content h3 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
}

.timetable-link-content p {
  font-size: 14px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .floor-card {
    grid-template-columns: 1fr;
  }

  .floor-badge {
    width: 60px;
    font-size: 18px;
    padding: 8px;
  }

  .timetable-link-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>

<template>
  <div class="notice-banner">
    <div class="container">
      <div class="notice-content">
        <span class="notice-icon">🌱</span>
        <span class="notice-text">
          <strong>2026年10月31日(土)・11月1日(日) 開催！</strong> テーマ「sprout」｜入場無料・予約不要
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notice-banner {
  background: linear-gradient(135deg, var(--sun-gold) 0%, var(--sun-gold-light) 100%);
  padding: 14px 0;
  text-align: center;
  color: #1a2e1c;
  font-size: 14px;
  box-shadow: var(--shadow-sm);
}

.notice-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
}

.notice-icon {
  font-size: 20px;
  animation: bounce 2s infinite;
}

@media (max-width: 768px) {
  .notice-text {
    font-size: 13px;
  }
}
</style>

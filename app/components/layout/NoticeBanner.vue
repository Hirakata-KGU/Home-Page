<template>
  <div class="notice-banner">
    <div class="container">
      <div class="notice-content">
        <span class="notice-icon">📢</span>
        <span>2026年10月31日(土)・11月1日(日) 開催決定！ 入場無料・予約不要</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notice-banner {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  padding: 20px 0;
  text-align: center;
  color: white;
}

.notice-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 700;
}

.notice-icon {
  font-size: 24px;
  animation: bounce 2s infinite;
}
</style>

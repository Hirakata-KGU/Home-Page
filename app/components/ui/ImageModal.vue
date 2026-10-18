<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css';
import { useImageModal } from '~/composables/useImageModal';

const {
  isOpen,
  galleryItems,
  currentIndex,
  closeImage,
} = useImageModal();

// vue-easy-lightbox 用の画像データ形式
const lightboxImgs = computed(() => {
  const total = galleryItems.value.length;
  return galleryItems.value.map((item, idx) => {
    const rawTitle = item.title || item.alt || '';
    const displayTitle = total > 1 && rawTitle ? `[${idx + 1} / ${total}] ${rawTitle}` : rawTitle;
    return {
      src: item.src,
      title: displayTitle,
      alt: rawTitle || '拡大画像プレビュー',
    };
  });
});

// インデックス更新
const onIndexChange = (oldIndex: number, newIndex: number) => {
  currentIndex.value = newIndex;
};

// モーダルが閉じられたときの処理
const onHide = () => {
  closeImage(false);
};

// ブラウザの「戻る」操作（popstate）を検知してダイアログだけを閉じる
const handlePopState = () => {
  if (isOpen.value) {
    closeImage(true);
  }
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});
</script>

<template>
  <ClientOnly>
    <VueEasyLightbox
      :visible="isOpen"
      :imgs="lightboxImgs"
      :index="currentIndex"
      :loop="true"
      :mask-closable="true"
      :move-disabled="false"
      :rotate-disabled="true"
      :pinch-disabled="false"
      :dblclick-disabled="false"
      :max-zoom="5"
      :min-zoom="0.5"
      :zoom-scale="0.2"
      @hide="onHide"
      @on-index-change="onIndexChange"
    >
      <!-- 学園祭サイト向けにツールバー（回転等の不要ボタン）を隠し、画像に集中できるようにする -->
      <template #toolbar>
        <span />
      </template>
    </VueEasyLightbox>
  </ClientOnly>
</template>

<style scoped>
/* 端から端までしっかり全画面表示（80vw / 80vh の制限を解除） */
:deep(.vel-modal) {
  background-color: rgba(5, 10, 5, 0.94) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  z-index: 99999 !important;
}

:deep(.vel-img) {
  max-width: 100vw !important;
  max-height: 100vh !important;
  box-shadow: none !important;
  background-color: transparent !important;
  object-fit: contain !important;
}

/* スマホ表示時も画面端から端までしっかり余白なく最大フィット */
@media (max-width: 750px) {
  :deep(.vel-img) {
    max-width: 100vw !important;
    max-height: 100vh !important;
  }
}

/* 閉じるボタンのスタイリング（押しやすく、画面端すぎない位置に調整） */
:deep(.vel-btns-wrapper .btn__close) {
  top: max(2.25rem, calc(env(safe-area-inset-top, 0px) + 1.25rem)) !important;
  right: max(1.5rem, calc(env(safe-area-inset-right, 0px) + 1.25rem)) !important;
  width: 44px !important;
  height: 44px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 9999px !important;
  background-color: rgba(0, 0, 0, 0.65) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  opacity: 0.9 !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}

@media (max-width: 750px) {
  :deep(.vel-btns-wrapper .btn__close) {
    top: max(2.75rem, calc(env(safe-area-inset-top, 0px) + 1.5rem)) !important;
    right: max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1rem)) !important;
  }
}

:deep(.vel-btns-wrapper .btn__close:hover) {
  background-color: rgba(0, 0, 0, 0.9) !important;
  opacity: 1 !important;
  transform: scale(1.05) !important;
}

/* 前後送りボタンのスタイリング */
:deep(.vel-btns-wrapper .btn__prev),
:deep(.vel-btns-wrapper .btn__next) {
  width: 44px !important;
  height: 44px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 9999px !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  opacity: 0.8 !important;
  transition: all 0.2s ease !important;
}

:deep(.vel-btns-wrapper .btn__prev:hover),
:deep(.vel-btns-wrapper .btn__next:hover) {
  background-color: rgba(0, 0, 0, 0.85) !important;
  opacity: 1 !important;
}

/* 画像タイトル */
:deep(.vel-img-title) {
  bottom: 2rem !important;
  padding: 0.5rem 1.25rem !important;
  border-radius: 9999px !important;
  background-color: rgba(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  color: #fff !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  opacity: 1 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}
</style>

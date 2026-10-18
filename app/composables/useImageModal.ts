export interface ModalImageItem {
  src: string;
  title?: string;
  alt?: string;
}

export const useImageModal = () => {
  const isOpen = useState<boolean>('custom_modal_is_open', () => false);
  const currentImage = useState<ModalImageItem | null>('custom_modal_current_image', () => null);
  const galleryItems = useState<ModalImageItem[]>('custom_modal_gallery_items', () => []);
  const currentIndex = useState<number>('custom_modal_current_index', () => 0);

  // ダイアログを閉じる（ユーザー操作で閉じた場合は積んだ履歴を1つ戻す）
  const closeImage = (fromHistory = false) => {
    if (!isOpen.value) return;
    isOpen.value = false;
    currentImage.value = null;

    if (!fromHistory && typeof window !== 'undefined' && window.history.state?.imageModal) {
      window.history.back();
    }
  };

  // 単体画像を開く
  const openImage = (url: string, title = '') => {
    if (!url) return;
    const item: ModalImageItem = { src: url, title };
    galleryItems.value = [item];
    currentIndex.value = 0;
    currentImage.value = item;
    isOpen.value = true;

    // ブラウザの戻る操作でダイアログだけを閉じるための履歴を追加
    if (typeof window !== 'undefined') {
      window.history.pushState({ imageModal: true }, '');
    }
  };

  // 複数画像ギャラリーを開く
  const openGallery = (
    items: { src: string; alt?: string; title?: string }[],
    startIndex = 0
  ) => {
    if (!items || !items.length) return;
    const formatted = items.map((it) => ({
      src: it.src,
      title: it.title || it.alt || '',
    }));
    galleryItems.value = formatted;
    currentIndex.value = startIndex;
    currentImage.value = formatted[startIndex] || formatted[0];
    isOpen.value = true;

    if (typeof window !== 'undefined') {
      window.history.pushState({ imageModal: true }, '');
    }
  };

  const nextImage = () => {
    if (currentIndex.value < galleryItems.value.length - 1) {
      currentIndex.value++;
      currentImage.value = galleryItems.value[currentIndex.value];
    }
  };

  const prevImage = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      currentImage.value = galleryItems.value[currentIndex.value];
    }
  };

  return {
    isOpen,
    currentImage,
    galleryItems,
    currentIndex,
    openImage,
    openGallery,
    closeImage,
    nextImage,
    prevImage,
  };
};

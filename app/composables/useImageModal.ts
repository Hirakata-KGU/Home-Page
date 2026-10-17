export interface GalleryItem {
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export const useImageModal = () => {
  const openGallery = async (items: GalleryItem[], index = 0) => {
    if (typeof window === 'undefined' || !items.length) return;

    // PhotoSwipe を動的インポート（クライアントサイドでのみ安全に実行）
    const PhotoSwipe = (await import('photoswipe')).default;

    // 各画像の天然解像度を取得して PhotoSwipe のデータソースを作成
    const dataSource = await Promise.all(
      items.map(async (item) => {
        if (item.width && item.height) {
          return {
            src: item.src,
            width: item.width,
            height: item.height,
            alt: item.alt || '',
          };
        }

        return new Promise<{ src: string; width: number; height: number; alt: string }>((resolve) => {
          const img = new Image();
          img.src = item.src;
          if (img.complete && img.naturalWidth) {
            resolve({
              src: item.src,
              width: img.naturalWidth,
              height: img.naturalHeight,
              alt: item.alt || '',
            });
          } else {
            img.onload = () => {
              resolve({
                src: item.src,
                width: img.naturalWidth || window.innerWidth,
                height: img.naturalHeight || window.innerHeight,
                alt: item.alt || '',
              });
            };
            img.onerror = () => {
              resolve({
                src: item.src,
                width: window.innerWidth,
                height: window.innerHeight,
                alt: item.alt || '',
              });
            };
          }
        });
      })
    );

    const pswp = new PhotoSwipe({
      dataSource,
      index,
      showHideAnimationType: 'fade',
      bgOpacity: 0.88,
      wheelToZoom: true,
      arrowKeys: items.length > 1,
      closeTitle: '閉じる',
      zoomTitle: '拡大 / 縮小',
      arrowPrevTitle: '前の画像',
      arrowNextTitle: '次の画像',
    });

    pswp.init();
  };

  const openImage = (url: string, alt = '', caption = '') => {
    if (!url) return;
    openGallery([{ src: url, alt, caption }], 0);
  };

  return {
    openImage,
    openGallery,
  };
};

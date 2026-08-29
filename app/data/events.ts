export interface EventItem {
  id: string;
  icon: string;
  category: string;
  title: string;
  description: string;
  gradient?: string;
}

export const eventItems: EventItem[] = [
  {
    id: 'main-stage',
    icon: '🎤',
    category: '芸能・ステージ',
    title: 'メインステージ',
    description: 'オープニングセレモニー、学生バンド・ダンスパフォーマンス、特別ゲストライブ、トークショーなど、2日間を通して熱いステージが繰り広げられます。',
  },
  {
    id: 'outdoor-stage',
    icon: '🎸',
    category: '音楽',
    title: '野外ステージ（軽音楽）',
    description: '開放的な野外空間で、軽音楽サークルによるフリーライブを開催。夕方の盛り上がりは必見です。バンドからアコースティックまで多彩な演奏をお楽しみください。',
    gradient: 'linear-gradient(135deg, #c9a85a 0%, #d4b972 100%)',
  },
  {
    id: 'food-stalls',
    icon: '🍜',
    category: 'グルメ',
    title: '模擬店エリア',
    description: '学生団体による手作り模擬店が多数出店。焼きそば、たこ焼き、唐揚げなどの定番から、オリジナルメニューまで。地元フードトラックも参加予定！',
    gradient: 'linear-gradient(135deg, #4a7f52 0%, #5f8b57 100%)',
  },
  {
    id: 'music-hall',
    icon: '🎵',
    category: '音楽',
    title: '音楽館コンサート',
    description: '室内ホールでのクラシック、ジャズ、アコースティックライブ。座席限定の特別企画で、落ち着いた雰囲気の中、質の高い音楽をお楽しみいただけます。',
    gradient: 'linear-gradient(135deg, #2f5b34 0%, #4a7f52 100%)',
  },
  {
    id: 'culture-hall',
    icon: '🎨',
    category: '展示・文化',
    title: '文化館（展示・発表）',
    description: '美術作品展示、写真展、研究発表、ワークショップなど、学生の学びと創造性が詰まった企画が集結。体験型コンテンツも多数ご用意しています。',
    gradient: 'linear-gradient(135deg, #5f8b57 0%, #4a7f52 100%)',
  },
  {
    id: 'stamp-rally',
    icon: '🎯',
    category: '参加型企画',
    title: 'スタンプラリー',
    description: 'キャンパス内の各所を巡り、スタンプを集めて抽選に参加！豪華景品が当たるチャンスです。家族連れにも大人気の企画です。',
    gradient: 'linear-gradient(135deg, #c9a85a 0%, #d4b972 100%)',
  },
  {
    id: 'dance-performance',
    icon: '🎭',
    category: '芸能',
    title: 'ダンス・パフォーマンス',
    description: 'ダンスサークルによる迫力のステージパフォーマンス。ヒップホップ、ジャズダンス、ブレイクダンスなど、多様なジャンルが登場します。',
    gradient: 'linear-gradient(135deg, #1e3d26 0%, #2f5b34 100%)',
  },
  {
    id: 'movie-screening',
    icon: '🎬',
    category: '映像',
    title: '学生映画上映会',
    description: '映像制作サークルによるオリジナル作品の上映会。ショートフィルムからドキュメンタリーまで、学生の才能が光る作品をご覧いただけます。',
    gradient: 'linear-gradient(135deg, #4a7f52 0%, #2f5b34 100%)',
  },
];

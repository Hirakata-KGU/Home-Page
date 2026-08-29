export type EventCategory = 'stage' | 'music' | 'food' | 'exhibition' | 'experience';
export type EventDay = 'day1' | 'day2' | 'both';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  categoryLabel: string;
  locationName: string;
  locationTab?: 'campus' | 'culture' | 'music';
  day: EventDay;
  dayLabel: string;
  timeRange: string;
  organizer: string;
  description: string;
  details?: string[];
  icon: string;
  gradient?: string;
  tags: string[];
}

export const categoryList: { key: 'all' | EventCategory; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'stage', label: '芸能・ステージ' },
  { key: 'music', label: '音楽ライブ' },
  { key: 'food', label: '模擬店・グルメ' },
  { key: 'exhibition', label: '展示・文化' },
  { key: 'experience', label: '体験・参加型' },
];

export const allEvents: EventItem[] = [
  // --- 屋内ステージ (SCC 4F) ---
  {
    id: 'opening-ceremony',
    title: '開会式・オープニングセレモニー',
    category: 'stage',
    categoryLabel: '芸能・ステージ',
    locationName: '屋内ステージ（SCC 4F）',
    day: 'day1',
    dayLabel: '10/31（土）',
    timeRange: '10:00 - 10:45',
    organizer: '平潟祭実行委員会',
    description: '平潟祭2026の開幕を告げるオープニングセレモニー！学長挨拶、実行委員長挨拶、学生パフォーマンスで華やかにスタートします。',
    details: [
      '学長・実行委員長による開会宣言',
      '吹奏楽部ファンファーレ',
      '学生ダンスチームによるオープニングアクト',
    ],
    icon: '🎉',
    gradient: 'linear-gradient(135deg, #2f5b34 0%, #4a7f52 100%)',
    tags: ['開会式', 'オープニング', 'SCC4F'],
  },
  {
    id: 'dance-show',
    title: 'ダンスパフォーマンス合同公演',
    category: 'stage',
    categoryLabel: '芸能・ステージ',
    locationName: '屋内ステージ（SCC 4F）',
    day: 'day1',
    dayLabel: '10/31（土）',
    timeRange: '13:30 - 14:45',
    organizer: 'ダンス部 ＆ 有志ダンスサークル',
    description: 'ヒップホップ、ジャズ、ブレイクダンス、K-POPカバーなど、迫力のステージパフォーマンスをお届けします！',
    details: [
      'ジャンル別選抜チームによるショウケース',
      '照明演出と重低音サウンドによる圧巻のステージ',
      '来場者参加の簡単ダンスミニレクチャーあり',
    ],
    icon: '🎭',
    gradient: 'linear-gradient(135deg, #1e3d26 0%, #2f5b34 100%)',
    tags: ['ダンス', 'パフォーマンス', 'SCC4F'],
  },
  {
    id: 'comedy-live',
    title: 'お笑いライブ ＆ トークショー',
    category: 'stage',
    categoryLabel: '芸能・ステージ',
    locationName: '屋内ステージ（SCC 4F）',
    day: 'day2',
    dayLabel: '11/1（日）',
    timeRange: '13:00 - 14:00',
    organizer: '平潟祭実行委員会 企画部',
    description: '人気お笑い芸人をゲストに招いたスペシャルライブ！爆笑の漫才・コントと、学生との掛け合いトークをお楽しみください。',
    details: [
      'ゲスト芸人による漫才・コントステージ',
      '学生からの質問コーナー・お悩み相談トーク',
      'サイン色紙が当たるプレゼント企画',
    ],
    icon: '🎙️',
    gradient: 'linear-gradient(135deg, #c9a85a 0%, #d4b972 100%)',
    tags: ['お笑い', 'ゲスト', 'SCC4F', '人気企画'],
  },
  {
    id: 'special-guest-live',
    title: '平潟祭2026 特別ゲスト 音楽ライブ',
    category: 'stage',
    categoryLabel: '芸能・ステージ',
    locationName: '屋内ステージ（SCC 4F）',
    day: 'day2',
    dayLabel: '11/1（日）',
    timeRange: '15:30 - 16:45',
    organizer: '平潟祭実行委員会',
    description: '今年の平潟祭を彩るスペシャルゲストアーティストによる熱狂のワンマンライブ！',
    details: [
      '座席指定整理券を当日 10:00 より本部テントにて配布予定',
      'ペンライト・応援グッズの持込可',
      'ゲスト情報は公式SNSにて順次公開！',
    ],
    icon: '🎤',
    gradient: 'linear-gradient(135deg, #2f5b34 0%, #1e3d26 100%)',
    tags: ['スペシャルゲスト', 'ライブ', 'SCC4F', '注目'],
  },
  {
    id: 'grand-finale',
    title: '表彰式 ＆ グランドフィナーレ',
    category: 'stage',
    categoryLabel: '芸能・ステージ',
    locationName: '屋内ステージ（SCC 4F）',
    day: 'day2',
    dayLabel: '11/1（日）',
    timeRange: '18:00 - 19:30',
    organizer: '平潟祭実行委員会',
    description: '2日間の感動を締めくくるグランドフィナーレ！スタンプラリー大抽選会、模擬店グランプリ発表、エンディングセレモニー。',
    details: [
      '模擬店グランプリ結果発表 ＆ 授賞式',
      'スタンプラリー豪華賞品の大抽選会',
      'フィナーレ映像上映 ＆ 全員合唱',
    ],
    icon: '✨',
    gradient: 'linear-gradient(135deg, #c9a85a 0%, #4a7f52 100%)',
    tags: ['フィナーレ', '抽選会', '表彰式', 'SCC4F'],
  },

  // --- 屋外ステージ (芝生広場) ---
  {
    id: 'outdoor-band-live-1',
    title: '学生バンドライブ Vol.1（ポップス＆ロック）',
    category: 'music',
    categoryLabel: '音楽ライブ',
    locationName: '屋外ステージ（芝生広場）',
    day: 'day1',
    dayLabel: '10/31（土）',
    timeRange: '12:00 - 13:30',
    organizer: '軽音楽部 / ロックサークル',
    description: '青空の下で楽しむ軽音サークル選抜バンドのライブステージ！J-POPから話題のアニメソング、定番ロックナンバーまで。',
    details: [
      '3バンドによるリレー形式のライブ演奏',
      '芝生エリアで自由に観覧可能（スタンディング・レジャーシート可）',
    ],
    icon: '🎸',
    gradient: 'linear-gradient(135deg, #c9a85a 0%, #d4b972 100%)',
    tags: ['軽音', 'バンド', '野外', 'ロック'],
  },
  {
    id: 'sunset-rock-fes',
    title: 'サンセット・ロックフェス 2026',
    category: 'music',
    categoryLabel: '音楽ライブ',
    locationName: '屋外ステージ（芝生広場）',
    day: 'day1',
    dayLabel: '10/31（土）',
    timeRange: '16:30 - 18:00',
    organizer: '軽音楽部 オールスターズ',
    description: '夕暮れから夜にかけての野外フェス空間！エモーショナルなサウンドと照明が芝生広場を包み込みます。',
    details: [
      '実力派上位バンドによる特別ロングセット演奏',
      'ステージ終了後（18:30〜）はフィナーレ花火演出を実施',
    ],
    icon: '🔥',
    gradient: 'linear-gradient(135deg, #4a7f52 0%, #1e3d26 100%)',
    tags: ['フェス', '野外', '花火', '軽音'],
  },
  {
    id: 'outdoor-band-battle',
    title: '野外ファイナル・バンドバトル',
    category: 'music',
    categoryLabel: '音楽ライブ',
    locationName: '屋外ステージ（芝生広場）',
    day: 'day2',
    dayLabel: '11/1（日）',
    timeRange: '17:00 - 18:30',
    organizer: '学内音楽サークル連合',
    description: '2日目野外ステージのラストを飾るバンド対決！観客の拍手でベストアクトを決定します。',
    details: [
      '各音楽サークルの代表バンドによる熱いセッション',
      '熱気あふれるコール＆レスポンス',
    ],
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #c9a85a 0%, #4a7f52 100%)',
    tags: ['バンドバトル', '野外', 'クライマックス'],
  },

  // --- 音楽館 (7号館) ---
  {
    id: 'acoustic-live',
    title: 'アコースティック ＆ ジャズ サウンド',
    category: 'music',
    categoryLabel: '音楽ライブ',
    locationName: '音楽館ホール（7号館 1F）',
    locationTab: 'music',
    day: 'both',
    dayLabel: '両日開催',
    timeRange: '14:30 - 16:00',
    organizer: 'ジャズ研究会 / アコースティックギター部',
    description: '本格音響ホールで聴く、上質なアコースティックとジャズのアンサンブル。落ち着いた空間でゆったりとした時間を。',
    details: [
      'アコースティックギター、ピアノ、サックス等の生演奏',
      '座席数限定（全席着席での鑑賞）',
      '2Fホワイエにて楽器体験コーナーも併設',
    ],
    icon: '🎵',
    gradient: 'linear-gradient(135deg, #2f5b34 0%, #4a7f52 100%)',
    tags: ['ジャズ', 'アコースティック', '音楽館', '室内楽'],
  },

  // --- 模擬店・グルメ ---
  {
    id: 'food-stalls-area',
    title: '学生模擬店ストリート ＆ キッチンカー',
    category: 'food',
    categoryLabel: '模擬店・グルメ',
    locationName: 'メインストリート（正門〜メイン広場）',
    locationTab: 'campus',
    day: 'both',
    dayLabel: '両日開催',
    timeRange: '11:00 - 17:30',
    organizer: '各学生サークル・ゼミ ＆ 地元人気キッチンカー',
    description: '約30店舗の手作り模擬店が大集結！定番の焼きそば・たこ焼き・唐揚げから、クレープや映えスイーツまで。',
    details: [
      '模擬店グランプリ投票受付中（QRコードで投票）',
      '地元横浜・金沢八景の人気フードトラックも出店',
      'エコ容器の使用でゴミ分別にご協力ください',
    ],
    icon: '🍜',
    gradient: 'linear-gradient(135deg, #4a7f52 0%, #5f8b57 100%)',
    tags: ['模擬店', 'グルメ', '食べ歩き', 'キッチンカー'],
  },

  // --- 文化館 (8号館) 展示・上映 ---
  {
    id: 'art-photo-exhibition',
    title: 'アート ＆ 写真作品展「彩」',
    category: 'exhibition',
    categoryLabel: '展示・文化',
    locationName: '文化館 2F（8号館）',
    locationTab: 'culture',
    day: 'both',
    dayLabel: '両日開催',
    timeRange: '10:00 - 17:00',
    organizer: '美術部 ＆ 写真部 ＆ 書道部',
    description: '学生たちがこの1年間で制作した絵画、写真、書道の大作を展示。個性が光る多彩な作品空間です。',
    details: [
      '写真部によるポストカード無料配布あり',
      '来場者による「お気に入り作品投票」実施中',
      '書道部による大型掛け軸作品は必見',
    ],
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #5f8b57 0%, #4a7f52 100%)',
    tags: ['美術', '写真', '書道', '文化館'],
  },
  {
    id: 'student-movie-screening',
    title: '学生ショートフィルム映画上映会',
    category: 'exhibition',
    categoryLabel: '展示・文化',
    locationName: '文化館 3F シアタールーム（8号館）',
    locationTab: 'culture',
    day: 'both',
    dayLabel: '両日開催',
    timeRange: '12:00 - 16:30',
    organizer: '映像制作サークル',
    description: '学生監督によるオリジナルショートフィルム、ドキュメンタリー、アニメーション作品の上映会。',
    details: [
      '1作品約15〜20分で順次ループ上映（入退場自由）',
      '上映スケジュールは会場入口の掲示板をご確認ください',
    ],
    icon: '🎬',
    gradient: 'linear-gradient(135deg, #4a7f52 0%, #2f5b34 100%)',
    tags: ['映画', '映像', '文化館', '上映会'],
  },
  {
    id: 'culture-workshops',
    title: '手作りクラフト ＆ 茶道体験ワークショップ',
    category: 'experience',
    categoryLabel: '体験・参加型',
    locationName: '文化館 1F エントランス（8号館）',
    locationTab: 'culture',
    day: 'both',
    dayLabel: '両日開催',
    timeRange: '11:00 - 16:00',
    organizer: '手芸同好会 ＆ 茶道部',
    description: 'お子様から大人まで楽しめるレジンアクセサリー・キャンドル作りワークショップとお抹茶のおもてなし。',
    details: [
      '手作りアクセサリー制作（材料費: 300円〜）',
      '茶道部による本格お茶席体験（お茶菓子付き）',
      '所要時間約15〜30分、予約不要',
    ],
    icon: '🍵',
    gradient: 'linear-gradient(135deg, #2f5b34 0%, #c9a85a 100%)',
    tags: ['ワークショップ', '茶道', '体験', '文化館'],
  },

  // --- 参加型企画 ---
  {
    id: 'stamp-rally',
    title: 'キャンパス周遊！スタンプラリー',
    category: 'experience',
    categoryLabel: '体験・参加型',
    locationName: 'キャンパス全域（台紙受取：本部テント）',
    locationTab: 'campus',
    day: 'both',
    dayLabel: '両日開催',
    timeRange: '10:00 - 17:00',
    organizer: '平潟祭実行委員会 広報部',
    description: 'キャンパス内の6つのチェックポイントを巡ってスタンプを集めよう！すべて集めると大抽選会に参加できます。',
    details: [
      '台紙は正門前「本部テント」にて無料配布',
      '全チェックポイント達成で景品交換 ＆ 大抽選会参加券をゲット',
      '家族連れにも大人気の定番企画',
    ],
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #c9a85a 0%, #d4b972 100%)',
    tags: ['スタンプラリー', '抽選会', '参加型', '景品'],
  },
];

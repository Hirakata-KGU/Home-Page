export interface MapZone {
  id: string;
  name: string;
  location: string;
  description: string;
  icon: string;
  eventId?: string;
}

export interface BuildingFloorItem {
  name: string;
  eventId?: string;
}

export interface BuildingFloor {
  floor: string;
  name: string;
  items: BuildingFloorItem[];
}

export interface MapData {
  campusZones: MapZone[];
  cultureHall: {
    buildingName: string;
    description: string;
    floors: BuildingFloor[];
  };
  musicHall: {
    buildingName: string;
    description: string;
    floors: BuildingFloor[];
  };
}

export const mapData: MapData = {
  campusZones: [
    {
      id: 'main-street',
      name: 'メインストリート（模擬店通り）',
      location: '正門〜メイン広場',
      description: '約30店舗の学生模擬店・キッチンカーが立ち並ぶメインエリア。焼きそば・たこ焼き・スイーツなど多彩なグルメが集結！',
      icon: '🍜',
      eventId: 'food-stalls-area',
    },
    {
      id: 'indoor-stage',
      name: '屋内ステージ（SCC 4F）',
      location: 'SCC（学生センター）4階ホール',
      description: '音響・照明完備の屋内ホール。オープニングセレモニー、ゲストライブ、お笑い企画、グランドフィナーレ等を開催。',
      icon: '🎤',
      eventId: 'special-guest-live',
    },
    {
      id: 'outdoor-stage',
      name: '屋外ステージ（芝生広場）',
      location: '体育館横 芝生広場',
      description: '青空の下で楽しむ軽音楽サークルによるフリーライブ＆ダンスパフォーマンス！夕方のサンセットライブも必見。',
      icon: '🎸',
      eventId: 'sunset-rock-fes',
    },
    {
      id: 'culture-hall',
      name: '文化館（8号館）',
      location: '8号館 各教室',
      description: '美術部展、写真展、学術・研究発表、映画上映会、体験ワークショップなど、学生の学びと創造が集うエリア。',
      icon: '🎨',
      eventId: 'art-photo-exhibition',
    },
    {
      id: 'music-hall',
      name: '音楽館（7号館）',
      location: '7号館 音楽ホール',
      description: 'クラシック、ジャズ、アコースティックなど、落ち着いた空間で上質な音楽をゆったり堪能できるホール。',
      icon: '🎵',
      eventId: 'acoustic-live',
    },
    {
      id: 'hq-tent',
      name: '総合案内・本部テント・救護室',
      location: '正門ロータリー前',
      description: 'パンフレット配布、スタンプラリー台紙受取、落とし物・迷子対応、救護スタッフ常駐。',
      icon: '⛺',
      eventId: 'stamp-rally',
    },
  ],
  cultureHall: {
    buildingName: '文化館（8号館）',
    description: '展示・ワークショップ・上映会が行われる文化系サークルの拠点です。',
    floors: [
      {
        floor: '1F',
        name: 'エントランス ＆ 体験ワークショップ',
        items: [
          { name: '総合受付・案内' },
          { name: '手作りクラフト ＆ 茶道体験ワークショップ', eventId: 'culture-workshops' },
        ],
      },
      {
        floor: '2F',
        name: 'アート・写真展示フロア',
        items: [
          { name: 'アート ＆ 写真作品展「彩」', eventId: 'art-photo-exhibition' },
          { name: '書道部 大型掛け軸作品展示' },
        ],
      },
      {
        floor: '3F',
        name: '学術研究・シアタールーム',
        items: [
          { name: '学生ショートフィルム映画上映会', eventId: 'student-movie-screening' },
          { name: 'ゼミ・研究室ポスター発表' },
        ],
      },
    ],
  },
  musicHall: {
    buildingName: '音楽館（7号館）',
    description: 'アコースティックやクラシック、室内楽のための本格音響ホールです。',
    floors: [
      {
        floor: '1F',
        name: 'メイン音楽ホール',
        items: [
          { name: 'アコースティック ＆ ジャズ サウンド', eventId: 'acoustic-live' },
          { name: '座席受付（整理券配布案内）' },
        ],
      },
      {
        floor: '2F',
        name: 'ホワイエ ＆ 楽器体験コーナー',
        items: [
          { name: '出演者物販・CD販売' },
          { name: '楽器ふれあい体験ブース' },
        ],
      },
    ],
  },
};

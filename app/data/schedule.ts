export interface StageProgram {
  title: string;
  timeRange: string;
  performer?: string;
  eventId?: string;
  isSpecial?: boolean;
}

export interface ParallelTimeSlot {
  timeLabel: string;
  indoor?: StageProgram;
  outdoor?: StageProgram;
  other?: StageProgram;
}

export interface DayParallelSchedule {
  id: 'day1' | 'day2';
  dayName: string;
  dateLabel: string;
  slots: ParallelTimeSlot[];
}

export const parallelScheduleData: DayParallelSchedule[] = [
  {
    id: 'day1',
    dayName: '10月31日（土）',
    dateLabel: 'Day 1',
    slots: [
      {
        timeLabel: '10:00',
        indoor: {
          title: '開会式・オープニングセレモニー',
          timeRange: '10:00 - 10:45',
          performer: '学長 / 実行委員会 / 吹奏楽部',
          eventId: 'opening-ceremony',
          isSpecial: true,
        },
        other: {
          title: 'スタンプラリー・各展示スタート',
          timeRange: '10:00 - 17:00',
          performer: '文化館・本部テント',
          eventId: 'stamp-rally',
        },
      },
      {
        timeLabel: '11:00',
        indoor: {
          title: '吹奏楽部 ポップスコンサート',
          timeRange: '11:30 - 12:30',
          performer: '関東学院大学 吹奏楽部',
        },
        outdoor: {
          title: '野外オープニング DJ ＆ パフォーマンス',
          timeRange: '11:00 - 12:00',
          performer: 'DJサークル',
        },
        other: {
          title: '模擬店ストリート オープン',
          timeRange: '11:00 - 17:30',
          performer: '約30店舗の模擬店',
          eventId: 'food-stalls-area',
        },
      },
      {
        timeLabel: '12:00',
        outdoor: {
          title: '学生バンドライブ Vol.1',
          timeRange: '12:00 - 13:30',
          performer: '軽音楽サークル 3バンド',
          eventId: 'outdoor-band-live-1',
        },
        other: {
          title: '学生映画上映会',
          timeRange: '12:00 - 16:30',
          performer: '文化館 3F シアタールーム',
          eventId: 'student-movie-screening',
        },
      },
      {
        timeLabel: '13:30',
        indoor: {
          title: 'ダンスパフォーマンス合同公演',
          timeRange: '13:30 - 14:45',
          performer: 'ダンス部 / 有志チーム',
          eventId: 'dance-show',
          isSpecial: true,
        },
        outdoor: {
          title: 'ストリートダンス ＆ ダブルダッチ',
          timeRange: '14:00 - 15:30',
          performer: 'パフォーマンスサークル',
        },
      },
      {
        timeLabel: '14:30',
        other: {
          title: 'アコースティック ＆ ジャズ サウンド',
          timeRange: '14:30 - 16:00',
          performer: '音楽館ホール（7号館）',
          eventId: 'acoustic-live',
        },
      },
      {
        timeLabel: '15:30',
        indoor: {
          title: 'アカペラ ヴォーカルショー',
          timeRange: '15:30 - 16:30',
          performer: 'アカペラサークル',
        },
      },
      {
        timeLabel: '16:30',
        outdoor: {
          title: 'サンセット・ロックフェス 2026',
          timeRange: '16:30 - 18:00',
          performer: '軽音楽部 選抜バンド',
          eventId: 'sunset-rock-fes',
          isSpecial: true,
        },
        indoor: {
          title: '軽音楽部 選抜アコースティック',
          timeRange: '17:30 - 18:30',
          performer: '軽音楽部',
        },
      },
      {
        timeLabel: '18:30',
        outdoor: {
          title: '1日目フィナーレ・花火演出',
          timeRange: '18:30 - 18:45',
          performer: '屋外ステージ前広場',
          isSpecial: true,
        },
      },
    ],
  },
  {
    id: 'day2',
    dayName: '11月1日（日）',
    dateLabel: 'Day 2',
    slots: [
      {
        timeLabel: '10:00',
        other: {
          title: '2日目オープン・スタンプラリー開始',
          timeRange: '10:00 - 17:00',
          performer: '本部テント・各ポイント',
          eventId: 'stamp-rally',
        },
      },
      {
        timeLabel: '10:30',
        indoor: {
          title: 'ゴスペル・クワイア ライブ',
          timeRange: '10:30 - 11:30',
          performer: '宗教部・聖歌隊',
        },
        outdoor: {
          title: 'フリースタイル・セッション',
          timeRange: '10:30 - 12:00',
          performer: '有志学生ミュージシャン',
        },
        other: {
          title: '模擬店ストリート オープン',
          timeRange: '11:00 - 17:30',
          performer: 'メインストリート',
          eventId: 'food-stalls-area',
        },
      },
      {
        timeLabel: '12:30',
        outdoor: {
          title: 'ブラスアンサンブル ＆ マーチング',
          timeRange: '12:30 - 14:00',
          performer: '応援団・吹奏楽団',
        },
        other: {
          title: '学生映画上映会',
          timeRange: '12:00 - 16:30',
          performer: '文化館 3F',
          eventId: 'student-movie-screening',
        },
      },
      {
        timeLabel: '13:00',
        indoor: {
          title: 'お笑いライブ ＆ トークショー',
          timeRange: '13:00 - 14:00',
          performer: 'スペシャルゲスト芸人',
          eventId: 'comedy-live',
          isSpecial: true,
        },
      },
      {
        timeLabel: '14:30',
        outdoor: {
          title: 'アコースティック ＆ ジャズ セッション',
          timeRange: '14:30 - 16:00',
          performer: 'ジャズ研究会',
          eventId: 'acoustic-live',
        },
      },
      {
        timeLabel: '15:30',
        indoor: {
          title: '平潟祭2026 特別ゲスト 音楽ライブ',
          timeRange: '15:30 - 16:45',
          performer: '特別ゲストアーティスト',
          eventId: 'special-guest-live',
          isSpecial: true,
        },
      },
      {
        timeLabel: '17:00',
        outdoor: {
          title: '野外ファイナル・バンドバトル',
          timeRange: '17:00 - 18:30',
          performer: '軽音楽サークル オールスターズ',
          eventId: 'outdoor-band-battle',
          isSpecial: true,
        },
      },
      {
        timeLabel: '18:00',
        indoor: {
          title: '表彰式 ＆ グランドフィナーレ',
          timeRange: '18:00 - 19:30',
          performer: '大抽選会・模擬店グランプリ',
          eventId: 'grand-finale',
          isSpecial: true,
        },
      },
    ],
  },
];

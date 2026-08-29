export interface ScheduleItem {
  time: string;
  label?: string;
  title: string;
  description: string;
  location: string;
}

export interface DaySchedule {
  id: string;
  dayName: string;
  dateLabel: string;
  items: ScheduleItem[];
}

export const scheduleData: DaySchedule[] = [
  {
    id: 'day1',
    dayName: '10月31日（土）',
    dateLabel: 'Day 1',
    items: [
      {
        time: '10:00',
        label: 'START',
        title: '開会式・オープニングセレモニー',
        description: '平潟祭2026の幕開け！学長挨拶、実行委員長挨拶、オープニングパフォーマンスで華やかにスタート。',
        location: 'メインステージ',
      },
      {
        time: '11:00',
        label: 'OPEN',
        title: '模擬店エリアオープン',
        description: '約30店舗の模擬店が一斉オープン！焼きそば、たこ焼き、唐揚げ、クレープ、ドリンクなど多彩なグルメをお楽しみください。',
        location: '模擬店エリア（キャンパス各所）',
      },
      {
        time: '12:00',
        title: '学生バンドライブ Vol.1',
        description: '軽音楽サークルによる熱いライブステージ。J-POP、ロック、ポップスなど幅広いジャンルの楽曲を演奏します。',
        location: 'メインステージ',
      },
      {
        time: '13:30',
        title: 'ダンスパフォーマンスショー',
        description: 'ダンスサークル合同公演。ヒップホップ、ジャズ、ブレイクダンスなど、圧巻のパフォーマンスをお届けします。',
        location: 'メインステージ',
      },
      {
        time: '15:00',
        title: 'アコースティックライブ',
        description: '音楽館での落ち着いた雰囲気のアコースティックライブ。座席限定の特別企画です（入場整理券配布あり）。',
        location: '音楽館ホール',
      },
      {
        time: '16:30',
        title: '野外ステージ（軽音楽フリーライブ）',
        description: '開放的な野外空間で、夕暮れ時のライブを満喫。複数バンドが次々に登場する、フェス形式のライブです。',
        location: '野外ステージエリア',
      },
      {
        time: '18:30',
        label: 'FINALE',
        title: '1日目フィナーレ・花火演出',
        description: '1日目を締めくくるフィナーレイベント。夜空を彩る花火と音楽のコラボレーション（天候により変更の可能性あり）。',
        location: 'メインステージ前広場',
      },
    ],
  },
  {
    id: 'day2',
    dayName: '11月1日（日）',
    dateLabel: 'Day 2',
    items: [
      {
        time: '10:00',
        label: 'START',
        title: '2日目オープン・スタンプラリー開始',
        description: '2日目スタート！スタンプラリーの受付開始。キャンパス内6箇所を巡って、豪華景品をゲットしよう。',
        location: '各ポイント・本部テント',
      },
      {
        time: '11:00',
        title: '文化館企画スタート',
        description: '美術展、写真展、研究発表、ワークショップなど、文化系企画が本格始動。体験型コンテンツも多数ご用意。',
        location: '文化館（各教室）',
      },
      {
        time: '12:00',
        title: '学生映画上映会',
        description: '映像制作サークルによるオリジナル作品上映。ショートフィルム、ドキュメンタリー、アニメーションなど多彩なラインナップ。',
        location: '文化館シアタールーム',
      },
      {
        time: '13:00',
        title: 'お笑いライブ・トークショー',
        description: 'お笑い芸人によるスペシャルライブステージ。ゲストとのトークセッションも予定しています。',
        location: 'メインステージ',
      },
      {
        time: '15:00',
        label: 'SPECIAL',
        title: '特別ゲストライブ',
        description: '平潟祭2026のスペシャルゲストによるライブパフォーマンス！（ゲストは後日発表予定）',
        location: 'メインステージ',
      },
      {
        time: '17:00',
        title: '学生バンドライブ Vol.2',
        description: '2日目のバンドライブ。フィナーレに向けて会場のボルテージが最高潮に！',
        location: 'メインステージ',
      },
      {
        time: '18:00',
        title: '表彰式・抽選会',
        description: 'スタンプラリー参加者による大抽選会。豪華賞品が当たるチャンス！模擬店コンテストの表彰も行います。',
        location: 'メインステージ',
      },
      {
        time: '19:00',
        label: 'END',
        title: '閉会式・グランドフィナーレ',
        description: '平潟祭2026のフィナーレ。全員でエンディングソングを歌い、2日間の感動を共有します。来年の再会を約束して！',
        location: 'メインステージ',
      },
    ],
  },
];

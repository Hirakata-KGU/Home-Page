import { allEvents, type EventItem } from '~/data/events';

export interface BuildingFloorData {
  floor: string;
  floorLabel: string;
  description?: string;
  events: EventItem[];
}

export interface BuildingData {
  id: 'no3' | 'no6' | 'no7' | 'no8' | 'scc';
  name: string;
  subName: string;
  description: string;
  floors: BuildingFloorData[];
}

// 建物ごとの階層データ生成
export const getBuildingDataList = (): Record<string, BuildingData> => {
  // 3号館: 3-204, 3-205, 3-206
  const no3_2F = allEvents.filter(e => e.room === '3-204' || e.room === '3-205' || e.room === '3-206');

  // 6号館: 6-101
  const no6_1F = allEvents.filter(e => e.room === '6-101');

  // 7号館:
  const no7_2F = allEvents.filter(e => e.locationName?.includes('7-201') || e.locationName?.includes('7-203') || e.room?.includes('7-201') || e.room?.includes('7-203'));
  const no7_3F = allEvents.filter(e => e.locationName?.includes('7-301') || e.locationName?.includes('7-303') || e.room?.includes('7-301') || e.room?.includes('7-303'));
  const no7_4F = allEvents.filter(e => e.locationName?.includes('7-401') || e.locationName?.includes('7-403') || e.room?.includes('7-401') || e.room?.includes('7-403'));

  // 8号館:
  const no8_1F = allEvents.filter(e => e.room?.includes('8-101') || e.room?.includes('8-102') || e.room?.includes('8-103・105'));
  const no8_2F = allEvents.filter(e => e.room?.includes('8-201') || e.room?.includes('8-203') || e.room?.includes('8-204') || e.room?.includes('8-205') || e.room?.includes('8-206'));
  const no8_3F = allEvents.filter(e => e.room?.includes('8-305') || e.room?.includes('8-306'));

  // SCC (屋内ステージ):
  const scc_4F = allEvents.filter(e =>
    e.locationName?.includes('SCC') ||
    e.locationName?.includes('屋内ステージ') ||
    e.room?.includes('SCC') ||
    e.room?.includes('屋内ステージ')
  );

  return {
    no3: {
      id: 'no3',
      name: '3号館',
      subName: 'Building No.3',
      description: '研究・実験や学術系の体験型ワークショップ、ポスター展示が行われる棟です。',
      floors: [
        {
          floor: '2F',
          floorLabel: '2階 教室フロア',
          description: '数学ポスター展示、味覚の体験、体験型ワークショップを開催',
          events: no3_2F,
        },
      ],
    },
    no6: {
      id: 'no6',
      name: '6号館',
      subName: 'Building No.6',
      description: '天文部による宇宙・星空に関する展示・作品発表が行われます。',
      floors: [
        {
          floor: '1F',
          floorLabel: '1階 教室展示',
          description: '天文部 昴による作品展示',
          events: no6_1F,
        },
      ],
    },
    no7: {
      id: 'no7',
      name: '7号館（音楽館）',
      subName: 'Building No.7 / Music Hall',
      description: '軽音・JAZZ・フォークソング・ウエスタンなど多彩な音楽サークルのライブが繰り広げられる音楽棟です。',
      floors: [
        {
          floor: '2F',
          floorLabel: '2階 ライブフロア',
          description: '軽音楽部・アルティメイト軽音楽部によるバンドライブ',
          events: no7_2F,
        },
        {
          floor: '3F',
          floorLabel: '3階 ライブフロア',
          description: 'でんでん虫（バンド）・JAZZ部によるライブ演奏',
          events: no7_3F,
        },
        {
          floor: '4F',
          floorLabel: '4階 ライブフロア',
          description: 'ウエスタン部・フォークソング部によるバンドライブ',
          events: no7_4F,
        },
      ],
    },
    no8: {
      id: 'no8',
      name: '8号館（文化館）',
      subName: 'Building No.8 / Culture Hall',
      description: '美術・写真・鉄道・模型・マンガ・放送研究・演劇など、文化系サークルの多彩な作品展示と公演が集結する拠点です。',
      floors: [
        {
          floor: '1F',
          floorLabel: '1階 エントランス＆展示・公演',
          description: '新選組（公演）、模型部展示、まんが研究会 Colors展示',
          events: no8_1F,
        },
        {
          floor: '2F',
          floorLabel: '2階 文化作品・体験フロア',
          description: 'Rainbow展示、放送研究会作品発表、ワンダーフォーゲル部報告、鉄道研究部展示、美術部作品展',
          events: no8_2F,
        },
        {
          floor: '3F',
          floorLabel: '3階 特別企画・体験フロア',
          description: '筋トレサークル OYSTARS マッスルコンテスト、ボードゲーム同好会 体験・紹介',
          events: no8_3F,
        },
      ],
    },
    scc: {
      id: 'scc',
      name: '屋内ステージ（SCC）',
      subName: 'SCC (Student Community Center) / Indoor Stage',
      description: '学生センター（SCC）4階 ベネットホール。オーケストラ、吹奏楽、合唱、そして豪華ゲストトークショーが開催される屋内メインステージです。',
      floors: [
        {
          floor: '4F',
          floorLabel: '4階 ベネットホール（屋内メインステージ）',
          description: 'オーケストラ・管弦楽・吹奏楽・アカペラ合唱の本格演奏、および宮世琉弥スペシャルトークショー',
          events: scc_4F,
        },
      ],
    },
  };
};

// テント番号から該当イベントを検索するヘルパー
export const getEventsByTentNo = (tentNo: string | number): EventItem[] => {
  const targetStr = String(tentNo);
  return allEvents.filter((e) => {
    if (e.category !== 'food') return false;
    const t = String(e.tentNo || '');
    if (t === targetStr) return true;
    if (targetStr === '11' || targetStr === '12') {
      if (t.includes('11') || t.includes('12')) return true;
    }
    return false;
  });
};

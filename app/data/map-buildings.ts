import { allEvents, locationMap, type EventItem } from '~/data/events';

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

const buildingConfigs: Record<'no3' | 'no6' | 'no7' | 'no8' | 'scc', {
  name: string;
  subName: string;
  description: string;
  floors: { floor: string; floorLabel: string; floorNum: number }[];
}> = {
  no3: {
    name: '3号館',
    subName: 'Building No.3',
    description: '1階には休憩・飲食スペースを設けているほか、GREEN×EXPOと連携した特別出店もお楽しみいただけます。',
    floors: [{ floor: '2F', floorLabel: '2階 教室フロア', floorNum: 2 }],
  },
  no6: {
    name: '6号館',
    subName: 'Building No.6',
    description: '天文部による宇宙・星空に関する展示・作品発表が行われます。',
    floors: [{ floor: '1F', floorLabel: '1階 教室展示', floorNum: 1 }],
  },
  no7: {
    name: '7号館（音楽館）',
    subName: 'Building No.7 / Music Hall',
    description: '軽音・JAZZ・フォークソング・ウエスタンなど多彩な音楽サークルのライブが繰り広げられます。',
    floors: [
      { floor: '2F', floorLabel: '2階 ライブフロア', floorNum: 2 },
      { floor: '3F', floorLabel: '3階 ライブフロア', floorNum: 3 },
      { floor: '4F', floorLabel: '4階 ライブフロア', floorNum: 4 },
    ],
  },
  no8: {
    name: '8号館（文化館）',
    subName: 'Building No.8 / Culture Hall',
    description: '美術・写真・鉄道・模型・マンガ・放送研究・演劇など、文化系サークルの多彩な作品展示と公演が集結する建物です。',
    floors: [
      { floor: '1F', floorLabel: '1階 エントランス＆展示・公演', floorNum: 1 },
      { floor: '2F', floorLabel: '2階 文化作品・体験フロア', floorNum: 2 },
      { floor: '3F', floorLabel: '3階 特別企画・体験フロア', floorNum: 3 },
    ],
  },
  scc: {
    name: '屋内ステージ（SCC）',
    subName: 'SCC (Science and Culture Center) / Indoor Stage',
    description: 'オーケストラ、吹奏楽、合唱、そして豪華ゲストトークショーが開催される屋内ステージです。',
    floors: [{ floor: '4F', floorLabel: '4階 ベンネットホール（屋内メインステージ）', floorNum: 4 }],
  },
};

export const getBuildingDataList = (): Record<string, BuildingData> => {
  const result: Record<string, BuildingData> = {} as any;
  for (const [bId, config] of Object.entries(buildingConfigs)) {
    result[bId] = {
      id: bId as any,
      name: config.name,
      subName: config.subName,
      description: config.description,
      floors: config.floors.map((f) => ({
        floor: f.floor,
        floorLabel: f.floorLabel,
        events: allEvents.filter((e) => {
          const loc = locationMap.get(e.locationId);
          return loc?.buildingId === bId && Number(loc.floor) === f.floorNum;
        }),
      })),
    };
  }
  return result;
};

export const getEventsByTentNo = (label: string): EventItem[] => {
  const targetId = `loc-tent-${label.padStart(2, '0')}`;
  return allEvents.filter((e) => e.locationId === targetId);
};

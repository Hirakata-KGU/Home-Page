import { allEvents, type BuildingId, type EventItem, type LocationItem } from '~/data/events';

export type { BuildingId };


export interface BuildingFloorData {
  floor: string;
  floorLabel: string;
  events: EventItem[];
}

export interface BuildingData {
  id: BuildingId;
  description: string;
  floors: BuildingFloorData[];
}

const buildingConfigs: Record<BuildingId, {
  description: string;
  floors: { floorNum: number; floorLabel: string }[];
}> = {
  no3: {
    description: '1階には休憩・飲食スペースを設けているほか、GREEN×EXPOと連携した特別出店もお楽しみいただけます。',
    floors: [
      { floorNum: 1, floorLabel: '1階 模擬店フロア' },
      { floorNum: 2, floorLabel: '2階 教室フロア' },
    ],
  },
  no6: {
    description: '天文部による宇宙・星空に関する展示・作品発表が行われます。',
    floors: [{ floorNum: 1, floorLabel: '1階 教室展示' }],
  },
  no7: {
    description: '軽音・JAZZ・フォークソング・ウエスタンなど多彩な音楽サークルのライブが繰り広げられます。',
    floors: [
      { floorNum: 2, floorLabel: '2階 ライブフロア' },
      { floorNum: 3, floorLabel: '3階 ライブフロア' },
      { floorNum: 4, floorLabel: '4階 ライブフロア' },
    ],
  },
  no8: {
    description: '美術・写真・鉄道・模型・マンガ・放送研究・演劇など、文化系サークルの多彩な作品展示と公演が集結する建物です。',
    floors: [
      { floorNum: 1, floorLabel: '1階 エントランス＆展示・公演' },
      { floorNum: 2, floorLabel: '2階 文化作品・体験フロア' },
      { floorNum: 3, floorLabel: '3階 特別企画・体験フロア' },
    ],
  },
  scc: {
    description: 'オーケストラ、吹奏楽、合唱、そして豪華ゲストトークショーが開催される屋内ステージです。',
    floors: [{ floorNum: 4, floorLabel: '4階 ベンネットホール（屋内メインステージ）' }],
  },
};

export const buildingDataMap = Object.fromEntries(
  (Object.entries(buildingConfigs) as [BuildingId, (typeof buildingConfigs)[BuildingId]][]).map(([bId, config]) => [
    bId,
    {
      id: bId,
      description: config.description,
      floors: config.floors.map((f) => ({
        floor: `${f.floorNum}F`,
        floorLabel: f.floorLabel,
        events: allEvents.filter((e) => e.buildingId === bId && Number(e.floor) === f.floorNum),
      })),
    },
  ])
) as Record<BuildingId, BuildingData>;


export const getEventsByTent = (locationId?: LocationItem['locationId']): EventItem[] =>
  locationId ? allEvents.filter((e) => e.locationId === locationId) : [];


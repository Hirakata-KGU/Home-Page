import { allEvents } from '~/data/events';
import type { BuildingId, EventItem } from '~/types/festival';

export interface BuildingFloorData {
  floorNum: number;
  floor: string;
  events: EventItem[];
}

export interface BuildingData {
  id: BuildingId;
  subtitle?: string;
  description: string;
  floors: BuildingFloorData[];
}

export type BuildingConfig = Pick<BuildingData, 'subtitle' | 'description'>;

/**
 * 建物ごとの設定情報
 * サブタイトル（subtitle）や説明文（description）はここで指定可能
 */
export const buildingConfigs: Record<BuildingId, BuildingConfig> = {
  no3: {
    subtitle: '社会連携・模擬店・教室企画',
    description: '1階には休憩・飲食スペースを設けているほか、GREEN×EXPOと連携した特別出店もお楽しみいただけます。',
  },
  no6: {
    subtitle: '作品発表・天体展示',
    description: '天文部による宇宙・星空に関する展示・作品発表が行われます。',
  },
  no7: {
    subtitle: '音楽ライブステージ',
    description: '軽音・JAZZ・フォークソング・ウエスタンなど多彩な音楽サークルのライブが繰り広げられます。',
  },
  no8: {
    subtitle: '文化系サークル展示・公演',
    description: '美術・写真・鉄道・模型・マンガ・放送研究・演劇など、文化系サークルの多彩な作品展示と公演が集結する建物です。',
  },
  scc: {
    subtitle: 'ベンネットホール（SCC 4F）',
    description: 'オーケストラ、吹奏楽、合唱、そして豪華ゲストトークショーが開催される屋内ステージです。',
  },
};

/**
 * 企画データ（allEvents）から、企画が存在する階層のみを自動的に抽出・昇順ソートしてマッピング
 */
export const buildingDataMap = Object.fromEntries(
  (Object.entries(buildingConfigs) as [BuildingId, BuildingConfig][]).map(([bId, config]) => {
    // 該当する建物の企画をすべて取得
    const bEvents = allEvents.filter((e) => e.buildingId === bId);

    // 企画が存在する階層（floor）ごとにグループ化
    const floorMap = new Map<number, EventItem[]>();

    for (const ev of bEvents) {
      const parsed = typeof ev.floor === 'number'
        ? ev.floor
        : parseInt(String(ev.floor).replace(/[^\d]/g, ''), 10);
      const floorNum = parsed > 0 ? parsed : 1;
      floorMap.set(floorNum, [...(floorMap.get(floorNum) ?? []), ev]);
    }

    // 階数順（1F, 2F, 3F...）にソートし、企画があるフロアのみ生成
    const sortedFloors: BuildingFloorData[] = Array.from(floorMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([floorNum, events]) => {
        // location の name（教室名・場所名）の自然順（数値考慮）でソート
        const sortedEvents = [...events].sort((a, b) => {
          const nameA = a.locationName || '';
          const nameB = b.locationName || '';
          return nameA.localeCompare(nameB, 'ja', { numeric: true, sensitivity: 'base' });
        });

        return {
          floorNum,
          floor: `${floorNum}F`,
          events: sortedEvents,
        };
      });

    return [
      bId,
      {
        id: bId,
        subtitle: config.subtitle,
        description: config.description,
        floors: sortedFloors,
      },
    ];
  })
) as Record<BuildingId, BuildingData>;

export const getEventsByTent = (locationId?: string): EventItem[] =>
  locationId ? allEvents.filter((e) => e.locationId === locationId) : [];

import rawFoodBooths from './food-booths.json';
import rawExhibitions from './exhibitions.json';
import rawPerformances from './performances.json';
import { timetableByEventId, type TimetableSlot } from './schedule';

// ==========================================
// 1. 各データベースの型定義
// ==========================================

export interface FoodBoothItem {
  id: string;
  item: string;
  groupName: string;
  category: string;
  tentNo: string | number;
  participationDays: string;
  boothCount: string | number;
  pr: string;
  salesInfo?: string;
}

export interface ExhibitionItem {
  id: string;
  content: string;
  groupName: string;
  category: string;
  room: string;
  pr: string;
  photoNo?: string;
}

export interface PerformanceItem {
  id: string;
  title: string;
  groupName: string;
  category: string;
  categorySub: string;
  venueRoom: string;
  pr: string;
  photoNo?: string;
}

// データベースのエクスポート
export const foodBooths: FoodBoothItem[] = rawFoodBooths as FoodBoothItem[];
export const exhibitions: ExhibitionItem[] = rawExhibitions as ExhibitionItem[];
export const performances: PerformanceItem[] = rawPerformances as PerformanceItem[];

// タイムテーブル関連は schedule.ts から再エクスポート
export type { TimetableSlot };

// ==========================================
// 2. 企画一覧・詳細ページ用の共通イベント型定義
// ==========================================

export type EventCategory = 'food' | 'culture' | 'music';
export type EventDay = 'day1' | 'day2' | 'both';

export interface EventItem {
  id: string;
  title: string;
  groupName: string;
  category: EventCategory;
  categoryRaw: string;
  categoryLabel: string;
  subCategory: string;
  locationName: string;
  locationTab?: 'campus' | 'culture' | 'music';
  day: EventDay;
  dayLabel: string;
  participationDays: string;
  timeRange: string;
  organizer: string;
  description: string;
  salesInfo?: string | null;
  tentNo?: string | null;
  room?: string | null;
  photoNo?: string | null;
  gradient?: string;
  tags: string[];
  timetableSlots?: TimetableSlot[];
}

// 4つの独立データベースから統合イベント一覧を構築
export const allEvents: EventItem[] = [
  // 1. 模擬店データベース (23件)
  ...foodBooths.map((fb): EventItem => {
    const pDays = String(fb.participationDays || '');
    let dayType: EventDay = 'both';
    let dayLabel = '両日開催';
    if (pDays.includes('1') || pDays.includes('DAY1')) {
      dayType = 'day1';
      dayLabel = '10/31（土）Day 1';
    } else if (pDays.includes('2') || pDays.includes('DAY2')) {
      dayType = 'day2';
      dayLabel = '11/1（日）Day 2';
    }

    const subCategory = String(fb.tentNo).includes('茶室') || fb.item.includes('茶道') ? '専用個室' : 'テント出店';
    const tentNoStr = fb.tentNo ? String(fb.tentNo) : null;
    const locationName = tentNoStr ? (tentNoStr.includes('テント') || tentNoStr.includes('茶室') ? tentNoStr : `テントNo.${tentNoStr}`) : '模擬店エリア';

    return {
      id: fb.id,
      title: fb.item,
      groupName: fb.groupName,
      category: 'food',
      categoryRaw: fb.category || '模擬店',
      categoryLabel: '模擬店・グルメ',
      subCategory,
      locationName,
      locationTab: 'campus',
      day: dayType,
      dayLabel,
      participationDays: pDays,
      timeRange: '10:00 - 17:00',
      organizer: fb.groupName,
      description: fb.pr || '',
      salesInfo: fb.salesInfo || null,
      tentNo: tentNoStr,
      room: null,
      photoNo: null,
      gradient: 'linear-gradient(135deg, #c9a85a 0%, #b89345 100%)',
      tags: ['模擬店', subCategory, tentNoStr ? `テント${tentNoStr}` : '', pDays].filter(Boolean) as string[],
      timetableSlots: [],
    };
  }),

  // 2. 文化館・展示データベース (15件)
  ...exhibitions.map((ex): EventItem => {
    const locationName = ex.room || '文化館（8号館）';
    return {
      id: ex.id,
      title: ex.content,
      groupName: ex.groupName,
      category: 'culture',
      categoryRaw: ex.category || '文化館',
      categoryLabel: '文化館・展示',
      subCategory: '教室展示・公演',
      locationName,
      locationTab: 'culture',
      day: 'both',
      dayLabel: '両日開催',
      participationDays: '両日参加',
      timeRange: '10:00 - 17:00',
      organizer: ex.groupName,
      description: ex.pr || '',
      salesInfo: null,
      tentNo: null,
      room: ex.room || null,
      photoNo: ex.photoNo || null,
      gradient: 'linear-gradient(135deg, #2f5b34 0%, #4a7f52 100%)',
      tags: ['文化館', '教室展示・公演', ex.room, '両日参加'].filter(Boolean) as string[],
      timetableSlots: [],
    };
  }),

  // 3. 音楽館・ステージデータベース (21件)
  ...performances.map((pf): EventItem => {
    const slots = timetableByEventId.get(pf.id) || [];
    let timeRange = '10:00 - 17:00';
    if (slots.length > 0) {
      timeRange = slots.map(s => `${s.day} ${s.time}`).join(' / ');
    }

    const subCategory = pf.categorySub || '音楽館';
    const locationName = pf.venueRoom || '音楽館';
    const locTab = locationName.includes('7') ? 'music' : 'campus';

    let dayType: EventDay = 'both';
    let dayLabel = '両日開催';
    let participationDays = '両日参加';
    if (slots.length > 0) {
      const days = new Set(slots.map(s => s.day));
      if (days.size === 1) {
        if (days.has('DAY1')) {
          dayType = 'day1';
          dayLabel = '10/31（土）Day 1';
          participationDays = 'DAY1のみ';
        } else if (days.has('DAY2')) {
          dayType = 'day2';
          dayLabel = '11/1（日）Day 2';
          participationDays = 'DAY2のみ';
        }
      }
    }

    return {
      id: pf.id,
      title: pf.title,
      groupName: pf.groupName,
      category: 'music',
      categoryRaw: pf.category || '音楽館',
      categoryLabel: '音楽館・ステージ',
      subCategory,
      locationName,
      locationTab: locTab,
      day: dayType,
      dayLabel,
      participationDays,
      timeRange,
      organizer: pf.groupName,
      description: pf.pr || '',
      salesInfo: null,
      tentNo: null,
      room: pf.venueRoom || null,
      photoNo: pf.photoNo || null,
      gradient: 'linear-gradient(135deg, #1e3d26 0%, #2f5b34 100%)',
      tags: ['音楽館', subCategory, locationName, participationDays].filter(Boolean) as string[],
      timetableSlots: slots,
    };
  }),
];

export const categoryList: { key: 'all' | EventCategory; label: string; count: number }[] = [
  { key: 'all', label: 'すべて', count: allEvents.length },
  { key: 'food', label: '模擬店・グルメ', count: foodBooths.length },
  { key: 'culture', label: '文化館・展示', count: exhibitions.length },
  { key: 'music', label: '音楽館・ステージ', count: performances.length },
];

export const eventItems = allEvents;

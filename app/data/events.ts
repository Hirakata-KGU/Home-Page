import mogiten from './mogiten.json';
import culture from './culture.json';
import music from './music.json';
import geinou from './geinou.json';
import location from './location.json';
import eventImages from './event-images.json';
import { timetableByEventId, type TimetableSlot } from './timetable';

export interface LocationItem {
  locationId: string;
  buildingId?: string;
  name: string;
  building: string;
  floor: number | string;
  room?: string | number;
}

export const locationMap = new Map<string, LocationItem>(
  (location as LocationItem[]).map((loc) => [loc.locationId, loc])
);

export const getEventImageUrl = (id: string): string | null =>
  (eventImages as Record<string, string>)[id] || null;

export type { TimetableSlot };
export type EventCategory = 'food' | 'culture' | 'music' | 'entertainment';
export type EventDay = 'day1' | 'day2' | 'both';

export interface EventItem {
  id: string;
  title: string;
  groupName: string;
  category: EventCategory;
  categoryRaw: string;
  categoryLabel: string;
  locationId: string;
  locationName: string;
  buildingId?: string;
  building?: string;
  floor?: number | string;
  locationTab?: 'campus' | 'culture' | 'music';
  day: EventDay;
  dayLabel: string;
  timeRange: string;
  organizer: string;
  description: string;
  salesInfo?: string | null;
  imageUrl?: string | null;
  tags: string[];
  timetableSlots?: TimetableSlot[];
}

const catMap: Record<string, { key: EventCategory; label: string }> = {
  '模擬店': { key: 'food', label: '模擬店・グルメ' },
  '文化館': { key: 'culture', label: '文化館・展示' },
  '音楽館': { key: 'music', label: '音楽館・ステージ' },
  '芸能': { key: 'entertainment', label: '芸能' },
};

const dayLabelMap: Record<string, string> = {
  day1: '10/31 (土)',
  day2: '11/1 (日)',
  both: '10/31 (土), 11/1 (日)',
};


export const allEvents: EventItem[] = [
  ...mogiten,
  ...culture,
  ...music,
  ...geinou,
].map((raw: any): EventItem => {
  const cat = catMap[raw.category] || { key: 'food', label: raw.category };
  const loc = locationMap.get(raw.locationId);
  const slots = timetableByEventId.get(raw.id) || [];
  const day: EventDay = raw.day || 'both';

  return {
    id: raw.id,
    title: raw.title,
    groupName: raw.groupName,
    category: cat.key,
    categoryRaw: raw.category,
    categoryLabel: cat.label,
    locationId: raw.locationId,
    locationName: loc?.name || '',
    buildingId: loc?.buildingId,
    building: loc?.building,
    floor: loc?.floor,
    locationTab: loc?.building?.includes('7') ? 'music' : loc?.building?.includes('8') ? 'culture' : 'campus',
    day,
    dayLabel: dayLabelMap[day] || '両日開催',
    timeRange: slots.length > 0 ? slots.map((s) => `${s.day} ${s.time}`).join(' / ') : '10:00 - 17:00',
    organizer: raw.groupName,
    description: raw.pr || '',
    salesInfo: raw.salesInfo || null,
    imageUrl: getEventImageUrl(raw.id),
    tags: [cat.label, loc?.name || '', dayLabelMap[day] || ''].filter(Boolean),
    timetableSlots: slots,
  };
});

export const categoryList: { key: 'all' | EventCategory; label: string; count: number }[] = [
  { key: 'all', label: 'すべて', count: allEvents.length },
  { key: 'food', label: '模擬店・グルメ', count: allEvents.filter((e) => e.category === 'food').length },
  { key: 'culture', label: '文化館・展示', count: allEvents.filter((e) => e.category === 'culture').length },
  { key: 'music', label: '音楽館・ステージ', count: allEvents.filter((e) => e.category === 'music').length },
  { key: 'entertainment', label: '芸能', count: allEvents.filter((e) => e.category === 'entertainment').length },
];

export const eventItems = allEvents;

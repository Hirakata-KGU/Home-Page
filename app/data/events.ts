import mogiten from './mogiten.json';
import culture from './culture.json';
import music from './music.json';
import other from './other.json';
import location from './location.json';
import eventImages from './event-images.json';
import { timetableByEventId, type TimetableSlot } from './timetable';

export type BuildingId = 'no3' | 'no6' | 'no7' | 'no8' | 'scc';

export interface LocationItem {
  locationId: string;
  buildingId?: BuildingId;
  name: string;
  building: string;
  floor: number | string;
  room?: number | string;
}

export const locationMap = new Map<string, LocationItem>(
  (location as LocationItem[]).map((loc) => [loc.locationId, loc])
);

export const getEventImageUrl = (id: string): string | null =>
  (eventImages as Record<string, string>)[id] || null;

export type { TimetableSlot };
export type EventCategory = 'food' | 'culture' | 'music' | 'entertainment' | 'expo' | 'other';
export type EventDay = 'day1' | 'day2' | 'both';

export interface RawEventItem {
  id: string;
  title: string;
  groupName?: string;
  category: string;
  locationId: string;
  day?: EventDay;
  salesInfo?: string;
  pr?: string;
}

export interface EventItem extends Partial<Omit<LocationItem, 'name'>> {
  id: string;
  title: string;
  groupName?: string;
  category: EventCategory;
  categoryLabel: string;
  categories: EventCategory[];
  categoryLabels: string[];
  locationId: string;
  locationName: string;
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
  'EXPO部': { key: 'expo', label: 'KGU EXPO部' },
  'その他': { key: 'other', label: 'その他' },
};

const dayLabelMap: Record<EventDay, string> = {
  day1: '10/31 (土)',
  day2: '11/1 (日)',
  both: '10/31 (土), 11/1 (日)',
};

const rawEvents = [...mogiten, ...culture, ...music, ...other] as RawEventItem[];

export const allEvents: EventItem[] = rawEvents.map((raw): EventItem => {
  const rawParts = (raw.category || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const resolved = rawParts.map((part) => {
    return catMap[part] || { key: 'other' as EventCategory, label: part };
  });

  if (resolved.length === 0) {
    resolved.push({ key: 'other', label: 'その他' });
  }

  // EXPO部が含まれている場合は EXPO部を主カテゴリとし、それ以外は先頭
  const primaryCat = resolved.find((c) => c.key === 'expo') || resolved[0];
  const categories = resolved.map((c) => c.key);
  const categoryLabels = resolved.map((c) => c.label);

  const loc = locationMap.get(raw.locationId);
  const slots = timetableByEventId.get(raw.id) || [];
  const day: EventDay = raw.day || 'both';

  return {
    ...loc,
    id: raw.id,
    title: raw.title,
    groupName: raw.groupName,
    category: primaryCat.key,
    categoryLabel: primaryCat.label,
    categories,
    categoryLabels,
    locationId: raw.locationId,
    locationName: loc?.name || '',
    day,
    dayLabel: dayLabelMap[day] || '',
    timeRange: slots.length > 0 ? slots.map((s) => `${dayLabelMap[s.day] || s.day}  ${s.time}`).join('\n') : '10:00 - 17:00',
    organizer: raw.groupName || '',
    description: raw.pr || '',
    salesInfo: raw.salesInfo || null,
    imageUrl: getEventImageUrl(raw.id),
    tags: [...categoryLabels, loc?.name || '', dayLabelMap[day] || ''].filter(Boolean),
    timetableSlots: slots,
  };
});

export const categoryList: { key: 'all' | EventCategory; label: string; count: number }[] = [
  { key: 'all', label: 'すべて', count: allEvents.length },
  ...Object.values(catMap).map(({ key, label }) => ({
    key,
    label,
    count: allEvents.filter((e) => e.categories.includes(key)).length,
  })),
];

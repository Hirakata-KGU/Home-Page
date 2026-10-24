import mogiten from './mogiten.json';
import culture from './culture.json';
import music from './music.json';
import other from './other.json';
import location from './location.json';
import eventImagesJson from './event-images.json';
import { timetableByEventId } from './timetable';
import type { EventCategory, EventDay, EventItem, LocationItem, RawEventItem } from '~/types/festival';

const locationMap = new Map<string, LocationItem>(
  (location as LocationItem[]).map((loc) => [loc.locationId, loc])
);

const eventImages = eventImagesJson as Record<string, string>;

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
    groupName: raw.groupName || '',
    category: primaryCat.key,
    categoryLabel: primaryCat.label,
    categories,
    categoryLabels,
    locationId: raw.locationId,
    locationName: loc?.name || '',
    day,
    dayLabel: dayLabelMap[day] || '',
    timeRange: slots.length > 0 ? slots.map((s) => `${dayLabelMap[s.day] || s.day}  ${s.time}`).join('\n') : '10:00 - 17:00',
    description: raw.pr || '',
    salesInfo: raw.salesInfo || null,
    imageUrl: eventImages[raw.id] || null,
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

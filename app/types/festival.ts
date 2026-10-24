export type BuildingId = 'no3' | 'no6' | 'no7' | 'no8' | 'scc';

export type EventCategory = 'food' | 'culture' | 'music' | 'entertainment' | 'expo' | 'other';
export type EventDay = 'day1' | 'day2' | 'both';

/** location.json の1行 */
export interface LocationItem {
  locationId: string;
  buildingId?: BuildingId;
  name: string;
  building: string;
  floor: number | string;
  room?: number | string;
}

/** mogiten / culture / music / other.json の1行 */
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

/** timetable.json の1行（時刻の分換算はビルド時に festival-data モジュールが付与） */
export interface RawTimetableSlot {
  id: string;
  slotId: string;
  day: 'day1' | 'day2';
  locationId: string;
  time: string;
  startTime: string;
  endTime: string;
  startMinutes: number;
  endMinutes: number;
  durationMinutes: number;
}

export interface TimetableSlot extends RawTimetableSlot {
  venue: string;
  title: string;
  groupName: string;
  isSpecial?: boolean;
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

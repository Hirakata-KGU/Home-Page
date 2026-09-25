import rawTimetable from './timetable.json';
import rawMusic from './music.json';
import rawGeinou from './geinou.json';
import rawLocation from './location.json';

export interface TimetableSlot {
  id: string;
  slotId: string;
  day: 'day1' | 'day2';
  locationId: string;
  venue: string;
  time: string;
  startTime: string;
  endTime: string;
  startMinutes: number;
  endMinutes: number;
  durationMinutes: number;
  title: string;
  groupName: string;
  isSpecial?: boolean;
}

const eventMap = new Map<string, { title: string; groupName: string }>(
  [...(rawMusic as any[]), ...(rawGeinou as any[])].map((m) => [
    m.id,
    { title: m.title || '', groupName: m.groupName || 'ゲスト企画' },
  ])
);

const locationMap = new Map<string, string>(
  (rawLocation as any[]).map((loc) => [loc.locationId, loc.name || ''])
);

export const timetable: TimetableSlot[] = (rawTimetable as any[]).map((t) => {
  const ev = eventMap.get(t.id);
  return {
    ...t,
    venue: locationMap.get(t.locationId) || '',
    title: ev?.title || '',
    groupName: ev?.groupName || '',
    isSpecial: t.id === 'celeb',
  };
});

export const timetableByEventId = new Map<string, TimetableSlot[]>();
for (const slot of timetable) {
  if (!timetableByEventId.has(slot.id)) timetableByEventId.set(slot.id, []);
  timetableByEventId.get(slot.id)!.push(slot);
}

export interface DaySchedule {
  id: 'day1' | 'day2';
  dayName: string;
  allSlots: TimetableSlot[];
}

export const daySchedules: DaySchedule[] = [
  {
    id: 'day1',
    dayName: '10月31日（土）',
    allSlots: timetable.filter((s) => s.day === 'day1'),
  },
  {
    id: 'day2',
    dayName: '11月1日（日）',
    allSlots: timetable.filter((s) => s.day === 'day2'),
  },
];

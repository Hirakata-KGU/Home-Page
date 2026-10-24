import rawTimetable from './timetable.json';
import rawMusic from './music.json';
import rawOther from './other.json';
import rawLocation from './location.json';
import type { LocationItem, RawEventItem, RawTimetableSlot, TimetableSlot } from '~/types/festival';

const eventMap = new Map<string, { title: string; groupName: string }>(
  ([...rawMusic, ...rawOther] as RawEventItem[]).map((m) => [
    m.id,
    { title: m.title || '', groupName: m.groupName || '' },
  ])
);

const locationNameMap = new Map<string, string>(
  (rawLocation as LocationItem[]).map((loc) => [loc.locationId, loc.name || ''])
);

export const timetable: TimetableSlot[] = (rawTimetable as RawTimetableSlot[]).map((t) => {
  const ev = eventMap.get(t.id);
  return {
    ...t,
    venue: locationNameMap.get(t.locationId) || '',
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
    dayName: '10月31日(土)',
    allSlots: timetable.filter((s) => s.day === 'day1'),
  },
  {
    id: 'day2',
    dayName: '11月1日(日)',
    allSlots: timetable.filter((s) => s.day === 'day2'),
  },
];

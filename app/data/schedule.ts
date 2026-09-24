import rawTimetable from './timetable.json';

// ==========================================
// 1. タイムテーブルスロットの型定義
// ==========================================

export interface TimetableSlot {
  id: string;
  slotId: string;
  day: 'DAY1' | 'DAY2';
  venue: string;
  time: string;
  startTime: string;
  endTime: string;
  startMinutes: string | number;
  endMinutes: string | number;
  durationMinutes: string | number;
  title: string;
  groupName: string;
  detail?: string | null;
  isSpecial?: boolean;
}

// タイムテーブル実データ（全33件）
export const timetable: TimetableSlot[] = (rawTimetable as any[]).map((t) => {
  const isSpecial = t.id === 'geinou' || t.id === 'stage-geinou' || t.category?.includes('芸能') || t.title?.includes('宮世');
  return {
    ...t,
    title: isSpecial ? '芸能人トークショー' : t.title,
    groupName: isSpecial ? '芸能ステージ' : t.groupName,
    detail: isSpecial ? '全席指定（開場・開演等詳細は後日公開）' : t.detail,
    isSpecial,
  };
});

// イベントIDごとに紐付けられたスロットマップ
export const timetableByEventId = new Map<string, TimetableSlot[]>();
for (const slot of timetable) {
  if (!timetableByEventId.has(slot.id)) {
    timetableByEventId.set(slot.id, []);
  }
  timetableByEventId.get(slot.id)!.push(slot);
}

// 日程別のスロット
export const timetableDay1 = timetable.filter((s) => s.day === 'DAY1');
export const timetableDay2 = timetable.filter((s) => s.day === 'DAY2');

// ==========================================
// 2. 会場情報と判定（5会場に分離）
// ==========================================

export type VenueCategory = 'outdoor' | 'indoor' | 'chapel' | 'gym' | 'bldg1';


export const getVenueCategory = (venueName: string): VenueCategory => {
  if (venueName.includes('屋外')) return 'outdoor';
  if (venueName.includes('屋内') || venueName.includes('SCC') || venueName.includes('ベンネット') || venueName.includes('ベネット')) return 'indoor';
  if (venueName.includes('チャペル')) return 'chapel';
  if (venueName.includes('体育館')) return 'gym';
  if (venueName.includes('1号館')) return 'bldg1';
  return 'bldg1';
};

// ==========================================
// 3. 並列・時系列スケジュール構成
// ==========================================

export interface StageProgram {
  title: string;
  timeRange: string;
  performer?: string;
  eventId?: string;
  venueName?: string;
  isSpecial?: boolean;
}

export interface ParallelTimeSlot {
  timeLabel: string;
  startMinutes: number;
  outdoor?: StageProgram;
  indoor?: StageProgram;
  chapel?: StageProgram;
  gym?: StageProgram;
  bldg1?: StageProgram;
}

export interface DayParallelSchedule {
  id: 'day1' | 'day2';
  dayName: string;
  dateLabel: string;
  slots: ParallelTimeSlot[];
  allSlots: TimetableSlot[];
  venueGroups: {
    outdoor: TimetableSlot[];
    indoor: TimetableSlot[];
    chapel: TimetableSlot[];
    gym: TimetableSlot[];
    bldg1: TimetableSlot[];
  };
}

// 分数を取得するヘルパー
const parseMinutes = (timeStr: string): number => {
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

// 並列スケジュール生成
const buildParallelSchedule = (dayId: 'DAY1' | 'DAY2', dayName: string, dateLabel: string): DayParallelSchedule => {
  const daySlots = timetable.filter((s) => s.day === dayId);

  // 会場別グループ
  const venueGroups = {
    outdoor: daySlots.filter((s) => getVenueCategory(s.venue) === 'outdoor'),
    indoor: daySlots.filter((s) => getVenueCategory(s.venue) === 'indoor'),
    chapel: daySlots.filter((s) => getVenueCategory(s.venue) === 'chapel'),
    gym: daySlots.filter((s) => getVenueCategory(s.venue) === 'gym'),
    bldg1: daySlots.filter((s) => getVenueCategory(s.venue) === 'bldg1'),
  };

  // 全時間ポイントを収集して並び替え
  const timePoints = new Set<string>();
  daySlots.forEach((s) => {
    if (s.startTime) timePoints.add(s.startTime);
  });

  const sortedTimes = Array.from(timePoints).sort((a, b) => parseMinutes(a) - parseMinutes(b));

  const slots: ParallelTimeSlot[] = sortedTimes.map((tStr) => {
    const min = parseMinutes(tStr);
    const result: ParallelTimeSlot = {
      timeLabel: tStr,
      startMinutes: min,
    };

    for (const s of daySlots) {
      if (s.startTime === tStr) {
        const cat = getVenueCategory(s.venue);
        const prog: StageProgram = {
          title: s.title,
          timeRange: s.time,
          performer: s.groupName,
          eventId: s.id,
          venueName: s.venue,
          isSpecial: s.isSpecial,
        };
        result[cat] = prog;
      }
    }

    return result;
  });

  return {
    id: dayId.toLowerCase() as 'day1' | 'day2',
    dayName,
    dateLabel,
    slots,
    allSlots: daySlots,
    venueGroups,
  };
};

export const parallelScheduleData: DayParallelSchedule[] = [
  buildParallelSchedule('DAY1', '10月31日（土）', 'Day 1'),
  buildParallelSchedule('DAY2', '11月1日（日）', 'Day 2'),
];

import { defineNuxtModule } from '@nuxt/kit';
import { basename, extname, resolve } from 'pathe';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import * as XLSX from 'xlsx';

export interface ModuleOptions {
  excelPath?: string;
  outputDir?: string;
}

const SHEETS = ['mogiten', 'culture', 'music', 'other', 'location', 'timetable'] as const;
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);

type SheetRow = Record<string, unknown>;

/** 時刻（"HH:mm" 文字列 または Excel 小数シリアル値）を分に変換 */
const parseTimeToMinutes = (val: unknown): number => {
  if (typeof val === 'number' && val >= 0 && val < 1) {
    return Math.round(val * 24 * 60);
  }
  const match = String(val ?? '').trim().match(/^(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : 0;
};

const formatMinutes = (minutes: number): string =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

/** startTime / endTime から startMinutes, endMinutes, durationMinutes と表示用 time を補完 */
const enrichTimetableRow = (row: SheetRow): SheetRow => {
  const startMinutes = parseTimeToMinutes(row.startTime);
  const endMinutes = parseTimeToMinutes(row.endTime);
  const time = row.time
    ? String(row.time).trim()
    : `${formatMinutes(startMinutes)}～${formatMinutes(endMinutes)}`;
  return {
    ...row,
    time,
    startMinutes,
    endMinutes,
    durationMinutes: Math.max(0, endMinutes - startMinutes),
  };
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'festival-data-converter',
    configKey: 'festivalData',
  },
  defaults: {
    excelPath: 'app/data/hirakata_festival_data.xlsx',
    outputDir: 'app/data',
  },
  setup(options, nuxt) {
    const excelFullPath = resolve(nuxt.options.rootDir, options.excelPath!);
    const outputDirFullPath = resolve(nuxt.options.rootDir, options.outputDir!);
    const imagesDirFullPath = resolve(nuxt.options.rootDir, 'public/images/events');

    const writeJson = (name: string, data: unknown) => {
      writeFileSync(resolve(outputDirFullPath, name), JSON.stringify(data, null, 2), 'utf-8');
    };

    const convertExcelToDatabases = () => {
      if (!existsSync(excelFullPath)) {
        console.warn(`[festival-data] Excel file not found: ${excelFullPath}`);
        return;
      }

      const workbook = XLSX.read(readFileSync(excelFullPath), { type: 'buffer' });

      for (const sheetName of SHEETS) {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
          console.warn(`[festival-data] Sheet not found: ${sheetName}`);
          continue;
        }
        const rows = XLSX.utils.sheet_to_json<SheetRow>(sheet);
        writeJson(`${sheetName}.json`, sheetName === 'timetable' ? rows.map(enrichTimetableRow) : rows);
      }
      console.log('[festival-data] Converted Excel sheets to JSON');
    };

    // public/images/events 内の写真を走査して event-images.json（id → 画像パス）を生成
    const scanEventImages = () => {
      if (!existsSync(imagesDirFullPath)) {
        console.warn(`[festival-data] Images directory not found: ${imagesDirFullPath}`);
        return;
      }

      const imageMap: Record<string, string> = {};
      for (const file of readdirSync(imagesDirFullPath)) {
        const ext = extname(file);
        if (IMAGE_EXTENSIONS.has(ext.toLowerCase())) {
          imageMap[basename(file, ext)] = `/images/events/${file}`;
        }
      }
      writeJson('event-images.json', imageMap);
      console.log(`[festival-data] Mapped ${Object.keys(imageMap).length} event images`);
    };

    convertExcelToDatabases();
    scanEventImages();

    // 開発サーバー動作時のファイル変更監視
    nuxt.hook('builder:watch', (_event, path) => {
      const normalizedPath = path.replace(/\\/g, '/');
      if (normalizedPath.includes('hirakata_festival_data.xlsx')) {
        convertExcelToDatabases();
      }
      if (normalizedPath.includes('images/events')) {
        scanEventImages();
      }
    });
  },
});

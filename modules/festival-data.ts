import { defineNuxtModule } from '@nuxt/kit';
import { basename, extname, resolve } from 'pathe';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import * as XLSX from 'xlsx';

export interface ModuleOptions {
  excelPath?: string;
  outputDir?: string;
}

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
    const excelFullPath = resolve(nuxt.options.rootDir, options.excelPath || 'app/data/hirakata_festival_data.xlsx');
    const outputDirFullPath = resolve(nuxt.options.rootDir, options.outputDir || 'app/data');
    const imagesDirFullPath = resolve(nuxt.options.rootDir, 'public/images/events');

    const convertExcelToDatabases = () => {
      if (!existsSync(excelFullPath)) {
        console.warn(`[festival-data] Excel file not found: ${excelFullPath}`);
        return;
      }

      console.log(`[festival-data] Converting sheets from ${excelFullPath} into separate JSON databases...`);
      const fileBuffer = readFileSync(excelFullPath);
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

      // ヘルパー：シートの全レコードを配列で取得
      const getSheetData = <T = any>(sheetName: string): T[] => {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
          console.warn(`[festival-data] Sheet not found: ${sheetName}`);
          return [];
        }
        return XLSX.utils.sheet_to_json<T>(sheet);
      };

      // 6つのシートをJSONとして出力
      const sheets = ['mogiten', 'culture', 'music', 'geinou', 'location', 'timetable'];
      for (const sheetName of sheets) {
        const data = getSheetData(sheetName);
        const jsonPath = resolve(outputDirFullPath, `${sheetName}.json`);
        writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`[festival-data] Saved ${jsonPath} (${data.length} items)`);
      }
    };

    // public/images/events 内の写真を自動スキャンして event-images.json を生成
    const scanEventImages = () => {
      if (!existsSync(imagesDirFullPath)) {
        console.warn(`[festival-data] Images directory not found: ${imagesDirFullPath}`);
        return;
      }

      console.log(`[festival-data] Scanning event photos from ${imagesDirFullPath}...`);
      const files = readdirSync(imagesDirFullPath);
      const imageMap: Record<string, string> = {};

      for (const file of files) {
        const ext = extname(file);
        const lowerExt = ext.toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(lowerExt)) {
          const baseName = basename(file, ext);
          imageMap[baseName] = `/images/events/${file}`;
        }
      }

      const eventImagesPath = resolve(outputDirFullPath, 'event-images.json');
      writeFileSync(eventImagesPath, JSON.stringify(imageMap, null, 2), 'utf-8');
      console.log(`[festival-data] Saved ${eventImagesPath} (${Object.keys(imageMap).length} mapped images)`);
    };

    // 初期起動時およびビルド準備時に変換を実行
    convertExcelToDatabases();
    scanEventImages();

    // 開発サーバー動作時のファイル変更監視（watch）
    nuxt.hook('builder:watch', async (event, path) => {
      const normalizedPath = path.replace(/\\/g, '/');
      if (normalizedPath.includes('hirakata_festival_data.xlsx')) {
        console.log(`[festival-data] Detected change in ${path}, re-generating databases...`);
        convertExcelToDatabases();
      }
      if (normalizedPath.includes('images/events') || normalizedPath.includes('images/event')) {
        console.log(`[festival-data] Detected event image changes in ${path}, re-scanning event images...`);
        scanEventImages();
      }
    });
  },
});

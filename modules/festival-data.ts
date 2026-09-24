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

      // 1. 模擬店データベース (Food_Booths)
      const foodBooths = getSheetData('Food_Booths');
      const foodBoothsPath = resolve(outputDirFullPath, 'food-booths.json');
      writeFileSync(foodBoothsPath, JSON.stringify(foodBooths, null, 2), 'utf-8');
      console.log(`[festival-data] Saved ${foodBoothsPath} (${foodBooths.length} items)`);

      // 2. 文化館・展示データベース (Exhibitions)
      const exhibitions = getSheetData('Exhibitions');
      const exhibitionsPath = resolve(outputDirFullPath, 'exhibitions.json');
      writeFileSync(exhibitionsPath, JSON.stringify(exhibitions, null, 2), 'utf-8');
      console.log(`[festival-data] Saved ${exhibitionsPath} (${exhibitions.length} items)`);

      // 3. 音楽館・ステージデータベース (Performances)
      const performances = getSheetData('Performances');
      const performancesPath = resolve(outputDirFullPath, 'performances.json');
      writeFileSync(performancesPath, JSON.stringify(performances, null, 2), 'utf-8');
      console.log(`[festival-data] Saved ${performancesPath} (${performances.length} items)`);

      // 4. タイムテーブルデータベース (Timetable)
      const timetable = getSheetData('Timetable');
      const timetablePath = resolve(outputDirFullPath, 'timetable.json');
      writeFileSync(timetablePath, JSON.stringify(timetable, null, 2), 'utf-8');
      console.log(`[festival-data] Saved ${timetablePath} (${timetable.length} items)`);
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

      // 表記揺れ（長音等）のエイリアス補正
      if (imageMap['stage-konsei-gasshou-bu'] && !imageMap['stage-konsei-gassho-bu']) {
        imageMap['stage-konsei-gassho-bu'] = imageMap['stage-konsei-gasshou-bu'];
      }
      if (imageMap['stage-suisougaku-bu'] && !imageMap['stage-suisogaku-bu']) {
        imageMap['stage-suisogaku-bu'] = imageMap['stage-suisougaku-bu'];
      }

      // 同一団体で展示と模擬店の両方に出店している場合のフォールバック紐付け
      if (imageMap['exhibit-shashin-bu'] && !imageMap['food-shashin-bu']) {
        imageMap['food-shashin-bu'] = imageMap['exhibit-shashin-bu'];
      }
      if (imageMap['exhibit-oystars'] && !imageMap['food-oystars']) {
        imageMap['food-oystars'] = imageMap['exhibit-oystars'];
      }
      if (imageMap['food-kannai-sukayutopia'] && !imageMap['stage-kannai-sukayutopia']) {
        imageMap['stage-kannai-sukayutopia'] = imageMap['food-kannai-sukayutopia'];
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

import { defineNuxtModule } from '@nuxt/kit';
import { resolve } from 'pathe';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
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

    // 初期起動時およびビルド準備時に変換を実行
    convertExcelToDatabases();

    // 開発サーバー動作時のファイル変更監視（watch）
    nuxt.hook('builder:watch', async (event, path) => {
      const normalizedPath = path.replace(/\\/g, '/');
      if (normalizedPath.includes('hirakata_festival_data.xlsx')) {
        console.log(`[festival-data] Detected change in ${path}, re-generating databases...`);
        convertExcelToDatabases();
      }
    });
  },
});

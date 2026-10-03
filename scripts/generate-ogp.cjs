const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createOgp() {
  const rootDir = process.cwd();
  const logoPath = path.join(rootDir, 'public/images/hirakata-logo.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const logoDataUri = 'data:image/png;base64,' + logoBase64;

  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FBFBF2" />
        <stop offset="100%" stop-color="#F3F2DF" />
      </linearGradient>

      <!-- 八角形装飾 -->
      <polygon id="oct" points="196,34 230,115 196,196 115,230 34,196 0,115 34,34 115,0" fill="none" stroke="#42845A" stroke-width="1.8" />
    </defs>

    <!-- 背景ベース -->
    <rect width="1200" height="630" fill="url(#bgGrad)" />

    <!-- 背景幾何学装飾（左奥：三重八角形） -->
    <g transform="translate(60, 45) scale(2.4)" opacity="0.22">
      <use href="#oct" />
      <g transform="rotate(15 115 115) scale(0.92) translate(10 10)">
        <use href="#oct" />
      </g>
      <g transform="rotate(30 115 115) scale(0.84) translate(22 22)">
        <use href="#oct" />
      </g>
    </g>

    <!-- 背景幾何学装飾（右奥見切れ） -->
    <g transform="translate(940, 370) scale(1.8)" opacity="0.15">
      <use href="#oct" />
      <g transform="rotate(22.5 115 115) scale(0.9) translate(12 12)">
        <use href="#oct" />
      </g>
    </g>

    <!-- 外枠のエレガントなフレーム線 -->
    <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#42845A" stroke-width="2.5" opacity="0.4" />
    <rect x="32" y="32" width="1136" height="566" rx="20" fill="none" stroke="#42845A" stroke-width="1.2" opacity="0.2" />

    <!-- 左側：公式ロゴマーク（美しい白サークル台座＋シャドウ） -->
    <g transform="translate(75, 75)">
      <!-- 白サークル -->
      <circle cx="240" cy="240" r="215" fill="#FFFFFF" />
      <circle cx="240" cy="240" r="215" fill="none" stroke="#88BD76" stroke-width="2" opacity="0.5" />
      <!-- ロゴ本体 -->
      <image href="${logoDataUri}" x="25" y="25" width="430" height="430" />
    </g>

    <!-- 右側：テキスト情報群 -->
    <g transform="translate(585, 90)">
      <!-- 1. 年号・バッジ -->
      <g>
        <rect x="0" y="0" width="235" height="36" rx="18" fill="#1B3A24" />
        <text x="117" y="24" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif" font-size="16" font-weight="700" fill="#B9DD7B" text-anchor="middle" letter-spacing="1.5">第77回 公式サイト</text>
      </g>

      <!-- 2. メインタイトル -->
      <text x="0" y="112" font-family="'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho ProN', serif" font-size="64" font-weight="900" fill="#1B3A24" letter-spacing="2">
        平潟祭 2026
      </text>

      <!-- 3. テーマ -->
      <g transform="translate(0, 138)">
        <text x="0" y="24" font-family="'Noto Sans JP', sans-serif" font-size="20" font-weight="700" fill="#42845A" letter-spacing="3">THEME : </text>
        <text x="110" y="24" font-family="'Noto Sans JP', sans-serif" font-size="22" font-weight="900" fill="#2D6A4F" letter-spacing="4">『 SPROUT 』</text>
        <line x1="0" y1="38" x2="540" y2="38" stroke="#42845A" stroke-width="1.5" opacity="0.3" />
      </g>

      <!-- 4. 開催日時ハイライトカード -->
      <g transform="translate(0, 205)">
        <rect x="0" y="0" width="540" height="110" rx="18" fill="#1B3A24" />
        <rect x="0" y="0" width="540" height="110" rx="18" fill="none" stroke="#88BD76" stroke-width="1.5" opacity="0.6" />
        <!-- 日付ラベル -->
        <text x="28" y="44" font-family="'Noto Sans JP', sans-serif" font-size="14" font-weight="700" fill="#B9DD7B" letter-spacing="1.5">開催日程</text>
        <!-- 日付 -->
        <text x="28" y="86" font-family="'Noto Sans JP', sans-serif" font-size="29" font-weight="900" fill="#FFFFFF" letter-spacing="1">
          10/31<tspan font-size="21" font-weight="700"> (土)</tspan> ・ 11/1<tspan font-size="21" font-weight="700"> (日)</tspan>
        </text>
        <!-- 時間 -->
        <text x="365" y="83" font-family="'Noto Sans JP', sans-serif" font-size="20" font-weight="700" fill="#F8F8ED" letter-spacing="1">
          10:00 - 17:00
        </text>
      </g>

      <!-- 5. 会場＆アクセス -->
      <g transform="translate(0, 342)">
        <text x="0" y="24" font-family="'Noto Sans JP', sans-serif" font-size="20" font-weight="800" fill="#1B3A24">
          関東学院大学 金沢八景キャンパス
        </text>
        <!-- バッジ群 -->
        <g transform="translate(0, 44)">
          <rect x="0" y="0" width="155" height="30" rx="15" fill="#88BD76" opacity="0.25" />
          <text x="77" y="20" font-family="'Noto Sans JP', sans-serif" font-size="13" font-weight="700" fill="#1B3A24" text-anchor="middle">入場無料・予約不要</text>

          <rect x="165" y="0" width="135" height="30" rx="15" fill="#88BD76" opacity="0.25" />
          <text x="232" y="20" font-family="'Noto Sans JP', sans-serif" font-size="13" font-weight="700" fill="#1B3A24" text-anchor="middle">模擬店・ステージ</text>

          <text x="385" y="22" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="700" fill="#42845A" letter-spacing="0.5">www.hirakatasai.net</text>
        </g>
      </g>
    </g>

    <!-- 下部アクセント（波線） -->
    <path d="M 0 620 Q 300 605 600 620 T 1200 620 L 1200 630 L 0 630 Z" fill="#437C62" opacity="0.6" />
    <path d="M 0 624 Q 300 615 600 624 T 1200 624 L 1200 630 L 0 630 Z" fill="#1B3A24" />
  </svg>
  `;

  const outputPath = path.join(rootDir, 'public/images/ogp-main.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log('Successfully generated:', outputPath);
}

createOgp().catch(console.error);

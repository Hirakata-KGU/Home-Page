<script setup lang="ts">
// 1 〜 20 までの番号でアイコンを指定可能（TypeScriptの補完付き）
type PlantIconName =
  | 1 | 2 | 3 | 4 | 5
  | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15
  | 16 | 17 | 18 | 19 | 20

withDefaults(
  defineProps<{
    name: PlantIconName
  }>(),
  {
    name: 1,
  }
)
</script>

<template>
  <svg
    viewBox="-25 -30 50 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="inline-block shrink-0"
  >
    <!-- 1段目 (1 - 5) -->
    <!-- 1: シングルドロップリーフ -->
    <g v-if="name === 1">
      <path d="M0 24V-6" stroke="#619D6E" stroke-width="2" stroke-linecap="round" />
      <path d="M0 -6C0 -6 -10 -10 -10 -16C-10 -22 0 -24 0 -24C0 -24 10 -22 10 -16C10 -10 0 -6 0 -6Z" fill="#88BD76" />
    </g>

    <!-- 2: 二葉スプラウト -->
    <g v-else-if="name === 2">
      <path d="M0 24V-4" stroke="#619D6E" stroke-width="2" stroke-linecap="round" />
      <path d="M0 -2C0 -2 -12 -6 -13 -14C-14 -22 -2 -20 0 -10V-2Z" fill="#B9DD7B" />
      <path d="M0 -2C0 -2 12 -6 13 -14C14 -22 2 -20 0 -10V-2Z" fill="#88BD76" />
    </g>

    <!-- 3: 斜め丸葉 -->
    <g v-else-if="name === 3">
      <path d="M0 21V-1" stroke="#619D6E" stroke-width="2" stroke-linecap="round" />
      <path d="M-2.58 2.397C1.053 1.075 2.467 -4.204 0.578 -9.394C-1.311 -14.584 -5.787 -17.719 -9.42 -16.397C-13.053 -15.075 -14.467 -9.796 -12.578 -4.606C-10.689 0.584 -6.213 3.719 -2.58 2.397Z" fill="#B9DD7B" />
      <path d="M2.58 2.397C6.213 3.719 10.689 0.584 12.578 -4.606C14.467 -9.796 13.053 -15.075 9.42 -16.397C5.787 -17.719 1.311 -14.584 -0.578 -9.394C-2.467 -4.204 -1.053 1.075 2.58 2.397Z" fill="#88BD76" />
    </g>

    <!-- 4: 立ちスピア -->
    <g v-else-if="name === 4">
      <path d="M0 28C0 28 0 2 -2 -13C-3 -23 0 -28 0 -28C0 -28 3 -23 2 -13C0 2 0 28 0 28Z" fill="#88BD76" />
    </g>

    <!-- 5: 3本草スピア -->
    <g v-else-if="name === 5">
      <path d="M0 26C0 26 0 2 -2 -12C-3 -21 0 -26 0 -26C0 -26 3 -21 2 -12C0 2 0 26 0 26Z" fill="#88BD76" />
      <path d="M-4 26C-4 26 -6 6 -9 -6C-11 -14 -8 -20 -7 -20C-6 -20 -4 -14 -5 -6C-7 6 -4 26 -4 26Z" fill="#B9DD7B" />
      <path d="M4 26C4 26 6 6 9 -6C11 -14 8 -20 7 -20C6 -20 4 -14 5 -6C7 6 4 26 4 26Z" fill="#619D6E" />
    </g>

    <!-- 2段目 (6 - 10) -->
    <!-- 6: ベル型リーフ -->
    <g v-else-if="name === 6">
      <path d="M0 25V-3" stroke="#437C62" stroke-width="1.5" stroke-linecap="round" />
      <path d="M0 -3C0 -3 -10 -9 -10 -17C-10 -25 0 -25 0 -25C0 -25 10 -25 10 -17C10 -9 0 -3 0 -3Z" fill="#619D6E" />
    </g>

    <!-- 7: 多段ドットスプラウト -->
    <g v-else-if="name === 7">
      <path d="M0 24V-24" stroke="#619D6E" stroke-width="1.5" stroke-linecap="round" />
      <path d="M-5 -12.5C-2.239 -12.5 0 -14.067 0 -16C0 -17.933 -2.239 -19.5 -5 -19.5C-7.761 -19.5 -10 -17.933 -10 -16C-10 -14.067 -7.761 -12.5 -5 -12.5Z" fill="#B9DD7B" />
      <path d="M5 -8.5C7.761 -8.5 10 -10.067 10 -12C10 -13.933 7.761 -15.5 5 -15.5C2.239 -15.5 0 -13.933 0 -12C0 -10.067 2.239 -8.5 5 -8.5Z" fill="#88BD76" />
      <path d="M-5 0C-1.962 0 0.5 -1.791 0.5 -4C0.5 -6.209 -1.962 -8 -5 -8C-8.038 -8 -10.5 -6.209 -10.5 -4C-10.5 -1.791 -8.038 0 -5 0Z" fill="#B9DD7B" />
      <path d="M5 4C8.038 4 10.5 2.209 10.5 0C10.5 -2.209 8.038 -4 5 -4C1.962 -4 -0.5 -2.209 -0.5 0C-0.5 2.209 1.962 4 5 4Z" fill="#88BD76" />
      <path d="M-5 12.5C-1.686 12.5 1 10.485 1 8C1 5.515 -1.686 3.5 -5 3.5C-8.314 3.5 -11 5.515 -11 8C-11 10.485 -8.314 12.5 -5 12.5Z" fill="#B9DD7B" />
      <path d="M5 16.5C8.314 16.5 11 14.485 11 12C11 9.515 8.314 7.5 5 7.5C1.686 7.5 -1 9.515 -1 12C-1 14.485 1.686 16.5 5 16.5Z" fill="#88BD76" />
    </g>

    <!-- 8: 葉脈付きティアドロップ -->
    <g v-else-if="name === 8">
      <path d="M0 24C0 24 -1 6 -2 0" stroke="#437C62" stroke-width="2" stroke-linecap="round" />
      <path d="M-2 0C-2 0 -14 -4 -14 -14C-14 -24 2 -26 6 -16C10 -6 -2 0 -2 0Z" fill="#88BD76" />
      <path opacity="0.5" d="M-2 0C-2 -8 -6 -14 -8 -18" stroke="#619D6E" stroke-linecap="round" />
    </g>

    <!-- 9: ダイヤ型リーフ -->
    <g v-else-if="name === 9">
      <path d="M0 26V-2" stroke="#437C62" stroke-width="1.5" stroke-linecap="round" />
      <path d="M0 -26L10 -14L0 -2L-10 -14L0 -26Z" fill="#88BD76" />
    </g>

    <!-- 10: ミニオーバル -->
    <g v-else-if="name === 10">
      <path d="M0 18V-4" stroke="#619D6E" stroke-width="2" stroke-linecap="round" />
      <path d="M0 -2C2.761 -2 5 -5.582 5 -10C5 -14.418 2.761 -18 0 -18C-2.761 -18 -5 -14.418 -5 -10C-5 -5.582 -2.761 -2 0 -2Z" fill="#B9DD7B" />
    </g>

    <!-- 3段目 (11 - 15) -->
    <!-- 11: ウィングスプラウト -->
    <g v-else-if="name === 11">
      <path d="M0 20V-6" stroke="#437C62" stroke-width="2" stroke-linecap="round" />
      <path d="M0 -6C0 -6 -12 -8 -16 -16C-19 -22 -10 -24 0 -16V-6Z" fill="#B9DD7B" />
      <path d="M0 -6C0 -6 12 -8 16 -16C19 -22 10 -24 0 -16V-6Z" fill="#88BD76" />
      <path opacity="0.4" d="M0 -12C0 -12 -6 -14 -8 -19" stroke="#619D6E" stroke-width="0.8" />
      <path opacity="0.4" d="M0 -12C0 -12 6 -14 8 -19" stroke="#437C62" stroke-width="0.8" />
    </g>

    <!-- 12: 縦葉脈リーフ -->
    <g v-else-if="name === 12">
      <path d="M0 28V-4" stroke="#437C62" stroke-width="1.5" stroke-linecap="round" />
      <path d="M0 -28C0 -28 8 -18 8 -10C8 -2 0 0 0 0C0 0 -8 -2 -8 -10C-8 -18 0 -28 0 -28Z" fill="#619D6E" />
      <path opacity="0.4" d="M0 -24V-2" stroke="#437C62" stroke-width="0.8" />
    </g>

    <!-- 13: 3連クローバーサークル -->
    <g v-else-if="name === 13">
      <path d="M0 23V-1" stroke="#619D6E" stroke-width="2" stroke-linecap="round" />
      <path d="M-5 -2C-1.134 -2 2 -5.134 2 -9C2 -12.866 -1.134 -16 -5 -16C-8.866 -16 -12 -12.866 -12 -9C-12 -5.134 -8.866 -2 -5 -2Z" fill="#B9DD7B" />
      <path d="M5 -2C8.866 -2 12 -5.134 12 -9C12 -12.866 8.866 -16 5 -16C1.134 -16 -2 -12.866 -2 -9C-2 -5.134 1.134 -2 5 -2Z" fill="#88BD76" />
      <path d="M0 -9C3.866 -9 7 -12.134 7 -16C7 -19.866 3.866 -23 0 -23C-3.866 -23 -7 -19.866 -7 -16C-7 -12.134 -3.866 -9 0 -9Z" fill="#619D6E" />
    </g>

    <!-- 14: ツインブレードスピア -->
    <g v-else-if="name === 14">
      <path d="M-3 24C-3 24 -5 4 -8 -10C-10 -19 -6 -24 -5 -24C-4 -24 -2 -19 -3 -10C-5 4 -3 24 -3 24Z" fill="#88BD76" />
      <path d="M3 24C3 24 5 6 7 -6C8 -14 5 -20 4 -20C3 -20 1 -14 2 -6C4 6 3 24 3 24Z" fill="#B9DD7B" />
    </g>

    <!-- 15: 多弁フラワーリーフ -->
    <g v-else-if="name === 15">
      <path d="M0 24V-2" stroke="#437C62" stroke-width="2" stroke-linecap="round" />
      <path d="M0 -2C0 -2 -9 -4 -11 -8C-13 -12 -9 -14 -5 -12C-7 -16 -9 -20 -7 -22C-5 -24 -1 -22 0 -18C1 -22 5 -24 7 -22C9 -20 7 -16 5 -12C9 -14 13 -12 11 -8C9 -4 0 -2 0 -2Z" fill="#88BD76" />
    </g>

    <!-- 4段目 (16 - 20) -->
    <!-- 16: 二葉フラットベース -->
    <g v-else-if="name === 16">
      <path d="M0 23V-11" stroke="#437C62" stroke-width="1.5" stroke-linecap="round" />
      <path d="M0 -11C0 -11 -9 -17 -9 -25C-9 -31 0 -31 0 -31V-11Z" fill="#B9DD7B" />
      <path d="M0 -11C0 -11 9 -17 9 -25C9 -31 0 -31 0 -31V-11Z" fill="#88BD76" />
    </g>

    <!-- 17: ミニV字ツイン丸葉 -->
    <g v-else-if="name === 17">
      <path d="M0 24V0" stroke="#619D6E" stroke-width="2" stroke-linecap="round" />
      <path d="M-4 -2C-1.791 -2 0 -3.791 0 -6C0 -8.209 -1.791 -10 -4 -10C-6.209 -10 -8 -8.209 -8 -6C-8 -3.791 -6.209 -2 -4 -2Z" fill="#B9DD7B" />
      <path d="M4 -2C6.209 -2 8 -3.791 8 -6C8 -8.209 6.209 -10 4 -10C1.791 -10 0 -8.209 0 -6C0 -3.791 1.791 -2 4 -2Z" fill="#88BD76" />
      <path d="M0 0L-4 -6" stroke="#619D6E" stroke-width="1.2" stroke-linecap="round" />
      <path d="M0 0L4 -6" stroke="#619D6E" stroke-width="1.2" stroke-linecap="round" />
    </g>

    <!-- 18: 横広オーバル（葉脈付き） -->
    <g v-else-if="name === 18">
      <path d="M0 24V2" stroke="#437C62" stroke-width="2" stroke-linecap="round" />
      <path d="M0 4C8.837 4 16 -0.925 16 -7C16 -13.075 8.837 -18 0 -18C-8.837 -18 -16 -13.075 -16 -7C-16 -0.925 -8.837 4 0 4Z" fill="#88BD76" />
      <path opacity="0.5" d="M0 -16V2" stroke="#619D6E" />
      <path opacity="0.3" d="M0 -10L-10 -5" stroke="#619D6E" stroke-width="0.8" />
      <path opacity="0.3" d="M0 -10L10 -5" stroke="#619D6E" stroke-width="0.8" />
    </g>

    <!-- 19: くるりんスプラウト -->
    <g v-else-if="name === 19">
      <path d="M0 24V0" stroke="#619D6E" stroke-width="2" stroke-linecap="round" />
      <path d="M0 0C0 0 0 -10 0 -14C0 -18 5 -20 7 -16C9 -12 5 -10 0 -12" stroke="#88BD76" stroke-width="3" stroke-linecap="round" />
      <path d="M7 -14.5C8.381 -14.5 9.5 -15.619 9.5 -17C9.5 -18.381 8.381 -19.5 7 -19.5C5.619 -19.5 4.5 -18.381 4.5 -17C4.5 -15.619 5.619 -14.5 7 -14.5Z" fill="#B9DD7B" />
    </g>

    <!-- 20: 3枚シャープスプラウト -->
    <g v-else-if="name === 20">
      <path d="M0 24V-6" stroke="#437C62" stroke-width="2" stroke-linecap="round" />
      <path d="M0 -6L-10 -22L0 -18V-6Z" fill="#B9DD7B" />
      <path d="M0 -6L10 -22L0 -18V-6Z" fill="#88BD76" />
      <path d="M0 -26C0 -26 -4 -24 -4 -20C-4 -16 0 -14 0 -14C0 -14 4 -16 4 -20C4 -24 0 -26 0 -26Z" fill="#619D6E" />
    </g>
  </svg>
</template>
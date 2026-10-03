import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        text: {
          main: '#2C3E2D',
          muted: '#555555',
          light: '#767676',
        },
        sprout: {
          bg: '#F8F8ED',
          title: '#325632',
          forest: '#2C5E3B',
          border: '#42845A',
          'border-light': '#69A362',
          light: '#B9DD7B',
          grass: '#88BD76',
          mid: '#619D6E',
          moss: '#437C62',
          dark: '#1B3A24',
          accent: '#DFF794',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        serif: ['"Noto Serif JP"', 'serif'],
      },
      boxShadow: {
        header: '0px 4px 5px 1px rgba(0, 0, 0, 0.25)',
      },
      fontSize: {
        'fluid-hero': 'clamp(2.75rem, 5.5vw + 0.5rem, 4.5rem)', // 44px 〜 72px
        'fluid-h1': 'clamp(1.875rem, 3.2vw + 0.6rem, 3rem)',     // 30px 〜 48px (セクションタイトル等)
        'fluid-h2': 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)',     // 24px 〜 36px (サブ見出し・企画名等)
        'fluid-h3': 'clamp(1.25rem, 2vw, 1.5rem)',               // 20px 〜 24px (中見出し等)
        'fluid-lead': 'clamp(0.9375rem, 1.1vw, 1.125rem)',        // 15px 〜 18px (リード文・説明文)
        'fluid-caption': 'clamp(0.75rem, 1vw, 0.875rem)',         // 12px 〜 14px (補足テキスト)
      },
    },
  },
  plugins: [],
}

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
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0D13',
        surface: '#111821',
        raised: '#192331',
        line: '#2A3543',
        bone: '#F1EEE6',
        muted: '#A9B4C3',
        coral: '#FF625A',
        mint: '#52D6C4',
        gold: '#E7BD71',
        intel: '#97ABDA',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Arial Narrow"', 'sans-serif'],
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

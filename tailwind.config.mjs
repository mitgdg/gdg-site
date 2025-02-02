/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        muted: {
          DEFAULT: '#262626',
          dark: '#d4d4d4',
        },
      },
    },
  },
  plugins: [],
};

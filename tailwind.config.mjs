/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        sm: '3px 3px var(--tw-shadow-color, #40404080)',
        md: '5px 5px var(--tw-shadow-color, #40404080)',
        DEFAULT: '5px 5px var(--tw-shadow-color, #40404080)',
        lg: '8px 8px var(--tw-shadow-color, #40404080)',
      },
      colors: {
        muted: {
          DEFAULT: '#737373',
          dark: '#d4d4d4',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

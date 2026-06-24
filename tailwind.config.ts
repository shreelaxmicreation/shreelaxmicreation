import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        secondary: 'var(--navy)',
        cta: 'var(--cta)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        brand: 'var(--brand)',
        ink: 'var(--ink)',
        canvas: 'var(--canvas)',
        navy: 'var(--navy)',
      },
      fontFamily: {
        display: ['var(--font-bodoni-moda)', 'Georgia', 'serif'],
        body:    ['var(--font-hanken)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        layout:  '1440px',
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}

export default config

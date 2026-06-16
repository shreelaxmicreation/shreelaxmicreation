import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F1E8', // Soft Cream — primary bg (70%)
        surface: '#FAF8F3',    // Stone White — cards, alt sections
        secondary: '#1C315E',  // Midnight Navy
        cta: '#D6B06A',        // Warm Sand — accent (10%)
        text: '#232323',       // Charcoal
        muted: '#8A8578',      // Warm grey
        brand: '#D6B06A',      // Warm Sand alias
        ink: '#232323',        // Charcoal alias
        canvas: '#F5F1E8',     // Cream alias
        navy: '#1C315E',       // Midnight Navy
      },
      fontFamily: {
        display: ['var(--font-bodoni-moda)', 'Georgia', 'serif'],
        body:    ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        layout:  '1440px',
      },
    },
  },
  plugins: [],
}

export default config

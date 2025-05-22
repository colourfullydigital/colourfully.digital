/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'green': '#76E07F',
        'orange': '#FE6A25',
        'yellow': '#FFDA6B',
        'blue': '#5B7CFA',
        'black': '#121212',
        'white': '#FFFFFF',
        
        // Secondary Colors
        'green-light': '#A0EBA6',
        'green-dark': '#4CB653',
        'orange-light': '#FF8F5A',
        'orange-dark': '#D44C0A',
        'yellow-light': '#FFE59A',
        'yellow-dark': '#E5B83C',
        'blue-light': '#8A9FFF',
        'blue-dark': '#3A5AD7',

        // Feedback Colors
        'success': '#4BE246',
        'error': '#F4464F',
        'warning': '#D3BC0E',
        'info': '#097BF4',

        // Surface Colors
        'background': '#FFFFFF',
        'surface': '#F5F5F5',
        'surface-variant': '#EEEEEE',
        'border': '#DDDDDD',

        // Text Colors
        'text-primary': '#121212',
        'text-secondary': '#555555',
        'text-hint': '#888888',
        'text-on-primary': '#FFFFFF',
        'text-on-dark': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
        '7xl': '4.5rem',     // 72px
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        black: '900',
      },
      lineHeight: {
        tight: '1.1',
        snug: '1.25',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',     // 4px
        '2': '0.5rem',      // 8px
        '3': '0.75rem',     // 12px
        '4': '1rem',        // 16px
        '5': '1.5rem',      // 24px
        '6': '2rem',        // 32px
        '8': '2.5rem',      // 40px
        '10': '3rem',       // 48px
        '12': '4rem',       // 64px
        '16': '6rem',       // 96px
        '20': '8rem',       // 128px
      },
      borderWidth: {
        thin: '1px',
        normal: '2px',
        thick: '4px',
        brutalist: '8px',
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        sm: '4px 4px 0 0 rgba(0, 0, 0, 0.9)',
        md: '8px 8px 0 0 rgba(0, 0, 0, 0.9)',
        lg: '12px 12px 0 0 rgba(0, 0, 0, 0.9)',
        inner: 'inset 4px 4px 0 0 rgba(0, 0, 0, 0.1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1240px',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}

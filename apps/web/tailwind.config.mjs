/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      borderWidth: {
        'brutalist': '8px',
      },
      colors: {
        // Primary Colors
        'brand-green': 'var(--color-green)',
        'brand-orange': 'var(--color-orange)',
        'brand-yellow': 'var(--color-yellow)',
        'brand-blue': 'var(--color-blue)',
        'black': 'var(--color-black)',
        'white': 'var(--color-white)',
        
        // Secondary Colors
        'brand-green-light': 'var(--color-green-light)',
        'brand-green-dark': 'var(--color-green-dark)',
        'brand-orange-light': 'var(--color-orange-light)',
        'brand-orange-dark': 'var(--color-orange-dark)',
        'brand-yellow-light': 'var(--color-yellow-light)',
        'brand-yellow-dark': 'var(--color-yellow-dark)',
        'brand-blue-light': 'var(--color-blue-light)',
        'brand-blue-dark': 'var(--color-blue-dark)',
        
        // Text Colors
        'on-dark': 'var(--color-text-on-dark)',
      },
      boxShadow: {
        'brutalist-sm': 'var(--shadow-sm)',
        'brutalist-md': 'var(--shadow-md)',
        'brutalist-lg': 'var(--shadow-lg)',
      },
      borderRadius: {
        'brutalist-sm': 'var(--radius-sm)',
        'brutalist-md': 'var(--radius-md)',
        'brutalist-lg': 'var(--radius-lg)',
      },
      fontFamily: {
        'primary': 'var(--font-primary)',
        'mono': 'var(--font-mono)',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // This line is causing the error
  ]
}

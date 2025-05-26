/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['./tests/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: [...configDefaults.exclude],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/setup.ts',
        '**/*.d.ts',
        'tests/**',
        'src/types.ts'
      ]
    }
  }
});

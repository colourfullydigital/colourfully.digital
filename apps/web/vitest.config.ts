/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: '.',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      exclude: [
        'node_modules/',
        'tests/setup.ts',
        'dist/',
        '**/*.d.ts',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    include: ['tests/unit/**/*.test.ts?(x)', 'tests/integration/**/*.test.ts?(x)'],
    reporters: ['default', 'html'],
    watch: false,
    pool: 'threads',
    poolOptions: {
      threads: {
        maxThreads: process.env.CI ? 1 : undefined,
        minThreads: process.env.CI ? 1 : undefined
      }
    },
    testTimeout: 20000,
  },
});

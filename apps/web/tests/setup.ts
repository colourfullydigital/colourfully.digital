import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with Testing Library matchers
expect.extend(matchers)

// Declare global utilities
declare global {
  function createTestId(component: string, element: string): string;
}

// Automatically cleanup after each test
afterEach(() => {
  cleanup()
})

// Add any global test setup here
beforeAll(() => {
  // Mock window properties that are not available in jsdom
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

afterAll(() => {
  // Global cleanup
})

// Implement test utilities
globalThis.createTestId = (component: string, element: string): string => 
  `${component}-${element}`
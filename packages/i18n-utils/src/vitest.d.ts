/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveAttribute(attr: string, value?: string | RegExp): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

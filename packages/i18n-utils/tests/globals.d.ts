/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveTextContent(text: string | RegExp): R;
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}

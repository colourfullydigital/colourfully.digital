import '@testing-library/jest-dom';

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeInTheDocument(): void;
    toHaveTextContent(text: string): void;
  }
}

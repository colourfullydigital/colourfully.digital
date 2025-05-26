import '@testing-library/jest-dom';
import './globals.d.ts';

// Suppress specific console warnings during tests
const originalConsoleWarn = console.warn;
console.warn = (msg: string, ...args: any[]) => {
  if (!msg.includes('Namespace')) {
    originalConsoleWarn(msg, ...args);
  }
};

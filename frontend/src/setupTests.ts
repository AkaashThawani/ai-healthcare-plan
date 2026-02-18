/**
 * Test setup file for Vitest.
 * This file runs before all tests.
 */
import '@testing-library/jest-dom';

// Add custom matchers
// Example: expect(element).toBeInTheDocument()

// Global test setup
beforeAll(() => {
  // Setup code that runs once before all tests
});

// Setup before each test
beforeEach(() => {
  // Reset any mocks or state before each test
});

// Cleanup after each test
afterEach(() => {
  // Cleanup code after each test
});

// Global cleanup
afterAll(() => {
  // Cleanup code that runs once after all tests
});

// Mock window.matchMedia (not implemented in jsdom)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver (not implemented in jsdom)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

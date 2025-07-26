import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";

// Extend global namespace to include testUtils
declare global {
	var testUtils: Record<string, unknown>;
}

beforeAll(async () => {
	// Global test setup
});

afterAll(async () => {
	// Global test cleanup
});

beforeEach(() => {
	// Reset mocks before each test
	vi.clearAllMocks();
});

afterEach(() => {
	// Cleanup after each test
});

// Mock environment variables for testing
process.env.NODE_ENV = "test";
process.env.PORT = "3001";

// Global test utilities
globalThis.testUtils = {
	// Add any global test utilities here
};

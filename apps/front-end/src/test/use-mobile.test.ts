import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock window.matchMedia
const mockMatchMedia = vi.fn();

describe("useIsMobile Hook", () => {
	beforeEach(() => {
		// Reset mocks before each test
		vi.clearAllMocks();

		// Mock window.innerWidth
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 1024, // Default to desktop width
		});

		// Mock window.matchMedia
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: mockMatchMedia,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("returns false for desktop screen width", () => {
		// Mock desktop width (1024px)
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 1024,
		});

		const mockMediaQuery = {
			matches: false,
			media: "(max-width: 767px)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		};

		mockMatchMedia.mockReturnValue(mockMediaQuery);

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(false);
		expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
	});

	it("returns true for mobile screen width", () => {
		// Mock mobile width (600px)
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 600,
		});

		const mockMediaQuery = {
			matches: true,
			media: "(max-width: 767px)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		};

		mockMatchMedia.mockReturnValue(mockMediaQuery);

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(true);
		expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
	});

	it("responds to window resize events", () => {
		let changeCallback: (() => void) | null = null;

		const mockMediaQuery = {
			matches: false,
			media: "(max-width: 767px)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn((event: string, callback: () => void) => {
				if (event === "change") {
					changeCallback = callback;
				}
			}),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		};

		mockMatchMedia.mockReturnValue(mockMediaQuery);

		const { result } = renderHook(() => useIsMobile());

		// Initially desktop
		expect(result.current).toBe(false);

		// Simulate resize to mobile
		act(() => {
			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 600,
			});

			if (changeCallback) {
				changeCallback();
			}
		});

		expect(result.current).toBe(true);
	});

	it("cleans up event listeners on unmount", () => {
		const mockRemoveEventListener = vi.fn();

		const mockMediaQuery = {
			matches: false,
			media: "(max-width: 767px)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: mockRemoveEventListener,
			dispatchEvent: vi.fn(),
		};

		mockMatchMedia.mockReturnValue(mockMediaQuery);

		const { unmount } = renderHook(() => useIsMobile());

		unmount();

		expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
	});

	it("handles edge case at breakpoint boundary", () => {
		// Test exactly at the breakpoint (767px)
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 767,
		});

		const mockMediaQuery = {
			matches: true,
			media: "(max-width: 767px)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		};

		mockMatchMedia.mockReturnValue(mockMediaQuery);

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(true);
	});

	it("handles undefined initial state correctly", () => {
		// Mock initial undefined state
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 1024,
		});

		const mockMediaQuery = {
			matches: false,
			media: "(max-width: 767px)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		};

		mockMatchMedia.mockReturnValue(mockMediaQuery);

		const { result } = renderHook(() => useIsMobile());

		// Should return false (not undefined) due to !!isMobile conversion
		expect(result.current).toBe(false);
		expect(typeof result.current).toBe("boolean");
	});
});

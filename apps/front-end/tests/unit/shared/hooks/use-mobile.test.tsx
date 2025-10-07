import { beforeEach, describe, expect, test, vi } from "vitest";
import { useIsMobile } from "@/shared/hooks";
import { fireEvent, render, screen, waitFor } from "../../utils/test-utils";

// Test component to test the hook
function TestComponent() {
	const isMobile = useIsMobile();
	return <div data-testid="mobile-status">{isMobile ? "mobile" : "desktop"}</div>;
}

describe("useIsMobile Hook", () => {
	beforeEach(() => {
		// Reset window.innerWidth before each test
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 1024,
		});
	});

	test("should return false for desktop width", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 1024,
		});

		render(<TestComponent />);
		expect(screen.getByTestId("mobile-status")).toHaveTextContent("desktop");
	});

	test("should return true for mobile width", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 600,
		});

		render(<TestComponent />);
		expect(screen.getByTestId("mobile-status")).toHaveTextContent("mobile");
	});

	test("should update when window is resized", async () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 1024,
		});

		render(<TestComponent />);
		expect(screen.getByTestId("mobile-status")).toHaveTextContent("desktop");

		// Simulate window resize
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 600,
		});

		fireEvent(window, new Event("resize"));

		await waitFor(() => {
			expect(screen.getByTestId("mobile-status")).toHaveTextContent("mobile");
		});
	});

	test("should handle edge case at breakpoint", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 768, // Exactly at breakpoint
		});

		render(<TestComponent />);
		expect(screen.getByTestId("mobile-status")).toHaveTextContent("mobile");
	});
});

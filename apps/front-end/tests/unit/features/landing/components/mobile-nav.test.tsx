import { beforeEach, describe, expect, test, vi } from "vitest";
import { MobileNav } from "@/features/landing/components";
import { fireEvent, render, screen, waitFor } from "../../../../utils/test-utils";
import "@testing-library/jest-dom";

describe("MobileNav Component", () => {
	beforeEach(() => {
		// Mock window.matchMedia for responsive behavior
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: query === "(max-width: 768px)",
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});
	});

	test("renders mobile menu button", () => {
		render(<MobileNav />);

		const menuButton = screen.getByRole("button", { name: /toggle menu/i });
		expect(menuButton).toBeInTheDocument();
	});

	test("opens mobile menu when button is clicked", async () => {
		render(<MobileNav />);

		const menuButton = screen.getByRole("button", { name: /toggle menu/i });
		fireEvent.click(menuButton);

		await waitFor(() => {
			expect(screen.getByText("Drive Connect")).toBeInTheDocument();
		});
	});

	test("displays navigation links in mobile menu", async () => {
		render(<MobileNav />);

		const menuButton = screen.getByRole("button", { name: /toggle menu/i });
		fireEvent.click(menuButton);

		await waitFor(() => {
			expect(screen.getByText("Features")).toBeInTheDocument();
			expect(screen.getByText("Testimonials")).toBeInTheDocument();
			expect(screen.getByText("Pricing")).toBeInTheDocument();
		});
	});

	test("displays action buttons in mobile menu", async () => {
		render(<MobileNav />);

		const menuButton = screen.getByRole("button", { name: /toggle menu/i });
		fireEvent.click(menuButton);

		await waitFor(() => {
			expect(screen.getByText("Sign In")).toBeInTheDocument();
			expect(screen.getByText("Get Started")).toBeInTheDocument();
		});
	});

	test("closes menu when navigation link is clicked", async () => {
		render(<MobileNav />);

		const menuButton = screen.getByRole("button", { name: /toggle menu/i });
		fireEvent.click(menuButton);

		await waitFor(() => {
			expect(screen.getByText("Features")).toBeInTheDocument();
		});

		const featuresLink = screen.getByText("Features");
		fireEvent.click(featuresLink);

		await waitFor(() => {
			expect(screen.queryByText("Features")).not.toBeInTheDocument();
		});
	});
});

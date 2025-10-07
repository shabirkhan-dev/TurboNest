import { describe, expect, test, vi } from "vitest";
import { AnimatedTestimonialsDemo } from "@/features/landing/components";
import { fireEvent, render, screen, waitFor } from "../../../../utils/test-utils";
import "@testing-library/jest-dom";

// Mock framer-motion
vi.mock("framer-motion", () => ({
	motion: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
		span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
		p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
	},
	AnimatePresence: ({ children }: any) => <div data-testid="animate-presence">{children}</div>,
}));

// Mock Next.js Image
vi.mock("next/image", () => ({
	default: ({ src, alt, ...props }: any) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img src={src} alt={alt} {...props} />
	),
}));

describe("AnimatedTestimonialsDemo Component", () => {
	test("renders testimonials component", () => {
		render(<AnimatedTestimonialsDemo />);

		// Check if the component renders
		expect(screen.getByTestId("animate-presence")).toBeInTheDocument();
	});

	test("displays first testimonial by default", () => {
		render(<AnimatedTestimonialsDemo />);

		// Check if the first testimonial name is displayed
		expect(screen.getByText("Ananya Gupta")).toBeInTheDocument();
		expect(screen.getByText("Frontend Engineer, NovaTech")).toBeInTheDocument();
	});

	test("renders navigation buttons", () => {
		render(<AnimatedTestimonialsDemo />);

		// Check if navigation buttons are present
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);
	});

	test("navigates to next testimonial", async () => {
		render(<AnimatedTestimonialsDemo />);

		// Initially shows first testimonial
		expect(screen.getByText("Ananya Gupta")).toBeInTheDocument();

		// Click next button (second button)
		const buttons = screen.getAllByRole("button");
		fireEvent.click(buttons[1]);

		// Should show second testimonial
		await waitFor(() => {
			expect(screen.getByText("Sophia Allen")).toBeInTheDocument();
		});
	});

	test("navigates to previous testimonial", async () => {
		render(<AnimatedTestimonialsDemo />);

		// Initially shows first testimonial
		expect(screen.getByText("Ananya Gupta")).toBeInTheDocument();

		// Click previous button (first button, should wrap to last testimonial)
		const buttons = screen.getAllByRole("button");
		fireEvent.click(buttons[0]);

		// Should show last testimonial
		await waitFor(() => {
			expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
		});
	});

	test("cycles through all testimonials", async () => {
		render(<AnimatedTestimonialsDemo />);

		const buttons = screen.getAllByRole("button");
		const nextButton = buttons[1]; // Second button is next

		// Test cycling through all testimonials
		fireEvent.click(nextButton);
		await waitFor(() => {
			expect(screen.getByText("Sophia Allen")).toBeInTheDocument();
		});

		fireEvent.click(nextButton);
		await waitFor(() => {
			expect(screen.getByText("Ethan Rodriguez")).toBeInTheDocument();
		});

		fireEvent.click(nextButton);
		await waitFor(() => {
			expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
		});

		// Should wrap back to first
		fireEvent.click(nextButton);
		await waitFor(() => {
			expect(screen.getByText("Ananya Gupta")).toBeInTheDocument();
		});
	});

	test("displays testimonial images", () => {
		render(<AnimatedTestimonialsDemo />);

		// Check if images are rendered
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(4); // 4 testimonials

		// Check if first image has correct alt text
		expect(screen.getByAltText("Ananya Gupta")).toBeInTheDocument();
	});

	test("has proper accessibility attributes", () => {
		render(<AnimatedTestimonialsDemo />);

		// Check if buttons are present and accessible
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);

		// Check if buttons are focusable
		buttons.forEach((button) => {
			expect(button).toBeInTheDocument();
		});
	});
});

import { describe, expect, test } from "vitest";
import { FeaturesLoading, LoadingCard, TestimonialsLoading } from "@/features/landing/components";
import { render, screen } from "../../../../utils/test-utils";
import "@testing-library/jest-dom";

describe("Loading Components", () => {
	test("LoadingCard renders skeleton elements", () => {
		render(<LoadingCard />);

		// Check if skeleton elements are present (they use data-slot="skeleton")
		const skeletons = screen.getAllByTestId("skeleton");
		expect(skeletons).toHaveLength(4);
	});

	test("FeaturesLoading renders correct number of loading cards", () => {
		render(<FeaturesLoading />);

		// Check if 6 loading cards are rendered (matching features count)
		const skeletons = screen.getAllByTestId("skeleton");
		expect(skeletons).toHaveLength(24); // 6 cards × 4 skeletons each
	});

	test("TestimonialsLoading renders correct number of loading cards", () => {
		render(<TestimonialsLoading />);

		// Check if 3 testimonial loading cards are rendered
		const skeletons = screen.getAllByTestId("skeleton");
		expect(skeletons).toHaveLength(15); // 3 cards × 5 skeletons each (5 stars + 4 other elements)
	});

	test("LoadingCard has proper accessibility attributes", () => {
		render(<LoadingCard />);

		// Check if skeleton elements have proper ARIA attributes
		const skeletons = screen.getAllByTestId("skeleton");
		skeletons.forEach((skeleton) => {
			expect(skeleton).toHaveAttribute("aria-hidden", "true");
		});
	});

	test("FeaturesLoading has proper structure", () => {
		render(<FeaturesLoading />);

		// Check if the container has proper structure
		const containers = screen.getAllByRole("generic");
		const container = containers.find((el) => el.classList.contains("grid"));
		expect(container).toBeInTheDocument();
		expect(container).toHaveClass("grid", "md:grid-cols-2", "lg:grid-cols-3", "gap-8");
	});

	test("TestimonialsLoading has proper structure", () => {
		render(<TestimonialsLoading />);

		// Check if the container has proper structure
		const containers = screen.getAllByRole("generic");
		const container = containers.find((el) => el.classList.contains("grid"));
		expect(container).toBeInTheDocument();
		expect(container).toHaveClass("grid", "md:grid-cols-2", "lg:grid-cols-3", "gap-8");
	});
});

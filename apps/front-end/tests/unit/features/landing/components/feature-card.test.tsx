import { Shield } from "lucide-react";
import { describe, expect, test } from "vitest";
import { FeatureCard } from "@/features/landing/components";
import type { Feature } from "@/features/landing/types";
import { render, screen } from "../../../../utils/test-utils";

const mockFeature: Feature = {
	id: "test-feature",
	title: "Test Feature",
	description: "This is a test feature description",
	icon: "Shield",
};

describe("FeatureCard Component", () => {
	test("renders feature title and description", () => {
		render(<FeatureCard feature={mockFeature} icon={Shield} />);

		expect(screen.getByText("Test Feature")).toBeInTheDocument();
		expect(screen.getByText("This is a test feature description")).toBeInTheDocument();
	});

	test("renders icon correctly", () => {
		render(<FeatureCard feature={mockFeature} icon={Shield} />);

		const iconElement = screen.getByRole("img", { hidden: true });
		expect(iconElement).toBeInTheDocument();
	});

	test("applies hover styles", () => {
		render(<FeatureCard feature={mockFeature} icon={Shield} />);

		const card = screen.getByRole("article");
		expect(card).toHaveClass("group", "hover:shadow-lg", "transition-all", "duration-300");
	});

	test("has proper accessibility attributes", () => {
		render(<FeatureCard feature={mockFeature} icon={Shield} />);

		const card = screen.getByRole("article");
		expect(card).toBeInTheDocument();
	});
});

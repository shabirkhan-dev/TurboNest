import { expect, test } from "@playwright/test";

test.describe("Landing Page", () => {
	test("should load and display main content", async ({ page }) => {
		await page.goto("/");

		// Check if the main heading is visible
		await expect(page.getByRole("heading", { name: /build amazing apps/i })).toBeVisible();

		// Check if the navigation is present
		await expect(page.getByRole("navigation")).toBeVisible();
		await expect(page.getByText("Drive Connect")).toBeVisible();

		// Check if CTA buttons are present
		await expect(page.getByRole("button", { name: /get started free/i })).toBeVisible();
		await expect(page.getByRole("button", { name: /view demo/i })).toBeVisible();
	});

	test("should display features section", async ({ page }) => {
		await page.goto("/");

		// Check features section heading
		await expect(
			page.getByRole("heading", { name: /everything you need to build/i }),
		).toBeVisible();

		// Check if feature cards are present
		const featureCards = page.locator('[data-testid="feature-card"]');
		await expect(featureCards).toHaveCount(6);

		// Check specific features
		await expect(page.getByText("Secure Authentication")).toBeVisible();
		await expect(page.getByText("Database Ready")).toBeVisible();
		await expect(page.getByText("Responsive Design")).toBeVisible();
	});

	test("should display testimonials section", async ({ page }) => {
		await page.goto("/");

		// Check testimonials section heading
		await expect(page.getByRole("heading", { name: /loved by developers/i })).toBeVisible();

		// Check if testimonials are present
		const testimonialCards = page.locator('[data-testid="testimonial-card"]');
		await expect(testimonialCards).toHaveCount(3);

		// Check if star ratings are visible
		const stars = page.locator('[data-testid="star-rating"]');
		await expect(stars).toHaveCount(3);
	});

	test("should display CTA section", async ({ page }) => {
		await page.goto("/");

		// Check CTA section heading
		await expect(
			page.getByRole("heading", { name: /ready to build something amazing/i }),
		).toBeVisible();

		// Check CTA buttons
		await expect(page.getByRole("button", { name: /start building now/i })).toBeVisible();
		await expect(page.getByRole("button", { name: /view documentation/i })).toBeVisible();
	});

	test("should display footer", async ({ page }) => {
		await page.goto("/");

		// Check footer content
		await expect(page.getByRole("contentinfo")).toBeVisible();
		await expect(page.getByText("© 2024 Drive Connect. All rights reserved.")).toBeVisible();

		// Check footer links
		await expect(page.getByRole("link", { name: /features/i })).toBeVisible();
		await expect(page.getByRole("link", { name: /pricing/i })).toBeVisible();
		await expect(page.getByRole("link", { name: /documentation/i })).toBeVisible();
	});

	test("should be responsive on mobile", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		// Check if mobile navigation is present
		await expect(page.getByRole("button", { name: /toggle menu/i })).toBeVisible();

		// Check if desktop navigation is hidden
		await expect(page.getByRole("link", { name: /features/i })).not.toBeVisible();
	});

	test("should open mobile menu", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		// Click mobile menu button
		await page.getByRole("button", { name: /toggle menu/i }).click();

		// Check if mobile menu is open
		await expect(page.getByText("Features")).toBeVisible();
		await expect(page.getByText("Testimonials")).toBeVisible();
		await expect(page.getByText("Pricing")).toBeVisible();
	});
});

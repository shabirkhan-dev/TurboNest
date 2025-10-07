import { expect, test } from "@playwright/test";

test.describe("Dashboard", () => {
	test.beforeEach(async ({ page }) => {
		// Mock authentication - in a real app, you'd set up proper auth state
		await page.goto("/dashboard");
	});

	test("should display dashboard layout", async ({ page }) => {
		// Check if sidebar is present
		await expect(page.getByRole("complementary")).toBeVisible();

		// Check if main content area is present
		await expect(page.getByRole("main")).toBeVisible();

		// Check if header is present
		await expect(page.getByRole("banner")).toBeVisible();
	});

	test("should display dashboard stats", async ({ page }) => {
		// Check if stats cards are present
		await expect(page.getByText(/total users/i)).toBeVisible();
		await expect(page.getByText(/total revenue/i)).toBeVisible();
		await expect(page.getByText(/total orders/i)).toBeVisible();
		await expect(page.getByText(/growth rate/i)).toBeVisible();
	});

	test("should display charts", async ({ page }) => {
		// Check if chart container is present
		await expect(page.locator('[data-testid="chart-container"]')).toBeVisible();

		// Check if chart has proper accessibility attributes
		await expect(page.locator('[role="img"][aria-label*="chart"]')).toBeVisible();
	});

	test("should display data table", async ({ page }) => {
		// Check if table is present
		await expect(page.getByRole("table")).toBeVisible();

		// Check if table headers are present
		await expect(page.getByRole("columnheader")).toBeVisible();

		// Check if table rows are present
		await expect(page.getByRole("row")).toBeVisible();
	});

	test("should handle table pagination", async ({ page }) => {
		// Check if pagination controls are present
		await expect(page.getByRole("button", { name: /previous/i })).toBeVisible();
		await expect(page.getByRole("button", { name: /next/i })).toBeVisible();

		// Test pagination
		await page.getByRole("button", { name: /next/i }).click();
		await expect(page.getByText(/page 2/i)).toBeVisible();
	});

	test("should handle table sorting", async ({ page }) => {
		// Click on a sortable column header
		await page.getByRole("columnheader", { name: /name/i }).click();

		// Check if sort indicator is present
		await expect(page.locator('[aria-sort="ascending"]')).toBeVisible();

		// Click again to reverse sort
		await page.getByRole("columnheader", { name: /name/i }).click();
		await expect(page.locator('[aria-sort="descending"]')).toBeVisible();
	});

	test("should be responsive on mobile", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		// Check if mobile navigation is present
		await expect(page.getByRole("button", { name: /toggle sidebar/i })).toBeVisible();

		// Check if sidebar is collapsed by default
		await expect(page.getByRole("complementary")).not.toBeVisible();
	});

	test("should toggle sidebar on mobile", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		// Click mobile menu button
		await page.getByRole("button", { name: /toggle sidebar/i }).click();

		// Check if sidebar is now visible
		await expect(page.getByRole("complementary")).toBeVisible();

		// Click again to close
		await page.getByRole("button", { name: /toggle sidebar/i }).click();
		await expect(page.getByRole("complementary")).not.toBeVisible();
	});

	test("should handle sidebar navigation", async ({ page }) => {
		// Click on a navigation item
		await page.getByRole("link", { name: /analytics/i }).click();

		// Check if URL changed
		await expect(page).toHaveURL("/dashboard/analytics");

		// Check if content updated
		await expect(page.getByRole("heading", { name: /analytics/i })).toBeVisible();
	});
});

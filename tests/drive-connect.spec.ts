import { expect, test } from "@playwright/test";

// Test data and constants
const APP_TITLE = "Drive Connect";
const LOGIN_BUTTON_TEXT = /login/i;
const SIGNUP_BUTTON_TEXT = /sign up/i;
const HOME_LINK_PATTERN = /home/i;
const ERROR_PAGE_PATTERN = /404|not found|error/i;

test.describe("Drive Connect Application", () => {
	test("should load the application homepage", async ({ page }) => {
		await page.goto("/");

		// Check if the page loads successfully
		await expect(page).toHaveTitle(new RegExp(APP_TITLE, "i"));

		// Verify the page loads without errors
		await expect(page.locator("body")).toBeVisible();
	});

	test("should have proper navigation structure", async ({ page }) => {
		await page.goto("/");

		// Check for main navigation elements
		const nav = page.getByRole("navigation");
		await expect(nav).toBeVisible();

		// Check for common navigation items
		const homeLink = page.getByRole("link", { name: HOME_LINK_PATTERN });
		await expect(homeLink).toBeVisible();
	});

	test("should handle authentication flow", async ({ page }) => {
		await page.goto("/");

		// Look for login/signup buttons
		const loginButton = page.getByRole("button", { name: LOGIN_BUTTON_TEXT });
		const signupButton = page.getByRole("button", { name: SIGNUP_BUTTON_TEXT });

		// At least one of these should be present
		await expect(loginButton.or(signupButton)).toBeVisible();
	});

	test("should be responsive on mobile devices", async ({ page }) => {
		await page.goto("/");

		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		// Verify the page is still visible on mobile
		await expect(page.locator("body")).toBeVisible();

		// Check that navigation is still functional
		const nav = page.getByRole("navigation");
		await expect(nav).toBeVisible();
	});

	test("should handle form interactions", async ({ page }) => {
		await page.goto("/");

		// Look for any forms on the page
		const forms = page.locator("form");
		const formCount = await forms.count();

		if (formCount > 0) {
			// Test form visibility
			const firstForm = forms.first();
			await expect(firstForm).toBeVisible();
		}
	});

	test("should have proper error handling", async ({ page }) => {
		// Test 404 page
		await page.goto("/non-existent-page");

		// Should show a proper error page
		await expect(page).toHaveTitle(ERROR_PAGE_PATTERN);
	});

	test("should support keyboard navigation", async ({ page }) => {
		await page.goto("/");

		// Test tab navigation
		await page.keyboard.press("Tab");

		// Verify focus is visible
		const focusedElement = page.locator(":focus");
		await expect(focusedElement).toBeVisible();
	});
});

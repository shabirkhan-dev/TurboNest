import type { Page } from "@playwright/test";
import { test as base } from "@playwright/test";

// Extend basic test by providing "authenticatedPage" fixture
export const test = base.extend<{
	authenticatedPage: Page;
}>({
	authenticatedPage: async ({ page }, use) => {
		// Set up authentication state
		await page.goto("/login");

		// Mock successful login
		await page.evaluate(() => {
			localStorage.setItem("auth_token", "mock-jwt-token");
			localStorage.setItem("refresh_token", "mock-refresh-token");
			localStorage.setItem(
				"user",
				JSON.stringify({
					id: "1",
					email: "test@example.com",
					name: "Test User",
					role: "user",
				}),
			);
		});

		await use(page);
	},
});

export { expect } from "@playwright/test";

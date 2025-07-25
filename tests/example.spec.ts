import { expect, test } from "@playwright/test";

// Regex patterns defined at top level for performance
const TITLE_PATTERN = /Drive Connect/;
const GET_STARTED_LINK_PATTERN = /get started/i;
const INSTALLATION_HEADING_PATTERN = /installation/i;

test("has title", async ({ page }) => {
	await page.goto("/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(TITLE_PATTERN);
});

test("get started link", async ({ page }) => {
	await page.goto("/");

	// Click the get started link.
	await page.getByRole("link", { name: GET_STARTED_LINK_PATTERN }).click();

	// Expects page to have a heading with the name of Installation.
	await expect(
		page.getByRole("heading", { name: INSTALLATION_HEADING_PATTERN })
	).toBeVisible();
});

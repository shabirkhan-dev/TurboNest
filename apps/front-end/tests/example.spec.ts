import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle("Drive Connect");
});

test("get started link", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle("Drive Connect");
	await expect(page.getByText("Drive Connect")).toBeVisible();
});

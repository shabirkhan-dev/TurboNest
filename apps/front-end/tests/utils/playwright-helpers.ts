import type { Page } from "@playwright/test";

export class TestHelpers {
	constructor(private page: Page) {}

	async mockApiResponse(endpoint: string, response: unknown, status = 200) {
		await this.page.route(`**/api${endpoint}`, async (route) => {
			await route.fulfill({
				status,
				contentType: "application/json",
				body: JSON.stringify(response),
			});
		});
	}

	async mockApiError(endpoint: string, error: string, status = 400) {
		await this.page.route(`**/api${endpoint}`, async (route) => {
			await route.fulfill({
				status,
				contentType: "application/json",
				body: JSON.stringify({ error }),
			});
		});
	}

	async waitForApiCall(endpoint: string) {
		await this.page.waitForResponse(`**/api${endpoint}`);
	}

	async setViewportSize(width: number, height: number) {
		await this.page.setViewportSize({ width, height });
	}

	async mockLocalStorage(data: Record<string, string>) {
		await this.page.evaluate((data) => {
			Object.entries(data).forEach(([key, value]) => {
				localStorage.setItem(key, value);
			});
		}, data);
	}

	async clearLocalStorage() {
		await this.page.evaluate(() => {
			localStorage.clear();
		});
	}

	async mockGeolocation(latitude: number, longitude: number) {
		await this.page.context().grantPermissions(["geolocation"]);
		await this.page.context().setGeolocation({ latitude, longitude });
	}

	async mockNotificationPermission(permission: "granted" | "denied" | "default") {
		await this.page.evaluate((permission) => {
			Object.defineProperty(navigator, "permissions", {
				value: {
					query: () => Promise.resolve({ state: permission }),
				},
			});
		}, permission);
	}

	async takeScreenshot(name: string) {
		await this.page.screenshot({ path: `tests/screenshots/${name}.png` });
	}

	async waitForElement(selector: string, timeout = 5000) {
		await this.page.waitForSelector(selector, { timeout });
	}

	async waitForText(text: string, timeout = 5000) {
		await this.page.waitForSelector(`text=${text}`, { timeout });
	}

	async fillForm(formData: Record<string, string>) {
		for (const [field, value] of Object.entries(formData)) {
			await this.page.fill(`[name="${field}"]`, value);
		}
	}

	async submitForm(formSelector = "form") {
		await this.page.click(`${formSelector} button[type="submit"]`);
	}

	async expectElementToBeVisible(selector: string) {
		await this.page.waitForSelector(selector, { state: "visible" });
	}

	async expectElementToBeHidden(selector: string) {
		await this.page.waitForSelector(selector, { state: "hidden" });
	}

	async expectTextToBeVisible(text: string) {
		await this.page.waitForSelector(`text=${text}`, { state: "visible" });
	}

	async expectTextToBeHidden(text: string) {
		await this.page.waitForSelector(`text=${text}`, { state: "hidden" });
	}
}

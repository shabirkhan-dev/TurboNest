import { defineConfig } from "@playwright/test";
import { playwrightConfig } from "@rabtx/playwright-config";

export default defineConfig({
	...playwrightConfig,
	testDir: "./tests",
	use: {
		...playwrightConfig.use,
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "http://localhost:3000",
	},
	/* Run your local dev server before starting the tests */
	webServer: {
		command: "bun dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});

import { defineConfig, devices } from "@playwright/test";

/**
 * Shared Playwright configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export const playwrightConfig = defineConfig({
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		["html"],
		["json", { outputFile: "test-results/results.json" }],
		["junit", { outputFile: "test-results/results.xml" }],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		/* Take screenshot on failure */
		screenshot: "only-on-failure",
		/* Record video on failure */
		video: "retain-on-failure",
	},
	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
		/* Test against mobile viewports. */
		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "Mobile Safari",
			use: { ...devices["iPhone 12"] },
		},
	],
	/* Global test timeout */
	timeout: 30 * 1000,
	/* Expect timeout */
	expect: {
		timeout: 5000,
	},
});

export default playwrightConfig;

import { expect, test } from "@playwright/test";

test.describe("Authentication Flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/login");
	});

	test("should display login form", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
		await expect(page.getByLabel(/email/i)).toBeVisible();
		await expect(page.getByLabel(/password/i)).toBeVisible();
		await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
	});

	test("should validate required fields", async ({ page }) => {
		await page.getByRole("button", { name: /sign in/i }).click();

		await expect(page.getByText(/email is required/i)).toBeVisible();
		await expect(page.getByText(/password is required/i)).toBeVisible();
	});

	test("should validate email format", async ({ page }) => {
		await page.getByLabel(/email/i).fill("invalid-email");
		await page.getByRole("button", { name: /sign in/i }).click();

		await expect(page.getByText(/invalid email format/i)).toBeVisible();
	});

	test("should navigate to signup page", async ({ page }) => {
		await page.getByRole("link", { name: /sign up/i }).click();
		await expect(page).toHaveURL("/signup");
	});

	test("should navigate to forgot password", async ({ page }) => {
		await page.getByRole("link", { name: /forgot password/i }).click();
		await expect(page).toHaveURL("/forgot-password");
	});
});

test.describe("Signup Flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/signup");
	});

	test("should display signup form", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /sign up/i })).toBeVisible();
		await expect(page.getByLabel(/name/i)).toBeVisible();
		await expect(page.getByLabel(/email/i)).toBeVisible();
		await expect(page.getByLabel(/password/i)).toBeVisible();
		await expect(page.getByLabel(/confirm password/i)).toBeVisible();
		await expect(page.getByRole("button", { name: /sign up/i })).toBeVisible();
	});

	test("should validate password confirmation", async ({ page }) => {
		await page.getByLabel(/password/i).fill("password123");
		await page.getByLabel(/confirm password/i).fill("different123");
		await page.getByRole("button", { name: /sign up/i }).click();

		await expect(page.getByText(/passwords do not match/i)).toBeVisible();
	});

	test("should validate password strength", async ({ page }) => {
		await page.getByLabel(/password/i).fill("123");
		await page.getByRole("button", { name: /sign up/i }).click();

		await expect(page.getByText(/password must be at least 8 characters/i)).toBeVisible();
	});

	test("should navigate to login page", async ({ page }) => {
		await page.getByRole("link", { name: /sign in/i }).click();
		await expect(page).toHaveURL("/login");
	});
});

test.describe("OTP Verification", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/otp");
	});

	test("should display OTP form", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /verify your email/i })).toBeVisible();
		await expect(page.getByLabel(/verification code/i)).toBeVisible();
		await expect(page.getByRole("button", { name: /verify/i })).toBeVisible();
	});

	test("should validate OTP length", async ({ page }) => {
		await page.getByLabel(/verification code/i).fill("123");
		await page.getByRole("button", { name: /verify/i }).click();

		await expect(page.getByText(/verification code must be 6 digits/i)).toBeVisible();
	});

	test("should resend OTP", async ({ page }) => {
		await page.getByRole("button", { name: /resend code/i }).click();
		await expect(page.getByText(/verification code sent/i)).toBeVisible();
	});
});

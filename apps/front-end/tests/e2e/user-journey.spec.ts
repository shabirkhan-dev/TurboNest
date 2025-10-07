import { expect, test } from "@playwright/test";
import { TestHelpers } from "../utils/playwright-helpers";

test.describe("Complete User Journey", () => {
	let helpers: TestHelpers;

	test.beforeEach(async ({ page }) => {
		helpers = new TestHelpers(page);
	});

	test("should complete full user journey from landing to dashboard", async ({ page }) => {
		// Step 1: Visit landing page
		await page.goto("/");

		// Verify landing page loads correctly
		await expect(page.getByRole("heading", { name: /build amazing apps/i })).toBeVisible();
		await expect(page.getByText("Drive Connect")).toBeVisible();

		// Step 2: Navigate to signup
		await page.getByRole("button", { name: /get started free/i }).click();
		await expect(page).toHaveURL("/signup");

		// Step 3: Complete signup form
		await helpers.fillForm({
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			confirmPassword: "password123",
		});

		// Mock successful signup API response
		await helpers.mockApiResponse("/auth/signup", {
			user: {
				id: "1",
				name: "John Doe",
				email: "john.doe@example.com",
				role: "user",
			},
			token: "mock-jwt-token",
			refreshToken: "mock-refresh-token",
		});

		await page.getByRole("button", { name: /sign up/i }).click();

		// Step 4: Verify OTP page
		await expect(page).toHaveURL("/otp");
		await expect(page.getByRole("heading", { name: /verify your email/i })).toBeVisible();

		// Step 5: Complete OTP verification
		await helpers.mockApiResponse("/auth/verify-otp", { success: true });
		await page.getByLabel(/verification code/i).fill("123456");
		await page.getByRole("button", { name: /verify/i }).click();

		// Step 6: Verify dashboard access
		await expect(page).toHaveURL("/dashboard");
		await expect(page.getByText("Welcome, John Doe")).toBeVisible();

		// Step 7: Verify dashboard functionality
		await expect(page.getByText(/total users/i)).toBeVisible();
		await expect(page.getByText(/total revenue/i)).toBeVisible();
		await expect(page.getByRole("table")).toBeVisible();

		// Step 8: Test navigation
		await page.getByRole("link", { name: /analytics/i }).click();
		await expect(page).toHaveURL("/dashboard/analytics");
		await expect(page.getByRole("heading", { name: /analytics/i })).toBeVisible();

		// Step 9: Test logout
		await page.getByRole("button", { name: /logout/i }).click();
		await expect(page).toHaveURL("/login");
		await expect(page.getByText(/signed out successfully/i)).toBeVisible();
	});

	test("should handle login flow", async ({ page }) => {
		// Step 1: Visit login page
		await page.goto("/login");

		// Step 2: Fill login form
		await helpers.fillForm({
			email: "john.doe@example.com",
			password: "password123",
		});

		// Mock successful login API response
		await helpers.mockApiResponse("/auth/login", {
			user: {
				id: "1",
				name: "John Doe",
				email: "john.doe@example.com",
				role: "user",
			},
			token: "mock-jwt-token",
			refreshToken: "mock-refresh-token",
		});

		await page.getByRole("button", { name: /sign in/i }).click();

		// Step 3: Verify dashboard access
		await expect(page).toHaveURL("/dashboard");
		await expect(page.getByText("Welcome, John Doe")).toBeVisible();
	});

	test("should handle error states gracefully", async ({ page }) => {
		// Test login with invalid credentials
		await page.goto("/login");

		await helpers.fillForm({
			email: "invalid@example.com",
			password: "wrongpassword",
		});

		// Mock error response
		await helpers.mockApiError("/auth/login", "Invalid credentials", 401);

		await page.getByRole("button", { name: /sign in/i }).click();

		// Verify error message is displayed
		await expect(page.getByText(/invalid credentials/i)).toBeVisible();

		// Test signup with existing email
		await page.getByRole("link", { name: /sign up/i }).click();

		await helpers.fillForm({
			name: "John Doe",
			email: "existing@example.com",
			password: "password123",
			confirmPassword: "password123",
		});

		// Mock error response
		await helpers.mockApiError("/auth/signup", "Email already exists", 409);

		await page.getByRole("button", { name: /sign up/i }).click();

		// Verify error message is displayed
		await expect(page.getByText(/email already exists/i)).toBeVisible();
	});

	test("should be responsive across devices", async ({ page }) => {
		// Test desktop view
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto("/");

		// Verify desktop navigation
		await expect(page.getByRole("link", { name: /features/i })).toBeVisible();
		await expect(page.getByRole("button", { name: /toggle menu/i })).not.toBeVisible();

		// Test tablet view
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.reload();

		// Verify tablet layout
		await expect(page.getByRole("link", { name: /features/i })).toBeVisible();

		// Test mobile view
		await page.setViewportSize({ width: 375, height: 667 });
		await page.reload();

		// Verify mobile navigation
		await expect(page.getByRole("button", { name: /toggle menu/i })).toBeVisible();
		await expect(page.getByRole("link", { name: /features/i })).not.toBeVisible();

		// Test mobile menu
		await page.getByRole("button", { name: /toggle menu/i }).click();
		await expect(page.getByText("Features")).toBeVisible();
	});

	test("should handle form validation", async ({ page }) => {
		// Test signup form validation
		await page.goto("/signup");

		// Submit empty form
		await page.getByRole("button", { name: /sign up/i }).click();

		// Verify validation messages
		await expect(page.getByText(/name is required/i)).toBeVisible();
		await expect(page.getByText(/email is required/i)).toBeVisible();
		await expect(page.getByText(/password is required/i)).toBeVisible();

		// Test email format validation
		await page.getByLabel(/email/i).fill("invalid-email");
		await page.getByRole("button", { name: /sign up/i }).click();
		await expect(page.getByText(/invalid email format/i)).toBeVisible();

		// Test password confirmation validation
		await page.getByLabel(/email/i).fill("test@example.com");
		await page.getByLabel(/password/i).fill("password123");
		await page.getByLabel(/confirm password/i).fill("different123");
		await page.getByRole("button", { name: /sign up/i }).click();
		await expect(page.getByText(/passwords do not match/i)).toBeVisible();
	});
});

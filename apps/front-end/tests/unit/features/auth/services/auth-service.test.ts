import { beforeEach, describe, expect, test, vi } from "vitest";
import { authService } from "@/features/auth/services/auth-service";
import { createMockAuthResponse, createMockFetchResponse } from "../../../utils/test-utils";

// Mock fetch globally
global.fetch = vi.fn();

describe("AuthService", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("login", () => {
		test("should login successfully", async () => {
			const mockResponse = createMockAuthResponse();
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse(mockResponse));

			const result = await authService.login({
				email: "test@example.com",
				password: "password123",
			});

			expect(fetch).toHaveBeenCalledWith("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: "test@example.com",
					password: "password123",
				}),
			});

			expect(result).toEqual(mockResponse);
		});

		test("should handle login error", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}, false));

			await expect(
				authService.login({
					email: "test@example.com",
					password: "wrongpassword",
				}),
			).rejects.toThrow("Login failed");
		});
	});

	describe("signup", () => {
		test("should signup successfully", async () => {
			const mockResponse = createMockAuthResponse();
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse(mockResponse));

			const result = await authService.signup({
				name: "Test User",
				email: "test@example.com",
				password: "password123",
				confirmPassword: "password123",
			});

			expect(fetch).toHaveBeenCalledWith("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: "Test User",
					email: "test@example.com",
					password: "password123",
					confirmPassword: "password123",
				}),
			});

			expect(result).toEqual(mockResponse);
		});

		test("should handle signup error", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}, false));

			await expect(
				authService.signup({
					name: "Test User",
					email: "test@example.com",
					password: "password123",
					confirmPassword: "password123",
				}),
			).rejects.toThrow("Signup failed");
		});
	});

	describe("sendOTP", () => {
		test("should send OTP successfully", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}));

			await authService.sendOTP("test@example.com");

			expect(fetch).toHaveBeenCalledWith("/api/auth/send-otp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: "test@example.com" }),
			});
		});

		test("should handle send OTP error", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}, false));

			await expect(authService.sendOTP("test@example.com")).rejects.toThrow("Failed to send OTP");
		});
	});

	describe("verifyOTP", () => {
		test("should verify OTP successfully", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}));

			await authService.verifyOTP({
				code: "123456",
				email: "test@example.com",
			});

			expect(fetch).toHaveBeenCalledWith("/api/auth/verify-otp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: "123456",
					email: "test@example.com",
				}),
			});
		});

		test("should handle verify OTP error", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}, false));

			await expect(
				authService.verifyOTP({
					code: "123456",
					email: "test@example.com",
				}),
			).rejects.toThrow("OTP verification failed");
		});
	});

	describe("logout", () => {
		test("should logout successfully", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}));

			await authService.logout();

			expect(fetch).toHaveBeenCalledWith("/api/auth/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
		});

		test("should handle logout error", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}, false));

			await expect(authService.logout()).rejects.toThrow("Logout failed");
		});
	});

	describe("refreshToken", () => {
		test("should refresh token successfully", async () => {
			const mockResponse = createMockAuthResponse();
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse(mockResponse));

			const result = await authService.refreshToken("refresh-token");

			expect(fetch).toHaveBeenCalledWith("/api/auth/refresh", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refreshToken: "refresh-token" }),
			});

			expect(result).toEqual(mockResponse);
		});

		test("should handle refresh token error", async () => {
			vi.mocked(fetch).mockResolvedValue(createMockFetchResponse({}, false));

			await expect(authService.refreshToken("invalid-token")).rejects.toThrow(
				"Token refresh failed",
			);
		});
	});
});

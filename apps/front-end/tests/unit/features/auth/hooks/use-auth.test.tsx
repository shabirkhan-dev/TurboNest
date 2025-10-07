import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { authService } from "@/features/auth/services/auth-service";
import {
	createMockAuthResponse,
	createMockUser,
	mockLocalStorage,
} from "../../../../utils/test-utils";

// Mock the auth service
vi.mock("@/features/auth/services/auth-service", () => ({
	authService: {
		login: vi.fn(),
		signup: vi.fn(),
		logout: vi.fn(),
		sendOTP: vi.fn(),
		verifyOTP: vi.fn(),
		refreshToken: vi.fn(),
	},
}));

describe("useAuth Hook", () => {
	let mockStorage: ReturnType<typeof mockLocalStorage>;

	beforeEach(() => {
		mockStorage = mockLocalStorage();
		Object.defineProperty(window, "localStorage", {
			value: mockStorage,
			writable: true,
		});
		vi.clearAllMocks();
	});

	test("should initialize with no user", async () => {
		const { result } = renderHook(() => useAuth());

		// Check initial state
		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.error).toBeNull();

		// Wait for the auth check to complete
		await act(async () => {
			// Wait for the useEffect to complete
		});

		// After auth check, loading should be false
		expect(result.current.isLoading).toBe(false);
	});

	test("should login successfully", async () => {
		const mockResponse = createMockAuthResponse();
		vi.mocked(authService.login).mockResolvedValue(mockResponse);

		const { result } = renderHook(() => useAuth());

		await act(async () => {
			await result.current.login({
				email: "test@example.com",
				password: "password123",
			});
		});

		expect(result.current.user).toEqual(mockResponse.user);
		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.error).toBeNull();
		expect(mockStorage.setItem).toHaveBeenCalledWith("auth_token", mockResponse.token);
		expect(mockStorage.setItem).toHaveBeenCalledWith("refresh_token", mockResponse.refreshToken);
	});

	test("should handle login error", async () => {
		const errorMessage = "Invalid credentials";
		vi.mocked(authService.login).mockRejectedValue(new Error(errorMessage));

		const { result } = renderHook(() => useAuth());

		await act(async () => {
			try {
				await result.current.login({
					email: "test@example.com",
					password: "wrongpassword",
				});
			} catch {
				// Expected to throw
			}
		});

		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.error).toBe(errorMessage);
	});

	test("should signup successfully", async () => {
		const mockResponse = createMockAuthResponse();
		vi.mocked(authService.signup).mockResolvedValue(mockResponse);

		const { result } = renderHook(() => useAuth());

		await act(async () => {
			await result.current.signup({
				name: "Test User",
				email: "test@example.com",
				password: "password123",
				confirmPassword: "password123",
			});
		});

		expect(result.current.user).toEqual(mockResponse.user);
		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.error).toBeNull();
	});

	test("should logout successfully", async () => {
		const mockUser = createMockUser();
		mockStorage.getItem.mockReturnValue("mock-token");
		vi.mocked(authService.logout).mockResolvedValue();

		const { result } = renderHook(() => useAuth());

		// Set initial user state
		await act(async () => {
			result.current.user = mockUser;
		});

		await act(async () => {
			await result.current.logout();
		});

		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);
		expect(mockStorage.removeItem).toHaveBeenCalledWith("auth_token");
		expect(mockStorage.removeItem).toHaveBeenCalledWith("refresh_token");
	});

	test("should send OTP successfully", async () => {
		vi.mocked(authService.sendOTP).mockResolvedValue();

		const { result } = renderHook(() => useAuth());

		await act(async () => {
			await result.current.sendOTP("test@example.com");
		});

		expect(authService.sendOTP).toHaveBeenCalledWith("test@example.com");
		expect(result.current.error).toBeNull();
	});

	test("should verify OTP successfully", async () => {
		vi.mocked(authService.verifyOTP).mockResolvedValue();

		const { result } = renderHook(() => useAuth());

		await act(async () => {
			await result.current.verifyOTP({
				code: "123456",
				email: "test@example.com",
			});
		});

		expect(authService.verifyOTP).toHaveBeenCalledWith({
			code: "123456",
			email: "test@example.com",
		});
		expect(result.current.error).toBeNull();
	});
});

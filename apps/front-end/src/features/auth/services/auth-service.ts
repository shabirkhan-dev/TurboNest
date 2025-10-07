import type { AuthResponse, LoginCredentials, OTPVerification, SignupCredentials } from "../types";

class AuthService {
	private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await fetch(`${this.baseUrl}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error("Login failed");
		}

		return response.json();
	}

	async signup(credentials: SignupCredentials): Promise<AuthResponse> {
		const response = await fetch(`${this.baseUrl}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error("Signup failed");
		}

		return response.json();
	}

	async sendOTP(email: string): Promise<void> {
		const response = await fetch(`${this.baseUrl}/auth/send-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			throw new Error("Failed to send OTP");
		}
	}

	async verifyOTP(otp: OTPVerification): Promise<void> {
		const response = await fetch(`${this.baseUrl}/auth/verify-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(otp),
		});

		if (!response.ok) {
			throw new Error("OTP verification failed");
		}
	}

	async logout(): Promise<void> {
		const response = await fetch(`${this.baseUrl}/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Logout failed");
		}
	}

	async refreshToken(refreshToken: string): Promise<AuthResponse> {
		const response = await fetch(`${this.baseUrl}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
		});

		if (!response.ok) {
			throw new Error("Token refresh failed");
		}

		return response.json();
	}
}

export const authService = new AuthService();

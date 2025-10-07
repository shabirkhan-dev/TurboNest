"use client";

import { useEffect, useState } from "react";
import { authService } from "../services/auth-service";
import type { LoginCredentials, OTPVerification, SignupCredentials, User } from "../types";

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Check for existing session
		const checkAuth = async () => {
			try {
				const token = localStorage.getItem("auth_token");
				if (token) {
					// Verify token and get user data
					// This would typically be an API call
					setUser({
						id: "1",
						email: "user@example.com",
						name: "John Doe",
						role: "user",
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					});
				}
			} catch (err) {
				setError("Failed to verify authentication");
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const login = async (credentials: LoginCredentials) => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await authService.login(credentials);
			setUser(response.user);
			localStorage.setItem("auth_token", response.token);
			localStorage.setItem("refresh_token", response.refreshToken);
		} catch (error) {
			setError(error instanceof Error ? error.message : "Login failed");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const signup = async (credentials: SignupCredentials) => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await authService.signup(credentials);
			setUser(response.user);
			localStorage.setItem("auth_token", response.token);
			localStorage.setItem("refresh_token", response.refreshToken);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Signup failed");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		try {
			await authService.logout();
			setUser(null);
			localStorage.removeItem("auth_token");
			localStorage.removeItem("refresh_token");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Logout failed");
		}
	};

	const sendOTP = async (email: string) => {
		try {
			setIsLoading(true);
			setError(null);
			await authService.sendOTP(email);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to send OTP");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const verifyOTP = async (otp: OTPVerification) => {
		try {
			setIsLoading(true);
			setError(null);
			await authService.verifyOTP(otp);
		} catch (err) {
			setError(err instanceof Error ? err.message : "OTP verification failed");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		user,
		isLoading,
		error,
		login,
		signup,
		logout,
		sendOTP,
		verifyOTP,
		isAuthenticated: !!user,
	};
}

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: "user" | "admin";
	createdAt: string;
	updatedAt: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SignupCredentials {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface AuthResponse {
	user: User;
	token: string;
	refreshToken: string;
}

export interface OTPVerification {
	code: string;
	email: string;
}

export const AUTH_CONSTANTS = {
	VALIDATION: {
		EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		PASSWORD_MIN_LENGTH: 8,
		OTP_LENGTH: 6,
	},
	MESSAGES: {
		LOGIN_SUCCESS: "Welcome back!",
		SIGNUP_SUCCESS: "Account created successfully!",
		OTP_SENT: "Verification code sent to your email",
		OTP_VERIFIED: "Email verified successfully!",
		LOGOUT_SUCCESS: "Logged out successfully",
	},
	ERRORS: {
		INVALID_CREDENTIALS: "Invalid email or password",
		EMAIL_EXISTS: "Email already exists",
		INVALID_OTP: "Invalid verification code",
		OTP_EXPIRED: "Verification code has expired",
		NETWORK_ERROR: "Network error. Please try again.",
	},
} as const;

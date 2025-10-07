export const APP_CONSTANTS = {
	APP_NAME: "Drive Connect",
	APP_DESCRIPTION: "Modern boilerplate platform for building amazing applications",
	VERSION: "1.0.0",
	API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "/api",
	STORAGE_KEYS: {
		AUTH_TOKEN: "auth_token",
		REFRESH_TOKEN: "refresh_token",
		THEME: "theme",
		USER_PREFERENCES: "user_preferences",
	},
	ROUTES: {
		HOME: "/",
		LOGIN: "/login",
		SIGNUP: "/signup",
		DASHBOARD: "/dashboard",
		PROFILE: "/profile",
		SETTINGS: "/settings",
	},
	BREAKPOINTS: {
		SM: "640px",
		MD: "768px",
		LG: "1024px",
		XL: "1280px",
		"2XL": "1536px",
	},
} as const;

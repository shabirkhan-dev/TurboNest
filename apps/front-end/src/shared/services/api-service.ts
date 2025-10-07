import type { ApiResponse } from "../types";

class ApiService {
	private baseUrl: string;

	constructor(baseUrl?: string) {
		this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || "/api";
	}

	private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
		const url = `${this.baseUrl}${endpoint}`;
		const token = localStorage.getItem("auth_token");

		const config: RequestInit = {
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
				...options.headers,
			},
			...options,
		};

		try {
			const response = await fetch(url, config);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Request failed");
			}

			return data;
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}

	async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
		const url = params
			? `${endpoint}?${new URLSearchParams(params as Record<string, string>)}`
			: endpoint;
		return this.request<T>(url, { method: "GET" });
	}

	async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { method: "DELETE" });
	}

	async upload<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
		const token = localStorage.getItem("auth_token");

		return this.request<T>(endpoint, {
			method: "POST",
			headers: {
				...(token && { Authorization: `Bearer ${token}` }),
			},
			body: formData,
		});
	}
}

export const apiService = new ApiService();

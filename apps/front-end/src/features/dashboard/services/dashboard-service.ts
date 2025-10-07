import type { ChartData, DashboardData, DashboardStats, TableRow } from "../types";

class DashboardService {
	private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

	async getDashboardData(): Promise<DashboardData> {
		const response = await fetch(`${this.baseUrl}/dashboard`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch dashboard data");
		}

		return response.json();
	}

	async getStats(): Promise<DashboardStats> {
		const response = await fetch(`${this.baseUrl}/dashboard/stats`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch stats");
		}

		return response.json();
	}

	async getChartData(): Promise<ChartData[]> {
		const response = await fetch(`${this.baseUrl}/dashboard/charts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch chart data");
		}

		return response.json();
	}

	async getRecentOrders(): Promise<TableRow[]> {
		const response = await fetch(`${this.baseUrl}/dashboard/orders`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch recent orders");
		}

		return response.json();
	}
}

export const dashboardService = new DashboardService();

import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useChartData, useDashboard, useDashboardStats } from "@/features/dashboard/hooks";
import { dashboardService } from "@/features/dashboard/services/dashboard-service";

// Mock the dashboard service
vi.mock("@/features/dashboard/services/dashboard-service", () => ({
	dashboardService: {
		getDashboardData: vi.fn(),
		getStats: vi.fn(),
		getChartData: vi.fn(),
		getRecentOrders: vi.fn(),
	},
}));

describe("Dashboard Hooks", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("useDashboard", () => {
		test("should fetch dashboard data successfully", async () => {
			const mockData = {
				stats: {
					totalUsers: 1000,
					totalRevenue: 50000,
					totalOrders: 250,
					growthRate: 15,
				},
				chartData: [
					{ name: "Jan", value: 100 },
					{ name: "Feb", value: 150 },
				],
				recentOrders: [
					{ id: "1", customer: "John Doe", amount: 100 },
					{ id: "2", customer: "Jane Smith", amount: 200 },
				],
			};

			vi.mocked(dashboardService.getDashboardData).mockResolvedValue(mockData);

			const { result } = renderHook(() => useDashboard());

			expect(result.current.isLoading).toBe(true);
			expect(result.current.data).toBeNull();

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(result.current.isLoading).toBe(false);
			expect(result.current.data).toEqual(mockData);
			expect(result.current.error).toBeNull();
		});

		test("should handle dashboard data fetch error", async () => {
			const errorMessage = "Failed to fetch dashboard data";
			vi.mocked(dashboardService.getDashboardData).mockRejectedValue(new Error(errorMessage));

			const { result } = renderHook(() => useDashboard());

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(result.current.isLoading).toBe(false);
			expect(result.current.data).toBeNull();
			expect(result.current.error).toBe(errorMessage);
		});

		test("should refresh data", async () => {
			const mockData = {
				stats: { totalUsers: 1000, totalRevenue: 50000, totalOrders: 250, growthRate: 15 },
				chartData: [],
				recentOrders: [],
			};

			vi.mocked(dashboardService.getDashboardData).mockResolvedValue(mockData);

			const { result } = renderHook(() => useDashboard());

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(result.current.data).toEqual(mockData);

			await act(async () => {
				await result.current.refreshData();
			});

			expect(dashboardService.getDashboardData).toHaveBeenCalledTimes(2);
		});
	});

	describe("useDashboardStats", () => {
		test("should fetch stats successfully", async () => {
			const mockStats = {
				totalUsers: 1000,
				totalRevenue: 50000,
				totalOrders: 250,
				growthRate: 15,
			};

			vi.mocked(dashboardService.getStats).mockResolvedValue(mockStats);

			const { result } = renderHook(() => useDashboardStats());

			expect(result.current.isLoading).toBe(true);
			expect(result.current.stats).toBeNull();

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(result.current.isLoading).toBe(false);
			expect(result.current.stats).toEqual(mockStats);
			expect(result.current.error).toBeNull();
		});

		test("should handle stats fetch error", async () => {
			const errorMessage = "Failed to fetch stats";
			vi.mocked(dashboardService.getStats).mockRejectedValue(new Error(errorMessage));

			const { result } = renderHook(() => useDashboardStats());

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(result.current.isLoading).toBe(false);
			expect(result.current.stats).toBeNull();
			expect(result.current.error).toBe(errorMessage);
		});
	});

	describe("useChartData", () => {
		test("should fetch chart data successfully", async () => {
			const mockChartData = [
				{ name: "Jan", value: 100, color: "#8884d8" },
				{ name: "Feb", value: 150, color: "#82ca9d" },
			];

			vi.mocked(dashboardService.getChartData).mockResolvedValue(mockChartData);

			const { result } = renderHook(() => useChartData());

			expect(result.current.isLoading).toBe(true);
			expect(result.current.chartData).toEqual([]);

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(result.current.isLoading).toBe(false);
			expect(result.current.chartData).toEqual(mockChartData);
			expect(result.current.error).toBeNull();
		});

		test("should handle chart data fetch error", async () => {
			const errorMessage = "Failed to fetch chart data";
			vi.mocked(dashboardService.getChartData).mockRejectedValue(new Error(errorMessage));

			const { result } = renderHook(() => useChartData());

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(result.current.isLoading).toBe(false);
			expect(result.current.chartData).toEqual([]);
			expect(result.current.error).toBe(errorMessage);
		});
	});
});

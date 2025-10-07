"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "../services/dashboard-service";
import type { ChartData, DashboardData, DashboardStats } from "../types";

export function useDashboard() {
	const [data, setData] = useState<DashboardData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const dashboardData = await dashboardService.getDashboardData();
				setData(dashboardData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load dashboard data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const refreshData = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const dashboardData = await dashboardService.getDashboardData();
			setData(dashboardData);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to refresh data");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		data,
		isLoading,
		error,
		refreshData,
	};
}

export function useDashboardStats() {
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const statsData = await dashboardService.getStats();
				setStats(statsData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load stats");
			} finally {
				setIsLoading(false);
			}
		};

		fetchStats();
	}, []);

	return {
		stats,
		isLoading,
		error,
	};
}

export function useChartData() {
	const [chartData, setChartData] = useState<ChartData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchChartData = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const data = await dashboardService.getChartData();
				setChartData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load chart data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchChartData();
	}, []);

	return {
		chartData,
		isLoading,
		error,
	};
}

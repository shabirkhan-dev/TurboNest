export interface DashboardStats {
	totalUsers: number;
	totalRevenue: number;
	totalOrders: number;
	growthRate: number;
}

export interface ChartData {
	name: string;
	value: number;
	color?: string;
}

export interface TableColumn {
	key: string;
	title: string;
	sortable?: boolean;
	width?: string;
}

export interface TableRow {
	id: string;
	[key: string]: unknown;
}

export interface DashboardData {
	stats: DashboardStats;
	chartData: ChartData[];
	recentOrders: TableRow[];
}

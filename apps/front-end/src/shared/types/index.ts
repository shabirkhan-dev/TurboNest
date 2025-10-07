export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface PaginationParams {
	page: number;
	limit: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface Theme {
	name: string;
	colors: {
		primary: string;
		secondary: string;
		background: string;
		foreground: string;
	};
}

export interface NavigationItem {
	id: string;
	label: string;
	href: string;
	icon?: string;
	children?: NavigationItem[];
}

import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { vi } from "vitest";

// Mock Next.js router
export const mockRouter = {
	push: vi.fn(),
	replace: vi.fn(),
	prefetch: vi.fn(),
	back: vi.fn(),
	forward: vi.fn(),
	refresh: vi.fn(),
	pathname: "/",
	query: {},
	asPath: "/",
	events: {
		on: vi.fn(),
		off: vi.fn(),
		emit: vi.fn(),
	},
	isFallback: false,
	isLocaleDomain: false,
	isReady: true,
	isPreview: false,
	basePath: "",
	locale: "en",
	locales: ["en"],
	defaultLocale: "en",
	domainLocales: [],
};

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
	useRouter: () => mockRouter,
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
	useParams: () => ({}),
}));

// Mock Next.js image
vi.mock("next/image", () => ({
	default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img src={src} alt={alt} {...props} />
	),
}));

// Mock environment variables
vi.mock("process", () => ({
	env: {
		NEXT_PUBLIC_API_URL: "http://localhost:3000/api",
	},
}));

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

// Test data factories
export const createMockUser = (overrides = {}) => ({
	id: "1",
	email: "test@example.com",
	name: "Test User",
	avatar: "TU",
	role: "user" as const,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	...overrides,
});

export const createMockAuthResponse = (overrides = {}) => ({
	user: createMockUser(),
	token: "mock-jwt-token",
	refreshToken: "mock-refresh-token",
	...overrides,
});

export const createMockFeature = (overrides = {}) => ({
	id: "test-feature",
	title: "Test Feature",
	description: "Test feature description",
	icon: "Shield",
	...overrides,
});

export const createMockTestimonial = (overrides = {}) => ({
	id: "1",
	name: "Test User",
	role: "Developer",
	avatar: "TU",
	rating: 5,
	content: "Great product!",
	...overrides,
});

// Mock fetch responses
export const createMockFetchResponse = (data: unknown, ok = true) => ({
	ok,
	json: vi.fn().mockResolvedValue(data),
	text: vi.fn().mockResolvedValue(JSON.stringify(data)),
	status: ok ? 200 : 400,
	statusText: ok ? "OK" : "Bad Request",
});

// Mock localStorage
export const mockLocalStorage = () => {
	const store: Record<string, string> = {};
	return {
		getItem: vi.fn((key: string) => store[key] || null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key];
		}),
		clear: vi.fn(() => {
			Object.keys(store).forEach((key) => {
				delete store[key];
			});
		}),
	};
};

// Wait for async operations
export const waitFor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Clean up after tests
export const cleanup = () => {
	vi.clearAllMocks();
	vi.resetAllMocks();
};

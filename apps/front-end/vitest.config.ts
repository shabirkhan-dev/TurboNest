/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./tests/utils/test-setup.ts"],
		include: ["tests/unit/**/*.{test,spec}.{js,ts,jsx,tsx}"],
		exclude: ["node_modules", "tests/e2e"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"node_modules/",
				"tests/",
				"**/*.d.ts",
				"**/*.config.*",
				"**/coverage/**",
				"**/dist/**",
				"**/.next/**",
			],
			thresholds: {
				global: {
					branches: 80,
					functions: 80,
					lines: 80,
					statements: 80,
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});

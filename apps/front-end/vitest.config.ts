import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		globals: true,
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		exclude: ["tests/**/*", "tests-examples/**/*"],
		coverage: {
			provider: "istanbul",
			reporter: [
				[
					"json",
					{
						file: `../coverage.json`,
					},
				],
			],
			enabled: true,
			exclude: [
				"node_modules/",
				"src/test/",
				"**/*.d.ts",
				"**/*.config.*",
				"dist/",
				"build/",
				".next/",
			],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});

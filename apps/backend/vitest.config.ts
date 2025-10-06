import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		setupFiles: ["./src/test/setup.ts"],
		globals: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			enabled: false,
			exclude: ["node_modules/", "src/test/", "**/*.d.ts", "**/*.config.*", "dist/", "build/"],
		},
	},
	resolve: {
		alias: {
			"@": new URL("./src", import.meta.url).pathname,
		},
	},
});

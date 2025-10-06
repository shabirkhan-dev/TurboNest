export const sharedConfig = {
	test: {
		globals: true,
		coverage: {
			provider: "istanbul" as const,
			reporter: [
				[
					"json",
					{
						file: `../coverage.json`,
					},
				],
			] as const,
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
};

// Re-export specific configs for backwards compatibility
export { baseConfig } from "./configs/base-config.js";
export { uiConfig } from "./configs/ui-config.js";

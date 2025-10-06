import { sharedConfig } from "@rabtx/vitest-config";
import { defineConfig } from "vitest/config";

export default defineConfig({
	...sharedConfig,
	test: {
		projects: [
			{
				name: "packages",
				root: "./packages/*",
				test: {
					...sharedConfig.test,
					environment: "node",
				},
			},
			{
				name: "apps",
				root: "./apps/*",
				test: {
					...sharedConfig.test,
					environment: "jsdom",
				},
			},
		],
	},
});

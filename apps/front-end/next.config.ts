import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	// Fix webpack caching issues on Windows
	webpack: (config, { dev, isServer }) => {
		// Prevent webpack from trying to resolve package manager
		config.resolve.symlinks = false;

		// Fix Windows file permission issues with webpack cache
		if (dev && !isServer) {
			config.cache = {
				type: "memory", // Use memory cache instead of filesystem on Windows
			};
		}

		// Handle TypeScript files from workspace packages
		config.module.rules.push({
			test: /\.tsx?$/,
			include: [/node_modules\/@rabtx/],
			exclude: [/node_modules\/@rabtx\/node_modules/],
			use: [
				{
					loader: "babel-loader",
					options: {
						presets: ["next/babel"],
						plugins: [],
					},
				},
			],
		});

		return config;
	},
	// Ensure TypeScript works correctly
	typescript: {
		ignoreBuildErrors: false,
	},
	// Optimize for Tailwind CSS v4
	experimental: {
		optimizePackageImports: ["lucide-react", "@radix-ui/react-slot"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
		],
	},
};

export default nextConfig;

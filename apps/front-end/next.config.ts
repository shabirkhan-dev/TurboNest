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
};

export default nextConfig;

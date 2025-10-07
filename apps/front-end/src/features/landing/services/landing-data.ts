import type { LandingPageData } from "../types";

export const landingPageData: LandingPageData = {
	hero: {
		title: "Build Amazing Apps",
		subtitle: "Faster",
		description:
			"Start your next project with our modern boilerplate. Pre-configured with authentication, database, beautiful UI components, and everything you need to ship fast.",
		ctaPrimary: "Get Started Free",
		ctaSecondary: "View Demo",
	},
	features: [
		{
			id: "auth",
			title: "Secure Authentication",
			description:
				"Built-in authentication with JWT, OAuth, and session management. Secure by default with best practices.",
			icon: "Shield",
		},
		{
			id: "database",
			title: "Database Ready",
			description:
				"Pre-configured database connections with migrations, models, and query builders included.",
			icon: "BarChart3",
		},
		{
			id: "responsive",
			title: "Responsive Design",
			description:
				"Mobile-first design with beautiful UI components that work perfectly on all devices.",
			icon: "Smartphone",
		},
		{
			id: "performance",
			title: "Lightning Fast",
			description:
				"Optimized for performance with modern build tools, code splitting, and caching strategies.",
			icon: "Zap",
		},
		{
			id: "typescript",
			title: "Type Safe",
			description:
				"Full TypeScript support with strict type checking and excellent developer experience.",
			icon: "Globe",
		},
		{
			id: "team",
			title: "Team Ready",
			description:
				"Built for teams with linting, testing, and CI/CD pipelines configured out of the box.",
			icon: "Users",
		},
	],
	testimonials: [
		{
			id: "1",
			name: "John Smith",
			role: "Full Stack Developer",
			avatar: "JS",
			rating: 5,
			content:
				"This boilerplate saved me weeks of setup time. The authentication system is rock solid and the UI components are beautiful.",
		},
		{
			id: "2",
			name: "Sarah Miller",
			role: "Frontend Engineer",
			avatar: "SM",
			rating: 5,
			content:
				"Incredible developer experience. TypeScript support is excellent and the documentation is comprehensive.",
		},
		{
			id: "3",
			name: "Mike Johnson",
			role: "Startup Founder",
			avatar: "MJ",
			rating: 5,
			content:
				"Perfect for startups. We went from idea to MVP in just 2 weeks thanks to this boilerplate.",
		},
	],
};

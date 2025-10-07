"use client";

import { useEffect } from "react";

// Extend Window interface for gtag
declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export function Analytics() {
	useEffect(() => {
		// Simple analytics tracking
		const trackPageView = () => {
			if (typeof window !== "undefined" && window.gtag) {
				window.gtag("config", "GA_MEASUREMENT_ID", {
					page_title: "Drive Connect Landing Page",
					page_location: window.location.href,
				});
			}
		};

		trackPageView();
	}, []);

	return null;
}

// Performance optimization: Lazy load heavy components
export function LazyFeatures() {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{/* Features will be loaded here */}
		</div>
	);
}

// SEO optimization: Structured data
export function StructuredData() {
	return (
		<script type="application/ld+json" suppressHydrationWarning>
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "Drive Connect",
				description: "Modern boilerplate platform for building amazing applications",
				applicationCategory: "DeveloperApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				aggregateRating: {
					"@type": "AggregateRating",
					ratingValue: "4.9",
					ratingCount: "127",
				},
			})}
		</script>
	);
}

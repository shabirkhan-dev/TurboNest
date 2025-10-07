"use client";

import { useEffect, useState } from "react";

export function useAnalytics() {
	const [isLoaded, setIsLoaded] = useState(false);

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
		setIsLoaded(true);
	}, []);

	return { isLoaded };
}

export function useLandingPage() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate loading time
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return { isLoading };
}

export interface Testimonial {
	id: string;
	name: string;
	role: string;
	avatar: string;
	rating: number;
	content: string;
}

export interface Feature {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export interface LandingPageData {
	hero: {
		title: string;
		subtitle: string;
		description: string;
		ctaPrimary: string;
		ctaSecondary: string;
	};
	features: Feature[];
	testimonials: Testimonial[];
}

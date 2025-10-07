import { Badge } from "@rabtx/ui/components/badge";
import { Button } from "@rabtx/ui/components/button";
import { Card, CardContent } from "@rabtx/ui/components/card";
import { ArrowRight, CheckCircle, Sparkles, Zap } from "lucide-react";
import type { Metadata } from "next";
import {
	AnimatedTestimonialsDemo,
	FeatureCard,
	MobileNav,
	StructuredData,
} from "@/features/landing/components";
import { iconMap } from "@/features/landing/components/icon-map";
import { LANDING_CONSTANTS } from "@/features/landing/constants";
import { landingPageData } from "@/features/landing/services/landing-data";

export const metadata: Metadata = {
	title: "Drive Connect - Modern Boilerplate Platform",
	description:
		"Build amazing applications with our modern, scalable boilerplate. Get started with authentication, database, and beautiful UI components.",
};

export default function Page() {
	return (
		<>
			<StructuredData />
			<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
				{/* Navigation */}
				<nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="container mx-auto px-4 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
									<Sparkles className="h-5 w-5 text-primary-foreground" />
								</div>
								<span className="text-xl font-bold">Drive Connect</span>
							</div>
							<div className="hidden md:flex items-center space-x-6">
								<a
									href="/features"
									className="text-sm font-medium hover:text-primary transition-colors"
								>
									Features
								</a>
								<a
									href="/testimonials"
									className="text-sm font-medium hover:text-primary transition-colors"
								>
									Testimonials
								</a>
								<a
									href="/pricing"
									className="text-sm font-medium hover:text-primary transition-colors"
								>
									Pricing
								</a>
							</div>
							<div className="flex items-center space-x-4">
								<div className="hidden md:flex items-center space-x-4">
									<Button variant="ghost" size="sm">
										Sign In
									</Button>
									<Button size="sm">
										Get Started
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</div>
								<MobileNav />
							</div>
						</div>
					</div>
				</nav>

				{/* Hero Section */}
				<section className="container mx-auto px-4 py-20 text-center">
					<div className="max-w-4xl mx-auto">
						<Badge variant="secondary" className="mb-6">
							<Zap className="mr-1 h-3 w-3" />
							Now Available
						</Badge>
						<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
							{landingPageData.hero.title}
							<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
								{" "}
								{landingPageData.hero.subtitle}
							</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							{landingPageData.hero.description}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" className="text-lg px-8">
								{landingPageData.hero.ctaPrimary}
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
							<Button variant="outline" size="lg" className="text-lg px-8">
								{landingPageData.hero.ctaSecondary}
							</Button>
						</div>
						<div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
							<div className="flex items-center space-x-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span>Free forever</span>
							</div>
							<div className="flex items-center space-x-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span>No credit card</span>
							</div>
							<div className="flex items-center space-x-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span>5 min setup</span>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="container mx-auto px-4 py-20">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">{LANDING_CONSTANTS.FEATURES.TITLE}</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							{LANDING_CONSTANTS.FEATURES.SUBTITLE}
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{landingPageData.features.map((feature) => {
							const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
							return <FeatureCard key={feature.id} feature={feature} icon={IconComponent} />;
						})}
					</div>
				</section>

				{/* Testimonials Section */}
				<section className="bg-muted/30 py-20">
					<div className="container mx-auto px-4">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold mb-4">{LANDING_CONSTANTS.TESTIMONIALS.TITLE}</h2>
							<p className="text-xl text-muted-foreground">
								{LANDING_CONSTANTS.TESTIMONIALS.SUBTITLE}
							</p>
						</div>
						<AnimatedTestimonialsDemo />
					</div>
				</section>

				{/* CTA Section */}
				<section className="container mx-auto px-4 py-20">
					<Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
						<CardContent className="pt-12 pb-12 text-center">
							<div className="max-w-2xl mx-auto">
								<h2 className="text-4xl font-bold mb-4">{LANDING_CONSTANTS.CTA.TITLE}</h2>
								<p className="text-xl mb-8 opacity-90">{LANDING_CONSTANTS.CTA.SUBTITLE}</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Button size="lg" variant="secondary" className="text-lg px-8">
										{LANDING_CONSTANTS.CTA.CTA_PRIMARY}
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
									>
										{LANDING_CONSTANTS.CTA.CTA_SECONDARY}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>

				{/* Footer */}
				<footer className="border-t bg-background">
					<div className="container mx-auto px-4 py-12">
						<div className="grid md:grid-cols-4 gap-8">
							<div className="space-y-4">
								<div className="flex items-center space-x-2">
									<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
										<Sparkles className="h-5 w-5 text-primary-foreground" />
									</div>
									<span className="text-xl font-bold">Drive Connect</span>
								</div>
								<p className="text-sm text-muted-foreground">
									Building the future of web development, one boilerplate at a time.
								</p>
							</div>
							<div className="space-y-4">
								<h3 className="font-semibold">Product</h3>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a href="/features" className="hover:text-primary transition-colors">
											Features
										</a>
									</li>
									<li>
										<a href="/pricing" className="hover:text-primary transition-colors">
											Pricing
										</a>
									</li>
									<li>
										<a href="/docs" className="hover:text-primary transition-colors">
											Documentation
										</a>
									</li>
									<li>
										<a href="/changelog" className="hover:text-primary transition-colors">
											Changelog
										</a>
									</li>
								</ul>
							</div>
							<div className="space-y-4">
								<h3 className="font-semibold">Company</h3>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a href="/about" className="hover:text-primary transition-colors">
											About
										</a>
									</li>
									<li>
										<a href="/blog" className="hover:text-primary transition-colors">
											Blog
										</a>
									</li>
									<li>
										<a href="/careers" className="hover:text-primary transition-colors">
											Careers
										</a>
									</li>
									<li>
										<a href="/contact" className="hover:text-primary transition-colors">
											Contact
										</a>
									</li>
								</ul>
							</div>
							<div className="space-y-4">
								<h3 className="font-semibold">Support</h3>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a href="/help" className="hover:text-primary transition-colors">
											Help Center
										</a>
									</li>
									<li>
										<a href="/community" className="hover:text-primary transition-colors">
											Community
										</a>
									</li>
									<li>
										<a href="/status" className="hover:text-primary transition-colors">
											Status
										</a>
									</li>
									<li>
										<a href="/privacy" className="hover:text-primary transition-colors">
											Privacy
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
							<p className="text-sm text-muted-foreground">
								© 2024 Drive Connect. All rights reserved.
							</p>
							<div className="flex items-center space-x-4 mt-4 md:mt-0">
								<a
									href="/terms"
									className="text-sm text-muted-foreground hover:text-primary transition-colors"
								>
									Terms
								</a>
								<a
									href="/privacy"
									className="text-sm text-muted-foreground hover:text-primary transition-colors"
								>
									Privacy
								</a>
								<a
									href="/cookies"
									className="text-sm text-muted-foreground hover:text-primary transition-colors"
								>
									Cookies
								</a>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}

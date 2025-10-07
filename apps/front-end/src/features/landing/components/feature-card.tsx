import { Card, CardDescription, CardHeader, CardTitle } from "@rabtx/ui/components/card";
import type { Feature } from "../types";

interface FeatureCardProps {
	feature: Feature;
	icon: React.ComponentType<{ className?: string }>;
}

export function FeatureCard({ feature, icon: Icon }: FeatureCardProps) {
	return (
		<Card className="group hover:shadow-lg transition-all duration-300">
			<CardHeader>
				<div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
					<Icon className="h-6 w-6 text-primary" />
				</div>
				<CardTitle>{feature.title}</CardTitle>
				<CardDescription>{feature.description}</CardDescription>
			</CardHeader>
		</Card>
	);
}

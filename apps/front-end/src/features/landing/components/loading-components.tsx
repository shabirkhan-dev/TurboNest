import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@rabtx/ui/components/card";
import { Skeleton } from "@rabtx/ui/components/skeleton";
import { Suspense } from "react";

export function LoadingCard() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-12 w-12 rounded-lg mb-4" />
				<Skeleton className="h-6 w-3/4" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
			</CardHeader>
		</Card>
	);
}

export function FeaturesLoading() {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{[...Array(6)].map((_, i) => (
				<LoadingCard key={`loading-card-${i}`} />
			))}
		</div>
	);
}

export function TestimonialsLoading() {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{[...Array(3)].map((_, i) => (
				<Card key={`loading-testimonial-${i}`}>
					<CardContent className="pt-6">
						<div className="flex items-center space-x-1 mb-4">
							{[...Array(5)].map((_, j) => (
								<Skeleton key={`star-${i}-${j}`} className="h-4 w-4" />
							))}
						</div>
						<Skeleton className="h-4 w-full mb-2" />
						<Skeleton className="h-4 w-3/4 mb-4" />
						<div className="flex items-center space-x-3">
							<Skeleton className="h-10 w-10 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-3 w-32" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

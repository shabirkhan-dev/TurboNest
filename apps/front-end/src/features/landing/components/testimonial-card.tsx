import { Card, CardContent } from "@rabtx/ui/components/card";
import { Star } from "lucide-react";
import type { Testimonial } from "../types";

interface TestimonialCardProps {
	testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="flex items-center space-x-1 mb-4">
					{Array.from({ length: testimonial.rating }, (_, i) => (
						<Star
							key={`star-${testimonial.id}-${i}`}
							className="h-4 w-4 fill-yellow-400 text-yellow-400"
						/>
					))}
				</div>
				<p className="text-muted-foreground mb-4">{testimonial.content}</p>
				<div className="flex items-center space-x-3">
					<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
						<span className="text-sm font-medium">{testimonial.avatar}</span>
					</div>
					<div>
						<p className="font-medium">{testimonial.name}</p>
						<p className="text-sm text-muted-foreground">{testimonial.role}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

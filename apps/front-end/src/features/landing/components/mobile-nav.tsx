"use client";

import { Button } from "@rabtx/ui/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@rabtx/ui/components/sheet";
import { ArrowRight, Menu, Sparkles } from "lucide-react";
import { useState } from "react";

export function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-[300px] sm:w-[400px]">
				<div className="flex flex-col space-y-6 mt-6">
					<div className="flex items-center space-x-2">
						<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
							<Sparkles className="h-5 w-5 text-primary-foreground" />
						</div>
						<span className="text-xl font-bold">Drive Connect</span>
					</div>
					<nav className="flex flex-col space-y-4">
						<a
							href="/features"
							className="text-sm font-medium hover:text-primary transition-colors"
							onClick={() => setOpen(false)}
						>
							Features
						</a>
						<a
							href="/testimonials"
							className="text-sm font-medium hover:text-primary transition-colors"
							onClick={() => setOpen(false)}
						>
							Testimonials
						</a>
						<a
							href="/pricing"
							className="text-sm font-medium hover:text-primary transition-colors"
							onClick={() => setOpen(false)}
						>
							Pricing
						</a>
					</nav>
					<div className="flex flex-col space-y-3 pt-6 border-t">
						<Button variant="ghost" size="sm" className="justify-start">
							Sign In
						</Button>
						<Button size="sm" className="justify-start">
							Get Started
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

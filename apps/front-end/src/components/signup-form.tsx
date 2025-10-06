import { Button } from "@rabtx/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@rabtx/ui/components/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@rabtx/ui/components/field";
import { Input } from "@rabtx/ui/components/input";
import { cn } from "@rabtx/ui/lib/utils";
import { useId } from "react";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create your account</CardTitle>
					<CardDescription>Enter your email below to create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Full Name</FieldLabel>
								<Input id={useId()} type="text" placeholder="John Doe" required />
							</Field>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input id={useId()} type="email" placeholder="m@example.com" required />
							</Field>
							<Field>
								<Field className="grid grid-cols-2 gap-4">
									<Field>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Input id={useId()} type="password" required />
									</Field>
									<Field>
										<FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
										<Input id={useId()} type="password" required />
									</Field>
								</Field>
								<FieldDescription>Must be at least 8 characters long.</FieldDescription>
							</Field>
							<Field>
								<Button type="submit">Create Account</Button>
								<FieldDescription className="text-center">
									Already have an account? <a href="/">Sign in</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="/">Terms of Service</a> and{" "}
				<a href="/">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}

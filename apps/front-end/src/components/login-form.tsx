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

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input id="email" type="email" placeholder="m@example.com" required />
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<a
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input id="password" type="password" required />
							</Field>
							<Field>
								<Button type="submit">Login</Button>
								<Button variant="outline" type="button">
									Login with Google
								</Button>
								<FieldDescription className="text-center">
									Don&apos;t have an account? <a href="/signup">Sign up</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

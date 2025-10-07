import { describe, expect, test } from "vitest";
import { LoginForm } from "@/features/auth/components";
import { render, screen } from "../../../../utils/test-utils";
import "@testing-library/jest-dom";

describe("LoginForm Component", () => {
	test("renders login form", () => {
		render(<LoginForm />);

		expect(screen.getByText("Welcome back")).toBeInTheDocument();
		expect(screen.getByText("Login with your Apple or Google account")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /^login$/i })).toBeInTheDocument();
	});

	test("renders social login buttons", () => {
		render(<LoginForm />);

		expect(screen.getByRole("button", { name: /login with apple/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /login with google/i })).toBeInTheDocument();
	});

	test("renders form fields", () => {
		render(<LoginForm />);

		expect(screen.getByPlaceholderText("m@example.com")).toBeInTheDocument();
		expect(screen.getAllByDisplayValue("")).toHaveLength(2); // Both email and password fields
	});

	test("renders form links", () => {
		render(<LoginForm />);

		expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
		expect(screen.getByText("Sign up")).toBeInTheDocument();
		expect(screen.getByText("Terms of Service")).toBeInTheDocument();
		expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
	});

	test("has proper form structure", () => {
		render(<LoginForm />);

		const emailInput = screen.getByPlaceholderText("m@example.com");
		const passwordInputs = screen.getAllByDisplayValue("");
		const passwordInput = passwordInputs.find((input) => input.getAttribute("type") === "password");
		const submitButton = screen.getByRole("button", { name: /^login$/i });

		expect(emailInput).toHaveAttribute("type", "email");
		expect(passwordInput).toHaveAttribute("type", "password");
		expect(submitButton).toHaveAttribute("type", "submit");
		expect(emailInput).toHaveAttribute("required");
		expect(passwordInput).toHaveAttribute("required");
	});

	test("has proper accessibility attributes", () => {
		render(<LoginForm />);

		const emailInput = screen.getByPlaceholderText("m@example.com");
		const passwordInputs = screen.getAllByDisplayValue("");
		const passwordInput = passwordInputs.find((input) => input.getAttribute("type") === "password");

		expect(emailInput).toHaveAttribute("type", "email");
		expect(passwordInput).toHaveAttribute("type", "password");
		expect(emailInput).toHaveAttribute("required");
		expect(passwordInput).toHaveAttribute("required");
	});
});

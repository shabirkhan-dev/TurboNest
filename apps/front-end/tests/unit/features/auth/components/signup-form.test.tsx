import { beforeEach, describe, expect, test, vi } from "vitest";
import { SignupForm } from "@/features/auth/components";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { fireEvent, render, screen, waitFor } from "../../../../utils/test-utils";

// Mock the useAuth hook
vi.mock("@/features/auth/hooks/use-auth", () => ({
	useAuth: vi.fn(),
}));

const mockUseAuth = vi.mocked(useAuth);

describe("SignupForm Component", () => {
	const mockSignup = vi.fn();

	beforeEach(() => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: false,
			error: null,
			login: vi.fn(),
			signup: mockSignup,
			logout: vi.fn(),
			sendOTP: vi.fn(),
			verifyOTP: vi.fn(),
			isAuthenticated: false,
		});
		vi.clearAllMocks();
	});

	test("renders signup form fields", () => {
		render(<SignupForm />);

		expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
	});

	test("validates required fields", async () => {
		render(<SignupForm />);

		const submitButton = screen.getByRole("button", { name: /sign up/i });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/name is required/i)).toBeInTheDocument();
			expect(screen.getByText(/email is required/i)).toBeInTheDocument();
			expect(screen.getByText(/password is required/i)).toBeInTheDocument();
			expect(screen.getByText(/confirm password is required/i)).toBeInTheDocument();
		});
	});

	test("validates password confirmation", async () => {
		render(<SignupForm />);

		const passwordInput = screen.getByLabelText(/password/i);
		const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button", { name: /sign up/i });

		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.change(confirmPasswordInput, { target: { value: "different123" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
		});
	});

	test("validates password strength", async () => {
		render(<SignupForm />);

		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: /sign up/i });

		fireEvent.change(passwordInput, { target: { value: "123" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
		});
	});

	test("submits form with valid data", async () => {
		render(<SignupForm />);

		const nameInput = screen.getByLabelText(/name/i);
		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button", { name: /sign up/i });

		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		fireEvent.change(emailInput, { target: { value: "john@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockSignup).toHaveBeenCalledWith({
				name: "John Doe",
				email: "john@example.com",
				password: "password123",
				confirmPassword: "password123",
			});
		});
	});

	test("shows loading state during submission", () => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: true,
			error: null,
			login: vi.fn(),
			signup: mockSignup,
			logout: vi.fn(),
			sendOTP: vi.fn(),
			verifyOTP: vi.fn(),
			isAuthenticated: false,
		});

		render(<SignupForm />);

		const submitButton = screen.getByRole("button", { name: /sign up/i });
		expect(submitButton).toBeDisabled();
	});

	test("displays error message", () => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: false,
			error: "Email already exists",
			login: vi.fn(),
			signup: mockSignup,
			logout: vi.fn(),
			sendOTP: vi.fn(),
			verifyOTP: vi.fn(),
			isAuthenticated: false,
		});

		render(<SignupForm />);

		expect(screen.getByText("Email already exists")).toBeInTheDocument();
	});
});

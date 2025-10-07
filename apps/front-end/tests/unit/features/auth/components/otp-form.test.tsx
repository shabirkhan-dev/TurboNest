import { beforeEach, describe, expect, test, vi } from "vitest";
import { OTPForm } from "@/features/auth/components";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { fireEvent, render, screen, waitFor } from "../../../utils/test-utils";

// Mock the useAuth hook
vi.mock("@/features/auth/hooks/use-auth", () => ({
	useAuth: vi.fn(),
}));

const mockUseAuth = vi.mocked(useAuth);

describe("OTPForm Component", () => {
	const mockVerifyOTP = vi.fn();
	const mockSendOTP = vi.fn();

	beforeEach(() => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: false,
			error: null,
			login: vi.fn(),
			signup: vi.fn(),
			logout: vi.fn(),
			sendOTP: mockSendOTP,
			verifyOTP: mockVerifyOTP,
			isAuthenticated: false,
		});
		vi.clearAllMocks();
	});

	test("renders OTP form fields", () => {
		render(<OTPForm />);

		expect(screen.getByLabelText(/verification code/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /resend code/i })).toBeInTheDocument();
	});

	test("validates OTP length", async () => {
		render(<OTPForm />);

		const otpInput = screen.getByLabelText(/verification code/i);
		const submitButton = screen.getByRole("button", { name: /verify/i });

		fireEvent.change(otpInput, { target: { value: "123" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/verification code must be 6 digits/i)).toBeInTheDocument();
		});
	});

	test("validates OTP format", async () => {
		render(<OTPForm />);

		const otpInput = screen.getByLabelText(/verification code/i);
		const submitButton = screen.getByRole("button", { name: /verify/i });

		fireEvent.change(otpInput, { target: { value: "123abc" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/verification code must contain only numbers/i)).toBeInTheDocument();
		});
	});

	test("submits form with valid OTP", async () => {
		render(<OTPForm />);

		const otpInput = screen.getByLabelText(/verification code/i);
		const submitButton = screen.getByRole("button", { name: /verify/i });

		fireEvent.change(otpInput, { target: { value: "123456" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockVerifyOTP).toHaveBeenCalledWith({
				code: "123456",
				email: "test@example.com",
			});
		});
	});

	test("resends OTP", async () => {
		render(<OTPForm />);

		const resendButton = screen.getByRole("button", { name: /resend code/i });
		fireEvent.click(resendButton);

		await waitFor(() => {
			expect(mockSendOTP).toHaveBeenCalledWith("test@example.com");
		});
	});

	test("shows loading state during verification", () => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: true,
			error: null,
			login: vi.fn(),
			signup: vi.fn(),
			logout: vi.fn(),
			sendOTP: mockSendOTP,
			verifyOTP: mockVerifyOTP,
			isAuthenticated: false,
		});

		render(<OTPForm />);

		const submitButton = screen.getByRole("button", { name: /verify/i });
		expect(submitButton).toBeDisabled();
	});

	test("displays error message", () => {
		mockUseAuth.mockReturnValue({
			user: null,
			isLoading: false,
			error: "Invalid verification code",
			login: vi.fn(),
			signup: vi.fn(),
			logout: vi.fn(),
			sendOTP: mockSendOTP,
			verifyOTP: mockVerifyOTP,
			isAuthenticated: false,
		});

		render(<OTPForm />);

		expect(screen.getByText("Invalid verification code")).toBeInTheDocument();
	});

	test("has proper accessibility attributes", () => {
		render(<OTPForm />);

		const otpInput = screen.getByLabelText(/verification code/i);
		expect(otpInput).toHaveAttribute("type", "text");
		expect(otpInput).toHaveAttribute("required");
		expect(otpInput).toHaveAttribute("maxLength", "6");
	});
});

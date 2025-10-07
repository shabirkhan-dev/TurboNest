# Testing Guide

This document provides a comprehensive guide to testing in our frontend application using Vitest for unit/integration tests and Playwright for E2E tests.

## Test Structure

```
tests/
├── unit/                    # Unit and integration tests (Vitest)
│   ├── shared/             # Tests for shared utilities
│   ├── features/           # Tests for feature-specific code
│   │   ├── auth/           # Authentication tests
│   │   ├── dashboard/      # Dashboard tests
│   │   └── landing/       # Landing page tests
│   └── utils/              # Test utilities
├── e2e/                    # End-to-end tests (Playwright)
│   ├── landing-page.spec.ts
│   ├── auth-flow.spec.ts
│   └── dashboard.spec.ts
├── fixtures/               # Test fixtures and mocks
├── utils/                  # Test utilities and helpers
└── screenshots/            # E2E test screenshots
```

## Running Tests

### Unit Tests (Vitest)
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test tests/unit/features/auth/hooks/use-auth.test.tsx
```

### E2E Tests (Playwright)
```bash
# Run all E2E tests
npm run test:e2e

# Run tests in headed mode
npm run test:e2e:headed

# Run specific test file
npm run test:e2e tests/e2e/auth-flow.spec.ts

# Run tests for specific browser
npm run test:e2e -- --project=chromium

# Generate test report
npm run test:e2e:report
```

## Test Types

### 1. Unit Tests
Test individual components, hooks, and utilities in isolation.

**Example: Component Test**
```typescript
import { render, screen, fireEvent } from "../utils/test-utils";
import { FeatureCard } from "@/features/landing/components";

test("renders feature title and description", () => {
  render(<FeatureCard feature={mockFeature} icon={Shield} />);
  
  expect(screen.getByText("Test Feature")).toBeInTheDocument();
  expect(screen.getByText("Description")).toBeInTheDocument();
});
```

**Example: Hook Test**
```typescript
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "@/features/auth/hooks/use-auth";

test("should login successfully", async () => {
  const { result } = renderHook(() => useAuth());
  
  await act(async () => {
    await result.current.login({ email: "test@example.com", password: "password" });
  });
  
  expect(result.current.user).toBeTruthy();
  expect(result.current.isAuthenticated).toBe(true);
});
```

### 2. Integration Tests
Test how different parts of the application work together.

**Example: Service Integration Test**
```typescript
import { authService } from "@/features/auth/services/auth-service";

test("should handle complete auth flow", async () => {
  // Test signup
  const signupResponse = await authService.signup(mockSignupData);
  expect(signupResponse.user).toBeTruthy();
  
  // Test login
  const loginResponse = await authService.login(mockLoginData);
  expect(loginResponse.token).toBeTruthy();
  
  // Test logout
  await authService.logout();
  expect(localStorage.getItem("auth_token")).toBeNull();
});
```

### 3. E2E Tests
Test complete user workflows from the user's perspective.

**Example: Authentication Flow**
```typescript
import { test, expect } from "@playwright/test";

test("should complete login flow", async ({ page }) => {
  await page.goto("/login");
  
  await page.fill('[name="email"]', "test@example.com");
  await page.fill('[name="password"]', "password123");
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByText("Welcome")).toBeVisible();
});
```

## Test Utilities

### Test Utils (`tests/utils/test-utils.tsx`)
- Custom render function with providers
- Mock data factories
- Mock fetch responses
- LocalStorage mocking
- Cleanup utilities

### Playwright Helpers (`tests/utils/playwright-helpers.ts`)
- API mocking utilities
- Form filling helpers
- Viewport management
- Screenshot utilities
- Element waiting helpers

### Fixtures (`tests/fixtures/`)
- Authentication state fixtures
- Mock data fixtures
- Browser state fixtures

## Best Practices

### 1. Test Organization
- Group related tests using `describe` blocks
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

### 2. Mocking
- Mock external dependencies
- Use realistic mock data
- Clean up mocks between tests

### 3. Accessibility Testing
- Test keyboard navigation
- Verify ARIA attributes
- Check color contrast
- Test screen reader compatibility

### 4. Performance Testing
- Test loading states
- Verify lazy loading
- Check bundle size impact

### 5. Error Handling
- Test error states
- Verify error messages
- Test fallback behaviors

## Coverage Goals

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## Continuous Integration

Tests run automatically on:
- Pull requests
- Main branch pushes
- Scheduled runs

## Debugging Tests

### Unit Tests
```bash
# Run with debug output
npm run test -- --reporter=verbose

# Run specific test with debug
npm run test -- --grep "should login successfully"
```

### E2E Tests
```bash
# Run in headed mode for debugging
npm run test:e2e:headed

# Run with trace
npm run test:e2e -- --trace=on

# Run with video recording
npm run test:e2e -- --video=on
```

## Common Issues and Solutions

### 1. Async Operations
Always use `await` and `waitFor` for async operations:
```typescript
await waitFor(() => {
  expect(screen.getByText("Loading complete")).toBeInTheDocument();
});
```

### 2. Mock Cleanup
Always clean up mocks between tests:
```typescript
beforeEach(() => {
  vi.clearAllMocks();
});
```

### 3. Element Selection
Use accessible selectors when possible:
```typescript
// Good
screen.getByRole("button", { name: /submit/i })

// Avoid
screen.getByTestId("submit-btn")
```

### 4. Timeouts
Set appropriate timeouts for different operations:
```typescript
await page.waitForSelector(".loading", { timeout: 10000 });
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

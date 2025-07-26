# Testing with Playwright

This project uses Playwright for end-to-end testing with a comprehensive setup that works with our Turbo repo structure.

## Quick Start

### Run all tests
```bash
bun run test:e2e
```

### Run tests with UI
```bash
bun run test:e2e:ui
```

### Run tests in debug mode
```bash
bun run test:e2e:debug
```

### View test reports
```bash
bun run test:e2e:report
```

## Test Structure

```
tests/
├── example.spec.ts          # Basic example tests
├── drive-connect.spec.ts    # Drive Connect specific tests
└── README.md               # This file
```

## Configuration

The Playwright configuration is set up in `playwright.config.ts` with the following features:

- **Multiple browsers**: Chrome, Firefox, Safari, and mobile devices
- **Parallel execution**: Tests run in parallel for faster execution
- **Retry logic**: Failed tests are retried in CI environments
- **Screenshots & videos**: Captured on test failures
- **HTML reports**: Comprehensive test reports
- **CI integration**: Ready for GitHub Actions

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test('should do something', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Drive Connect/);
});
```

### Best Practices

1. **Use descriptive test names**: Make test names clear about what they're testing
2. **Group related tests**: Use `test.describe()` to organize related tests
3. **Use constants for patterns**: Define regex patterns at the top level for performance
4. **Test accessibility**: Use semantic selectors like `getByRole()` and `getByLabel()`
5. **Handle async operations**: Always await page interactions and assertions

### Example Test Patterns

```typescript
// Test page navigation
test('should navigate to login page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /login/i }).click();
  await expect(page).toHaveURL(/.*login/);
});

// Test form interactions
test('should submit login form', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL('/dashboard');
});

// Test responsive design
test('should work on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page.getByRole('navigation')).toBeVisible();
});
```

## CI/CD Integration

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

- Runs tests on push to main/develop branches
- Runs tests on pull requests
- Uploads test artifacts (reports, screenshots, videos)
- Uses Bun for fast dependency installation

## Debugging Tests

### Debug Mode
```bash
bun run test:e2e:debug
```

### UI Mode
```bash
bun run test:e2e:ui
```

### Trace Viewer
After running tests, you can view traces:
```bash
bunx playwright show-trace test-results/trace.zip
```

## Test Data Management

For tests that require specific data:

1. Use fixtures for reusable test data
2. Clean up data after tests
3. Use isolated test databases when possible

## Performance Testing

The configuration includes performance monitoring:

- Test timeouts are set to 30 seconds
- Expect timeouts are set to 5 seconds
- Web server startup timeout is 120 seconds

## Browser Support

Tests run against:
- Chrome (Chromium)
- Firefox
- Safari (WebKit)
- Mobile Chrome
- Mobile Safari

## Reporting

Test reports are generated in multiple formats:
- HTML reports (default)
- JSON reports
- JUnit XML reports

Reports are saved to:
- `playwright-report/` (HTML)
- `test-results/` (JSON, JUnit, traces, screenshots, videos) 
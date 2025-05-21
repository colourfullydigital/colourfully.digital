# Testing Documentation

This directory contains the test suite for the Colourfully Digital website. We use a comprehensive testing approach that includes unit tests, integration tests, and end-to-end tests.

## Test Structure

```
tests/
├── e2e/                  # End-to-end tests with Playwright
├── integration/          # Integration tests with Vitest
├── unit/                 # Unit tests with Vitest
├── utils/               # Test utilities and helpers
├── setup.ts             # Global test setup
└── README.md            # This documentation
```

## Testing Tools

- **Vitest**: Our primary test runner for unit and integration tests
  - Fast execution and watch mode
  - Built-in coverage reporting with c8
  - Compatible with Jest expect syntax
  - UI mode for test debugging

- **Testing Library**: Component testing with a user-centric approach
  - Encourages testing user interactions
  - Built-in queries and assertions
  - Custom render utilities

- **Playwright**: End-to-end testing
  - Multi-browser testing
  - Network request mocking
  - Visual regression testing capabilities
  - CI/CD integration

- **c8**: Code coverage reporting
  - Statement, branch, and function coverage
  - HTML and LCOV reports
  - Coverage thresholds enforcement

## Running Tests

```bash
# Run all tests
pnpm test

# Run unit tests
pnpm test:unit

# Run integration tests
pnpm test:integration

# Run end-to-end tests
pnpm test:e2e

# Generate coverage report
pnpm test:coverage

# Run tests with UI
pnpm test:ui

# Run tests in watch mode
pnpm test:watch
```

## Writing Tests

### Unit Tests

Unit tests should be placed in the `unit/` directory and follow the naming convention `*.test.ts`.

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';

describe('Component or Utility Name', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = someFunction(input);
    
    // Assert
    expect(result).toBe('expected output');
  });
});
```

### Integration Tests

Integration tests should be placed in the `integration/` directory and focus on testing feature workflows.

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';

describe('Feature Workflow', () => {
  it('should complete the workflow successfully', async () => {
    // Arrange
    render(<FeatureComponent />);
    
    // Act
    await userEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

### End-to-End Tests

E2E tests should be placed in the `e2e/` directory and use Playwright to test complete user journeys.

```typescript
import { test, expect } from '@playwright/test';

test('user completes critical journey', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Start Journey');
  await expect(page.locator('text=Journey Complete')).toBeVisible();
});
```

## Test Utilities

We provide several test utilities to make testing easier:

```typescript
// Import from test-utils
import { 
  render, 
  createMockApiResponse, 
  createErrorResponse 
} from '../utils/test-utils';

// Custom render with user-event setup
const { user } = render(<MyComponent />);

// Mock API responses
const mockData = createMockApiResponse({ success: true });
const errorResponse = createErrorResponse(404, 'Not Found');
```

## Code Coverage

We use c8 for code coverage reporting. The coverage report can be generated with:

```bash
pnpm test:coverage
```

Coverage thresholds are set to:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

The report will be available in the `coverage/` directory.

## Best Practices

1. Follow the AAA pattern (Arrange, Act, Assert)
2. Test behavior, not implementation
3. Keep tests focused and isolated
4. Use meaningful test descriptions
5. Avoid test interdependence
6. Maintain test coverage for new features
7. Mock external dependencies appropriately
8. Use data-testid attributes sparingly
9. Prefer role-based queries
10. Write tests that resemble user behavior

## Continuous Integration

Tests are automatically run in CI for:
- Pull requests to main branch
- Pushes to main branch

The CI workflow:
1. Installs dependencies
2. Runs linting and type checking
3. Executes all test suites
4. Generates and checks coverage reports
5. Publishes test results

See the CI workflow in `.github/workflows/ci.yml` for details.

## Debugging Tests

1. Use UI mode for interactive debugging:
   ```bash
   pnpm test:ui
   ```

2. Use the debug option in Playwright:
   ```typescript
   await page.pause(); // Opens Playwright inspector
   ```

3. Use browser developer tools in debug mode:
   ```bash
   PWDEBUG=1 pnpm test:e2e
   ```

## Contributing

1. Write tests for new features
2. Update tests when modifying existing features
3. Ensure all tests pass locally before pushing
4. Maintain or improve code coverage
5. Follow existing test patterns and conventions
# Jasmine + Karma Test Setup

This document explains the Jasmine + Karma test configuration for the fullstack2-react project.

## What Changed

The project has been configured to run tests using **Jasmine** (testing framework) and **Karma** (test runner) instead of Jest.

### Key Changes:

1. **New Configuration File**: `karma.conf.js` - Configures Karma to run Jasmine tests
2. **Converted Test File**: `src/__tests__/app.spec.js` - Converted from Jest to Jasmine syntax
3. **Updated Dependencies**: Added Jasmine, Karma, and related packages to `package.json`
4. **New Test Scripts**: Added `test:karma` and `test:karma:single` commands

## Installation

To install all the necessary dependencies for Jasmine + Karma testing, run:

```bash
npm install
```

This will install:
- `jasmine-core` - The Jasmine testing framework
- `karma` - The test runner
- `karma-jasmine` - Karma adapter for Jasmine
- `karma-chrome-launcher` - Launches Chrome for testing
- `karma-jasmine-html-reporter` - HTML reporter for test results
- `karma-webpack` - Webpack integration for Karma
- `karma-sourcemap-loader` - Source map support
- Babel and webpack loaders for JSX/React support

## Running Tests

### Option 1: Watch Mode (Recommended for Development)
Run tests in watch mode, which will automatically rerun tests when files change:

```bash
npm run test:karma
```

This will:
- Open Chrome browser
- Display test results in the browser and terminal
- Watch for file changes and rerun tests automatically
- Keep running until you stop it (Ctrl+C)

### Option 2: Single Run (CI/CD)
Run tests once and exit (useful for CI/CD pipelines):

```bash
npm run test:karma:single
```

### Option 3: Original Jest Tests
The original Jest test setup still works with:

```bash
npm test
```

## Test File Naming Convention

- **Jasmine/Karma tests**: Use `.spec.js` extension (e.g., `app.spec.js`)
- **Jest tests**: Use `.test.js` extension (e.g., `App.test.js`)

The Karma configuration is set to only run `.spec.js` files and exclude `.test.js` files.

## Key Differences from Jest

### Test Structure
```javascript
// Jest
test('description', () => { ... });

// Jasmine
it('description', () => { ... });
```

### Test Suites
```javascript
// Both use describe blocks
describe('Component Tests', () => {
  it('test case', () => { ... });
});
```

### Mocking
```javascript
// Jest
jest.fn()
const spy = jest.fn(() => true);

// Jasmine
jasmine.createSpy()
const spy = jasmine.createSpy('name').and.returnValue(true);
```

### Custom Matchers
The `toBeInTheDocument()` matcher has been implemented as a custom Jasmine matcher in the test file.

## Karma Configuration

The `karma.conf.js` file includes:
- **Framework**: Jasmine
- **Browser**: Chrome
- **Preprocessors**: Webpack and sourcemap
- **Reporters**: Progress and HTML (kjhtml)
- **Port**: 9876
- **Auto-watch**: Enabled by default

## Browser Requirements

You need **Google Chrome** installed to run the tests. Karma will automatically launch Chrome when running tests.

If you want to use a different browser, you can:
1. Install the appropriate karma launcher (e.g., `karma-firefox-launcher`)
2. Update `browsers` array in `karma.conf.js`

## Troubleshooting

### Chrome doesn't launch
- Make sure Chrome is installed
- Check that Chrome is in your system PATH
- Try running with `--browsers ChromeHeadless` for headless mode

### Tests fail with module errors
- Run `npm install` to ensure all dependencies are installed
- Check that webpack loaders are properly configured in `karma.conf.js`

### Port already in use
- Change the `port` setting in `karma.conf.js` to a different value
- Or stop the process using port 9876

## File Structure

```
fullstack2-react/
├── karma.conf.js              # Karma configuration
├── src/
│   └── __tests__/
│       └── app.spec.js        # Jasmine test file
└── package.json               # Updated with Karma dependencies
```

## Next Steps

To add more tests:
1. Create new `.spec.js` files in the `src/__tests__/` directory
2. Use Jasmine syntax (`describe`, `it`, `expect`)
3. Tests will automatically be discovered and run by Karma

## Resources

- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)
- [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)

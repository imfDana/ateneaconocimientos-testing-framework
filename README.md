# Atenea Conocimientos – Testing Framework

Automated end-to-end (E2E) testing framework for the [Atenea Conocimientos](https://ateneaconocimientos.com/) platform, built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** pattern.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Dependencies](#dependencies)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Environment Configuration](#environment-configuration)
8. [Running the Tests](#running-the-tests)
9. [Available Scripts](#available-scripts)
10. [Test Architecture](#test-architecture)
    - [Page Objects](#page-objects)
    - [Test Specs](#test-specs)
    - [Utilities / Helpers](#utilities--helpers)
11. [Playwright Configuration](#playwright-configuration)
12. [Code Quality Tools](#code-quality-tools)
    - [ESLint](#eslint)
    - [Prettier](#prettier)
    - [Husky Git Hooks](#husky-git-hooks)
13. [CI/CD with GitHub Actions](#cicd-with-github-actions)
14. [HTML Test Report](#html-test-report)
15. [Path Aliases](#path-aliases)
16. [Contributing](#contributing)

---

## Overview

This repository contains the automated E2E test suite for the Atenea Conocimientos web application. The framework validates critical user flows — beginning with student registration — and is designed to be scalable, maintainable, and CI-ready.

**Key characteristics:**

- **Pattern:** Page Object Model (POM) — UI logic is fully decoupled from test assertions.
- **Language:** TypeScript with strict mode enabled.
- **Environments:** Multi-environment support (`qa`, extensible to `staging`, `prod`) via `.env` files.
- **CI:** Automated test execution on every push/pull request to `main`/`master` via GitHub Actions.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev/) | ^1.58.2 | E2E browser automation |
| [TypeScript](https://www.typescriptlang.org/) | ^5.9.3 | Typed language for test authoring |
| [Node.js](https://nodejs.org/) | LTS (≥18) | Runtime environment |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.3.1 | Environment variable loading |
| [cross-env](https://github.com/kentcdodds/cross-env) | ^10.1.0 | Cross-platform env variable injection |
| [ESLint](https://eslint.org/) | ^10.0.3 | Static code analysis |
| [Prettier](https://prettier.io/) | ^3.8.1 | Code formatting |
| [Husky](https://typicode.github.io/husky/) | ^9.1.7 | Git hook automation |

---

## Dependencies

> This project has **no runtime dependencies**. All packages are `devDependencies` installed locally for development, testing, and CI purposes only.

Install everything with:

```bash
npm install
```

### Testing

| Package | Version | Role |
|---|---|---|
| [`@playwright/test`](https://playwright.dev/) | `^1.58.2` | Core E2E testing framework — provides the test runner, browser automation APIs, assertions, and the HTML reporter |

### TypeScript

| Package | Version | Role |
|---|---|---|
| [`typescript`](https://www.typescriptlang.org/) | `^5.9.3` | TypeScript compiler — transpiles `.ts` files and enforces strict typing |
| [`@types/node`](https://www.npmjs.com/package/@types/node) | `^25.3.5` | Type definitions for Node.js built-in modules (e.g. `fs`, `path`, `process`) used in the Playwright config |

### Linting (ESLint)

| Package | Version | Role |
|---|---|---|
| [`eslint`](https://eslint.org/) | `^10.0.3` | Core ESLint engine — runs the linting checks |
| [`@eslint/js`](https://www.npmjs.com/package/@eslint/js) | `^10.0.1` | Official ESLint JavaScript recommended rule set |
| [`typescript-eslint`](https://typescript-eslint.io/) | `^8.56.1` | Meta-package that bundles the TypeScript ESLint parser and plugin together |
| [`@typescript-eslint/parser`](https://typescript-eslint.io/packages/parser/) | `^8.56.1` | Allows ESLint to parse TypeScript syntax |
| [`@typescript-eslint/eslint-plugin`](https://typescript-eslint.io/packages/eslint-plugin/) | `^8.56.1` | TypeScript-specific ESLint rules (e.g. no-floating-promises, no-unused-vars) |
| [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) | `^10.1.8` | Disables ESLint rules that would conflict with Prettier formatting |
| [`globals`](https://www.npmjs.com/package/globals) | `^17.4.0` | Provides global variable definitions (e.g. Node.js, browser) for ESLint environment configuration |

### Formatting

| Package | Version | Role |
|---|---|---|
| [`prettier`](https://prettier.io/) | `^3.8.1` | Opinionated code formatter — enforces consistent style across all `.ts`, `.js`, `.json`, and `.md` files |

### Utilities

| Package | Version | Role |
|---|---|---|
| [`dotenv`](https://github.com/motdotla/dotenv) | `^17.3.1` | Loads environment variables from `.env` files into `process.env` |
| [`cross-env`](https://github.com/kentcdodds/cross-env) | `^10.1.0` | Sets environment variables (`TEST_ENV`) in a cross-platform way (Windows + Unix) |
| [`husky`](https://typicode.github.io/husky/) | `^9.1.7` | Manages Git hooks (`pre-commit`, `pre-push`) to enforce quality gates before commits and pushes |

---

## Project Structure

```
ateneaconocimientos-testing-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI workflow
├── .husky/
│   ├── pre-commit                # Runs lint + format check before each commit
│   └── pre-push                  # Runs typecheck + tests before each push
├── pages/                        # Page Object Model classes
│   ├── homePage.ts               # Home page interactions
│   ├── registerPage.ts           # Registration page interactions
│   └── emailConfirmationModal.ts # Email confirmation modal (in progress)
├── tests/                        # Test specification files
│   └── register.spec.ts          # TC-03: Student Registration flow
├── utils/                        # Shared helper utilities
│   └── helpers.ts                # Reusable assertions and API response checks
├── .env                          # Local environment variables (git-ignored)
├── .env.example                  # Template for creating your own .env
├── .env.qa                       # QA environment variables
├── .prettierrc.json              # Prettier formatting rules
├── eslint.config.js              # ESLint configuration
├── playwright.config.ts          # Playwright test configuration
├── tsconfig.json                 # TypeScript compiler configuration
└── package.json                  # NPM scripts and dependencies
```

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

- **Node.js** LTS (v18 or newer) → [Download](https://nodejs.org/)
- **npm** (bundled with Node.js)
- **Git** → [Download](https://git-scm.com/)

Verify your installation:

```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
git --version
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/imfDana/ateneaconocimientos-testing-framework.git
cd ateneaconocimientos-testing-framework
```

### 2. Install Node.js dependencies

```bash
npm install
```

> This also runs `husky install` automatically (via the `prepare` script) to set up Git hooks.

### 3. Install Playwright browsers

```bash
npx playwright install
```

To also install the required OS-level browser dependencies (recommended for Linux/CI):

```bash
npx playwright install --with-deps
```

---

## Environment Configuration

The framework uses `.env` files to manage environment-specific settings. The environment is selected via the `TEST_ENV` variable.

### Available environment files

| File | Environment | Notes |
|---|---|---|
| `.env.example` | Template | Copy this to create your own `.env` |
| `.env.qa` | QA | Points to `https://qa.ateneaconocimientos.com/` |
| `.env` | Local / default | Git-ignored; created by the developer |

### Setup for local development

```bash
# Copy the template
cp .env.example .env

# Then open .env and set your base URL:
# BASE_URL=https://qa.ateneaconocimientos.com/
```

### Environment file format

```env
BASE_URL=https://qa.ateneaconocimientos.com/
```

### How environment resolution works

The `playwright.config.ts` automatically resolves the correct `.env` file using the following priority:

1. `.env.<TEST_ENV>` (absolute path resolution)
2. `.env.<TEST_ENV>` (relative path)
3. `.env` (fallback)

If no file is found, `BASE_URL` defaults to `http://localhost:3000`.

---

## Running the Tests

### Run all tests (default environment)

```bash
npm test
```

### Run all tests against the QA environment

```bash
npm run test:qa
```

> This sets `TEST_ENV=qa` and loads `.env.qa` automatically.

### Run tests with a visible browser (headed mode)

```bash
npm run test:headed
```

### Run tests with minimal CI-style output

```bash
npm run test:ci
```

### Run a specific test file

```bash
npx playwright test tests/register.spec.ts
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test by title

```bash
npx playwright test -g "TC-03"
```

---

## Available Scripts

All scripts are defined in `package.json`:

| Script | Command | Description |
|---|---|---|
| `test` | `playwright test` | Run all tests (default env) |
| `test:qa` | `cross-env TEST_ENV=qa playwright test` | Run tests against QA environment |
| `test:headed` | `playwright test --headed` | Run tests with visible browser |
| `test:ci` | `playwright test --reporter=line` | CI-friendly minimal output |
| `report:open` | `playwright show-report` | Open the last HTML test report |
| `typecheck` | `tsc --noEmit` | TypeScript type-check without compiling |
| `lint` | `eslint . --ext .ts` | Lint all TypeScript files |
| `lint:fix` | `npm run lint -- --fix` | Auto-fix linting issues |
| `format` | `prettier "**/*.{ts,js,json,md}" --write` | Format all supported files |
| `format:check` | `npm run format -- --check` | Check formatting without making changes |

---

## Test Architecture

### Page Objects

Located in the `pages/` directory. Each page object class encapsulates the locators and interactions for a specific page or UI component, keeping test files clean and readable.

#### `HomePage` (`pages/homePage.ts`)

Handles navigation from the home page.

| Method | Description |
|---|---|
| `NavigateToHome()` | Navigates to the application root (`/`) |
| `NavigateToRegister()` | Clicks the "Crear cuenta" (Create Account) button |

#### `RegisterPage` (`pages/registerPage.ts`)

Handles all interactions on the student registration form.

| Method | Description |
|---|---|
| `inputNameValue(name)` | Fills the first name field |
| `inputLastNameValue(lastName)` | Fills the last name field |
| `inputEmailValue(email)` | Fills the email field |
| `inputPasswordValue(password)` | Fills the password field |
| `inputConfirmPasswordValue(password)` | Fills the confirm password field |
| `clickShowPassword()` | Toggles password visibility |
| `clickShowConfirmPassword()` | Toggles confirm password visibility |
| `clickTermsAndConditionsCheckbox()` | Checks the T&C acceptance checkbox |
| `clickTermsAndConditionsLink()` | Navigates to terms and conditions |
| `clickPrivacyPolicyLink()` | Navigates to the privacy policy |
| `clickCreateAccountBtn()` | Submits the registration form |
| `RegisterStudent(name, lastName, email, password)` | **Orchestrator method** — completes the full registration flow |

#### `EmailConfirmationModal` (`pages/emailConfirmationModal.ts`)

> ⚠️ This page object is currently commented out and is a **work in progress**. It will handle the email confirmation modal displayed after successful registration.

---

### Test Specs

Located in the `tests/` directory.

#### `register.spec.ts`

| Test ID | Name | Description |
|---|---|---|
| TC-03 | Student Registration (Sign up) | Verifies that a new student can register successfully. Validates the API response returns HTTP 201 and confirms the user is redirected to the verification-pending page with the expected text visible. |

**Test flow for TC-03:**

1. Navigate to the home page.
2. Click the "Create Account" link to navigate to the registration form.
3. Fill in the form with a dynamically generated unique email address.
4. Accept the Terms and Conditions.
5. Submit the form.
6. Assert that the `POST /api/students/register` API returns status `201`.
7. Assert the page URL contains `verification-pending`.
8. Assert the text `"Verifica tu email"` is visible on the page.

---

### Utilities / Helpers

Located in `utils/helpers.ts`.

The `Helpers` class provides reusable assertion and verification methods shared across test specs.

| Method | Parameters | Description |
|---|---|---|
| `verifyVisibleText(text)` | `text: string` | Asserts that an element containing the given text is visible on the page |
| `checkAPIResponse(url, method, status)` | `url: string`, `method: string`, `status: number` | Intercepts a network response matching the given URL, HTTP method, and status code. Waits until a matching response is captured. |

---

## Playwright Configuration

File: `playwright.config.ts`

| Option | Value | Notes |
|---|---|---|
| `testDir` | `./tests` | Directory where test specs are found |
| `fullyParallel` | `true` | Tests run in parallel by default |
| `forbidOnly` | `true` (CI only) | Fails build if `test.only` is left in code |
| `retries` | `2` (CI) / `0` (local) | Retries failing tests in CI |
| `workers` | `1` (CI) / auto (local) | Limits concurrency in CI |
| `reporter` | `html` | Generates an HTML report after each run |
| `screenshot` | `only-on-failure` | Screenshots are captured only when a test fails |
| `video` | `retain-on-failure` | Video recording is kept only for failed tests |
| `trace` | `on-first-retry` | Trace is collected on the first retry of a failed test |

**Configured browsers (projects):**

| Browser | Device Emulation |
|---|---|
| Chromium | Desktop Chrome |
| Firefox | Desktop Firefox |
| WebKit | Desktop Safari |

---

## Code Quality Tools

### ESLint

Configuration: `eslint.config.js`

Enforces TypeScript best practices, including:

- `@typescript-eslint/no-floating-promises` — prevents unhandled async operations (critical for Playwright).
- `@typescript-eslint/no-misused-promises` — catches incorrect async usage patterns.
- `@typescript-eslint/no-unused-vars` — flags declared but unused variables.
- Integrated with Prettier to avoid rule conflicts.

Run linting:

```bash
npm run lint
npm run lint:fix   # auto-fix where possible
```

### Prettier

Configuration: `.prettierrc.json`

| Rule | Value |
|---|---|
| `printWidth` | 100 characters |
| `singleQuote` | `true` |
| `trailingComma` | `all` |
| `tabWidth` | 4 spaces |
| `semi` | `true` |

Run formatting:

```bash
npm run format          # format in-place
npm run format:check    # check only (no changes)
```

### Husky Git Hooks

Husky enforces code quality checks at the Git level to prevent bad code from being committed or pushed.

#### `pre-commit` hook

Runs automatically before every `git commit`:

```bash
npm run lint         # ESLint check
npm run format:check # Prettier format check
```

> If either check fails, the commit is blocked until the issues are resolved.

#### `pre-push` hook

Runs automatically before every `git push`:

```bash
npm run typecheck    # TypeScript type-check
npm run test         # Full Playwright test run (line reporter)
```

> If tests or type-checks fail, the push is blocked.

---

## CI/CD with GitHub Actions

File: `.github/workflows/playwright.yml`

The workflow is triggered on:
- **Push** to `main` or `master`
- **Pull Request** targeting `main` or `master`

### Workflow steps

| Step | Action |
|---|---|
| Checkout code | `actions/checkout@v4` |
| Set up Node.js | `actions/setup-node@v4` with `lts/*` |
| Install dependencies | `npm ci` |
| Install Playwright browsers | `npx playwright install --with-deps` |
| Run tests | `npx playwright test` (with `TEST_ENV=qa`) |
| Upload HTML report | `actions/upload-artifact@v4` (retained for 30 days, even on failure) |

> The `TEST_ENV` environment variable is set to `qa` in the workflow, so tests always run against the QA environment in CI.

---

## HTML Test Report

After any test run, Playwright generates an HTML report in the `playwright-report/` directory.

**Open the report locally:**

```bash
npm run report:open
```

The report includes:

- Pass/fail status per test
- Step-by-step test execution trace
- Screenshots (on failure)
- Video recordings (on failure)
- Network traces (on retry)

In CI, the report is uploaded as a GitHub Actions artifact named `playwright-report` and retained for **30 days**.

---

## Path Aliases

TypeScript path aliases are configured in `tsconfig.json` to keep imports clean and readable:

| Alias | Maps to |
|---|---|
| `@pages/*` | `pages/*` |
| `@tests/*` | `tests/*` |
| `@utils/*` | `utils/*` |

**Usage example:**

```typescript
import { HomePage } from '@pages/homePage';
import { RegisterPage } from '@pages/registerPage';
import { Helpers } from '@utils/helpers';
```

---

## Contributing

1. **Create a branch** from `main` for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Write or update Page Objects** in `pages/` for any new UI interactions.

3. **Write test specs** in `tests/` following the existing naming convention (`<feature>.spec.ts`).

4. **Ensure all checks pass** before pushing:
   ```bash
   npm run lint
   npm run format:check
   npm run typecheck
   npm test
   ```

5. **Open a Pull Request** against `main`. The GitHub Actions workflow will run all tests automatically.

---

> **Repository:** [github.com/imfDana/ateneaconocimientos-testing-framework](https://github.com/imfDana/ateneaconocimientos-testing-framework)
> **Issues:** [github.com/imfDana/ateneaconocimientos-testing-framework/issues](https://github.com/imfDana/ateneaconocimientos-testing-framework/issues)

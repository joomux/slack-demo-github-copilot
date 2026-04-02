# Claims API Demo

> Testing Slack workflow notifications - Build #2

A TypeScript/Express API with intentional errors for demonstrating CI/CD pipeline failures and Slack notifications.

## Endpoints

- `GET /` - Hello World
- `GET /api/claims` - Get all claims
- `GET /api/claims/:id` - Get a specific claim
- `POST /api/claims` - Create a new claim
- `DELETE /api/claims/:id` - Delete a claim
- `GET /api/health` - Health check

## Setup

```bash
npm install
npm run build
npm start
```

## Intentional Errors (for CI/CD Demo)

This codebase contains the following intentional errors that will cause the build to fail:

| Error | Location | Description |
|-------|----------|-------------|
| Undefined variable | `GET /api/claims` | `totalCount` is not defined |
| Type mismatch | `GET /api/claims/:id` | Comparing string to number |
| Missing property | `POST /api/claims` | `status` property missing from Claim |
| Unassigned variable | `DELETE /api/claims/:id` | `deletedClaim` used before assignment |
| Syntax error | `GET /api/health` | Missing closing brace |

## CI Pipeline

The GitHub Actions workflow will:
1. Install dependencies
2. Run ESLint (will fail)
3. Build TypeScript (will fail)
4. Run tests (won't reach this step)

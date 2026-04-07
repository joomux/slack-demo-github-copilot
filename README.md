# Claims API Demo

> Testing Slack workflow notifications - Build #2

A TypeScript/Express API with intentional errors for demonstrating CI/CD pipeline failures and Slack notifications.

## Endpoints

### Claims API
- `GET /` - Hello World
- `GET /api/claims` - Get all claims
- `GET /api/claims/:id` - Get a specific claim
- `POST /api/claims` - Create a new claim
- `DELETE /api/claims/:id` - Delete a claim
- `GET /api/health` - Health check

### Encryption API
- `POST /api/encrypt` - Encrypt data using AES-256-GCM
- `POST /api/decrypt` - Decrypt data
- `GET /api/crypto/generate-key` - Generate a new encryption key
- `POST /api/crypto/derive-key` - Derive a key from a password

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
| Hardcoded secret | `crypto.ts` | Encryption key hardcoded in source |
| Weak key derivation | `crypto.ts` | PBKDF2 iterations too low (1000 vs 100000+) |

## CI Pipeline

The GitHub Actions workflow will:
1. Install dependencies
2. Run ESLint (will fail)
3. Build TypeScript (will fail)
4. Run tests (won't reach this step)

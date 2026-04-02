# Claims API Demo

> Build triggered at: April 2, 2026

A simple Flask application with a Claims API endpoint. This project contains **intentional errors** for demonstrating CI/CD pipeline integration and error detection.

## Endpoints

- `GET /` - Hello World
- `GET /api/claims` - Get all claims
- `GET /api/claims/<id>` - Get a specific claim
- `POST /api/claims` - Create a new claim
- `DELETE /api/claims/<id>` - Delete a claim
- `GET /api/health` - Health check

## Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

## Testing

```bash
# Run tests
pytest tests/ -v

# Run linting
flake8 app.py
```

## Intentional Errors (for CI/CD Demo)

This codebase contains the following intentional errors:

1. **Undefined variable** (`total_count` in `get_claims`)
2. **Syntax error** (assignment `=` instead of comparison `==` in `get_claim`)
3. **Missing import** (`datetime` not imported but used in `create_claim`)
4. **Unbound variable** (`deleted` may not be defined in `delete_claim`)
5. **Syntax error** (missing closing parenthesis in `health_check`)
6. **Failing test** (wrong assertion in `test_claims_count`)

These errors will cause:
- Flake8 linting failures
- Python syntax errors
- Test failures

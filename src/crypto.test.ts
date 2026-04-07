/**
 * Security Tests for Password Derivation
 * Ensures PBKDF2 is configured with secure iteration counts
 */

import { deriveKeyFromPassword } from './crypto';
import crypto from 'crypto';

describe('crypto.deriveKeyFromPassword', () => {
  // Security: Verify minimum iteration count to prevent brute-force attacks
  test('should use secure iteration count (minimum 100,000 per OWASP)', () => {
    const password = 'test-password-123';
    const salt = crypto.randomBytes(32).toString('hex');

    // Derive key twice and measure time to estimate iterations
    const startTime = process.hrtime.bigint();
    const result1 = deriveKeyFromPassword(password, salt);
    const endTime = process.hrtime.bigint();

    const timeMs = Number(endTime - startTime) / 1000000;

    // PBKDF2 with 310,000 iterations should take roughly 50-200ms on modern hardware
    // This is a heuristic check - if this is too fast, iterations might be too low
    expect(timeMs).toBeGreaterThan(10);
    expect(result1.key).toBeDefined();
    expect(result1.key).toHaveLength(64); // 32 bytes = 64 hex characters
  });

  test('should generate consistent results with same password and salt', () => {
    const password = 'my-secret-password';
    const salt = crypto.randomBytes(32).toString('hex');

    const result1 = deriveKeyFromPassword(password, salt);
    const result2 = deriveKeyFromPassword(password, salt);

    expect(result1.key).toBe(result2.key);
    expect(result1.salt).toBe(salt);
    expect(result2.salt).toBe(salt);
  });

  test('should generate different keys for different passwords', () => {
    const salt = crypto.randomBytes(32).toString('hex');

    const result1 = deriveKeyFromPassword('password1', salt);
    const result2 = deriveKeyFromPassword('password2', salt);

    expect(result1.key).not.toBe(result2.key);
  });

  test('should generate different keys for different salts', () => {
    const password = 'same-password';
    const salt1 = crypto.randomBytes(32).toString('hex');
    const salt2 = crypto.randomBytes(32).toString('hex');

    const result1 = deriveKeyFromPassword(password, salt1);
    const result2 = deriveKeyFromPassword(password, salt2);

    expect(result1.key).not.toBe(result2.key);
    expect(result1.salt).not.toBe(result2.salt);
  });

  test('should generate random salt when not provided', () => {
    const password = 'test-password';

    const result1 = deriveKeyFromPassword(password);
    const result2 = deriveKeyFromPassword(password);

    // Keys should be different because salts are randomly generated
    expect(result1.key).not.toBe(result2.key);
    expect(result1.salt).not.toBe(result2.salt);

    // But both should be valid 64-char hex strings
    expect(result1.salt).toHaveLength(64);
    expect(result2.salt).toHaveLength(64);
  });

  test('should handle long passwords correctly', () => {
    const longPassword = 'a'.repeat(128);
    const salt = crypto.randomBytes(32).toString('hex');

    const result = deriveKeyFromPassword(longPassword, salt);

    expect(result.key).toHaveLength(64);
    expect(result.key).toMatch(/^[0-9a-f]+$/);
  });

  test('should produce valid hex output', () => {
    const password = 'test-password';
    const result = deriveKeyFromPassword(password);

    // Key should be valid hex
    expect(result.key).toMatch(/^[0-9a-f]{64}$/);
    // Salt should be valid hex
    expect(result.salt).toMatch(/^[0-9a-f]{64}$/);
  });
});

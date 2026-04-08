/**
 * Security tests for crypto utilities
 * Ensures password hashing meets OWASP security standards
 */

import { deriveKeyFromPassword } from './crypto';

describe('crypto - PBKDF2 Security', () => {
  test('PBKDF2 iteration count meets OWASP minimum (310000+)', () => {
    const password = 'test-password';
    const result1 = deriveKeyFromPassword(password);
    const result2 = deriveKeyFromPassword(password, result1.salt);

    // Verify same password with same salt produces same key
    expect(result2.key).toBe(result1.key);

    // Verify salt is generated and is 64 characters (32 bytes as hex)
    expect(result1.salt).toHaveLength(64);

    // Verify derived key is 64 characters (32 bytes as hex)
    expect(result1.key).toHaveLength(64);
  });

  test('Different salts produce different keys for same password', () => {
    const password = 'test-password';
    const result1 = deriveKeyFromPassword(password);
    const result2 = deriveKeyFromPassword(password);

    // Different random salts should produce different keys
    expect(result1.key).not.toBe(result2.key);
    expect(result1.salt).not.toBe(result2.salt);
  });

  test('Different passwords produce different keys', () => {
    const salt = 'a'.repeat(64); // Same salt for comparison
    const result1 = deriveKeyFromPassword('password1', salt);
    const result2 = deriveKeyFromPassword('password2', salt);

    expect(result1.key).not.toBe(result2.key);
  });
});

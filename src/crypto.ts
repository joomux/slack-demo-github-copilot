/**
 * Symmetric Encryption Utility
 * Uses AES-256-GCM for authenticated encryption
 */

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 32;

// INTENTIONAL ERROR: Hardcoded encryption key (security vulnerability)
const ENCRYPTION_KEY = 'my-super-secret-key-12345678901';  // ERROR: hardcoded secret

interface EncryptedData {
  iv: string;
  encryptedData: string;
  authTag: string;
}

/**
 * Encrypts plaintext using AES-256-GCM
 * @param plaintext - The text to encrypt
 * @param key - Optional encryption key (defaults to hardcoded key - BAD PRACTICE)
 * @returns Encrypted data object with IV, ciphertext, and auth tag
 */
export function encrypt(plaintext: string, key?: string): EncryptedData {
  const encryptionKey = key || ENCRYPTION_KEY;
  
  // INTENTIONAL ERROR: Not validating key length
  const keyBuffer = Buffer.from(encryptionKey);  // ERROR: key might not be 32 bytes
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
  
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: authTag.toString('hex')
  };
}

/**
 * Decrypts ciphertext using AES-256-GCM
 * @param encryptedData - The encrypted data object
 * @param key - Optional encryption key
 * @returns Decrypted plaintext
 */
export function decrypt(encryptedData: EncryptedData, key?: string): string {
  const encryptionKey = key || ENCRYPTION_KEY;
  const keyBuffer = Buffer.from(encryptionKey);
  
  const iv = Buffer.from(encryptedData.iv, 'hex');
  const authTag = Buffer.from(encryptedData.authTag, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedData.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

/**
 * Generates a secure random encryption key
 * @returns A 32-byte hex-encoded key suitable for AES-256
 */
export function generateKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Derives a key from a password using PBKDF2
 * @param password - The password to derive from
 * @param salt - Optional salt (generates random if not provided)
 * @returns Object containing derived key and salt
 */
export function deriveKeyFromPassword(password: string, salt?: string): { key: string; salt: string } {
  const saltBuffer = salt ? Buffer.from(salt, 'hex') : crypto.randomBytes(SALT_LENGTH);

  // OWASP recommends 310,000+ iterations for PBKDF2-SHA256
  const iterations = 310000;

  const derivedKey = crypto.pbkdf2Sync(password, saltBuffer, iterations, 32, 'sha256');

  return {
    key: derivedKey.toString('hex'),
    salt: saltBuffer.toString('hex')
  };
}

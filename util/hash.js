import crypto from 'crypto';

/**
 * Hash a string input using SHA-256
 * @param {string} input - The string to hash
 * @returns {string} - The hashed output string (hexadecimal)
 */
export function hashString(input) {
  return crypto
    .createHash('sha256')
    .update(input)
    .digest('hex');
}

/**
 * Client-side password encryption utilities using Web Crypto API.
 * Uses PBKDF2 for secure password hashing in the browser.
 *
 * IMPORTANT: This is for localStorage cache encryption only.
 * Server-side authentication should use proper password hashing (Argon2, bcrypt, etc.)
 */

const SALT_KEY = "critix_cache_salt_v1";
const ITERATIONS = 100_000; // PBKDF2 iterations

/**
 * Generates a consistent salt for the user session.
 * Salt is stored in sessionStorage to ensure consistency within the same session.
 */
function getSalt(): Uint8Array {
  // Check if sessionStorage is available (SSR guard)
  if (typeof window === "undefined" || !window.sessionStorage) {
    // Return a default salt for SSR (not used in practice)
    return new Uint8Array(16).fill(0);
  }

  let salt = sessionStorage.getItem(SALT_KEY);

  if (!salt) {
    // Generate new salt
    const saltBuffer = crypto.getRandomValues(new Uint8Array(16));
    salt = Array.from(saltBuffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    sessionStorage.setItem(SALT_KEY, salt);
  }

  // Convert hex string back to Uint8Array
  const matches = salt.match(/.{1,2}/g);
  return new Uint8Array(
    matches ? matches.map((byte) => Number.parseInt(byte, 16)) : []
  );
}

/**
 * Encrypts a password using PBKDF2 and AES-GCM.
 * Returns a base64-encoded string containing IV + encrypted data.
 *
 * @param password - The plaintext password to encrypt
 * @returns Promise resolving to encrypted password string
 */
export async function encryptPassword(password: string): Promise<string> {
  if (!password) {
    return "";
  }

  // Check if Web Crypto API is available (SSR guard)
  if (
    typeof window === "undefined" ||
    !window.crypto ||
    !window.crypto.subtle
  ) {
    console.warn("Web Crypto API not available");
    return password; // Return plaintext in SSR (will be encrypted on client)
  }

  try {
    const salt = await getSalt();
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Derive encryption key from a fixed passphrase + salt
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode("critix_cache_encryption_key_v1"),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt as BufferSource,
        iterations: ITERATIONS,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    // Combine IV + encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);

    // Return as base64
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error("Error encrypting password:", error);
    return "";
  }
}

/**
 * Decrypts a password that was encrypted with encryptPassword.
 *
 * @param encryptedPassword - Base64-encoded encrypted password
 * @returns Promise resolving to plaintext password
 */
export async function decryptPassword(
  encryptedPassword: string
): Promise<string> {
  if (!encryptedPassword) {
    return "";
  }

  // Check if Web Crypto API is available (SSR guard)
  if (
    typeof window === "undefined" ||
    !window.crypto ||
    !window.crypto.subtle
  ) {
    console.warn("Web Crypto API not available");
    return encryptedPassword; // Return as-is in SSR
  }

  try {
    const salt = await getSalt();
    const encoder = new TextEncoder();

    // Decode base64
    const combined = Uint8Array.from(atob(encryptedPassword), (c) =>
      c.charCodeAt(0)
    );

    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    // Derive same encryption key
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode("critix_cache_encryption_key_v1"),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt as BufferSource,
        iterations: ITERATIONS,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encrypted
    );

    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Error decrypting password:", error);
    return "";
  }
}

/**
 * Clears the encryption salt from sessionStorage.
 * Call this on logout to ensure new encryption key on next login.
 */
export function clearEncryptionSalt(): void {
  sessionStorage.removeItem(SALT_KEY);
}

function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Enforce a reasonable length for a single address line (typically 2 to 255 characters)
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Reject non-printable control characters (including newlines and tabs)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Ensure the address contains at least 2 letters or numbers across any Unicode script
  // to avoid inputs consisting only of punctuation or symbols (e.g., ".", "---", "#?!")
  const meaningfulChars = trimmed.match(/[\p{L}\p{N}]/gu);
  if (!meaningfulChars || meaningfulChars.length < 2) {
    return false;
  }

  return true;
}

function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Address lines are typically between 3 and 100 characters
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Address line 1 should not contain newline characters
  if (/[\r\n]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter or number, and only permit valid address characters
  // Supports international characters via Unicode property escapes (\p{L}, \p{N})
  const addressRegex = /^(?=.*[\p{L}\p{N}])[\p{L}\p{N}\s.,/#'()&-]+$/u;

  return addressRegex.test(trimmed);
}

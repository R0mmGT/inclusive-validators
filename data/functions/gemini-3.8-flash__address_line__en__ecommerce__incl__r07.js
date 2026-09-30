function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic reasonable length bounds for international address lines
  if (trimmed.length < 2 || trimmed.length > 200) {
    return false;
  }

  // Reject strings containing ASCII or Unicode control characters
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter or number from any Unicode script
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Allow only letters, marks/diacritics, numbers, punctuation, whitespace, and symbols (e.g., #, º, №)
  if (!/^[\p{L}\p{M}\p{N}\p{P}\p{Zs}\p{S}]+$/u.test(trimmed)) {
    return false;
  }

  return true;
}

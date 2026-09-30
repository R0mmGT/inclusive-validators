function validate(address) {
  // Accept only strings
  if (typeof address !== 'string') return false;

  // Trim whitespace
  const str = address.trim();

  // Reasonable length limits for an address line (adjustable)
  if (str.length < 3 || str.length > 200) return false;

  // Reject control / non-printable characters
  // \p{C} matches invisible/unassigned/control characters in Unicode
  if (/\p{C}/u.test(str)) return false;

  // Require at least one letter or number (addresses should contain at least one)
  if (!/[\p{L}\p{N}]/u.test(str)) return false;

  // Allow only Unicode letters, numbers, punctuation, symbols and whitespace
  // This is permissive to support global address formats (including diacritics, scripts, postal marks, etc.)
  if (!/^[\p{L}\p{N}\p{P}\p{S}\s]+$/u.test(str)) return false;

  // Reject strings that are only numbers (e.g., "12345") — typically not a full address line
  // But allow numbers mixed with letters/punctuation (e.g., "221B Baker St", "Apt #5")
  if (/^[\p{N}\s-]+$/u.test(str)) return false;

  return true;
}

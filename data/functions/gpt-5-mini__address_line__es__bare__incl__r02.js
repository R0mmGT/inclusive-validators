function validate(address) {
  // Validate input type
  if (typeof address !== 'string') return false;

  const s = address.trim();

  // Reasonable length limits for a single address line
  if (s.length < 3 || s.length > 300) return false;

  // Reject control characters
  if (/\p{C}/u.test(s)) return false;

  // Allow letters, marks, numbers, punctuation, symbols and whitespace (Unicode-aware)
  // This keeps the check permissive so it works for many scripts and notations.
  if (!/^[\p{L}\p{M}\p{N}\p{P}\p{S}\s]+$/u.test(s)) return false;

  // Reject strings made only of punctuation/symbols/whitespace
  const hasNonPunct = s.replace(/[\p{P}\p{S}\s]/gu, '').length > 0;
  if (!hasNonPunct) return false;

  // Useful building blocks
  const hasLetter = /\p{L}/u.test(s);
  const hasDigit = /\p{N}/u.test(s);
  // Common separators found in many address formats
  const hasSeparator = /[-#\/,.\u00B0\u00BA:]/u.test(s);

  // If there's at least one letter (any script), accept
  if (hasLetter) return true;

  // If there are digits plus a separator (e.g. "123-45", "〒100-0001", "No. 5"), accept
  if (hasDigit && hasSeparator) return true;

  // Fallback: accept mostly-digit lines that include spaces or typical punctuation
  // (catches things like "123 45" or "456/7" while rejecting bare "123")
  const punctOrSpaceCount = (s.match(/[\p{P}\p{S}\s]/gu) || []).length;
  const punctRatio = punctOrSpaceCount / s.length;
  if (hasDigit && s.length >= 4 && punctRatio < 0.9) return true;

  // Otherwise, consider it invalid
  return false;
}

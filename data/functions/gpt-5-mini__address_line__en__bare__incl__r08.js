function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const str = address.trim();
  if (str.length < 3 || str.length > 200) return false; // reasonable size limits

  // Disallow newlines or other control characters (addresses should be a single line)
  // \p{C} matches invisible/control characters in Unicode
  if (/\p{C}/u.test(str) || /[\r\n]/.test(str)) return false;

  // Must contain at least one Unicode letter or number (covers scripts worldwide)
  if (!/[\p{L}\p{N}]/u.test(str)) return false;

  // Must not be only punctuation/symbols/spaces (e.g. "////" or "###")
  if (/^[\p{P}\p{S}\s]+$/u.test(str)) return false;

  // Reject if the entire string is an email address
  const emailFull = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
  if (emailFull.test(str)) return false;

  // Reject if the entire string is a URL (with optional scheme and path)
  const urlFull = /^(?:https?:\/\/)?(?:www\.)?[^\s\/]+\.[^\s\/]{2,}(?:\/[^\s]*)?$/iu;
  if (urlFull.test(str)) return false;

  // Reject strings that are overwhelmingly a single repeated character (like "1111111" or "------")
  // Allow spaces when computing variety, but ignore them for repetition check
  const withoutSpaces = str.replace(/\s+/g, '');
  if (withoutSpaces.length > 0) {
    const freq = {};
    for (const ch of withoutSpaces) freq[ch] = (freq[ch] || 0) + 1;
    const maxCount = Math.max(...Object.values(freq));
    if (maxCount / withoutSpaces.length > 0.8) return false;
  }

  // Heuristic: require at least one letter OR at least two digits/parts if no letters.
  // This helps accept numeric formats common in some countries (e.g., "1-2-3") while rejecting
  // strings that are too short and numeric-like but unlikely to be address (e.g., "12").
  const hasLetter = /[\p{L}]/u.test(str);
  const digitMatches = str.match(/[\p{N}]/gu) || [];
  if (!hasLetter) {
    // If there are no letters, require at least 3 digits or a digit and a separator (like "1-2-3" or "10/5")
    const hasSeparatorBetweenDigits = /[\p{N}]+[\s\-\/,\.]+[\p{N}]+/u.test(str);
    if (digitMatches.length < 3 && !hasSeparatorBetweenDigits) return false;
  }

  // Passed checks — likely a valid single-line street address across cultures
  return true;
}

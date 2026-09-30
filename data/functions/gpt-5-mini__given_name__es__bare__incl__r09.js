function validate(name) {
  // Validates a given name (first/given name) in a permissive, culture-inclusive way.
  // Returns true for plausible personal given names and false otherwise.
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  name = name.trim();
  if (name.length === 0) return false;

  // Use code-point-aware length (rough limit to avoid absurdly long values)
  const codePointLength = [...name].length;
  if (codePointLength > 100) return false; // generous upper bound

  // Must contain at least one letter from any Unicode script
  if (!/\p{L}/u.test(name)) return false;

  // Reject names containing digits or control/other invisible characters
  if (/\p{N}/u.test(name)) return false; // no numbers
  if (/\p{C}/u.test(name)) return false; // no control/other invisible chars

  // Allow letters, combining marks, space separators, and a small set of punctuation commonly found in names:
  // - apostrophes (ASCII and common typographic), hyphen/minus, modifier letters like ʻ (U+02BB), middle dot, period
  // We include \p{M} to allow diacritics as separate marks
  const allowedPattern = /^[\p{L}\p{M}\p{Zs}'’ʻʼ·\-.]+$/u;
  if (!allowedPattern.test(name)) return false;

  // Name must start and end with a letter (avoids leading/trailing punctuation or spaces)
  if (!/^\p{L}/u.test(name)) return false;
  if (!/\p{L}$/u.test(name)) return false;

  // Disallow consecutive punctuation characters (e.g., --, '' , ..) which are unlikely in valid names
  if (/(?:['’ʻʼ·\-.]){2,}/u.test(name)) return false;

  // Disallow multiple consecutive whitespace characters
  if (/\s{2,}/u.test(name)) return false;

  // Each whitespace-separated segment should contain at least one letter and not be only punctuation
  const parts = name.split(/\s+/u);
  for (const part of parts) {
    if (!/\p{L}/u.test(part)) return false;
    if (/^[\'’ʻʼ·\-.]+$/u.test(part)) return false;
  }

  // Passed all checks — likely a valid given name across many cultures
  return true;
}

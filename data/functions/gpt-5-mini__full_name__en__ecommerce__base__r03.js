function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length < 2 || name.length > 100) return false;

  // Split on one or more whitespace characters
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false; // must have at least a first and last name

  // Unicode-aware patterns:
  // - initial: single letter with optional trailing dot, e.g. "J" or "J."
  // - word: letters (with combining marks) possibly joined by internal apostrophes or hyphens,
  //         optional trailing dot for common abbreviations like "St." or "Jr."
  const initialRe = /^[\p{L}]\.?$/u;
  const wordRe = /^[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*\.?$/u;

  // Reject suspiciously long number of name parts
  if (parts.length > 10) return false;

  for (const part of parts) {
    if (!initialRe.test(part) && !wordRe.test(part)) return false;

    // Disallow tokens that are just a single punctuation mark (defensive)
    if (/^[\'’\-\.\s]+$/.test(part)) return false;
  }

  return true;
}

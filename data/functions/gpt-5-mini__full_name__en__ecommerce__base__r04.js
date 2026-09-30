function validate(fullName) {
  // Basic type and length checks
  if (typeof fullName !== 'string') return false;
  const s = fullName.trim();
  if (s.length < 2 || s.length > 100) return false;

  // Split into words (allow multiple spaces)
  const parts = s.split(/\s+/);
  if (parts.length < 2) return false; // require at least first + last name

  // Each word must:
  // - start with a Unicode letter
  // - contain only letters, single apostrophes, hyphens or dots between letters
  // - not have consecutive punctuation characters
  // - not end with apostrophe or hyphen (ending dot is allowed for initials/suffixes)
  // Uses Unicode property \p{L} to allow accented letters.
  const wordRe = /^\p{L}(?:['\-\.]?\p{L})*\.?$/u;

  for (const part of parts) {
    if (!wordRe.test(part)) return false;

    // Reject parts that are solely punctuation (shouldn't occur due to regex, but safe)
    if (!/\p{L}/u.test(part)) return false;
  }

  return true;
}

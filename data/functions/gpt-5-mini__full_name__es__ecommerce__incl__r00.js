function validate(name) {
  // Validates that `name` is a plausible full personal name for a global audience.
  // - Accepts Unicode letters from any script, combining marks and common name punctuation:
  //   apostrophes (straight and curly), hyphens, middle dot, and an optional trailing period.
  // - Disallows digits and obvious non-name symbols (like @ # $ % etc).
  // - Accepts single-word names (common in some cultures) if they contain at least two letters.
  // - For multi-word names, requires at least one word with two or more letters (to avoid
  //   accepting only initials like "A B").
  // - No external libraries. Uses Unicode property escapes, requires a modern JS engine.
  if (typeof name !== 'string') return false;

  const s = name.trim();
  if (s.length < 2 || s.length > 100) return false;

  // Reject digits (numbers) anywhere
  if (/\p{N}/u.test(s)) return false;

  // Reject a set of obvious disallowed symbols (emails, slashes, pipes, etc.)
  if (/[\/\\@#\$%\^&\*\+=<>\[\]\{\}\|~`]/.test(s)) return false;

  // Collapse multiple whitespace and split into parts
  const parts = s.split(/\s+/);
  if (parts.length === 0) return false;

  // A "full" token: starts with a letter, may contain combining marks, optional internal
  // separators (apostrophe, curly apostrophe, hyphen variants, middle dot, period),
  // each separator must be followed by letters. Allows an optional trailing dot (abbrev).
  const fullTokenRe = /^[\p{L}\p{M}\u200C\u200D]+(?:(?:['\u2019\u0027\-\u2010\u2011\u00B7\.])[\p{L}\p{M}\u200C\u200D]+)*\.?$/u;

  // Single-letter initial (with optional dot), e.g. "J" or "J."
  const initialRe = /^[\p{L}]\.?$/u;

  let tokensWithTwoOrMoreLetters = 0;

  for (const part of parts) {
    if (initialRe.test(part)) {
      // initial is allowed but doesn't count as a "full" token
      continue;
    }
    if (!fullTokenRe.test(part)) {
      return false;
    }
    // Count letters in the token (Unicode-aware)
    const letters = (part.match(/\p{L}/gu) || []).length;
    if (letters >= 2) tokensWithTwoOrMoreLetters++;
  }

  // Require at least one token to have two or more letters (prevents accepting only initials).
  if (tokensWithTwoOrMoreLetters === 0) return false;

  // If we have reached here, the name looks valid
  return true;
}

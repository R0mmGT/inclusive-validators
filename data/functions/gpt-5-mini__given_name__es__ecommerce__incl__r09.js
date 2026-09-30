function validate(name) {
  // Basic type/trim/length checks
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - spaces
  // - in-word connectors: hyphen, ASCII apostrophe, right single quote, middle dot
  // - dot (.) to allow initials (handled with extra rules)
  const allowedRe = /^[\p{L}\p{M}\s\-'\u2019\u00B7.]+$/u;
  if (!allowedRe.test(name)) return false;

  // Must contain at least one letter
  if (!/\p{L}/u.test(name)) return false;

  // Start with a letter (most personal names begin with a letter)
  if (!/^\p{L}/u.test(name)) return false;

  // End with a letter, a combining mark, or a single dot (allow trailing initial)
  if (!/[\p{L}\p{M}.]$/u.test(name)) return false;

  // No consecutive spaces
  if (/\s{2,}/.test(name)) return false;

  // In-word connectors (should not be adjacent to spaces and should not repeat)
  const inWordConn = /[-'\u2019\u00B7]/;
  if (/(?:[-'\u2019\u00B7]{2,})/.test(name)) return false;         // e.g. -- or '' not allowed
  if (/(?:\s[-'\u2019\u00B7])|(?:[-'\u2019\u00B7]\s)/.test(name)) return false; // connectors next to spaces

  // Dots: no consecutive dots
  if (/\.{2,}/.test(name)) return false;

  // Don't allow sequences that are only punctuation/marks (already checked for letters),
  // also avoid suspicious constructs like a single-letter name with no letter (covered).
  return true;
}

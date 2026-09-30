function validate(name) {
  if (typeof name !== 'string') return false;
  // Trim and basic length checks
  name = name.trim();
  if (name.length < 2 || name.length > 100) return false;
  // Must contain at least two name parts (a "full name")
  if (!/\s/.test(name)) return false;

  // Split on whitespace (allow multiple spaces/tabs/newlines between parts)
  const parts = name.split(/\s+/);

  // Unicode letter and combining marks
  // Allow internal apostrophes (straight ' and right single quote ’) and hyphens
  // A valid word part must start with a letter and may have groups like -Smith or O'Neill
  const wordRe = /^\p{L}[\p{L}\p{M}]*(?:[\'\u2019\-]\p{L}[\p{L}\p{M}]*)*$/u;
  // Allow single-letter initials, with optional trailing dot (e.g., "J" or "J.")
  const initialRe = /^\p{L}\.?$/u;

  for (const part of parts) {
    // Reject empty parts (shouldn't happen because of split) and parts that are only punctuation
    if (!part) return false;
    if (!(wordRe.test(part) || initialRe.test(part))) return false;
  }

  return true;
}

function validate(name) {
  // Basic type/length checks
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length < 2 || name.length > 100) return false;

  // Must contain at least one space (first + last name)
  if (!/\s+/.test(name)) return false;

  // Split on one or more whitespace characters
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // Token rules:
  // - Single-letter initial with an optional dot, e.g. "J" or "J."
  // - Or a name token that:
  //   * starts with a Unicode letter
  //   * may contain letters or combining marks
  //   * may contain internal apostrophes (straight or curly) or hyphens only when followed by a letter
  // This uses Unicode property escapes; the "u" flag is required.
  const initialRe = /^\p{L}\.?$/u;
  const tokenRe = /^(?:\p{L}(?:[\p{M}\p{L}]|['’\-](?=\p{L}))* )?$/u; // dummy to help build below

  // Build a proper token regex: either initial or full token
  const nameTokenRe = /^(?:\p{L}\.|(?:\p{L}(?:[\p{M}\p{L}]|['’\-](?=\p{L}))*))$/u;

  let hasFullToken = false;
  for (const part of parts) {
    if (!nameTokenRe.test(part)) return false;
    if (!initialRe.test(part)) hasFullToken = true;
  }

  // Ensure there's at least one non-initial token (so "J. K." alone is rejected)
  if (!hasFullToken) return false;

  return true;
}

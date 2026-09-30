function validate(name) {
  // Basic type/length checks
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length < 2 || name.length > 200) return false;

  // Split on runs of whitespace; require at least two parts (first + last)
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // Unicode-aware patterns:
  // - word: starts/ends with a letter, interior may contain combining marks, single apostrophes or hyphens between letter segments
  // - initial: single letter with optional trailing dot (e.g. "J" or "J.")
  const wordRe = /^\p{L}[\p{L}\p{M}]*(?:[\'’\-]\p{L}[\p{L}\p{M}]*)*$/u;
  const initialRe = /^\p{L}\.?$/u;

  // Require at least one non-initial part with >=2 letters (i.e. an actual given/family name)
  let hasNonInitialWithTwoLetters = false;

  for (const part of parts) {
    // Reject empty parts (shouldn't happen due to split) or parts containing digits/other disallowed chars
    if (!part) return false;

    if (initialRe.test(part)) {
      // it's an initial like "J" or "J."
      continue;
    }

    if (!wordRe.test(part)) return false;

    // Count letters (including combining marks) to ensure part isn't just a single letter with punctuation
    const lettersOnly = part.replace(/['’\-]/g, ''); // remove punctuation
    // Normalize length by counting Unicode code points (to handle astral/combined chars)
    const letterCount = [...lettersOnly].filter(ch => /\p{L}|\p{M}/u.test(ch)).length;
    if (letterCount >= 2) hasNonInitialWithTwoLetters = true;
  }

  return hasNonInitialWithTwoLetters;
}

function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (!name) return false;

  // Split on whitespace (one or more) and require at least two parts (first + last)
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // Unicode-aware regexes:
  // - initial cluster: e.g. "J.R.R."
  // - single initial: "J" or "J."
  // - word: starts and ends with a letter, may contain letters, apostrophes or hyphens inside, optional trailing dot (e.g. "St.")
  const reInitials = /^(?:\p{L}\.)+$/u;
  const reInitial = /^\p{L}\.?$/u;
  const reWord = /^\p{L}(?:[\p{L}'\u2019-]*\p{L})?\.?$/u;

  let hasMultiLetterWord = false;

  for (const part of parts) {
    // reject obviously too long or empty pieces
    if (!part || part.length > 60) return false;

    if (reInitials.test(part) || reInitial.test(part) || reWord.test(part)) {
      // count letters in the part
      const letters = (part.match(/\p{L}/gu) || []).length;
      if (letters >= 2) hasMultiLetterWord = true;
      continue;
    }

    // if none of the patterns matched, invalid
    return false;
  }

  // Ensure the name isn't just a sequence of initials (e.g. "J R")
  return hasMultiLetterWord;
}

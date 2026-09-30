function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length < 3 || s.length > 100) return false;

  // Allowed characters: letters (unicode), numbers, space and common address punctuation
  const allowed = /^[\p{L}\p{N}\s,.\-\/#'()&]+$/u;
  if (!allowed.test(s)) return false;

  // Must start with a letter or number (no leading punctuation)
  const startsWithAlnum = /^[\p{L}\p{N}]/u;
  if (!startsWithAlnum.test(s)) return false;

  // Must contain at least one letter (avoid numeric-only entries)
  const hasLetter = /\p{L}/u;
  if (!hasLetter.test(s)) return false;

  // Disallow two or more consecutive punctuation characters (excluding space)
  const consecutivePunct = /[^\p{L}\p{N}\s]{2,}/u;
  if (consecutivePunct.test(s)) return false;

  // Must end with a letter, number, or a single period (e.g. "St.")
  const endsWithValid = /[\p{L}\p{N}\.]$/u;
  if (!endsWithValid.test(s)) return false;

  return true;
}

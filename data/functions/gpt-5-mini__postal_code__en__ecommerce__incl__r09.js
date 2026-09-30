function validate(input) {
  // Accepts a single string and returns true if it looks like a plausible postal code
  // for international usage, false otherwise. The validation is intentionally permissive
  // (covers many national formats and non-Latin scripts) while rejecting empty or
  // clearly invalid values.
  if (typeof input !== 'string') return false;

  const trimmed = input.trim();
  if (trimmed.length === 0) return false;

  // Reasonable length bounds for postal codes worldwide (inclusive).
  // Very few genuine postal codes are shorter than 2 or longer than 12 characters.
  if (trimmed.length < 2 || trimmed.length > 12) return false;

  // Detect whether the runtime supports Unicode property escapes (\p{...}).
  const unicodePropSupported = (() => {
    try {
      // Try building a tiny regex that uses a Unicode property escape.
      new RegExp("\\p{L}", "u");
      return true;
    } catch (e) {
      return false;
    }
  })();

  // Allowed characters:
  // - any letter or number from any script (when supported)
  // - common punctuation used in postal codes: space, hyphen, slash, dot, comma,
  //   hash, degree sign, plus, parentheses, middle-dot, Japanese postal mark (〒)
  // Also require at least one letter or number.
  let allowedRe, alnumRe;
  if (unicodePropSupported) {
    allowedRe = /^[\p{L}\p{N}\s\-\/\.\,#°+()·〒]+$/u;
    alnumRe = /[\p{L}\p{N}]/u;
  } else {
    // Fallback for older environments: accept ASCII letters/numbers and common punctuation.
    allowedRe = /^[A-Za-z0-9\s\-\/\.\,#°+()]+$/;
    alnumRe = /[A-Za-z0-9]/;
  }

  if (!allowedRe.test(trimmed)) return false;
  if (!alnumRe.test(trimmed)) return false;

  // Reject overly punctuation-heavy values (e.g., "----" or "    -   /")
  // Ensure there is at least one letter or digit among the first and last few chars.
  const endpoints = trimmed.slice(0, 3) + trimmed.slice(-3);
  if (!alnumRe.test(endpoints)) return false;

  return true;
}

function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  name = name.trim();

  // Reject empty or unreasonably long names
  if (name.length === 0 || name.length > 200) return false;

  // Reject control characters
  if (/[\p{Cc}]/u.test(name)) return false;

  // Allowed characters:
  // - any Unicode letter or combining mark (\p{L}\p{M})
  // - spaces
  // - common name punctuation: hyphen, apostrophe variants, period, middle dot
  // We include several apostrophe-like characters used in world languages.
  const allowedRe = /^[\p{L}\p{M}\s.\-'\u2019\u2018\u02BC\u02BB\u00B7]+$/u;
  if (!allowedRe.test(name)) return false;

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(name)) return false;

  // Must start with a letter (many cultures expect the name to begin with a letter)
  if (!/^\p{L}/u.test(name)) return false;

  // Allow ending with a letter or with a period (to permit initials/suffixes like "Jr.")
  if (!/[.\p{L}]$/u.test(name)) return false;

  // Disallow runs of punctuation characters (excluding spaces), e.g. "--" or "''" or ".."
  if (/[.\-'\u2019\u2018\u02BC\u02BB\u00B7]{2,}/u.test(name)) return false;

  // Disallow excessive consecutive whitespace
  if (/\s{3,}/u.test(name)) return false;

  // Each space-separated part should contain at least one letter (prevents parts like just "-" or "'")
  const parts = name.split(/\s+/u);
  for (const part of parts) {
    if (!/\p{L}/u.test(part)) return false;
    // A part made entirely of punctuation is invalid
    if (/^[.\-'\u2019\u2018\u02BC\u02BB\u00B7]+$/u.test(part)) return false;
  }

  // Passed all checks — treat as a valid full name
  return true;
}

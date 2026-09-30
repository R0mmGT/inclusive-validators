function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  name = name.trim();

  // Reject empty or absurdly long names
  if (name.length === 0 || name.length > 100) return false;

  // Allowed characters:
  // - \p{L} letters from any language
  // - \p{M} combining marks (diacritics)
  // - \p{Zs} space separators (regular and other unicode spaces)
  // - common name punctuation: apostrophes (') and RIGHT SINGLE QUOTATION MARK (’),
  //   periods (.), middle dot (·), and a range of hyphen/dash characters
  // The hyphen is placed at the end of the class to avoid range interpretation.
  const allowed = /^[\p{L}\p{M}\p{Zs}'’.\u00B7\u2010\u2011\u2012\u2013\u2014-]+$/u;
  if (!allowed.test(name)) return false;

  // Must contain at least one letter
  if (!/\p{L}/u.test(name)) return false;

  // Reject control characters or excessive whitespace sequences
  if (/\p{C}/u.test(name)) return false;          // control chars
  if (/\s{2,}/u.test(name)) return false;         // multiple consecutive whitespace

  // Disallow multiple consecutive punctuation characters such as "--", "''", "..", "··"
  if (/['’.\u00B7\u2010\u2011\u2012\u2013\u2014-]{2,}/u.test(name)) return false;

  // Name must not start with punctuation (apostrophe, quote, dot, dash, middle dot)
  if (/^['’.\u00B7\u2010\u2011\u2012\u2013\u2014-]/u.test(name)) return false;

  // Name must not end with apostrophe, hyphen or middle dot or dash.
  // Ending with a period is common (initials, Jr., Sr.) so allow a trailing dot.
  if (/['’\u00B7\u2010\u2011\u2012\u2013\u2014-]$/u.test(name)) return false;

  // Split on Unicode spaces and validate each "word" has at least one letter
  // and isn't purely punctuation.
  const parts = name.split(/\p{Zs}+/u).filter(Boolean);
  if (parts.length === 0) return false;
  for (const part of parts) {
    if (!/\p{L}/u.test(part)) return false;
    // Words like "." or "-" or "'" are rejected by previous rules; ensure
    // a word isn't just a single punctuation except a single-letter initial optionally with a dot
    if (/^[.'’\u00B7-]+$/u.test(part)) return false;
  }

  // Basic sanity: avoid names that look like emails, urls, or contain symbol characters
  if (/[@#<>\/\\^&*=\[\]{}|~`$%]+/.test(name)) return false;

  // Passed all heuristic checks
  return true;
}

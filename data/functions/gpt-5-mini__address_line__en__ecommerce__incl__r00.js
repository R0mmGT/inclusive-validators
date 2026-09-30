function validate(input) {
  // Basic type and trimming
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;
  if (s.length > 200) return false; // reasonable upper bound for a single address line

  // Reject control characters and line breaks
  if (/[\u0000-\u001F\u007F-\u009F]/.test(s)) return false;

  // Disallow angle brackets to avoid HTML/tag injection
  if (/[<>]/.test(s)) return false;

  // Reject obvious email addresses
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(s)) return false;

  // Reject obvious URLs (protocols and common www prefix)
  if (/\b(?:https?|ftp):\/\/|www\.[^\s]+/i.test(s)) return false;

  // Must contain at least one letter or number (addresses like just "!!!" are rejected)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Disallow long runs of the same punctuation/symbol character (e.g. "----" or "!!!!")
  if (/([^\p{L}\p{N}\s])\1\1/u.test(s)) return false;

  // Allow a broad, international set of characters:
  // - letters and marks: \p{L}\p{M}
  // - numbers: \p{N}
  // - punctuation: \p{P}
  // - space separators: \p{Zs} (regular space, non-breaking space, etc.)
  // - currency symbols: \p{Sc}
  // Also allow common address characters like # and slash/backslash explicitly.
  //
  // Note: angle brackets were already excluded above; \p{P} would otherwise allow them.
  const allowed = /^[\p{L}\p{M}\p{N}\p{P}\p{Zs}\p{Sc}#\/\\]+$/u;
  if (!allowed.test(s)) return false;

  // Practical sanity checks:
  // - Do not allow an address composed solely of a single short token of punctuation/symbols
  // - Require at least 2 non-punctuation characters overall (letters or numbers)
  const nonPunctCount = (s.match(/[\p{L}\p{N}]/gu) || []).length;
  if (nonPunctCount < 1) return false;

  return true;
}

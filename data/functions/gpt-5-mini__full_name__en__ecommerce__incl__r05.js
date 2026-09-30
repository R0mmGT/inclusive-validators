function validate(name) {
  if (typeof name !== 'string') return false;

  // Normalize and trim all Unicode space-separators (so NBSP etc. are removed)
  name = name.replace(/^\p{Zs}+|\p{Zs}+$/gu, '');

  // Reasonable length limits for a person's full name
  if (name.length === 0 || name.length > 100) return false;

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(name)) return false;

  // Disallow any digits
  if (/\p{N}/u.test(name)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and marks (\p{M})
  // - Unicode space separators (\p{Zs})
  // - Unicode dash punctuation (\p{Pd}) (hyphen, en-dash, em-dash, etc.)
  // - Common name punctuation: apostrophes (U+0027 and U+2019), middle dot (·), and period (.)
  const allowed = /^[\p{L}\p{M}\p{Zs}\p{Pd}'’·.]+$/u;
  if (!allowed.test(name)) return false;

  // Must start and end with a letter/mark (no leading/trailing punctuation or spaces)
  if (!/^[\p{L}\p{M}]/u.test(name) || !/[\p{L}\p{M}]$/u.test(name)) return false;

  // Disallow consecutive space separators
  if (/[\p{Zs}]{2,}/u.test(name)) return false;

  // Disallow two or more punctuation characters (from our allowed punctuation set) in a row,
  // e.g. "..", "--", "''" etc.
  if (/[.'’·\p{Pd}]{2,}/u.test(name)) return false;

  // Disallow spaces directly adjacent to dash/apostrophe/middle-dot characters.
  // (We allow a period followed by a space because initials like "J. R. R. Tolkien" are common.)
  if (/(?:[\p{Zs}](?:\p{Pd}|['’·])|(?:\p{Pd}|['’·])[\p{Zs}])/u.test(name)) return false;

  // Everything else looks fine for an international full name
  return true;
}

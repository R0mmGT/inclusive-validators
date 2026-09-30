function validate(name) {
  // Basic type/trim/length checks
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.length > 200) return false; // reasonable upper bound for names

  // Normalize internal whitespace (treat consecutive whitespace as a single separator)
  const normalized = trimmed.replace(/\s+/g, ' ');

  // Must contain at least one letter from any script
  if (!/\p{L}/u.test(normalized)) return false;

  // Allowed characters for the whole name:
  // - letters (\p{L}) and marks (\p{M})
  // - dash-type punctuation (\p{Pd}) covers hyphen, en-dash, em-dash, etc.
  // - a handful of common apostrophe-like characters and the middle dot
  // - ASCII period and spaces
  const allowedWhole = /^[\p{L}\p{M}\p{Pd}\s\.\'’`ʼʾ·]+$/u;
  if (!allowedWhole.test(normalized)) return false;

  // Validate each space-separated token (e.g. "Jean-Luc", "O'Connor", "J.R.R.", "李")
  const tokens = normalized.split(' ');
  const tokenChars = /^[\p{L}\p{M}\p{Pd}\.\'’`ʼʾ·]+$/u;
  const consecutivePunct = /[\p{Pd}\.\'’`ʼʾ·]{2,}/u; // disallow two punctuation connectors in a row

  for (const tok of tokens) {
    if (tok.length === 0) return false;

    // Each token must include at least one letter
    if (!/\p{L}/u.test(tok)) return false;

    // Must start with a letter or a combining mark (letters preferred)
    if (!/^[\p{L}\p{M}]/u.test(tok)) return false;

    // Must end with a letter/mark or (for initials) a period
    if (!/[\p{L}\p{M}\.]$/u.test(tok)) return false;

    // Only allowed characters inside a token
    if (!tokenChars.test(tok)) return false;

    // Disallow consecutive connector punctuation like "--", "''", "..", "··", etc.
    if (consecutivePunct.test(tok)) return false;
  }

  return true;
}

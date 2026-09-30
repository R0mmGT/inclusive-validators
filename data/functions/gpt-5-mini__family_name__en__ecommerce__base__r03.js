function validate(name) {
  // Basic type and trimming
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 60) return false; // non-empty, reasonable max length

  // Must contain at least one letter (supports all Unicode letters)
  if (!/\p{L}/u.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - Dash punctuation (\p{Pd}) to accept various hyphen/dash characters
  // - ASCII apostrophe ' and right single quote ’ (U+2019)
  // - Space
  const allowed = /^[\p{L}\p{M}\p{Pd}'\u2019 ]+$/u;
  if (!allowed.test(s)) return false;

  // Disallow leading or trailing separators (space, dash, apostrophe)
  const sepEdges = /^[\p{Pd}'\u2019 ]|[\p{Pd}'\u2019 ]$/u;
  if (sepEdges.test(s)) return false;

  // Disallow consecutive separators (space/dash/apostrophe) of length 2 or more
  const consecutiveSep = /(?:[\p{Pd}'\u2019 ]){2,}/u;
  if (consecutiveSep.test(s)) return false;

  return true;
}

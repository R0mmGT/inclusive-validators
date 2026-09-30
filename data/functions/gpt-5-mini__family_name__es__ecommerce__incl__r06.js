function validate(s) {
  // Validate input type and basic trimming
  if (typeof s !== 'string') return false;
  s = s.trim();
  if (s.length === 0) return false;

  // Limit by code points to avoid extremely long input (adjustable)
  const maxCodePoints = 100;
  if ([...s].length > maxCodePoints) return false;

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - Single separators between name parts: space, middle dot (·), any Unicode dash (\p{Pd}),
  //   and several common apostrophe/prime characters (', ’, ‘, ʼ, ʽ)
  //
  // This pattern enforces:
  // - Each name "part" is one or more letters/marks
  // - Parts may be joined by single allowed separators (no consecutive separators)
  // - No digits or other punctuation are permitted
  const re = /^[\p{L}\p{M}]+(?:[ \u00B7\p{Pd}\u0027\u2019\u2018\u02BC\u02BB][\p{L}\p{M}]+)*$/u;

  return re.test(s);
}

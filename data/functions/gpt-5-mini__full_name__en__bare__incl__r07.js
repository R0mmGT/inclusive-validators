function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 200) return false;

  // Allowed punctuation characters commonly used in names (hyphens, various dashes, apostrophes, dots, middle dot)
  const punctList = ['-', "'", '’', '‘', '\u00B7', '\u2010', '\u2011', '\u2012', '\u2013', '\u2014', '\u2015', '.'];
  const escapeForClass = ch => ch.replace(/[[\]\\/^$.|?*+(){}\-]/g, '\\$&');
  const escapedPunct = punctList.map(escapeForClass).join('');
  const punctClass = '[' + escapedPunct + ']';

  // Allowed overall characters: any Unicode letter or mark, whitespace, and our punctuation
  const allowedRe = new RegExp('^[\\p{L}\\p{M}\\s' + escapedPunct + ']+$', 'u');
  if (!allowedRe.test(name)) return false;

  // Must contain at least one letter
  if (!/\p{L}/u.test(name)) return false;

  // Must start and end with a letter or mark (no leading/trailing punctuation or spaces)
  if (!/^[\p{L}\p{M}]/u.test(name) || !/[\p{L}\p{M}]$/u.test(name)) return false;

  // Disallow consecutive punctuation characters like "--", "''", "..", "-.", etc.
  const consecutivePunctRe = new RegExp(punctClass + '{2,}', 'u');
  if (consecutivePunctRe.test(name)) return false;

  // Each whitespace-separated word must contain at least one letter after removing punctuation.
  const stripPunctRe = new RegExp(punctClass, 'gu');
  const parts = name.split(/\s+/);
  for (const part of parts) {
    const stripped = part.replace(stripPunctRe, '');
    if (!/\p{L}/u.test(stripped)) return false;
  }

  return true;
}

function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length < 3 || s.length > 100) return false; // sensible limits

  // reject multiple consecutive whitespace characters
  if (/\s{2,}/.test(s)) return false;

  const parts = s.split(' ');
  if (parts.length < 2) return false; // require at least first + last name

  // allow letters (any script), combining marks, common apostrophe/dash variants
  const tokenRe = /^[\p{L}\p{M}'\u2019\u02BC\-\u2010\u2011\u2012\u2013\u2014]+$/u;
  const consecutivePunctRe = /['\u2019\u02BC\-\u2010\u2011\u2012\u2013\u2014]{2,}/;
  const edgePunctRe = /^['\u2019\u02BC\-\u2010\u2011\u2012\u2013\u2014]|['\u2019\u02BC\-\u2010\u2011\u2012\u2013\u2014]$/;

  for (const part of parts) {
    if (!tokenRe.test(part)) return false;             // only allowed chars
    if (consecutivePunctRe.test(part)) return false;   // no consecutive apostrophes/dashes
    if (edgePunctRe.test(part)) return false;          // cannot start or end with punctuation

    // count actual letters in the part (ignore apostrophes/dashes)
    const lettersOnly = part.replace(/[^\p{L}\p{M}]/gu, '');
    if (lettersOnly.length < 2) return false; // each name-piece must have at least 2 letters
  }

  return true;
}

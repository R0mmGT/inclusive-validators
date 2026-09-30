function validate(name) {
  // Basic type/empty checks
  if (typeof name !== 'string') return false;
  let s = name.trim();
  if (s.length === 0) return false;

  // Normalize to NFC so combining marks are handled consistently
  if (typeof s.normalize === 'function') s = s.normalize('NFC');

  // Reasonable length check in code points (allows very short and very long names,
  // but caps to avoid abuse). Adjust max if needed.
  const cpLen = [...s].length;
  if (cpLen < 1 || cpLen > 100) return false;

  // Characters we accept as "internal punctuation" in names:
  // common apostrophes, middle dot, various dashes/hyphens.
  const apostrophes = "'\u2019\u02BC\u2018\u201B"; // ' ’ ʼ ‘ ‛
  const hyphens = "-\u2010\u2011\u2012\u2013\u2014\u2015"; // - and various dashes
  const middot = "\u00B7"; // ·
  const extra = "."; // allow period (with special handling below)
  const classChars = apostrophes + hyphens + middot;

  // Helper to escape special chars for a char class
  function escapeForClass(str) {
    return str.replace(/[-\\\]^]/g, '\\$&');
  }

  // Build a robust Unicode-aware regex if supported.
  // The pattern:
  //   ^Letter (Letter|Mark)* ( SeparatorToken Letter (Letter|Mark)* )* $
  // Where SeparatorToken is:
  //   - one of the punctuation characters (apostrophe, hyphen, middot)
  //   - a single space
  //   - a period (.) optionally followed by a single space (to allow "St. John")
  try {
    const letter = '\\p{L}';
    const mark = '\\p{M}';
    const punctuationClass = escapeForClass(classChars);
    // Note: space is handled explicitly; dot is allowed optionally followed by a space.
    const sepGroup = `(?:[${punctuationClass}]| |\\.(?: )?)`;
    const pattern = `^${letter}[${letter}${mark}]*(?:${sepGroup}${letter}[${letter}${mark}]*)*$`;
    const re = new RegExp(pattern, 'u');
    return re.test(s);
  } catch (e) {
    // Fallback for environments without Unicode property escapes.
    // This fallback includes many common script ranges plus combining marks.
    // It is intentionally broad but still excludes digits and most symbols.
    const letterRanges =
      // Latin, Latin Extended
      '\\u0041-\\u005A\\u0061-\\u007A\\u00C0-\\u024F' +
      // Greek
      '\\u0370-\\u03FF' +
      // Cyrillic
      '\\u0400-\\u04FF' +
      // Armenian
      '\\u0530-\\u058F' +
      // Hebrew
      '\\u0590-\\u05FF' +
      // Arabic
      '\\u0600-\\u06FF' +
      // Devanagari (Indic example)
      '\\u0900-\\u097F' +
      // Hangul
      '\\uAC00-\\uD7AF' +
      // CJK Unified Ideographs
      '\\u4E00-\\u9FFF';
    const markRanges = '\\u0300-\\u036F\\u1AB0-\\u1AFF\\u1DC0-\\u1DFF'; // combining marks (partial)
    const punctuationClassEsc = escapeForClass(classChars);
    const sepGroupFb = `(?:[${punctuationClassEsc}]| |\\.(?: )?)`;
    const patternFb = `^[${letterRanges}][${letterRanges}${markRanges}]*` +
                      `(?:${sepGroupFb}[${letterRanges}][${letterRanges}${markRanges}]*)*$`;
    const reFb = new RegExp(patternFb);
    return reFb.test(s);
  }
}

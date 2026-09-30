function validate(name) {
  // Inclusive full-name validator for many cultures and scripts.
  // Returns true if `name` looks like a plausible personal full name, false otherwise.
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;
  if (s.length > 256) return false; // defensive maximum

  // Must include at least one Unicode letter
  if (!/\p{L}/u.test(s)) return false;

  // Reject if any digits are present
  if (/\p{N}/u.test(s)) return false;

  // Allowed overall characters: letters, combining marks, space separators,
  // dash punctuation, a few apostrophe-like characters, a few middle dots and the period.
  // If any other character appears, reject early.
  const allowedOverall = /^[\p{L}\p{M}\p{Zs}\p{Pd}\u0027\u2019\u02BC\u02BB\u00B7\u2027\u0387\.]+$/u;
  if (!allowedOverall.test(s)) return false;

  // Helper predicates for codepoints (works with full Unicode code points).
  const isLetterOrMark = ch => /\p{L}/u.test(ch) || /\p{M}/u.test(ch);
  const isSpaceSep = ch => /\p{Zs}/u.test(ch);
  const isDash = ch => /\p{Pd}/u.test(ch);
  const isApost = ch => ch === "'" || ch === "’" || ch === "\u02BC" || ch === "\u02BB";
  const isMiddleDot = ch => ch === "\u00B7" || ch === "\u2027" || ch === "\u0387";
  const isDot = ch => ch === '.';

  const chars = Array.from(s); // iterate by Unicode code points
  if (chars.length === 0) return false;

  // No leading/trailing spaces (we trimmed), ensure first/last are not connector-like except dot may end an initial
  // We'll validate character-by-character with context rules below.

  let seenLetter = false;
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const prev = i > 0 ? chars[i - 1] : undefined;
    const next = i + 1 < chars.length ? chars[i + 1] : undefined;

    if (isLetterOrMark(ch)) {
      seenLetter = true;
      continue;
    }

    if (isSpaceSep(ch)) {
      // No consecutive spaces
      if (i === 0 || i === chars.length - 1) return false; // can't start or end with space (trimmed usually avoids start/end)
      if (isSpaceSep(prev)) return false;
      // Space should separate name parts; it must not be next to a connector like apostrophe or dash on either side
      if (prev && (isApost(prev) || isDash(prev) || isMiddleDot(prev))) return false;
      if (next && (isApost(next) || isDash(next) || isMiddleDot(next))) return false;
      continue;
    }

    if (isDot(ch)) {
      // Dot is allowed as: an initial (e.g., "J." possibly followed by space) or as an intra-token dot
      // Require that it is immediately preceded by a letter/mark.
      if (!prev || !isLetterOrMark(prev)) return false;
      // Prevent two dots in a row
      if (next && isDot(next)) return false;
      // It's ok if next is a letter/mark, a space (initials), or end-of-string.
      if (next && !(isLetterOrMark(next) || isSpaceSep(next))) return false;
      continue;
    }

    if (isApost(ch) || isDash(ch)) {
      // Apostrophes and dashes should be used inside tokens ("O'Neill", "Jean-Claude").
      // They must be surrounded by letters/marks (no spaces next to them).
      if (!prev || !next) return false;
      if (!isLetterOrMark(prev) || !isLetterOrMark(next)) return false;
      continue;
    }

    if (isMiddleDot(ch)) {
      // Middle dots are sometimes used inside tokens (e.g., in some transliterations)
      // Accept it if it's between letters; optionally accept it if surrounded by spaces (less common).
      if (prev && next && isLetterOrMark(prev) && isLetterOrMark(next)) {
        continue;
      }
      // Allow "A · B" forms (with spaces around) as separators
      if (prev && next && isSpaceSep(prev) && isSpaceSep(next)) {
        return false; // "space·space" with no letters around is suspicious; reject
      }
      // Allow space · letter or letter · space (e.g., "Jean · Paul") only if there's a letter on one side and space on the other
      if ((prev && isLetterOrMark(prev) && next && isSpaceSep(next)) ||
          (next && isLetterOrMark(next) && prev && isSpaceSep(prev))) {
        continue;
      }
      return false;
    }

    // If reached here, character is disallowed (shouldn't happen due to allowedOverall, but be safe)
    return false;
  }

  if (!seenLetter) return false;

  // Additional simple heuristics:
  // - Prevent repeating connectors like "--" or "''" (mostly already guarded, but double-check)
  if (/[\p{Pd}\u0027\u2019\u02BC\u02BB\u00B7\u2027\u0387\.]{2,}/u.test(s)) return false;
  // - Prevent sequences of punctuation separated only by spaces (like "O ' Neil")
  if (/(?:[\p{Pd}\u0027\u2019\u02BC\u02BB\u00B7\u2027\u0387\.]\s+[\p{Pd}\u0027\u2019\u02BC\u02BB\u00B7\u2027\u0387\.])/u.test(s)) return false;

  return true;
}

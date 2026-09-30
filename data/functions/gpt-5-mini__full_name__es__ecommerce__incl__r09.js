function validate(name) {
  // Validates a full personal name in a culturally inclusive way.
  // - Accepts Unicode letters from any script (\p{L}) and combining marks (\p{M}).
  // - Allows common name punctuation: hyphens, apostrophes, middle dot.
  // - Allows initials (e.g. "J." "J K" "J.K.") and multi-part names.
  // - Rejects digits, emoji, and other symbols.
  // - Conservative length and part limits to avoid abuse.
  if (typeof name !== 'string') return false;

  // Normalize whitespace
  const s = name.trim().replace(/\s+/g, ' ');
  if (s.length === 0) return false;
  if (s.length > 200) return false; // reasonable upper bound for a name

  const parts = s.split(' ');
  if (parts.length > 12) return false; // most people won't have >12 name "words"

  // Define allowed punctuation characters (various hyphen & apostrophe variants + middle dot)
  const apostrophes = '\u0027\u2019\u2018\u201B\u2032'; // ' ’ ‘ ʼ ′
  const otherHyphens = '\u2010\u2011\u2012\u2013\u2014\u2015'; // various hyphen/dash chars
  const middot = '\u00B7';
  // Build a character class for separators; put an escaped ASCII hyphen first to avoid range issues.
  const sepClass = `[\\-${apostrophes}${otherHyphens}${middot}]`;

  // Patterns:
  // - namePiece: starts and ends with a letter (with optional marks), may contain separators between letter runs.
  // - initial: a single letter (with optional marks) optionally followed by a dot (e.g. "J" or "J.").
  // - initialsSequence: sequences like "J.K." (one or more single-letter + dot groups, no spaces).
  const namePieceRe = new RegExp(`^\\p{L}\\p{M}*(?:${sepClass}\\p{L}\\p{M}*)*$`, 'u');
  const initialRe = new RegExp(`^\\p{L}\\p{M}*\\.?$`, 'u');
  const initialsSeqRe = new RegExp(`^(?:\\p{L}\\p{M}*\\.){1,6}$`, 'u'); // allow up to 6 compact initials

  for (const part of parts) {
    if (part.length === 0) return false;
    if (part.length > 80) return false; // protect against extremely long single segments

    // Accept if the part is a normal name piece, a single-letter initial (with optional dot),
    // or a compact sequence of initials like "J.K.".
    if (namePieceRe.test(part) || initialRe.test(part) || initialsSeqRe.test(part)) {
      continue;
    }
    return false;
  }

  // Extra check: ensure there's at least one letter somewhere (should be guaranteed by the regexes)
  if (!/\p{L}/u.test(s)) return false;

  return true;
}

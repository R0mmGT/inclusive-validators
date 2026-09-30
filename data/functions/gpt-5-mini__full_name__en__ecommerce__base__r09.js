function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length < 2 || s.length > 100) return false;

  // Split on any whitespace (collapse multiple spaces)
  const parts = s.split(/\s+/);
  if (parts.length < 2) return false; // require at least first + last name

  // Unicode-aware regex pieces
  const letterOrMark = '\\p{L}\\p{M}';
  const apostrophes = "'\u2019";
  const allowedCharsRe = new RegExp(`^[${letterOrMark}${apostrophes}\\.\\-]+$`, 'u');
  const hasLetterRe = new RegExp(`[\\p{L}]`, 'u');
  const startsWithLetterRe = new RegExp(`^[\\p{L}]`, 'u');
  const endsWithLetterOrDotRe = new RegExp(`[\\p{L}]$|\\.$`, 'u');
  const consecutivePunctRe = new RegExp(`[${apostrophes}\\.\\-]{2,}`);

  for (const part of parts) {
    if (!part) return false; // reject empty parts (shouldn't happen with split but safe)
    // Only allow letters, combining marks, apostrophes, hyphen and dot
    if (!allowedCharsRe.test(part)) return false;
    // Must contain at least one letter
    if (!hasLetterRe.test(part)) return false;
    // Must start with a letter
    if (!startsWithLetterRe.test(part)) return false;
    // Must end with a letter or a dot (allow initials and common abbreviations)
    if (!endsWithLetterOrDotRe.test(part)) return false;
    // No consecutive punctuation like "--", "''", "..", "-'", etc.
    if (consecutivePunctRe.test(part)) return false;
    // No punctuation immediately before or after a hyphen/apostrophe (e.g., "-'" or "'-")
    if (/[^\p{L}\p{M}][\-\u2019']|[\-\u2019'][^\p{L}\p{M}]/u.test(part)) {
      // The above checks for punctuation adjacent to punctuation/other invalid chars
      // but allow letter-punct-letter patterns like O'Connor or Jean-Luc
      // We test conservatively and reject if punctuation is next to non-letter content.
      // Because allowedCharsRe already ensured characters are in allowed set,
      // this mainly catches cases like punctuation adjacency.
      // To avoid false positives, only treat adjacency of two punctuation chars as invalid:
      if (/[\-\u2019'][\.\-\u2019']|[\.\-\u2019'][\-\u2019']/.test(part)) return false;
    }
  }

  return true;
}

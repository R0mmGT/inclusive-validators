function validate(name) {
  // Basic type/trim/length checks
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;

  // Use code-point iteration so combined characters are handled correctly
  const chars = [...name];
  const length = chars.length;
  if (length > 50) return false; // sensible upper bound for a given name

  // Helpers using Unicode property escapes (u flag)
  const isLetter = ch => /\p{L}/u.test(ch);
  const isMark = ch => /\p{M}/u.test(ch); // combining marks
  const isDash = ch => ch === '-' || /\p{Pd}/u.test(ch);
  const isApostrophe = ch => ch === "'" || ch === "\u2019" || ch === "\u2018";
  const isMiddleDot = ch => ch === '\u00B7';
  const isSpace = ch => ch === ' ';

  // Name must start and end with a letter
  if (!isLetter(chars[0]) || !isLetter(chars[length - 1])) return false;

  let prevWasSeparator = false;
  for (let i = 0; i < length; i++) {
    const ch = chars[i];

    if (isLetter(ch)) {
      prevWasSeparator = false;
      continue;
    }

    if (isMark(ch)) {
      // combining marks must follow a letter or another mark (attached to a base letter)
      if (i === 0) return false;
      const prev = chars[i - 1];
      if (!isLetter(prev) && !isMark(prev)) return false;
      prevWasSeparator = false;
      continue;
    }

    const isSeparator = isDash(ch) || isApostrophe(ch) || isMiddleDot(ch) || isSpace(ch);
    if (isSeparator) {
      // separators cannot be at ends (already checked start/end) nor be consecutive,
      // and must be surrounded by letters (next must be a letter)
      if (prevWasSeparator) return false;
      if (i === length - 1) return false;
      const next = chars[i + 1];
      if (!isLetter(next)) return false;
      prevWasSeparator = true;
      continue;
    }

    // Any other character (digits, symbols, punctuation) is not allowed
    return false;
  }

  return true;
}

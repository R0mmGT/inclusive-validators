function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const str = address.trim();

  // Must be a reasonable length for a street address line
  if (str.length < 3 || str.length > 200) return false;

  // Must be a single line (no newlines)
  if (/[\r\n]/.test(str)) return false;

  // Reject strings containing Unicode control characters or unassigned code points
  // \p{C} matches control, format, surrogate, private-use, and unassigned
  if (/\p{C}/u.test(str)) return false;

  // Must contain at least one letter or number (covers virtually all scripts)
  if (!/[\p{L}\p{N}]/u.test(str)) return false;

  // Reject obviously junky sequences of punctuation/symbols (e.g. "------" or "!!!!!!!")
  if (/[\p{P}\p{S}]{6,}/u.test(str)) return false;

  // Reasonable characters are allowed across cultures: letters, marks, numbers, punctuation, symbols and spaces.
  // If it passes the checks above we consider it a valid address line.
  return true;
}

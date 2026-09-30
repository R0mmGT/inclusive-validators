function validate(line) {
  // Basic type and trimming
  if (typeof line !== 'string') return false;
  line = line.trim();
  if (line.length < 3 || line.length > 100) return false;

  // Allowed characters: letters, digits, space and common address punctuation
  // (period, comma, hash, hyphen, slash, apostrophe, parentheses, ampersand)
  var allowedRe = /^[A-Za-z0-9\s\.,#\-/\'\(\)&]+$/;
  if (!allowedRe.test(line)) return false;

  // Must contain at least one letter (street name or PO BOX etc.)
  if (!/[A-Za-z]/.test(line)) return false;

  // Must contain a digit (street number, box number, apartment number).
  // Accept explicit "PO BOX" even if someone omitted a number (rare).
  var hasDigit = /\d/.test(line);
  var isPoBoxOnly = /\bP\.?\s*O\.?\s*BOX\b/i.test(line) && !hasDigit;
  if (!hasDigit && !isPoBoxOnly) return false;

  // Can't start or end with punctuation characters that would be odd in an address
  if (/^[\.,\-\/'&\)]/.test(line) || /[\.,\-\/'&\(\)]$/.test(line)) return false;

  // Disallow long runs of punctuation (e.g., "Main --- St")
  if (/[,\.\-\/]{3,}/.test(line)) return false;

  // Disallow control characters or multiple consecutive weird whitespace (more than 4 spaces)
  if (/[\x00-\x1F\x7F]/.test(line) || /\s{5,}/.test(line)) return false;

  return true;
}

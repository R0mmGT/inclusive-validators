function validate(line) {
  // Basic type and trimming
  if (typeof line !== 'string') return false;
  const s = line.trim();

  // Reasonable length limits for an address line (allow long international addresses)
  if (s.length < 2 || s.length > 200) return false;

  // Must contain at least one letter or number (Unicode-aware)
  // This accepts letters from any script and any numeric characters.
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Disallow control characters (including newlines) and C1 controls
  if (/[\u0000-\u001F\u007F-\u009F]/.test(s)) return false;

  // Disallow characters commonly used for markup or that pose injection risks in forms.
  // Angle brackets, curly braces and vertical bar are excluded. (Keep common address
  // punctuation like /, \, #, -, . and commas allowed.)
  if (/[<>|{}]/.test(s)) return false;

  // Reject very long runs of the same punctuation or symbol (e.g. "!!!!" or "----")
  // Capture any non-letter/number/space character repeated 4 or more times.
  if (/(?:([^\p{L}\p{N}\s])\1{3,})/u.test(s)) return false;

  // Reject absurdly long runs of non-alphanumeric non-space characters
  // (e.g. "######^^^^^^" or "///////"), allow up to 5 in a row but not 6+
  if (/[^\p{L}\p{N}\s]{6,}/u.test(s)) return false;

  // If all checks passed, consider it a plausible international street address line
  return true;
}

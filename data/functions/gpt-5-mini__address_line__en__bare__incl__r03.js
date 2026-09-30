function validate(address) {
  // Very permissive, Unicode-aware street/address line validation.
  // Accepts letters, numbers, punctuation, symbols and spaces from any script,
  // but rejects obvious non-address inputs (control chars, HTML/URLs/emails,
  // excessive punctuation noise, and extremely short/long strings).
  if (typeof address !== 'string') return false;

  const s = address.trim();

  // Reasonable length bounds for a single address line
  if (s.length < 3 || s.length > 200) return false;

  // Reject control characters (newlines, nulls, etc.)
  if (/[\u0000-\u001F\u007F]/.test(s)) return false;

  // Reject obvious non-address content: emails/URLs and angle brackets
  if (/@|mailto:|https?:\/\/|ftp:\/\//i.test(s)) return false;
  if (/[<>]/.test(s)) return false;

  // Must contain at least one letter or number from any script
  if (!/\p{L}|\p{N}/u.test(s)) return false;

  // Allow letters, marks, numbers, punctuation, symbols and separator spaces only
  // (covers virtually all characters used in international addresses)
  if (!/^[\p{L}\p{M}\p{N}\p{P}\p{S}\p{Zs}]+$/u.test(s)) return false;

  // Disallow long runs of non-alphanumeric noise (4+ consecutive punctuation/symbols)
  if (/([^\p{L}\p{N}\p{Zs}]){4,}/u.test(s)) return false;

  // Disallow very long repetition of the same character (5+ times)
  if (/(.)\1{4,}/u.test(s)) return false;

  return true;
}

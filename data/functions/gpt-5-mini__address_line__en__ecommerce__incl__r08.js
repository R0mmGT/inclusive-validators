function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const s = address.trim();

  // Length constraints (too short unlikely to be a street line; very long is suspicious)
  if (s.length < 3 || s.length > 100) return false;

  // Reject strings made only of punctuation/symbols/spaces
  if (/^[\p{P}\p{S}\s]+$/u.test(s)) return false;

  // Reject control characters
  if (/[\u0000-\u001F\u007F]/.test(s)) return false;

  // Reject likely emails or URLs
  if (/\S+@\S+\.\S+/.test(s)) return false;
  if (/(https?:\/\/|www\.)/i.test(s)) return false;

  // Require at least one letter/ideograph from any script (most street lines include a word)
  if (!/\p{L}/u.test(s)) return false;

  // Ensure there's a reasonable proportion of letters/digits vs punctuation (avoid things like "!!!###")
  const lettersDigitsCount = (s.match(/[\p{L}\p{N}]/gu) || []).length;
  if (lettersDigitsCount / s.length < 0.35) return false;

  // Reject extremely repetitive sequences (e.g., "aaaaaa" or "------")
  if (/(.)\1{5,}/u.test(s)) return false;

  // Reject strings that are clearly just numeric sequences (likely postal codes or phone numbers)
  // but allow numbers when combined with letters (e.g., "221B Baker St", "PO Box 123")
  if (/^\d+$/.test(s)) return false;

  // Looks good for a wide variety of international address lines
  return true;
}

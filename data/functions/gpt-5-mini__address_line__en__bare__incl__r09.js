function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length < 3 || s.length > 200) return false;

  // Disallow invisible/control characters
  if (/[\p{C}]/u.test(s)) return false;

  // Must contain at least one letter or number (Unicode-aware)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Reject obvious emails
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return false;

  // Reject explicit URLs
  if (/^(?:https?:\/\/|\/\/|www\.)/i.test(s)) return false;

  // Reject if the whole string looks like a domain (no spaces, contains a dot + TLD-like part)
  if (/^[^\s]+\.[^\s]{2,}$/u.test(s)) return false;

  // Reject strings made of a single repeated character
  {
    const chars = new Set([...s]);
    if (chars.size === 1) return false;
  }

  // Reject very long runs of the same character (likely abusive or not an address)
  if (/(.)\1{5,}/u.test(s)) return false;

  // Reject excessive consecutive punctuation/symbol characters
  if (/[\p{P}\p{S}]{5,}/u.test(s)) return false;

  // Avoid angle-bracketed content (injection/HTML fragments)
  if (/[<>]/.test(s)) return false;

  // Passed basic heuristic checks — accept as a plausible international street address line
  return true;
}

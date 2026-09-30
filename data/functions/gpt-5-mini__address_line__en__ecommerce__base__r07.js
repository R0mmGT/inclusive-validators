function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const s = address.trim();
  // Reasonable length limits for a single address line
  if (s.length < 3 || s.length > 100) return false;
  // No newlines or control characters allowed
  if (/[\r\n\t]/.test(s)) return false;

  // Allow letters (including many accented letters), digits, spaces and common punctuation used in addresses.
  // Disallow characters that are likely unsafe or invalid in an address (e.g. < > = @ $ % * ; : ? !)
  const allowed = /^[A-Za-z0-9\u00C0-\u024F\s\-\.\,\#\&\/\(\)']+$/u;
  if (!allowed.test(s)) return false;

  // Must contain at least one digit (house/box/unit number) and at least one letter (street name)
  if (!/[0-9]/.test(s)) return false;
  if (!/[A-Za-z\u00C0-\u024F]/.test(s)) return false;

  // Reject tokens that are unrealistically long (probably user pasted unrelated content)
  if (s.split(/\s+/).some(tok => tok.length > 50)) return false;

  // Basic PO Box pattern should include a number (already enforced by digit check),
  // so no special-case handling is needed beyond the checks above.

  return true;
}

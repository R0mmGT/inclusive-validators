function validate(address) {
  // Basic type check
  if (typeof address !== 'string') return false;

  // Trim surrounding whitespace (but preserve internal whitespace)
  const str = address.trim();

  // Reasonable length limits for an address line (allow long international addresses)
  if (str.length < 3 || str.length > 200) return false;

  // Reject control characters and new lines (single-line input expected)
  if (/[\r\n\t\0\x0B]/.test(str)) return false;

  // Reject angle brackets which are often used in markup/injection contexts
  if (/[<>]/.test(str)) return false;

  // Must contain at least one letter or number from any script
  if (!/[\p{L}\p{N}]/u.test(str)) return false;

  // Allow:
  // - letters (\p{L}), numbers (\p{N}), combining marks (\p{M})
  // - punctuation (\p{P}), symbols (\p{S})
  // - normal space and common Unicode space characters
  // This is intentionally permissive to accommodate global address formats.
  const allowed = /^[\p{L}\p{N}\p{M}\p{P}\p{S} \u00A0\u2000-\u200A\u202F\u205F\u3000]+$/u;
  if (!allowed.test(str)) return false;

  // Reject addresses that are only punctuation/symbols (redundant because of letter/number check above)
  // Additional heuristic: avoid strings that are just a sequence of the same short token like "----" or "...."
  if (/^[\p{P}\p{S}]+$/u.test(str)) return false;
  if (/^(.)\1{3,}$/.test(str)) return false; // same character repeated 4+ times

  return true;
}

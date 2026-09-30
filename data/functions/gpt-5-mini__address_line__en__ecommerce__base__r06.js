function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const s = address.trim();

  // Reasonable length limits for an address line
  if (s.length < 3 || s.length > 100) return false;

  // Disallow control characters
  if (/[\u0000-\u001f\u007f]/.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L})
  // - Unicode numbers (\p{N})
  // - space and common punctuation used in addresses: . , - / # ' & ( ) : ; @
  // Note: uses the 'u' flag for Unicode property escapes
  const allowedRe = /^[\p{L}\p{N}\s\.,\-\/#'&()@:;]+$/u;
  if (!allowedRe.test(s)) return false;

  // Must contain at least one letter or number
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Disallow an address that's only numbers (e.g. "12345") - usually incomplete
  if (/^\p{N}+$/u.test(s)) return false;

  // Don't allow starting or ending with punctuation (common sense)
  if (/^[\.,\-\/#'&()@:;]/.test(s) || /[\.,\-\/#'&()@:;]$/.test(s)) return false;

  // Prevent obvious noisy inputs: three or more identical punctuation chars in a row
  if (/([.,\-\/#'&()@:;])\1\1/.test(s)) return false;

  // Prevent runs of punctuation characters (non alnum) longer than 2
  if (/([^\p{L}\p{N}\s]){3,}/u.test(s)) return false;

  return true;
}

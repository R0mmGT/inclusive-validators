function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding regular spaces (but allow internal no-break spaces if present)
  name = name.trim();
  if (name.length === 0) return false;

  // Reasonable maximum to avoid pathological inputs
  if (name.length > 100) return false;

  // Separator characters commonly found in family names:
  // regular space U+0020, no-break space U+00A0,
  // basic hyphen-minus and Unicode dash range U+2010–U+2015,
  // ASCII apostrophe, left/right single quotation marks, interpunct, and period.
  const sepChars = "\\u0020\\u00A0\\-\\u2010-\\u2015'\\u2018\\u2019\\u00B7\\.";

  // Build a Unicode-aware regex:
  // - Start with a letter \p{L}
  // - Allow further letters/combining marks \p{L}\p{M} in the token
  // - Allow repeated groups of (single allowed separator + a token of letters/marks)
  // This prevents leading/trailing separators and consecutive separators.
  const pattern = "^[\\p{L}][\\p{L}\\p{M}]*(?:[" + sepChars + "][\\p{L}\\p{M}]+)*$";
  const re = new RegExp(pattern, "u");

  return re.test(name);
}

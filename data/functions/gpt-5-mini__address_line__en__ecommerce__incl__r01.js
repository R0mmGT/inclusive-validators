function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const str = address.trim();

  // Reasonable length limits for a single address line
  if (str.length < 3 || str.length > 200) return false;

  // Disallow control characters, newlines, angle brackets (avoid HTML), and obvious URLs
  if (/[<>\\\r\n]/.test(str)) return false;
  if (/https?:\/\//i.test(str)) return false;

  // Must contain at least one letter or digit (covers all scripts with Unicode property escapes)
  if (!/[\p{L}\p{N}]/u.test(str)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}), numbers (\p{N}), combining marks (\p{M})
  // - Space separators (\p{Zs})
  // - A conservative set of punctuation/symbol characters commonly found in addresses
  //   (commas, dots, slashes, hashes, colons, semicolons, quotes, parentheses, brackets,
  //    ampersand, plus, percent, various dash characters, degree/ordinal/numero signs, middle dot)
  // This keeps the validator permissive for global addresses but avoids broad symbol/emoji categories.
  const allowedRe = /^[\p{L}\p{N}\p{M}\p{Zs}\-\/,#\.:;'\u2019"\(\)\[\]\{\}&+\%·º°№–—‑]+$/u;
  if (!allowedRe.test(str)) return false;

  // Disallow long runs of non-alphanumeric characters (e.g. "////" or "!!!"), allow up to 2 in a row
  if (/[^ \p{L}\p{N}]{3,}/u.test(str)) return false;

  // Disallow a single character repeated many times (e.g. "aaaaaa" or "------")
  if (/^(.)\1{4,}$/.test(str)) return false;

  // Looks good
  return true;
}

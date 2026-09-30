function validate(postal) {
  // Return false for non-strings or empty input
  if (typeof postal !== 'string') return false;
  var s = postal.trim();
  if (!s) return false;

  // Common postal / ZIP formats for many countries.
  // The list below is not exhaustive but covers many typical cases.
  var patterns = [
    // United States: 12345 or 12345-6789
    /^\d{5}(?:-\d{4})?$/,

    // Canada: A1A 1A1 (space optional)
    /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/,

    // United Kingdom (reasonably permissive): outward + inward (space optional)
    /^([Gg][Ii][Rr]\s?0[Aa]{2}|[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2})$/,

    // Germany, France, Italy, Spain, many others: 5 digits
    /^\d{5}$/,

    // Australia: 4 digits
    /^\d{4}$/,

    // Netherlands: 1234 AB (space optional)
    /^\d{4}\s?[A-Za-z]{2}$/i,

    // Japan: 123-4567
    /^\d{3}-\d{4}$/,

    // Russia: 6 digits
    /^\d{6}$/,

    // Portugal: 1234-567
    /^\d{4}-\d{3}$/,

    // Ireland (Eircode-like, simplified): A65 F4E2
    /^[A-Za-z]\d{2}\s?[A-Za-z0-9]{4}$/i,

    // Poland: 12-345
    /^\d{2}-\d{3}$/,

    // Generic fallback: alphanumeric with optional spaces/hyphens,
    // between 3 and 10 characters (must start/end with alnum)
    /^[A-Za-z0-9][A-Za-z0-9\s-]{1,8}[A-Za-z0-9]$/
  ];

  for (var i = 0; i < patterns.length; i++) {
    if (patterns[i].test(s)) return true;
  }
  return false;
}

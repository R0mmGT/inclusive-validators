function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  const s = name.trim();

  // Reject empty or excessively long names (tunable; 200 chars is generous)
  if (s.length === 0 || s.length > 200) return false;

  // Name part:
  // - Must start with a Unicode letter (\p{L}) and may have combining marks (\p{M})
  // - May include internal connectors like apostrophe, hyphen, period, middle dot, etc.
  // - Connectors must be followed by a letter (prevents consecutive punctuation)
  // - A single trailing period is allowed to permit initials (e.g. "J." or "J.R.R.")
  //
  // The overall pattern allows one or more such parts separated by whitespace.
  const connectorChars = "\\'’\\-\\.\\u00B7\\u0387\\u2027\\u2219"; // common name connectors
  const part = "\\p{L}\\p{M}*(?:[" + connectorChars + "]\\p{L}\\p{M}*)*\\.?";
  const full = new RegExp("^" + part + "(?:\\s+" + part + ")*$", "u");

  return full.test(s);
}

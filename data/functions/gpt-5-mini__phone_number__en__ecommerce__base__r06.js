function validate(input) {
  const s = String(input).trim();
  // Accepts US phone numbers with optional country code 1, optional parentheses around area code,
  // and optional spaces or hyphens as separators.
  const re = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-])?\d{3}([\s-])?\d{4}$/;
  return re.test(s);
}

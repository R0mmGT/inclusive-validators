function validate(str) {
  if (typeof str !== 'string') return false;
  str = str.trim();
  // Matches optional country code "1", optional space after it,
  // then either (###) or ### for area code, optional separator (space or dash),
  // then 3 digits, optional separator, then 4 digits.
  const re = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-])?\d{3}([\s-])?\d{4}$/;
  return re.test(str);
}

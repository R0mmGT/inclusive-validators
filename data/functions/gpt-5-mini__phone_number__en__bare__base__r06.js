function validate(str) {
  // Accepts optional leading "1" with optional space, then either (ddd) or ddd,
  // optionally separated by space or hyphen, followed by 3 digits, optional separator, then 4 digits.
  return /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/.test(str);
}

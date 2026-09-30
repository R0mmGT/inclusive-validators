function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  // Normalize Unicode full-width characters (e.g., Japanese Zenkaku) to ASCII
  // and convert Eastern Arabic / Persian digits to standard Western Arabic numerals
  const normalized = postalCode
    .normalize('NFKC')
    .replace(/[\u0660-\u0669]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48))
    .replace(/[\u06F0-\u06F9]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 48))
    .trim();

  // Postal codes generally fall within 2 to 16 characters including separators
  if (normalized.length < 2 || normalized.length > 16) {
    return false;
  }

  // Must consist of alphanumeric segments separated by a single space or hyphen
  // e.g., "90210", "SW1A 1AA", "K1A 0B1", "100-0001", "D-10115", "1012 JS"
  if (!/^[A-Za-z0-9]+([ -][A-Za-z0-9]+)*$/.test(normalized)) {
    return false;
  }

  // Extract pure alphanumeric characters
  const alnum = normalized.replace(/[^A-Za-z0-9]/g, '');

  // Worldwide postal codes contain between 2 and 10 characters (up to 12 with optional country-code prefixes)
  if (alnum.length < 2 || alnum.length > 12) {
    return false;
  }

  // All standardized postal systems internationally include at least one digit
  if (!/\d/.test(alnum)) {
    return false;
  }

  return true;
}

function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  // reasonable length limits for an address line
  if (s.length < 3 || s.length > 100) return false;

  // Allowed characters: letters (including Unicode), digits, spaces and common punctuation for addresses
  const allowed = /^[\p{L}0-9\s\.\-\,\'\#\/\&\(\)\:\;]+$/u;
  if (!allowed.test(s)) return false;

  // Must contain at least one letter (street name)
  if (!/\p{L}/u.test(s)) return false;

  // Typically an address contains a number (street number). Accept also PO Box forms.
  if (!/\d/.test(s)) {
    const poBox = /\bP\.?\s*O\.?\s*BOX\b/i;
    const boxOnly = /\bBOX\b/i;
    if (!poBox.test(s) && !boxOnly.test(s)) return false;
  }

  // Reject improbable inputs with long runs of punctuation (e.g. "!!!", "----", "###")
  if (/[^\p{L}0-9\s]{3,}/u.test(s)) return false;

  // Reject inputs that are obviously not addresses (e.g. just a single word with no digits or PO/BOX)
  // (We already require a letter and either a digit or PO/BOX, so this is covered.)

  return true;
}

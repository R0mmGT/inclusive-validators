function validate(line) {
  if (typeof line !== 'string') return false;
  const s = line.trim();
  if (s.length < 3 || s.length > 200) return false;

  // Must contain at least one letter (including common Spanish accents and ñ)
  if (!/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(s)) return false;

  // Only allow a reasonable set of characters commonly found in street addresses
  // (letters, digits, spaces and common punctuation used in addresses).
  if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s\.\-\,\/\#ºª\(\)'\u00B7]+$/.test(s)) return false;

  // Common "sin número" variants
  const snPattern = /\b(?:s\/n|sn|s\.n\.|sin(?:\s*n(?:ú|u)?mero)?|sin\s*nº|sin\s*número)\b/i;
  if (snPattern.test(s)) return true;

  // Number at the end (typical Spanish format: "... 12", "... , 12B", "... 12-14 1ºA", etc.)
  const numAtEnd = /(?:,\s*|\s+)\d{1,4}(?:[-\/]\d{1,4})?(?:\s*[ºª]?[A-Za-z]?){0,2}\s*$/;
  if (numAtEnd.test(s)) return true;

  // Or number at the start (some formats put number before the street name: "123 Calle Mayor")
  const numAtStart = /^\s*\d{1,4}(?:[-\/]\d{1,4})?(?:\s*[ºª]?[A-Za-z]?){0,2}\s+/;
  if (numAtStart.test(s)) return true;

  // Otherwise, not considered a valid street line (we require either a number or s/n)
  return false;
}

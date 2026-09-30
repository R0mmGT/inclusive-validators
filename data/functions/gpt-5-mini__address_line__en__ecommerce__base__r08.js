function validate(addr) {
  if (typeof addr !== 'string') return false;
  addr = addr.trim();
  if (addr.length < 3 || addr.length > 100) return false;

  // Require at least one letter (supports international letters)
  if (!/\p{L}/u.test(addr)) return false;

  // Common PO Box forms: "PO Box 123", "P.O. Box 123", "Post Office Box 123"
  const poBoxRe = /^\s*(?:P\.?\s*O\.?\s*Box|Post\s+Office\s+Box)\s+[A-Za-z0-9\-]+(?:[,\s]+[A-Za-z0-9\-\s]+)?\s*$/iu;

  // Typical street address: number (with optional suffix) + street name
  // Allows apartment/unit/suite at the end (e.g. ", Apt 4", ", Suite 200", " #5")
  // Accepts international letters and common punctuation used in addresses.
  const streetRe = /^\s*\d+[A-Za-z0-9\-\/]*\s+[\p{L}0-9'’\.\-\,\/\#\&\(\)\s]+(?:,\s*(?:Apt|Apartment|Unit|Ste|Suite|#)\.?\s*[A-Za-z0-9\-]+)?\s*$/iu;

  return poBoxRe.test(addr) || streetRe.test(addr);
}

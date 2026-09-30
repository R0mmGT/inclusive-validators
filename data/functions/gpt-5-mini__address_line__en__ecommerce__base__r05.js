function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim().replace(/\s+/g, ' ');
  if (s.length < 3 || s.length > 120) return false;

  // PO Box patterns: "PO Box 123", "P.O. Box 123", "Post Office Box 123"
  const poBox = /^(?:P\.?\s*O\.?\s*Box|Post(?:al)?\s+Office\s+Box)\s+\d+[A-Za-z0-9\-]*$/i;

  // Street address pattern:
  // - Starts with number (may have letter suffix like 123B, or range like 123-125)
  // - Optional directional prefix (N, S, E, W)
  // - At least one street name token (letters, numbers, ' & . -)
  // - Optional street type (St, Street, Rd, Rd., Ave, etc.)
  // - Optional unit designator at end (Apt, Suite, Unit, #)
  const street = /^\d+[A-Za-z]?(?:[-\/]\d+)?\s+(?:[NnSsEe]\.?\s*)?(?:[A-Za-z0-9][A-Za-z0-9'&\.\-]*\s+){1,}(?:Street|St|Road|Rd|Avenue|Ave|Boulevard|Blvd|Lane|Ln|Way|Drive|Dr|Court|Ct|Circle|Cir|Terrace|Ter|Place|Pl|Row|Trail|Trl|Pike|Commons|Square|Sq|Highway|Hwy|Alley|Aly|Broadway)?(?:\s*(?:Apt|Apartment|Suite|Ste|Unit|#)\.?\s*[A-Za-z0-9\-]+)?$/i;

  return poBox.test(s) || street.test(s);
}

function validate(line) {
  if (typeof line !== 'string') return false;
  const s = line.trim();
  if (s.length < 3 || s.length > 100) return false;

  // Reject obvious non-address content
  if (/[<>@]/.test(s) || /https?:\/\//i.test(s) || /\bwww\./i.test(s)) return false;

  // PO Box patterns (accept "PO Box 123", "P.O. Box 123", "Post Office Box 123", "Box 123")
  const poBoxRegex = /^\s*(?:P\.?\s*O\.?|\bPOST\s+OFFICE\b)?\s*BOX\s+\d+\b.*$/i;
  if (poBoxRegex.test(s)) return true;

  // Numbered address:
  // - starts with a building number (allow simple fractions like "1/2" after a space or `-` or `/` components)
  // - followed by at least one word of street name (must include a letter)
  // - optional common unit designators at end (Apt, Suite, Unit, #, Fl, Bldg, etc.)
  const addrRegex = /^\s*
    \d+                                  # building number
    (?:                                   # optional ordinal/extension like "A", "-2", "/1" or " 1/2"
      [A-Za-z]|
      (?:[\/-]\d+[A-Za-z]?)|
      (?:\s+\d+\/\d+)
    )?
    \s+
    ([A-Za-z0-9'’.\-&]+(?:\s+[A-Za-z0-9'’.\-&]+){0,7})   # street name (1-8 words)
    (?:\s*,?\s*
      (?:Apt|Apartment|Unit|Suite|Ste|#|Floor|Fl|Rm|Room|Bldg|Building|Dept)\.?\s*[A-Za-z0-9-]+
    )?$
  `.replace(/\s+#.*$/gm, '').replace(/\n\s*/g, ''); // strip comments/whitespace for readability

  const re = new RegExp(addrRegex, 'i');
  const m = re.exec(s);
  if (!m) return false;

  // Ensure the captured street name has at least one alphabetic character (not just numbers/punctuation)
  if (!/[A-Za-z]/.test(m[1])) return false;

  return true;
}

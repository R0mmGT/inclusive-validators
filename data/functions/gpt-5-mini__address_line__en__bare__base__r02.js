function validate(line) {
  if (typeof line !== 'string') return false;
  const s = line.trim();
  if (s.length < 3 || s.length > 200) return false; // reasonable bounds

  // Accept PO Box variants like "PO Box 123", "P.O. Box 123", "Post Office Box 123"
  const poBoxRe = /^\s*(?:P\.?\s*O\.?|POST\s+OFFICE)\s+BOX\s+\d+\b(?:[,\s-]*[A-Za-z0-9]+)*\s*$/i;
  if (poBoxRe.test(s)) return true;

  // Typical street address: number + street name + optional street type + optional unit
  // - house number: 1-6 digits, optional range or fraction-ish forms (e.g. "123-125", "4B")
  // - directional optional (N, South, NE, etc.)
  // - street name: words starting with letters, may include digits, .'&- characters
  // - optional common street type (St, Ave, Rd, Blvd, etc.)
  // - optional unit designator (Apt, Suite, #, Unit, Fl, etc.) with identifier
  const addressRe = /^\s*
    \d{1,6}               # house number (1-6 digits)
    (?:[\/\-]\d{1,6})?    # optional range or fraction like -125 or /2
    (?:[A-Za-z])?         # optional single trailing letter (e.g. 4B)
    \s+
    (?:(?:N|S|E|W|NE|NW|SE|SW|North|South|East|West)\s+)?  # optional directional
    (?:[A-Za-z][A-Za-z0-9'&\.-]*)(?:\s+[A-Za-z][A-Za-z0-9'&\.-]*)*  # street name (one or more words)
    (?:\s+(?:Street|St\.?|Avenue|Ave\.?|Boulevard|Blvd\.?|Road|Rd\.?|Lane|Ln\.?|Drive|Dr\.?|Court|Ct\.?|Way|Terrace|Ter\.?|Place|Pl\.?|Circle|Cir\.?|Parkway|Pkwy\.?|Highway|Hwy\.?))?  # optional street type
    (?:\s*(?:,)?\s*(?:#|Apt\.?|Apartment|Suite|Ste\.?|Unit|Floor|Fl\.?|Dept\.?|Rm\.?|Room)\s*[-#\sA-Za-z0-9\/\.]*)?  # optional unit
    \s*$
  `.replace(/\s+#.*$/gm, '').replace(/\s+/g, ''); // remove inline comments/spaces for RegExp literal

  // Because we built the regex as a compact string, recreate the intended RegExp with the 'i' flag.
  // The above replace removes whitespace and comments, returning a dense pattern.
  try {
    const re = new RegExp(addressRe, 'i');
    return re.test(s);
  } catch (e) {
    // Fallback: very permissive check if regex building failed; ensure it has a number and letters
    return /^\s*\d+.*[A-Za-z].*$/.test(s);
  }
}

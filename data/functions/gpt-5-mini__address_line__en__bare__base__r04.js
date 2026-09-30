function validate(address) {
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length === 0 || s.length > 200) return false;

  // Regex enforces a common US-style street address line:
  // - Leading street number (1-6 digits, optional letter or -/fraction)
  // - Optional pre-direction (N, South, NE, etc.)
  // - Street name (words, allowing apostrophes, hyphens, periods)
  // - Street type (St, Street, Ave, Boulevard, Rd, Pkwy, Hwy, etc.)
  // - Optional post-direction
  // - Optional secondary unit (Apt, Suite, #, Unit, Floor, etc.)
  const re = /^\s*                             # allow leading whitespace
    \d{1,6}[A-Za-z]?                          # street number with optional letter
    (?:[-\/]\d+)?                             # optional dash/fraction (e.g. 12-34 or 12/1)
    \s+
    (?:(?:N|S|E|W|NE|NW|SE|SW|North|South|East|West)\.?\s+)?  # optional pre-direction
    [A-Za-z0-9]+(?:[ '\-\.][A-Za-z0-9]+)*     # street name (words, allowing ' - .)
    \s+
    (?:St|Street|Rd|Road|Ave|Avenue|Blvd|Boulevard|Dr|Drive|Ln|Lane|Way|Ct|Court|Cir|Circle|Ter|Terrace|Pl|Place|Pkwy|Parkway|Hwy|Highway|Rte|Route)\.?  # street type
    (?:\s+(?:N|S|E|W|NE|NW|SE|SW|North|South|East|West)\.?)?  # optional post-direction
    (?:\s*,\s*(?:#|Apt|Apartment|Ste|Suite|Unit|Floor|Fl|Dept)\.?\s*[A-Za-z0-9-]+)?  # optional secondary unit
    \s*$                                       # allow trailing whitespace
  `.replace(/\s+#.*$/gm, '')                   // strip inline comments for JS RegExp
    .replace(/\s+/g, '');                      // remove whitespace introduced for readability

  try {
    const regex = new RegExp(re, 'i');
    return regex.test(s);
  } catch (e) {
    // In case regex creation fails, be conservative and return false
    return false;
  }
}

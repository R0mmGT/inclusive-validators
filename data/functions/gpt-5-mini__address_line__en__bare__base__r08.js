function validate(address) {
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length < 3 || s.length > 100) return false;

  // Reject clearly invalid characters
  if (/[\u0000-\u001F<>{}\[\]|~`$^@%*\u2028\u2029]/.test(s)) return false;

  // Allow common characters used in addresses: letters, digits, spaces and these punctuation marks
  if (!/^[A-Za-z0-9\s\.\,\'\-\#\/\(\)\&]+$/.test(s)) return false;

  // Common street types
  const streetTypes = [
    "Street","St","Avenue","Ave","Boulevard","Blvd","Road","Rd","Lane","Ln",
    "Drive","Dr","Court","Ct","Terrace","Ter","Place","Pl","Way","Pkwy","Parkway",
    "Circle","Cir","Square","Sq","Highway","Hwy","Trail","Trl","Commons"
  ].join("|");

  // Directionals
  const dirs = "(?:N|S|E|W|NE|NW|SE|SW|North|South|East|West)";

  // PO Box forms: "PO Box 123", "P.O. Box 123", "Post Office Box 123"
  const poRe = /^(?:(?:P\.?\s*O\.?)|Post\s+Office)\s+Box\s+\d+[A-Za-z0-9\-]*$/i;

  // Numeric street address: e.g. "123 Main St", "12B N Main Street, Apt 4", "123-125 West St #4"
  const streetRe = new RegExp(
    "^\\d+[A-Za-z\\-\\/]*" +                                 // building number (allow 12B, 12-14, 12/14)
    "(?:\\s+" + dirs + ")?"+                                // optional pre-directional (N, North, etc)
    "\\s+[A-Za-z0-9\\.\\'\\-\\s]{1,60}" +                   // street name (words)
    "\\s+(?:" + streetTypes + ")\\b" +                      // street type (St, Ave, etc)
    "(?:\\s+" + dirs + ")?"+                                // optional post-directional
    "(?:[,#]?\\s*(?:Apt|Apartment|Suite|Ste|Unit|#|Floor|Fl|Rm|Room)\\.?\\s*\\w+)?$",
    "i"
  );

  // Non-numeric street-like addresses: e.g. "One Microsoft Way", "University Ave"
  // Require at least two words and a street type at the end
  const nonNumRe = new RegExp(
    "^[A-Za-z0-9\\.\\'\\-]{2,}(?:\\s+[A-Za-z0-9\\.\\'\\-]{1,})+\\s+(?:" + streetTypes + ")\\b" +
    "(?:\\s+" + dirs + ")?(?:[,#]?\\s*(?:Apt|Apartment|Suite|Ste|Unit|#|Floor|Fl|Rm|Room)\\.?\\s*\\w+)?$",
    "i"
  );

  if (poRe.test(s)) return true;
  if (streetRe.test(s)) return true;
  if (nonNumRe.test(s)) return true;

  return false;
}

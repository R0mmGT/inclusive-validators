function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  var s = address.trim().replace(/\s+/g, ' ');
  if (s.length < 3 || s.length > 100) return false;

  // Allow only common address characters
  if (!/^[A-Za-z0-9\s\.\,\-\'\#\/&]+$/.test(s)) return false;

  // Common PO Box forms
  if (/^(?:P\.?O\.?\s*Box|Post\s+Office\s+Box)\s*\d+(\s*[A-Za-z0-9\-]*)?$/i.test(s)) {
    return true;
  }

  // Build a flexible street-address pattern:
  // - starts with a house/building number (allowing suffixes like "12B" or ranges "12-14")
  // - optional directional (N,S,E,W,NE,...)
  // - street name (letters/digits and some punctuation)
  // - required street type (St, Street, Rd, Rd., Ave, Boulevard, etc.)
  // - optional directional after the street type
  // - optional unit (Apt, Unit, Ste, Suite, #)
  var streetType = '(?:St|Street|Rd|Road|Ave|Avenue|Blvd|Boulevard|Ln|Lane|Dr|Drive|Ct|Court|Pl|Place|Ter|Terrace|Cir|Circle|Pkwy|Parkway|Way|Loop|Trail|Trl|Sq|Square|Rte|Route)';
  var dir = '(?:N|S|E|W|NE|NW|SE|SW)';
  var unit = '(?:Apt|Unit|Ste|Suite|#)\\s*[A-Za-z0-9\\-]+';
  var streetNameClass = "[A-Za-z0-9\\s\\.\\-\\',\\/&]*";

  var pattern = new RegExp(
    '^' +
    '\\d+[A-Za-z0-9\\-\\/]*' +               // number, allow suffixes/ranges
    '(?:\\s+' + dir + '\\b\\.?)?' +          // optional directional after number
    '\\s+[A-Za-z0-9]' + streetNameClass +    // street name (must start with alnum)
    '\\s+' + streetType + '\\.?' +           // street type
    '(?:\\s+' + dir + '\\b\\.?)?' +          // optional directional after type
    '(?:\\s*,?\\s*' + unit + ')?' +          // optional unit
    '$',
    'i'
  );

  return pattern.test(s);
}

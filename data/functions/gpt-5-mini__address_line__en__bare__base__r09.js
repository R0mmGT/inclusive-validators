function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0 || s.length > 200) return false;
  // simple reject of control characters/newlines
  if (/[\r\n\t]/.test(s)) return false;

  // Normalize internal spaces
  const str = s.replace(/\s+/g, ' ');

  // PO Box patterns: "PO Box 123", "P.O. Box 123", "Post Office Box 123", "POB 123"
  const poBoxRegex = /^(?:P(?:\.?\s*O\.?)?|POB|Post\s+Office)\s+Box\s+\d+[A-Za-z]?(?:[-\/]\d+)?$/i;
  if (poBoxRegex.test(str)) return true;

  // Directionals
  const dir = '(?:N|S|E|W|NE|NW|SE|SW)\\.?';
  // Common street type tokens (abbreviations and full)
  const types = [
    'aly','alley','ave','avenue','blvd','boulevard','rd','road','st','street','ln','lane',
    'dr','drive','ct','court','pl','place','ter','terrace','cir','circle','pkwy','parkway',
    'way','trl','trail','hwy','highway','rte','route','sq','square','pass','path','walk'
  ].join('|');

  // Unit designators
  const units = '(?:#\\s*\\d+[A-Za-z]?|(?:apt|apartment|unit|suite|ste|bldg|building|floor|fl|dept|rm)\\.?\\s*\\w+)';

  // Number part: house number with optional letter suffix or fraction/range like 123-125 or 123A or 123 1/2
  const numberPart = '\\d{1,6}(?:[A-Za-z]|[\\-\\/\\s]\\d{1,4}|\\s+1\\/2)?';

  // Street name: allow letters, digits, apostrophes, hyphens, ampersand, and spaces. Ensure at least one letter.
  const streetNamePart = '(?=[A-Za-z].*)(?:[A-Za-z0-9\\u00C0-\\u024F\'’&\\.\\-]|\\s){1,100}?';

  // Build full regex:
  // - start with number
  // - optional prefix directional (123 N Main)
  // - street name (one or more words)
  // - optional street type (St, Street, etc.)
  // - optional suffix directional (Main St N)
  // - optional unit (", Apt 4" or "#4" etc.)
  const fullRegex = new RegExp(
    '^' +
      '\\s*' +
      '(' + numberPart + ')' + // 1: number
      '\\s+' +
      '(?:' + dir + '\\s+)?' + // optional prefix directional
      streetNamePart +
      '(?:\\s+(?:' + types + ')\\.?){0,1}' + // optional street type (allow 0 or 1)
      '(?:\\s+' + dir + ')?' + // optional suffix directional
      '(?:[\\s,\\-]*' + units + ')?' + // optional unit
      '\\s*$',
    'i'
  );

  if (!fullRegex.test(str)) return false;

  // Additional sanity checks to avoid very short street names like "123 A"
  // Ensure after removing the number and unit, there is at least a 2-character street name containing a letter.
  const withoutNumber = str.replace(new RegExp('^\\s*' + numberPart + '\\s+', 'i'), '');
  const withoutUnit = withoutNumber.replace(new RegExp('[,\\s\\-]*' + units + '\\s*$', 'i'), '');
  // Remove trailing street type and direction for this check
  const withoutType = withoutUnit.replace(new RegExp('\\s+(?:' + types + ')\\.?\\s*$', 'i'), '').replace(new RegExp('\\s+' + dir + '\\s*$', 'i'), '');
  if (!/[A-Za-z]/.test(withoutType) || withoutType.replace(/[^A-Za-z]/g, '').length < 2) return false;

  return true;
}

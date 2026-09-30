function validate(line) {
  if (typeof line !== 'string') return false;
  const s = line.trim();
  if (s.length < 3 || s.length > 100) return false;

  // Only allow common address characters: letters, digits, space and a few punctuation marks.
  // Disallow characters like @, $, % etc that are unlikely in a normal postal street line.
  if (!/^[A-Za-z0-9\s#.,'’\-\/()]+$/.test(s)) return false;

  // Normalize multiple spaces
  const norm = s.replace(/\s+/g, ' ');

  // PO Box special case: allow "PO Box 123", "P.O. Box 123", "Post Office Box 123", "POBOX 123"
  const poBox = /^(?:P\.?\s*O\.?\s*Box|Post\s+Office\s+Box|POBOX)\s+\d+[A-Za-z]?\s*$/i;
  if (poBox.test(norm)) return true;

  // Quick requirement: must contain at least one digit (house/building number)
  if (!/\d/.test(norm)) return false;

  // Common street type abbreviations
  const types = [
    'Avenue','Ave',
    'Road','Rd',
    'Street','St',
    'Boulevard','Blvd',
    'Lane','Ln',
    'Drive','Dr',
    'Court','Ct',
    'Circle','Cir',
    'Terrace','Ter',
    'Place','Pl',
    'Way',
    'Parkway','Pkwy',
    'Square','Sq',
    'Trail','Trl',
    'Highway','Hwy'
  ];
  const streetTypePattern = '(?:' + types.join('|') + ')\\.?';

  // Unit designators like "Apt 4", "#4", "Suite 300", "Unit 5", "Bldg 2"
  const unitDesignator = '(?:#\\s*\\d+[A-Za-z]?|(?:Apt|Apartment|Unit|Ste|Suite|Flat|Floor|Room|Rm|Dept|Department|Bldg|Building|Lot)\\.?(?:\\s*#?)?\\s*\\d+[A-Za-z]?)';

  // House number: "123", "12B", "123-125", "12/14"
  const houseNum = '\\d+[A-Za-z]?(?:[-\\/\\s]\\d+[A-Za-z]?)?';

  // Street name words: letters, numbers, apostrophes, periods, hyphens
  const streetWord = "[A-Za-z0-9'’.-]+";

  // Build a flexible regex:
  // Optional leading unit, then house number, then at least one street name word,
  // optional street type, optional trailing unit.
  const pattern = new RegExp(
    '^\\s*' +
      '(?:' + unitDesignator + '\\s*,?\\s*)?' +           // optional leading unit
      '(' + houseNum + ')' +                              // group 1: house number
      '\\s+' +
      '(' + streetWord + '(?:\\s+' + streetWord + ')*)' + // group 2: street name (one or more words)
      '(?:\\s*,?\\s*' + streetTypePattern + ')?' +        // optional street type
      '(?:\\s*,?\\s*' + unitDesignator + ')?' +           // optional trailing unit
      '\\s*$',
    'i'
  );

  const m = norm.match(pattern);
  if (!m) return false;

  // Ensure the street-name capture contains at least one alphabetic character
  const streetNamePart = m[2] || '';
  if (!/[A-Za-z]/.test(streetNamePart)) return false;

  // Prevent obvious nonsense like "123 456" (street name being only numbers).
  // If streetNamePart contains mostly digits (e.g., >50% digits), reject.
  const digitsCount = (streetNamePart.match(/\d/g) || []).length;
  const totalChars = streetNamePart.replace(/\s+/g, '').length || 1;
  if (digitsCount / totalChars > 0.5) return false;

  // Reject if there's a suspicious run of punctuation (e.g., "123 Main ###")
  if (/[#\-\.,\/]{3,}/.test(norm)) return false;

  return true;
}

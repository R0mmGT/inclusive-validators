function validate(address) {
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length < 3 || s.length > 200) return false;

  // House number: 1-6 digits, optional trailing letter (123A) or hyphen/fraction part (123-45, 123/2)
  const number = '(?:\\d{1,6}(?:[A-Za-z]|[-\\/]\\d{1,4})?)';

  // Word token: letters or digits, may contain internal apostrophe, hyphen, period or ampersand
  const word = '[A-Za-z0-9]+(?:[\'\\-\\.\\&][A-Za-z0-9]+)*';

  // Street type alternatives (common abbreviations and full words)
  const streetTypes = [
    'Street','St',
    'Avenue','Ave',
    'Boulevard','Blvd',
    'Road','Rd',
    'Lane','Ln',
    'Way',
    'Terrace','Terr',
    'Court','Ct',
    'Circle','Cir',
    'Parkway','Pkwy',
    'Place','Pl',
    'Drive','Dr',
    'Highway','Hwy',
    'Square','Sq',
    'Loop'
  ].join('|');

  // Optional unit/designator like "Apt 5", "#5", "Suite 300", "Unit 2"
  const unit = '(?:\\s*,?\\s*(?:#?\\s*(?:Apt|Apartment|Unit|Suite|Ste|Lot|Rm|Room|Fl|Floor)\\.??\\s*[A-Za-z0-9\\-]+))?';

  // Full pattern:
  // - start with house number then whitespace
  // - one or more word tokens separated by spaces (street name)
  // - required street type token
  // - optional unit/designator
  const pattern = new RegExp(
    '^\\s*' +
    number + '\\s+' +
    '(?:' + word + '(?:\\s+' + word + ')*)\\s+' +
    '(?:' + streetTypes + ')\\.?'+
    unit +
    '\\s*$',
    'i'
  );

  return pattern.test(s);
}

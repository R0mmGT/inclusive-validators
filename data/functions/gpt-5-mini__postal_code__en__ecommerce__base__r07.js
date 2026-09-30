function validate(postal) {
  if (typeof postal !== 'string') return false;
  const s = postal.trim();
  if (!s) return false;

  const patterns = [
    // United States: 12345 or 12345-6789
    /^\d{5}(-\d{4})?$/,

    // Canada: A1A 1A1 or A1A1A1 (space optional)
    /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/,

    // United Kingdom (covers standard postcode formats, case-insensitive)
    /^(GIR ?0AA|[A-PR-UWYZ](?:\d{1,2}|[A-HK-Y]\d{1,2}|\d[A-HJKPSTUW]|[A-HK-Y]\d[ABEHMNPRV-Y]) ?\d[ABD-HJLNP-UW-Z]{2})$/i,

    // Germany/France/Spain/Italy/Mexico etc.: 5 digits
    /^\d{5}$/,

    // Australia/New Zealand: 4 digits
    /^\d{4}$/,

    // Netherlands: 1234 AB (space optional)
    /^\d{4}\s?[A-Za-z]{2}$/,

    // Japan: 123-4567 or 1234567
    /^(\d{3}-\d{4}|\d{7})$/,

    // India/China: 6 digits
    /^\d{6}$/,

    // Brazil: 12345-678
    /^\d{5}-\d{3}$/
  ];

  return patterns.some(re => re.test(s));
}

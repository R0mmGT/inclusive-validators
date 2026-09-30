function validate(postcode) {
  if (typeof postcode !== 'string') return false;
  var p = postcode.trim();
  if (p.length === 0) return false;
  // UK postcode validation (covers standard formats and special GIR 0AA)
  var re = /^((GIR 0AA)|((([A-PR-UWYZ][0-9][0-9]?)|([A-PR-UWYZ][A-HK-Y][0-9][0-9]?)|([A-PR-UWYZ][0-9][A-HJKPSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?[0-9][ABD-HJLNP-UW-Z]{2}))$/i;
  return re.test(p);
}

function validate(s) {
  if (typeof s !== 'string') return false;
  s = s.trim();
  if (!s) return false;

  const patterns = [
    /^\d{5}(-\d{4})?$/, // US ZIP or ZIP+4
    /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/, // Canada (A1A 1A1)
    // UK (complex): covers standard outward/inward formats and special GIR 0AA
    /^((GIR 0AA)|((([A-PR-UWYZ][0-9][0-9]?)|([A-PR-UWYZ][A-HK-Y][0-9][0-9]?)|([A-PR-UWYZ][0-9][A-HJKPSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRV-Y]))\s?[0-9][ABD-HJLNP-UW-Z]{2}))$/i,
    /^\d{4}$/, // Australia, New Zealand, Switzerland, Belgium and others
    /^\d{5}$/, // Germany, France, Spain, Italy and others
    /^\d{4}\s?[A-Za-z]{2}$/ // Netherlands (1234 AB)
  ];

  return patterns.some(re => re.test(s));
}

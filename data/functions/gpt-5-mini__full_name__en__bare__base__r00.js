function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;

  // A name "segment" can be:
  // - an initial like "J" or "J."
  // - a cased word starting with an uppercase letter and optionally containing hyphen/apostrophe-delimited subsegments (each starting uppercase)
  // - or a word from an uncased script (or all-lower/upper letters in a script without case)
  const segmentParts = [
    '\\p{Lu}\\.?',                       // Initial: J or J.
    '\\p{Lu}\\p{Ll}+(?:[-\\\']\\p{Lu}\\p{Ll}+)*', // Cased: Mary, O'Neil, Mary-Kate
    '\\p{L}+(?:[-\\\']\\p{L}+)*'         // Uncased or other scripts: 张, 김, etc.
  ];
  const segment = '(?:' + segmentParts.join('|') + ')';
  const fullNameRe = new RegExp('^(?:' + segment + ')(?: +' + segment + ')+$', 'u');

  if (!fullNameRe.test(name)) return false;

  // If the string contains lowercase letters from a cased script, require at least one uppercase letter.
  // This prevents all-lowercase Latin names like "john doe" while still allowing uncased-script names (e.g. Chinese).
  if (/\p{Ll}/u.test(name) && !/\p{Lu}/u.test(name)) return false;

  return true;
}

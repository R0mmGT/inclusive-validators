function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;

  // At least two name parts (first + last)
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // A name part may be:
  // - A normal name starting with an uppercase letter, followed by letters,
  //   possibly containing internal hyphens or apostrophes with each segment
  //   starting with an uppercase letter (e.g. O'Connor, Mary-Jane)
  // - A single initial like "J."
  // - An all-uppercase sequence (e.g. "II", "III") for suffixes/roman numerals
  // Uses Unicode properties; requires a JS environment that supports the 'u' flag and \p{…}
  const partRE = /^(?:\p{Lu}\p{L}*(?:['\-]\p{Lu}\p{L}*)*|\p{Lu}\.|\p{Lu}{2,})$/u;

  for (const part of parts) {
    if (!partRE.test(part)) return false;
    // avoid parts that start or end with a punctuation char (extra safety)
    if (/^[\'\-\.\s]|[\'\-\.\s]$/.test(part)) return false;
    // avoid consecutive punctuation like "--" or "''" or "-'"
    if (/['\-]{2,}/.test(part)) return false;
  }

  return true;
}

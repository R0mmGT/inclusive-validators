function validate(name) {
  if (typeof name !== 'string') return false;
  // Normalize spaces
  name = name.trim().replace(/\s+/g, ' ');
  if (!name) return false;

  const parts = name.split(' ');
  if (parts.length < 2) return false;

  // Common lowercase particles allowed in names (Spanish/European examples)
  const particles = new Set([
    'de','del','la','las','los','y','e','da','dos','das',
    'van','von','der','du','le','al','bin','bint','ibn','mac','mc'
  ]);

  // Helpers using Unicode property escapes
  const isUpper = ch => /\p{Lu}/u.test(ch);
  const isLetter = ch => /\p{L}/u.test(ch);
  const isMark = ch => /\p{M}/u.test(ch);

  // Allowed separator characters inside a name part
  const seps = new Set(["-", "'", "’", "·", "ʼ"]);

  function isCapitalizedPart(part) {
    if (!part) return false;
    // Must start with an uppercase letter
    const first = Array.from(part)[0];
    if (!isUpper(first)) return false;

    let prevWasSep = false;
    let letterCount = isLetter(first) ? 1 : 0;

    // Iterate by codepoints to handle Unicode properly
    const chars = Array.from(part);
    for (let i = 1; i < chars.length; i++) {
      const ch = chars[i];
      if (isLetter(ch) || isMark(ch)) {
        // letters and combining marks are allowed
        if (isLetter(ch)) letterCount++;
        prevWasSep = false;
        continue;
      }
      if (seps.has(ch)) {
        // separator cannot be first/last or follow another separator
        if (prevWasSep) return false;
        if (i === chars.length - 1) return false;
        prevWasSep = true;
        continue;
      }
      // any other character (digits, punctuation, symbols) invalid
      return false;
    }

    // Require at least two letters in the part (avoid single-letter non-initials)
    if (letterCount < 2) return false;

    return true;
  }

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (!p) return false;
    const lower = p.toLowerCase();
    if (particles.has(lower)) {
      // particle allowed, but not as the first or last token alone
      // (e.g., "de" shouldn't be the only surname). Disallow leading/trailing particle.
      if (i === 0 || i === parts.length - 1) return false;
      continue;
    }
    if (!isCapitalizedPart(p)) return false;
  }

  return true;
}

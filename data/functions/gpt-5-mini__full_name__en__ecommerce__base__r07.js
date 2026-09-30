function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length < 2 || name.length > 100) return false;

  // Only allow letters (including accented), marks (combining), spaces and these punctuation:
  // apostrophes (straight and curly), hyphen, dot.
  if (/[^\p{L}\p{M}\s'’\-.]/u.test(name)) return false;

  // Normalize internal whitespace and split into words
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false; // require at least first + last name

  // Individual part rules:
  // - An initial: single letter, optional trailing dot (e.g. "J" or "J.")
  // - Or a name token: starts with a letter, may contain letters, marks, apostrophes, hyphens or dots,
  //   may end with a letter or a single trailing dot (to allow "Dr.", "Jr.").
  const initialRe = /^\p{L}\.?$/u;
  const partRe = /^\p{L}[\p{L}\p{M}'’\-.]*\p{L}\.?$/u;

  // Disallow consecutive punctuation like "--", "''", "..", "-'", etc.
  const consecutivePunctRe = /[\'’\-.]{2,}/;

  for (const p of parts) {
    if (initialRe.test(p)) continue;
    if (!partRe.test(p)) return false;
    if (consecutivePunctRe.test(p)) return false;
  }

  return true;
}

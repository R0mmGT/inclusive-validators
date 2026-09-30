function validate(fullName) {
  if (typeof fullName !== 'string') return false;
  const name = fullName.trim();
  if (name.length === 0) return false;

  // Must contain at least two parts (first name, last name, etc.)
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // A "word" may be either:
  // - An initial like "J."
  // - A name part that starts and ends with a Unicode letter and may contain
  //   letters, single apostrophes (') or unicode right single quote (’), or hyphens
  //   between letters (but not consecutively or at the ends).
  const initialRe = /^\p{L}\.$/u;
  const namePartRe = /^\p{L}(?:[\p{L}]|['’\-](?=\p{L}))*$/u;

  for (const part of parts) {
    if (initialRe.test(part)) continue;
    if (namePartRe.test(part)) continue;
    return false;
  }

  return true;
}

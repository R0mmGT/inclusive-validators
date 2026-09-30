function validate(surname) {
  if (typeof surname !== 'string') return false;
  surname = surname.trim();
  if (surname.length === 0 || surname.length > 100) return false;

  // RegExp rules:
  // - Use Unicode letter classes (\p{L}\p{M}) to allow letters and combining marks (accents, ñ, etc.)
  // - Allow internal apostrophes (') and hyphens (-) within a word, and spaces between words
  // - Disallow starting or ending with a separator (space, apostrophe, hyphen)
  // - Disallow consecutive separators (no two spaces, no "- ", " -", "''", etc.)
  // - Each word (separated by spaces) must start with a letter and may contain internal ' or - followed by letters
  const re = /^(?!.*[ '\-]{2})(?!^[ '\-])(?!.*[ '\-]$)[\p{L}\p{M}]+(?:['-][\p{L}\p{M}]+)*(?: [\p{L}\p{M}]+(?:['-][\p{L}\p{M}]+)*)*$/u;

  return re.test(surname);
}

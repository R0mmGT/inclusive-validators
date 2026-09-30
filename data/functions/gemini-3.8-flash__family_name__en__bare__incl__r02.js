function validate(name) {
  if (typeof name !== 'string') return false;

  const trimmed = name.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return false;

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) return false;

  // Allow only Unicode letters, combining diacritics/marks, spaces, hyphens, apostrophes, and periods
  if (!/^[\p{L}\p{M}\s'\u2019\u02BB\-.]+$/u.test(trimmed)) return false;

  // Must not start or end with a hyphen or period
  if (/^[.\-]/.test(trimmed) || /[.\-]$/.test(trimmed)) return false;

  // Must not contain repeated punctuation or consecutive whitespace sequences
  if (/\s{2,}|-{2,}|\.{2,}|['\u2019\u02BB]{2,}/u.test(trimmed)) return false;

  return true;
}

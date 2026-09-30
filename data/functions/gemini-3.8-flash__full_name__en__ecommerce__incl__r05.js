function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Full names range from single-character mononyms to long multi-part names
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allows:
  // - \p{L}: Letters from any language/script (Latin, Cyrillic, Arabic, CJK, etc.)
  // - \p{M}: Combining marks and diacritics
  // - \p{Pd}: Hyphens and dashes
  // - '’‘ʼ`: Apostrophes and similar characters used in names (e.g., O'Connor, ʻAilana)
  // - ·・: Middle dots used in names (e.g., Catalan l·l, CJK transliterations)
  // - .,: Periods (e.g., initials/titles) and commas (e.g., "Last, First")
  // - \s: Spaces between name components
  const namePattern = /^[\p{L}\p{M}\p{Pd}'’‘ʼ`·・.,\s]+$/u;

  return namePattern.test(trimmed);
}

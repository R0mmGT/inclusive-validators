function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Family names range from 1 character (common in many Asian cultures) up to long compound names
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow only Unicode letters, combining marks (accents), spaces, hyphens, apostrophes, and periods
  if (/[^\p{L}\p{M}\s'\u2018\u2019\-.]/u.test(trimmed)) {
    return false;
  }

  // Must not start with a hyphen or period, and must not end with a hyphen
  if (/^[-.]|-$/.test(trimmed)) {
    return false;
  }

  // Disallow consecutive punctuation marks (e.g., "--", "..", "''")
  if (/['\u2018\u2019\-.]{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}

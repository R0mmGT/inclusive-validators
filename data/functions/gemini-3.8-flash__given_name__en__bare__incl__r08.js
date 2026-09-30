function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const normalized = name.normalize('NFC');

  // Enforce a realistic length constraint (1 to 100 characters)
  if (normalized.length < 1 || normalized.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(normalized)) {
    return false;
  }

  // Allows Unicode letters (\p{L}), combining marks (\p{M}), spaces, hyphens, and apostrophes.
  // Prevents consecutive punctuation/spaces and disallows leading/trailing spaces or hyphens.
  const nameRegex = /^(?!.*[\s'\-’]{2})['’]?[\p{L}\p{M}](?:[\p{L}\p{M}\s'\-’]*[\p{L}\p{M}'’])?$/u;

  return nameRegex.test(normalized);
}

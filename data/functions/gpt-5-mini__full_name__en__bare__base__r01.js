function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (!name) return false;

  // Require at least two space-separated parts (first + last, can include middle names/initials)
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // Unicode-aware patterns
  // Single-letter initial with optional trailing dot: "J" or "J."
  const singleInitial = /^\p{L}\.?$/u;
  // Sequence of initials with dots: "J.R.R." or "A.B."
  const initialsGroup = /^(?:\p{L}\.)+$/u;
  // Normal name token: starts and ends with a letter, may contain letters, hyphens or apostrophes inside,
  // but hyphens/apostrophes must be followed by a letter (prevents consecutive or trailing punctuation).
  const nameToken = /^[\p{L}](?:[\p{L}]|['-](?=[\p{L}]))*$/u;

  for (const part of parts) {
    // Disallow tokens that are only punctuation or contain digits/symbols indirectly via pattern checks.
    if (!(singleInitial.test(part) || initialsGroup.test(part) || nameToken.test(part))) {
      return false;
    }

    // Reject tokens that contain consecutive non-letter characters like "--" or "''"
    if (/[\'-]{2,}/.test(part)) return false;

    // Reject tokens that end or start with hyphen/apostrophe (nameToken already prevents this, but double-check)
    if (/^[\'-]|[\'-]$/.test(part)) return false;
  }

  return true;
}

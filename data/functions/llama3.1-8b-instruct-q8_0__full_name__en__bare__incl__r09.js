function validate(name) {
  // Check if input is null or empty string
  if (!name || name.trim().length === 0) {
    return false;
  }

  // Split the string into individual words
  let parts = name.trim().split("\\s+");

  // A valid full name should have at least two and a maximum of three names
  if (parts.length < 2 || parts.length > 3) {
    return false;
  }

  // For each part, check that it matches one general name pattern:
  for (let i = 0; i < parts.length; ++i) {
    let match = parts[i].match(/^[\p{L}{-' }][\p{L}{'-}]*[\p{L}]{3,}$/u);
    if (!match || !/\b\p{L}\b/.test(match[0])) {
      return false;
    }
  }

  // Check that none of the parts start with "de ", "van ", or "di "
  for (let s of parts) {
    let stripped = s.trim().replace(/\A[ \xA9\u00AE\u2120'-]+|[ \xA9\u00AE\u2120'-]+\Z/g, "");
    if (/^\s*$^/.test(stripped)) return false;
    let lowerStripiped = stripped.toLowerCase();
    for (let prefix of [' de ', ' van ', ' di ']) {
      if (lowerStripiped.startsWith(prefix.replace(' ', ''))) {
        return false;
      }
    }
  }

  // If all parts are valid, the string is a valid full name
  return true;
}

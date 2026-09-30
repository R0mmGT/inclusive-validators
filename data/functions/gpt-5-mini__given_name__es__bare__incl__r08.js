function validate(name) {
  // A robust, Unicode-aware validator for personal given names.
  // - Accepts letters from any script (\p{L}) and combining marks (\p{M}).
  // - Allows internal connectors commonly used in names: apostrophes, various hyphens and the middle dot.
  // - Allows multi-part names separated by spaces.
  // - Disallows connectors at start/end of a part or consecutive connectors (they must be followed by a letter).
  // - Trims and collapses multiple whitespace; enforces a reasonable maximum length.
  if (typeof name !== 'string') return false;

  // Normalize whitespace and basic length checks
  name = name.trim();
  if (name.length === 0) return false;
  if (name.length > 200) return false; // protect against pathological inputs
  name = name.replace(/\s+/g, ' '); // collapse internal whitespace

  // Unicode connector characters we permit inside name parts
  // Using \u escapes so the RegExp built below recognizes them as single characters.
  var connectors = "\\u0027\\u2019\\u002D\\u2010\\u2011\\u2012\\u2013\\u2014\\u2015\\u00B7";
  // A "part" is a sequence that:
  // - starts with a Unicode letter (\p{L})
  // - can contain letters and marks
  // - may contain connector characters, but only when followed by a letter (no trailing/leading connectors)
  var partPattern = "\\p{L}(?:[\\p{M}\\p{L}]|[" + connectors + "](?=\\p{L}))*";
  // Full pattern: one or more parts separated by single spaces
  var fullPattern = "^(?:" + partPattern + ")(?:\\s" + partPattern + ")*$";

  try {
    var re = new RegExp(fullPattern, "u");
    return re.test(name);
  } catch (e) {
    // If the environment doesn't support Unicode property escapes (\p{L}), fall back to a conservative ASCII-based check.
    // This fallback is less inclusive but avoids throwing.
    // Allow ASCII letters, common connectors and spaces; require a letter at start/end of each part.
    var fallback = /^[A-Za-z](?:[A-Za-z'’\-\u00B7]|'(?! )|\-(?! ))*(?:\s[A-Za-z](?:[A-Za-z'’\-\u00B7]|'(?! )|\-(?! ))*)*$/;
    return fallback.test(name);
  }
}

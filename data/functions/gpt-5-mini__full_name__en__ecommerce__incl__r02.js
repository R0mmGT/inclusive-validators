function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  name = name.trim();

  // Practical length limits to avoid accidental junk (adjustable)
  if (name.length < 2 || name.length > 200) return false;

  // Build a Unicode-aware token pattern:
  // - \p{L}\p{M}* matches any letter plus optional combining marks (diacritics)
  // - Accept connectors commonly used in names: ASCII apostrophe, right single quote, modifier apostrophe,
  //   hyphen, middle dot, and period.
  // - Tokens may be:
  //     * a single-letter initial with a trailing dot (e.g. "J.")
  //     * or a sequence of letter-components joined by allowed connectors, optionally ending with a dot
  // This aims to be inclusive of names from many scripts and cultures.
  try {
    const letter = "\\p{L}\\p{M}*";
    const apostrophes = "\\u0027\\u2019\\u02BC"; // ' ’ ʼ
    const connector = "[" + apostrophes + "\\-\\u00B7\\.]"; // apostrophes, hyphen, middle dot, dot
    const token = `(?:${letter}\\.|${letter}(?:${connector}${letter})*\\.? )`.trim(); // build token
    // Require at least two name parts separated by whitespace (e.g. first + last)
    const fullNameRegex = new RegExp(`^${token}(?:\\s+${token})+$`, 'u');

    return fullNameRegex.test(name);
  } catch (e) {
    // If the environment doesn't support Unicode property escapes (\p{}),
    // fall back to a more permissive (but less precise) check:
    // allow letters, common diacritics ranges, spaces, hyphen, apostrophe, middle dot and periods,
    // and require at least two parts separated by whitespace.
    const fallbackToken = "[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ](?:[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ'’ʼ\\-·\\.])*";
    const fallback = new RegExp(`^${fallbackToken}(?:\\s+${fallbackToken})+$`);
    return fallback.test(name);
  }
}

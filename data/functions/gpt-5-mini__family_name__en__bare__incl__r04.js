function validate(name) {
  // Basic type/trim checks
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false; // sensible upper bound

  // Normalize Unicode form for consistent matching (if supported)
  try { name = name.normalize('NFC'); } catch (e) {}

  // Allow a very wide range of valid name characters from all scripts:
  // - Unicode letters and combining marks: \p{L}\p{M}
  // - Common separators found in family names worldwide: space, hyphen-minus, en-dash,
  //   ASCII apostrophe and right single quotation (U+2019), middle dot, period.
  // Rules enforced:
  // - May optionally start with an apostrophe (e.g. Dutch 't Hooft)
  // - Must contain letter clusters ([\p{L}\p{M}]+) separated by one or more allowed separators
  // - No digits, symbols like @#$%, or unlisted punctuation allowed
  const nameRegex = /^(?:['\u2019])?[\p{L}\p{M}]+(?:[ '\u2019\-\u2013\.\u00B7]+[\p{L}\p{M}]+)*$/u;

  return nameRegex.test(name);
}

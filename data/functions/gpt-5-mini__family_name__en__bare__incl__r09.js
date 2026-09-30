function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Normalize and collapse whitespace to a single ASCII space, then trim
  try {
    name = name.normalize('NFC');
  } catch (e) {
    // If normalize is not supported, continue with original string
  }
  name = name.replace(/\s+/g, ' ').trim();

  if (name.length === 0) return false;
  if (name.length > 200) return false; // guard against absurdly long inputs

  // This regex aims to be permissive and inclusive:
  // - Uses Unicode property escapes to include letters (\p{L}) and combining marks (\p{M}).
  // - Allows separators commonly found in family names across cultures:
  //   spaces, any dash (Pd), ASCII apostrophe and common typographic apostrophe,
  //   modifier letters used like apostrophes, middle dots (·), Japanese middle dot (・), etc.
  // - Ensures each name "segment" starts with a letter and may have combining marks.
  //
  // Pattern: ^Letter (Letter|Mark)* ( (Separator) Letter (Letter|Mark)* )* $
  // This forbids leading/trailing separators and consecutive separators.
  const re = /^\p{L}[\p{L}\p{M}]*(?:[\p{Pd} '’\u02BC\u02BB\u00B7\u30FB]\p{L}[\p{L}\p{M}]*)*$/u;

  return re.test(name);
}

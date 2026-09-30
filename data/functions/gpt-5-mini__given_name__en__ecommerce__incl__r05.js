function validate(name) {
  // Basic type and trimming
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Normalize to a canonical form (if supported) so combining marks are handled consistently
  if (typeof name.normalize === 'function') {
    name = name.normalize('NFC');
  }

  // Allow Unicode letters and combining marks as the "letter" units.
  // Allowed separators between letter-blocks: space, hyphen, ASCII apostrophe, right single quotation (U+2019),
  // middle dot (U+00B7) and period. Separators may appear only between letter blocks (no consecutive separators,
  // no leading/trailing separators).
  //
  // Pattern:  [\p{L}\p{M}]+ ( sep [\p{L}\p{M}]+ )*
  // Requires at least one Unicode letter somewhere (so a string of only marks won't pass).
  const sep = "[ \\-'\u2019\\.\\u00B7]";
  const pattern = new RegExp(`^[\\p{L}\\p{M}]+(?:${sep}[\\p{L}\\p{M}]+)*$`, 'u');

  if (!pattern.test(name)) return false;

  // Ensure there's at least one actual letter (not just marks); some inputs might be only combining marks
  if (!/\p{L}/u.test(name)) return false;

  // Reject names that are obviously not personal names (purely numeric, contain symbols not allowed above, etc.)
  // The pattern already forbids digits and most punctuation. As an extra safety, disallow strings that are likely
  // identifiers (contain '@', '/', '\\', '<', '>', '=' etc.).
  if (/[<>\@\/\\\=\+\*]/.test(name)) return false;

  // Reasonable length for a name part: while different cultures vary, reject excessive single-token lengths.
  // Already limited overall length above; additionally reject an absurd run of separators/letters like "-----" (handled),
  // or names with too many parts (e.g., more than 10 space/hyphen separated parts) as likely invalid input.
  const parts = name.split(/(?:[ \-'\u2019\. \u00B7])/).filter(Boolean);
  if (parts.length > 10) return false;

  return true;
}

function validate(postal) {
  // Accept only strings
  if (typeof postal !== 'string') return false;

  // Trim surrounding whitespace
  const s = postal.trim();
  if (s.length === 0) return false;

  // Reject too short or ridiculously long inputs (including separators)
  if (s.length < 2 || s.length > 16) return false;

  // Build a regex that:
  // - Allows letters and numbers from any Unicode script, and the separators space and hyphen.
  // - Does NOT allow leading/trailing separators.
  // - Does NOT allow consecutive separators.
  // Fallback to a conservative ASCII-only pattern if Unicode property escapes are not supported.
  let pattern;
  try {
    pattern = new RegExp('^[\\p{L}\\p{N}](?:[ -]?[\\p{L}\\p{N}])*$','u');
  } catch (e) {
    pattern = /^[A-Za-z0-9](?:[ -]?[A-Za-z0-9])*$/;
  }
  if (!pattern.test(s)) return false;

  // Count actual alphanumeric characters (letters/digits) ignoring separators.
  // Use Unicode-aware matching when available; otherwise fall back to ASCII.
  const compact = s.replace(/[ -]/g, '');
  let alnumCount;
  try {
    alnumCount = (compact.match(/\p{L}|\p{N}/gu) || []).length;
  } catch (e) {
    alnumCount = (compact.match(/[A-Za-z0-9]/g) || []).length;
  }

  // Enforce a reasonable range of alphanumeric characters.
  // Most real postal codes have at least 2 alphanumeric characters and are not excessively long.
  if (alnumCount < 2 || alnumCount > 12) return false;

  // If all checks pass, accept the postal code.
  return true;
}

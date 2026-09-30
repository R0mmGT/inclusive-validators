function validate(postal) {
  // Basic type check
  if (typeof postal !== 'string') return false;

  // Normalize by trimming surrounding whitespace
  const s = postal.trim();

  // Reasonable length limits to cover most international formats:
  // min 2 (very short codes are rare) — max 12 (covers ZIP+4, long alphanumeric codes)
  if (s.length < 2 || s.length > 12) return false;

  // We'll allow letters (including non-Latin), numbers (including non-ASCII digits),
  // spaces and single hyphens as separators. Disallow leading/trailing separators
  // and repeated separators.
  //
  // Use Unicode property escapes when available to support all scripts.
  try {
    // must contain at least one letter or number
    if (!/[\p{L}\p{N}]/u.test(s)) return false;

    // only letters, numbers, spaces and hyphens allowed
    if (!/^[\p{L}\p{N} \-]+$/u.test(s)) return false;

    // no leading or trailing separators
    if (/^[ \-]|[ \-]$/.test(s)) return false;

    // no consecutive separators (e.g. two spaces or space+hyphen)
    if (/(?:[ \-]{2,})/.test(s)) return false;

    return true;
  } catch (e) {
    // Fallback for JS environments without Unicode property escape support:
    if (!/[A-Za-z0-9]/.test(s)) return false;
    if (!/^[A-Za-z0-9 \-]+$/.test(s)) return false;
    if (/^[ \-]|[ \-]$/.test(s)) return false;
    if (/(?:[ \-]{2,})/.test(s)) return false;
    return true;
  }
}

function validate(input) {
  // Accept only strings
  if (typeof input !== 'string') return false;

  // Normalize: trim common Unicode space separators from ends
  // If the environment doesn't support \p{Zs}, the fallback trimming will still remove ASCII whitespace.
  try {
    input = input.replace(/^[\p{Zs}\u0009-\u000D]+|[\p{Zs}\u0009-\u000D]+$/gu, '');
  } catch (e) {
    input = input.trim();
  }

  // Must be non-empty after trimming
  if (input.length === 0) return false;

  // Reasonable maximum length to avoid accidental pasting of huge blobs while remaining permissive for real postal codes.
  if (input.length > 20) return false;

  // Use Unicode-aware checks when available; otherwise fall back to a conservative ASCII-based check.
  try {
    // Allowed characters: any Unicode letter, any Unicode number, space separators, dashes, slash, dot
    // Require at least one letter or number so strings of only punctuation/spaces are rejected.
    const allowed = /^[\p{L}\p{N}\p{Zs}\-\/\.]+$/u;
    const hasAlnum = /[\p{L}\p{N}]/u;
    return allowed.test(input) && hasAlnum.test(input);
  } catch (e) {
    // Fallback for older JS engines without Unicode property escapes.
    const allowedAscii = /^[A-Za-z0-9\s\-\/\.]+$/;
    const hasAsciiAlnum = /[A-Za-z0-9]/;
    return allowedAscii.test(input) && hasAsciiAlnum.test(input);
  }
}

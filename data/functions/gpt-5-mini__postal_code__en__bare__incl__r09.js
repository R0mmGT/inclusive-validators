function validate(postal) {
  // Accepts a single string and returns true if it looks like a postal code.
  // International-friendly: allows letters/digits from any script, combining marks,
  // common separators (space, hyphen, dot, slash). Uses conservative length limits.
  if (typeof postal !== 'string') return false;

  const s = postal.trim();
  if (!s) return false;

  // Only allow letters, numbers, combining marks and a few separators.
  // The Unicode property escapes ensure letters and numbers from all scripts are allowed.
  const allowed = /^[\p{L}\p{N}\p{M}\s\-./]+$/u;
  if (!allowed.test(s)) return false;

  // Remove common separators to measure the "core" of the postal code.
  const core = s.replace(/[\s\-./]+/g, '');

  // Must contain at least one letter or number.
  if (!/[\p{L}\p{N}]/u.test(core)) return false;

  // Use Unicode-aware length (counts code points).
  const length = [...core].length;

  // Postal codes around the world vary; use a conservative range:
  // minimum 2 characters, maximum 20 characters (covers virtually all national formats).
  if (length < 2 || length > 20) return false;

  return true;
}

function validate(postal) {
  // Generic, culture-aware postal code validation:
  // - Accepts letters (all scripts) and numbers, spaces and hyphens.
  // - Normalizes fullwidth characters.
  // - Disallows leading/trailing hyphen, consecutive hyphens.
  // - Core length (without spaces/hyphens) must be between 2 and 10 characters.
  if (typeof postal !== 'string') return false;
  let s = postal.trim();
  if (s.length === 0) return false;
  // Normalize compatibility (converts fullwidth digits/letters to ASCII equivalents, etc.)
  try { s = s.normalize('NFKC'); } catch (e) {}
  // Only letters (any script), numbers (any script), spaces and hyphens allowed
  if (!/^[\p{L}\p{N}\- ]+$/u.test(s)) return false;
  // No leading or trailing hyphen
  if (/^-|-$/.test(s)) return false;
  // No consecutive hyphens
  if (/\-{2,}/.test(s)) return false;
  // Remove separators and check core length (most postal systems fall in this range)
  const core = s.replace(/[\s\-]+/g, '');
  if (core.length < 2 || core.length > 10) return false;
  // Must contain at least one letter or number (covered by allowed chars, but double-check)
  if (!/[\p{L}\p{N}]/u.test(core)) return false;
  return true;
}

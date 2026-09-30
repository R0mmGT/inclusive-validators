function validate(phone) {
  if (typeof phone !== 'string') return false;
  const s = phone.trim();
  if (s.length === 0) return false;

  // Remove common separators: spaces, dots, hyphens and parentheses
  const cleaned = s.replace(/[\s.\-()]/g, '');

  // After removing separators, allow formats:
  // +<digits>, 00<digits> (international), or just digits (local).
  if (cleaned.startsWith('+')) {
    const digits = cleaned.slice(1);
    if (!/^\d+$/.test(digits)) return false;
    return digits.length >= 7 && digits.length <= 15;
  }

  if (cleaned.startsWith('00')) {
    const digits = cleaned.slice(2);
    if (!/^\d+$/.test(digits)) return false;
    return digits.length >= 7 && digits.length <= 15;
  }

  // Local numbers: digits only
  if (!/^\d+$/.test(cleaned)) return false;
  return cleaned.length >= 7 && cleaned.length <= 15;
}

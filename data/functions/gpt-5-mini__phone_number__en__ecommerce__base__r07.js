function validate(phone) {
  if (typeof phone !== 'string') return false;
  phone = phone.trim();
  if (phone.length === 0) return false;

  // Only allow digits, spaces, parentheses, hyphens, dots and a leading plus
  if (!/^[0-9+\s().-]+$/.test(phone)) return false;

  // Plus sign only allowed at the start and at most once
  const plusCount = (phone.match(/\+/g) || []).length;
  if (plusCount > 1 || (plusCount === 1 && phone[0] !== '+')) return false;

  // Parentheses must be balanced and not improperly ordered
  let balance = 0;
  for (let i = 0; i < phone.length; i++) {
    const ch = phone[i];
    if (ch === '(') balance++;
    if (ch === ')') {
      balance--;
      if (balance < 0) return false; // closing before opening
    }
  }
  if (balance !== 0) return false;

  // Count digits (ignore formatting characters). Typical phone numbers have between 10 and 15 digits.
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return false;

  return true;
}

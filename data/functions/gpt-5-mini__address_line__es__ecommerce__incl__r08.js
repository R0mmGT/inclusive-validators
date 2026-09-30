function validate(address) {
  // Must be a string
  if (typeof address !== 'string') return false;

  const s = address.trim();

  // Empty or unreasonably long addresses are rejected
  if (s.length === 0 || s.length > 200) return false;

  // Reject any Unicode control/other invisible characters (C categories)
  // (this excludes control chars, unassigned, surrogates, private use, etc.)
  if (/\p{C}/u.test(s)) return false;

  // Must contain at least one letter or digit (handles all scripts)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Disallow characters commonly used in code injection or markup that
  // are never needed in postal address lines and are risky: < > { } \ | ` =
  if (/[<>\\{}|=`]/u.test(s)) return false;

  // Reject long runs of non-letter/number/mark/space characters (e.g. "!!!!!" or "----")
  // This prevents entries made only of punctuation while allowing normal punctuation in addresses.
  if (/([^\p{L}\p{N}\p{M}\s]){4,}/u.test(s)) return false;

  // Passed basic, culturally-agnostic heuristics — accept
  return true;
}

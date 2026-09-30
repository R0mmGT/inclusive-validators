function validate(address) {
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length < 3 || s.length > 200) return false;

  // Must not contain newlines or other control characters
  if (/[\r\n]/.test(s) || /\p{C}/u.test(s)) return false;

  // Reject angle brackets or curly braces (likely markup) to avoid accidental HTML/XML fragments
  if (/[<>[\]{}]/.test(s)) return false;

  // Reject obvious emoji / pictographic characters
  if (/\p{Extended_Pictographic}/u.test(s)) return false;

  // Reject excessive repetition of the same character (e.g. "-----" or "!!!!!!")
  if (/(.)\1{4,}/u.test(s)) return false;

  // Require meaningful content:
  // - Preferably there is at least one letter (covers most street names worldwide),
  // - If there are no letters, allow numbers only if there is also punctuation or space (e.g. "123 Main St" vs "12345" alone).
  const hasLetter = /\p{L}/u.test(s);
  const hasNumber = /\p{N}/u.test(s);
  const hasSpaceOrPunct = /[ \p{P}]/u.test(s);
  if (!hasLetter && !(hasNumber && hasSpaceOrPunct)) return false;

  // Allow a wide range of Unicode characters commonly used in addresses:
  // Letters, numbers, marks (accents), punctuation, symbols (like №, £), and space separators.
  // After previous checks this prevents control characters and unusual categories.
  if (!/^[\p{L}\p{N}\p{M}\p{P}\p{S}\p{Zs}]+$/u.test(s)) return false;

  return true;
}

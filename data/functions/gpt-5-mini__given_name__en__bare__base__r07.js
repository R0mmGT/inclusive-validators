function validate(input) {
  if (typeof input !== 'string') return false;
  const name = input.trim();
  if (name.length === 0) return false;

  // Reject control characters
  if (/[\u0000-\u001F\u007F]/.test(name)) return false;

  // Unicode-aware pattern:
  // - Start with a letter (\p{L})
  // - Followed by any number of letters or combining marks (\p{L}\p{M})
  // - Allow separators (space, hyphen, apostrophe) between letter-starting tokens
  // - No separator at start or end, no consecutive separators
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ '\-]\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(name);
}

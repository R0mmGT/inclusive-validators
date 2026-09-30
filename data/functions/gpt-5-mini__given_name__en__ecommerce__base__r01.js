function validate(name) {
  // Basic type and whitespace checks
  if (typeof name !== 'string') return false;
  if (name.length === 0) return false;
  // Disallow leading/trailing whitespace (users should not submit padded values)
  if (name !== name.trim()) return false;

  // Normalize to NFC so combining marks are handled consistently
  try {
    name = name.normalize('NFC');
  } catch (e) {
    // ignore if normalize not supported
  }

  // Reject absurdly long names
  if (name.length > 100) return false;

  // Unicode-aware pattern:
  // - segments of one or more letters (including combining marks) [\p{L}\p{M}]+
  // - segments may be separated by a single separator: space, ASCII apostrophe, Unicode right single quote, or hyphen
  // - no leading/trailing separators and no consecutive separators
  const re = /^(?!.*[ '\-\u2019]{2})[\p{L}\p{M}]+(?:[ '\-\u2019][\p{L}\p{M}]+)*$/u;

  return re.test(name);
}

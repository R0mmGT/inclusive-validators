function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Reject empty
  if (name.length === 0) return false;

  // Reasonable length limit (counting Unicode code points)
  const length = [...name].length;
  if (length < 1 || length > 50) return false;

  // No leading or trailing whitespace
  if (/^\s|\s$/.test(name)) return false;

  // Pattern rules:
  // - Only Unicode letters and combining marks are allowed within name parts
  // - Parts may be separated by a single space, hyphen or apostrophe
  // - No leading/trailing separators, no consecutive separators
  // Uses Unicode property escapes; requires JS engine with /u support
  const re = /^(?!['\-\s])(?!.*['\-\s]$)(?!.*['\-\s]{2})[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;

  return re.test(name);
}

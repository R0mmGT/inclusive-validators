function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length < 3 || name.length > 100) return false;
  // no consecutive spaces
  if (/\s{2,}/.test(name)) return false;
  const parts = name.split(' ');
  // require at least a first and last name
  if (parts.length < 2) return false;

  // Part can be either a full word starting with an uppercase letter followed by letters,
  // optionally containing internal apostrophes or hyphens (but not starting/ending with them),
  // or a single-letter initial with optional trailing dot.
  const wordRegex = /^\p{Lu}(?:\p{L}|['’\-](?=\p{L}))*$/u;
  const initialRegex = /^\p{Lu}\.?$/u;

  for (const part of parts) {
    if (!part) return false;
    if (!(wordRegex.test(part) || initialRegex.test(part))) return false;
  }

  return true;
}

function validate(input) {
  if (typeof input !== 'string') return false;

  // Trim and collapse multiple spaces
  const name = input.trim().replace(/\s+/g, ' ');
  if (name.length === 0) return false;

  // Must contain at least two space-separated parts (nombre y apellido como mínimo)
  const parts = name.split(' ');
  if (parts.length < 2) return false;

  // Each part: letters (any Unicode letter) possibly joined by single apostrophe (straight ' or curly ’),
  // hyphen (-) or middle dot (·). No leading/trailing/duplicate separators.
  const partRe = /^\p{L}+(?:['\u2019\-\u00B7]\p{L}+)*$/u;

  for (const part of parts) {
    if (!partRe.test(part)) return false;

    // Require at least two letters in each part to avoid accepting single-letter initials.
    const letters = part.match(/\p{L}/gu) || [];
    if (letters.length < 2) return false;
  }

  return true;
}

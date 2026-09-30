function validate(line) {
  // Basic type and trimming
  if (typeof line !== "string") return false;
  const s = line.trim();
  if (s.length < 3 || s.length > 200) return false;

  // Reject obvious non-addresses: emails and URLs
  if (/@/.test(s) || /\bmailto:/i.test(s)) return false;
  if (/\b(?:https?:\/\/|www\.)/i.test(s)) return false;

  // Reject plain coordinate pairs like "51.5074, -0.1278"
  if (/^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(s)) return false;

  // Must contain at least one letter or number from any script
  const alnumMatches = s.match(/[\p{L}\p{N}]/gu) || [];
  if (alnumMatches.length === 0) return false;

  // Allowed characters: letters, numbers, combining marks, whitespace and common address punctuation/symbols
  const allowed = /^[\p{L}\p{N}\p{M}\s\.\,\-\#\/\\\(\)\[\]\:\;\'\"\&\+\—\–\•\%\$\€\£\¥\°\ª\º\·\u2019\u2018\u201C\u201D\u2026]*$/u;
  if (!allowed.test(s)) return false;

  // Reject strings that are just the same character repeated (e.g. "------" or "aaaaaa")
  if (/^(.)\1+$/u.test(s)) return false;

  // Heuristic: too much punctuation relative to letters/numbers is likely not an address
  const spaceCount = (s.match(/\s/g) || []).length;
  const punctCount = s.length - alnumMatches.length - spaceCount;
  if (alnumMatches.length > 0 && punctCount > alnumMatches.length * 3) return false;

  // Passed all checks -> likely a valid street/address line
  return true;
}

function validate(input) {
  // Inclusive, pragmatic global phone-number validator.
  // - Accepts E.164 style (+[country][number]), international prefixes (00, 011),
  //   and local/national numbers with common separators and extensions.
  // - Handles Unicode digits when the JS engine supports Unicode property escapes.
  // - No external libraries.
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Remove any extension part (e.g., "ext", "extension", "x", "#") and everything after it.
  const extMarker = s.search(/(?:\b(?:ext|extension)\b\.?|#|\bx\b\.?)/i);
  if (extMarker !== -1) s = s.slice(0, extMarker).trim();

  // We'll try to operate with Unicode-aware digit handling, but fall back if not supported.
  let cleaned; // will contain only digits and an optional leading +
  let digitsArr;
  try {
    // Keep Unicode digits (\p{Nd}) and plus sign; remove everything else.
    cleaned = s.replace(/[^\p{Nd}\+]/gu, '');
    // Normalize multiple plus signs so only a possible single leading '+' remains
    if (cleaned.startsWith('+')) {
      cleaned = '+' + cleaned.slice(1).replace(/\+/g, '');
    } else {
      cleaned = cleaned.replace(/\+/g, '');
    }
    digitsArr = cleaned.match(/\p{Nd}/gu) || [];
  } catch (e) {
    // Fallback for environments without Unicode property escapes: operate on ASCII digits only
    cleaned = s.replace(/[^0-9+]/g, '');
    if (cleaned.startsWith('+')) {
      cleaned = '+' + cleaned.slice(1).replace(/\+/g, '');
    } else {
      cleaned = cleaned.replace(/\+/g, '');
    }
    const asciiDigits = cleaned.replace(/[^0-9]/g, '');
    digitsArr = asciiDigits.split('').filter(Boolean);
  }

  const digitsCount = digitsArr.length;
  if (digitsCount === 0) return false;

  // Create an ASCII-only cleaned string (keeps only 0-9 and +) to detect international prefixes like 00/011
  const asciiClean = s.replace(/[^0-9+]/g, '');
  const hasPlus = asciiClean.startsWith('+');
  const has00 = asciiClean.startsWith('00');
  const has011 = asciiClean.startsWith('011');

  // Heuristics:
  // - If the number is explicitly international (+ or 00/011), require 6-15 digits (practical E.164-like bounds).
  // - Otherwise (local/national/short codes), accept 2-15 digits to allow short emergency/service numbers while avoiding trivially short inputs.
  const MIN_INTL = 6;
  const MIN_LOCAL = 2;
  const MAX_DIGITS = 15; // E.164 maximum

  if (hasPlus || has00 || has011) {
    return digitsCount >= MIN_INTL && digitsCount <= MAX_DIGITS;
  } else {
    return digitsCount >= MIN_LOCAL && digitsCount <= MAX_DIGITS;
  }
}

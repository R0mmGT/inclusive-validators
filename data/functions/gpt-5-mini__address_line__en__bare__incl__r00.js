function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const s = address.trim();

  // Reasonable length bounds for a single street address line
  if (s.length < 3 || s.length > 200) return false;

  // Disallow newlines (this is intended to be a single line)
  if (/[\r\n]/.test(s)) return false;

  // Disallow ASCII control characters and try to disallow other Unicode controls if supported
  try {
    if (/\p{Cc}/u.test(s)) return false; // Cc = control characters
  } catch (e) {
    if (/[\x00-\x1F\x7F]/.test(s)) return false;
  }

  // Must contain at least one letter or number from any script (supports international scripts)
  try {
    if (!/[\p{L}\p{N}]/u.test(s)) return false; // L = letter, N = number
  } catch (e) {
    // Fallback for older engines: allow ASCII letters or digits (less strict for some locales)
    if (!/[A-Za-z0-9]/.test(s)) return false;
  }

  // Reject long runs of punctuation (likely not a real address)
  try {
    if (/\p{P}{5,}/u.test(s)) return false; // P = punctuation
  } catch (e) {
    if (/[^A-Za-z0-9\s]{5,}/.test(s)) return false;
  }

  // Reject extreme repetition of a single character (spam/garbage)
  if (/(.)\1{49,}/u.test(s)) return false;

  // Reject obvious non-address strings: URLs and email addresses
  if (/https?:\/\//i.test(s)) return false;
  if (/\b\S+@\S+\.\S+\b/.test(s)) return false;

  // Disallow angle bracket characters to reduce risk of markup/injection-like strings
  if (/[<>]/.test(s)) return false;

  // If all checks pass, treat it as a plausible single-line street address
  return true;
}

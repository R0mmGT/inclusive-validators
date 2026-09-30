function validate(input) {
  if (typeof input !== 'string') return false;
  const trimmed = input.trim();
  if (trimmed === '') return false;
  const name = typeof trimmed.normalize === 'function' ? trimmed.normalize('NFC') : trimmed;
  // Allows Unicode letters (with diacritics), optionally separated by single spaces, hyphens or apostrophes.
  // Rejects digits and other punctuation, disallows consecutive separators or leading/trailing separators.
  const re = /^(?=.{1,100}$)[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;
  return re.test(name);
}

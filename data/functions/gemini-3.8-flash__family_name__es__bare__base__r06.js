function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }
  return /^[\p{L}]+(?:[' -][\p{L}]+)*$/u.test(surname);
}

function validate(name) {
  if (typeof name !== 'string') return false;
  
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return false;

  const namePartRegex = /^[\p{L}]+(?:['\-][\p{L}]+)*\.?$/u;
  return parts.every(part => namePartRegex.test(part));
}

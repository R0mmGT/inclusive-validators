function validate(code) {
  if (typeof code !== 'string') return false;
  const s = code.trim();
  if (!/^\d{5}$/.test(s)) return false;
  const province = parseInt(s.slice(0, 2), 10);
  return province >= 1 && province <= 52;
}

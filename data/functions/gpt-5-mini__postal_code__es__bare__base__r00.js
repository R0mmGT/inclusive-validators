function validate(cp) {
  if (typeof cp !== 'string') return false;
  cp = cp.trim();
  if (!/^\d{5}$/.test(cp)) return false;
  const province = parseInt(cp.slice(0, 2), 10);
  return province >= 1 && province <= 52;
}

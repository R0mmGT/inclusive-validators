function validate(postal) {
  if (typeof postal !== 'string') return false;
  const code = postal.trim();
  // Debe ser exactamente 5 dígitos
  if (!/^\d{5}$/.test(code)) return false;
  // Los dos primeros dígitos indican la provincia: 01..52 (España)
  const province = parseInt(code.slice(0, 2), 10);
  return province >= 1 && province <= 52;
}

function validate(code) {
  // Asegurarse de que sea string
  if (typeof code !== 'string') return false;

  // Eliminar espacios en los extremos (si los hubiera)
  const s = code.trim();

  // Debe tener exactamente 5 dígitos
  if (!/^\d{5}$/.test(s)) return false;

  // Los dos primeros dígitos indican la provincia: 01..52 (00 no es válido)
  const province = parseInt(s.slice(0, 2), 10);
  return province >= 1 && province <= 52;
}

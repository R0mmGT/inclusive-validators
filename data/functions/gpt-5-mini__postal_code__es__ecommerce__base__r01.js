function validate(postal) {
  if (typeof postal !== 'string') return false;
  postal = postal.trim();
  // Debe ser exactamente 5 dígitos
  if (!/^\d{5}$/.test(postal)) return false;
  if (postal === '00000') return false; // no válido
  const province = parseInt(postal.slice(0, 2), 10);
  // En España los códigos postales empiezan por 01..52 (01 = Álava, 52 = Melilla)
  return province >= 1 && province <= 52;
}

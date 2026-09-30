function validate(postal) {
  // Aseguramos que es string y eliminamos espacios alrededor
  if (typeof postal !== 'string') return false;
  const s = postal.trim();

  // Códigos postales españoles: 5 dígitos, los dos primeros van de 01 a 52 (provincias 01-52)
  // Regex: (0[1-9] | [1-4][0-9] | 5[0-2]) seguido de tres dígitos
  return /^(?:0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/.test(s);
}

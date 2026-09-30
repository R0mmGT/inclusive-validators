function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Normalizamos caracteres Unicode (acentos, diacríticos, etc.)
  const trimmed = name.trim().normalize('NFC');

  // Longitud razonable para cualquier cultura (mínimo 2 caracteres, máximo 100)
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Solo permite letras de cualquier sistema de escritura (\p{L}),
  // marcas diacríticas (\p{M}), espacios, guiones, apóstrofes y puntos
  if (!/^[\p{L}\p{M}\s\-'.’]+$/u.test(trimmed)) {
    return false;
  }

  // Debe comenzar con una letra
  if (!/^[\p{L}\p{M}]/u.test(trimmed)) {
    return false;
  }

  // Debe terminar con una letra o un punto (por ejemplo, en iniciales o abreviaturas como "Jr.")
  if (!/[\p{L}\p{M}.]$/u.test(trimmed)) {
    return false;
  }

  // Evita combinaciones inválidas o duplicados consecutivos (ej. "--", "  ", "- ", " -", "..")
  if (/\s{2,}|[-'.’]{2,}|[-'’]\s|\s[-'’]|\.['’\-]/.test(trimmed)) {
    return false;
  }

  return true;
}

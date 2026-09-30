function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para un nombre de pila (entre 2 y 50 caracteres)
  // y comprobación de que no contenga espacios accidentales al inicio o al final
  if (trimmed.length < 2 || trimmed.length > 50 || trimmed !== name) {
    return false;
  }

  // Permite letras (incluye acentos, diéresis, ñ y caracteres Unicode alfabéticos)
  // Admite nombres compuestos separados por un único espacio, guion o apóstrofe intermedio
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(trimmed);
}

function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar y recortar espacios en los extremos
  const s = name.normalize('NFC').trim();
  if (s.length === 0) return false;

  // Contar por puntos de código (no por unidades UTF-16) y limitar longitud razonable
  const codepoints = [...s].length;
  if (codepoints > 200) return false;

  // Rechazar caracteres de control (p. ej. saltos de línea, tabs, etc.)
  if (/\p{Cc}/u.test(s)) return false;

  // Expresión regular inclusiva:
  // - Permite letras de cualquier alfabeto (\p{L}) y marcas combinantes (\p{M})
  // - Permite guiones/dashes Unicode (\p{Pd}), separadores de espacio (\p{Zs})
  // - Permite apóstrofes ASCII y U+2019, puntos y punto medio catalán U+00B7
  // - No permite que empiece o termine con carácter no letra (exige iniciar y terminar con letra)
  // - No permite dos espacios consecutivos
  // - No permite dos signos de puntuación (guión/apóstrofe/punto/punto medio) consecutivos
  const rx = /^(?!.*\p{Zs}{2,})(?!.*[\p{Pd}'’\.\u00B7]{2,})\p{L}(?:[\p{L}\p{M}\p{Pd}\p{Zs}'’\.\u00B7]*\p{L})?$/u;

  return rx.test(s);
}

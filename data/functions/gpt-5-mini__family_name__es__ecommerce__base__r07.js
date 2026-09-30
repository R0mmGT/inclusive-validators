function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Eliminamos espacios en los extremos
  const trimmed = name.trim();
  if (trimmed.length === 0) return false;

  // Longitud razonable (en puntos de código) — ajustar si se desea otro máximo
  const maxChars = 60;
  const codePoints = [...trimmed].length;
  if (codePoints > maxChars) return false;

  // Expresión regular que permite:
  // - Letras Unicode (\p{L}) y marcas de combinación (\p{M})
  // - Partes separadas por: espacio, guion (-), apóstrofo simple ('), apóstrofo curvo (’), o punto medio (·)
  // - No permite separadores al inicio o al final, ni dos separadores seguidos
  // - Cada parte debe empezar por una letra y puede llevar marcas/letters después
  //
  // Ejemplos válidos: "García", "De la Torre", "O'Neil", "Smith-Jones", "Montserrat·Pérez"
  const part = "\\p{L}[\\p{L}\\p{M}]*";
  const sep = "[ \\-'\u2019\u00B7]";
  const re = new RegExp(`^${part}(?:${sep}${part})*$`, 'u');

  return re.test(trimmed);
}

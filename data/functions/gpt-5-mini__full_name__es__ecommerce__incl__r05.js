function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar y recortar
  name = name.trim();
  if (name.length === 0) return false;
  if (name.length > 100) return false; // límite razonable (ajustable)

  // Rechazar control chars
  if (/[\p{C}]/u.test(name)) return false;

  // Rechazar dígitos explícitamente (nombres raramente contienen números)
  if (/\p{N}/u.test(name)) return false;

  /*
    Patrón pensado para nombres internacionales:
    - Permite letras de cualquier alfabeto (\p{L}) y marcas combinantes (\p{M}).
    - Permite guiones Unicode (\p{Pd}), apóstrofes comunes e variantes, puntos (para iniciales),
      y puntos centrales usados en algunos idiomas (·, ‧, ・).
    - Cada "parte" del nombre debe comenzar por una letra y no tener puntuación consecutiva.
    - Se permiten múltiples partes separadas por espacios.
    - Soporta iniciales como "J." y nombres compuestos como "Jean-Luc", "O'Neill", "李小龙".
  */
  const namePart = "[\\p{L}\\p{M}]+(?:['’\\u02BC\\u2018\\.\\u00B7\\u2027\\u30FB\\p{Pd}][\\p{L}\\p{M}]+)*\\.?";
  const fullRegex = new RegExp(`^(?:${namePart})(?:\\s+${namePart})*$`, "u");

  return fullRegex.test(name);
}

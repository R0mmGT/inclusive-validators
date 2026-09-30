function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar y recortar espacios alrededor
  const s = name.normalize('NFC').trim();

  // Longitud razonable (puedes ajustar los límites si lo deseas)
  if (s.length === 0 || s.length > 100) return false;

  // Debe contener al menos una letra de cualquier alfabeto / escritura
  if (!/\p{L}/u.test(s)) return false;

  /* 
    Caracteres permitidos:
    - Letras (\p{L}) y marcas de combinación (\p{M}) para acentos / diacríticos
    - Separadores de espacio (\p{Zs}) — NO se permiten tabuladores o saltos de línea
    - Guiones/dashes (\p{Pd}), apóstrofos (') y ’, punto (.) y punto centrado (·)
  */
  const allowed = /^[\p{L}\p{M}\p{Zs}\p{Pd}'\u2019·.]+$/u;
  if (!allowed.test(s)) return false;

  // No permitir que empiece por algo que no sea letra
  if (!/^\p{L}/u.test(s)) return false;

  // Permitir que termine en letra o en punto (para sufijos como "Jr.")
  if (!/(\p{L}|[.])$/u.test(s)) return false;

  // Evitar secuencias de puntuación repetida (ej. "--", "''", "..")
  if (/[.\p{Pd}'\u2019·]{2,}/u.test(s)) return false;

  // Evitar espacios consecutivos
  if (/\p{Zs}{2,}/u.test(s)) return false;

  // Evitar que guiones/apóstrofos/puntos centrados/dashes estén adyacentes a espacios
  // (por ejemplo: "Mary -" o " O' " suelen ser inválidos; se permiten "." seguido de espacio para iniciales)
  // Nota: permitimos ". " (punto + espacio) porque es común en iniciales ("J. R. R.")
  if (/(?:\p{Zs}[\p{Pd}'\u2019·])|(?:[\p{Pd}'\u2019·]\p{Zs})/u.test(s)) return false;

  // Reglas simples adicionales: evitar nombres que sean solo una única letra seguida solo de punto (p. ej. "J.")
  // aunque iniciales dentro de un nombre son válidas ("J. R. R. Tolkien")
  if (/^[\p{L}]\.$/u.test(s)) return false;

  // Si pasa todas las comprobaciones, consideramos el valor como un nombre válido
  return true;
}

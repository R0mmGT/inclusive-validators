function validate(line) {
  // Valida que "line" sea una línea de dirección postal (calle) razonable y flexible
  // para usuarios de cualquier país/cultura.
  // Reglas aplicadas (buscando un equilibrio entre permisividad y sanity checks):
  // - Debe ser string.
  // - Se recorta espacios iniciales/finales; no puede quedar vacío.
  // - Longitud máxima razonable (200 chars).
  // - No puede contener caracteres de control ni saltos de línea.
  // - Debe contener al menos una letra o número en cualquier alfabeto (Unicode).
  // - Se rechazan los caracteres < y > (raros en direcciones y fuente de inyección).
  // - Se rechazan secuencias largas de signos de puntuación/símbolos (ej. "!!!!" o "----").
  // - Se rechazan corridas largas de espacios en blanco (indicador de entrada corrupta).
  //
  // Nota: esta función es deliberadamente permisiva en cuanto a símbolos, acentos,
  // guiones, barras, números de piso, etc., para cubrir prácticas de direcciones globales.
  if (typeof line !== 'string') return false;

  const s = line.trim();
  if (s.length === 0 || s.length > 200) return false;

  // No permitimos saltos de línea ni otros caracteres de control/unassigned
  // \p{C} = Other (control, format, private use, surrogates, unassigned)
  if (/\p{C}/u.test(s)) return false;

  // Debe tener al menos una letra o número en cualquier escritura (Unicode)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Rechazar caracteres angulares que no suelen pertenecer a una línea de dirección
  if (/[<>]/.test(s)) return false;

  // Rechazar secuencias muy largas de puntuación/símbolos (4 o más seguidos)
  if (/[\p{P}\p{S}]{4,}/u.test(s)) return false;

  // Rechazar corridas largas de espacios en blanco (5 o más)
  if (/\s{5,}/.test(s)) return false;

  // Todo lo demás se considera válido (permite letras diacríticas, alfabetos no latinos,
  // números, signos comunes en direcciones: .,/#!&-()[]:'" etc.).
  return true;
}

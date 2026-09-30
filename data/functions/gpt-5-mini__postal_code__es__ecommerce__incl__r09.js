function validate(postal) {
  // Debe ser una cadena
  if (typeof postal !== 'string') return false;

  const s = postal.trim();
  // Reglas generales razonables para cubrir la mayoría de países:
  // - longitud mínima 2, máxima 12 (incluye espacios/hífens)
  // - sólo letras, dígitos, espacios simples y guiones simples
  // - no espacios ni guiones consecutivos ni al inicio/fin (trim ya elimina espacios al inicio/fin)
  // - al menos un carácter alfabético o numérico
  if (s.length < 2 || s.length > 12) return false;

  // Detectar si el entorno soporta escapes Unicode (\p{L}, \p{Nd})
  let supportsUnicodeProps = false;
  try {
    new RegExp('\\p{L}', 'u');
    supportsUnicodeProps = true;
  } catch (e) {
    supportsUnicodeProps = false;
  }

  const pattern = supportsUnicodeProps
    // Segmentos de letras/dígitos separados por un único espacio o un único guion
    ? /^(?=.{2,12}$)(?=.*[\p{L}\p{Nd}])[\p{L}\p{Nd}]+(?:[ -][\p{L}\p{Nd}]+)*$/u
    // Fallback ASCII: A-Z, a-z, 0-9
    : /^(?=.{2,12}$)(?=.*[A-Za-z0-9])[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;

  return pattern.test(s);
}

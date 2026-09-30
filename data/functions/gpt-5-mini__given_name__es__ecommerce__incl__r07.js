function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Eliminar espacios al inicio y final
  const s = name.trim();

  // Longitud razonable: al menos 1 y como máximo 100 caracteres
  if (s.length === 0 || s.length > 100) return false;

  // Definimos clases Unicode:
  // - \p{L} : cualquier letra (todas las escrituras)
  // - \p{M} : marcas diacríticas combinantes
  // - \p{Nl}: números que forman parte de nombres en algunas escrituras
  // Separadores permitidos entre grupos de letras:
  // - \p{Zs} : espacios (incluye NBSP y otros espacios)
  // - \p{Pd} : signos de guion (en dash, hyphen, etc.)
  // - apostrofes comunes y variantes: ' U+2019 U+02BC
  // - middle dot U+00B7 (usado en algunas culturas)
  //
  // La expresión exige que empiece y termine por una letra/marca/nl,
  // permite separadores internamente, y prohíbe separadores consecutivos.
  const pattern = [
    '^[\\p{L}\\p{M}\\p{Nl}]+',                 // primer bloque de letras
    '(?:[\\p{Zs}\\p{Pd}\'\\u2019\\u02BC\\u00B7][\\p{L}\\p{M}\\p{Nl}]+)*', // bloques siguientes con separadores
    '$'
  ].join('');

  // 'u' para soporte Unicode property escapes
  try {
    const re = new RegExp(pattern, 'u');
    return re.test(s);
  } catch (e) {
    // En entornos muy antiguos que no soporten \p{} devolvemos una verificación más permisiva:
    // Acepta letras (a-z, A-Z), letras acentuadas comunes y separadores simples.
    const fallback = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-·][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return fallback.test(s);
  }
}

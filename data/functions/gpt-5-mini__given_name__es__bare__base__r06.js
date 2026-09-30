function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar espacios alrededor
  name = name.trim();

  // Longitud razonable (evita entradas vacías o extremadamente largas)
  if (name.length === 0 || name.length > 100) return false;

  // Regex Unicode:
  // - \p{L} letras de cualquier alfabeto
  // - \p{M} marcas de combinación (acentos combinantes)
  // - permite separadores internos: espacio, guion, apóstrofes comunes (', ’, ‘, ʼ)
  // - no permite separadores al inicio/final ni dobles consecutivos (se exige letra tras separador)
  const re = /^[\p{L}\p{M}]+(?:[ \-'\u2019\u2018\u02BC][\p{L}\p{M}]+)*$/u;

  return re.test(name);
}

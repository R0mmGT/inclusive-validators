function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length < 2 || s.length > 60) return false;

  // Permitir letras Unicode y marcas (acentos), y separar palabras con:
  // - espacio
  // - apóstrofo ASCII ' y apóstrofos tipográficos ’ ‘
  // - guion medio -
  // - guion corto/en dash (–) y em dash (—)
  // - punto medio · (ej. nombres catalanes)
  // No se permiten dígitos, otros signos de puntuación ni separadores consecutivos.
  const re = /^[\p{L}\p{M}]+(?:(?:['\u2018\u2019\-\u2013\u2014\u00B7]|\s)[\p{L}\p{M}]+)*$/u;
  return re.test(s);
}

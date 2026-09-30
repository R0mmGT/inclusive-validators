function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Recortar espacios al inicio/fin y comprobar longitud razonable
  const str = name.trim();
  if (str.length < 2 || str.length > 60) return false;

  // Reglas:
  // - Solo letras Unicode y marcas (acentos), espacios simples, guión medio (-) y apóstrofo (')
  // - No puede empezar ni terminar por espacio, guión o apóstrofo
  // - No pueden aparecer dos separadores consecutivos (ej. "--", "  ", "''", " -", etc.)
  // - Cada bloque entre separadores debe contener al menos una letra
  const re = /^(?!.*[ '\-]{2})(?!^[ '\-])(?!.*[ '\-]$)[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;
  return re.test(str);
}

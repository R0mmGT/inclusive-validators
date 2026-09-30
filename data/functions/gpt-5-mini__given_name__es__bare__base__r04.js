function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Recortar espacios al inicio y fin
  const s = name.trim();

  // Longitud razonable (al menos 1 carácter, máximo 60 para evitar entradas absurdas)
  if (s.length === 0 || s.length > 60) return false;

  // Expresión regular:
  // - \p{L} y \p{M} permiten letras Unicode y marcas diacríticas
  // - Se permite como separador: espacio, guion (-), apóstrofo (') y comilla simple derecha (’)
  // - No puede empezar ni terminar con separadores y no se permiten separadores consecutivos
  const nameRegex = /^[\p{L}\p{M}]+(?:[ \-'\u2019][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(s);
}

function validate(address) {
  // Validación básica de tipo y recorte
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length < 3 || s.length > 200) return false; // longitudes razonables para una línea de calle

  // Debe contener al menos una letra o un número (soporta todos los alfabetos Unicode)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Sólo permitir caracteres Unicode de letras, números, marcas (diacríticos),
  // puntuación y separadores de espacio: es amplio y compatible con la mayoría de escrituras del mundo.
  // Esto evita controles, caracteres de formato y la mayoría de símbolos/emoji no deseados.
  if (!/^[\p{L}\p{N}\p{M}\p{P}\p{Zs}]+$/u.test(s)) return false;

  // Evitar secuencias inverosímiles: demasiada puntuación seguida (p. ej. "...." o "----")
  if (/[\p{P}]{4,}/u.test(s)) return false;

  // Evitar espacios repetidos excesivos
  if (s.indexOf('     ') !== -1) return false; // 5 espacios seguidos

  // Evitar un mismo carácter repetido muchas veces (p. ej. "aaaaaaaaa" o "11111111")
  if (/(.)\1{6,}/u.test(s)) return false; // 7+ repeticiones iguales

  // Si pasa todas las comprobaciones, se considera válida (enfoque permissivo y multilingüe)
  return true;
}

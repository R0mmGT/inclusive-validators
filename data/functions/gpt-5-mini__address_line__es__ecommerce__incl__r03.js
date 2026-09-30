function validate(address) {
  // Debe recibir un string
  if (typeof address !== 'string') return false;

  // Trim y comprobación de longitud razonable
  const s = address.trim();
  if (s.length < 2 || s.length > 200) return false;

  // Rechazar si contiene control chars (incluye saltos de línea, tabuladores, etc.)
  if (/\p{Cc}/u.test(s)) return false;

  // Requerir al menos una letra (cubre todos los alfabetos y escrituras gracias a \p{L})
  if (!/\p{L}/u.test(s)) return false;

  // Conjunto de caracteres permitidos:
  // - \p{L} letras, \p{N} números, \p{M} marcas diacríticas
  // - \p{Zs} separadores de espacios (espacio, NBSP, etc.)
  // - signos y puntuación comunes en direcciones (guión, coma, punto, barra, numeral, signos de grado/ordinal, paréntesis, corchetes, dos puntos, punto y coma, apóstrofes, comillas, &, +, %, ·, guiones largos/medios, puntos suspensivos, barra invertida)
  // Este conjunto pretende ser lo bastante amplio para cubrir direcciones internacionales, pero sin aceptar controles o símbolos raros.
  const allowedRe = /^[\p{L}\p{N}\p{M}\p{Zs}\-\.,\/#ºª°'’"():;\[\]\{\}&+\%·–—…\\]+$/u;
  if (!allowedRe.test(s)) return false;

  // Rechazar secuencias de puntuación/símbolos excesivas (p. ej. "!!!" o "///")
  // Buscamos 3 o más caracteres consecutivos que no sean letra, número ni espacio.
  if (/[^\p{L}\p{N}\p{Zs}]{3,}/u.test(s)) return false;

  // Rechazar cadenas que son solo repetición de un mismo carácter significativo (p. ej. "-----" o ".....")
  if (/^(.)(?:\1){4,}$/.test(s)) return false; // más de 5 iguales idénticos seguidos -> sospechoso

  // Evitar direcciones que solo consisten en abreviaturas potencialmente no informativas
  // (p. ej. una sola letra seguida de puntuación). Requerimos al menos 2 "componentes"
  // separados por espacio o signo de separación, o bien una palabra con longitud >= 2.
  const parts = s.split(/[\p{Zs}\-\/#,]+/u).filter(Boolean);
  const hasLongWord = parts.some(p => p.length >= 2);
  if (!hasLongWord) return false;

  // Si pasa todas las comprobaciones, consideramos la línea de calle válida.
  return true;
}

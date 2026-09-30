function validate(input) {
  // Debe ser una cadena
  if (typeof input !== 'string') return false;

  // Recortar espacios visibles al inicio y final
  const s = input.trim();

  // No vacío y longitud razonable (ajustable)
  if (s.length === 0 || s.length > 200) return false;

  // No debe contener saltos de línea (es una línea de dirección)
  if (/[\r\n]/.test(s)) return false;

  // Rechazar caracteres de control / categorías Unicode "Other" (Cc, Cf, Cs, Co, Cn)
  if (/\p{C}/u.test(s)) return false;

  // Debe contener al menos una letra o un número (acepta alfabetos no latinos gracias a \p{L} y \p{N})
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Evitar textos que sean sólo símbolos/puntuación repetida (p. ej. "----" o "!!!")
  // Permitimos símbolos y puntuación útiles en direcciones, pero bloqueamos repeticiones largas del mismo símbolo.
  if (/([^\p{L}\p{N}\s])\1{3,}/u.test(s)) return false;

  // Si pasa todas las comprobaciones, consideramos la línea como válida
  return true;
}

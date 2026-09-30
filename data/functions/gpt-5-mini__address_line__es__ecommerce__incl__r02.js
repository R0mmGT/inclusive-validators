function validate(address) {
  // Debe ser una cadena
  if (typeof address !== 'string') return false;

  // Recortar espacios visibles al inicio y final
  const str = address.trim();

  // Longitud razonable: al menos 3 caracteres y a lo sumo 200 (ajustable)
  if (str.length < 3 || str.length > 200) return false;

  // Rechazar caracteres de control (incluye saltos de línea, tabulaciones, etc.)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(str)) return false;

  // Evitar etiquetas HTML / inyección evidente: negar < y >
  if (/[<>]/.test(str)) return false;

  // Requiere al menos una letra o un número (soporte Unicode para todas las escrituras)
  if (!/[\p{L}\p{N}]/u.test(str)) return false;

  // Permitir solo categorías Unicode apropiadas para direcciones:
  // letras (L), números (N), puntuación (P), espacios (Zs) y marcas diacríticas (M).
  // Esto permite nombres en cualquier idioma y la mayoría de signos habituales en direcciones.
  if (!/^[\p{L}\p{N}\p{P}\p{Zs}\p{M}]+$/u.test(str)) return false;

  // Rechazar cadenas que sean esencialmente sólo puntuación o símbolos repetidos.
  // Ya comprobamos que hay al menos una letra/dígito, así que esto es redundante en la mayoría de casos,
  // pero añadimos una protección extra: no permitir más de 6 separadores/puntuaciones seguidos.
  if (/[\p{P}\p{Zs}]{7,}/u.test(str)) return false;

  // Pasó todas las comprobaciones básicas; aceptarla como línea de dirección válida.
  return true;
}

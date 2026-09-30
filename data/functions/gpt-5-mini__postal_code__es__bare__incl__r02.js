function validate(input) {
  // Debe ser una cadena
  if (typeof input !== 'string') return false;

  // Normalizar y recortar
  let s = input.normalize('NFKC').trim();

  // Longitud razonable para códigos postales internacionales (ajustable)
  if (s.length < 2 || s.length > 12) return false;

  // Homogeneizar variantes de guion y espacios no separables a caracteres comunes
  s = s.replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-').replace(/\u00A0/g, ' ').replace(/\u00B7/g, '·');

  // Permitir letras (cualquier alfabeto), números (cualquier sistema numérico), espacio, guion y punto medio
  const allowedRe = /^[\p{L}\p{N} \-·]+$/u;
  if (!allowedRe.test(s)) return false;

  // No puede empezar o terminar en separador (espacio, guion o punto medio)
  if (/^[ \-·]/.test(s) || /[ \-·]$/.test(s)) return false;

  // Evitar separadores consecutivos (ej. "--" o doble espacio)
  if (/([ \-·])\1+/.test(s)) return false;

  // Al menos un carácter alfanumérico (letra o número)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Si pasó todas las reglas, lo consideramos un código postal plausible
  return true;
}

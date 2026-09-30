function validate(address) {
  // Acepta solo strings
  if (typeof address !== 'string') return false;
  const s = address.trim();
  // Longitud razonable
  if (s.length < 3 || s.length > 120) return false;

  // Caracteres permitidos: letras (Unicode), dígitos, espacios y signos comunes en direcciones
  // . , - / # º ª ° ( )
  const allowed = /^[\p{L}\p{N}\s\.,\-\/#ºª°\(\)]+$/u;
  if (!allowed.test(s)) return false;

  // Debe contener al menos una letra (nombre de calle)
  if (!/\p{L}/u.test(s)) return false;

  // Consideramos válida si:
  // - contiene al menos un dígito (número de portal)  OR
  // - contiene la abreviatura "s/n" (sin número), en cualquier mayúscula/minúscula
  if (/\d/.test(s)) return true;
  if (/(^|\s)s\/n($|\s)/i.test(s)) return true;

  // Rechaza otras formas sin número explícito
  return false;
}

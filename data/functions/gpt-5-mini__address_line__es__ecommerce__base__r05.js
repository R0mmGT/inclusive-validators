function validate(address) {
  // Valida que la línea de dirección (calle) cumpla unas reglas razonables:
  // - tipo string
  // - longitud entre 5 y 100 caracteres (ajustable)
  // - no caracteres peligrosos como '<' o '>'
  // - solo caracteres permitidos (letras unicode, números y signos comunes en direcciones)
  // - no secuencias de puntuación repetida (ej. ".." o "--")
  // - debe contener al menos una letra
  // - debe contener dígitos OR al menos dos palabras con letras (p. ej. "Calle Mayor" o "Av. Libertad 23")
  //
  // Estas reglas buscan un equilibrio entre permitir direcciones reales y evitar entradas claramente inválidas.
  if (typeof address !== 'string') return false;

  const s = address.trim();

  if (s.length < 5 || s.length > 100) return false;

  // Rechaza etiquetas HTML u otros signos de deliminación de código
  if (/[<>]/.test(s)) return false;

  // Permitir letras Unicode (\p{L}), números (\p{N}), espacios y signos habituales en direcciones
  const allowed = /^[\p{L}\p{N}\s\.\,\-\/\#ºª°\(\)'"&:]+$/u;
  if (!allowed.test(s)) return false;

  // Evita secuencias de puntuación repetida que suelen ser errores o intentos de inyección
  if (/[.\,\-\/#ºª°\(\)'"&:]{2,}/.test(s)) return false;

  // Debe contener al menos una letra
  if (!/[\p{L}]/u.test(s)) return false;

  // Cuenta las "palabras" que contienen letras
  const letterWords = s.split(/\s+/).filter(w => /[\p{L}]/u.test(w));

  // Si hay al menos dos palabras con letras (p. ej. "Calle Mayor") es válido
  if (letterWords.length >= 2) return true;

  // Si no, permitimos una sola palabra con letras siempre que haya también un número
  if (/[0-9]/.test(s)) return true;

  // En cualquier otro caso, inválido (por ejemplo: una sola palabra sin número: "Plaza")
  return false;
}

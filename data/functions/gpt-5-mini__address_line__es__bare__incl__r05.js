function validate(line) {
  // Debe ser string
  if (typeof line !== 'string') return false;

  // Sin espacios al principio/final y longitud razonable
  const s = line.trim();
  if (s.length === 0) return false;
  if (s.length > 200) return false; // límite superior razonable para una línea de dirección

  // Debe ser una sola línea (no saltos de línea)
  if (/\r|\n/.test(s)) return false;

  // Rechazar caracteres de control invisibles (incluye NUL)
  if (/\p{C}/u.test(s)) return false;

  // Debe contener al menos una letra Unicode (cualquier alfabeto/escritura),
  // esto evita cadenas compuestas únicamente por números o puntuación.
  // Muchas direcciones legítimas en todo el mundo contienen letras en su línea de calle,
  // y las escrituras CJK también están incluidas en \p{L}.
  if (!/\p{L}/u.test(s)) return false;

  // Evitar caracteres angulares que suelen ser usados en inyección o HTML accidentalmente.
  if (/[<>]/.test(s)) return false;

  // Rechazar secuencias muy largas de un mismo signo de puntuación (ruido)
  // p. ej. "::::::" o "!!!!!!!!!!"
  if (/([^\p{L}\p{N}\s])\1{4,}/u.test(s)) return false;

  // Evitar cadenas que sean solo puntuación y espacios (de nuevo, comprobado en parte por \p{L})
  // pero añadir una comprobación adicional: en caso extremo, asegurar presencia de
  // al menos una letra o dígito combinado con letras (ya comprobamos letras).
  // A partir de aquí, consideramos la línea válida.
  return true;
}

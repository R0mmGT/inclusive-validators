function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Recortar espacios extremos
  const s = name.trim();

  // Longitud razonable (mínimo 2, máximo 100)
  if (s.length < 2 || s.length > 100) return false;

  // Debe contener al menos una letra Unicode
  if (!/\p{L}/u.test(s)) return false;

  // No se permiten caracteres fuera del conjunto aceptado:
  // letras Unicode (\p{L}), marcas de acento (\p{M}), espacios,
  // apóstrofes (') y ’, guiones -, punto medio ·, y puntos .
  if (!/^[\p{L}\p{M}\s'’\-·\.]+$/u.test(s)) return false;

  // No puede empezar ni terminar con un carácter que no sea letra
  if (!/^\p{L}/u.test(s) || !/\p{L}$/u.test(s)) return false;

  // No permitir múltiples signos de puntuación seguidos (ej. "--" o ".." o "''")
  if (/[\'’\-·\.]{2,}/u.test(s)) return false;

  // No permitir múltiples espacios consecutivos
  if (/\s{2,}/u.test(s)) return false;

  // Separar en "palabras" por espacios (uno o más)
  const parts = s.split(/\s+/);

  // Cada "palabra" válida puede ser:
  // - una inicial como "J." o "J"
  // - o una secuencia de letras (con marcas) que opcionalmente contienen
  //   apóstrofes, guiones, puntos o · en su interior (ej. O'Neill, Anne-Marie, St. John)
  const partRe = /^(?:\p{L}\.?|[\p{L}\p{M}]+(?:[\'’\-·\.][\p{L}\p{M}]+)*)$/u;

  for (const p of parts) {
    if (!partRe.test(p)) return false;
  }

  // Evitar nombres compuestos únicamente por iniciales (ej. "J. R. R.")
  // Requerimos que al menos una de las partes tenga 2 o más letras (no contando marcas).
  const lettersCountInPart = part => {
    const m = part.match(/\p{L}/gu);
    return m ? m.length : 0;
  };
  if (!parts.some(p => lettersCountInPart(p) >= 2)) return false;

  // Todo ok
  return true;
}

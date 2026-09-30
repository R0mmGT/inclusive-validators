function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Recortar espacios al inicio/fin y comprobar longitud razonable
  name = name.trim();
  if (name.length < 2 || name.length > 100) return false;

  // Debe contener al menos dos palabras (nombre + apellido)
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // Regex para partes "normales" (letras Unicode, permitiendo apóstrofo y guion entre letras)
  // Usamos \p{L} con el flag u para aceptar letras acentuadas y de otros alfabetos.
  const wordRe = /^\p{L}+(?:['\u2019-]\p{L}+)*$/u;

  // Regex para inicial (ej. "J" o "J.")
  const initialRe = /^\p{L}\.?$/u;

  // Debe haber al menos una parte con 2 o más letras (para evitar nombres compuestos solo por iniciales)
  let hasLongPart = false;

  for (const part of parts) {
    if (initialRe.test(part)) {
      // una inicial está permitida
      const letters = (part.match(/\p{L}/gu) || []).length;
      if (letters >= 2) hasLongPart = true; // improbable aquí, pero por consistencia
      continue;
    }
    if (!wordRe.test(part)) {
      // si no coincide con ninguna forma válida, nombre inválido
      return false;
    }
    // contar letras en la parte para verificar que haya una parte "larga"
    const lettersCount = (part.match(/\p{L}/gu) || []).length;
    if (lettersCount >= 2) hasLongPart = true;
  }

  if (!hasLongPart) return false;

  return true;
}

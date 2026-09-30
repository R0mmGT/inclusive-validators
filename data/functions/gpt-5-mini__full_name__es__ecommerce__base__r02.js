function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Recortar espacios al inicio y final
  name = name.trim();

  // Longitud razonable
  if (name.length < 2 || name.length > 100) return false;

  // No permitir dígitos
  if (/\p{N}/u.test(name)) return false;

  // No permitir varios espacios consecutivos
  if (/\s{2,}/.test(name)) return false;

  // Debe empezar y acabar por una letra
  if (!/^\p{L}/u.test(name) || !/\p{L}$/u.test(name)) return false;

  // No permitir dos caracteres no-letra consecutivos (evita "..", "--", "''", "-.", etc.)
  if (/(?:[^\p{L}\p{M}\s]){2,}/u.test(name)) return false;

  // Patrón de "palabra" aceptable:
  // - inicial con punto (J.)
  // - o palabra que empieza por letra y puede contener letras, marcas diacríticas,
  //   apóstrofes, guiones, puntos y middle dot
  const word = "(?:\\p{L}\\.|\\" +
               "p{L}[\\p{L}\\p{M}'’\\-\\.\\u00B7]*)";
  // Debe haber al menos dos palabras separadas por espacios
  const fullRe = new RegExp("^" + word + "(?:\\s+" + word + ")+$", "u");

  if (!fullRe.test(name)) return false;

  // Evitar palabras extraordinariamente largas (protección extra)
  for (const w of name.split(/\s+/)) {
    if (w.length > 50) return false;
  }

  return true;
}

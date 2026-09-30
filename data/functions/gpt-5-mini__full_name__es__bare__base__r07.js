function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Normalizar espacios alrededor
  name = name.trim();
  if (name.length === 0) return false;

  // Tamaño razonable
  if (name.length > 200) return false;

  // Cada "parte" del nombre puede ser:
  // - una palabra que comienza por una letra y puede contener letras (con marcas diacríticas),
  //   y segmentos unidos por guiones o apóstrofes (p. ej. O'Neill, Anne-Marie, María-José)
  // - o una inicial (una sola letra) con o sin punto (p. ej. J. o J)
  //
  // Usamos \p{L} y \p{M} (propiedades Unicode) para permitir letras con acentos y otros alfabetos.
  // Se evita que guiones o apóstrofes estén al principio o final de una parte, y que estén repetidos.
  const segment = "\\p{L}[\\p{L}\\p{M}]*";
  const word = `${segment}(?:[\\-'’]${segment})*`; // palabra posible con guiones/apóstrofes internos
  const initial = "\\p{L}\\.?";                     // inicial con o sin punto
  const part = `(?:${word}|${initial})`;

  // Al menos dos partes separadas por espacios (nombre completo)
  const re = new RegExp(`^${part}(?:\\s+${part})+$`, 'u');

  return re.test(name);
}

function validate(input) {
  // Debe recibir un string
  if (typeof input !== 'string') return false;

  // Normalización Unicode (NFC) y unificar espacios (incluye NBSP, tabs, etc.) en espacio simple
  if (typeof input.normalize === 'function') {
    input = input.normalize('NFC');
  }
  // Reemplazar cualquier secuencia de espacios/whitespace por un espacio normal y recortar
  const s = input.replace(/\s+/g, ' ').trim();

  // Vacío no válido; límite razonable superior para evitar entradas absurdamente largas
  if (s.length === 0 || s.length > 100) return false;

  // Explicación de la expresión:
  // \p{L} = cualquier letra Unicode
  // \p{M} = marcas (diacríticos combinantes)
  // Se permite que los "grupos de letras" estén separados por:
  // - espacio (U+0020)
  // - guion medio (-)
  // - apóstrofo ASCII (')
  // - apóstrofo tipográfico/right single quote (U+2019)
  // - interpunkción central/middle dot (U+00B7) (ej. catalán)
  // No se permiten dígitos, símbolos ni puntuación adicional.
  const nameRe = /^\p{L}\p{M}*(?:[ \-'\u2019\u00B7]\p{L}\p{M}*)*$/u;

  return nameRe.test(s);
}

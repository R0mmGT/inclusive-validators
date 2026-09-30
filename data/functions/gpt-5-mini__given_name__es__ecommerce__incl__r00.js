function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Recortar espacios en los extremos (no permitimos separadores al inicio/fin)
  const trimmed = name.trim();
  if (trimmed.length === 0) return false;

  // Contar puntos de código Unicode para limitar longitud razonable
  const length = Array.from(trimmed).length;
  if (length > 100) return false; // límite alto y prudente

  // Construimos una expresión regular Unicode permisiva pero restrictiva:
  // - \p{L} = cualquier letra Unicode (todas las escrituras)
  // - \p{M} = marcas combinantes (diacríticos)
  // - \p{Zs} = separadores de espacio (espacio normal, NBSP, etc.)
  // - \p{Pd} = signos de puntuación tipo guion (guion, en-dash, em-dash, ...)
  // - se permiten apóstrofes comunes y similares (', ’, ʼ) y el punto medio · (U+00B7)
  // La forma obliga a que cada "segmento" contenga al menos una letra y que
  // los separadores no aparezcan al inicio, al final ni repetidos.
  const letterSegment = '\\p{L}\\p{M}*';
  const separatorClass = "[\\p{Zs}\\p{Pd}\\u02BC'\\u2019\\u00B7]";
  const regex = new RegExp('^' + letterSegment + '(?:' + separatorClass + letterSegment + ')*$', 'u');

  return regex.test(trimmed);
}

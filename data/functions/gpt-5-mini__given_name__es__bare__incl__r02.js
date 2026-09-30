function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Trim para ignorar espacios alrededor
  const s = name.trim();

  // Rechaza vacíos y nombres excesivamente largos (ajustable)
  if (s.length === 0 || s.length > 100) return false;

  /*
    Patrón Unicode inclusivo:
    - \p{L} = cualquier carácter de letra en Unicode (alfabetos latinos, cirílico, árabe, chino, etc.)
    - \p{M} = marcas combinantes (diacríticos)
    - \p{Pd} = signos de raya/guion Unicode (en vez de sólo '-')
    - Se permiten como separadores: espacio, cualquier guion (\p{Pd}), apóstrofos comunes (' U+0027, ’ U+2019, ʼ U+02BC),
      y puntos medios usados en algunos idiomas (· U+00B7, ‧ U+2027).
    - Cada "segmento" del nombre debe contener al menos una letra (posible seguida de marcas).
    - No se permiten separadores consecutivos, ni al principio ni al final.
  */
  const pattern = new RegExp(
    '^[\\p{L}\\p{M}]+' +
    '(?:[ \\p{Pd}\\\'\u2019\u02BC\u00B7\u2027][\\p{L}\\p{M}]+)*' +
    '$',
    'u'
  );

  return pattern.test(s);
}

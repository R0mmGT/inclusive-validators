function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Quitar espacios iniciales/finales y comprobar longitud razonable
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  /*
    Patrón pensado para nombres internacionales:
    - Empieza con una letra (\p{L})
    - Permite marcas combinantes (\p{M}) inmediatamente después de letras
    - Permite como separadores: espacios, guiones (todas las puntuaciones de guion \p{Pd}),
      puntos medios/interpuntos (·), y variantes de apóstrofo comunes (' ’ ʼ ʻ)
    - Un separador siempre debe ir seguido de una letra (no se permiten separadores consecutivos,
      ni empezar/terminar con separador)
    - No permite números, símbolos, signos de puntuación extra ni emojis
  */
  const pattern = /^\p{L}[\p{L}\p{M}]*(?:[ \p{Pd}\u00B7\u0027\u2019\u02BC\u02BB]\p{L}[\p{L}\p{M}]*)*$/u;

  return pattern.test(name);
}

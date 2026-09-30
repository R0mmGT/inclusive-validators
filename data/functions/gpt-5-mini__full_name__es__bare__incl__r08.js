/**
 * validate(name: string) => boolean
 *
 * Validación inclusiva y práctica de "nombre completo".
 * - Acepta letras de cualquier alfabeto (Unicode).
 * - Permite marcas diacríticas (combining marks).
 * - Permite espacios, guiones, apóstrofes, puntos (para iniciales/sufijos) y puntos medios usados en algunos idiomas.
 * - Rechaza dígitos, símbolos extraños y secuencias de separadores (p. ej. "--" o "..").
 * - Acepta nombres de una sola palabra (válido en muchas culturas) y nombres sin espacios (p. ej. nombres chinos).
 * - Longitud entre 1 y 200 caracteres (ajustable).
 *
 * No existe una forma perfecta de validar "todos" los nombres sin falsos negativos/positivos;
 * esta función aplica reglas conservadoras y ampliamente compatibles sin depender de listas por país.
 */
function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 200) return false;

  // Regex explicado:
  // ^(?=.{1,200}$)                         -> longitud total (ya comprobada, pero queda aquí por seguridad)
  // (?!.*[...]{2,})                       -> no permitir dos separadores consecutivos
  // \p{L}                                  -> debe comenzar con una letra (de cualquier alfabeto)
  // (?:[\p{L}\p{M}...]*[\p{L}\p{M}])?     -> cuerpo: letras/marks y separadores permitidos; si hay más caracteres, termina en letra/mark
  // (?:\.)?                                -> opcionalmente permitir un punto final (p. ej. sufijos tipo "Jr.")
  // $                                      -> fin
  //
  // Separadores permitidos dentro de la clase:
  // - espacio (\u0020)
  // - guion ASCII '-' y guiones comunes en Unicode (\u2010, \u2011, \u2013)
  // - punto '.' (se usa para iniciales; no se permiten repeticiones por la negativa de arriba)
  // - apóstrofo ASCII "'" y apóstrofo tipográfico U+2019
  // - punto medio U+00B7 (usado en algunas transcripciones) y katakana middle dot U+30FB
  //
  // El modificador 'u' permite las propiedades Unicode (\p{L}, \p{M}).
  const NAME_RE = /^(?=.{1,200}$)(?!.*[ \-\u2010\u2011\u2013\.\'\u2019\u00B7\u30FB]{2,})\p{L}(?:[\p{L}\p{M} \-\u2010\u2011\u2013\.\'\u2019\u00B7\u30FB]*[\p{L}\p{M}])?(?:\.)?$/u;

  return NAME_RE.test(s);
}

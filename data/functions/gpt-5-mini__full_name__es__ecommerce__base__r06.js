function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // No llevar espacios al inicio/final
  if (name !== name.trim()) return false;

  // Longitud razonable
  const len = name.length;
  if (len < 3 || len > 100) return false;

  // No espacios consecutivos
  if (/\s{2,}/.test(name)) return false;

  // Construcción de la expresión regular usando propiedades Unicode:
  // - \p{L}\p{M}* : letras y sus marcas diacríticas
  // - Se permiten guiones y apóstrofes (ASCII ' y U+2019) dentro de una palabra
  // - Se permiten iniciales con punto (p. ej. "J.")
  // Requiere al menos dos "palabras" separadas por espacios.
  const letter = "\\p{L}\\p{M}*";
  const segment = `${letter}+`;
  const connectorChars = "\\-\\'\\u2019";
  const multi = `(?:${segment}(?:[${connectorChars}]${segment})*)`; // ej. O'Connor, Jean-Luc
  const initial = `(?:${letter}\\.)`; // ej. J.
  const word = `(?:${multi}|${initial})`;
  const fullPattern = `^${word}(?: ${word})+$`; // al menos dos palabras separadas por espacio

  const re = new RegExp(fullPattern, 'u');

  return re.test(name);
}

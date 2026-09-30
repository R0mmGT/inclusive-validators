/**
 * Valida un nombre de pila (primer nombre) de forma lo más inclusiva posible
 * para diferentes países y escrituras sin usar librerías externas.
 *
 * Reglas (diseñadas para ser amplias e inclusivas):
 * - Debe ser una cadena con al menos 1 y como máximo 100 puntos de código.
 * - Debe contener al menos una letra Unicode (\p{L}).
 * - Se permiten marcas diacríticas combinantes (\p{M}) junto a letras.
 * - Se permiten separadores comunes internos: espacios Unicode (\p{Zs}), guiones (\p{Pd}),
 *   apóstrofes comunes (' U+0027, ’ U+2019, ʼ U+02BC), punto (.) y punto medio (· U+00B7).
 * - No se permiten dígitos (\p{N}) ni otros símbolos/puntuación no listados.
 * - No se permiten separadores consecutivos ni comenzar/terminar con un separador.
 *
 * @param {string} name
 * @returns {boolean}
 */
function validate(name) {
  if (typeof name !== 'string') return false;

  // Normalizar espacios en los extremos
  name = name.trim();
  // Largo en puntos de código (caracteres Unicode reales)
  const length = [...name].length;
  if (length === 0 || length > 100) return false;

  // Debe contener al menos una letra Unicode
  if (!/\p{L}/u.test(name)) return false;

  // Funciones rápidas para propiedades Unicode
  const isLetter = ch => /\p{L}/u.test(ch);
  const isMark = ch => /\p{M}/u.test(ch);
  const isNumber = ch => /\p{N}/u.test(ch);
  const isSpaceSeparator = ch => /\p{Zs}/u.test(ch); // incluye NBSP y otros separadores de espacio
  const isDash = ch => /\p{Pd}/u.test(ch); // guiones y similares

  // Caracteres de separación/connector permitidos además de spaces y dashes:
  const extraConnectors = new Set(["'", "’", "ʼ", ".", "\u00B7"]);

  // No permitir empezar/terminar con separador: comprobar primero/último carácter (por puntos de código)
  const chars = [...name];
  const first = chars[0];
  const last = chars[chars.length - 1];
  if (!isLetter(first) || !isLetter(last)) {
    // Requerimos que el primer y último carácter sean letras (no marcas ni separadores)
    return false;
  }

  let prevWasSeparator = false;
  for (const ch of chars) {
    // Letras y marcas aceptadas (marcas pueden acompañar letras)
    if (isLetter(ch) || isMark(ch)) {
      prevWasSeparator = false;
      continue;
    }

    // No permitimos números
    if (isNumber(ch)) return false;

    // Separadores permitidos: espacio, guion u otros connectors explícitos
    if (isSpaceSeparator(ch) || isDash(ch) || extraConnectors.has(ch)) {
      // no permitir separadores consecutivos
      if (prevWasSeparator) return false;
      prevWasSeparator = true;
      continue;
    }

    // Cualquier otro carácter no permitido
    return false;
  }

  return true;
}

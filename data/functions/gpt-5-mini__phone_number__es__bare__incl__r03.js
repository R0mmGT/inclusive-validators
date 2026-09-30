/**
 * Valida un número de teléfono de manera amplia (soporta formatos nacionales e internacionales,
 * separadores comunes, paréntesis, prefijos internacionales como +, 00, 011 y extensiones).
 *
 * Nota: Validar "perfectamente" todos los formatos de todos los países es lo que hacen librerías
 * especializadas (por ejemplo libphonenumber). Esta función aplica buenas reglas heurísticas
 * que cubren la mayoría de casos reales sin depender de librerías externas.
 *
 * Reglas claves:
 * - Permite dígitos Unicode (por ejemplo dígitos árabes, devanagari, etc.) gracias a \p{Nd}.
 * - Permite separadores comunes: espacios, guiones, puntos, barras y paréntesis.
 * - Permite prefijos internacionales: +, 00, 011 al inicio (después de espacios).
 * - Permite una extensión al final con etiquetas comunes (ext, ext., extension, x, #) seguida de dígitos.
 * - Verifica que exista un número razonable de dígitos:
 *    * Si el número incluye un prefijo internacional (+, 00, 011) exige entre 7 y 15 dígitos (E.164 max 15).
 *    * Si no incluye prefijo internacional exige entre 4 y 15 dígitos (números nacionales cortos a veces existen).
 *
 * Devuelve true si el texto parece un teléfono válido según estas heurísticas, false en caso contrario.
 */
function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();

  if (s.length === 0) return false;

  // Patrón general que acepta:
  // - opcional prefijo internacional al inicio: +, 00 o 011 (tras espacios iniciales)
  // - cualquier combinación de dígitos Unicode (\p{Nd}) y separadores comunes: espacio, -, ., /, ()
  // - opcional extensión con etiquetas comunes seguida de dígitos Unicode
  // Usamos la bandera 'u' para soportar \p{Nd} (dígitos Unicode) y 'i' para case-insensitive en las etiquetas de extensión.
  const generalPattern = /^\s*(?:\+|00|011)?(?:[\p{Nd}\s\-\.\(\)\/])*[\p{Nd}](?:[\p{Nd}\s\-\.\(\)\/])*?(?:\s*(?:ext|ext\.|extension|x|#)\s*\p{Nd}+)?\s*$/iu;
  if (!generalPattern.test(s)) return false;

  // Extraer si existe prefijo internacional visible (+, 00, 011)
  const intlPrefixPattern = /^\s*(\+|00|011)/;
  const hasIntlPrefix = intlPrefixPattern.test(s);

  // Extraer extensión (si la hay) y contar sus dígitos
  const extMatch = s.match(/(?:\b|\s)(?:ext|ext\.|extension|x|#)\s*([\p{Nd}]+)/iu);
  let extDigits = 0;
  if (extMatch && extMatch[1]) {
    // contar dígitos Unicode en la extensión
    extDigits = (extMatch[1].match(/\p{Nd}/gu) || []).length;
    // limitar extensión razonablemente
    if (extDigits === 0 || extDigits > 10) return false;
  }

  // Contar dígitos en la parte principal (excluyendo la extensión)
  const mainPart = s.replace(/(?:\b|\s)(?:ext|ext\.|extension|x|#)\s*[\p{Nd}]+$/iu, '');
  const digitMatches = mainPart.match(/\p{Nd}/gu) || [];
  const digitsCount = digitMatches.length;

  // Debe haber al menos algunos dígitos
  if (digitsCount === 0) return false;

  // Verificaciones de longitud:
  // Máximo por E.164: 15 dígitos (aplicable tanto a internacional como nacional)
  if (digitsCount > 15) return false;

  if (hasIntlPrefix) {
    // Cuando hay prefijo internacional exigimos un mínimo razonable (evita aceptar cosas como "+1" o "+12")
    if (digitsCount < 7) return false;
  } else {
    // Números nacionales pueden ser más cortos en algunos países; aceptamos a partir de 4 dígitos
    // (ajusta este umbral si se desean tolerar números muy cortos).
    if (digitsCount < 4) return false;
  }

  // Evitar cadenas que contengan letras (salvo la parte de extensión ya permitida por el patrón anterior).
  // Si llega aquí, el patrón general ya descartó letras en la porción principal, por lo que esto es redundante
  // pero lo dejamos como comprobación adicional por seguridad.
  const lettersInMain = /[^\p{Nd}\s\-\.\(\)\/\+]/u.test(mainPart);
  if (lettersInMain) return false;

  return true;
}

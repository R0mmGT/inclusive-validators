/**
 * validate(code: string) -> boolean
 *
 * Heurística amplia y tolerante para validar códigos postales de todo el mundo.
 * - Acepta letras (cualquier alfabeto Unicode) y números Unicode.
 * - Permite separadores comunes: espacio, guion medio, punto y barra (/).
 * - Normaliza Unicode (NFKC) y recorta espacios en los extremos.
 * - Requiere al menos 2 y como máximo 12 caracteres alfanuméricos efectivos
 *   (excluyendo separadores). Estos límites son un compromiso razonable para cubrir
 *   la mayoría de formatos internacionales sin ser excesivamente permisivos.
 *
 * Nota: No existe una única expresión regular que garantice la validez real
 * de un código postal para todos los países (cada país tiene su propia regla).
 * Esta función aplica reglas generales útiles para interfaces multiculturales.
 */
function validate(code) {
  // Tipo y limpieza básica
  if (typeof code !== 'string') return false;
  code = code.trim();
  if (code.length === 0) return false;

  // Normalización Unicode para comparar de forma estable
  // (si el entorno no soporta normalize, se seguirá con el valor original)
  try { code = code.normalize('NFKC'); } catch (e) {}

  // Patrón: grupos de letras/dígitos Unicode separados opcionalmente por
  // espacios, guiones, puntos o barras. No permitimos otros símbolos.
  // Usa bandera 'u' para propiedades Unicode (\p{L}, \p{N}).
  const pattern = /^[\p{L}\p{N}]+(?:[ \-./][\p{L}\p{N}]+)*$/u;
  if (!pattern.test(code)) return false;

  // Elimina separadores para medir la "parte significativa"
  const core = code.replace(/[ \-./]+/g, '');

  // Longitud mínima/máxima razonable de la parte alfanumérica
  if (core.length < 2 || core.length > 12) return false;

  // Asegura que haya al menos una letra o un dígito (redundante por el patrón,
  // pero explícito para claridad)
  if (!/\p{L}|\p{N}/u.test(core)) return false;

  // Rechaza entradas que sean solo secuencias triviales (ej.: "0000", "11111")
  // salvo que sean muy cortas (algún país podría usar códigos como "00" raramente).
  // Comprobamos si todos los caracteres son el mismo dígito y tienen >=4 longitud.
  if (/^(\p{N})\1{3,}$/u.test(core)) return false;

  return true;
}

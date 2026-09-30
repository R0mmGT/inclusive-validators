/**
 * Comprueba si una cadena es un apellido válido.
 * Reglas aplicadas (heurísticas razonables, no exhaustivas):
 * - debe ser un string no vacío, con longitud entre 2 y 100 caracteres (después de trim)
 * - solo contiene letras Unicode (incluye acentos y otros diacríticos) y marcas combinantes
 * - pueden aparecer separadores internos: espacio simple, guion (-) o apóstrofo (')
 * - no permite separadores al inicio/final ni separadores consecutivos
 *
 * Nota: utiliza escapes de propiedades Unicode (\p{L}, \p{M}) por lo que requiere un entorno JS moderno.
 */
function validate(s) {
  if (typeof s !== 'string') return false;
  const str = s.trim();
  if (str.length < 2 || str.length > 100) return false;

  // Letras Unicode (\p{L}) y marcas combinantes (\p{M}) para cubrir acentos compuestos.
  // Permite palabras separadas por un solo espacio, guion o apóstrofo.
  const re = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;
  return re.test(str);
}

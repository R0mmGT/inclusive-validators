/**
 * Valida un nombre de pila humano de forma amplia y respetuosa con múltiples escrituras culturales.
 * - Acepta cualquier letra Unicode (\p{L}) y sus marcas combinantes (\p{M}).
 * - Permite separadores comunes en nombres: espacios, guiones/dashes, apóstrofes (ASCII y curvos) y el punto medio ·.
 * - No permite caracteres numéricos ni símbolos inesperados.
 * - No permite que el nombre empiece o termine con separadores, ni separadores consecutivos.
 * - Se recorta el input y se rechazan strings vacíos o excesivamente largos.
 *
 * Nota: Esta validación es sintáctica y no intenta validar identidad ni pertenencia cultural precisa.
 */
function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;
  // Protegemos contra inputs extremadamente largos (ajustable)
  if (name.length > 256) return false;

  // Expresión regular Unicode:
  // ^\p{L}\p{M}*(?:[sep]\p{L}\p{M}*)*$
// - \p{L} = cualquier letra en Unicode (incluye muchas letras modificadoras como algunos glotales)
// - \p{M} = marcas combinantes (acentos, etc.) que acompañan letras
// - [\p{Zs}\p{Pd}\u0027\u2018\u2019\u00B7] = espacios unicode, guiones (dashes), apóstrofes (', ‘, ’), y ·
  const nameRegex = /^\p{L}\p{M}*(?:[\p{Zs}\p{Pd}\u0027\u2018\u2019\u00B7]\p{L}\p{M}*)*$/u;

  return nameRegex.test(name);
}

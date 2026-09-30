/**
 * Valida un nombre de pila (primer nombre) humano razonable.
 * Reglas aplicadas:
 * - Debe ser un string entre 2 y 50 caracteres después de trim().
 * - Permite letras (Unicode), marcas diacríticas, espacios simples, guiones y apóstrofes.
 * - No permite caracteres numéricos, símbolos, emojis ni puntuación diversa.
 * - No permite separadores consecutivos ni empezar/terminar con separador.
 *
 * Ejemplos válidos: "Ana", "María José", "Jean-Pierre", "O'Connor", "Chloë"
 * Ejemplos inválidos: "a", "123", " María ", "Ana--María", "John!"
 */
function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length < 2 || s.length > 50) return false;

  // \p{L} = cualquier letra de cualquier alfabeto
  // \p{M} = marcas diacríticas (para combinar con letras)
  // Se permiten como separadores: espacio, guion (-), apóstrofo ('), comilla derecha (’), punto medio (·)
  // No se permiten separadores consecutivos ni al inicio/fin.
  const re = /^[\p{L}\p{M}]+(?:[ '\-\u2019\u00B7][\p{L}\p{M}]+)*$/u;
  return re.test(s);
}

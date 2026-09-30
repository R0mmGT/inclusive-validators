/**
 * Valida un código postal de forma ampliamente permisiva para soportar
 * diferentes formatos usados en todo el mundo (alfanuméricos, espacios,
 * guiones, barras, punto, símbolo japonés 〒, etc.).
 *
 * Razón:
 * - No existe una única "regex" que cubra todos los países sin conocer el país.
 * - En lugar de validar contra patrones por país, esta función asegura:
 *   - Es una cadena (string).
 *   - Tiene una longitud razonable (mínimo 2, máximo 12 caracteres).
 *   - Contiene al menos una letra o número (incluye letras/dígitos de cualquier alfabeto, gracias a \p{}).
 *   - Solo usa caracteres permitidos (letras, números, espacios, guion, barra, punto, símbolo 〒 y guion en dash).
 *
 * Devuelve true si el código postal pasa estas comprobaciones, false en caso contrario.
 *
 * Nota: Si necesitas validación estricta por país (p. ej. formatos exactos de UK, CA, US, etc.),
 * lo correcto es pedir también el país y validar con fórmulas específicas por país.
 */
function validate(postal) {
  if (typeof postal !== 'string') return false;

  // Normalizar (eliminar espacios al inicio/fin)
  const s = postal.trim();

  // Rechazar vacío
  if (s.length === 0) return false;

  // Longitud en "caracteres" (soporta código UTF-16 suplementario correctamente)
  const len = [...s].length;
  const MIN = 2;
  const MAX = 12;
  if (len < MIN || len > MAX) return false;

  // Debe contener al menos una letra o número (soporta cualquier alfabeto/dígito Unicode)
  if (!(/\p{L}|\p{N}/u.test(s))) return false;

  // Permitimos:
  // - letters (\p{L}) y numbers (\p{N}) de cualquier script
  // - espacios en blanco simples
  // - guión normal '-' y guion largo '–' (U+2013)
  // - barra '/' y punto '.'
  // - símbolo japonés 〒 (U+3012)
  const allowedRe = /^[\p{L}\p{N}\s\-\u2013\/\.\u3012]+$/u;
  return allowedRe.test(s);
}

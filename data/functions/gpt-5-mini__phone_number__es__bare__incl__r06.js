/**
 * Valida un número de teléfono de forma razonablemente robusta para usuarios
 * de distintos países y culturas, sin usar librerías externas.
 *
 * Reglas (balanceadas entre practicidad y flexibilidad):
 * - Permite dígitos, espacios, guiones, puntos, paréntesis, prefijo internacional "+" o "00".
 * - Permite una extensión al final ("ext", "ext.", "extension", "x", "#" ) seguida de hasta 15 dígitos.
 * - Los paréntesis deben coincidir y no pueden estar anidados; solo pueden contener dígitos y separadores.
 * - Tras eliminar separadores y prefijo internacional, la cantidad de dígitos significativos debe estar entre 7 y 15 (E.164 máximo 15).
 * - Si se usa prefijo internacional (+ o 00), el primer dígito del código de país no puede ser 0.
 *
 * Nota: No existe una validación 100% correcta sin una base de datos de planes de numeración (p. ej. libphonenumber).
 * Esta función ofrece una validación práctica y amplia.
 */
function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();

  if (s.length === 0) return false;

  // 1) Extraer y remover extensión al final (si existe)
  // Soportamos: "ext", "ext.", "extension", "x", "#" (case-insensitive), con o sin separadores.
  const extPattern = /\s*(?:ext|ext\.|extension|x|#)\s*[:.\-]?\s*(\d{1,15})\s*$/i;
  if (extPattern.test(s)) {
    s = s.replace(extPattern, '').trim();
  }

  if (s.length === 0) return false;

  // 2) Validar que no haya letras (después de remover posible extensión).
  // Permitimos sólo dígitos y los símbolos: space, hyphen, dot, parentheses, plus.
  if (!/^[0-9+\-\s().]+$/.test(s)) return false;

  // 3) Verificar presencia y posición del signo '+'
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  const hasPlus = s.startsWith('+');
  if (plusCount === 1 && !hasPlus) return false; // '+' sólo puede estar al inicio

  // 4) Soportar también prefijo internacional '00' al inicio (como alternativa a '+')
  let isInternational = false;
  if (hasPlus) {
    isInternational = true;
    // remover sólo el símbolo '+' para el conteo de dígitos
    s = s.replace(/^\+/, '');
  } else if (/^00/.test(s)) {
    // pero si hay otros '00' en el medio permitimos; sólo tomamos el prefijo inicial
    isInternational = true;
    s = s.replace(/^00/, '');
  }

  // 5) Validar paréntesis: deben coincidir, no anidados y solo contener dígitos y separadores aceptables
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1) {
    // permitimos como máximo un par de paréntesis simples alrededor del código de área
    return false;
  }
  if (openCount === 1) {
    // verificar orden y contenido entre paréntesis
    const parenMatch = s.match(/\(([^)]*)\)/);
    if (!parenMatch) return false;
    const inside = parenMatch[1];
    // Dentro sólo dígitos, espacios, guiones o puntos
    if (!/^[0-9\s.\-]+$/.test(inside)) return false;
    // No puede haber '(' después de haber encontrado '(' antes de su cierre (no anidado)
    if (/\(.*\(.*\)/.test(s) || /\).*\\(.*\)/.test(s)) {
      // protección redundante contra anidamiento (aunque la cuenta previa ya previene)
      return false;
    }
    // opcional: prohibir paréntesis vacíos
    if (/^\s*$/.test(inside)) return false;
  }

  // 6) Remover todos los separadores y caracteres no numéricos restantes para contar dígitos
  const digits = s.replace(/[^\d]/g, '');

  // 7) Longitud de dígitos: permitimos entre 7 y 15 dígitos significativos (práctica común, E.164 máximo 15)
  if (digits.length < 7 || digits.length > 15) return false;

  // 8) Si es número internacional, el primer dígito del código de país no puede ser '0'
  if (isInternational && digits[0] === '0') return false;

  // 9) Reglas adicionales simples contra formatos claramente inválidos:
  // - No permitir más de 4 separadores consecutivos (espacios/puntos/guiones) en el original
  if (/[.\-\s]{5,}/.test(input)) return false;

  // - No permitir secuencias triviales como todos los mismos dígitos (p.ej "111111111")
  if (/^(\d)\1*$/.test(digits)) return false;

  // Si pasó todas las comprobaciones, consideramos el número válido
  return true;
}

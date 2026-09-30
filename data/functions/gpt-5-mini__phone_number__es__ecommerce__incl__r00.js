// Validador de números de teléfono orientado a registro de usuarios.
// No depende de librerías externas.
// Estrategia:
// - Acepta formatos internacionales con '+' o con prefijo de marcación internacional '00'.
// - Acepta separadores comunes: espacios, guiones, puntos y un par de paréntesis para el código de área.
// - Permite sufijos de extensión (ext, x, extension, #) que no cuentan en la longitud.
// - Tras normalizar, valida que queden sólo dígitos (y un '+' inicial opcional) con entre 4 y 15 dígitos (E.164).
// - Rechaza entradas con letras o símbolos inesperados, múltiples signos '+' o paréntesis mal balanceados.
function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (s.length === 0) return false;

  // Extraer y descartar extensión al final (ext, x, extension, #)
  // Ejemplos aceptados: "555-1234 ext 55", "555-1234 x55", "555-1234 #55"
  const extRegex = /\s*(?:ext\.?|extension|x|#)\s*[:\-\.]?\s*\d{1,9}\s*$/i;
  s = s.replace(extRegex, '').trim();

  // No más de un '+' y si existe, debe ser al inicio
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Permitir prefijo internacional '00' convirtiéndolo a '+'
  if (s.startsWith('00')) {
    s = '+' + s.slice(2);
  }

  // Comprobar paréntesis: deben estar balanceados y como máximo un par
  const openPar = (s.match(/\(/g) || []).length;
  const closePar = (s.match(/\)/g) || []).length;
  if (openPar !== closePar) return false;
  if (openPar > 1 || closePar > 1) return false;
  if (openPar === 1) {
    // El contenido entre paréntesis debe ser sólo dígitos y no vacío
    if (!/\(\d+\)/.test(s)) return false;
  }

  // Eliminar separadores permitidos
  const cleaned = s.replace(/[\s\-\.\(\)]/g, '');

  // Tras limpieza debe ser opcional '+' seguido únicamente de dígitos
  if (!/^\+?\d+$/.test(cleaned)) return false;

  // Contar dígitos (sin el '+')
  const digits = cleaned.replace(/^\+/, '');
  // E.164 permite hasta 15 dígitos; para registros de usuarios aceptamos también mínimo 4 dígitos.
  if (digits.length < 4 || digits.length > 15) return false;

  // Rechazar secuencias demasiado repetitivas (ej. "1111111111") que suelen ser inválidas
  // Permitimos cadenas reales como "0000" si se desea, pero aquí prevenimos entradas claramente no válidas.
  if (/^(\d)\1{3,}$/.test(digits)) return false;

  return true;
}

function validate(input) {
  // Devuelve true si `input` parece un número de teléfono razonable (soporta dígitos Unicode
  // y formatos internacionales), false en caso contrario.
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Quitar sufijos de extensión comunes: "ext", "ext.", "extension", "x", "#" seguidos de dígitos
  s = s.replace(/\s*(?:ext|ext\.|extension|x|#)\s*[:\.]?\s*\d+\s*$/i, '');

  // Normalización Unicode (si está disponible)
  try { s = s.normalize('NFKC'); } catch (e) {}

  // Permitir un único '+' solo al principio
  if ((s.match(/\+/g) || []).length > 1) return false;
  if (s.includes('+') && s[0] !== '+') return false;

  // Eliminar separadores permitidos: espacios (incluidos varios espacios Unicode), guiones, puntos,
  // paréntesis, barras. No se permiten otros símbolos.
  s = s.replace(/[\s\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000\-\.\(\)\/]/g, '');
  if (!s) return false;

  // Ahora la cadena debe ser: opcional '+' al inicio, seguida solo de dígitos Unicode (\p{Nd})
  // y/o letras ASCII (para números "vanity" como 1-800-FLOWERS).
  const mainPattern = /^\+?(?:[\p{Nd}A-Za-z])+$/u;
  if (!mainPattern.test(s)) return false;

  // Contar "dígitos": todos los caracteres que sean dígitos Unicode más las letras ASCII
  // (las letras se consideran equivalentes a un dígito cuando son vanity).
  const unicodeDigits = s.match(/\p{Nd}/gu) || [];
  const asciiLetters = s.match(/[A-Za-z]/g) || [];
  const digitCount = unicodeDigits.length + asciiLetters.length;

  // Reglas razonables: E.164 limita a 15 dígitos máximos. Usamos un mínimo prudente de 4 dígitos
  // para evitar aceptar cosas demasiado cortas (puedes ajustar MIN si quieres permitir números
  // de emergencia cortos como "112" / "911").
  const MIN = 4;
  const MAX = 15;
  if (digitCount < MIN || digitCount > MAX) return false;

  return true;
}

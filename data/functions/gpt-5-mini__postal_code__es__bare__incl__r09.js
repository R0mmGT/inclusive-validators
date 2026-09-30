function validate(code) {
  // Recibe un string y devuelve true si parece un código postal válido, false en caso contrario.
  // Heurística amplia y multicultural: acepta letras y dígitos de cualquier alfabeto Unicode,
  // espacios y guiones (comunes en muchos formatos). Rechaza controles, símbolos raros y
  // entradas vacías o demasiado cortas/largas después de quitar separadores.
  if (typeof code !== 'string') return false;

  // Normalizar para manejar dígitos/espacios de ancho completo, etc.
  try {
    code = code.normalize('NFKC');
  } catch (e) {
    // Si normalize no está disponible, continuar con el original
  }

  // Trim de espacios externos
  code = code.trim();
  if (code.length === 0) return false;

  // Rechazar caracteres de control u otros caracteres invisibles
  if (/\p{C}/u.test(code)) return false;

  // Solo permitir letras (de cualquier alfabeto), números, espacios y guiones
  if (!/^[\p{L}\p{N} \-]+$/u.test(code)) return false;

  // Debe contener al menos una letra o un dígito
  if (!/[\p{L}\p{N}]/u.test(code)) return false;

  // Para la comprobación de longitud, quitamos espacios y guiones (separadores habituales)
  const core = code.replace(/[ \-]+/g, '');
  // Establecemos límites razonables: mínimo 2, máximo 12 caracteres "reales".
  // Estos límites cubren la mayoría de formatos internacionales sin ser extremadamente restrictivos.
  if (core.length < 2 || core.length > 12) return false;

  // Rechazar secuencias irracionalmente longas de un mismo carácter (p. ej. "11111111")
  if (/(.)\1{6,}/u.test(core)) return false;

  // Pasó todas las comprobaciones heurísticas
  return true;
}

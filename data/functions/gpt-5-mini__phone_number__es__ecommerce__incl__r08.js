function validate(phone) {
  // Valida un número de teléfono de forma general y compatible internacionalmente.
  // Devuelve true si parece un número válido (heurística basada en E.164 y formatos comunes), false en caso contrario.
  if (typeof phone !== 'string') return false;
  let s = phone.trim();
  if (!s) return false;

  // Rechazar múltiples signos +
  if ((s.match(/\+/g) || []).length > 1) return false;

  // Quitar prefijos de esquema comunes
  s = s.replace(/^tel:\s*/i, '');

  // Eliminar extensiones y cualquier cosa que venga después (ext, extension, x, #, anexo, xtn)
  s = s.replace(/\s*(?:ext|extension|anexo|xtn|x|#)\.?\s*\d*$/i, '');

  // No aceptamos letras (no transformamos números "vanity" como 1-800-FLOWERS)
  if (/[A-Za-z]/.test(s)) return false;

  // Mantener un + inicial opcional, quitar el resto de caracteres no numéricos
  let normalized;
  if (s[0] === '+') {
    normalized = '+' + s.slice(1).replace(/\D/g, '');
  } else {
    normalized = s.replace(/\D/g, '');
  }

  // Extraer sólo los dígitos para las comprobaciones
  const digits = normalized.startsWith('+') ? normalized.slice(1) : normalized;

  // Debe haber solo dígitos
  if (!/^\d+$/.test(digits)) return false;

  // Comprobaciones de longitud:
  // E.164 permite hasta 15 dígitos en total (código de país + número nacional).
  // Muchos números nacionales tienen al menos 7 dígitos; usamos 7 como mínimo práctico.
  if (digits.length < 7 || digits.length > 15) return false;

  // Si se usa formato internacional con +, el código de país no empieza por 0
  if (normalized.startsWith('+') && digits[0] === '0') return false;

  // Si pasa todas las comprobaciones, lo consideramos válido
  return true;
}

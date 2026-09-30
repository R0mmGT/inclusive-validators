function validate(input) {
  // Debe ser una cadena
  if (typeof input !== 'string') return false;

  const s = input.trim();

  // Longitud razonable para una línea de dirección
  if (s.length < 3 || s.length > 100) return false;

  // No permitir caracteres de control
  if (/[\u0000-\u001F]/.test(s)) return false;

  // Empezar por letra o número (evita entradas que empiezan por símbolos inesperados)
  if (!/^[\p{L}\p{N}]/u.test(s)) return false;

  // Caracteres permitidos: letras (unicode), números, espacios y signos comunes en direcciones
  const allowed = /^[\p{L}\p{N}\s\.,#\-/ºª°'()’·:]+$/u;
  if (!allowed.test(s)) return false;

  // Debe contener al menos una letra
  if (!/\p{L}/u.test(s)) return false;

  // Debe contener número (ej. número de portal) o la notación "s/n" (sin número)
  const hasNumber = /\d/.test(s);
  const hasSN = /\bS\s*\/?\s*N\b/i.test(s); // acepta "S/N", "SN", "S N"
  if (!hasNumber && !hasSN) return false;

  // Debe haber al menos 2 letras significativas (evita entradas como "A 123")
  const lettersOnly = s.replace(/[^\p{L}]/gu, '');
  if (lettersOnly.length < 2) return false;

  // Evitar repeticiones excesivas de signos de puntuación (más de 3 seguidos)
  if (/[.,#\-/ºª°'()’·:]{4,}/.test(s)) return false;

  return true;
}

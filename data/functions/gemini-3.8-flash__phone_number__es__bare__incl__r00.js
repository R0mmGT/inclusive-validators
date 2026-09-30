function validate(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();
  if (!trimmed) return false;

  // Permite únicamente dígitos, espacios, guiones, puntos, paréntesis y signo '+'
  if (!/^[0-9\s().+-]+$/.test(trimmed)) return false;

  // Como máximo un signo '+', ubicado al inicio o inmediatamente tras un paréntesis de apertura
  const plusCount = (trimmed.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && !/^\s*(\+\s*\(?|\(\s*\+)/.test(trimmed)) return false;

  // Debe terminar en dígito o en paréntesis de cierre
  if (!/[\d)]$/.test(trimmed)) return false;

  // Control de paréntesis: máximo un par, bien ordenado y con dígitos en su interior
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) return false;
  if (openParens === 1 && !/\([^\(\)]*\d[^\(\)]*\)/.test(trimmed)) return false;

  // Evitar separadores consecutivos anómalos (p. ej., '--' o '..')
  if (/[-.]{2,}/.test(trimmed)) return false;

  // Longitud de dígitos según el estándar internacional ITU-T E.164 (entre 4 y 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 4 || digits.length > 15) return false;

  return true;
}

function validate(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();
  if (!trimmed) return false;

  // Permitir únicamente dígitos y separadores telefónicos estándar (+, -, ., espacios y paréntesis)
  if (!/^[+\d\s().-]+$/.test(trimmed)) return false;

  // El símbolo '+' solo es válido si está al inicio y no se repite
  if (trimmed.includes('+')) {
    if (!/^\+/.test(trimmed) || (trimmed.match(/\+/g) || []).length > 1) {
      return false;
    }
  }

  // Validar el uso de paréntesis (máximo un par, balanceados y con dígitos dentro)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) return false;
  if (openParens === 1 && !/\(\d{1,6}\)/.test(trimmed)) return false;

  // Evitar separadores consecutivos no válidos como '--', '..' o combinaciones vacías
  if (/[-.]{2,}|\(\)/.test(trimmed)) return false;

  // El estándar internacional ITU-T E.164 establece un máximo de 15 dígitos.
  // La longitud mínima habitual de un número telefónico completo es de 6 dígitos.
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 15) return false;

  return true;
}

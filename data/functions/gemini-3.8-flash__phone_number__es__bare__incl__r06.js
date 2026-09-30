function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();
  if (!trimmed) return false;

  // Solo se permiten dígitos, espacios, '+', '-', '.' y paréntesis
  if (!/^[+\d\s().-]+$/.test(trimmed)) return false;

  // El prefijo '+' solo puede aparecer una vez y al inicio
  if (trimmed.includes('+') && (trimmed.indexOf('+') !== 0 || trimmed.lastIndexOf('+') !== 0)) {
    return false;
  }

  // No permitir separadores consecutivos como '--' o '..'
  if (/[-.]{2,}/.test(trimmed)) return false;

  // Validación de paréntesis balanceados
  const hasOpen = trimmed.includes('(');
  const hasClose = trimmed.includes(')');
  if (hasOpen || hasClose) {
    if (
      trimmed.indexOf('(') !== trimmed.lastIndexOf('(') ||
      trimmed.indexOf(')') !== trimmed.lastIndexOf(')')
    ) {
      return false;
    }
    const openIndex = trimmed.indexOf('(');
    const closeIndex = trimmed.indexOf(')');
    if (openIndex >= closeIndex) return false;

    // El contenido entre paréntesis debe contener solo dígitos
    const insideParens = trimmed.slice(openIndex + 1, closeIndex).trim();
    if (!/^\d+$/.test(insideParens)) return false;
  }

  // Extraer únicamente los dígitos numéricos
  const digits = trimmed.replace(/\D/g, '');

  // Según el estándar internacional ITU-T E.164:
  // los números de teléfono tienen un máximo de 15 dígitos y un mínimo práctico de 4
  return digits.length >= 4 && digits.length <= 15;
}

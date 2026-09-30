function validate(fullName) {
  if (typeof fullName !== 'string') {
    return false;
  }

  const trimmed = fullName.trim();

  // Longitud razonable para un nombre completo
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Valida caracteres alfabéticos Unicode (incluye acentos, ñ, etc.),
  // guiones, apóstrofes y puntos para abreviaturas (ej. Jr., iniciales).
  // Requiere al menos dos palabras para considerarse "nombre completo".
  const nameRegex = /^[\p{L}]+(?:['\-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['\-][\p{L}]+)*\.?)+$/u;

  return nameRegex.test(trimmed);
}

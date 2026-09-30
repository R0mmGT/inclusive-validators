function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para un nombre completo
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos dos partes (nombre y apellido)
  const parts = trimmed.split(/\s+/);
  if (parts.length < 2) {
    return false;
  }

  // Permite letras (con soporte Unicode para tildes, ñ, etc.),
  // guiones o apóstrofes internos, y punto final opcional (para iniciales)
  const wordRegex = /^[\p{L}]+(?:['\-][\p{L}]+)*\.?$/u;

  return parts.every(part => wordRegex.test(part));
}

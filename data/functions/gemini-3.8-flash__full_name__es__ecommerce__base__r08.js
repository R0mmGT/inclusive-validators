function validate(name) {
  if (typeof name !== 'string') return false;

  const trimmed = name.trim();
  if (trimmed.length < 3 || trimmed.length > 100) return false;

  // Divide por espacios para verificar que haya al menos nombre y apellido
  const words = trimmed.split(/\s+/);
  if (words.length < 2) return false;

  // Cada palabra debe contener letras unicode (incluye tildes, ñ, etc.),
  // permitiendo guiones o apóstrofes internos y un punto opcional al final (para iniciales)
  const wordRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*\.?$/u;

  return words.every(word => wordRegex.test(word));
}

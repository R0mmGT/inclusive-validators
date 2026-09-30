function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Permite nombres de 1 a 100 caracteres (hay culturas con nombres de un solo carácter)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Utiliza propiedades Unicode para permitir letras (\p{L}) y marcas diacríticas (\p{M}) de cualquier idioma/alfabeto.
  // Permite separadores internos válidos (espacios, apóstrofes y guiones) y apóstrofe inicial/final (usado en ciertas transliteraciones).
  const nameRegex = /^['’]?[\p{L}\p{M}]+(?:[\s'\-’]+[\p{L}\p{M}]+)*['’]?$/u;

  return nameRegex.test(trimmed);
}

function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprobar que no haya espacios iniciales/finales y longitud válida (2 a 50 caracteres)
  if (trimmed !== name || name.length < 2 || name.length > 50) {
    return false;
  }

  // Permite letras (incluyendo acentos, ñ, etc.), y separadores válidos (espacio, guion, apóstrofe) no consecutivos
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(name);
}

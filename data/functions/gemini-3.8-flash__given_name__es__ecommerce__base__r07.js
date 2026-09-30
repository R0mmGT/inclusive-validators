function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para un nombre de pila (entre 2 y 50 caracteres)
  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Permite letras (Unicode: tildes, ñ, diéresis, etc.) y separadores interiores (espacio, guion, apóstrofe) no consecutivos
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(trimmed);
}

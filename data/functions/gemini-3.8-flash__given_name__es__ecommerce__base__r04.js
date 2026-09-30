function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Comprueba longitud típica (2 a 50 caracteres) y evita espacios al inicio o al final
  if (name !== name.trim() || name.length < 2 || name.length > 50) {
    return false;
  }

  // Permite letras (incluyendo acentos, ñ, diéresis), espacios intermedios simples, guiones y apóstrofes
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(name);
}

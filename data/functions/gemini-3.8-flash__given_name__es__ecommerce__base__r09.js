function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Verifica que tenga una longitud razonable (entre 2 y 50 caracteres)
  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Permite cualquier letra Unicode (acentos, ñ, diéresis, etc.) y separadores válidos
  // (espacios, guiones y apóstrofes estándar o tipográficos) sin permitir que se repitan consecutivamente
  // ni que se ubiquen al inicio o al final del texto.
  const nameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return nameRegex.test(name);
}

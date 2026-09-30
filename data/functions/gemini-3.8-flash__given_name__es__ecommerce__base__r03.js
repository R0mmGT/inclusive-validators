function validate(name) {
  if (typeof name !== 'string') return false;

  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 50) return false;

  // Permite letras (con tildes, diéresis, ñ, etc.), espacios, guiones y apóstrofes.
  // No permite símbolos repetidos ni al inicio o final de las palabras.
  const nameRegex = /^[\p{L}]+(?:[ '\-’][\p{L}]+)*$/u;

  return nameRegex.test(trimmed);
}

function validate(lastName) {
  if (typeof lastName !== 'string') {
    return false;
  }

  const trimmed = lastName.trim();

  // Longitud razonable para un apellido (entre 1 y 60 caracteres)
  if (trimmed.length < 1 || trimmed.length > 60) {
    return false;
  }

  // Permite letras (incluyendo tildes, eñes y caracteres Unicode de cualquier idioma),
  // y separadores válidos como espacios, guiones y apóstrofes (no consecutivos ni en los extremos).
  const lastNameRegex = /^[\p{L}]+(?:['’ -][\p{L}]+)*$/u;

  return lastNameRegex.test(trimmed);
}

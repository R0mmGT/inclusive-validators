function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprobar una longitud razonable (entre 1 y 100 caracteres)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura del mundo
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - Letras de cualquier idioma (\p{L})
  // - Marcas diacríticas / vocálicas combinables (\p{M})
  // - Separadores comunes en nombres: espacios, apóstrofes (' y ’), guiones (-) y puntos (.)
  // Rechaza dígitos, caracteres de control, emojis y símbolos no válidos.
  const nameRegex = /^[\p{L}\p{M}'’](?:[\p{L}\p{M}'’\.\-\s]*[\p{L}\p{M}'’\.])?$/u;

  return nameRegex.test(trimmed);
}

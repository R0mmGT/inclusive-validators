function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable: permite nombres cortos (ej. monónimos de 1 o 2 letras) y nombres largos
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto/sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - Letras de cualquier sistema de escritura (\p{L})
  // - Marcas diacríticas y combinatorias (\p{M})
  // - Espacios en blanco (\s)
  // - Puntuación común en nombres de distintas culturas:
  //   guiones (-), comas (formato Apellido, Nombre), puntos (iniciales),
  //   variantes de apóstrofes (' ’ ʻ ʼ) y punto medio (·)
  const validNameRegex = /^[\p{L}\p{M}\s,.'’ʻʼ\-·]+$/u;

  return validNameRegex.test(trimmed);
}

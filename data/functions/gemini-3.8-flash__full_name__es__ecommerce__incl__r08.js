function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres personales en cualquier cultura (mínimo 1 carácter, máx 150)
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra (en cualquier alfabeto/escritura del mundo)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras (\p{L}), marcas de combinación de acentos (\p{M}),
  // espacios y signos de puntuación válidos en nombres (apóstrofes, guiones, puntos)
  const validCharsPattern = /^[\p{L}\p{M}\s.'’ʻʼ\-]+$/u;
  if (!validCharsPattern.test(trimmed)) {
    return false;
  }

  // Evita repeticiones excesivas de signos de puntuación no válidas (ej. "---", "...")
  if (/([.'’ʻʼ\-])\1{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}

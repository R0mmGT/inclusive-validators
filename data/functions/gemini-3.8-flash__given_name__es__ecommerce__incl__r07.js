function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprobar una longitud razonable para nombres personales (1 a 70 caracteres)
  if (trimmed.length === 0 || trimmed.length > 70) {
    return false;
  }

  // \p{L}: cualquier letra de cualquier sistema de escritura (alfabetos latino, cirílico, árabe, kanji, etc.)
  // \p{M}: marcas diacríticas / combinadas (tildes, acentos, vocales en escrituras abugidas)
  // Permite guiones, apóstrofes y espacios solo como separadores internos
  const nameRegex = /^[\p{L}\p{M}]+(?:['’\-\s][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(trimmed);
}

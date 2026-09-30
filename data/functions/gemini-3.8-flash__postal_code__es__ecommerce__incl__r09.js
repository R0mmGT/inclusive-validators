function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Los códigos postales a nivel mundial tienen entre 2 y 12 caracteres (incluyendo separadores)
  if (trimmed.length < 2 || trimmed.length > 12) {
    return false;
  }

  // Permite formatos numéricos y alfanuméricos de todo el mundo (ej. EE. UU., Reino Unido,
  // Canadá, Japón, Países Bajos, etc.), admitiendo guiones o espacios como separadores internos.
  return /^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/.test(trimmed);
}

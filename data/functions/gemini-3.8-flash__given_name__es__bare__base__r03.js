function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();
  if (trimmed !== name || trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Permite letras unicode (incluye tildes, diéresis, ñ), 
  // y separa nombres compuestos con un único espacio, guion o apóstrofe.
  const regex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return regex.test(trimmed);
}

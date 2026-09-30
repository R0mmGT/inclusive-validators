function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Permite letras (incluyendo tildes y caracteres de cualquier idioma mediante Unicode),
  // apóstrofes o guiones internos, y exige al menos dos palabras separadas por un espacio.
  const fullNameRegex = /^\p{L}+(?:['’\-]\p{L}+)*(?: \p{L}+(?:['’\-]\p{L}+)*)+$/u;

  return fullNameRegex.test(name.trim());
}

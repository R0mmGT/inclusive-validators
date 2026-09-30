function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Normaliza espacios en blanco múltiples
  const normalized = name.trim().replace(/\s+/g, ' ');

  // Longitud mínima y máxima razonable para un nombre completo
  if (normalized.length < 3 || normalized.length > 100) {
    return false;
  }

  // Requiere al menos un espacio para asegurar nombre y apellido
  if (!normalized.includes(' ')) {
    return false;
  }

  // Permite caracteres alfabéticos Unicode (acentos, ñ, etc.),
  // además de guiones y apóstrofes en posiciones válidas.
  const nameRegex = /^[\p{L}]+(?:[' -][\p{L}]+)+$/u;

  return nameRegex.test(normalized);
}

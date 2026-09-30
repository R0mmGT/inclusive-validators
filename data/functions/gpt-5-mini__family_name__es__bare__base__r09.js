function validate(surname) {
  // Debe ser string
  if (typeof surname !== 'string') return false;

  // Quitar espacios en los extremos
  const name = surname.trim();
  if (name.length === 0) return false;

  // Conjunto de letras aceptadas (ASCII y caracteres españoles comunes)
  const letters = "A-Za-zÁÉÍÓÚÜÑáéíóúüñ";

  // Patrón: grupos de letras separados opcionalmente por un solo espacio, guión o apóstrofo.
  // No permite empezar/terminar con separador ni separadores consecutivos.
  const re = new RegExp(`^[${letters}]+(?:[ '\\-][${letters}]+)*$`, 'u');
  if (!re.test(name)) return false;

  // Asegurar que haya al menos dos letras (evita entradas como "-" o "A")
  const letterCount = (name.match(new RegExp(`[${letters}]`, 'gu')) || []).length;
  return letterCount >= 2;
}

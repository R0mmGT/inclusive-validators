function validate(name) {
  // debe ser una cadena
  if (typeof name !== 'string') return false;

  // recortar espacios al principio/final y normalizar Unicode
  const s = name.trim();
  if (s.length === 0 || s.length > 60) return false; // límite razonable

  // Normalizar para manejar letras con marcas diacríticas de forma consistente
  const normalized = s.normalize('NFC');

  // Permitir letras Unicode (incluye acentos), marcas diacríticas,
  // y como separadores: espacio, guion medio, apóstrofo recto y apóstrofo tipográfico (’).
  // Reglas:
  // - debe comenzar y terminar con una letra
  // - solo se permiten separadores simples entre bloques de letras (no consecutivos)
  const re = /^[\p{L}\p{M}]+(?:[ '\-\u2019][\p{L}\p{M}]+)*$/u;

  return re.test(normalized);
}

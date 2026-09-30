function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;
  if (s.length > 60) return false; // límite razonable para un nombre
  // Permite letras (de cualquier alfabeto) y marcas de combinación (acentos),
  // con separadores simples: espacio, guion o apóstrofo entre segmentos.
  // No permite separadores consecutivos ni al inicio/final.
  const re = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;
  return re.test(s);
}

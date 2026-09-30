function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Normalizar espacios
  const normalized = name.trim().replace(/\s+/g, ' ');
  // Longitud razonable (puedes ajustar máximos)
  if (normalized.length < 2 || normalized.length > 100) return false;

  const parts = normalized.split(' ').filter(Boolean);
  // Debe haber al menos dos partes (nombre y apellido)
  if (parts.length < 2 || parts.length > 10) return false;

  // Expresiones regulares Unicode-aware:
  // - partRe: palabra compuesta por letras (con marcas diacríticas), permite guiones/apóstrofes/· entre letras
  // - initialRe: inicial (una letra) con punto opcional
  const partRe = /^[\p{L}\p{M}]+(?:[\'\-\u2019·][\p{L}\p{M}]+)*$/u;
  const initialRe = /^\p{L}\.?$/u;

  // Primera y última parte deben ser nombres completos (no iniciales)
  if (!partRe.test(parts[0]) || !partRe.test(parts[parts.length - 1])) return false;

  // Todas las partes deben cumplir alguna de las dos formas válidas
  for (const p of parts) {
    if (!(partRe.test(p) || initialRe.test(p))) return false;
  }

  return true;
}

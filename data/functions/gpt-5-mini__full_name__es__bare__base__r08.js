function validate(name) {
  if (typeof name !== 'string') return false;
  // Normalizar espacios
  name = name.trim().replace(/\s+/g, ' ');
  if (name.length === 0) return false;

  const parts = name.split(' ');
  if (parts.length < 2) return false; // debe tener al menos nombre y apellido

  // Partículas comunes que pueden ir en minúsculas (de, del, van, etc.)
  const particles = new Set([
    'de','del','la','las','los','y','e','do','da','dos','das',
    'van','von','le','les','du','di'
  ]);

  // Regexes usando propiedades Unicode (requieren flag "u")
  // Inicial: una letra mayúscula seguida opcionalmente de un punto (J. o J)
  const initialRe = /^[\p{Lu}]\.?$/u;

  // Palabra de nombre/apellido:
  // - Empieza con letra mayúscula
  // - Sigue con letras (incluye acentos/diacríticos) o marcas
  // - Permite partes internas separadas por guion o apóstrofo (también ’)
  const wordRe = /^\p{Lu}[\p{L}\p{M}]*(?:[-'\u2019]\p{L}[\p{L}\p{M}]*)*$/u;

  for (const part of parts) {
    if (part.length === 0) return false;

    // si es partícula común, aceptamos minúscula o con mayúscula
    if (particles.has(part.toLowerCase())) continue;

    if (initialRe.test(part)) continue;
    if (wordRe.test(part)) continue;

    return false;
  }

  return true;
}

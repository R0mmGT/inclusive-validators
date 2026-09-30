function validate(name) {
  // Debe ser una cadena no vacía sin espacios al inicio/fin
  if (typeof name !== 'string' || name.length === 0) return false;
  if (name !== name.trim()) return false;

  // Limite razonable para evitar entradas excesivamente largas
  if (name.length > 100) return false;

  // Regex para una "palabra" de nombre:
  // - empieza por una letra Unicode (\p{L})
  // - puede contener letras y marcas diacríticas (\p{M})
  // - permite guion medio (-) y apóstrofe (ASCII ' y Unicode ’) sólo entre letras
  // Ejemplos válidos: "María", "Jean-Luc", "D'Angelo", "O’Neill"
  const wordRe = /^\p{L}[\p{L}\p{M}]*(?:['\u2019-]\p{L}[\p{L}\p{M}]*)*$/u;

  // Se permiten nombres compuestos separados por espacios simples,
  // pero no espacios consecutivos ni separadores al principio/final.
  const parts = name.split(' ');
  for (let part of parts) {
    if (part.length === 0) return false; // espacio doble detectado
    if (!wordRe.test(part)) return false;
  }

  return true;
}

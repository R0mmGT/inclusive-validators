function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Sin espacios al inicio/final
  name = name.trim();

  // Longitud razonable para un nombre de pila
  if (name.length < 2 || name.length > 60) return false;

  // No permitir dígitos ni símbolos distintos de espacio, guion y apóstrofo
  // Rechazar secuencias de separadores (espacio/guion/apóstrofo) consecutivas
  if (/[ '\-]{2,}/.test(name)) return false;

  // No empezar/terminar por guion o apóstrofo (tras trim no habrá espacios)
  if (/^[\'\-]|[\'\-]$/.test(name)) return false;

  // Separadores permitidos: espacio, guion y apóstrofo
  // Cada "parte" debe ser solo letras Unicode (incluye acentos, ñ, etc.) y marcas combinantes
  const parts = name.split(/(?: |-|')/);

  // Regex para una palabra de nombre: empieza por letra y puede contener marcas combinantes
  const wordRe = /^\p{L}\p{M}*$/u;

  for (const part of parts) {
    if (!part) return false;           // evita partes vacías por separadores mal puestos
    if (!wordRe.test(part)) return false;
  }

  return true;
}

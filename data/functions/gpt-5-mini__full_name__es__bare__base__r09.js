/**
 * Valida si una cadena es un "nombre completo" razonable.
 * Reglas aplicadas (decididas razonablemente, pueden ajustarse):
 * - Debe ser un string no vacío.
 * - Debe contener al menos dos partes separadas por espacios (nombre + apellido mínimo).
 * - Cada parte puede ser:
 *    - Una inicial (una letra Unicode seguida de un punto, p.ej. "J.")
 *    - O una palabra que empiece por letras Unicode y pueda contener guiones o apóstrofes internos
 *      (acepta ' y ’) y opcionalmente terminar en un punto (p.ej. "Jr.").
 * - No se permiten dígitos ni otros símbolos.
 *
 * Usa escapes Unicode (\p{L}) con la bandera 'u' para aceptar letras acentuadas y de otros alfabetos.
 */
function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;

  // Partes separadas por uno o más espacios (evita partes vacías por múltiples espacios)
  const parts = s.split(/\s+/);
  if (parts.length < 2) return false;

  // Una parte válida:
  //  - empieza por una o más letras Unicode \p{L}+
  //  - puede tener segmentos internos unidos por ' (apostrofe), ’ (apóstrofe tipográfico) o - (guion)
  //  - puede terminar opcionalmente en un punto (para iniciales o sufijos como "Jr.")
  const partRegex = /^\p{L}+(?:[\'\u2019-]\p{L}+)*(?:\.)?$/u;

  for (const p of parts) {
    if (!partRegex.test(p)) return false;
  }

  return true;
}

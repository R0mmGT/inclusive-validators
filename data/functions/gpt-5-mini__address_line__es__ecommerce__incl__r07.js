// Valida una línea de dirección (calle) de forma razonablemente permisiva y segura,
// pensada para funcionar con nombres en cualquier alfabeto/idioma.
// Devuelve true si la cadena parece una línea de dirección válida, false en caso contrario.
function validate(input) {
  // Tipo y normalización
  if (typeof input !== 'string') return false;
  const s = input.trim();

  // Longitud razonable: ni vacía ni excesiva
  if (s.length < 3 || s.length > 200) return false;

  // No permitir caracteres de control (incluye saltos de línea) ni los signos < y >
  // que suelen usarse para inyección de HTML.
  if (/[\u0000-\u001F\u007F-\u009F<>]/.test(s)) return false;

  // Evitar inputs que sean claramente URLs o correos (no son líneas de calle)
  if (/(https?:\/\/|www\.|mailto:|ftp:)/i.test(s)) return false;
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(s)) return false;

  // Debe contener al menos una letra en cualquier alfabeto (Unicode)
  // usa \p{L} con el flag 'u' para admitir letras no latinas.
  try {
    if (!/\p{L}/u.test(s)) return false;
  } catch (e) {
    // Si el motor JS no soporta \p{L}, fallback: usar una comprobación más amplia
    // que permita letras latinas básicas y otros caracteres comunes.
    if (!/[A-Za-zÀ-ÖØ-öø-ÿĀ-žЁёΑ-ωא-ת一-龥々]/.test(s)) return false;
  }

  // Evitar cadenas que son solo puntuación o solo números/puntuación:
  // debe contener al menos una letra o al menos one digit+non-digit combo.
  if (!/[0-9\p{L}]/u.test(s)) return false;

  // Rechazar repeticiones largas de un mismo carácter no alfanumérico
  // (ej. "------" o "///////") que suelen ser ruido o abuso.
  try {
    if (/([^\p{L}\p{N}\s])\1{5,}/u.test(s)) return false;
  } catch (e) {
    if (/([^\w\s])\1{5,}/.test(s)) return false;
  }

  // Evitar patrones SQL/JS evidentes (básico): no aceptar cadenas que contengan
  // palabras reservadas de scripts/consultas en mayúsculas seguidas de paréntesis/asterisco,
  // por ejemplo "SELECT *", "DROP TABLE", "cursor.execute(", "javascript:".
  if (/(SELECT\s+\*|DROP\s+TABLE|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM|javascript:|<script)/i.test(s)) {
    return false;
  }

  // Evitar que la cadena sea solo un número (p. ej. "12345") ya que normalmente se espera
  // una calle con nombre o descriptor. Si su caso de uso requiere aceptar solo números,
  // quite esta comprobación.
  if (/^[0-9\s\-\/#ºª]+$/.test(s)) return false;

  // Si pasó todas las comprobaciones, consideramos la entrada válida.
  return true;
}

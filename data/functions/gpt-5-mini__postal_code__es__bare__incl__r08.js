/**
 * validate(code: string) -> boolean
 * Valida códigos postales de forma amplia e internacional.
 *
 * Estrategia:
 * - Normaliza y verifica casos específicos para muchos países (regex conocidos).
 * - Si no coincide con ningún patrón específico, aplica una regla genérica y
 *   tolerante con Unicode (letras/dígitos/espacio/guion) para cubrir formatos locales menos comunes.
 *
 * Limitaciones: ningún validador puede garantizar 100% de precisión para "todos los países y culturas",
 * pero esta función cubre la mayoría de formatos reales y es inclusiva con caracteres Unicode.
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  const code = input.trim();
  if (code.length === 0) return false;

  // Rechaza caracteres de control o invisibles
  if (/[\p{C}]/u.test(code)) return false;

  // Patrones específicos por país (cubre formatos comunes). Bandera 'i' cuando aplica.
  const patterns = [
    // Estados Unidos: 12345 or 12345-6789
    /^\d{5}(-\d{4})?$/,

    // Canadá: A1A 1A1
    /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i,

    // Reino Unido: formatos complejos (incluye NI)
    /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/i,

    // Francia, Alemania, Italia, España, Austria, Suiza, Bélgica: 5 dígitos usuales
    /^\d{5}$/, // FR, DE, IT, ES, CH, AT, BE también usan otros pero 5 cubre muchos

    // Países Bajos: 1234 AB
    /^\d{4}\s?[A-Za-z]{2}$/i,

    // Portugal: 1234-123 or 1234123
    /^\d{4}[-\s]?\d{3}$/,

    // Suecia: 123 45
    /^\d{3}\s?\d{2}$/,

    // Noruega, Dinamarca, Finlandia: 4 o 5 dígitos
    /^\d{4,5}$/,

    // Australia, Nueva Zelanda: 4 dígitos
    /^\d{4}$/,

    // Japón: 123-4567 or 1234567
    /^\d{3}-?\d{4}$/,

    // Corea del Sur: 5 dígitos
    /^\d{5}$/,

    // China: 6 dígitos
    /^\d{6}$/,

    // India: 6 dígitos (PIN)
    /^\d{6}$/,

    // Brasil: 12345-678
    /^\d{5}-?\d{3}$/,

    // Rusia: 6 dígitos
    /^\d{6}$/,

    // Sudáfrica: 4 dígitos
    /^\d{4}$/,

    // México, Argentina: 4-5 dígitos
    /^\d{4,5}$/,

    // Polonia: 12-345
    /^\d{2}-\d{3}$/,

    // Grecia: 123 45
    /^\d{3}\s?\d{2}$/,

    // Irlanda (Eircode): 7 caracteres alfanuméricos (3 + espacio opcional + 4)
    /^[A-Za-z0-9]{3}\s?[A-Za-z0-9]{4}$/i,

    // Israel: 5 dígitos
    /^\d{5}$/,

    // Países con códigos cortos alfanuméricos (genéricos comunes), p.ej. algunos territorios
    /^[A-Za-z0-9]{2,10}$/i
  ];

  for (const re of patterns) {
    if (re.test(code)) return true;
  }

  // Regla genérica Unicode: letras o números (cualquier escritura), espacios y guiones.
  // Longitud razonable: entre 2 y 12 caracteres.
  // Ejemplo: acepta códigos locales exóticos que no siguen los patrones listados.
  const generic = /^[\p{L}\p{N}][\p{L}\p{N}\s-]{1,11}$/u;
  return generic.test(code);
}

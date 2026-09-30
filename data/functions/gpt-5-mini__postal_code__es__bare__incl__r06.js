function validate(postal) {
  // Asegurarnos de que la entrada es un string
  if (typeof postal !== 'string') return false;
  const s = postal.trim();

  if (s.length === 0) return false;

  // Colección amplia de patrones por país/región (no exhaustiva, pero cubre la mayoría de formatos)
  // Cada regex está anclada ^...$ y algunos usan la bandera i para case-insensitive.
  const patterns = [
    // Estados Unidos: 12345 o 12345-6789
    /^\d{5}(-\d{4})?$/,

    // Canadá: A1A 1A1 ó A1A1A1 (espacio opcional)
    /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i,

    // Reino Unido (simplificado, cubre la mayoría de formatos válidos)
    /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|[A-HK-Y][0-9]{1,2}|[0-9][A-HJKPSTUW]|[A-HK-Y][0-9][ABEHMNPRVWXY])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,

    // Alemania, Francia, España, Italia: 5 dígitos
    /^\d{5}$/, // usado para muchos países con 5 dígitos

    // Países Bajos: 1234 AB (4 dígitos + 2 letras)
    /^\d{4}\s?[A-Za-z]{2}$/i,

    // Bélgica, Suiza, Austria: 4 dígitos
    /^\d{4}$/,

    // Portugal: 1234-567
    /^\d{4}-\d{3}$/,

    // Irlanda (Eircode simplificado): AAA 1234 o A65 F4E2 => 3+4 alfanuméricos con espacio opcional
    /^[A-Za-z0-9]{3}\s?[A-Za-z0-9]{4}$/i,

    // Australia, Nueva Zelanda: 4 dígitos
    /^\d{4}$/,

    // Japón: 123-4567
    /^\d{3}-\d{4}$/,

    // China, India, Rusia: 6 dígitos
    /^\d{6}$/,

    // Brasil: 12345-678
    /^\d{5}-?\d{3}$/,

    // México: 5 dígitos
    /^\d{5}$/,

    // Argentina: 4 dígitos o formato CPA: A1234ABC (simplificado)
    /^(\d{4}|[A-Za-z]\d{4}[A-Za-z]{3})$/i,

    // Sudáfrica: 4 dígitos
    /^\d{4}$/,

    // Nigeria: 6 dígitos
    /^\d{6}$/,

    // Israel: 7 dígitos
    /^\d{7}$/,

    // Turquía, Corea del Sur, Singapur, Malasia, Indonesia, Tailandia: 5-6 dígitos comunes
    /^\d{5,6}$/,

    // Filipinas: 4 dígitos
    /^\d{4}$/,

    // Vietnam, Rusia: 6 dígitos (Vietnam ya incluido, repetido por seguridad)
    /^\d{6}$/,

    // Polonia: 12-345
    /^\d{2}-\d{3}$/,

    // República Checa / Eslovaquia: 123 45 o 12345
    /^\d{3}\s?\d{2}$/,

    // Hungría, Bulgaria, Croacia, Eslovenia: 3-5 dígitos (mayoría 4)
    /^\d{3,5}$/,

    // Resto de Europa del Este: 4-6 dígitos comunes
    /^\d{4,6}$/,

    // Rusia/CIS alternativo: 6 dígitos (por si no se cogió antes)
    /^\d{6}$/
  ];

  for (const re of patterns) {
    if (re.test(s)) return true;
  }

  // Validación genérica/fallback para países no listados:
  // - longitud razonable (3..10)
  // - sólo letras, dígitos, espacios o guiones
  // - debe contener al menos un dígito (la mayoría de códigos postales contienen dígitos)
  const cleaned = s;
  if (cleaned.length < 3 || cleaned.length > 10) return false;
  if (!/^[A-Za-z0-9\s-]+$/.test(cleaned)) return false;
  if (!/\d/.test(cleaned)) return false;

  // Rechazar claramente no-postales (por ejemplo, cadenas que parecen emails o URLs)
  if (/@|\./.test(cleaned)) return false;

  // Si pasa las comprobaciones genéricas, consideramos válido (cobertura amplia internacional)
  return true;
}

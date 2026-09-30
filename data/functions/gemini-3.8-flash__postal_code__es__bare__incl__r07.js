function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();
  if (!code) {
    return false;
  }

  // Patrones para cubrir los diferentes formatos de códigos postales a nivel internacional
  const patterns = [
    // 1. Numéricos estándar: de 3 a 10 dígitos (EE. UU., Francia, Alemania, España, India, China, Australia, etc.)
    /^\d{3,10}$/,

    // 2. Numéricos con separador: p. ej., EE. UU. ZIP+4 (12345-6789), Japón (123-4567), Brasil (12345-678), Suecia (123 45)
    /^\d{2,5}[-\s]\d{2,5}$/,

    // 3. Prefijo de país ISO + numérico: p. ej., FR-75008, CH-8000, SE-12345
    /^[A-Z]{1,3}[-\s]\d{3,7}$/i,

    // 4. Canadá: formato A1A 1A1 (con o sin espacio/guion; excluye letras no usadas según la norma canadiense)
    /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z][-\s]?\d[A-CEGHJ-NPR-TV-Z]\d$/i,

    // 5. Reino Unido: formatos estándar (p. ej., SW1A 1AA, M1 1AE, B33 8TH, CR2 6XH, GIR 0AA)
    /^(?:GIR[- ]?0AA|[A-Z]{1,2}\d[A-Z\d]?[- ]?\d[A-Z]{2})$/i,

    // 6. Países Bajos: 4 dígitos seguidos de 2 letras (1234 AB)
    /^\d{4}[-\s]?[A-Z]{2}$/i,

    // 7. Irlanda (Eircode): 7 caracteres alfanuméricos agrupados 3 y 4 (p. ej., D02 X285)
    /^[A-Z\d]{3}[-\s]?[A-Z\d]{4}$/i,

    // 8. Argentina: 1 letra opcional + 4 dígitos + hasta 3 letras opcionales (p. ej., C1024CWN o 1024)
    /^[A-Z]?\d{4}[A-Z]{0,3}$/i,

    // 9. Otros formatos alfanuméricos internacionales (Malta, Brunéi, Suazilandia, etc.; p. ej., VLT 1115, H100)
    /^[A-Z]{1,3}[-\s]?\d{2,5}(?:[-\s]?[A-Z]{1,2})?$/i
  ];

  return patterns.some(pattern => pattern.test(code));
}

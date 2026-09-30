function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim().toUpperCase();
  if (!code) {
    return false;
  }

  // Patrones para códigos postales utilizados internacionalmente
  const patterns = [
    // Reino Unido (ej. SW1A 1AA, M1 1AE, CR2 6XH)
    /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/,

    // Canadá (ej. K1A 0B1)
    /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z]\s?\d[A-CEGHJ-NPR-TV-Z]\d$/,

    // Países Bajos (ej. 1012 AB)
    /^[1-9]\d{3}\s?[A-Z]{2}$/,

    // Irlanda - Eircode (ej. D02 X285, T12 AB34)
    /^(?:[A-Z]\d{2}|D6W)\s?[A-Z\d]{4}$/,

    // Malta (ej. VLT 1115)
    /^[A-Z]{3}\s?\d{2,4}$/,

    // Argentina (ej. C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/,

    // Brunéi (ej. BT2328)
    /^[A-Z]{2}\d{4}$/,

    // Esuatini / Suazilandia (ej. H100)
    /^[A-Z]\d{3}$/,

    // Códigos con prefijo de país ISO (ej. AD100, LV-1001, LT-01100, MC-98000)
    /^[A-Z]{1,3}[-\s]?\d{3,6}$/,

    // Numéricos puros de 3 a 10 dígitos (EE. UU., Alemania, España, Francia, China, India, etc.)
    /^\d{3,10}$/,

    // Numéricos con separador: guion o espacio (ej. EE. UU. ZIP+4 12345-6789, Japón 123-4567, Brasil 12345-678, Portugal 1234-567, Polonia 12-345, Suecia 123 45)
    /^\d{2,5}[-\s]\d{2,5}$/
  ];

  return patterns.some((pattern) => pattern.test(code));
}

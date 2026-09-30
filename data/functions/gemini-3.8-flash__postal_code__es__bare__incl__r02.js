function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim().toUpperCase();

  if (!code) {
    return false;
  }

  const patterns = [
    // Códigos puramente numéricos de 2 a 10 dígitos (ej. España, Francia, Alemania, EE. UU., China, India)
    /^\d{2,10}$/,

    // Numéricos con separador de guión o espacio (ej. EE. UU. ZIP+4, Japón 123-4567, Brasil 12345-678, Polonia 12-345, Suecia 123 45)
    /^\d{2,6}[-\s]\d{2,5}$/,

    // Reino Unido (ej. SW1A 1AA, M1 1AE, B33 8TH, CR2 6XH)
    /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/,

    // Canadá (ej. K1A 0B1, A1A 1A1)
    /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z]\s?\d[A-CEGHJ-NPR-TV-Z]\d$/,

    // Países Bajos (ej. 1012 AB)
    /^\d{4}\s?[A-Z]{2}$/,

    // Irlanda / Eircode (ej. D02 X285)
    /^(?:[A-Z]\d[A-Z\d]|D6W)\s?[A-Z\d]{4}$/,

    // Argentina (ej. C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/,

    // Malta (ej. VLT 1115)
    /^[A-Z]{3}\s?\d{2,4}$/,

    // Prefijos internacionales y alfanuméricos (ej. AD100, MC-98000, CH-8000, BB12345)
    /^[A-Z]{1,3}[-\s]?\d{3,6}$/
  ];

  return patterns.some((pattern) => pattern.test(code));
}

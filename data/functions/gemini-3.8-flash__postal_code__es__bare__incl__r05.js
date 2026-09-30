function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  if (code.length < 3 || code.length > 12) {
    return false;
  }

  const patterns = [
    // Códigos puramente numéricos (de 3 a 10 dígitos: p. ej., Islandia, Alemania, España, EE. UU., India, China)
    /^\d{3,10}$/,

    // Códigos numéricos con guion o espacio (p. ej., EE. UU. ZIP+4, Japón, Brasil, Polonia, Portugal, Suecia, Chequia)
    /^\d{2,5}[-\s]\d{2,5}$/,

    // Reino Unido (p. ej., SW1A 1AA, EC1A 1BB, W1A 0AX, M1 1AE, B33 8TH)
    /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,

    // Canadá (p. ej., K1A 0B1, A1A 1A1)
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z][-\s]?\d[A-CEGHJ-NPR-TV-Z]\d$/i,

    // Países Bajos (p. ej., 1012 AB)
    /^\d{4}\s*[A-Z]{2}$/i,

    // Irlanda / Eircode (p. ej., D02 X285)
    /^[A-C-NP-TV-Z]\d{2}\s*[A-C-NP-TV-Z0-9]{4}$/i,

    // Argentina (p. ej., C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Malta (p. ej., VLT 1115)
    /^[A-Z]{3}\s*\d{2,4}$/i,

    // Códigos con prefijo de país ISO (p. ej., D-12345, CH-8000, AD100, AZ 1000)
    /^[A-Z]{1,3}[-\s]\d{3,6}$/i,
    /^[A-Z]{2}\d{3,6}$/i,

    // Otros formatos alfanuméricos internacionales (p. ej., Suazilandia, Brunéi)
    /^[A-Z]{1,2}\d{3,4}$/i
  ];

  return patterns.some((pattern) => pattern.test(code));
}

function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  // La mayoría de los códigos postales del mundo tienen entre 2 y 12 caracteres
  // y todos los sistemas existentes contienen al menos un dígito numérico.
  if (code.length < 2 || code.length > 12 || !/\d/.test(code)) {
    return false;
  }

  const patterns = [
    // Formato numérico estándar (3 a 10 dígitos, ej: EE. UU., España, Francia, Alemania, India)
    /^\d{3,10}$/,

    // Numérico con separador de espacio o guion (ej: EE. UU. ZIP+4, Japón, Portugal, Polonia, Brasil)
    /^\d{2,5}[-\s]\d{2,5}$/,

    // Reino Unido (ej: SW1A 1AA, W1A 0AX, EC1A 1BB, M1 1AA, CR2 6XH)
    /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,

    // Canadá (ej: K1A 0B1)
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s*\d[ABCEGHJ-NPRSTV-Z]\d$/i,

    // Países Bajos (ej: 1234 AB)
    /^\d{4}\s*[A-Z]{2}$/i,

    // Irlanda (Eircode, ej: D02 X285)
    /^[A-Z]\d[A-Z\d]\s*[A-Z\d]{4}$/i,

    // Argentina (ej: C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Malta, Brunéi y otros formatos alfanuméricos (ej: VLT 1115, BB3510)
    /^[A-Z]{1,4}\s*\d{2,6}$/i,

    // Con prefijo internacional de país (ej: D-10115, LV-1050, CH-8000, SE-123 45)
    /^[A-Z]{1,2}[-\s]\d{3,6}$/i,
    /^[A-Z]{1,2}[-\s]\d{2,5}[-\s]\d{2,5}$/i
  ];

  return patterns.some(pattern => pattern.test(code));
}

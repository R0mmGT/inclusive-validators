function validate(code) {
  if (typeof code !== 'string') {
    return false;
  }

  const postalCode = code.trim();

  // Conjunto de patrones para cubrir los formatos de códigos postales a nivel global
  const patterns = [
    // Códigos numéricos puros (3 a 8 dígitos: Francia, Alemania, España, Italia, India, China, etc.)
    /^\d{3,8}$/,

    // Códigos numéricos con guion o espacio (EE. UU. ZIP+4, Japón, Brasil, Polonia, Portugal, etc.)
    /^\d{2,5}[-\s]\d{2,4}$/,

    // Reino Unido (ej. SW1A 1AA, M1 1AE, CR2 6XH)
    /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,

    // Canadá (formato A1A 1A1, omitiendo letras no utilizadas)
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s*\d[ABCEGHJ-NPRSTV-Z]\d$/i,

    // Países Bajos (4 dígitos + 2 letras: ej. 1012 AB)
    /^\d{4}\s*[A-Z]{2}$/i,

    // Irlanda - Eircode (ej. D02 X285)
    /^(?:[AC-FHKNPRTV-Y]\d{2}|D6W)\s*[0-9AC-FHKNPRTV-Y]{4}$/i,

    // Argentina (ej. C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Malta (ej. VLT 1115)
    /^[A-Z]{3}\s*\d{2,4}$/i,

    // Códigos con prefijo de país ISO (ej. LV-1050, CH-8000, AZ 1000) o formatos alfanuméricos cortos (Brunéi, Esuatini)
    /^[A-Z]{1,2}[-\s]?\d{3,6}$/i
  ];

  return patterns.some((regex) => regex.test(postalCode));
}

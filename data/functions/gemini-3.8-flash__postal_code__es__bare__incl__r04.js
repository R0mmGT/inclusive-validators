function validate(str) {
  if (typeof str !== 'string') return false;

  const code = str.trim();
  if (code.length < 3 || code.length > 12) return false;
  if (!/\d/.test(code)) return false;

  const patterns = [
    // Códigos puramente numéricos de 3 a 10 dígitos (EE. UU., España, Alemania, Francia, India, etc.)
    /^\d{3,10}$/,

    // Códigos numéricos separados por guion o espacio (EE. UU. ZIP+4, Japón, Brasil, Polonia, Portugal, etc.)
    /^\d{2,5}[-\s]\d{2,5}$/,

    // Reino Unido (ej. SW1A 1AA, M1 1AA, CR2 6XH)
    /^[A-Z]{1,2}\d[A-Z\d]?[-\s]?\d[A-Z]{2}$/i,

    // Canadá (ej. K1A 0B1, A1A 1A1)
    /^[A-Z]\d[A-Z][-\s]?\d[A-Z]\d$/i,

    // Países Bajos (ej. 1234 AB)
    /^\d{4}[-\s]?[A-Z]{2}$/i,

    // Argentina (ej. C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Irlanda / Eircode (ej. D02 X285)
    /^[A-Z\d]{3}[-\s]?[A-Z\d]{4}$/i,

    // Malta y formatos afines (ej. VLT 1115)
    /^[A-Z]{3}[-\s]?\d{2,4}$/i,

    // Prefijo de país ISO seguido de dígitos (ej. LV-1001, AZ-1000)
    /^[A-Z]{2,3}[-\s]\d{3,6}$/i,

    // Otros formatos alfanuméricos internacionales (ej. Brunéi, Suazilandia, etc.)
    /^[A-Z]{1,2}\d{3,5}$/i,
    /^[A-Z]{2}[-\s]?\d{5}$/i
  ];

  return patterns.some((pattern) => pattern.test(code));
}

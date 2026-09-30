function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  if (code.length < 3 || code.length > 12) {
    return false;
  }

  const patterns = [
    // Códigos puramente numéricos estándar (de 3 a 10 dígitos)
    // Ej: España (28001), Alemania (10115), Francia (75001), China (100000), India (110001)
    /^\d{3,10}$/,

    // Numéricos con separador (espacio o guion)
    // Ej: EE. UU. ZIP+4 (12345-6789), Japón (100-0001), Brasil (01310-200), Portugal (1234-567), Suecia/Rep. Checa (123 45)
    /^\d{2,5}[-\s]\d{2,5}$/,

    // Reino Unido (UK): formatos A9 9AA, A99 9AA, AA9 9AA, AA99 9AA, A9A 9AA, AA9A 9AA y GIR 0AA
    // Ej: SW1A 1AA, M1 1AA, EC1A 1BB
    /^(?:GIR[-\s]?0AA|[A-Z]{1,2}\d[A-Z\d]?[-\s]?\d[A-Z]{2})$/i,

    // Canadá: A1A 1A1 (letras alternadas con dígitos, excluyendo D, F, I, O, Q, U)
    // Ej: K1A 0B1, M5W 1E6
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z][-\s]?\d[A-CEGHJ-NPR-TV-Z]\d$/i,

    // Países Bajos (Netherlands): 4 dígitos + 2 letras
    // Ej: 1012 AB
    /^\d{4}[-\s]?[A-Z]{2}$/i,

    // Irlanda (Eircode): 3 caracteres de enrutamiento + 4 identificadores
    // Ej: D02 X285
    /^[A-Z]\d[\dW][-\s]?[A-Z\d]{4}$/i,

    // Alfanuméricos con prefijo/sufijo de letras
    // Ej: Argentina (C1024CWN), Malta (VLT 1115), Brunéi (BB1234), Andorra (AD100), Suazilandia (H100)
    /^[A-Z]{1,3}[-\s]?\d{2,5}[-\s]?[A-Z]{0,3}$/i
  ];

  return patterns.some(pattern => pattern.test(code));
}

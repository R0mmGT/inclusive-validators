const validate = (postalCode) => {
  // Validar que el input sea una cadena no vacía
  if (typeof postalCode !== 'string' || postalCode.trim() === '') {
    return false;
  }

  const code = postalCode.trim();
  
  // Patrones por país (códigos ISO 3166-1 alfa-2)
  const patterns = {
    // Estados Unidos: 5 dígitos, opcionalmente seguidos de guion y 4 dígitos
    US: /^\d{5}(-\d{4})?$/,
    // Canadá: formato A1A 1A1 donde A es letra y 1 es dígito
    CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
    // México: 5 dígitos
    MX: /^\d{5}$/,
    // Reino Unido: múltiples formatos complejos
    GB: /^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i,
    // Australia: 4 dígitos
    AU: /^\d{4}$/,
    // Alemania: 5 dígitos
    DE: /^\d{5}$/,
    // Francia: 5 dígitos
    FR: /^\d{5}$/,
    // España: 5 dígitos
    ES: /^\d{5}$/,
    // Italia: 5 dígitos
    IT: /^\d{5}$/,
    // Japón: formato 123-4567
    JP: /^\d{3}-\d{4}$/,
    // Brasil: formato 12345-678
    BR: /^\d{5}-\d{3}$/,
    // India: 6 dígitos
    IN: /^\d{6}$/,
    // China: 6 dígitos
    CN: /^\d{6}$/,
    // Corea del Sur: formato 123-456
    KR: /^\d{3}-\d{3}$/,
    // Rusia: 6 dígitos
    RU: /^\d{6}$/,
    // Argentina: 4 dígitos o formato A1234ABC
    AR: /^[A-Z]?\d{4}[A-Z]{0,3}$/i,
    // Chile: 7 dígitos
    CL: /^\d{7}$/,
    // Colombia: 6 dígitos
    CO: /^\d{6}$/,
    // Sudáfrica: 4 dígitos
    ZA: /^\d{4}$/,
    // Nueva Zelanda: 4 dígitos
    NZ: /^\d{4}$/,
    // Suecia: formato 123 45
    SE: /^\d{3} ?\d{2}$/,
    // Noruega: 4 dígitos
    NO: /^\d{4}$/,
    // Dinamarca: 4 dígitos
    DK: /^\d{4}$/,
    // Finlandia: 5 dígitos
    FI: /^\d{5}$/,
    // Países Bajos: 4 dígitos y dos letras (1234 AB)
    NL: /^\d{4} ?[A-Z]{2}$/i,
    // Bélgica: 4 dígitos
    BE: /^\d{4}$/,
    // Suiza: 4 dígitos
    CH: /^\d{4}$/,
    // Austria: 4 dígitos
    AT: /^\d{4}$/,
    // Portugal: formato 1234-567
    PT: /^\d{4}-\d{3}$/,
    // Irlanda: formato complejo
    IE: /^[A-Z]\d{2} ?[A-Z0-9]{4}$/i,
    // Israel: 7 dígitos
    IL: /^\d{7}$/,
    // Turquía: 5 dígitos
    TR: /^\d{5}$/,
    // Arabia Saudita: 5 dígitos
    SA: /^\d{5}$/,
    // Emiratos Árabes Unidos: no tiene sistema de códigos postales
    AE: /^$/,
    // Singapur: 6 dígitos
    SG: /^\d{6}$/,
    // Malasia: 5 dígitos
    MY: /^\d{5}$/,
    // Tailandia: 5 dígitos
    TH: /^\d{5}$/,
    // Vietnam: 6 dígitos
    VN: /^\d{6}$/,
    // Filipinas: 4 dígitos
    PH: /^\d{4}$/,
    // Indonesia: 5 dígitos
    ID: /^\d{5}$/,
  };

  // Recorrer todos los patrones y verificar si alguno coincide
  for (const country in patterns) {
    // Algunos países no usan códigos postales (como Emiratos Árabes)
    if (patterns[country].test(code)) {
      return true;
    }
  }

  // Regla general alternativa: entre 3 y 10 caracteres alfanuméricos con espacios o guiones
  // Esto captura formatos no incluidos en la lista específica
  const generalPattern = /^[A-Z0-9\-\s]{3,10}$/i;
  if (generalPattern.test(code)) {
    // Verificación adicional: debe contener al menos un dígito
    const hasDigit = /\d/.test(code);
    // Verificación adicional: no debe contener solo espacios o guiones
    const isValid = hasDigit && !/^[\-\s]+$/.test(code);
    return isValid;
  }

  return false;
};

function validate(apellido) {
  // Verificar que el argumento sea un string
  if (typeof apellido !== 'string') {
    return false;
  }
  
  // Verificar longitud mínima y máxima razonable
  if (apellido.length < 1 || apellido.length > 100) {
    return false;
  }
  
  // Verificar que no sean solo espacios en blanco
  if (apellido.trim().length === 0) {
    return false;
  }
  
  // Patrones de caracteres permitidos (amplios para cubrir múltiples culturas)
  const patrones = [
    // Letras latinas básicas (mayúsculas y minúsculas) con diacríticos comunes
    /^[A-Za-zÀ-ÿ\s\-'.]+$/,
    // Caracteres cirílicos
    /^[А-Яа-яЁё\s\-'.]+$/,
    // Caracteres griegos
    /^[Α-Ωα-ω\s\-'.]+$/,
    // Caracteres árabes
    /^[\u0600-\u06FF\s\-'.]+$/,
    // Caracteres hebreos
    /^[\u0590-\u05FF\s\-'.]+$/,
    // Caracteres chinos (hanzi)
    /^[\u4E00-\u9FFF\s\-'.]+$/,
    // Caracteres japoneses (hiragana, katakana, kanji)
    /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\s\-'.]+$/,
    // Caracteres coreanos (hangul)
    /^[\uAC00-\uD7AF\u1100-\u11FF\s\-'.]+$/,
    // Caracteres tailandeses
    /^[\u0E00-\u0E7F\s\-'.]+$/,
    // Caracteres devanagari (hindi, sánscrito, etc.)
    /^[\u0900-\u097F\s\-'.]+$/,
    // Caracteres armenios
    /^[\u0530-\u058F\s\-'.]+$/,
    // Caracteres georgianos
    /^[\u10A0-\u10FF\s\-'.]+$/,
  ];
  
  // Verificar si el apellido coincide con al menos uno de los patrones
  const coincideConAlgunPatron = patrones.some(patron => patron.test(apellido));
  
  if (!coincideConAlgunPatron) {
    return false;
  }
  
  // Validaciones adicionales de formato
  const apellidoTrim = apellido.trim();
  
  // No debe comenzar ni terminar con ciertos caracteres de puntuación
  if (/^[\s\-'.]|[\s\-'.]$/.test(apellidoTrim)) {
    return false;
  }
  
  // No permitir múltiples caracteres especiales consecutivos
  if (/[\-'.]{2,}/.test(apellidoTrim)) {
    return false;
  }
  
  // No permitir solo caracteres especiales o dígitos
  if (/^[\d\-'.]+$/.test(apellidoTrim)) {
    return false;
  }
  
  // Debe contener al menos un carácter alfabético (de cualquier escritura)
  const tieneCaracterAlfabetico = /[A-Za-zÀ-ÿА-Яа-яЁёΑ-Ωα-ω\u0600-\u06FF\u0590-\u05FF\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\u0E00-\u0E7F\u0900-\u097F\u0530-\u058F\u10A0-\u10FF]/.test(apellidoTrim);
  
  if (!tieneCaracterAlfabetico) {
    return false;
  }
  
  return true;
}

function validate(addressLine) {
  // Verificar que el argumento sea un string
  if (typeof addressLine !== 'string') {
    return false;
  }

  // Eliminar espacios al principio y al final
  const trimmedAddress = addressLine.trim();
  
  // La dirección no puede estar vacía
  if (trimmedAddress.length === 0) {
    return false;
  }

  // Longitudes mínimas y máximas razonables (ajustables)
  // Mínimo: normalmente al menos un número y un nombre corto (ej: "1 A")
  // Máximo: dirección muy larga pero plausible (ej: complejos residenciales)
  if (trimmedAddress.length < 2 || trimmedAddress.length > 200) {
    return false;
  }

  // Debe contener al menos un carácter alfanumérico
  // Esto excluye direcciones que solo tienen símbolos o espacios
  if (!/[a-zA-Z0-9]/.test(trimmedAddress)) {
    return false;
  }

  // Validar caracteres permitidos (amplio para cubrir múltiples culturas)
  // Permitimos letras (incluidos acentos y caracteres internacionales),
  // números, espacios, guiones, puntos, comas, barras, apóstrofes, etc.
  const validCharactersRegex = /^[\p{L}\p{M}\p{N}\s\-.,/#'"&()ºª·@]+$/u;
  if (!validCharactersRegex.test(trimmedAddress)) {
    return false;
  }

  // Evitar patrones sospechosos o claramente inválidos
  const invalidPatterns = [
    /^\s*test/i,                   // Empieza con "test"
    /^\s*demo/i,                   // Empieza con "demo"
    /^\s*asdf/i,                   // Teclas consecutivas del teclado
    /^\s*qwerty/i,                 // Teclas consecutivas del teclado
    /^\s*xxxx/i,                   // Múltiples x
    /^\s*1234\s*$/,                // Solo números secuenciales
    /^[0-9\s\-.,/#]+$/,            // Solo números y símbolos (sin letras)
    /^\s*[.,/#'"&\-]+\s*$/,        // Solo símbolos
    /(.)\1{10,}/,                  // Carácter repetido 10+ veces
    /\b\d{10,}\b/,                 // Número de más de 10 dígitos consecutivos (probablemente falso)
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedAddress)) {
      return false;
    }
  }

  // Debe contener algún número o algún texto significativo
  // Al menos 2 letras o 1 número y 1 letra
  const letters = (trimmedAddress.match(/[\p{L}\p{M}]/gu) || []).length;
  const digits = (trimmedAddress.match(/\d/g) || []).length;
  
  if (letters < 2 && (digits === 0 || letters === 0)) {
    return false;
  }

  // Validar estructura básica:
  // 1. No puede tener solo espacios consecutivos
  if (/\s{4,}/.test(trimmedAddress)) {
    return false;
  }

  // 2. No puede comenzar o terminar con símbolos (excepto algunos casos)
  if (/^[.,/#'"&\-]/.test(trimmedAddress) || /[.,/#'"&\-]\s*$/.test(trimmedAddress)) {
    // Permitir algunos casos especiales como "C/ Mayor" o "Av. Principal"
    if (!/^(C\/|Av\.|Avda\.|Plaza|Paseo|Camino)\s/.test(trimmedAddress)) {
      return false;
    }
  }

  // 3. Verificar proporción de caracteres no alfanuméricos
  const alphanumericCount = (trimmedAddress.match(/[\p{L}\p{M}\p{N}]/gu) || []).length;
  const totalCharacters = trimmedAddress.length;
  
  // Si más del 60% son símbolos/espacios, probablemente no es válido
  if (alphanumericCount / totalCharacters < 0.4) {
    return false;
  }

  // 4. Mínimo de palabras (normalmente una dirección tiene al menos 2 palabras)
  const words = trimmedAddress.split(/\s+/).filter(word => word.length > 0);
  if (words.length < 1) {
    return false;
  }

  // Validaciones adicionales para evitar entradas obviamente falsas
  const lowerAddress = trimmedAddress.toLowerCase();
  const obviouslyFake = [
    'calle falsa', 'dirección falsa', 'fake address', 'direccion falsa',
    'mi casa', 'su casa', 'casa', 'hogar', 'home', 'house', 'address',
    'calle', 'street', 'avenida', 'avenue', 'dirección', 'direccion'
  ];
  
  // Si la dirección es exactamente una de estas palabras obviamente falsas
  for (const fake of obviouslyFake) {
    if (lowerAddress === fake.toLowerCase()) {
      return false;
    }
  }

  return true;
}

function validate(addressLine) {
  // Validación básica: no debe ser vacía, nula o indefinida
  if (addressLine === null || addressLine === undefined) {
    return false;
  }
  
  // Asegurarnos de que es un string
  if (typeof addressLine !== 'string') {
    return false;
  }
  
  // Eliminar espacios en blanco al inicio y final
  const trimmedAddress = addressLine.trim();
  
  // No debe estar vacío después de trim
  if (trimmedAddress.length === 0) {
    return false;
  }
  
  // Longitud mínima y máxima razonable para una dirección
  // Mínimo: por ejemplo "1 A" (3 caracteres) - aunque varía por país
  // Máximo: 200 caracteres es un límite razonable para bases de datos
  if (trimmedAddress.length < 2 || trimmedAddress.length > 200) {
    return false;
  }
  
  // Debe contener al menos un carácter alfanumérico (letra o número)
  // Esto excluye direcciones que solo contengan símbolos
  if (!/[a-zA-Z0-9]/.test(trimmedAddress)) {
    return false;
  }
  
  // Validación de caracteres: permitir una amplia variedad internacional
  // Permitir: letras (incluyendo acentuadas y caracteres internacionales),
  // números, espacios, guiones, puntos, comas, barras, apóstrofes, etc.
  // Usamos una validación negativa: rechazamos solo caracteres peligrosos o de control
  const dangerousChars = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;
  if (dangerousChars.test(trimmedAddress)) {
    return false;
  }
  
  // Evitar secuencias de solo espacios repetidos
  if (/^\s+$/.test(trimmedAddress)) {
    return false;
  }
  
  // Debe contener al menos un número o una palabra con letras (para ser una dirección válida)
  // Esto ayuda a excluir solo símbolos o solo espacios
  const hasLettersOrWords = /[a-zA-Z\u00C0-\u017F]{2,}/.test(trimmedAddress);
  const hasNumbers = /\d/.test(trimmedAddress);
  
  if (!hasLettersOrWords && !hasNumbers) {
    return false;
  }
  
  // Validar estructura básica: no debe comenzar o terminar con ciertos caracteres
  if (/^[\/\\\-\.,;]|[\/\\\-\.,;]$/.test(trimmedAddress)) {
    return false;
  }
  
  // No permitir múltiples separadores consecutivos
  if (/[\/\\\-\.,;]{2,}/.test(trimmedAddress)) {
    return false;
  }
  
  // Para algunas culturas, direcciones pueden contener solo números
  // (ejemplo: "123" en algunas áreas rurales)
  // Para otras, pueden ser descriptivas sin números (ejemplo: "Casa del Sol")
  // Ambas son válidas, así que no forzamos la presencia de ambos
  
  // Verificar que no sea solo números repetidos o patrones simples
  if (/^\d+$/.test(trimmedAddress)) {
    // Si es solo números, debe tener al menos 1 dígito pero no más de 10
    // (para evitar números extremadamente largos)
    return trimmedAddress.length >= 1 && trimmedAddress.length <= 10;
  }
  
  // Verificar que no sea un patrón repetitivo (ejemplo: "aaaa", "1111", "....")
  const repeatedPattern = /^(.)\1+$/;
  if (repeatedPattern.test(trimmedAddress)) {
    return false;
  }
  
  // Si pasó todas las validaciones
  return true;
}

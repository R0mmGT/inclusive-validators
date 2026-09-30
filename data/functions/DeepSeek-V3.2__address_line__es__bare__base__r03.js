function validate(addressLine) {
  // Validar que el argumento sea un string
  if (typeof addressLine !== 'string') {
    return false;
  }

  // Eliminar espacios al inicio y final
  const trimmedAddress = addressLine.trim();
  
  // Validar longitud mínima y máxima razonable
  if (trimmedAddress.length < 2 || trimmedAddress.length > 100) {
    return false;
  }

  // Validar caracteres permitidos
  // Permitimos letras (incluyendo acentos y caracteres internacionales),
  // números, espacios, guiones, puntos, comas, apóstrofes, barras y símbolos comunes
  const validCharactersRegex = /^[\p{L}\p{N}\s\-\.,'"/#&()]+$/u;
  if (!validCharactersRegex.test(trimmedAddress)) {
    return false;
  }

  // Validar que contenga al menos un número (para número de calle o apartamento)
  const hasNumber = /\p{N}/u.test(trimmedAddress);
  if (!hasNumber) {
    return false;
  }

  // Validar que contenga al menos una letra (para nombre de calle)
  const hasLetter = /\p{L}/u.test(trimmedAddress);
  if (!hasLetter) {
    return false;
  }

  // Validar que no tenga múltiples espacios consecutivos
  const hasMultipleSpaces = /\s{2,}/.test(trimmedAddress);
  if (hasMultipleSpaces) {
    return false;
  }

  // Validar que no empiece o termine con caracteres no alfabéticos/númericos (excepto si es un número)
  const startsWithInvalidChar = /^[^\p{L}\p{N}]/.test(trimmedAddress);
  const endsWithInvalidChar = /[^\p{L}\p{N}]$/.test(trimmedAddress);
  if (startsWithInvalidChar || endsWithInvalidChar) {
    return false;
  }

  // Validar estructura básica: número seguido de texto o viceversa
  // Ejemplos válidos: "123 Main St", "Calle Mayor 45", "Av. Libertador 1234"
  const addressParts = trimmedAddress.split(/\s+/);
  
  // Debe tener al menos 2 partes (ej: "123" y "Main")
  if (addressParts.length < 2) {
    return false;
  }

  // Verificar que haya al menos una parte con números y una con letras
  const hasNumberPart = addressParts.some(part => /\p{N}/u.test(part));
  const hasLetterPart = addressParts.some(part => /\p{L}/u.test(part));
  
  if (!hasNumberPart || !hasLetterPart) {
    return false;
  }

  return true;
}

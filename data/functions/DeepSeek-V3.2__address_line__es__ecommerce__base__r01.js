function validate(addressLine) {
  // Validar tipo de entrada
  if (typeof addressLine !== 'string') {
    return false;
  }

  // Eliminar espacios al inicio y final
  const trimmedAddress = addressLine.trim();

  // Longitud válida (entre 3 y 100 caracteres)
  if (trimmedAddress.length < 3 || trimmedAddress.length > 100) {
    return false;
  }

  // Debe contener al menos un número (para número de casa/dirección)
  // y al menos una letra (para nombre de calle)
  const hasNumber = /\d/.test(trimmedAddress);
  const hasLetter = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(trimmedAddress);

  if (!hasNumber || !hasLetter) {
    return false;
  }

  // Validar caracteres permitidos
  // Letras (incluidas acentuadas y ñ), números, espacios, puntos, comas, guiones, barras, símbolos de número y hashtag
  const validCharacters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,\-/#]+$/;
  if (!validCharacters.test(trimmedAddress)) {
    return false;
  }

  // No debe contener solo números
  if (/^\d+$/.test(trimmedAddress.replace(/\s/g, ''))) {
    return false;
  }

  // No debe contener palabras prohibidas comunes (ejemplo básico)
  const forbiddenWords = ['ejemplo', 'test', 'prueba', 'fake', 'falso'];
  const lowerCaseAddress = trimmedAddress.toLowerCase();
  for (const word of forbiddenWords) {
    if (lowerCaseAddress.includes(word)) {
      return false;
    }
  }

  // No debe contener múltiples espacios consecutivos
  if (/\s{2,}/.test(trimmedAddress)) {
    return false;
  }

  // El primer carácter debe ser alfanumérico (no espacio, punto, coma, etc.)
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]/.test(trimmedAddress)) {
    return false;
  }

  // Debe contener al menos un espacio (separando número de calle y nombre)
  // excepto para formatos especiales como "Calle123" o "Av.123"
  if (!/\s/.test(trimmedAddress) && !/[a-zA-Z][0-9]|[0-9][a-zA-Z]/.test(trimmedAddress)) {
    return false;
  }

  // Patrones adicionales para direcciones comunes
  const commonPatterns = [
    // Formato: "Calle Nombre 123"
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*\s+\d+(\s*[a-zA-Z]?)?$/,
    // Formato: "Av. Nombre 123"
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\.?\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+\d+/,
    // Formato: "Carrera 123 # 45-67"
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+\d+\s*#\s*\d+(-\d+)?/,
    // Formato: "123 Calle Nombre"
    /^\d+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/
  ];

  // Verificar si coincide con al menos un patrón común
  const matchesCommonPattern = commonPatterns.some(pattern => pattern.test(trimmedAddress));
  
  return matchesCommonPattern;
}

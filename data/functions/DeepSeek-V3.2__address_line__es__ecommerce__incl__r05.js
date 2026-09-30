function validate(address) {
  // Validar entrada básica
  if (typeof address !== 'string') return false;
  
  // Eliminar espacios iniciales y finales
  const trimmedAddress = address.trim();
  
  // Verificar longitud mínima y máxima razonable
  if (trimmedAddress.length < 3 || trimmedAddress.length > 200) return false;
  
  // Verificar que no sea solo números o solo caracteres especiales
  if (/^\d+$/.test(trimmedAddress)) return false; // Solo números
  if (/^[^\w\s]+$/.test(trimmedAddress)) return false; // Solo caracteres especiales
  
  // Validar estructura básica: debe contener al menos un número y una palabra
  // Número puede estar al inicio o al final (ej: "123 Main St" o "Calle 123")
  const hasNumber = /\d/.test(trimmedAddress);
  const hasLetter = /[a-zA-ZÀ-ÿ]/.test(trimmedAddress);
  if (!hasNumber || !hasLetter) return false;
  
  // Validar caracteres permitidos (incluyendo caracteres internacionales)
  // Permitir letras, números, espacios, guiones, puntos, comas, barras, símbolos comunes
  const validChars = /^[a-zA-ZÀ-ÿ0-9\s\-\.,\/#ºª°'"+@&()\[\]\u00C0-\u017F]+$/u;
  if (!validChars.test(trimmedAddress)) return false;
  
  // Verificar que no tenga secuencias inválidas
  // No múltiples espacios consecutivos
  if (/\s{2,}/.test(trimmedAddress)) return false;
  // No símbolos repetidos de manera no válida
  if (/\.{2,}/.test(trimmedAddress)) return false;
  if (/,{2,}/.test(trimmedAddress)) return false;
  if (/-{2,}/.test(trimmedAddress)) return false;
  
  // Verificar estructura lógica: no puede empezar o terminar con ciertos símbolos
  if (/^[\/\.,\-]/.test(trimmedAddress)) return false;
  if (/[\/\.,\-\s]$/.test(trimmedAddress)) return false;
  
  // Verificar que tenga al menos dos "partes" (ej: número y nombre de calle)
  const parts = trimmedAddress.split(/\s+/).filter(part => part.length > 0);
  if (parts.length < 2) return false;
  
  // Validación adicional para patrones comunes
  // Patrones como "Apartamento 123", "Casa 45-B", "Calle Principal #12"
  const commonPatterns = [
    /^\d+\s+[a-zA-ZÀ-ÿ]+/, // "123 Main"
    /^[a-zA-ZÀ-ÿ]+\s+\d+/, // "Main 123"
    /^[a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+\s+\d+/, // "Calle Principal 123"
    /^\d+\s+[a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+/, // "123 Calle Principal"
    /^[a-zA-ZÀ-ÿ]+\s+#\d+/, // "Calle #123"
    /^[a-zA-ZÀ-ÿ]+\s+\d+[a-zA-Z]?/, // "Calle 123A"
    /^\d+\s*-\s*\d+\s+[a-zA-ZÀ-ÿ]+/, // "123-456 Calle"
    /^[a-zA-ZÀ-ÿ]+\s+\d+\s*-\s*\d+/, // "Calle 123-456"
  ];
  
  // Si coincide con al menos un patrón común, es válido
  const matchesCommonPattern = commonPatterns.some(pattern => pattern.test(trimmedAddress));
  if (matchesCommonPattern) return true;
  
  // Para direcciones que no coinciden con patrones comunes pero tienen estructura válida
  // Verificar que al menos una parte contenga letras y otra contenga números
  const hasPartWithLetters = parts.some(part => /[a-zA-ZÀ-ÿ]/.test(part));
  const hasPartWithNumbers = parts.some(part => /\d/.test(part));
  
  return hasPartWithLetters && hasPartWithNumbers;
}

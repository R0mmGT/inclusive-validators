function validate(addressLine) {
  // Validaciones básicas
  if (typeof addressLine !== 'string') return false;
  
  const trimmed = addressLine.trim();
  
  // Longitud razonable para una dirección
  if (trimmed.length < 3 || trimmed.length > 200) return false;
  
  // No debe contener solo espacios, números o caracteres especiales
  if (!/[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(trimmed)) return false;
  
  // Caracteres permitidos (amplio para diferentes idiomas y formatos)
  const allowedChars = /^[\p{L}\p{N}\s.,'\-/\\#&()\[\]"+:;¿?¡!ªº°@]*$/u;
  if (!allowedChars.test(trimmed)) return false;
  
  // No debe tener secuencias inválidas de caracteres
  const invalidPatterns = [
    /\.{4,}/,      // Demasiados puntos consecutivos
    /,{2,}/,       // Demasiadas comas consecutivas  
    /-{2,}/,       // Demasiados guiones consecutivos
    /\s{3,}/,      // Demasiados espacios consecutivos
    /^[\/\\.,\-]+/, // Comienza con caracteres especiales
    /[\/\\.,\-]+$/, // Termina con caracteres especiales
    /\d{10,}/      // Demasiados dígitos consecutivos (probablemente no dirección)
  ];
  
  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmed)) return false;
  }
  
  // Validaciones estructurales
  const words = trimmed.split(/\s+/).filter(w => w.length > 0);
  
  // Debe tener al menos 2 palabras significativas
  if (words.length < 2) return false;
  
  // Al menos una palabra debe tener 2+ caracteres
  const hasMeaningfulWord = words.some(word => 
    word.replace(/[.,'\-/\\#&()\[\]"+:;¿?¡!ªº°@]/g, '').length >= 2
  );
  if (!hasMeaningfulWord) return false;
  
  // Balance entre números y letras (direcciones suelen tener ambos)
  const letterCount = (trimmed.match(/[a-zA-ZÀ-ÖØ-öø-ÿ]/g) || []).length;
  const digitCount = (trimmed.match(/\d/g) || []).length;
  
  // Casos extremos: demasiados números o demasiadas letras sin números
  if (digitCount > 30) return false; // Probablemente un número muy largo
  
  // Verificar formato común: "Calle/Nombre + Número" o "Número + Calle/Nombre"
  // Permitimos ambos formatos internacionales
  
  // No debe ser un patrón repetitivo
  const firstWord = words[0].replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ]/g, '');
  if (firstWord.length > 1) {
    const repetitive = words.slice(1, 4).every(word => 
      word.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ]/g, '') === firstWord
    );
    if (repetitive) return false;
  }
  
  // Validación adicional para cadenas muy similares (posible spam)
  const uniqueChars = new Set(trimmed.toLowerCase().replace(/[^a-z]/g, ''));
  if (uniqueChars.size < 3 && trimmed.length > 20) return false;
  
  return true;
}

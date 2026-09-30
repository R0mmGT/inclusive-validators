function validate(addressLine) {
  // Validaciones básicas de tipo y longitud
  if (typeof addressLine !== 'string') return false;
  
  const trimmed = addressLine.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return false;
  
  // No debe contener solo números (aunque algunas direcciones pueden ser solo números en ciertos países,
  // generalmente representan casos especiales como "Sin nombre" o direcciones muy rurales)
  if (/^\d+$/.test(trimmed)) return false;
  
  // Debe contener al menos un carácter alfabético (considerando internacionalización)
  if (!/[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(trimmed)) return false;
  
  // Validar caracteres permitidos:
  // - Letras (incluyendo acentos y caracteres internacionales)
  // - Números
  // - Espacios
  // - Guiones, puntos, comas, barras, apóstrofes, paréntesis
  // - Caracteres especiales específicos de direcciones
  const allowedChars = /^[\p{L}\p{M}\d\s\-\.,\/'\(\)&#@;:\+]+$/u;
  if (!allowedChars.test(trimmed)) return false;
  
  // No debe comenzar o terminar con caracteres no alfabéticos/númericos (excepto algunos casos especiales)
  if (/^[\s\-\.,\/'\(\)&#@;:\+]/.test(trimmed) || /[\s\-\.,\/'\(\)&#@;:\+]$/.test(trimmed)) {
    // Permite algunos casos especiales como direcciones que comienzan con números o abreviaturas
    if (!/^\d+\s/.test(trimmed) && !/^(P\.O\.|P\.O|PO)\s/.test(trimmed)) {
      return false;
    }
  }
  
  // No debe contener secuencias repetitivas o patrones sospechosos
  if (/(.)\1{4,}/.test(trimmed)) return false; // Mismo carácter repetido 5+ veces
  
  // Debe tener una estructura razonable (al menos dos "partes" separadas por espacio)
  const parts = trimmed.split(/\s+/).filter(part => part.length > 0);
  if (parts.length < 2) return false;
  
  // Verificar que no sean palabras prohibidas o genéricas
  const forbiddenWords = [
    'undefined', 'null', 'example', 'test', 'fake', 
    'calle falsa', 'dirección falsa', 'not applicable', 'n/a'
  ];
  
  const lowerAddress = trimmed.toLowerCase();
  for (const word of forbiddenWords) {
    if (lowerAddress.includes(word)) return false;
  }
  
  // Verificar que haya al menos un número (la mayoría de direcciones postales tienen números)
  // Pero algunos países pueden tener direcciones sin números
  const hasNumber = /\d/.test(trimmed);
  
  // Longitud mínima de cada parte (excepto abreviaturas comunes)
  const abbreviations = ['st', 'av', 'ave', 'blvd', 'rd', 'dr', 'ln', 'cir', 'ct', 'pl', 'p.o', 'no', 'n°', '#'];
  for (const part of parts) {
    const cleanPart = part.replace(/[.,()]/g, '');
    if (cleanPart.length === 1 && !/\d/.test(cleanPart)) {
      return false; // Parte de un solo carácter (no numérico)
    }
  }
  
  // Validación de formato básico (opcional, ya que varía mucho entre países)
  // Se incluye como validación adicional pero no restrictiva
  
  return true;
}

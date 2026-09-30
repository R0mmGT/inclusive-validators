function validate(codigo) {
  // Verificar que el argumento sea un string
  if (typeof codigo !== 'string') {
    return false;
  }

  // Patrón para códigos postales de España (5 dígitos)
  const patternES = /^[0-9]{5}$/;
  
  // Patrón para códigos postales de México (5 dígitos)
  const patternMX = /^[0-9]{5}$/;
  
  // Patrón para códigos postales de Argentina (4 dígitos o formato A9999)
  const patternAR = /^[A-Za-z][0-9]{4}[A-Za-z]{3}$|^[0-9]{4}$/;
  
  // Patrón para códigos postales de Chile (7 dígitos)
  const patternCL = /^[0-9]{7}$/;
  
  // Patrón para códigos postales de Colombia (6 dígitos)
  const patternCO = /^[0-9]{6}$/;
  
  // Patrón para códigos postales de Estados Unidos (5 dígitos o 5+4)
  const patternUS = /^[0-9]{5}(?:-[0-9]{4})?$/;
  
  // Patrón para códigos postales de Canadá (formato A9A 9A9)
  const patternCA = /^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/;
  
  // Patrón para códigos postales de Reino Unido (formatos variados)
  const patternUK = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
  
  // Combinar todos los patrones en un array
  const patterns = [
    patternES, patternMX, patternAR, patternCL, 
    patternCO, patternUS, patternCA, patternUK
  ];
  
  // Limpiar espacios en blanco al principio y al final
  const cleanedCodigo = codigo.trim();
  
  // Verificar si coincide con al menos un patrón
  return patterns.some(pattern => pattern.test(cleanedCodigo));
}

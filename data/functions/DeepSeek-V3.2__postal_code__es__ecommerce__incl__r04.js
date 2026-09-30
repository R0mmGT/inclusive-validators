function validate(codigo) {
  // Verificar que el argumento sea un string
  if (typeof codigo !== 'string') return false;
  
  // Eliminar espacios al principio y al final
  const codigoLimpio = codigo.trim();
  
  // Patrones de validación para diferentes formatos postales del mundo
  const patrones = [
    // Estados Unidos: 5 dígitos o 5+4
    /^\d{5}(-\d{4})?$/,
    
    // Canadá: A1A 1A1 (formato canadiense alterna letras y números)
    /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
    
    // Reino Unido: variados como AA1A 1AA, A1A 1AA, etc.
    /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
    
    // Australia: 4 dígitos
    /^\d{4}$/,
    
    // Alemania: 5 dígitos
    /^\d{5}$/,
    
    // Francia: 5 dígitos
    /^\d{5}$/,
    
    // España: 5 dígitos
    /^\d{5}$/,
    
    // Italia: 5 dígitos
    /^\d{5}$/,
    
    // Países Bajos: 4 dígitos + 2 letras (opcional espacio)
    /^\d{4} ?[A-Z]{2}$/i,
    
    // Brasil: 5 dígitos + guión + 3 dígitos
    /^\d{5}-\d{3}$/,
    
    // Japón: 3 dígitos + guión + 4 dígitos
    /^\d{3}-\d{4}$/,
    
    // México: 5 dígitos
    /^\d{5}$/,
    
    // Argentina: 4 dígitos + letra (opcional)
    /^\d{4}[A-Z]{0,3}$/i,
    
    // Chile: 7 dígitos
    /^\d{7}$/,
    
    // Colombia: 6 dígitos
    /^\d{6}$/,
    
    // India: 6 dígitos
    /^\d{6}$/,
    
    // China: 6 dígitos
    /^\d{6}$/,
    
    // Rusia: 6 dígitos
    /^\d{6}$/,
    
    // Suecia: 3 dígitos + espacio + 2 dígitos
    /^\d{3} \d{2}$/,
    
    // Suiza: 4 dígitos
    /^\d{4}$/,
    
    // Nueva Zelanda: 4 dígitos
    /^\d{4}$/,
    
    // Irlanda: variados (similar a UK pero sin último espacio)
    /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/i,
    
    // Dinamarca: 4 dígitos
    /^\d{4}$/,
    
    // Noruega: 4 dígitos
    /^\d{4}$/,
    
    // Finlandia: 5 dígitos
    /^\d{5}$/,
    
    // Portugal: 4 dígitos + guión + 3 dígitos
    /^\d{4}-\d{3}$/,
    
    // Corea del Sur: 5 dígitos o 3+3
    /^\d{5}$|^\d{3}-\d{3}$/,
    
    // Taiwán: 3+2 dígitos
    /^\d{3}\d{2}$/,
    
    // Singapur: 6 dígitos
    /^\d{6}$/,
    
    // Sudáfrica: 4 dígitos
    /^\d{4}$/,
    
    // Patrón genérico: 2-10 caracteres alfanuméricos con espacios, guiones o letras
    /^[A-Z0-9][A-Z0-9\s\-]{1,9}$/i
  ];
  
  // Si el código está vacío después de limpiar
  if (codigoLimpio.length === 0) return false;
  
  // Verificar si coincide con al menos un patrón
  for (const patron of patrones) {
    if (patron.test(codigoLimpio)) {
      return true;
    }
  }
  
  return false;
}

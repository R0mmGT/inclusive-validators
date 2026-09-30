function validate(codigo) {
  // Verificar que el argumento sea un string
  if (typeof codigo !== 'string') {
    return false;
  }
  
  // Eliminar espacios al inicio y final
  const codigoLimpio = codigo.trim();
  
  // Patrón de validación para códigos postales españoles
  // Formato: 5 dígitos, donde el primer dígito no puede ser 0
  // Ejemplos válidos: 28001, 46010, 08001 (Barcelona sí permite 0 al inicio)
  // He ajustado para permitir 0 al inicio ya que hay provincias que lo usan
  const patron = /^[0-9]{5}$/;
  
  // Verificar longitud y patrón
  if (codigoLimpio.length !== 5) {
    return false;
  }
  
  // Verificar que sean solo números
  if (!patron.test(codigoLimpio)) {
    return false;
  }
  
  // Validaciones adicionales para códigos postales españoles
  const numero = parseInt(codigoLimpio, 10);
  
  // Los códigos postales deben estar entre 01000 y 52999
  // (Algunas ciudades como Barcelona tienen códigos que empiezan por 0)
  if (numero < 1000) {
    // Códigos menores a 01000 no son válidos (aunque sean 5 dígitos)
    return false;
  }
  
  // Para España, el rango máximo conocido actualmente es 52999
  // (Ceuta y Melilla tienen códigos en los 51000)
  if (numero > 52999) {
    return false;
  }
  
  return true;
}

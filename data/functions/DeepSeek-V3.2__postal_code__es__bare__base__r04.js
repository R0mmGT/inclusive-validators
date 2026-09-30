function validate(codigo) {
  // Verificar que sea un string
  if (typeof codigo !== 'string') {
    return false;
  }
  
  // Patrón para código postal español: 5 dígitos numéricos
  // Permite espacios al inicio o final pero los ignora
  const codigoLimpio = codigo.trim();
  
  // Comprobar que tenga exactamente 5 caracteres y sean solo dígitos
  if (codigoLimpio.length !== 5) {
    return false;
  }
  
  // Verificar que todos los caracteres sean dígitos
  for (let i = 0; i < codigoLimpio.length; i++) {
    if (codigoLimpio[i] < '0' || codigoLimpio[i] > '9') {
      return false;
    }
  }
  
  // Rango válido para códigos postales españoles: 01000 a 52999
  // (01 corresponde a Álava y 52 a Melilla)
  const numero = parseInt(codigoLimpio, 10);
  
  if (numero < 100 || numero > 52999) {
    return false;
  }
  
  // Códigos que no se asignan (como terminados en 00)
  if (numero % 100 === 0) {
    return false;
  }
  
  // Rangos adicionales específicos de España
  // Códigos de 53000 a 53999 son para Ceuta y Melilla (53000-53080 y 52000-52999)
  // Pero como ya limitamos a 52999, no necesitamos verificarlo
  
  return true;
}

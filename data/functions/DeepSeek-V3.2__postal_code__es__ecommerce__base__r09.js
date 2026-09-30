function validate(codigoPostal) {
  // Verificar que el argumento sea un string
  if (typeof codigoPostal !== 'string') {
    return false;
  }

  // Eliminar espacios al principio y al final
  const codigoLimpio = codigoPostal.trim();

  // Patrones para diferentes formatos comunes de códigos postales
  const patrones = [
    // España (5 dígitos)
    /^[0-9]{5}$/,
    // México (5 dígitos)
    /^[0-9]{5}$/,
    // Argentina (4 dígitos o letra + 4 dígitos + 3 letras)
    /^[0-9]{4}$|^[A-Za-z][0-9]{4}[A-Za-z]{3}$/,
    // Chile (7 dígitos)
    /^[0-9]{7}$/,
    // Colombia (6 dígitos)
    /^[0-9]{6}$/,
    // Perú (5 dígitos)
    /^[0-9]{5}$/,
    // Estados Unidos (5 dígitos o 5+4)
    /^[0-9]{5}(?:-[0-9]{4})?$/,
    // Canadá (A1A 1A1 formato)
    /^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/,
    // Reino Unido (formato complejo)
    /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
    // Alemania (5 dígitos)
    /^[0-9]{5}$/,
    // Francia (5 dígitos)
    /^[0-9]{5}$/,
    // Brasil (8 dígitos con guión)
    /^[0-9]{5}-[0-9]{3}$/,
    // Australia (4 dígitos)
    /^[0-9]{4}$/
  ];

  // Verificar si el código postal coincide con algún patrón
  return patrones.some(patron => patron.test(codigoLimpio));
}

function validate(apellido) {
  // Validar que el argumento sea un string
  if (typeof apellido !== 'string') {
    return false;
  }

  // Eliminar espacios al principio y al final
  const apellidoTrimmed = apellido.trim();

  // El apellido no puede estar vacío después del trim
  if (apellidoTrimmed.length === 0) {
    return false;
  }

  // Validar longitud razonable (entre 1 y 50 caracteres)
  if (apellidoTrimmed.length > 50) {
    return false;
  }

  // Validar que el apellido comience con una letra mayúscula
  if (!/^[A-ZÁÉÍÓÚÑÜ]/.test(apellidoTrimmed)) {
    return false;
  }

  // Validar que el resto contenga solo letras, espacios, guiones, apóstrofes y puntos
  // (permitiendo tildes, diéresis y caracteres especiales comunes en apellidos)
  if (!/^[A-ZÁÉÍÓÚÑÜ][A-Za-záéíóúñüÁÉÍÓÚÑÜ\s\-'.]+$/.test(apellidoTrimmed)) {
    return false;
  }

  // Validar que no haya espacios consecutivos, guiones consecutivos, etc.
  if (/\s{2,}/.test(apellidoTrimmed) || /-{2,}/.test(apellidoTrimmed) || /'{2,}/.test(apellidoTrimmed)) {
    return false;
  }

  // Validar que no termine con espacio, guion, apóstrofe o punto
  if (/[\s\-'.]$/.test(apellidoTrimmed)) {
    return false;
  }

  // Validar que no comience con espacio, guion, apóstrofe o punto (ya validamos mayúscula, pero por seguridad)
  if (/^[\s\-'.]/.test(apellidoTrimmed)) {
    return false;
  }

  // Validar que tenga al menos una letra después de la primera mayúscula
  if (!/[A-Za-záéíóúñüÁÉÍÓÚÑÜ]{2,}/.test(apellidoTrimmed)) {
    return false;
  }

  // Si pasa todas las validaciones, es válido
  return true;
}

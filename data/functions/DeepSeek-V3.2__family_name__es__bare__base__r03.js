function validate(apellido) {
  // Verificar que el argumento sea un string
  if (typeof apellido !== 'string') {
    return false;
  }

  // Verificar longitud mínima y máxima (1-50 caracteres)
  if (apellido.length < 1 || apellido.length > 50) {
    return false;
  }

  // Verificar que no contenga solo espacios
  if (apellido.trim().length === 0) {
    return false;
  }

  // Permitir letras (incluyendo acentos y diéresis), espacios, guiones y apóstrofes comunes en apellidos
  const patronValido = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÜüÇç\s\-\']+$/;

  // Verificar que coincida con el patrón
  if (!patronValido.test(apellido)) {
    return false;
  }

  // Verificar que no empiece ni termine con guión, apóstrofe o espacio
  if (/^[\s\-\']|[\s\-\']$/.test(apellido)) {
    return false;
  }

  // Verificar que no haya guiones o apóstrofes consecutivos
  if (/[\-\']{2,}/.test(apellido)) {
    return false;
  }

  // Verificar que haya al menos una letra (no solo caracteres especiales)
  if (!/[A-Za-zÁáÉéÍíÓóÚúÜüÑñÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÜüÇç]/.test(apellido)) {
    return false;
  }

  // Si pasa todas las validaciones
  return true;
}

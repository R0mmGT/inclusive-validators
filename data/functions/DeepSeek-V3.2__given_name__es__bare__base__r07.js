function validate(name) {
  // Verificar que el argumento sea un string
  if (typeof name !== 'string') {
    return false;
  }

  // Eliminar espacios al inicio y final
  const trimmedName = name.trim();
  
  // Verificar que no esté vacío después de trim
  if (trimmedName.length === 0) {
    return false;
  }

  // Verificar longitud mínima y máxima razonable para un nombre
  if (trimmedName.length < 2 || trimmedName.length > 50) {
    return false;
  }

  // Verificar que contenga solo letras, espacios, guiones o apóstrofes (comunes en nombres)
  // Permitir letras con acentos y caracteres especiales de diferentes idiomas
  const nameRegex = /^[\p{L}\s'-]+$/u;
  if (!nameRegex.test(trimmedName)) {
    return false;
  }

  // Verificar que no empiece ni termine con espacio, guión o apóstrofe
  if (/^[\s'-]|[\s'-]$/.test(trimmedName)) {
    return false;
  }

  // Verificar que no tenga guiones o apóstrofes consecutivos
  if (/['-]{2,}/.test(trimmedName)) {
    return false;
  }

  // Verificar que haya al menos una letra (no solo espacios, guiones, etc.)
  const letterRegex = /\p{L}/u;
  if (!letterRegex.test(trimmedName)) {
    return false;
  }

  // Verificar que el nombre no sea solo números disfrazados como letras romanos
  // (esto es opcional, dependiendo de los requisitos)
  
  // Si pasa todas las validaciones
  return true;
}

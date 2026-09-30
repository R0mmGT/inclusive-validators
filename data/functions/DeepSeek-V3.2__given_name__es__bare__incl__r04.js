function validate(nombre) {
  // Verificar que el argumento sea un string
  if (typeof nombre !== 'string') {
    return false;
  }

  // Eliminar espacios en blanco al inicio y final
  const nombreTrimmed = nombre.trim();
  
  // Verificar que el nombre no esté vacío después de trim
  if (nombreTrimmed.length === 0) {
    return false;
  }

  // Verificar longitud mínima y máxima razonable (1-50 caracteres)
  if (nombreTrimmed.length < 1 || nombreTrimmed.length > 50) {
    return false;
  }

  // Verificar que no comience ni termine con guión o apóstrofo
  if (/^[-']|[-']$/.test(nombreTrimmed)) {
    return false;
  }

  // Verificar que no tenga guiones o apóstrofos consecutivos
  if (/[-']{2,}/.test(nombreTrimmed)) {
    return false;
  }

  // Validación principal: permitir letras, guiones, apóstrofos y espacios
  // incluyendo caracteres Unicode (para nombres internacionales)
  const nombreRegex = /^(?!.*\s{2,})[\p{L}'\-][\p{L}\s'\-]*[\p{L}]$/u;
  
  // Verificar el patrón general
  if (!nombreRegex.test(nombreTrimmed)) {
    return false;
  }

  // Verificar que no tenga más de 2 palabras (para nombres compuestos como "María José")
  // pero permitir prefijos como "de la", "van der", etc.
  const palabras = nombreTrimmed.split(/\s+/);
  if (palabras.length > 3) {
    // Más de 3 palabras podría ser demasiado para un nombre de pila
    return false;
  }

  // Verificar que cada palabra cumpla con reglas básicas
  for (const palabra of palabras) {
    // Cada palabra debe tener al menos 1 letra
    if (!/^\p{L}+$/u.test(palabra.replace(/['\-]/g, ''))) {
      return false;
    }
    
    // Cada palabra debe tener entre 1 y 20 caracteres (sin contar guiones/apóstrofos)
    const palabraSinPuntuacion = palabra.replace(/['\-]/g, '');
    if (palabraSinPuntuacion.length < 1 || palabraSinPuntuacion.length > 20) {
      return false;
    }
  }

  // Verificar que no contenga números
  if (/\d/.test(nombreTrimmed)) {
    return false;
  }

  // Verificar que no sea solo espacios repetidos
  if (/^\s+$/.test(nombreTrimmed)) {
    return false;
  }

  // Verificar caracteres especiales no permitidos
  const caracteresInvalidos = /[!@#$%^&*()_+=<>?/\\\[\]{}|:;",.0-9]/;
  if (caracteresInvalidos.test(nombreTrimmed)) {
    return false;
  }

  return true;
}

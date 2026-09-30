function validate(nombre) {
  // Validación básica: debe ser un string no vacío
  if (typeof nombre !== 'string' || nombre.trim() === '') {
    return false;
  }
  
  const trimmedNombre = nombre.trim();
  
  // Eliminar múltiples espacios consecutivos
  const nombreNormalizado = trimmedNombre.replace(/\s+/g, ' ');
  
  // Longitud mínima razonable (ej: "Li") y máxima razonable
  if (nombreNormalizado.length < 2 || nombreNormalizado.length > 100) {
    return false;
  }
  
  // Debe contener al menos un espacio (nombre y apellido) o un guion/hífen
  // pero permitimos nombres de una sola palabra para culturas que lo usen
  const partes = nombreNormalizado.split(/[\s\-]+/);
  
  // Mínimo 1 parte (para nombres de una palabra) y máximo razonable
  if (partes.length < 1 || partes.length > 10) {
    return false;
  }
  
  // Cada parte debe tener longitud válida
  for (const parte of partes) {
    if (parte.length < 1 || parte.length > 50) {
      return false;
    }
    
    // Validar caracteres: permitir letras, apóstrofes, guiones internos, puntos y caracteres diacríticos
    // Esta expresión regular cubre:
    // - Letras de múltiples alfabetos (incluye Unicode para soportar diferentes idiomas)
    // - Apóstrofes y guiones (para nombres como O'Connor, Anne-Marie)
    // - Puntos (para abreviaciones como J.R.R.)
    // - Espacios ya fueron manejados en la división
    const caracterValido = /^[\p{L}\p{M}.'’-]+$/u;
    
    if (!caracterValido.test(parte)) {
      return false;
    }
    
    // Validaciones adicionales para patrones específicos
    // No debe empezar ni terminar con signos de puntuación (excepto apóstrofe inicial para algunos nombres)
    if (parte.startsWith('-') || parte.startsWith('.') || parte.startsWith('’') || 
        parte.endsWith('-') || parte.endsWith('.') || parte.endsWith('’')) {
      return false;
    }
    
    // No más de un apóstrofe o guion consecutivo
    if (/(['’-])\1/.test(parte)) {
      return false;
    }
    
    // Al menos debe contener una letra
    const tieneLetra = /[\p{L}\p{M}]/u.test(parte);
    if (!tieneLetra) {
      return false;
    }
  }
  
  // Validar estructura general del nombre completo
  // No debe tener solo caracteres especiales o números
  const tieneLetraEnNombreCompleto = /[\p{L}\p{M}]/u.test(nombreNormalizado);
  if (!tieneLetraEnNombreCompleto) {
    return false;
  }
  
  // No debe contener números
  if (/\d/.test(nombreNormalizado)) {
    return false;
  }
  
  // No debe contener caracteres especiales no permitidos
  const caracteresNoPermitidos = /[!@#$%^&*()_+=<>?/\\[\]{}|~`:;",0-9]/;
  if (caracteresNoPermitidos.test(nombreNormalizado)) {
    return false;
  }
  
  return true;
}

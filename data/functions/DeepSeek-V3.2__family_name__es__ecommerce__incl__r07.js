/**
 * Valida si una cadena es un apellido de persona válido.
 * Considera apellidos de múltiples culturas, incluyendo:
 * - Apellidos compuestos (con guiones, espacios o apóstrofes)
 * - Apellidos con caracteres acentuados y diacríticos
 * - Apellidos con letras de alfabetos no latinos (cirílico, griego, etc.)
 * - Apellidos con partículas como "de", "van", "bin", etc.
 * - Longitud mínima y máxima razonable
 * 
 * @param {string} apellido - El apellido a validar
 * @returns {boolean} - true si es válido, false en caso contrario
 */
function validate(apellido) {
  // Validaciones básicas
  if (typeof apellido !== 'string') {
    return false;
  }
  
  const trimmed = apellido.trim();
  
  // Longitud válida (entre 1 y 100 caracteres)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }
  
  // Patrón principal que permite:
  // 1. Letras de múltiples alfabetos (latino, cirílico, griego, armenio, georgiano, etc.)
  // 2. Caracteres diacríticos y acentuados
  // 3. Guiones, apóstrofes y espacios para apellidos compuestos
  // 4. Puntos para abreviaciones (ej. "St. John")
  const patronPrincipal = /^[\p{L}\p{M}]([\p{L}\p{M}'-.\s]*[\p{L}\p{M}])?$/u;
  
  if (!patronPrincipal.test(trimmed)) {
    return false;
  }
  
  // Validaciones adicionales
  
  // No debe comenzar con espacios, guiones, apóstrofes o puntos
  if (/^[-\s'.]/.test(trimmed)) {
    return false;
  }
  
  // No debe terminar con espacios, guiones, apóstrofes o puntos
  if (/[-\s'.]$/.test(trimmed)) {
    return false;
  }
  
  // No permite guiones, apóstrofes o puntos consecutivos
  if (/[-'.]{2,}/.test(trimmed)) {
    return false;
  }
  
  // No permite secuencias inválidas como " ." o "- " o "' "
  if (/[-\s'.]\s|\s[-\s'.]/.test(trimmed)) {
    return false;
  }
  
  // Debe contener al menos una letra (no solo caracteres especiales)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }
  
  // No permite solo espacios en blanco
  if (!trimmed.replace(/\s+/g, '').length) {
    return false;
  }
  
  // Verificar que no sea una cadena con solo números
  if (/^\d+$/.test(trimmed.replace(/[^\d]/g, ''))) {
    return false;
  }
  
  // Casos especiales que queremos permitir explícitamente
  const casosEspecialesPermitidos = [
    // Apellidos con partículas comunes
    /^[A-Za-zÀ-ÿ]+ [A-Za-zÀ-ÿ]+$/,
    /^[A-Za-zÀ-ÿ]+-[A-Za-zÀ-ÿ]+$/,
    /^[A-Za-zÀ-ÿ]+'[A-Za-zÀ-ÿ]+$/,
    // Apellidos con "de", "van", etc.
    /^(de|van|von|bin|al|el|la|di|da|del|della|dos|das|de la|de los|van der|van den|af|zu|y|e|o|mac|mc|fitz|st\.?)\s+[A-Za-zÀ-ÿ]+$/i
  ];
  
  // Si pasa todas las validaciones, es válido
  return true;
}

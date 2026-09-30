function validate(apellido) {
  // Validación básica: debe ser una cadena no vacía
  if (typeof apellido !== 'string' || apellido.trim() === '') {
    return false;
  }
  
  const limpio = apellido.trim();
  
  // Longitud razonable para un apellido (entre 1 y 50 caracteres)
  if (limpio.length < 1 || limpio.length > 50) {
    return false;
  }
  
  // Patrón para apellidos comunes internacionales:
  // - Puede contener letras (incluidas acentuadas y letras internacionales como ñ, ç)
  // - Puede incluir guiones, espacios y apóstrofes (comunes en apellidos compuestos)
  // - Puede empezar y terminar solo con letras (no con los separadores)
  // - No permite números ni símbolos especiales
  const patronApellido = /^[A-Za-zÁáÀàÂâÄäÃãÅåÆæÇçÉéÈèÊêËëÍíÌìÎîÏïÑñÓóÒòÔôÖöÕõØøŒœÚúÙùÛûÜüÝýŸÿß]([A-Za-zÁáÀàÂâÄäÃãÅåÆæÇçÉéÈèÊêËëÍíÌìÎîÏïÑñÓóÒòÔôÖöÕõØøŒœÚúÙùÛûÜüÝýŸÿß\s'-]*[A-Za-zÁáÀàÂâÄäÃãÅåÆæÇçÉéÈèÊêËëÍíÌìÎîÏïÑñÓóÒòÔôÖöÕõØøŒœÚúÙùÛûÜüÝýŸÿß])?$/u;
  
  // Verificar que cumpla el patrón
  if (!patronApellido.test(limpio)) {
    return false;
  }
  
  // Validaciones adicionales:
  
  // No más de 2 guiones/apóstrofes seguidos o en total
  if ((limpio.match(/-{2,}/g) || []).length > 0 || 
      (limpio.match(/'{2,}/g) || []).length > 0) {
    return false;
  }
  
  // No más de 2 espacios consecutivos
  if ((limpio.match(/\s{2,}/g) || []).length > 0) {
    return false;
  }
  
  // No puede empezar ni terminar con guión, apóstrofe o espacio (ya cubierto por el patrón, pero por seguridad)
  if (limpio.startsWith('-') || limpio.startsWith("'") || limpio.startsWith(' ') ||
      limpio.endsWith('-') || limpio.endsWith("'") || limpio.endsWith(' ')) {
    return false;
  }
  
  // Si pasa todas las validaciones
  return true;
}

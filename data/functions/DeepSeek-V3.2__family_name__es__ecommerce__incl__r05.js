function validate(apellido) {
  // Validación básica: tipo de dato y existencia
  if (typeof apellido !== 'string') {
    return false;
  }
  
  // Eliminar espacios al inicio y final
  const apellidoTrimmed = apellido.trim();
  
  // Un apellido no puede estar vacío después de trim
  if (apellidoTrimmed.length === 0) {
    return false;
  }
  
  // Longitud máxima razonable para un apellido (considerando apellidos compuestos)
  if (apellidoTrimmed.length > 100) {
    return false;
  }
  
  // Patrón principal: permite letras de cualquier alfabeto, espacios, guiones y apóstrofes
  // Incluye caracteres latinos, cirílicos, griegos, chinos, japoneses, coreanos, árabes, etc.
  const patronBasico = /^[\p{L}\s'-]+$/u;
  
  // Validar que solo contenga caracteres permitidos
  if (!patronBasico.test(apellidoTrimmed)) {
    return false;
  }
  
  // Validaciones específicas para evitar patrones problemáticos
  
  // 1. No debe contener solo espacios, guiones o apóstrofes repetidos
  const soloCaracteresEspeciales = /^[\s'-]+$/;
  if (soloCaracteresEspeciales.test(apellidoTrimmed)) {
    return false;
  }
  
  // 2. No debe tener espacios, guiones o apóstrofes consecutivos en exceso
  const caracteresConsecutivos = /[\s'-]{3,}/;
  if (caracteresConsecutivos.test(apellidoTrimmed)) {
    return false;
  }
  
  // 3. No debe comenzar o terminar con guiones, apóstrofes o espacios
  const comienzaConEspecial = /^[\s'-]/;
  const terminaConEspecial = /[\s'-]$/;
  if (comienzaConEspecial.test(apellidoTrimmed) || terminaConEspecial.test(apellidoTrimmed)) {
    return false;
  }
  
  // 4. Debe contener al menos una letra
  const tieneLetra = /\p{L}/u;
  if (!tieneLetra.test(apellidoTrimmed)) {
    return false;
  }
  
  // Validación adicional para nombres de una sola letra (algunas culturas los tienen)
  // Pero verificamos que si tiene una sola letra, sea válida
  const letrasSolas = apellidoTrimmed.replace(/[\s'-]/g, '');
  if (letrasSolas.length === 1) {
    // Para una sola letra, debe ser un carácter de letra válido
    const esLetraValida = /^\p{L}$/u;
    return esLetraValida.test(letrasSolas);
  }
  
  // Validación para casos donde hay múltiples palabras (apellidos compuestos)
  // Verificar que cada parte del apellido sea válida
  const partes = apellidoTrimmed.split(/[\s-]+/).filter(part => part.length > 0);
  
  for (const parte of partes) {
    // Cada parte debe contener al menos una letra
    if (!/\p{L}/u.test(parte)) {
      return false;
    }
    
    // Si una parte comienza o termina con apóstrofe, validar casos específicos
    if ((parte.startsWith("'") || parte.endsWith("'")) && parte.length > 1) {
      // Casos como O'Connor, D'Angelo son válidos
      const parteSinApostrofe = parte.replace(/'/g, '');
      if (!/\p{L}/u.test(parteSinApostrofe)) {
        return false;
      }
    }
  }
  
  // Si pasa todas las validaciones
  return true;
}

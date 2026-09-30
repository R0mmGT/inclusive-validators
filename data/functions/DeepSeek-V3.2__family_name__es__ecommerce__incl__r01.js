function validate(apellido) {
  // Verificar que el argumento sea un string
  if (typeof apellido !== 'string') {
    return false;
  }

  // Eliminar espacios al inicio y final
  apellido = apellido.trim();

  // Verificar longitud mínima y máxima razonable
  if (apellido.length < 1 || apellido.length > 100) {
    return false;
  }

  // Verificar que no consista solo en espacios
  if (apellido === '') {
    return false;
  }

  // Patrones de caracteres permitidos (amplio para múltiples culturas)
  // 1. Letras de múltiples alfabetos (incluye acentos, diacríticos, etc.)
  // 2. Apóstrofos (O'Connor, D'Angelo)
  // 3. Guiones (Smith-Jones, García-López)
  // 4. Espacios (van der Waals, de la Cruz)
  // 5. Puntos (para abreviaciones, menos común)
  const patronBasico = /^[\p{L}\s.'-]+$/u;
  
  if (!patronBasico.test(apellido)) {
    return false;
  }

  // Validaciones adicionales de sentido común
  // No puede empezar o terminar con caracteres no alfabéticos (excepto apóstrofo inicial en algunos casos)
  if (/^[.\s\-']|[\s.\-']$/.test(apellido)) {
    // Caso especial: apóstrofo inicial permitido (ej: O'Connor)
    if (!/^'/.test(apellido)) {
      return false;
    }
  }

  // No permitir secuencias inválidas
  if (/['.\-]{2,}/.test(apellido) || /\s{2,}/.test(apellido)) {
    return false;
  }

  // Verificar que haya al menos una letra
  if (!/\p{L}/u.test(apellido)) {
    return false;
  }

  // Casos especiales culturales
  // Permitir apellidos con partículas (van, de, der, etc.)
  // Permitir apóstrofos (irlandeses, italianos)
  // Permitir guiones (apellidos compuestos)

  return true;
}

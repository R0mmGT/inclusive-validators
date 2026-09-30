function validate(apellido) {
  // Verificar que el argumento sea un string
  if (typeof apellido !== 'string') {
    return false;
  }
  
  // Eliminar espacios en blanco al inicio y final
  const limpio = apellido.trim();
  
  // Un apellido no puede estar vacío después de trim
  if (limpio.length === 0) {
    return false;
  }
  
  // Longitud máxima razonable (considerando apellidos compuestos)
  if (limpio.length > 100) {
    return false;
  }
  
  // Patrones básicos que deben cumplir TODOS los apellidos válidos:
  // 1. Debe contener al menos una letra (de cualquier alfabeto)
  // 2. Puede contener letras, espacios, guiones, apóstrofes y puntos
  // 3. No puede comenzar o terminar con caracteres no alfabéticos (excepto posible apóstrofo inicial en algunos casos)
  // 4. No puede tener caracteres no alfabéticos consecutivos (excepto espacios entre nombres compuestos)
  
  // Expresión regular que permite:
  // - Letras de cualquier alfabeto (incluidos acentos, diacríticos, caracteres internacionales)
  // - Espacios, guiones, apóstrofes y puntos (pero no al inicio ni al final, excepto apóstrofo inicial)
  // - No permite dígitos ni caracteres especiales como @, #, $, etc.
  
  // Patrón principal:
  // ^ - inicio de la cadena
  // [\p{L}'‘’] - letra de cualquier alfabeto o apóstrofo (incluye variantes tipográficas)
  // (?: ... )* - grupo no capturado que puede repetirse 0 o más veces
  // [\p{L}\s.'‘’-] - letra, espacio, punto, apóstrofo o guión
  // * - repetir 0 o más veces
  // \p{L} - al menos una letra al final
  // $ - fin de la cadena
  
  // Versión simplificada para compatibilidad con JavaScript estándar:
  // Usamos rangos Unicode amplios para cubrir la mayoría de alfabetos
  
  // Patrón que permite:
  // 1. Carácter inicial: letra o apóstrofo (para casos como O'Connor)
  // 2. Seguido de: letras, espacios, guiones, apóstrofes, puntos
  // 3. Al menos una letra en total
  // 4. No permite dos caracteres no alfabéticos consecutivos (excepto espacios entre palabras)
  
  // Desglose del patrón:
  // ^[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ'] - Letras de alfabetos latinos extendidos + apóstrofo
  // [A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ'\.\s-]* - Cualquier combinación de letras, puntos, espacios, guiones, apóstrofes
  // [A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ']$ - Debe terminar con letra o apóstrofo
  
  const patronBasico = /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ'][A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ'\.\s-]*[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ']$/;
  
  // Verificar caracteres chinos, japoneses, coreanos, árabes, hebreos, cirílicos, griegos, etc.
  // Rangos Unicode para otros sistemas de escritura:
  const otrosAlfabetos = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0700-\u074F\u0780-\u07BF\u07C0-\u07FF\u0370-\u03FF\u0400-\u04FF\u0530-\u058F\u0590-\u05FF\u3100-\u312F\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/;
  
  // Patrón para apellidos en otros alfabetos (sin caracteres especiales occidentales)
  const patronInternacional = /^[\p{L}\p{M}'‘’][\p{L}\p{M}\s.'‘’-]*[\p{L}\p{M}'‘’]$/u;
  
  // Verificar usando el patrón con soporte Unicode si está disponible
  let cumplePatron = false;
  
  try {
    // Intentar con patrón Unicode completo (navegadores modernos)
    cumplePatron = patronInternacional.test(limpio);
  } catch (e) {
    // Fallback para navegadores sin soporte completo de Unicode
    // Primero verificar si contiene caracteres de otros alfabetos
    const tieneAlfabetoNoLatino = otrosAlfabetos.test(limpio);
    
    if (tieneAlfabetoNoLatino) {
      // Para alfabetos no latinos, permitir solo letras y espacios
      const patronAlfabetosNoLatinos = /^[\p{L}\p{M}\s]+$/u;
      try {
        cumplePatron = patronAlfabetosNoLatinos.test(limpio);
      } catch (e2) {
        // Si aún falla, usar validación más permisiva
        cumplePatron = limpio.length > 0 && !/[\d@#$%&*_+=<>[\]{}|\\:;"~`]/.test(limpio);
      }
    } else {
      // Para alfabetos latinos, usar el patrón básico
      cumplePatron = patronBasico.test(limpio);
    }
  }
  
  if (!cumplePatron) {
    return false;
  }
  
  // Validaciones adicionales:
  
  // 1. No puede tener solo espacios
  if (/^\s+$/.test(limpio)) {
    return false;
  }
  
  // 2. No puede tener caracteres especiales consecutivos (excepto espacios entre palabras)
  // Ejemplo: no permitir "O''Connor" o "Smith--Jones"
  if (/([.'‘’-])[.'‘’-]/.test(limpio.replace(/\s+/g, ' '))) {
    return false;
  }
  
  // 3. No puede comenzar o terminar con guión, punto o espacio (ya cubierto por el patrón principal)
  // 4. Verificar que haya al menos una letra (no solo caracteres especiales)
  const soloLetras = limpio.replace(/[^A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ\p{L}]/gu, '');
  if (soloLetras.length === 0) {
    return false;
  }
  
  // 5. No puede tener números
  if (/\d/.test(limpio)) {
    return false;
  }
  
  // 6. Validar estructura para apellidos compuestos
  // Dividir por espacios para verificar cada parte
  const partes = limpio.split(/\s+/);
  
  for (const parte of partes) {
    // Cada parte no vacía debe contener al menos una letra
    if (parte.length > 0) {
      const letrasEnParte = parte.replace(/[^A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ\p{L}]/gu, '');
      if (letrasEnParte.length === 0) {
        return false;
      }
      
      // No puede comenzar o terminar con caracteres especiales (excepto apóstrofo inicial/final permitido)
      if (/^[.'‘’-]|[.'‘’-]$/.test(parte.replace(/^'|'$/g, ''))) {
        return false;
      }
    }
  }
  
  // Si pasa todas las validaciones
  return true;
}

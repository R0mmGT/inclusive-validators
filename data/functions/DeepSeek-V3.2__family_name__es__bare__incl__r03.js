function validate(apellido) {
  // Verificar que el argumento sea un string
  if (typeof apellido !== 'string') {
    return false;
  }

  // Eliminar espacios al principio y al final
  const apellidoTrim = apellido.trim();
  
  // Verificar que no esté vacío después de trim
  if (apellidoTrim.length === 0) {
    return false;
  }

  // Longitud mínima y máxima razonable
  if (apellidoTrim.length < 1 || apellidoTrim.length > 100) {
    return false;
  }

  // Patrón base: letras, espacios, guiones, apóstrofes y puntos
  // Esto cubre la mayoría de apellidos internacionales
  const patronBase = /^[\p{L}\s'\-\.]+$/u;
  
  if (!patronBase.test(apellidoTrim)) {
    return false;
  }

  // Validaciones específicas por cultura

  // 1. Evitar que empiece o termine con caracteres no alfabéticos (excepto apóstrofe para casos como O'Connor)
  if (/^[^a-zA-ZÀ-ÿ]/.test(apellidoTrim) && !/^'/.test(apellidoTrim)) {
    return false;
  }

  // 2. Evitar caracteres repetidos en exceso (posible error de entrada)
  if (/(.)\1{4,}/.test(apellidoTrim)) {
    return false;
  }

  // 3. Validar que no tenga solo espacios o caracteres especiales
  if (!/\p{L}/u.test(apellidoTrim)) {
    return false;
  }

  // 4. Verificar que no tenga combinaciones inválidas de caracteres especiales
  // Evitar dos o más caracteres especiales consecutivos (excepto espacios)
  if (/[\.\-\']{2,}/.test(apellidoTrim)) {
    return false;
  }

  // 5. Verificar que los guiones no estén al principio o al final
  if (/^-|-$/.test(apellidoTrim.replace(/\s/g, ''))) {
    return false;
  }

  // 6. Casos específicos para apellidos compuestos
  // Permitir espacios y guiones para apellidos como "De la Cruz", "Van der Vaart", "Smith-Jones"
  // Verificar que después de un espacio o guión haya una letra
  if (/[\s\-\.'][\s\-\.']/.test(apellidoTrim)) {
    return false;
  }

  // 7. Verificar que los puntos solo aparezcan después de una letra mayúscula (abreviaturas)
  const partes = apellidoTrim.split(/\s+/);
  for (const parte of partes) {
    if (parte.includes('.')) {
      // Verificar que los puntos estén en posiciones válidas
      const subpartes = parte.split('.');
      for (let i = 0; i < subpartes.length - 1; i++) {
        if (subpartes[i].length === 0 || !/^\p{Lu}/u.test(subpartes[i])) {
          return false;
        }
      }
    }
  }

  // Validaciones adicionales para evitar entradas obviamente incorrectas
  
  // 8. Evitar que contenga números
  if (/\d/.test(apellidoTrim)) {
    return false;
  }

  // 9. Evitar caracteres de control
  if (/[\x00-\x1F\x7F]/.test(apellidoTrim)) {
    return false;
  }

  // 10. Evitar múltiples espacios consecutivos
  if (/\s{2,}/.test(apellidoTrim)) {
    return false;
  }

  // Casos especiales de apellidos válidos
  
  // Apellidos con apóstrofe (irlandeses, franceses, etc.)
  // Ejemplo: O'Connor, D'Angelo, L'Hereux
  const apostrofeValido = /^[A-Za-zÀ-ÿ]+'[A-Za-zÀ-ÿ]+$/;
  
  // Apellidos con guión (apellidos compuestos)
  // Ejemplo: García-Márquez, Smith-Jones
  const guionValido = /^[A-Za-zÀ-ÿ]+-[A-Za-zÀ-ÿ]+$/;
  
  // Apellidos con prefijos
  // Ejemplo: De la Torre, Van der Berg, Von Trapp
  const prefijosValidos = /^(de|van|von|der|di|da|del|della|dos|das|le|la|los|las|al|el|il|lo|mac|mc|o'|d')[-\s]/i;
  
  // Si pasa todas las validaciones, considerar válido
  return true;
}

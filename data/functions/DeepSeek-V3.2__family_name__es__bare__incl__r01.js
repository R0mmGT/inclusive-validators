function validate(apellido) {
  // Verificar que el argumento sea un string
  if (typeof apellido !== 'string') {
    return false;
  }
  
  // Eliminar espacios al principio y final
  const trimmed = apellido.trim();
  
  // Verificar que no esté vacío después del trim
  if (trimmed.length === 0) {
    return false;
  }
  
  // Longitud mínima y máxima razonable
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }
  
  // Verificar caracteres básicos permitidos globalmente:
  // - Letras (incluyendo acentos y diacríticos)
  // - Guiones, apóstrofos, espacios (para apellidos compuestos)
  // - Puntos (para abreviaciones como "St.")
  const caracteresPermitidos = /^[\p{L}\s'-\.]+$/u;
  if (!caracteresPermitidos.test(trimmed)) {
    return false;
  }
  
  // Verificar que no empiece ni termine con caracteres especiales
  const noIniciaConEspecial = /^[^\s'-\.]/u.test(trimmed);
  const noTerminaConEspecial = /[^\s'-\.]$/u.test(trimmed);
  
  if (!noIniciaConEspecial || !noTerminaConEspecial) {
    return false;
  }
  
  // Verificar que no haya secuencias inválidas de caracteres especiales
  const sinSecuenciasDobles = !/(\s{2,}|'{2,}|-{2,}|\.{2,})/u.test(trimmed);
  const sinCombinacionesInvalidas = !/(\.['\-\s]|['\-]\.|\s['\-]\.|['\-]\s\.)/u.test(trimmed);
  
  if (!sinSecuenciasDobles || !sinCombinacionesInvalidas) {
    return false;
  }
  
  // Verificar que tenga al menos una letra
  const tieneLetra = /\p{L}/u.test(trimmed);
  if (!tieneLetra) {
    return false;
  }
  
  // Verificar que no sea solo espacios en blanco
  const noEsSoloEspacios = trimmed.trim().length > 0;
  if (!noEsSoloEspacios) {
    return false;
  }
  
  // Casos específicos de apellidos compuestos
  // Permitir apóstrofes, guiones y espacios en posiciones válidas
  const partes = trimmed.split(/[\s\-']+/);
  const todasPartesValidas = partes.every(parte => {
    // Cada parte debe tener al menos un carácter alfabético
    return /\p{L}/u.test(parte) && parte.length > 0;
  });
  
  if (!todasPartesValidas) {
    return false;
  }
  
  return true;
}

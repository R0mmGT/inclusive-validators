function validate(nombreCompleto) {
  // Verificar que el argumento sea un string
  if (typeof nombreCompleto !== 'string') {
    return false;
  }

  // Eliminar espacios en blanco al inicio y final
  const nombreTrimmed = nombreCompleto.trim();
  
  // Verificar que no esté vacío después de trim
  if (nombreTrimmed.length === 0) {
    return false;
  }

  // Verificar longitud máxima razonable (255 caracteres)
  if (nombreTrimmed.length > 255) {
    return false;
  }

  // Dividir en partes separadas por espacios
  const partes = nombreTrimmed.split(/\s+/).filter(part => part.length > 0);
  
  // Verificar que haya al menos dos partes (nombre y apellido)
  if (partes.length < 2) {
    return false;
  }

  // Verificar que cada parte tenga al menos 2 caracteres (excepto prefijos/sufijos)
  const prefijosComunes = ['de', 'la', 'las', 'los', 'del', 'y', 'el', 'van', 'von', 'di', 'da', 'dei', 'della', 'dos', 'das', 'mc', 'mac', 'san', 'santa', 'st', 'o\'', 'al', 'bin', 'ibn', 'abd', 'abu', 'bint', 'bte'];
  const sufijosComunes = ['jr', 'sr', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
  
  for (let i = 0; i < partes.length; i++) {
    const parte = partes[i].toLowerCase();
    
    // Verificar longitud mínima (excepto para prefijos/sufijos comunes)
    const esPrefijo = prefijosComunes.includes(parte);
    const esSufijo = (i === partes.length - 1) && sufijosComunes.includes(parte);
    
    if (!esPrefijo && !esSufijo && partes[i].length < 2) {
      return false;
    }
  }

  // Patrón básico de validación que permite:
  // - Letras con acentos y diacríticos de múltiples idiomas
  // - Guiones y apóstrofes (comunes en nombres)
  // - Puntos (para iniciales o abreviaciones)
  const patronNombre = /^[\p{L}\p{M}'\-\.\s]+$/u;
  
  if (!patronNombre.test(nombreTrimmed)) {
    return false;
  }

  // Verificar que no haya caracteres repetidos de forma sospechosa
  if (/(.)\1{4,}/.test(nombreTrimmed)) {
    return false;
  }

  // Verificar que no sea solo números
  if (/^\d+$/.test(nombreTrimmed.replace(/[^\d]/g, ''))) {
    return false;
  }

  // Verificar que haya al menos una letra (no solo prefijos/sufijos)
  const letrasEnNombre = nombreTrimmed.replace(/[^\p{L}]/gu, '');
  if (letrasEnNombre.length < 2) {
    return false;
  }

  return true;
}

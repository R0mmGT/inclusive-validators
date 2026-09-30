function validate(apellido) {
  if (typeof apellido !== 'string' || apellido.trim() === '') {
    return false;
  }
  
  const nombreLimpio = apellido.trim();
  const longitudMinima = 2;
  const longitudMaxima = 50;
  
  if (nombreLimpio.length < longitudMinima || nombreLimpio.length > longitudMaxima) {
    return false;
  }
  
  // Permite letras (incluyendo acentos y diacríticos), espacios, guiones y apóstrofes
  const patronApellido = /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÑñÇçßØøÆæÅå\s\-']+$/;
  
  if (!patronApellido.test(nombreLimpio)) {
    return false;
  }
  
  // Verificar que no comience ni termine con caracteres no alfabéticos
  const primerCaracter = nombreLimpio.charAt(0);
  const ultimoCaracter = nombreLimpio.charAt(nombreLimpio.length - 1);
  const esCaracterAlfabetico = /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÑñÇçßØøÆæÅå]$/;
  
  if (!esCaracterAlfabetico.test(primerCaracter) || !esCaracterAlfabetico.test(ultimoCaracter)) {
    return false;
  }
  
  // Verificar que no haya secuencias inválidas de caracteres especiales
  const secuenciasInvalidas = /[\s\-']{2,}|[\s\-'][\s\-']/;
  if (secuenciasInvalidas.test(nombreLimpio)) {
    return false;
  }
  
  // Verificar que haya al menos una letra (no solo caracteres especiales)
  const tieneLetras = /[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÑñÇçßØøÆæÅå]/;
  if (!tieneLetras.test(nombreLimpio)) {
    return false;
  }
  
  // Verificar que si tiene guion, esté entre letras (no al inicio ni al final)
  const tieneGuion = nombreLimpio.includes('-');
  if (tieneGuion) {
    const partes = nombreLimpio.split('-');
    for (let parte of partes) {
      if (parte.length === 0 || !tieneLetras.test(parte.charAt(0))) {
        return false;
      }
    }
  }
  
  return true;
}

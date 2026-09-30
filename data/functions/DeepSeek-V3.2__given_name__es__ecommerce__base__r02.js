function validate(nombre) {
  // Verificar que el argumento sea un string
  if (typeof nombre !== 'string') {
    return false;
  }

  // Eliminar espacios al inicio y final
  const nombreLimpio = nombre.trim();
  
  // Verificar longitud mínima y máxima (típicamente 2-50 caracteres)
  if (nombreLimpio.length < 2 || nombreLimpio.length > 50) {
    return false;
  }

  // Verificar que solo contenga letras, espacios, guiones y apóstrofes comunes en nombres
  // Permitimos letras con acentos, diéresis, ç, ñ, etc.
  const regexNombre = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÜüßÆæØøÅå']+([ \-'][A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÜüßÆæØøÅå']+)*$/;
  
  if (!regexNombre.test(nombreLimpio)) {
    return false;
  }

  // Verificar que no comience ni termine con espacios, guiones o apóstrofes
  if (/^[\s\-']|[\s\-']$/.test(nombreLimpio)) {
    return false;
  }

  // Verificar que no haya secuencias inválidas como "--", "''", "  ", etc.
  if (/(--|''|\s\s)/.test(nombreLimpio)) {
    return false;
  }

  // Verificar que al menos una letra sea mayúscula (primera letra de cada parte del nombre)
  const partesNombre = nombreLimpio.split(/[\s\-']+/);
  
  for (const parte of partesNombre) {
    if (parte.length === 0) {
      return false;
    }
    
    // Verificar que cada parte comience con letra (no número ni símbolo)
    const primeraLetra = parte.charAt(0);
    if (!/[A-ZÁÉÍÓÚÜÑÇÀÈÌÒÙÂÊÎÔÛÄËÏÖÜßÆØÅ]/.test(primeraLetra)) {
      return false;
    }
    
    // Opcional: Verificar que no haya solo una letra (excepto iniciales con punto, pero no aplica aquí)
    if (parte.length === 1 && !/[A-ZÁÉÍÓÚÜÑÇÀÈÌÒÙÂÊÎÔÛÄËÏÖÜßÆØÅ]/.test(parte)) {
      return false;
    }
  }

  // Verificar nombres compuestos comunes (como "María José", "Jean-Pierre")
  // Esta parte es más permisiva pero podríamos añadir lógica específica si fuera necesario

  // Lista negra de nombres inválidos o términos ofensivos (ejemplo básico)
  const nombresInvalidos = ['admin', 'usuario', 'invitado', 'root', 'null', 'undefined', 'test'];
  if (nombresInvalidos.includes(nombreLimpio.toLowerCase())) {
    return false;
  }

  return true;
}

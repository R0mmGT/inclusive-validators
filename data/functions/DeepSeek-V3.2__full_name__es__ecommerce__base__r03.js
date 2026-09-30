function validate(nombreCompleto) {
  // Verificar que el argumento sea string
  if (typeof nombreCompleto !== 'string') {
    return false;
  }

  // Eliminar espacios al inicio y final
  const textoLimpio = nombreCompleto.trim();

  // Verificar longitud mínima y máxima razonable
  if (textoLimpio.length < 2 || textoLimpio.length > 100) {
    return false;
  }

  // Debe contener al menos un espacio que separe nombre y apellido(s)
  if (!textoLimpio.includes(' ')) {
    return false;
  }

  // Dividir en partes y verificar cantidad mínima
  const partes = textoLimpio.split(/\s+/);
  if (partes.length < 2) {
    return false;
  }

  // Validar cada parte
  for (let i = 0; i < partes.length; i++) {
    const parte = partes[i];
    
    // Cada parte debe tener longitud adecuada
    if (parte.length < 2 || parte.length > 30) {
      return false;
    }

    // Debe comenzar con mayúscula
    if (parte[0] !== parte[0].toUpperCase()) {
      return false;
    }

    // El resto debe ser minúsculas (permite apóstrofes y guiones)
    const resto = parte.substring(1);
    const patronResto = /^[a-záéíóúñüàèìòùçëïöäåøæß\-']+$/;
    
    if (!patronResto.test(resto)) {
      return false;
    }

    // Verificar que no haya dobles guiones o apóstrofes consecutivos
    if (/(--|''|-'|'-)/.test(parte)) {
      return false;
    }

    // Verificar que no termine con guión o apóstrofe
    if (/[-']$/.test(parte)) {
      return false;
    }
  }

  // Verificar que no sea una cadena repetitiva (ej: "Aa Aa Aa")
  const partesUnicas = [...new Set(partes.map(p => p.toLowerCase()))];
  if (partesUnicas.length < Math.ceil(partes.length / 2)) {
    return false;
  }

  // Verificar palabras prohibidas (test, admin, usuario, etc.)
  const palabrasProhibidas = ['test', 'admin', 'usuario', 'user', 'cliente', 'customer', 'nombre', 'apellido'];
  for (const parte of partes) {
    if (palabrasProhibidas.includes(parte.toLowerCase())) {
      return false;
    }
  }

  // Si pasó todas las validaciones
  return true;
}

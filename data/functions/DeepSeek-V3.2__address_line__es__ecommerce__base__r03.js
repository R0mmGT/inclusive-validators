function validate(direccion) {
  // Verificar que el argumento sea un string
  if (typeof direccion !== 'string') {
    return false;
  }
  
  // Eliminar espacios al inicio y final
  const dirLimpia = direccion.trim();
  
  // Validaciones básicas
  if (dirLimpia.length === 0) {
    return false;
  }
  
  // Longitud razonable para una dirección (entre 3 y 100 caracteres)
  if (dirLimpia.length < 3 || dirLimpia.length > 100) {
    return false;
  }
  
  // Debe contener al menos un número (generalmente para el número de casa/edificio)
  if (!/\d/.test(dirLimpia)) {
    return false;
  }
  
  // Debe contener al menos una letra (para el nombre de la calle)
  if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(dirLimpia)) {
    return false;
  }
  
  // No debe contener caracteres extraños o potencialmente peligrosos
  // Permitimos: letras, números, espacios, puntos, comas, guiones, barras, símbolos comunes
  const caracteresPermitidos = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,\-/#ºª°]+$/;
  if (!caracteresPermitidos.test(dirLimpia)) {
    return false;
  }
  
  // No debe contener palabras inapropiadas comunes (lista básica)
  const palabrasInapropiadas = [
    'contrasena', 'password', 'admin', 'administrador', 'root',
    'select', 'insert', 'delete', 'update', 'drop', 'script',
    'javascript', 'onload', 'onerror', '<script', '</script>'
  ];
  
  const dirMinusculas = dirLimpia.toLowerCase();
  for (const palabra of palabrasInapropiadas) {
    if (dirMinusculas.includes(palabra)) {
      return false;
    }
  }
  
  // No debe tener múltiples espacios consecutivos
  if (/\s{2,}/.test(dirLimpia)) {
    return false;
  }
  
  // No debe comenzar ni terminar con caracteres no alfabéticos/numericos
  if (/^[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]/.test(dirLimpia) || /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/.test(dirLimpia)) {
    return false;
  }
  
  // Patrones comunes de direcciones válidas
  // 1. Número al inicio o al final (ej: "123 Calle Principal" o "Calle Principal 123")
  // 2. Contiene palabras comunes de direcciones
  const palabrasDireccion = [
    'calle', 'avenida', 'av', 'avda', 'plaza', 'paseo', 'camino',
    'carretera', 'ctra', 'ronda', 'via', 'bulevar', 'urbanizacion',
    'barrio', 'poligono', 'bloque', 'portal', 'escalera', 'piso',
    'puerta', 'número', 'num', 'nº', 'nro', 'km'
  ];
  
  let contienePalabraDireccion = false;
  for (const palabra of palabrasDireccion) {
    if (dirMinusculas.includes(palabra)) {
      contienePalabraDireccion = true;
      break;
    }
  }
  
  // También aceptamos direcciones sin palabras específicas si tienen formato válido
  // Formato: [número] [texto] o [texto] [número] o [texto] [número] [texto adicional]
  const formatoValido = /^(\d+[\s\-]?[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,\-/#]+|[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,\-/#]+\s\d+(\s?[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,\-/#]*)?)$/;
  
  if (!formatoValido.test(dirLimpia) && !contienePalabraDireccion) {
    return false;
  }
  
  return true;
}

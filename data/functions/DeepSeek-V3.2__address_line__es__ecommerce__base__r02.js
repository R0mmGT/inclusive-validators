function validate(direccion) {
  // Validar que sea string y no esté vacía
  if (typeof direccion !== 'string' || direccion.trim() === '') {
    return false;
  }

  const direccionLimpia = direccion.trim();
  
  // Longitud razonable para una dirección
  if (direccionLimpia.length < 5 || direccionLimpia.length > 100) {
    return false;
  }

  // Debe contener al menos un número (para número de casa/edificio)
  if (!/\d/.test(direccionLimpia)) {
    return false;
  }

  // Debe contener al menos una letra (para nombre de calle)
  if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(direccionLimpia)) {
    return false;
  }

  // No debe contener solo números y símbolos
  if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(direccionLimpia)) {
    return false;
  }

  // Validar estructura básica:
  // 1. Debe tener al menos 2 palabras (ej: "Calle 123" o "Av. Principal 456")
  const palabras = direccionLimpia.split(/\s+/).filter(palabra => palabra.length > 0);
  if (palabras.length < 2) {
    return false;
  }

  // 2. Al menos una palabra debe tener solo letras (nombre de calle/tipo de vía)
  const tienePalabraSoloLetras = palabras.some(palabra => 
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\.?$/.test(palabra)
  );
  
  // 3. Al menos una palabra debe contener números (número o código postal)
  const tienePalabraConNumeros = palabras.some(palabra => /\d/.test(palabra));

  if (!tienePalabraSoloLetras || !tienePalabraConNumeros) {
    return false;
  }

  // Caracteres permitidos: letras, números, espacios, puntos, comas, guiones, #, /
  const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#\/\-]+$/;
  if (!caracteresPermitidos.test(direccionLimpia)) {
    return false;
  }

  // No más de 3 espacios consecutivos
  if (/\s{4,}/.test(direccionLimpia)) {
    return false;
  }

  // No más de 2 puntos o comas consecutivos
  if (/[.,]{3,}/.test(direccionLimpia)) {
    return false;
  }

  // Validar que no empiece o termine con símbolos (excepto punto en abreviaturas como "Av.")
  if (/^[.,#\/\-]/.test(direccionLimpia) || /[.,#\/\-]$/.test(direccionLimpia.trim())) {
    return false;
  }

  // Casos comunes que deberían pasar:
  // - "Calle Principal 123"
  // - "Av. Libertador 456"
  // - "Carrera 7 # 45-23"
  // - "Plaza Central, 789"
  // - "Calle 25 de Mayo 1234"

  return true;
}

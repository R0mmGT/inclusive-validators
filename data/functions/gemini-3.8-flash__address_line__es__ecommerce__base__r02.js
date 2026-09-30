function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const str = address.trim();

  // Longitud mínima y máxima estándar para una dirección de calle
  if (str.length < 4 || str.length > 120) {
    return false;
  }

  // Debe contener al menos dos letras (nombre de la calle o identificador)
  const letters = str.match(/\p{L}/gu);
  if (!letters || letters.length < 2) {
    return false;
  }

  // Caracteres permitidos: letras (con acentos/Unicode), números, espacios y puntuación común en direcciones
  const validPattern = /^[\p{L}\p{N}\s.,#ºª\/\-'\(\)]+$/u;

  return validPattern.test(str);
}

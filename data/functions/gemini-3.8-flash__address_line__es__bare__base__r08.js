function validate(address) {
  if (typeof address !== 'string') return false;

  const trimmed = address.trim();

  // Longitud típica esperada para una línea de dirección
  if (trimmed.length < 5 || trimmed.length > 100) return false;

  // Debe contener al menos una letra
  const hasLetter = /\p{L}/u.test(trimmed);

  // Debe contener al menos un número (número de casa/portal) o indicador común de sin número ("s/n")
  const hasNumber = /\d|\b(s\/n|s\.n\.|sin n[uú]mero)\b/i.test(trimmed);

  // Solo debe contener caracteres habituales en direcciones (letras, dígitos, espacios y puntuación estándar)
  const validChars = /^[\p{L}\d\s.,#\/\-ºª°'’]+$/u.test(trimmed);

  return hasLetter && hasNumber && validChars;
}

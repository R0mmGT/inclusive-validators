function validate(address) {
  // Debe ser un string
  if (typeof address !== 'string') return false;

  const s = address.trim();

  // Longitud razonable para una línea de calle (mínimo 2, máximo 200)
  if (s.length < 2 || s.length > 200) return false;

  // No permitir caracteres de control
  if (/[\u0000-\u001F\u007F]/.test(s)) return false;

  // Evitar signos de etiqueta HTML que no pertenecen normalmente a una dirección
  if (/[<>]/.test(s)) return false;

  // Debe contener al menos una letra de cualquier alfabeto (soporta Unicode)
  if (!/\p{L}/u.test(s)) return false;

  // No puede ser sólo puntuación, símbolos o espacios
  if (/^[\p{P}\p{S}\s]+$/u.test(s)) return false;

  // Evitar repeticiones excesivas de un mismo carácter de puntuación (por ejemplo "----" o "!!!!")
  if (/([^\p{L}\p{N}\s])\1{3,}/u.test(s)) return false;

  // Rechazar cadenas que consisten únicamente en una secuencia muy corta de números
  // (por ejemplo solo "123"), ya que típicamente no constituyen una línea de calle completa.
  // Se acepta si además hay letras (ya comprobado) o si la cadena incluye espacios/palabras.
  if (/^[0-9]{1,4}$/.test(s)) return false;

  // Si pasa todas las comprobaciones, se considera razonablemente válida como línea de calle
  return true;
}

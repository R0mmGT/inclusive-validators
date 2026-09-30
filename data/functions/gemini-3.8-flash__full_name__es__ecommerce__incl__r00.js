function validate(str) {
  if (typeof str !== 'string') return false;

  const name = str.trim();

  // Comprobar una longitud razonable
  if (name.length < 2 || name.length > 100) return false;

  // Debe comenzar con una letra (soporta cualquier alfabeto Unicode)
  if (!/^\p{L}/u.test(name)) return false;

  // Debe terminar con una letra, una marca diacrítica combinable o un punto
  if (!/[\p{L}\p{M}.]$/u.test(name)) return false;

  // Solo permite letras, marcas diacríticas (acentos, vocales árabes/índicas),
  // espacios, guiones, puntos y apóstrofes
  if (!/^[\p{L}\p{M}\s'’ʼ.-]+$/u.test(name)) return false;

  // Evitar puntuación repetida consecutiva (ej. "..", "--", ".-")
  if (/['’ʼ.-]{2,}/u.test(name)) return false;

  // Debe contener al menos dos caracteres alfabéticos en total
  const letters = name.match(/\p{L}/gu);
  if (!letters || letters.length < 2) return false;

  return true;
}
